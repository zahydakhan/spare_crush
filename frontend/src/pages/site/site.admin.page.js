import React, { useEffect, useState } from "react";

import AllQuaries2 from "./site.admin.table2";
import SparepartsLoading from "../../pages/spareparts/loading.component";
import axiosInstance from "../../utils/axios";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import SpareIcon from "../../assets/Images/building.png";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginLeft: "0em",
    marginRight: "0em",
    paddingLeft: "0.1em",
    paddingRight: "0.1em",
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

function AdminQuary() {
  const SpareLoading2 = SparepartsLoading(AllQuaries2);
  const [appState, setAppState] = useState({
    loading: true,
    quary: null,
  });
  const classes = useStyles();
  const theme = useTheme();
  const [searchResult, setSearchResult] = React.useState("");

  useEffect(() => {
    axiosInstance.get(`/sites/sites/`).then((res) => {
      const quaries = res.data.data;
      console.log(quaries);

      if (searchResult) {
        const filteredData = quaries.filter((cty) =>
          cty.site.toLowerCase().includes(searchResult.toLowerCase())
        );
        console.log(filteredData);
        setAppState({ loading: false, quary: filteredData });
      } else {
        setAppState({ loading: false, quary: quaries });
      }
    });
  }, [setAppState, searchResult]);

  return (
    <React.Fragment>
      <Container
        container
        maxWidth={false}
        component='main'
        className={classes.mainContainer}
        disableGutters
      >
        <Grid
          container
          className={classes.tableHeading}
          alignItems='center'
          spacing={1}
        >
          <Grid item>
            <img
              src={SpareIcon}
              className={classes.spareicon}
              alt='spare parts icon'
            />
          </Grid>
          <Grid item>
            <Typography variant='h3' className={classes.title}>
              Site Admin
            </Typography>
          </Grid>
        </Grid>

        <input
          type='Search'
          placeholder='Search Sites'
          onChange={(e) => setSearchResult(e.target.value)}
          className={classes.search}
        />

        <SpareLoading2 isLoading={appState.loading} quaries={appState.quary} />
      </Container>
    </React.Fragment>
  );
}
export default AdminQuary;
