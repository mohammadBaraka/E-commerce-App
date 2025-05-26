import { Option, Select } from "@material-tailwind/react";
import PaginatedItems from "utils/Paginate";

const Pagination = ({ setPage, displayProducts, setLimit }) => {
  return (
    <div className="flex justify-center items-center my-8 gap-6 border-2 border-gray-400 rounded-lg ">
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
  );
};

export default Pagination;
