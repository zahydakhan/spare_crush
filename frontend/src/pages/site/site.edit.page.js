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
}));

export default function EditQuary() {
  const history = useHistory();
  const { id } = useParams();
  const initialFormData = Object.freeze({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    axiosInstance.get("/sites/sites/" + id).then((res) => {
      updateFormData({
        ...formData,
        ["site"]: res.data.data.site,
        ["address"]: res.data.data.address,
        ["state"]: res.data.data.state,
        ["manager_name"]: res.data.data.manager_name,
        ["manager_email"]: res.data.data.manager_email,
        ["manager_phone"]: res.data.data.manager_phone,
        ["supervisor_name"]: res.data.data.supervisor_name,
        ["supervisor_email"]: res.data.data.supervisor_email,
        ["supervisor_phone"]: res.data.data.supervisor_phone,
      });
      console.log(res.data);
    });
  }, [updateFormData]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting");

    console.log(formData);

    axiosInstance.put(`/sites/sites/` + id + "/", {
      site: formData.site,
      address: formData.address,
      state: formData.state,
      manager_name: formData.manager_name,
      manager_email: formData.manager_email,
      manager_phone: formData.manager_phone,
      supervisor_name: formData.supervisor_name,
      supervisor_email: formData.supervisor_email,
      supervisor_phone: formData.supervisor_phone,
    });
    history.push({
      pathname: "/site/admin/",
    });
  };

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Edit Site Information
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='site'
                name='site'
                autoComplete='site'
                value={formData.site}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='address'
                name='address'
                autoComplete='address'
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={8}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='state'
                name='state'
                autoComplete='state'
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='manager_name'
                name='manager_name'
                autoComplete='manager_name'
                value={formData.manager_name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='manager_email'
                name='manager_email'
                autoComplete='manager_email'
                value={formData.manager_email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='manager_phone'
                name='manager_phone'
                autoComplete='manager_phone'
                value={formData.manager_phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='supervisor_name'
                name='supervisor_name'
                autoComplete='supervisor_name'
                value={formData.supervisor_name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='supervisor_email'
                name='supervisor_email'
                autoComplete='supervisor_email'
                value={formData.supervisor_email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='supervisor_phone'
                name='supervisor_phone'
                autoComplete='supervisor_phone'
                value={formData.supervisor_phone}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSubmit}
          >
            Update Site Data
          </Button>
        </form>
      </div>
    </Container>
  );
}
