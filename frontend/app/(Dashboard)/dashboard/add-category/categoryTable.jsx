import { msgConfirm } from "utils/handleMessage";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
export default function CategoryTable({
  categories,
  handleEdit,
  hndleDelete,
  handleReset,
}) {
  return (
    <div className="w-full flex justify-center items-center mt-8">
      <div className="w-full xl:w-[50%] mb-12 xl:mb-0 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-transparent w-full mb-6 shadow-lg rounded ">
          <div className="block w-full overflow-x-auto">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-bold text-blueGray-700 text-lg ">
                  Your Categories
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <Button
                  onClick={handleReset}
                  className="bg-primary text-white active:bg-primary text-md font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Clear Inputs
                </Button>
              </div>
            </div>
            <table className="items-center bg-transparent w-full border-collapse text-2xl ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    ID
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Brand
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Price
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-lg uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {categories?.map((category, index) => {
                  return (
                    <tr key={category.id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        {index + 1}
                      </th>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        {category.name}
                      </th>

                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        {category.color}
                      </th>

                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        {category.icon}
                      </th>

                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center text-blueGray-700">
                        <section className="flex justify-center items-center gap-2">
                          <div className="group relative">
                            <button onClick={() => handleEdit(category)}>
                              <PencilSquareIcon className="font-bold w-8 text-blue-400 hover:scale-125 duration-200 hover:stroke-blue-400" />
                            </button>
                            <span
                              className="absolute -top-14 left-[50%] 
                              -translate-x-[50%] z-20 origin-left scale-0 px-3 
                              rounded-lg border border-gray-300 bg-white py-2 
                              text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100"
                            >
                              Edit
                            </span>
                          </div>
                          <div className="group relative">
                            <button
                              onClick={() =>
                                msgConfirm(
                                  `You Want To Delete This ${category.name}`,
                                  () => hndleDelete(category.id)
                                )
                              }
                            >
                              <TrashIcon className="font-bold w-8 text-red-400 hover:scale-125 duration-200 hover:stroke-red-400" />
                            </button>
                            <span
                              className="absolute -top-14 left-[50%] 
                              -translate-x-[50%] z-20 origin-left scale-0 px-3 
                              rounded-lg border border-gray-300 bg-white py-2 
                              text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100"
                            >
                              Delte
                            </span>
                          </div>
                        </section>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
