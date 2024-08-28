import { getAuth, GoogleAuthProvider, signOut, getAdditionalUserInfo, signInWithPopup, deleteUser, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, FacebookAuthProvider, updateProfile } from 'firebase/auth';
import { errorMessage } from '../constants';
import useAlert from './useAlert'; // Ensure useAlert returns setAlert with correct type
import { app } from '../config';
import { getFirebaseError } from '../utils/firebaseErrors';
import { ToastType } from '@/components/CustomToast';

export const auth = getAuth(app);

async function handleSignOut(setAlert: (message: string, type?: ToastType) => void) {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      await signOut(auth);
      setAlert("Signed out successfully.");
    } else {
      setAlert("You are not logged in.");
    }
  } catch (err: any) {
    const { message, code } = err;
    setAlert(getFirebaseError(code) || message, 'error');
    return errorMessage(err);
  }
}

async function handleGoogleAuth(setAlert: (message: string, type?: ToastType) => void) {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const isNewUser = getAdditionalUserInfo(res)?.isNewUser;

    if (isNewUser) {
      setAlert("Welcome to Rent-House!", 'success');
    } else {
      setAlert(`Welcome back, ${user.displayName?.split(' ')[0]}.`, 'success');
    }

    return {
      success: true,
      message: "User data retrieved.",
      data: user,
    };
  } catch (err: any) {
    const { message, code } = err;
    setAlert(getFirebaseError(code) || message, 'error');
    return errorMessage(err);
  }
}

async function handleLoginWithEmailAndPassword(email: string, password: string, setAlert: (message: string, type?: ToastType) => void) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    setAlert(`Welcome back, ${user.displayName || 'User'}.`, 'success');
    return {
      success: true,
      message: `User ${user.displayName || 'User'} logged in.`,
      data: user,
    };
  } catch (err: any) {
    const { message, code } = err;
    setAlert(getFirebaseError(code) || message, 'error');
    return errorMessage(err);
  }
}

async function handleSignupWithEmailAndPassword({email, password, userName, lastName, firstName, accountType}: {email: string, password: string, userName: string, accountType: 'renter' | 'agent', firstName: string, lastName?: string}, setAlert: (message: string, type?: ToastType) => void) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with additional information
    await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

    setAlert("Registration successful. Welcome to Rent-House!", 'success');
    return {
      success: true,
      message: `User ${user.displayName || 'User'} signed up.`,
      data: user,
    };
  } catch (err: any) {
    const { message, code } = err;
    setAlert(getFirebaseError(code) || message, 'error');
    return errorMessage(err);
  }
}

async function sendResetPasswordLink(email: string, setAlert: (message: string, type?: ToastType) => void) {
  try {
    await sendPasswordResetEmail(auth, email);
    setAlert(`Password reset link sent to ${email}.`, 'info');
    return {
      success: true,
      email,
    };
  } catch (err: any) {
    const { message, code } = err;
    setAlert(getFirebaseError(code) || message, 'error');
    return errorMessage(err);
  }
}

async function handleFacebookLogin(setAlert: (message: string, type?: ToastType) => void) {
  try {
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const isNewUser = getAdditionalUserInfo(res)?.isNewUser;

    if (isNewUser) {
      await deleteUser(user);
      setAlert("Please register to continue.", 'warning');
    } else {
      setAlert(`Welcome back, ${user.displayName}.`, 'success');
    }

    return {
      success: true,
      message: "User data retrieved.",
      data: user,
    };
  } catch (err: any) {
    const { message, code } = err;
    setAlert(getFirebaseError(code) || message, 'error');
    return errorMessage(err);
  }
}

export default function useAuth() {
  const { setAlert } = useAlert(); // Ensure useAlert returns setAlert with correct type

  return {
    auth,
    signOut: () => handleSignOut(setAlert),
    googleAuth: () => handleGoogleAuth(setAlert),
    signinWithEmailAndPassword: (email: string, password: string) => handleLoginWithEmailAndPassword(email, password, setAlert),
    sendResetPasswordLink: (email: string) => sendResetPasswordLink(email, setAlert),
    signupWithEmailAndPassword: ({email, password, userName, lastName, firstName, accountType}: {email: string, password: string, userName: string, accountType: 'renter' | 'agent', firstName: string, lastName?: string}) => handleSignupWithEmailAndPassword({email, password, firstName, lastName, accountType, userName}, setAlert),
    facebookLogin: () => handleFacebookLogin(setAlert),
  };
}
