import React, { useEffect } from "react";
import RollerUpload from "./roller-uploads";
import SparePartsUpload from "./spare-upload";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SpareIcon from "../../assets/Images/sparepart1.png";
import RollerIcon from "../../assets/Images/roller.png";
import DownloadIcon from "../../assets/Images/download.svg";
import UploadIcon from "../../assets/Images/file-upload.svg";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  spareicon: {
    height: "2em",
  },
  download: {
    padding: "1em 1em",
    borderBottom: "1px solid #eee",
  },
  cardTtitle: {
    fontSize: "1.2em",
    fontWeight: 400,
    marginLeft: "0.5em",
  },
  button: {
    marginTop: "0.5em",
    marginLeft: "3em",
  },
  uploadicon: {
    height: "3em",
  },
  uploadTitle: {
    margin: "0.2em",
  },
  uploadSubtitle: {
    margin: "0 0 0.5em 0.3em",
    fontSize: "1.2em",
    fontWeight: 400,
  },
  spareCard: {
    height: "100%",
  },
}));

const Uploads = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container
        container
        fixed
        component="main"
        className={classes.mainContainer}
      >
        <Grid container spacing={6}>
          <Grid item sm={6}>
            <Card className={classes.spareCard}>
              <CardContent>
                <Grid container>
                  <Grid item>
                    <img
                      src={SpareIcon}
                      className={classes.uploadicon}
                      alt="spare parts icon"
                    />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.uploadTitle} variant="h3">
                      Spare Parts Data
                    </Typography>
                    <Typography className={classes.uploadSubtitle}>
                      Upload Data
                    </Typography>
                    <SparePartsUpload />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Card>
              <CardContent>
                <Grid container direction="column">
                  <Grid container item className={classes.download}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <img
                          src={DownloadIcon}
                          className={classes.spareicon}
                          alt="download icon"
                        />
                      </Grid>
                      <Grid item>
                        <Typography className={classes.cardTtitle}>
                          Download Data
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" className={classes.button}>
                        Download
                      </Button>
                    </Grid>
                  </Grid>
                  {/* -------------------------------- */}
                  <Grid container item className={classes.download}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <img
                          src={DownloadIcon}
                          className={classes.spareicon}
                          alt="download icon"
                        />
                      </Grid>
                      <Grid item>
                        <Typography className={classes.cardTtitle}>
                          Reset Table
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" className={classes.button}>
                        Download
                      </Button>
                    </Grid>
                  </Grid>
                  {/* -------------------------------- */}
                  <Grid container item className={classes.download}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <img
                          src={DownloadIcon}
                          className={classes.spareicon}
                          alt="download icon"
                        />
                      </Grid>
                      <Grid item>
                        <Typography className={classes.cardTtitle}>
                          Data Template
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" className={classes.button}>
                        Download
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid item sm={6}>
            <Card className={classes.spareCard}>
              <CardContent>
                <Grid container>
                  <Grid item>
                    <img
                      src={RollerIcon}
                      className={classes.uploadicon}
                      alt="spare parts icon"
                    />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.uploadTitle} variant="h3">
                      Roller Spare Parts Data
                    </Typography>
                    <Typography className={classes.uploadSubtitle}>
                      Upload Data
                    </Typography>
                    <RollerUpload />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Card>
              <CardContent>
                <Grid container direction="column">
                  <Grid container item className={classes.download}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <img
                          src={UploadIcon}
                          className={classes.spareicon}
                          alt="upload icon"
                        />
                      </Grid>
                      <Grid item>
                        <Typography className={classes.cardTtitle}>
                          Download Table
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" className={classes.button}>
                        Download
                      </Button>
                    </Grid>
                  </Grid>
                  {/* -------------------------------- */}
                  <Grid container item className={classes.download}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <img
                          src={UploadIcon}
                          className={classes.spareicon}
                          alt="upload icon"
                        />
                      </Grid>
                      <Grid item>
                        <Typography className={classes.cardTtitle}>
                          Reset Table
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" className={classes.button}>
                        Download
                      </Button>
                    </Grid>
                  </Grid>
                  {/* -------------------------------- */}
                  <Grid container item className={classes.download}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <img
                          src={UploadIcon}
                          className={classes.spareicon}
                          alt="upload icon"
                        />
                      </Grid>
                      <Grid item>
                        <Typography className={classes.cardTtitle}>
                          Data Template
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" className={classes.button}>
                        Download
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Uploads;
