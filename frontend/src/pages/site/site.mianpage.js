import React, { useEffect, useState } from "react";
import SiteData from "./site.table";
import SparepartsLoading from "../spareparts/loading.component";
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
    paddingLeft: "4em",
    paddingRight: "4em",
    marginBottom: "6em",
    marginTop: "2em",
  },
  search: {
    height: "3em",
    fontSize: "1.2em",
    paddingLeft: "2em",
  },
  title: {
    fontFamily: "Merriweather",
    fontWeight: 700,
    fontSize: "1.5em",
    marginLeft: "0.7em",
  },
  spareicon: {
    height: "3em",
  },
  tableHeading: {
    margin: "1em 0",
  },
}));

function SiteMainComponent() {
  const SiteLoading = SparepartsLoading(SiteData);
  const [siteState, setSiteState] = useState({
    loading: true,
    sites: null,
  });
  const classes = useStyles();
  const theme = useTheme();
  const [searchResult, setSearchResult] = React.useState("");

  useEffect(() => {
    axiosInstance.get(`/sites/sites/`).then((res) => {
      const sitesData = res.data.data;
      console.log(sitesData);

      if (searchResult) {
        const filteredData = sitesData.filter((cty) =>
          cty.site.toLowerCase().includes(searchResult.toLowerCase())
        );
        console.log(filteredData);
        setSiteState({ loading: false, sites: filteredData });
      } else {
        setSiteState({ loading: false, sites: sitesData });
      }
    });
  }, [searchResult]);

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
              Sites Details
            </Typography>
          </Grid>
        </Grid>

        <input
          type='Search'
          placeholder='Search Sites'
          onChange={(e) => setSearchResult(e.target.value)}
          className={classes.search}
        />

        <SiteLoading isLoading={siteState.loading} sites={siteState.sites} />
      </Container>
    </React.Fragment>
  );
}
export default SiteMainComponent;
