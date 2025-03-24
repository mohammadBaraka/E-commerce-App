"use client";
import * as React from "react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "lib/apis/categoriesSlice";
import CategoryTable from "./categoryTable";
import Loader from "components/Loader/Loader";
import { msgError, msgSuccess } from "utils/handleMessage";
import styles from "./category.module.css";
export default function AddCategory() {
  // ?==================QUERY AND MUTATION====================
  const { data: categories, isLoading } = useGetCategoriesQuery(null);
  const [createCategory, { isLoading: loadingCategory }] =
    useCreateCategoryMutation();

  const [deleteCategory, { isLoading: deletedLoading }] =
    useDeleteCategoryMutation();

  const [updateCategory, { isLoading: updatedLoading }] =
    useUpdateCategoryMutation();

  // ?==================HNADLE MESSAGE ERROR OR SUCCESS====================

  const [inputs, setInputs] = React.useState({
    id: "",
    name: "",
    color: "",
    icon: "",
  });
  const [modeUpdate, setModeUpdate] = React.useState(false);

  function handleReset() {
    setModeUpdate(false);
    setInputs({
      id: "",
      name: "",
      color: "",
      icon: "",
    });
  }

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modeUpdate) {
      updateCategory(inputs).then((res) => {
        if (res?.error?.status === 400)
          return msgError(res?.error?.data.message || "Something went wrong");
        msgSuccess("Category updated successfully");
        handleReset();
      });
    } else {
      createCategory(inputs).then((res) => {
        if (res?.error?.status === 400)
          return msgError(res?.error?.data.message || "Something went wrong");
        msgSuccess("Category created successfully");
        handleReset();
      });
    }
  };
  const handleEdit = (category) => {
    setModeUpdate(true);
    setInputs({
      id: category.id,
      name: category.name || "",
      color: category.color || "",
      icon: category.icon || "",
    });
    scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  const hndleDelete = (id) => {
    deleteCategory(id).then((res) => {
      if (res?.error?.status === 400)
        return msgError(res?.error?.data.message || "Something went wrong");
      msgSuccess("Category deleted successfully");
    });
  };
  return (
    <>
      {isLoading || loadingCategory || updatedLoading || deletedLoading ? (
        <Loader />
      ) : null}
      <div className="flex justify-center">
        <section className="flex flex-col items-center justify-center xl:flex xl:flex-row xl:justify-between xl:items-center">
          <form className={styles.form} onSubmit={handleSubmit}>
            <p className={styles.title}>
              {modeUpdate ? "Update Category" : "Add Category"}
            </p>

            <label>
              <input
                className={styles.input}
                type="text"
                placeholder=""
                name="name"
                value={inputs.name}
                onChange={handleChange}
              />
              <span>Name</span>
            </label>

            <label>
              <input
                className={styles.input}
                type="text"
                placeholder=""
                name="color"
                value={inputs.color}
                onChange={handleChange}
              />
              <span>Color</span>
            </label>
            <label>
              <input
                className={styles.input}
                type="text"
                placeholder=""
                name="icon"
                value={inputs.icon}
                onChange={handleChange}
              />
              <span>Icon</span>
            </label>

            {modeUpdate ? (
              <button className={`${styles.submit}`}>Update</button>
            ) : (
              <button className={`${styles.submit}`}>Submit</button>
            )}
          </form>
        </section>
      </div>
      {/*//?======================TABLE====================== */}
      <CategoryTable
        categories={categories?.data}
        handleEdit={handleEdit}
        hndleDelete={hndleDelete}
        handleReset={handleReset}
      />
    </>
  );
}
