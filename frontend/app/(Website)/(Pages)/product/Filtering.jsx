import { Input, Radio } from "@material-tailwind/react";

const Filtering = ({
  categories,
  getProductByCategory,
  limit,
  page,
  setSearch,
  setCategoriesIds,
}) => {
  return (
    <>
      <div className=" flex flex-col  border-2 border-teal-400  px-4 py-2 rounded-xl ">
        <h3 className="text-2xl text-center my-8 font-Bold h-auto">
          Filter By Category
        </h3>
        <div className="w-72">
          <Input
            label="Search About Product"
            color="teal"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start">
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
          {categories?.data.map((category) => {
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
    </>
  );
};

export default Filtering;
