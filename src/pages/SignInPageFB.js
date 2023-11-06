
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
import {isSignInWithEmailLink} from 'firebase/auth';
import { useLocation } from 'react-router-dom';


const REDIRECT_PAGE = ROUTES.ACCOUNT;


const isEmailLinkLogin = (props) => {
  const searchParams = new URLSearchParams(props.search);
  const oobCode = searchParams.get('oobCode');
  const apiKey = searchParams.get('apiKey');
  const mode = searchParams.get('mode');
  return (oobCode && apiKey && mode === "signIn");
}

const SignInPageFB = () => {
  const { authUser, isLoading } = useAuth();
  const [login, setLogin] = useState(isEmailLinkLogin(useLocation())? true: false);
  let navigate = useNavigate();
  // Redirect if finished loading and there's an existing user (user is logged in)
  useEffect(() => {
    if (!isLoading && authUser) {
        navigate(REDIRECT_PAGE);
    }
  }, [authUser, isLoading])

  const uiConfig = {
    signInFlow: isSignInWithEmailLink(authUser, window.location.href) ? 'redirect' : 'popup',
    //firebase.auth().isSignInWithEmailLink(window.location.href) ? 'redirect' : 'popup',
    signInSuccessUrl: REDIRECT_PAGE,
    signInOptions: [
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
      },
      GoogleAuthProvider.PROVIDER_ID
    ],
  };
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