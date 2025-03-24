"use client";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { cartSlice, clear, deleteFromCart } from "lib/slices/CartSlise";
import { TrashIcon } from "@heroicons/react/24/solid";
import { msgConfirm } from "utils/handleMessage";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
  const carts = useAppSelector((state) => state.cart);
  const totalPrice = carts.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  const dispatch = useAppDispatch();

  const clearAll = () => {
    dispatch(clear());
  };

  return (
    <div>
      <section className="">
        <div className="mx-auto mt-5 max-w-screen-xl p-8 sm:px-6 sm:py-12 lg:px-8   min-h-screen">
          <div className="mx-auto max-w-3xl border-2 border-primary p-8">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                {`Your Cart (${carts?.length})`}
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {carts.length > 0 && (
                  <Button
                    className="flex items-center gap-2"
                    onClick={() => msgConfirm("Want To Clear", clearAll)}
                    color="red"
                  >
                    Clear All
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                )}
                {carts?.map((cart, index) => {
                  return (
                    <li className="flex items-center gap-4" key={cart.id}>
                      <div className="relative h-16 w-16 rounded object-cover">
                        <Image src={cart?.image} alt={cart?.name} fill />
                      </div>

                      <div>
                        <h3 className="text-lg text-gray-900">{cart.name}</h3>

                        <dl className="mt-0.5 space-y-px text-16px] text-gray-600">
                          <div>
                            <dt className="inline">Brand:</dt>
                            <dd className="inline">{cart?.brand}</dd>
                          </div>

                          <div>
                            <dt className="inline">Price:</dt>
                            <dd className="inline">
                              {cart.price * cart.quantity}$
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <input
                            defaultValue={cart?.quantity}
                            type="number"
                            id="Line1Qty"
                            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <label htmlFor="Line1Qty" className="">
                            Quantity
                          </label>
                        </form>

                        <TrashIcon
                          className="w-6 h-6 text-red-300 cursor-pointer"
                          onClick={() => dispatch(deleteFromCart(cart))}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>

              {carts.length > 0 ? (
                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-end gap-2 font-bold text-2xl">
                        <dt>Total Price</dt>
                        <dd>{totalPrice} $</dd>
                      </div>
                    </dl>

                    <div className="flex justify-end">
                      <Link
                        href="/cart/order"
                        className="block rounded bg-primary px-5 py-3 text-sm text-white transition hover:bg-secondary"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 flex justify-center border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-center !text-base font-medium">
                        <dt className="text-2xl font-bold">
                          Add Product To Check Out...
                        </dt>
                      </div>
                    </dl>

                    <div className="flex justify-center">
                      <Link
                        href="/product"
                        className="block rounded bg-primary px-5 py-3 text-sm text-white transition hover:bg-secondary"
                      >
                        Products
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
