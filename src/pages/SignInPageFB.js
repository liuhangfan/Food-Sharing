
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { CircularProgress, Dialog} from '@mui/material';
import { useAuth } from '../components/Firebase/auth';
import { auth } from '../components/Firebase/firebase';
import {Typography, Button } from '@material-tailwind/react';
import { useNavigate } from "react-router-dom";
import * as ROUTES from '../constants/routes.js';

const REDIRECT_PAGE = ROUTES.ACCOUNT;

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup', // popup signin flow rather than redirect flow
  signInSuccessUrl: REDIRECT_PAGE,
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID
  ],
};

const SignInPageFB = () => {
  const { authUser, isLoading } = useAuth();
//   const router = useRouter();
  const [login, setLogin] = useState(false);
  let navigate = useNavigate();

  // Redirect if finished loading and there's an existing user (user is logged in)
  useEffect(() => {
    if (!isLoading && authUser) {
        navigate(REDIRECT_PAGE);
    }
  }, [authUser, isLoading])
   

  return (
    (isLoading || (!isLoading && !!authUser)) ? 
    <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%' }}/>
    :
    <section class="text-gray-600 body-font flex justify-center items-center h-screen">
    <div class="container mx-auto">
    <div class="flex flex-col lg:pr-24 md:items-start md:text-left mb-10 md:mb-0 items-center text-center">
            <div class="md:container md:mx-auto text-4xl">
                <Typography variant="h1">Welcome to Food Sharing!</Typography>
                
                <button class="inline-flex text-white bg-indigo-500 border-2 mt-9 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        onClick={() => setLogin(true)}>
                Login / Register
                </button>
            
                <Dialog onClose={() => setLogin(false)} open={login} classNames={{ dialog: 'relative mt-20 mx-auto w-96' }}>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
                </Dialog>
            </div> 
    </div>
    </div>
    </section>
  )
}

export default SignInPageFB;