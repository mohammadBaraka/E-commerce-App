import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
export default function OtherPosts({
  categories,
  token,
  isError,
  msgInfo,
  msgAddToCart,
  loginPage,
}) {
  return (
    <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start mt-8 ">
      {categories?.data.map((product) => {
        return (
          <Card className="w-[100%] h-[100%] relative" key={product?.id}>
            <CardHeader shadow={false} floated={false} className="h-96">
              <Link href={`/product/${product.id}`}>
                <div className="relative h-full w-full">
                  <Image src={product?.image} alt={product?.name} fill />
                </div>
              </Link>
            </CardHeader>
            <CardBody>
              <div className="mb-2 flex items-center justify-between">
                <Typography color="blue-gray" className="font-medium ml-2">
                  {product?.name}
                </Typography>
                <Typography color="blue-gray" className="font-medium mb-4">
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
                    right-3 w-[90%]
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
  );
}
