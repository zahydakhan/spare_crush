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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

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

export default function EditQuary() {
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
    fetch(`https://api.exchangeratesapi.io/latest?base=USD`)
      .then((res) => res.json())
      .then((rec) => setAudToUsd(rec["rates"]["AUD"]));
  }, [audToUsd]);

  useEffect(() => {
    axiosInstance.get("/sp/spareparts/" + id).then((res) => {
      updateFormData({
        ...formData,
        ["part_number"]: res.data.data.part_number,
        ["description"]: res.data.data.description,
        ["vendor_name"]: res.data.data.vendor_name,
        ["vendor_status"]: res.data.data.vendor_status,
        ["sp_type"]: res.data.data.sp_type,
        ["weight_kg"]: res.data.data.weight_kg,
        ["machine"]: res.data.data.machine,
        ["model_number"]: res.data.data.model_number,
        ["aud"]: res.data.data.aud,
        ["usd"]: res.data.data.usd,
        ["price"]: res.data.data.price,
      });
      console.log(res.data.data.part_number);
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
    e.preventDefault();
    if (!formData.part_number) {
      setSubmitError("Field part number is empty");
      return "Error";
    } else if (!formData.description) {
      setSubmitError("Field description is empty");
      return "Error";
    } else if (!formData.vendor_name) {
      setSubmitError("Field vendor name is empty");
      return "Error";
    } else if (!formData.sp_type) {
      console.log(formData.sp_type);
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
      .put(`/sp/spareparts/` + id + "/", {
        part_number: formData.part_number,
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
          history.push("/spareAdmin/");
        }
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Post
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormLabel>
                Part Number<span className={classes.required}>*</span>
              </FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="part_number"
                name="part_number"
                autoComplete="part_number"
                value={formData.part_number}
                onChange={handleChange}
              />
            </Grid>
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
                multiline
                rows={8}
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
            <Grid item xs={12}>
              <FormLabel>Vendor Status</FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="vendor_status"
                name="vendor_status"
                autoComplete="vendor_status"
                value={formData.vendor_status}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Sparepart Type<span className={classes.required}>*</span>
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
              <FormLabel>Weight (kg)</FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="weight_kg"
                name="weight_kg"
                autoComplete="weight_kg"
                value={formData.weight_kg}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Machine</FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="machine"
                name="machine"
                autoComplete="machine"
                value={formData.machine}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Model Number</FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="model_number"
                name="model_number"
                autoComplete="model_number"
                value={formData.model_number}
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
              <FormLabel>USD </FormLabel>
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
              <FormLabel>Price </FormLabel>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                name="price"
                autoComplete="price"
                value={formData.price}
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
            Update Spare Part
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
