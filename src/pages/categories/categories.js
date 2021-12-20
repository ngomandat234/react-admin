import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import axiosClient from "../../app/AxiosClient";
// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Categories(props) {
  var classes = useStyles();
  var theme = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosClient.get("/api/categories").then((res) => {
      setData(res.data);
      console.log(res);
    });
  }, []);

  function handleChangeState(value) {
    console.log(value);
  }

  function handleDelete(value) {
    console.log(value);
  }

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },

    // {
    //   name: "Actions",
    //   options: {
    //     filter: false,
    //     customBodyRender: (value, tableMeta, updateValue) => (
    //       <div className={classes.actionContainer}>
    //         <span onClick={() => handleChangeState(tableMeta.rowData[0])}>
    //           Pending
    //         </span>
    //         <span onClick={() => handleChangeState("pending")}>Shipping</span>
    //         <span onClick={() => handleChangeState("pending")}>Delivered</span>
    //         <span onClick={() => handleDelete(value)}>Delete</span>
    //       </div>
    //     ),
    //   },
    // },
  ];

  return (
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Product List"
            data={data}
            columns={columns}
            options={{
              filterType: "checkbox",
              enableNestedDataAccess: ".",
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
