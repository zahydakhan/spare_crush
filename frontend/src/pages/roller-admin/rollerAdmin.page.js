import React, { useEffect, useState } from "react";

import Rollers from "./rollerAdmin.table";
import SparepartsLoading from "../../pages/spareparts/loading.component";
import axiosInstance from "../../utils/axios";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import RollerIcon from "../../assets/Images/roller.png";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginLeft: "0em",
    marginRight: "0em",
    padding: "0em",
    marginBottom: "6em",
    marginTop: "1em",
  },
  search: {
    height: "3em",
    fontSize: "1em",
    paddingLeft: "0.8em",
    marginBottom: "1em",
  },
  title: {
    fontFamily: "Merriweather",
    fontWeight: 700,
    fontSize: "1.9em",
    paddingLeft: "0.3em",
  },
  spareicon: {
    height: "3em",
  },
  tableHeading: {
    margin: "1em 0",
  },
}));

function AdminRoller() {
  const RollersLoading = SparepartsLoading(Rollers);
  const [appState, setAppState] = useState({
    loading: true,
    roller: null,
  });
  const classes = useStyles();
  const theme = useTheme();
  const [searchResult, setSearchResult] = React.useState("");

  useEffect(() => {
    axiosInstance.get(`/sp/roller/`).then((res) => {
      const rollers = res.data.data;

      if (searchResult) {
        const filteredData = rollers.filter((cty) =>
          cty.description.toLowerCase().includes(searchResult.toLowerCase())
        );
        console.log(filteredData);
        setAppState({ loading: false, roller: filteredData });
      } else {
        setAppState({ loading: false, roller: rollers });
      }
    });
  }, [setAppState, searchResult]);

  return (
    <React.Fragment>
      <Container container className={classes.mainContainer} disableGutters>
        <Grid
          container
          className={classes.tableHeading}
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <img
              src={RollerIcon}
              className={classes.spareicon}
              alt="roller icon"
            />
          </Grid>
          <Grid item>
            <Typography variant="h3" className={classes.title}>
              Roller Spare Admin
            </Typography>
          </Grid>
        </Grid>

        <input
          type="Search"
          placeholder="Search Roller Spareparts"
          onChange={(e) => setSearchResult(e.target.value)}
          className={classes.search}
        />

        <RollersLoading
          isLoading={appState.loading}
          rollers={appState.roller}
        />
      </Container>
    </React.Fragment>
  );
}
export default AdminRoller;
