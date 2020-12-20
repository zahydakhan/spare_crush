import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import axiosInstance from "../../utils/axios";
import MainOrderContainer from "./main_order_container";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  tableContainer: {
    paddingBottom: "2em",
  },
}));

const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 1;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
      width: 190,
    },
  },
};

export default function MultipleSelect() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const classes = useStyles();
  const theme = useTheme();
  const [siteName, setSiteName] = React.useState([]);
  const [VendorName, setVendorName] = React.useState([]);
  const [month, setMonth] = React.useState([]);

  /* Selected Iputs */
  const [selectedSite, setSelectedSite] = React.useState([]);
  const [selectedVendor, setSelectedVendor] = React.useState([]);
  const [selectedMonth, setSelectedMonth] = React.useState([]);

  const handleChangeSite = (event) => {
    setSelectedSite(event.target.value);
  };

  const handleChangeVendor = (event) => {
    setSelectedVendor(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    axiosInstance.get("/pr/main_pr/").then((res) => {
      console.log(res);
      const selSite = [];
      const selVendor = [];
      const selMonth = [];
      res.data.data.map((obbj) => {
        selSite.push(obbj.site_name);
        selVendor.push(obbj.vendor_name);
        selMonth.push(obbj.month);
      });
      const uniqueSite = Array.from(new Set(selSite));
      const uniqueVendor = Array.from(new Set(selVendor));
      const uniqueMonth = Array.from(new Set(selMonth));
      setSiteName(uniqueSite);
      setVendorName(uniqueVendor);
      setMonth(uniqueMonth);
    });
  }, []);

  return (
    <React.Fragment>
      <Button
        onClick={handlePrint}
        variant='contained'
        color='primary'
        size='large'
      >
        Print this out!
      </Button>
      <Grid
        container
        justify='center'
        direction='row'
        className={classes.tableContainer}
        spacing={10}
      >
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-mutiple-checkbox-label'>Site Name</InputLabel>
            <Select
              labelId='demo-mutiple-checkbox-label'
              id='demo-mutiple-checkbox'
              multiple
              value={selectedSite}
              onChange={handleChangeSite}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {siteName.map((name1) => (
                <MenuItem key={name1} value={name1}>
                  <Checkbox checked={selectedSite.indexOf(name1) > -1} />
                  <ListItemText primary={name1} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-mutiple-checkbox-label'>
              Vendor Name
            </InputLabel>
            <Select
              labelId='demo-mutiple-checkbox-label'
              id='demo-mutiple-checkbox'
              multiple
              value={selectedVendor}
              onChange={handleChangeVendor}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {VendorName.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedVendor.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-mutiple-checkbox-label'>Month</InputLabel>
            <Select
              labelId='demo-mutiple-checkbox-label'
              id='demo-mutiple-checkbox'
              multiple
              value={selectedMonth}
              onChange={handleChangeMonth}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {month.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedMonth.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <MainOrderContainer
        ref={componentRef}
        selectedSite={selectedSite}
        selectedVendor={selectedVendor}
        selectedMonth={selectedMonth}
      />
    </React.Fragment>
  );
}
