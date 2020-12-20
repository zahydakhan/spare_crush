import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1em",
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  head_cell: {
    color: "#fff",
    backgroundColor: "#000",
  },
}));

const Rollers = (props) => {
  const { rollers } = props;
  console.log(rollers);
  const classes = useStyles();
  if (!rollers || rollers.length === 0)
    return <p>Can not find any posts, sorry</p>;
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.head_cell} align="left">
                  ID
                </TableCell>
                <TableCell className={classes.head_cell} align="left">
                  Description
                </TableCell>
                <TableCell className={classes.head_cell} align="left">
                  Roller Diameter
                </TableCell>
                <TableCell className={classes.head_cell} align="left">
                  Wall Thickness
                </TableCell>
                <TableCell className={classes.head_cell} align="left">
                  Roller Length
                </TableCell>
                <TableCell className={classes.head_cell} align="left">
                  Shaft Diameter
                </TableCell>
                <TableCell className={classes.head_cell} align="left">
                  Bearing
                </TableCell>
                <TableCell className={classes.head_cell} align="left">
                  AUD
                </TableCell>
                <TableCell className={classes.head_cell} align="left">
                  USD
                </TableCell>
                <TableCell className={classes.head_cell} align="left">
                  Vendor Name
                </TableCell>
                <TableCell className={classes.head_cell} align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rollers.map((spr) => {
                return (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {spr.id}
                    </TableCell>
                    <TableCell align="left">{spr.description}</TableCell>
                    <TableCell align="left">{spr.roller_diameter}</TableCell>
                    <TableCell align="left">{spr.wall_thickness}</TableCell>
                    <TableCell align="left">{spr.roller_length}</TableCell>
                    <TableCell align="left">{spr.shaft_diameter}</TableCell>
                    <TableCell align="left">{spr.bearing}</TableCell>
                    <TableCell align="left">{spr.aud}</TableCell>
                    <TableCell align="left">{spr.usd}</TableCell>
                    <TableCell align="left">{spr.vendor_name}</TableCell>

                    <TableCell align="left">
                      <Link
                        color="textPrimary"
                        href={"/rollerEdit/" + spr.id}
                        className={classes.link}
                      >
                        <EditIcon></EditIcon>
                      </Link>
                      <Link
                        color="textPrimary"
                        href={"/rollerDelete/" + spr.id}
                        className={classes.link}
                      >
                        <DeleteForeverIcon></DeleteForeverIcon>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={4} align="right">
                  <Button
                    href={"/rollerAdd"}
                    variant="contained"
                    color="primary"
                  >
                    Add Roller Spare Part
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
};
export default Rollers;
