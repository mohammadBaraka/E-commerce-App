"use client";
import {
  CloudArrowUpIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import * as React from "react";
import styles from "./AddProduct.module.css";
import Table from "./TablesProduct";
import Inputs from "./Inputs";
import InputFile from "./InputFile";

import { Button } from "@material-tailwind/react";
import { useGetCategoriesQuery } from "lib/apis/categoriesSlice";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGalleryMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from "lib/apis/productSlice";
import { msgError, msgSuccess } from "utils/handleMessage";
import Loader from "components/Loader/Loader";
import { handleEdit } from "./events";
import Image from "next/image";
export default function AddProducts() {
  const { data: categories, isLoading } = useGetCategoriesQuery(null);
  const [createProduct, { isLoading: loadingProduct }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: deletedLoading }] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const [gallery, { data: galleries, isLoading: galleryLoading }] =
    useGalleryMutation();
  const [productDeatails, setProductDetails] = React.useState(false);
  const [updateMode, setUpdateMode] = React.useState(false);
  const [moreImages, SetMoreImages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [inputs, setInputs] = React.useState({
    id: "",
    name: "",
    description: "",
    richDescription: "",
    image: null,
    brand: "",
    price: 0,
    category: "",
    countInstock: 0,
    isFeatured: false,
    images: null,
  });
  const { data: productsData, isLoading: loadingProucts } = useGetProductQuery({
    limit,
    page,
    categories: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleReset = () => {
    setInputs({
      id: "",
      name: "",
      description: "",
      richDescription: "",
      image: null,
      images: [],
      brand: "",
      price: 0,
      category: "",
      countInstock: 0,
      isFeatured: false,
    });
    SetMoreImages([]);
    setUpdateMode(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("richDescription", inputs.richDescription);
    formData.append("image", inputs.image);
    formData.append("brand", inputs.brand);
    formData.append("price", inputs.price);
    formData.append("category", inputs.category);
    formData.append("countInstock", inputs.countInstock);
    formData.append("isFeatured", inputs.isFeatured);

    if (updateMode) {
      const id = inputs.id;
      updateProduct({ id, formData }).then((res) => {
        if (res?.error?.status === 400)
          return msgError(res?.error?.data.message || "Something went wrong");
        if (res?.error?.status === 500)
          return msgError(res?.error?.data.message || "Something went wrong");
        msgSuccess(res?.data?.message || "Updated Success");
        setUpdateMode(false);
        handleReset();
      });
    } else {
      createProduct(formData).then((res) => {
        if (res?.error?.status === 400)
          return msgError(
            res?.error?.data.message || "All Flailds Are Required"
          );
        msgSuccess(res?.data?.message || "Product created successfully");
        handleReset();
      });
    }
  };

  //?UPLOAD MORE IMAGES(GALLERY)
  const setPorductId = (product) => {
    setInputs({
      id: product.id || "",
      images: product.images || [],
    });
    SetMoreImages(product?.images);
  };

  const hndleUploadMoreImages = () => {
    const images = new FormData();
    for (let i = 0; i < moreImages.length; i++) {
      images.append("images", moreImages[i]);
    }
    gallery({ id: inputs.id, images }).then((res) => {
      if (res?.error?.status === 400)
        return msgError(res?.error?.data.message || "Something went wrong");
      msgSuccess(res?.data?.message || "Images uploaded successfully");
      SetMoreImages([]);
      setProductDetails(false);
    });
  };
  const spliceImages = (index) => {
    moreImages.splice(index, 1);
    SetMoreImages([...moreImages]);
  };
  const imagesShow = moreImages?.map((image, index) => {
    return image?.type ? (
      <div className="relative" key={index}>
        <div className="relative w-24 h-24 rounded-md">
          <Image src={URL.createObjectURL(image)} alt="Image Url" fill />
        </div>
        <TrashIcon
          className="w-6 h-w-6 text-red-400 absolute top-0 right-0 cursor-pointer"
          onClick={() => spliceImages(index)}
        />
      </div>
    ) : (
      <div key={index} className="relative w-24 h-24 rounded-md">
        <Image src={image} alt="Image Url" fill />
      </div>
    );
  });
  return (
    <>
      {isLoading ||
      loadingProduct ||
      deletedLoading ||
      loadingProucts ||
      updateLoading ||
      galleryLoading ? (
        <Loader />
      ) : null}

      <div className="flex flex-row justify-center items-center">
        <section className="flex flex-col items-center justify-center xl:flex xl:flex-row xl:justify-between xl:items-center">
          <div
            className={`w-[80%] xl:w-[40%] h-auto xl:left-[40%]  bg-white shadow-2xl text-white fixed p-6  ${
              productDeatails ? "top-40" : "-top-[100%]"
            } transition-all  duration-1000 z-40`}
          >
            <div className="mt-10">
              <label className={styles.custum_file_upload} htmlFor="images">
                <div className={styles.icon}>
                  <CloudArrowUpIcon />
                </div>
                <div className={styles.text}>
                  <span>Upload More Images</span>
                </div>
                <input
                  type="file"
                  id="images"
                  name="files"
                  multiple
                  onChange={(e) => SetMoreImages([...e.target.files])}
                />
              </label>
              <Button
                color="teal"
                className="mt-2 w-full flex items-center justify-center gap-3 text-md font-bold"
                onClick={hndleUploadMoreImages}
              >
                Upload Images <CloudArrowUpIcon className="w-8" />
              </Button>

              {moreImages?.length > 0 && (
                <div className="flex flex-col gap-2 mt-4">
                  <h2 className="text-gray-600 font-bold">More Images</h2>

                  <div className="flex items-center gap-4">{imagesShow}</div>
                </div>
              )}
            </div>
            <XCircleIcon
              className="w-9 h-w-9 absolute top-0 right-0 cursor-pointer text-red-300"
              onClick={() => setProductDetails(false)}
            />
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/*//?======================Inputs====================== */}
            <Inputs
              categories={categories}
              handleChange={handleChange}
              inputs={inputs}
              updateMode={updateMode}
            />
            <InputFile
              inputs={inputs}
              changeImages={(e) => SetMoreImages([...e.target.files])}
              handleChange={handleChange}
            />

            {inputs?.image?.type ? (
              <div className="flex flex-col justify-start gap-2 ">
                <h2 className="text-gray-600 font-bold">Main Image</h2>
                <div className="relative rounded-xl w-24 h-24">
                  <Image
                    src={URL.createObjectURL(inputs?.image)}
                    alt="mainImage"
                    fill
                  />
                </div>
              </div>
            ) : (
              inputs?.image && (
                <div className="flex flex-col justify-start gap-2 ">
                  <h2 className="text-gray-600 font-bold">Main Image</h2>
                  <div className="relative rounded-xl w-24 h-24">
                    <Image src={inputs.image} alt="mainImage" fill />
                  </div>
                </div>
              )
            )}
          </form>
        </section>
        {/*//?======================TABLE====================== */}
      </div>
      <Table
        products={productsData?.data}
        handleEdit={handleEdit}
        totalProducts={productsData?.totalProducts}
        handleReset={handleReset}
        setPage={setPage}
        setLimit={setLimit}
        setProuductDetails={setProductDetails}
        setProductId={setPorductId}
        setInputs={setInputs}
        setUpdateMode={setUpdateMode}
        deleteProduct={deleteProduct}
      />
    </>
  );
}
