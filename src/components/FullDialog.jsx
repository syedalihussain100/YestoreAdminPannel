import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box, TextField, Select, MenuItem } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { useFormik } from "formik";
import { CategoryListAction } from "../store/CategorySlice/category";
import { BrandListAction } from "../store/BrandSlice/Brand";
import { CreateProductAction } from "../store/ProductSlice/Product";
import { useDispatch, useSelector } from "react-redux";
import { ResturantListAction } from "../store/ResturantSlice/Resturant";




// Function to strip HTML tags
const stripHtmlTags = (html) => {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  address: yup.string().required("Address is Required"),
  category: yup.string().required("Category is Required"),
  quantity: yup.number().required("Quantity is Required"),
});


export default function FullScreenDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  const { brand } = useSelector((state) => state.brand);
  const { resturant } = useSelector((state) => state.resturant);

  useEffect(() => {
    dispatch(CategoryListAction());
  }, [dispatch]);


  useEffect(() => {
    dispatch(BrandListAction())
  }, [dispatch]);

  useEffect(() => {
    dispatch(ResturantListAction())
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      quantity: "",
      images: "",
      address: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {

      const cleanDescription = stripHtmlTags(values.description);
      dispatch(CreateProductAction({
        ...values,
        description: cleanDescription,
      }));
      formik.resetForm();
    },
  });

  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create New Product
          </Typography>
          <Button autoFocus color="inherit" onClick={formik.handleSubmit}>
            save
          </Button>
        </Toolbar>
      </AppBar>

      <div style={{ padding: "20px" }}>
        <Box sx={{ width: "100%" }}>
          <TextField
            id="title"
            name="title"
            label="Create Title"
            variant="outlined"
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ mb: 2 }}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <ReactQuill
            id="description"
            theme="snow"
            name="description"
            value={formik.values.description}
            onChange={(content, delta, source, editor) => {
              formik.setFieldValue("description", content);
            }}
            onBlur={() => formik.setFieldTouched("description", true)}
            style={{ width: "100%", marginBottom: "15px" }}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <TextField
            name="price"
            id="price"
            label="Price"
            variant="outlined"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ width: '100%', marginBottom: '20px', border: "1px solid gray", padding: "10px 10px", cursor: "pointer" }}
          >
            {/* Option for placeholder */}
            <option value="" disabled>Select Category</option>

            {/* Map over the category array to generate options */}
            {category && category.map((categoryItem) => (
              <option
                key={categoryItem?._id}
                value={categoryItem?.title}
                style={{ color: 'black', backgroundColor: 'white' }}
              >
                {categoryItem?.title}
              </option>
            ))}
          </select>

          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <TextField
            id="quantity"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Quantity"
            variant="outlined"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <select
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ width: '100%', marginBottom: '20px', border: "1px solid gray", padding: "10px 10px", cursor: "pointer" }}
          >
            {/* Option for placeholder */}
            <option value="" disabled>Select Resturant Address</option>

            {/* Map over the category array to generate options */}
            {resturant && resturant.map((resturantItem) => (
              <option
                key={resturantItem?._id}
                value={resturantItem?.address}
                style={{ color: 'black', backgroundColor: 'white' }}
              >
                {resturantItem?.address}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.address && formik.errors.address}
          </div>
          <select
            id="brand"
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            sx={{ mb: 2 }}
            style={{ width: '100%', marginBottom: '20px', border: "1px solid gray", padding: "10px 10px", cursor: "pointer" }}
          >
            <option value="" disabled>Select Brand</option>

            {/* Map over the category array to generate options */}
            {brand && brand.map((brandItem) => (
              <option
                key={brandItem?._id}
                value={brandItem?.title}
                style={{ color: 'black', backgroundColor: 'white' }}
              >
                {brandItem?.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => formik.setFieldValue("images", acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>

          </div>
        </Box>
      </div>
    </Dialog >
  );
}
