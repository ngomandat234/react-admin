import React, { useState, useEffect } from "react";
import {
  Grid,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import axiosClient from "../../app/AxiosClient"
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Swal from 'sweetalert2'
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

export default function Orders(props) {
  var classes = useStyles();
  var theme = useTheme();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  function reloadData() {
    axiosClient.get("/api/orders/admin").then(res => {
      setData(res.data);
    })
  }

  useEffect(() => {
    reloadData()
  }, [])

  function handleChangeState(value, state) {
    axiosClient.put(`/api/orders?id=${value}`, {
      status: state
    }).then(result => {
      Swal.fire({
        icon: 'success',
        text: `Changed order state to ${state}`
      })
      reloadData()
    }).catch(err => Swal.fire({
      icon: 'error',
      text: err.message ?? "Error"
    }))
  }

  function handleDelete(value) {
    axiosClient.delete(`/api/orders?id=${value}`).then(result => {
      Swal.fire({
        icon: 'success',
        text: `Deleted ${value}`
      })
      reloadData()
    }).catch(err => Swal.fire({
      icon: 'error',
      text: err.message ?? "Error"
    }))
  }


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "User.username",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "User.email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "total",
      label: "Total price",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "createdAt",
      label: "Created at",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <span>{moment(value).locale("vi").format("LLL")}</span>
        )
      }
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "Actions",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <div className={classes.actionContainer}>
            <Button variant="contained" color="primary" onClick={() => handleChangeState(tableMeta.rowData[0], 'pending')}>Pending</Button>
            <Button variant="contained" color="primary" onClick={() => handleChangeState(tableMeta.rowData[0], 'shipping')}>Shipping</Button>
            <Button variant="contained" color="primary" onClick={() => handleChangeState(tableMeta.rowData[0], 'delivered')}>Delivered</Button>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(value)}>Delete</Button>
          </div>
        )
      }
    },
  ];

  return (
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={data}
            columns={columns}
            options={{
              filterType: "checkbox",
              enableNestedDataAccess: '.'
            }}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid> */}
      </Grid>
    </>
  );
}