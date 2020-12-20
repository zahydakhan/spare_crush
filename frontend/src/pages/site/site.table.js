import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { Users, Phone, Mail, Home, MapPin } from "react-feather";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: 120,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  mainContainer: {
    width: "100%",
    paddingTop: "0.5em",
  },
  itemContainer: {
    marginBottom: "1em",
    backgroundColor: "#ebedf1",
    padding: "0.5em",
    margin: "0.25em",
  },
  siteText: {
    color: "#06A557",
    fontWeight: "bold",
  },
  iconcard: {
    height: "1.2em",
  },
});

export default function SimpleCard({ sites }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  console.log(sites);
  return (
    <Grid container direction='column' className={classes.mainContainer}>
      {sites.map((site) => {
        return (
          <Grid
            item
            container
            direction='row'
            justify='flex-start'
            spacing={4}
            className={classes.itemContainer}
          >
            <Grid item lg={4} xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant='h3' component='h2'>
                    Site Name:{" "}
                    <span className={classes.siteText}>{site.site}</span>
                  </Typography>
                  <br />

                  <Grid container alignItems='center' direction='row'>
                    <Grid item>
                      <Typography variant='body2' component='p'>
                        Address : {site.address + " " + site.state}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Grid container alignItems='center'>
                    <Grid item>
                      <Users className={classes.iconcard} />
                    </Grid>
                    <Grid item>
                      <Typography variant='h5' component='h2'>
                        Manager : {site.manager_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container alignItems='center'>
                    <Grid item>
                      <Mail className={classes.iconcard} />
                    </Grid>
                    <Grid item>
                      <Typography variant='body2' component='p'>
                        {site.manager_email}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center'>
                    <Grid item>
                      <Phone className={classes.iconcard} />
                    </Grid>
                    <Grid item>
                      <Typography variant='body2' component='p'>
                        {site.manager_phone}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Card className={classes.root}>
                <CardContent>
                  <Grid container alignItems='center'>
                    <Grid item>
                      <Users className={classes.iconcard} />
                    </Grid>
                    <Grid item>
                      <Typography variant='h5' component='h2'>
                        Supervior : {site.supervisor_name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container alignItems='center'>
                    <Grid item>
                      <Mail className={classes.iconcard} />
                    </Grid>
                    <Grid item>
                      <Typography variant='body2' component='p'>
                        {site.supervisor_email}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container alignItems='center'>
                    <Grid item>
                      <Phone className={classes.iconcard} />
                    </Grid>
                    <Grid item>
                      <Typography variant='body2' component='p'>
                        {site.supervisor_phone}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}
