import { errorMessage } from "@/src/constants";
import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount from '@/server/serviceAccountConfig'
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

const adminAuth = admin.auth();

export const setCustomUserClaims = async (uid: string, claims: any) => {
    try {
      await adminAuth.setCustomUserClaims(uid, claims);
      console.log(`Custom claims set for user ${uid}:`, claims);
      return 
    } catch (error: any) {
      return errorMessage(error.message)
    }
  };

export const viewCustomClaims = async (uid: string) => {
    try {
      const user = await adminAuth.getUser(uid);
      return user.customClaims;
    } catch (error) {
      console.error('Error retrieving custom claims:', error);
      throw new Error('Unable to retrieve custom claims');
    }
  };