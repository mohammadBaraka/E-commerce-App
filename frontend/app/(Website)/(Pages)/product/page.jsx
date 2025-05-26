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
  const [showFilter, setShowFilter] = React.useState(false);

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

      <div className="w-full px-4 sm:px-6 lg:px-8 mt-5 min-h-screen">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-teal-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
              />
            </svg>
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <section className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Filter Section */}
          <div
            className={`lg:block ${
              showFilter ? "block" : "hidden"
            } lg:w-80 lg:flex-shrink-0`}
          >
            <div className="lg:sticky lg:top-4">
              <Filtering
                categories={categories}
                getProductByCategory={getProductByCategory}
                limit={limit}
                page={page}
                setSearch={setSearch}
                setCategoriesIds={setCategoriesIds}
                setShowFilter={setShowFilter}
              />
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1 min-w-0">
            <CardSection
              displayProducts={displayProducts}
              token={token}
              isError={isError}
              msgInfo={msgInfo}
              msgAddToCart={msgAddToCart}
              loginPage={loginPage}
            />
          </div>
        </section>

        <Pagination
          displayProducts={displayProducts}
          setPage={setPage}
          setLimit={setLimit}
        />
      </div>
    </>
  );
}
