import {Link, withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const SignUpLink = () => (
      <Typography color="gray" className="mt-4 text-center font-normal">
      Don't have an account?{" "}
      <a href={ROUTES.SIGN_UP} className="font-medium text-gray-900">
        Register
      </a>
    </Typography>
  );
  
const SignInLink = () => (
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href={ROUTES.LOG_IN} className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
);

export {SignInLink, SignUpLink};