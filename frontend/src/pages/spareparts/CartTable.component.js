import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Delete from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux/reducers/cart/cart.selectors";

import { RemoveItem } from "../../redux/actions/cart/cart.actions";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  deleteButton: {
    color: "#e63946",
  },
  tableContainer: {
    marginTop: "2em",
  },
  title: {
    fontSize: "2em",
  },
  formControl: {
    margin: theme.spacing(),
    minWidth: 120,
  },
  mainContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "6em",
  },
  root: {
    minWidth: 100,
    minHeight: 150,
    marginTop: "2em",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: "1.3em",
    color: theme.palette.common.green,
  },
  purchase: {
    ...theme.typography.h2,
    fontSize: "1.7em",
    marginRight: "0.3em",
  },
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
  subHeading: {
    fontWeight: "bold",
    marginRight: "0.5em",
  },
  total: {
    ...theme.typography.h2,
    fontSize: "1em",
    marginTop: "1em",
    fontFamily: "Roboto",
  },
  totalCon: {
    border: "1px solid #e0e0e0",
    padding: "0.5em",
  },
  save: {
    marginRight: "1em",
    backgroundColor: theme.palette.common.yellow,
  },
  po_info: {
    fontSize: "1em",
  },
  table_head: {
    backgroundColor: theme.palette.common.green,
  },
  table_cell: {
    color: '#1a1414"',
  },
}));

const BasicTable = () => {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => selectCartItems(state));

  const [audToUsd, setAudToUsd] = React.useState(0.0);

  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=USD`)
      .then((res) => res.json())
      .then((rec) => setAudToUsd(rec["rates"]["AUD"]));
  }, [audToUsd]);

  const removeFromCart = (productToRemove) => {
    dispatch(RemoveItem(productToRemove));
  };

  return (
    <Container
      container
      fixed
      //minWidth="md"
      component='main'
      className={classes.mainContainer}
    >
      {cartItems.length ? (
        <Grid>
          <Grid
            container
            justify='center'
            direction='column'
            className={classes.tableContainer}
          >
            <Grid item>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead className={classes.table_head}>
                    <TableRow>
                      <TableCell className={classes.table_cell} align='center'>
                        Part Number
                      </TableCell>
                      <TableCell align='center' className={classes.table_cell}>
                        Description
                      </TableCell>
                      <TableCell align='center' className={classes.table_cell}>
                        Vendor Name
                      </TableCell>
                      <TableCell align='center' className={classes.table_cell}>
                        Unit Price
                      </TableCell>
                      <TableCell align='center' className={classes.table_cell}>
                        Quantity
                      </TableCell>
                      <TableCell align='center' className={classes.table_cell}>
                        Total
                      </TableCell>
                      <TableCell align='center' className={classes.table_cell}>
                        Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.length
                      ? cartItems.map((cartItem) => (
                          <TableRow key={cartItem.id}>
                            <TableCell align='center'>
                              {cartItem.bearing
                                ? cartItem.bearing
                                : cartItem.part_number}
                            </TableCell>
                            <TableCell align='center'>
                              {cartItem.bearing
                                ? `${cartItem.description} - ${cartItem.roller_diameter} x ${cartItem.wall_thickness} x ${cartItem.roller_length}`
                                : cartItem.description}
                            </TableCell>
                            <TableCell align='center'>
                              {cartItem.vendor_name}
                            </TableCell>
                            <TableCell align='center'>
                              $
                              {cartItem.aud
                                ? cartItem.aud
                                : (
                                    parseFloat(cartItem.usd) *
                                    parseFloat(audToUsd)
                                  ).toFixed(2)}
                            </TableCell>
                            <TableCell align='center'>
                              {cartItem.quantity}
                            </TableCell>
                            <TableCell align='center'>
                              $
                              {cartItem.aud
                                ? (cartItem.aud * cartItem.quantity).toFixed(2)
                                : (
                                    parseFloat(cartItem.usd) *
                                    parseFloat(audToUsd) *
                                    cartItem.quantity
                                  ).toFixed(2)}
                            </TableCell>
                            <TableCell align='center'>
                              <Delete
                                className={classes.deleteButton}
                                onClick={() => removeFromCart(cartItem)}
                              ></Delete>
                            </TableCell>
                          </TableRow>
                        ))
                      : "No order added"}
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align='center'>Total Quantity:</TableCell>
                      <TableCell align='center'>
                        <Typography className={classes.total}>
                          {cartItems.reduce(
                            (acc, curr) =>
                              parseFloat(acc) + parseFloat(curr.quantity),
                            0
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align='center'>Total Price:</TableCell>
                      <TableCell align='center'>
                        <Typography className={classes.total}>
                          $
                          {cartItems
                            .reduce(
                              (acc, curr) =>
                                parseFloat(acc) +
                                parseFloat(curr.quantity) *
                                  (curr.aud
                                    ? parseFloat(curr.aud)
                                    : parseFloat(curr.usd) * audToUsd),
                              0
                            )
                            .toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div>No Order Added</div>
      )}
    </Container>
  );
};

export default BasicTable;
