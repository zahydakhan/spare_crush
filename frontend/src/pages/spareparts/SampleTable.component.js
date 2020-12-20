import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../redux/actions/cart/cart.actions";
import styled from "styled-components";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert, AlertTitle } from "@material-ui/lab";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "part_number",
    numeric: true,
    disablePadding: false,
    label: "Part Number",
  },
  {
    id: "description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "vendor_name",
    numeric: true,
    disablePadding: false,
    label: "Vendor Name",
  },
  {
    id: "aud",
    numeric: true,
    disablePadding: false,
    label: "Price AUD",
  },
  {
    id: "weight_kg",
    numeric: true,
    disablePadding: false,
    label: "Weight (kg)",
  },
  { id: "machine", numeric: true, disablePadding: false, label: "Machine" },
  {
    id: "model_number",
    numeric: true,
    disablePadding: false,
    label: "Model Number",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Local Price",
  },
  {
    id: "vendor_name",
    numeric: true,
    disablePadding: false,
    label: "Vendor Name",
  },
  {
    id: "savings",
    numeric: true,
    disablePadding: false,
    label: "Savings",
  },
  {
    id: "add",
    numeric: true,
    disablePadding: false,
    label: "Add to Order",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,

    order,
    orderBy,

    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.head}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.head_cell}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,

  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "1em",
    marginLeft: 0,
    marginRight: 0,
  },
  paper: {
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableFont: {
    fontSize: "0.8em",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  form: {
    display: "flex",
  },
  input: {
    width: "6em",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#388e3c",
    color: "#fff",
    borderColor: "//#region",
    marginLeft: "1em",
    hover: {
      color: "#000",
    },
  },
  head: {
    backgroundColor: theme.palette.common.green,
  },
  head_cell: {
    color: "#22303e",
    fontSize: "0.85em",
  },
}));

export default function EnhancedTable({ rows, cart, setCart }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [addQuantity, setAddQuantity] = React.useState(0);
  const theme = useTheme();
  const [audToUsd, setAudToUsd] = React.useState(0.0);
  const [submitError, setSubmitError] = React.useState();
  const Alert = styled(MuiAlert)(spacing);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=USD`)
      .then((res) => res.json())
      .then((rec) => setAudToUsd(rec["rates"]["AUD"]));
  }, [audToUsd]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleSubmit = (row) => (event) => {
    event.preventDefault();
    console.log(event.target[0].value);
    if (
      event.target[0].value === 0 &&
      typeof event.target[0].value !== "number"
    ) {
      setSubmitError("Invalid quantity");
      return "error";
    }

    console.log(row);
    row.quantity = event.target[0].value;
    console.log(row);
    dispatch(addItem(row));
    // setCart([...cart, row]);
    console.log(row);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Container className={classes.root} disableGutters maxWidth={false}>
      <Paper className={classes.paper}>
        {submitError ? (
          <Alert mb={4} variant="outlined" severity="error">
            {submitError}
          </Alert>
        ) : (
          ""
        )}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell className={classes.tableFont}>
                        {row.part_number}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.description}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.vendor_name}
                      </TableCell>

                      <TableCell className={classes.tableFont}>
                        {row.aud
                          ? row.aud
                          : (
                              parseFloat(row.usd) * parseFloat(audToUsd)
                            ).toFixed(2)}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.weight_kg}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.machine}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.model_number}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {parseFloat(row.comparison_sparepart[0])
                          ? parseFloat(row.comparison_sparepart[0].aud)
                          : ""}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.comparison_sparepart[0]
                          ? row.comparison_sparepart[0].vendor_name
                          : ""}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.comparison_sparepart[0]
                          ? (row.comparison_sparepart[0].aud - row.aud).toFixed(
                              2
                            )
                          : 0}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        <div>
                          <form
                            className={classes.form}
                            onSubmit={handleSubmit(row)}
                          >
                            <input
                              type="number"
                              placeholder={addQuantity}
                              onChange={(e) => setAddQuantity(e.target.value)}
                              value={addQuantity}
                              className={classes.input}
                            />
                            <Button
                              type="submit"
                              variant="outlined"
                              className={classes.button}
                            >
                              Add
                            </Button>
                          </form>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Container>
  );
}
