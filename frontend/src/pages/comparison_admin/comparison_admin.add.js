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
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
  selectField: {
    minWidth: "30em",
  },
}));

export default function CreateQuary() {
  const history = useHistory();
  const Alert = styled(MuiAlert)(spacing);
  const initialFormData = Object.freeze({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [spare, setSpare] = React.useState([]);
  const [submitError, setSubmitError] = useState();
  const [audToUsd, setAudToUsd] = React.useState(0.0);

  const [selectedSpare, setSelectedSpare] = React.useState([]);

  const handleChangeSpare = (event) => {
    setSelectedSpare(event.target.value);
  };

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

  useEffect(() => {
    axiosInstance.get("/sp/spareparts/").then((res) => {
      console.log(res.data.data);
      const sparepart = [];
      res.data.data.map((spare) => {
        sparepart.push(spare.part_number);
      });
      setSpare(res.data.data);
      console.log(sparepart);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSpare) {
      setSubmitError("Field part number is empty");
      return "Error";
    } else if (!formData.description) {
      setSubmitError("Field description is empty");
      return "Error";
    } else if (!formData.vendor_name) {
      setSubmitError("Field vendor name is empty");
      return "Error";
    } else if (!formData.sp_type) {
      setSubmitError("Please select sparepart type");
      return "Error";
    } else if (!formData.aud && !formData.usd) {
      setSubmitError("Field aud is empty");
      return "Error";
    }
    if (!formData.aud) {
      formData.aud = (parseFloat(formData.usd) * parseFloat(audToUsd)).toFixed(
        2
      );
    }
    axiosInstance
      .post(`/sp/comparison_spareparts/`, {
        part_number: selectedSpare,
        description: formData.description,
        vendor_name: formData.vendor_name,
        vendor_status: formData.vendor_status,
        sp_type: formData.sp_type,
        weight_kg: formData.weight_kg,
        machine: formData.machine,
        model_number: formData.model_number,
        aud: formData.aud,
        usd: formData.usd,
        price: formData.price,
      })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          setSubmitError(res.data.message);
        } else {
          history.push("/comparisonAdmin/");
        }
      });
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Add New Comparison Spare Part
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Select Part Number
                </InputLabel>
                <Select
                  native
                  className={classes.selectField}
                  value={selectedSpare}
                  onChange={handleChangeSpare}
                  label="Spare Part"
                  inputProps={{
                    name: "part_number",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  {spare.map((sp) => (
                    <option value={sp.id}>{sp.part_number}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

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
                multiline
                rows={4}
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

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="vendor_status"
                label="Vendor Status"
                name="vendor_status"
                autoComplete="vendor_status"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Sparepart Type
                </InputLabel>
                <Select
                  native
                  onChange={handleChange}
                  label="Sparepart Type"
                  inputProps={{
                    name: "sp_type",
                    id: "outlined-age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"ground engaging tools"}>
                    ground engaging tools
                  </option>
                  <option value={"manganese liners"}>manganese liners</option>
                  <option value={"mechanical parts"}>mechanical parts</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="weight_kg"
                label="Weight (kg)"
                name="weight_kg"
                autoComplete="weight_kg"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="machine"
                label="Machine"
                name="machine"
                autoComplete="machine"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="model_number"
                label="Model Number"
                name="model_number"
                autoComplete="model_number"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="aud"
                label="Price AUD"
                name="aud"
                autoComplete="aud"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="usd"
                label="Price USD"
                name="usd"
                autoComplete="usd"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="price"
                label="Price "
                name="price"
                autoComplete="price"
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
            Add Sparepart
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
