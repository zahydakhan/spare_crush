import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { useHistory } from "react-router-dom";
//MaterialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateRoller() {
  const history = useHistory();
  const classes = useStyles();
  const Alert = styled(MuiAlert)(spacing);
  const initialFormData = Object.freeze({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [submitError, setSubmitError] = useState();
  const [audToUsd, setAudToUsd] = React.useState(0.0);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=USD`)
      .then((res) => res.json())
      .then((rec) => setAudToUsd(rec["rates"]["AUD"]));
  }, [audToUsd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.aud && !formData.usd) {
      setSubmitError("Field aud is empty");
      return "Error";
    } else if (!formData.vendor_name) {
      setSubmitError("Field vendor name is empty");
      return "Error";
    } else if (!formData.description) {
      setSubmitError("Field description is empty");
      return "Error";
    }
    if (!formData.aud) {
      formData.aud = (parseFloat(formData.usd) * parseFloat(audToUsd)).toFixed(
        2
      );
    }
    axiosInstance
      .post(`/sp/roller/`, {
        description: formData.description,
        roller_diameter: formData.roller_diameter,
        wall_thickness: formData.wall_thickness,
        roller_length: formData.roller_length,
        shaft_diameter: formData.shaft_diameter,
        bearing: formData.bearing,
        aud: formData.aud,
        usd: formData.usd,
        vendor_name: formData.vendor_name,
      })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          setSubmitError(res.data.message);
        } else {
          history.push("/rollerAdmin/");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Add New Roller
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="roller_diameter"
                label="Roller Diameter"
                name="roller_diameter"
                autoComplete="roller_diameter"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="wall_thickness"
                label="Wall Thickness"
                name="wall_thickness"
                autoComplete="wall_thickness"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="roller_length"
                label="Roller Length"
                name="roller_length"
                autoComplete="roller_length"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="shaft_diameter"
                label="Shaft Diameter"
                name="shaft_diameter"
                autoComplete="shaft_diameter"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="bearing"
                label="Bearing"
                name="bearing"
                autoComplete="bearing"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="aud"
                label="AUD"
                name="aud"
                autoComplete="aud"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="usd"
                label="USD"
                name="usd"
                autoComplete="usd"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="vendor_name"
                label="Vendor Name"
                name="vendor_name"
                autoComplete="vendor_name"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Add Roller
          </Button>
          {submitError ? (
            <Alert mb={4} variant="outlined" severity="error">
              {submitError}
            </Alert>
          ) : (
            ""
          )}
        </form>
      </div>
    </Container>
  );
}
