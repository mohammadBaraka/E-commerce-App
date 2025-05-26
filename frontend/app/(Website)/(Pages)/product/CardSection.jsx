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
import ScrollAnimation from "components/ScrollAnimation/ScrollAnimation";

const CardSection = ({
  displayProducts,
  token,
  isError,
  msgInfo,
  msgAddToCart,
  loginPage,
}) => {
  const { mode, toggle } = React.useContext(ThemeContext);
  
  return (
    <div className="w-full">
      {displayProducts?.data?.length > 0 ? (
        <ScrollAnimation>
          {/* Products Count */}
          <div className="mb-4 sm:mb-6">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Showing {displayProducts.data.length} products
            </p>
          </div>

          {/* Products Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
            {displayProducts?.data.map((product) => {
              return (
                <Card
                  className={`${
                    mode === "dark" ? "bg-white" : "bg-transparent"
                  } relative text-green-500 h-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700`}
                  key={product?.id}
                >
                  <CardHeader
                    shadow={false}
                    floated={false}
                    className="h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-t-lg"
                  >
                    <Link href={`/product/${product.id}`}>
                      <div className="h-full w-full relative group">
                        <Image
                          src={product?.image}
                          alt={product?.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          priority={true}
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            View Details
                          </span>
                        </div>
                      </div>
                    </Link>
                  </CardHeader>
                  
                  <CardBody className="px-4 sm:px-6 py-3 sm:py-4 flex-1">
                    <div className="mb-2 sm:mb-3 flex items-start justify-between gap-2">
                      <Typography
                        color={`${mode === "dark" ? "blue-gray" : "white"}`}
                        className="font-semibold text-sm sm:text-base lg:text-lg line-clamp-2 flex-1"
                      >
                        {product?.name}
                      </Typography>
                      <Typography
                        color={`${mode === "dark" ? "blue-gray" : "white"}`}
                        className="font-bold text-lg sm:text-xl text-teal-600 flex-shrink-0"
                      >
                        ${product?.price}
                      </Typography>
                    </div>
                    
                    <Typography
                      variant="small"
                      color={`${mode === "dark" ? "gray" : "white"}`}
                      className="font-normal opacity-75 text-xs sm:text-sm line-clamp-3 mb-4"
                    >
                      {product?.description.slice(0, 80)}...
                      <Link href={`/product/${product.id}`}>
                        <span className="font-bold text-teal-500 ml-1 hover:underline cursor-pointer">
                          Read More
                        </span>
                      </Link>
                    </Typography>
                  </CardBody>
                  
                  <CardFooter className="pt-0 pb-4 px-4 sm:px-6">
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
                        className="bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-teal-700 focus:from-teal-600 focus:to-teal-700 active:from-teal-700 active:to-teal-800 text-sm sm:text-base py-3 sm:py-4 rounded-lg transition-all duration-300 font-semibold"
                      >
                        Add to Cart
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </section>
        </ScrollAnimation>
      ) : (
        <div className="flex flex-col justify-center items-center py-16 sm:py-24">
          <div className="text-center">
            <svg className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H6a1 1 0 00-1 1v1m16 0V4a1 1 0 00-1-1H6a1 1 0 00-1 1v1" />
            </svg>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              No Products Found!
            </p>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardSection;
