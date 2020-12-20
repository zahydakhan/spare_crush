import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BasicTable from "./CartTable.component";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import SaveIcon from "@material-ui/icons/Save";
import Container from "@material-ui/core/Container";
import { Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import axiosInstance from "../../utils/axios";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";

//Chart Imports
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux/reducers/cart/cart.selectors";
import { EmptyCart } from "../../redux/actions/cart/cart.actions";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginLeft: "0.5em",
  },
  sitename: {
    fontWeight: "bold",
    paddingLeft: "0.6em",
    fontSize: "1.2em",
  },
  formControl: {
    margin: theme.spacing(),
    minWidth: 120,
    fontWeight: "bold",
  },
}));
const Alert = styled(MuiAlert)(spacing);
const Example = () => {
  const [filteredQuary, setFilteredQuary] = useState({
    0: {
      id: 2,
      site: "Ormeau",
      address: "Dummy address",
      state: "ACT",
      manager_name: "Martyn Taylor",
      manager_email: "Martyn.Taylor@boral.com.au",
      manager_phone: "854422544",
      supervisor_name: "Laurie Billiau",
      supervisor_email: "Martyn.Taylor@boral.com.au",
      supervisor_phone: "78956412",
      created_at: "2020-11-08T17:50:00Z",
    },
  });
  const [quaryInfo, setQuaryInfo] = useState([]);
  const [inputSite, setInputSite] = useState([]);
  const [submitError, setSubmitError] = useState();
  const [submitSuccess, setSubmitSuccess] = useState();

  var pr_num = "PR" + Math.floor(1000 + Math.random() * 90000000);

  const cartItems = useSelector((state) => selectCartItems(state));
  const handleSubmit = (e) => {
    e.preventDefault();

    cartItems.forEach((crt, index) => {
      axiosInstance
        .post(`/pr/sites_pr/`, {
          part_number: crt.part_number,
          description: crt.description,
          vendor_name: crt.vendor_name,
          unit_price: crt.aud,
          quantity: crt.quantity,
          total_price: crt.aud * crt.quantity,
          pr_number: pr_num,
          line_number: index + 1,
          site_name: inputSite,
        })
        .then((res) => {
          console.log(res);
          if (res.data.error) {
            setSubmitError(res.data.message);
          } else {
            setSubmitSuccess("Submitted Successfully");
            setSubmitError("");
            dispatch(EmptyCart(""));
          }
        });
    });
  };

  //fetch Sites
  useEffect(() => {
    axiosInstance.get("/sites/sites/").then((res) => {
      console.log(res.data);
      setQuaryInfo(res.data.data);
    });
  }, []);

  //Hanlde Change
  const handleChange = (event) => {
    const sitee = event.target.value;
    setInputSite(event.target.value);
    setFilteredQuary(quaryInfo.filter((site) => site.site == sitee));
  };

  const classes = useStyles();

  const dispatch = useDispatch();
  return (
    <Container
      container
      fixed
      //minWidth="md"
      component='main'
      className={classes.mainContainer}
    >
      <Grid container item>
        <Grid container item xs={6}>
          <Grid container alignItems='center'>
            <Grid item className={classes.sitename}>
              Please Select Your Site :
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={inputSite}
                  onChange={handleChange}
                >
                  {quaryInfo.map((site) => (
                    <MenuItem key={site.id} value={site.site}>
                      {site.site}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={6}>
            <Typography>
              <br />
              <span className={classes.sitename}>Selected : </span>

              {filteredQuary[0].site}
            </Typography>
            <br />
          </Grid>
        </Grid>

        <Grid container>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.button}
            type='submit'
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
          >
            Save Order
          </Button>

          {submitError ? (
            <Alert mb={4} variant='outlined' severity='error'>
              {submitError}
            </Alert>
          ) : submitSuccess ? (
            <Alert mb={4} variant='outlined' severity='success'>
              {submitSuccess}
            </Alert>
          ) : (
            ""
          )}
          <BasicTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Example;
