import React, { useEffect, useState } from "react";

import Spares from "./comparison_admin.table";
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

function AdminSpare() {
  const SpareLoading2 = SparepartsLoading(Spares);
  const [appState, setAppState] = useState({
    loading: true,
    spare: null,
  });
  const classes = useStyles();
  const theme = useTheme();
  const [searchResult, setSearchResult] = React.useState("");

  useEffect(() => {
    axiosInstance.get(`/sp/comparison_spareparts/`).then((res) => {
      const spareparts = res.data.data;
      console.log(res);

      if (searchResult) {
        const filteredData = spareparts.filter((cty) =>
          cty.part_number.toLowerCase().includes(searchResult.toLowerCase())
        );
        console.log(filteredData);
        setAppState({ loading: false, spare: filteredData });
      } else {
        setAppState({ loading: false, spare: spareparts });
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
              src={SpareIcon}
              className={classes.spareicon}
              alt="spare parts icon"
            />
          </Grid>
          <Grid item>
            <Typography variant="h3" className={classes.title}>
              Crushing Local Sparepart Admin
            </Typography>
          </Grid>
        </Grid>

        <input
          type="Search"
          placeholder="Search Spareparts"
          onChange={(e) => setSearchResult(e.target.value)}
          className={classes.search}
        />

        <SpareLoading2
          isLoading={appState.loading}
          spareparts={appState.spare}
        />
      </Container>
    </React.Fragment>
  );
}
export default AdminSpare;
