import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { setUser, setUserInfo } from "../../redux/actions/userActions";
//import Alert from "@material-ui/core/Alert";
import { useSelector, useDispatch } from "react-redux";

import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";

import {
  Avatar,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Alert = styled(MuiAlert)(spacing);
const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)}px;
`;

function SignIn({ CurrentUser, theme }) {
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  //hook for onChange
  const [formData, updateFormData] = useState(initialFormData);
  const [formError, updateFormError] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.userReducer);

  //handle change function
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  //handle for submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
    console.log(formData);

    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");

        const email = JSON.parse(res.config.data).email;

        dispatch(setUser(email));
        history.push("/home");
        //window.location.reload();
        //console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response.data);

        updateFormData(initialFormData);
        updateFormError(error.response.data.detail);
      });

    axiosInstance
      .post(`user/api-token-auth/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((resp) => {
        console.log(resp);
        const data = resp.data.user_name;
        console.log(data);
        dispatch(setUserInfo(resp.data.user_name));
      })
      .catch((error) => {
        console.log(error.response.data);
        //updateFormError(error.response.data.detail);
      });
  };

  return (
    <Wrapper>
      <Helmet title='Sign In' />
      <BigAvatar alt='Lucy' src='/static/img/avatars/avatar-1.jpg' />

      <Typography component='h1' variant='h4' align='center' gutterBottom>
        Welcome back, Lucy!
      </Typography>
      <Typography component='h2' variant='body1' align='center'>
        Sign in to your account to continue
      </Typography>
      <form>
        <FormControl margin='normal' required fullWidth>
          <InputLabel htmlFor='email'>Email Address</InputLabel>
          <Input
            id='email'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={handleChange}
            value={formData.email}
          />
        </FormControl>
        <FormControl margin='normal' required fullWidth>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input
            name='password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handleChange}
            value={formData.password}
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value='remember' color='primary' />}
          label='Remember me'
        />
        <Button
          component={Link}
          to='/'
          fullWidth
          variant='contained'
          color='primary'
          mb={2}
          type='submit'
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        {formError ? (
          <Alert mb={4} variant='outlined' severity='error'>
            {formError}
          </Alert>
        ) : (
          ""
        )}

        {userinfo.currentUser}
        <Button
          component={Link}
          to='/auth/reset-password'
          fullWidth
          color='primary'
        >
          Forgot password
        </Button>
      </form>
    </Wrapper>
  );
}

export default SignIn;
