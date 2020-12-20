import { fontWeight, typography } from "@material-ui/system";
import React from "react";
import OrderTable from "./main_order.table";
import logo from "../../assets/Images/boral-logo.png";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  logo: {
    margin: "0.5em",
    height: "5em",
    [theme.breakpoints.down("md")]: {
      height: "4em",
      margin: "0.2em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "2.9em",
      margin: "0.1em",
    },
  },
}));

const main_order_container = React.forwardRef((props, ref) => {
  const { selectedSite, selectedVendor, selectedMonth } = props;

  const classes = useStyles();

  return (
    <div ref={ref} style={{ padding: "2.5em" }}>
      <Grid container alignItems='center'>
        <Grid item>
          <img className={classes.logo} alt='Boral Logo' src={logo} />
        </Grid>
        <Grid item>
          <typography style={{ fontSize: "2.3em", fontWeight: "bold" }}>
            Purchase Request
          </typography>
        </Grid>
      </Grid>
      <br />
      {selectedSite.map((site) => {
        console.log(site);
        return (
          <OrderTable
            selectedSite={[site]}
            selectedVendor={selectedVendor}
            selectedMonth={selectedMonth}
          />
        );
      })}
    </div>
  );
});

export default main_order_container;
