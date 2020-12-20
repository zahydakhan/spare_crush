import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import { useHistory, useParams } from "react-router-dom";
//MaterialUI
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
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  required: {
    color: "red",
    fontSize: "1.1em",
    marginLeft: "0.4em",
  },
}));

export default function EditRoller() {
  const history = useHistory();
  const { id } = useParams();
  const classes = useStyles();
  const Alert = styled(MuiAlert)(spacing);
  const initialFormData = Object.freeze({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [submitError, setSubmitError] = useState();
  const [audToUsd, setAudToUsd] = React.useState(0.0);

  useEffect(() => {
    axiosInstance.get("/sp/roller/" + id).then((res) => {
      updateFormData({
        ...formData,
        ["description"]: res.data.data.description,
        ["roller_diameter"]: res.data.data.roller_diameter,
        ["wall_thickness"]: res.data.data.wall_thickness,
        ["roller_length"]: res.data.data.roller_length,
        ["shaft_diameter"]: res.data.data.shaft_diameter,
        ["bearing"]: res.data.data.bearing,
        ["aud"]: res.data.data.aud,
        ["usd"]: res.data.data.usd,
        ["vendor_name"]: res.data.data.vendor_name,
      });
      console.log(res.data.data);
    });
  }, [updateFormData]);

  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=USD`)
      .then((res) => res.json())
      .then((rec) => setAudToUsd(rec["rates"]["AUD"]));
  }, [audToUsd]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.aud) {
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
      .put(`/sp/roller/` + id + "/", {
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
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Roller
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabel>
                Description<span className={classes.required}>*</span>
              </FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                name="description"
                autoComplete="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Roller Diameter</FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="roller_diameter"
                name="roller_diameter"
                autoComplete="roller_diameter"
                value={formData.roller_diameter}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Wall Thickness</FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="wall_thickness"
                name="wall_thickness"
                autoComplete="wall_thickness"
                value={formData.wall_thickness}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Roller Length</FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="roller_length"
                name="roller_length"
                autoComplete="roller_length"
                value={formData.roller_length}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Shaft Diameter</FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="shaft_diameter"
                name="shaft_diameter"
                autoComplete="shaft_diameter"
                value={formData.shaft_diameter}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Bearing</FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="bearing"
                name="bearing"
                autoComplete="bearing"
                value={formData.bearing}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>
                AUD<span className={classes.required}>*</span>
              </FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="aud"
                name="aud"
                autoComplete="aud"
                value={formData.aud}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>USD</FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="usd"
                name="usd"
                autoComplete="usd"
                value={formData.usd}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>
                Vendor Name<span className={classes.required}>*</span>
              </FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="vendor_name"
                name="vendor_name"
                autoComplete="vendor_name"
                value={formData.vendor_name}
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
            Update Roller
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
