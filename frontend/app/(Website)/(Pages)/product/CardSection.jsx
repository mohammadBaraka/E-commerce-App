"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { ThemeContext } from "Context/ToggleMode";

const CardSection = ({
  displayProducts,
  token,
  isError,
  msgInfo,
  msgAddToCart,
  loginPage,
}) => {
  const { mode, toggle } = React.useContext(ThemeContext);
  console.log(mode);
  return (
    <>
      {displayProducts?.data?.length > 0 ? (
        <section className=" p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start flex-1 ">
          {displayProducts?.data.map((product) => {
            return (
              <Card
                className={`${
                  mode === "dark" ? "bg-white" : "bg-transparent"
                } relative text-green-500`}
                key={product?.id}
              >
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
                      color={`${mode === "dark" ? "blue-gray" : "white"}`}
                      className="font-medium ml-2"
                    >
                      {product?.name}
                    </Typography>
                    <Typography
                      color={`${mode === "dark" ? "blue-gray" : "white"}`}
                      className="font-medium mb-4"
                    >
                      ${product?.price}
                    </Typography>
                  </div>
                  <Typography
                    variant="small"
                    color={`${mode === "dark" ? "gray" : "white"}`}
                    className="font-normal opacity-75 my-6"
                  >
                    {product?.description.slice(0, 50)}
                    <Link href={`/product/${product.id}`}>
                      
                      <span className="font-bold text-teal-300">Read More</span>
                    </Link>
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0 ">
                  {!token?.user && (
                    <Button
                      onClick={
                        isError
                          ? () =>
                              msgInfo(
                                "unauthorized",
                                "You Should Login To Ordering...",
                                loginPage
                              )
                          : () => msgAddToCart(product)
                      }
                      ripple={false}
                      fullWidth={true}
                      className="absolute bottom-3 
                  right-3  w-[90%]
                   bg-teal-300 text-white shadow-none
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
          <p className="text-3xl font-bold text-primary">No Products Found!</p>
        </div>
      )}
    </>
  );
};

export default CardSection;
