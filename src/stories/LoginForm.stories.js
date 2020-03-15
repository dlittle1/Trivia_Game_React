import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import LoginForm from "../LoginForm"
import '../index.css'
import '../stylesheets/home.css'
import '../stylesheets/loginForm.css'

export default {
  title: 'Log In Form',
  component: LoginForm,
  excludeStories: /.*Data$/,
};

export const formData = {
   id: '1',
   username: 'BobMan24',
   password: 'password',
}

export const Default = () => <LoginForm info={{...formData}}/>
