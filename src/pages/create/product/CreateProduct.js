import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import PageTitle from "../../../components/PageTitle";
import Widget from "../../../components/Widget";
import Select from "@material-ui/core/Select";
import axiosClient from "../../../app/AxiosClient";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
// styles
// import useStyles from "./styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  spaceTop: {
    marginTop: "20px",
  },
}));

export default function CreateProduct() {
  var classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState({});
  const [categories, setCategories] = useState([]);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    axiosClient.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  function postNewProduct() {
    var newProduct = { ...values };
    newProduct.price = parseInt(newProduct.price);

    axiosClient
      .post("/api/products", newProduct)
      .then((result) => {
        Swal.fire("Thêm sản phẩm thành công!", "", "success");
        history.push("/app/products");
      })
      .catch((err) => {
        Swal.fire("Thêm sản phẩm thất bại!", "", "error");
      });
  }

  return (
    <>
      <PageTitle title="Create product" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Widget title="Basic data" disableWidgetMenu>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <div>
                  <FormControl fullWidth required className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-amount">
                      Product name
                    </InputLabel>
                    <Input
                      id="product-name"
                      value={values?.name}
                      onChange={handleChange("name")}
                    />
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div>
                  <FormControl fullWidth required className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-amount">
                      Author
                    </InputLabel>
                    <Input
                      id="product-name"
                      value={values?.author}
                      onChange={handleChange("author")}
                    />
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <div>
                  <FormControl fullWidth required className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-amount">
                      Price
                    </InputLabel>
                    <Input
                      id="product-name"
                      value={values?.price}
                      onChange={handleChange("price")}
                      type="number"
                    />
                  </FormControl>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <div>
                  <FormControl fullWidth required className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-amount">
                      Category
                    </InputLabel>
                    <Input
                      id="product-name"
                      value={values?.category}
                      onChange={handleChange("category")}
                    />
                  </FormControl>
                </div> */}
                <div>
                  <FormControl fullWidth className={classes.margin}>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values?.categoryId}
                      onChange={(event) =>
                        setValues({ ...values, categoryId: event.target.value })
                      }
                    >
                      {categories.map((category) => {
                        return (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </Grid>
            </Grid>
            {/* <Grid container spacing={4}>
              <Grid item xs={12} md={values.stock === "notInStock" || values.stock !== null ? 6 : 12}>
                <div>
                  <FormControl fullWidth className={classes.margin}>
                    <InputLabel id="demo-simple-select-label">Stock status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values?.stock}
                      onChange={handleChange('stock')}
                    >

                      <MenuItem value={"inStock"}>In stock</MenuItem>
                      <MenuItem value={"notInStock"}>Out of stock</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Grid>
              {
                values?.stock === "inStock" &&
                <Grid item xs={12} md={6}>
                  <div>
                    <FormControl fullWidth required className={classes.margin}>
                      <InputLabel htmlFor="standard-adornment-amount">Product quantity</InputLabel>
                      <Input
                        id="product-name"
                        value={values?.quantity}
                        onChange={handleChange('quantity')}
                        type="number"
                      />
                    </FormControl>
                  </div>
                </Grid>
              }
            </Grid> */}
          </Widget>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <Widget title="Product related data" disableWidgetMenu>
            <div>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values?.categoryId}
                  onChange={(event) =>
                    setValues({ ...values, categoryId: event.target.value })
                  }
                >
                  {categories.map((category) => {
                    return (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">
                  Fresh level
                </InputLabel>
                <Input
                  id="product-name"
                  value={values?.freshNess}
                  onChange={handleChange("freshNess")}
                />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">
                  Product origin farm
                </InputLabel>
                <Input
                  id="product-name"
                  value={values?.farm}
                  onChange={handleChange("farm")}
                />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">
                  Product origin country
                </InputLabel>
                <Input
                  id="product-name"
                  value={values?.origin}
                  onChange={handleChange("origin")}
                />
              </FormControl>
            </div>
          </Widget>
        </Grid> */}
        <Grid item xs={12} md={12}>
          <Widget title="Detailed data" disableWidgetMenu>
            <div>
              <FormControl fullWidth required className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">
                  Product image
                </InputLabel>
                <Input
                  id="product-name"
                  value={values?.image}
                  onChange={handleChange("image")}
                />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth required className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">
                  Product description
                </InputLabel>
                <Input
                  id="product-name"
                  value={values?.description}
                  onChange={handleChange("description")}
                />
              </FormControl>
            </div>
            {/* <div>
              <FormControl fullWidth required className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">
                  Product snippet
                </InputLabel>
                <Input
                  id="product-name"
                  value={values?.snippet}
                  onChange={handleChange("snippet")}
                />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">
                  Product cooking guide
                </InputLabel>
                <Input
                  id="product-name"
                  value={values?.howToCook}
                  onChange={handleChange("howToCook")}
                />
              </FormControl>
            </div> */}
            <div className={classes.spaceTop}>
              <Button
                variant="contained"
                color="primary"
                onClick={postNewProduct}
              >
                Crate new product
              </Button>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
