import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import axiosInstance from "../../utils/axios";

import Helmet from "react-helmet";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import {
  Avatar,
  Button,
  CardActions,
  CardMedia as MuiCardMedia,
  Chip as MuiChip,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { withStyles } from "@material-ui/core/styles";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const CustomTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.025);
  }
`;

// Data
let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function CustomizedTableDemo({ selectedSite, selectedVendor, selectedMonth }) {
  const [filteredData, setFilteredData] = React.useState([]);
  const [siteData, setSiteData] = React.useState([]);

  useEffect(() => {
    axiosInstance.get("/pr/main_pr/").then((res) => {
      console.log(res.data.data);
      const data1 = res.data.data;
      console.log(selectedSite);
      console.log(filteredData);

      {
        const result = data1.filter((item) => {
          const { site_name, vendor_name, month } = item;

          return (
            selectedSite.includes(site_name) &&
            selectedVendor.includes(vendor_name) &&
            selectedMonth.includes(month)
          );
        });

        {
          console.log(result);
          selectedSite.length ? setFilteredData(result) : setFilteredData([]);
        }
      }
    });
  }, [selectedSite, selectedVendor, selectedMonth]);

  useEffect(() => {
    axiosInstance.get("/sites/sites/").then((res) => {
      console.log(res.data.data);
      const data2 = res.data.data;
      console.log(selectedSite);
      console.log(siteData);

      {
        const result1 = data2.filter((item) => {
          const { site } = item;

          return selectedSite.includes(site);
        });

        {
          console.log(result1);
          selectedSite.length ? setSiteData(result1) : setSiteData([]);
        }
      }
    });
  }, [selectedSite]);

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant='h6' gutterBottom>
          Site Name : {siteData.length ? siteData[0].site : ""}
        </Typography>
        <Typography variant='h6' gutterBottom>
          Site Adress : {siteData.length ? siteData[0].address : ""}
        </Typography>

        <Grid container direction='row'>
          <Grid item>
            <Card mb={6}>
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Manager Name :{" "}
                  {siteData.length ? siteData[0].manager_name : ""}
                </Typography>
                Manager Email :{" "}
                {siteData.length ? siteData[0].manager_email : ""}
                <Typography mb={4} component='p'>
                  Manager Phone :{" "}
                  {siteData.length ? siteData[0].manager_phone : ""}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item>
            <Card mb={6}>
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  Supervisor Name :{" "}
                  {siteData.length ? siteData[0].supervisor_name : ""}
                </Typography>
                Supervisor Email :{" "}
                {siteData.length ? siteData[0].supervisor_email : ""}
                <Typography mb={4} component='p'>
                  Supervisor Phone :{" "}
                  {siteData.length ? siteData[0].supervisor_phone : ""}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Part Number </CustomTableCell>
              <CustomTableCell align='right'>Description</CustomTableCell>
              <CustomTableCell align='right'>Vendor Name</CustomTableCell>
              <CustomTableCell align='right'>Month</CustomTableCell>
              <CustomTableCell align='right'>Quantity</CustomTableCell>
            </TableRow>
          </TableHead>
          {filteredData.map((row) => (
            <CustomTableRow key={row.id}>
              <CustomTableCell component='th' scope='row'>
                {row.part_number}
              </CustomTableCell>
              <CustomTableCell align='right'>{row.description}</CustomTableCell>
              <CustomTableCell align='right'>{row.vendor_name}</CustomTableCell>
              <CustomTableCell align='right'>{row.month}</CustomTableCell>
              <CustomTableCell align='right'>{row.quantity}</CustomTableCell>
            </CustomTableRow>
          ))}
        </Table>
      </Paper>
    </Card>
  );
}

export default CustomizedTableDemo;
