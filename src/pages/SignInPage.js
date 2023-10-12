import React from 'react';

import SignInForm from '../components/Authentication/SignIn';
import {SignUpLink} from '../components/Authentication/SignUp';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";


const SignInPage = () => (
    <div class='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Log In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
                Welcome back to Food Sharing
            </Typography>
            {/* <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                <Input size="lg" label="Name" />
                <Input size="lg" label="Email" />
                <Input type="password" size="lg" label="Password" />
                </div>
                <Button className="mt-6" fullWidth>
                LOG IN
                </Button>
            </form> */}
            <SignInForm/>
            <SignUpLink />
        </Card>
    </div>

);

  export function SimpleRegistrationForm() {
    return (
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Log In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Welcome back to Food Sharing
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Name" />
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>
          <Button className="mt-6" fullWidth>
            LOG IN
          </Button>
        </form>
      </Card>
    );
  }

export default SignInPage;