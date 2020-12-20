import React, { useState } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

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

export default function CreateQuary() {
  const history = useHistory();
  const initialFormData = Object.freeze({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/sites/sites/`, {
        site: formData.site,
        address: formData.address,
        state: formData.state,
        manager_name: formData.manager_name,
        manager_email: formData.manager_email,
        manager_phone: formData.manager_phone,
        supervisor_name: formData.supervisor_name,
        supervisor_email: formData.supervisor_email,
        supervisor_phone: formData.supervisor_phone,
      })
      .then((res) => {
        history.push("/site/admin/");
        console.log(res.data);
      });
  };

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component='h1' variant='h5'>
          Add New Site
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='site'
                label='Site'
                name='site'
                autoComplete='site'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='address'
                label='Address'
                name='address'
                autoComplete='address'
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel htmlFor='outlined-age-native-simple'>
                  State
                </InputLabel>
                <Select
                  native
                  onChange={handleChange}
                  label='State'
                  inputProps={{
                    name: "state",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label='None' value='' />
                  <option value={"ACT"}>ACT</option>
                  <option value={"QLD"}>QLD</option>
                  <option value={"NSW"}>NSW</option>
                  <option value={"SA"}>SA</option>
                  <option value={"VIC"}>VIC</option>
                  <option value={"TAS"}>TAS</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='manager_name'
                label='Manager Name'
                name='manager_name'
                autoComplete='manager_name'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='manager_email'
                label='Manager Email'
                name='manager_email'
                autoComplete='manager_email'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='manager_phone'
                label='Manager Phone'
                name='manager_phone'
                autoComplete='manager_phone'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='supervisor_name'
                label='Supervisor Name'
                name='supervisor_name'
                autoComplete='supervisor_name'
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='supervisor_email'
                label='Supervisor Email'
                name='supervisor_email'
                autoComplete='supervisor_email'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='supervisor_phone'
                label='Supervisor Phone'
                name='supervisor_phone'
                autoComplete='supervisor_phone'
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
            Add Site
          </Button>
        </form>
      </div>
    </Container>
  );
}
