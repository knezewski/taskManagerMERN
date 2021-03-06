// https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in

import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/auth";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import useStyles from "../../utils/formStyles";

const Login = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  let history = useHistory();


  const { email, password } = formData;

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const backToLanding = () => {
    history.push("/");
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.header}>
          <Button onClick={backToLanding} >
            <ArrowBackIcon />
          </Button>
          <Typography component="h1" variant="h5" style={{ marginLeft:"119px"}}>
            Sign in
          </Typography>
        </div>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
