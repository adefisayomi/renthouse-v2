import { create } from 'zustand';
import { auth, googleProvider, facebookProvider } from '../config';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  User as FirebaseUser,
  updateProfile,
  getAdditionalUserInfo,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { auth_token } from '@/src/constants';
import axios from 'axios';
import { ToastType } from '@/components/CustomToast';
import useAlert from '../hooks/useAlert';
import { getFirebaseError } from '../utils/firebaseErrors';

interface CustomClaims {
  accountType: 'agent' | 'renter';
  [key: string]: any;
}

interface User extends FirebaseUser {
  claims?: CustomClaims;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setAlert: (message: string, type?: ToastType) => void;
  initialize: () => void;
  loginWithEmail: (email: string, password: string, redirectUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  registerWithEmail: (data: {
    email: string;
    password: string;
    lastName?: string;
    accountType: 'renter' | 'agent';
    firstName: string;
    redirectUrl?: string;
  }) => Promise<void>;
  loginWithGoogle: (claim: { accountType?: 'renter' | 'agent' }, redirectUrl?: string) => Promise<void>;
  facebookLogin: (claim: { accountType?: 'renter' | 'agent' }, redirectUrl?: string) => Promise<void>;
  sendResetPasswordLink: (email: string) => Promise<void>;
}

type AuthPersist = Pick<AuthState, 'user'>;

const fetchCustomClaims = async (user: FirebaseUser): Promise<CustomClaims> => {
  const { data } = await axios.post("/api/auth/getClaims", { uid: user.uid });
  return data.data as CustomClaims;
};

const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set, get): AuthState => {
      const { setAlert } = useAlert();
      let redirectUrl: string | null;

      const initializeUser = async (user: FirebaseUser) => {
        const claims = await fetchCustomClaims(user);
        const extendedUser: User = { ...user, claims };
        set({ user: extendedUser, loading: false, error: null });
        // 
        const isOnAuth = window.location.pathname.includes("signin")
        
        // Redirect if there is a stored redirect URL
        if (isOnAuth && get().user) {
          window.location.href = '/';
        }

        const token = await user.getIdToken();
        Cookies.set(auth_token, token, { expires: 1 });
      };

      return {
        user: null,
        loading: true,
        error: null,
        setAlert,

        initialize: () => {
          set({ loading: true });
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              await initializeUser(user);
            } else {
              set({ user: null, loading: false, error: null });
              Cookies.remove(auth_token);
            }
          });
        },

        loginWithEmail: async (email, password, redirectUrl) => {
          try {
            set({ loading: true, error: null });
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await initializeUser(userCredential.user);
            setAlert(`Welcome back, ${userCredential.user.displayName?.split(' ')[0].toLowerCase()}`, 'success');
            if (redirectUrl) redirectUrl = redirectUrl; // Store the redirect URL
          } catch (error: any) {
            set({ user: null, loading: false, error: error.message });
            const { message, code } = error;
            setAlert(getFirebaseError(code) || message, 'error');
          }
        },

        logout: async () => {
          try {
            set({ loading: true });
            await auth.signOut();
            set({ user: null, loading: false, error: null });
            Cookies.remove(auth_token);
          } catch (error: any) {
            set({ loading: false, error: error.message });
            const { message, code } = error;
            setAlert(getFirebaseError(code) || message, 'error');
          }
        },

        registerWithEmail: async ({ email, password, lastName, accountType, firstName, redirectUrl }) => {
          try {
            set({ loading: true, error: null });

            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Call server-side function to set custom claims
            const { data } = await axios.post("/api/auth/setUserClaims", { uid: userCredential.user.uid, accountType });
            if (!data.success) throw new Error(data.message);

            // Update user profile with additional information
            await updateProfile(userCredential.user, {
              displayName: `${firstName} ${lastName}`,
            });

            // Wait for the custom claims to be set before initializing the user
            await initializeUser(userCredential.user);

            setAlert("Registration successful. Welcome to Rent-House!", 'success');
            if (redirectUrl) redirectUrl = redirectUrl; // Store the redirect URL
          } catch (error: any) {
            set({ user: null, loading: false, error: error.message });
            const { message, code } = error;
            setAlert(getFirebaseError(code) || message, 'error');
          }
        },

        loginWithGoogle: async ({ accountType }, redirectUrl) => {
          try {
            set({ loading: true, error: null });
            const result = await signInWithPopup(auth, googleProvider);
            const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

            if (isNewUser) {
              // Set custom claims if new user
              await axios.post("/api/auth/setUserClaims", { uid: result.user.uid, accountType: accountType || 'renter' });
              setAlert("Welcome to Rent-House!", 'success');
            } else {
              const firstName = result.user.displayName?.split(' ')[0];
              setAlert(`Welcome back, ${firstName}!`, 'success');
            }

            await initializeUser(result.user);
            if (redirectUrl) redirectUrl = redirectUrl; // Store the redirect URL
          } catch (error: any) {
            set({ user: null, loading: false, error: error.message });
            const { message, code } = error;
            setAlert(getFirebaseError(code) || message, 'error');
          }
        },

        facebookLogin: async ({ accountType }, redirectUrl) => {
          try {
            set({ loading: true, error: null });
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

            if (isNewUser) {
              // Set custom claims if new user
              await axios.post("/api/auth/setUserClaims", { uid: user.uid, accountType: accountType || 'renter'  });
              setAlert("Welcome to Rent-House!", 'success');
            } else {
              const firstName = user.displayName?.split(' ')[0];
              setAlert(`Welcome back, ${firstName}!`, 'success');
            }

            await initializeUser(user);
            if (redirectUrl) redirectUrl = redirectUrl; // Store the redirect URL
          } catch (error: any) {
            set({ user: null, loading: false, error: error.message });
            const { message, code } = error;
            setAlert(getFirebaseError(code) || message, 'error');
          }
        },

        sendResetPasswordLink: async (email) => {
          try {
            await sendPasswordResetEmail(auth, email);
            get().setAlert(`Password reset link sent to ${email}.`, 'info');
          } catch (error: any) {
            set({ loading: false, error: error.message });
            const { message, code } = error;
            setAlert(getFirebaseError(code) || message, 'error');
          }
        },
      };
    },
    {
      name: 'auth-storage', // unique name for item in storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
