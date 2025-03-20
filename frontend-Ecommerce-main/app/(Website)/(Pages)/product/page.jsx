"use client";
import { useGetCategoriesQuery } from "lib/apis/categoriesSlice";
import { useAppDispatch } from "lib/hooks";
import { addToCart } from "lib/slices/CartSlise";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Radio,
  Select,
  Option,
  Input,
} from "@material-tailwind/react";
import * as React from "react";
import Link from "next/link";
import { useGetTokenQuery } from "lib/apis/authSlice";
import { useRouter } from "next/navigation";
import { msgInfo, msgSuccess } from "utils/handleMessage";
import {
  useGetProductByCategoryMutation,
  useSearchProductQuery,
} from "lib/apis/productSlice";
import PaginatedItems from "utils/Paginate";
import Loader from "components/Loader/Loader";
import Image from "next/image";

export default function Products() {
  const router = useRouter();
  const { data: token, isLoading, isError } = useGetTokenQuery(null);
  const { data: ctaegories, isLoading: categoriesLoading } =
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

  const { data: searchData, isLoading: searcLoading } =
    useSearchProductQuery(search);

  const displayProducts = search.length > 0 ? searchData : products;
  return (
    <>
      {isLoading ||
      categoriesLoading ||
      productByCategoryLoading ||
      searcLoading ? (
        <Loader />
      ) : null}
      <h3 className="text-2xl text-center my-8 font-Bold ">
        Filter By Category
      </h3>
      <div className=" flex x items-center gap-4 w-[95%] border-2 border-teal-400 xl:w-fit px-4 py-2 m-auto rounded-xl">
        <div className="w-72">
          <Input
            label="Search About Product"
            color="teal"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div
          className="grid grid-cols-1 justify-center
     md:grid-cols-3 xl:grid-cols-4
        "
        >
          <Radio
            defaultChecked
            label="All Products"
            value="all"
            color="teal"
            type="radio"
            id="All"
            name="categories"
            onClick={() => {
              getProductByCategory({
                limit,
                page,
                categories: "",
              }),
                setCategoriesIds("");
            }}
          />
          {ctaegories?.data.map((category) => {
            return (
              <div className="" key={category?.id}>
                <Radio
                  label={category?.name}
                  color="teal"
                  type="radio"
                  id={category.name}
                  name="categories"
                  value={category.id}
                  onClick={() => {
                    getProductByCategory({
                      limit,
                      page,
                      categories: category?.id,
                    }),
                      setCategoriesIds(category?.id);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <section className="mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0 mt-5 w-[100%] md:w-[95%] xl:w-[90%] min-h-screen">
        {displayProducts?.data?.length > 0 ? (
          <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start">
            {displayProducts?.data.map((product) => {
              return (
                <Card className="w-[100%] h-[100%] relative" key={product?.id}>
                  <CardHeader shadow={false} floated={false} className="h-96">
                    <Link href={`/product/${product.id}`}>
                      <div className="h-full w-full">
                        <Image src={product?.image} alt={product?.name} fill />
                      </div>
                    </Link>
                  </CardHeader>
                  <CardBody>
                    <div className="mb-2 flex items-center justify-between">
                      <Typography
                        color="blue-gray"
                        className="font-medium ml-2"
                      >
                        {product?.name}
                      </Typography>
                      <Typography
                        color="blue-gray"
                        className="font-medium mb-4"
                      >
                        ${product?.price}
                      </Typography>
                    </div>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal opacity-75 my-6"
                    >
                      {product?.description}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0 ">
                    {!token?.user && (
                      <Button
                        onClick={
                          isError
                            ? () =>
                                msgInfo(
                                  "Unothorized",
                                  "You Should Login To Ordering...",
                                  loginPage
                                )
                            : () => msgAddToCart(product)
                        }
                        ripple={false}
                        fullWidth={true}
                        className="absolute bottom-3 
                    right-3  w-[90%]
                     bg-teal-900/10 text-blue-gray-900 shadow-none
                      hover:scale-105 hover:shadow-none 
                      focus:scale-105 focus:shadow-none active:scale-100"
                      >
                        Add to Cart
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </section>
        ) : (
          <div className="flex justify-center items-center mx-8">
            <p className="text-3xl font-bold text-primary">
              No Products Found!
            </p>
          </div>
        )}
        <div className="flex justify-center items-center gap-6 mt-8 px-4">
          <div className="flex w-72 flex-col gap-6 text-xl">
            <Select
              onChange={(e) => setLimit(+e)} // Call handleLimitChange when the select value changes
              name="limit"
              variant="outlined"
              label="Limit Of Products"
            >
              <Option value="8">8</Option>
              <Option value="12">12</Option>
              <Option value="14">14</Option>
              <Option value="18">18</Option>
              <Option value="20">20</Option>
            </Select>
          </div>

          <PaginatedItems
            total={displayProducts?.totalProducts}
            setPage={setPage}
          />
        </div>
      </section>
    </>
  );
}
