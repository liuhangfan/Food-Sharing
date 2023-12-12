
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth';
import { auth } from './firebase';
import { getFunctions, httpsCallable } from "firebase/functions";


export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const authStateChanged = async (user) => {
    setIsLoading(true);
    if (!user) {
        clear();
        return;
    }
    setAuthUser(user);
    setIsLoading(false);
  }; 

  const signOut = () => authSignOut(auth).then(clear);

  // Listen for Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    signOut
  };
}

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
  signOut: async () => {}
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export async function getUserEmailByUID(userId) {
  try {
    const functions = getFunctions();
    const queryUserEmailByUIDNew = httpsCallable(functions, 'queryUserEmailByUIDNew');
    console.log("get queryUserEmailByUIDNew", queryUserEmailByUIDNew)
    const result = await queryUserEmailByUIDNew({ uid: userId });
    const data = result.data;
    const email = data.text;
    return email;
  } catch (error) {
    console.error('Error:', error);
    return error;
  }
}

export const useAuth = () => useContext(AuthUserContext);