import React, {useReducer, useRef} from 'react';
import PropTypes from 'prop-types';

import {PasswordForgetLink} from './PasswordForget';
import {Validation, Validator, ValidationHelper} from '../Forms/Validation';
import {formReducer, errorReducer} from '../../helpers/validationHelper';

import * as ROUTES from '../../constants/routes';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;



const SignInFormBase = props => {

    const initialFormValues = () => ({
        email: '',
        password: ''
      });

      const [form, dispatchForm] = useReducer(formReducer, {}, initialFormValues);
      const handleChange = e => {
        dispatchForm({
          name: e.target.name,
          value: e.target.value
        });
      };
  
    const onSubmit = e => {
    //   validationRef.current.validate();
    //   props.firebase
    //     .doSignInWithEmailAndPassword(form.email, form.password)
    //     .then(() => {
    //       props.history.push(ROUTES.ACCOUNT);
    //     })
    //     .catch(error => {
    //       dispatchError(error);
    //     });
        console.log(form.email);
        console.log(form.password)
        e.preventDefault();
    };
  
    return (
      <form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                <input
            placeholder="E-mail"
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
          />
            <input
            placeholder="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
                </div>
            {/* <Button className="mt-6" fullWidth>
            LOG IN
            </Button> */}
            <input type="submit" />
        </form>
    );
  };
  
SignInFormBase.propTypes = {
    firebase: PropTypes.object,
    history: PropTypes.object
};

const SignInForm = SignInFormBase;

export default SignInForm
