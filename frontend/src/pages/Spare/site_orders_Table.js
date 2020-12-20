import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import axiosInstance from "../../utils/axios";

import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import { getCurrentDate } from "../../utils/getCurrentDate";

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
    id: "unit_price",
    numeric: true,
    disablePadding: false,
    label: "Unit Price",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "total_price",
    numeric: true,
    disablePadding: false,
    label: "Total Price",
  },
  {
    id: "pr_number",
    numeric: true,
    disablePadding: false,
    label: "PR Number",
  },
  {
    id: "line_number",
    numeric: true,
    disablePadding: false,
    label: "Line Number",
  },
  {
    id: "site_name",
    numeric: true,
    disablePadding: false,
    label: "Site Name",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Month",
  },
  {
    id: "add",
    numeric: true,
    disablePadding: false,
    label: "Add",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
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
  onSelectAllClick: PropTypes.func.isRequired,
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
    borderColor: theme.palette.common.green,
  },
  head: {
    backgroundColor: theme.palette.common.green,
  },
  head_cell: {
    color: "#000",
    fontSize: "0.9em",
  },
  btn: {
    align: "center",
  },
}));

export default function EnhancedTable({ rows }) {
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
    console.log(row);
    console.log(row.quantity);
    row.month = getCurrentDate();
    axiosInstance
      .post(`/pr/main_pr/`, {
        part_number: row.part_number,
        description: row.description,
        vendor_name: row.vendor_name,
        unit_price: parseFloat(row.unit_price),
        quantity: parseFloat(row.quantity),
        total_price: parseFloat(row.total_price),
        pr_number: row.pr_number,
        line_number: row.line_number,
        site_name: row.site_name,
        month: row.month,
      })
      .then((res) => console.log(row));

    axiosInstance
      .delete("/pr/sites_pr/" + row.id)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(function () {
        window.location.reload();
      });
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <Container className={classes.root} disableGutters maxWidth={false}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={dense ? "small" : "medium"}
            aria-label='enhanced table'
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
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
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
                        {row.unit_price}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.quantity}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.total_price}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.pr_number}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.line_number}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {row.site_name}
                      </TableCell>
                      <TableCell className={classes.tableFont}>
                        {getCurrentDate()}
                      </TableCell>
                      <TableCell className={classes.btn}>
                        <Button
                          variant='outlined'
                          className={classes.button}
                          onClick={handleSubmit(row)}
                        >
                          Add
                        </Button>
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
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      />
    </Container>
  );
}
