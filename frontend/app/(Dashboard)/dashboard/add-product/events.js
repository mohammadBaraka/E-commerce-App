import { msgError, msgSuccess } from "utils/handleMessage";

export const handleEdit = (product, setUpdateMode, setInputs) => {
  setUpdateMode(true);
  setInputs({
    id: product.id || "",
    name: product.name || "",
    description: product.description || "",
    richDescription: product.richDescription || "",
    image: product.image || null,
    brand: product.brand || "",
    price: product.price || 0,
    category: product.category?.id || "",
    countInstock: product.countInstock || 0,
    isFeatured: product.isFeatured || false,
  });

  scroll({
    top: 0,
    behavior: "smooth",
  });
};

export const handleDelete = (id, deleteProduct, handleReset) => {
  deleteProduct(id).then((res) => {
    if (res?.error?.status === 400)
      return msgError(res?.error?.data.message || "Something went wrong");
    msgSuccess(res?.data?.message || "Product deleted successfully");
    handleReset();
  });
};
