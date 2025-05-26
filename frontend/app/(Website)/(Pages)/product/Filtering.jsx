"use client";
import { Input, Radio } from "@material-tailwind/react";
import React from "react";
const Filtering = ({
  categories,
  getProductByCategory,
  limit,
  page,
  setSearch,
  setCategoriesIds,
  setShowFilter,
}) => {
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleCategoryChange = (categoryId, categoryName) => {
    setSelectedCategory(categoryId);
    applyFilters(categoryId, minPrice, maxPrice);
    setCategoriesIds(categoryId);

    // Close filter on mobile after selection
    if (window.innerWidth < 1024 && setShowFilter) {
      setShowFilter(false);
    }
  };

  const handlePriceFilter = () => {
    applyFilters(selectedCategory, minPrice, maxPrice);
  };

  const applyFilters = (categoryId, min, max) => {
    getProductByCategory({
      limit,
      page,
      categories: categoryId,
      minPrice: min || undefined,
      maxPrice: max || undefined,
    });
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
    getProductByCategory({
      limit,
      page,
      categories: "",
    });
    setCategoriesIds("");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col border-2 border-teal-400 px-4 py-4 rounded-xl bg-white/5 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-center flex-1">
            Filter Products
          </h3>
          {/* Close button for mobile */}
          <button
            onClick={() => setShowFilter && setShowFilter(false)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search Input */}
        <div className="w-full mb-6">
          <Input
            label="Search Products"
            color="teal"
            size="lg"
            className="text-sm sm:text-base"
            containerProps={{
              className: "min-w-0",
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Price Range Filter */}
        <div className="mb-6  border-2 border-gray-400 rounded-lg p-2">
          <h4 className="font-semibold text-lg mb-4 text-teal-600">
            Price Range
          </h4>
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <Input
                label="Min Price"
                type="number"
                color="teal"
                size="md"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="text-sm"
              />
              <Input
                label="Max Price"
                type="number"
                color="teal"
                size="md"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="text-sm"
              />
            </div>
            <button
              onClick={handlePriceFilter}
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors text-sm"
            >
              Apply Price Filter
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="space-y-3 border-2 border-gray-400 rounded-lg p-2">
          <h4 className="font-semibold text-lg mb-4 text-teal-600">
            Categories
          </h4>

          <div className="space-y-2 max-h-64 sm:max-h-80 overflow-y-auto">
            {/* All Products Option */}
            <div className="flex items-center p-2 hover:bg-teal-50 rounded-lg transition-colors">
              <Radio
                checked={selectedCategory === ""}
                label="All Products"
                value="all"
                color="teal"
                id="All"
                name="categories"
                className="text-sm sm:text-base"
                onChange={() => handleCategoryChange("", "All")}
              />
            </div>

            {/* Category Options */}
            {categories?.data?.map((category) => (
              <div
                key={category?.id}
                className="flex items-center p-2 hover:bg-teal-50 rounded-lg transition-colors"
              >
                <Radio
                  checked={selectedCategory === category?.id}
                  label={category?.name}
                  color="teal"
                  id={category.name}
                  name="categories"
                  value={category.id}
                  className="text-sm sm:text-base"
                  onChange={() =>
                    handleCategoryChange(category?.id, category?.name)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-6">
          <button
            onClick={clearFilters}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            Clear All Filters
          </button>
        </div>

        {/* Apply Button for Mobile */}
        <div className="lg:hidden mt-4">
          <button
            onClick={() => setShowFilter && setShowFilter(false)}
            className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-600 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filtering;
