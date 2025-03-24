"use client";
import { useGetCategoriesQuery } from "lib/apis/categoriesSlice";
import { useAppDispatch } from "lib/hooks";
import { addToCart } from "lib/slices/CartSlise";
import * as React from "react";
import { useGetTokenQuery } from "lib/apis/authSlice";
import { useRouter } from "next/navigation";
import { msgInfo, msgSuccess } from "utils/handleMessage";
import {
  useGetProductByCategoryMutation,
  useSearchProductQuery,
} from "lib/apis/productSlice";
import Loader from "components/Loader/Loader";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import CardSection from "./CardSection";

export default function Products() {
  const router = useRouter();
  const { data: token, isLoading, isError } = useGetTokenQuery(null);
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery(null);

  const [
    getProductByCategory,
    { data: products, isLoading: productByCategoryLoading },
  ] = useGetProductByCategoryMutation();
  const dispatch = useAppDispatch();
  const loginPage = () => {
    router.push("/login");
  };

  const msgAddToCart = (product) => {
    dispatch(addToCart(product));
    msgSuccess("Product Added Success!");
  };

  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const [search, setSearch] = React.useState("");
  const [categoriesIds, setCategoriesIds] = React.useState("");

  React.useEffect(() => {
    getProductByCategory({
      limit,
      page,
      categories: categoriesIds,
    });
  }, [limit, page]);

  const { data: searchData, isLoading: searchLoading } =
    useSearchProductQuery(search);

  const displayProducts = search.length > 0 ? searchData : products;
  return (
    <>
      {isLoading ||
      categoriesLoading ||
      productByCategoryLoading ||
      searchLoading ? (
        <Loader />
      ) : null}

      <section className="flex justify-end gap-5 p-10 md:py-12 px-0 md:p-8 md:px-0 mt-5 w-[95%] mx-auto  min-h-screen">
        <Filtering
          categories={categories}
          getProductByCategory={getProductByCategory}
          limit={limit}
          page={page}
          setSearch={setSearch}
          setCategoriesIds={setCategoriesIds}
        />
        <CardSection
          displayProducts={displayProducts}
          token={token}
          isError={isError}
          msgInfo={msgInfo}
          msgAddToCart={msgAddToCart}
          loginPage={loginPage}
        />
      </section>
      <Pagination
        displayProducts={displayProducts}
        setPage={setPage}
        setLimit={setLimit}
      />
    </>
  );
}
