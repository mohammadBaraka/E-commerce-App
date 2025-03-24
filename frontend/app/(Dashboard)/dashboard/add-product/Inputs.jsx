import styles from "./AddProduct.module.css";
export default function Inputs({
  updateMode,
  handleChange,
  categories,
  inputs,
}) {
  return (
    <>
      <p className={styles.title}>
        {updateMode ? "Update Product" : "Add Product"}
      </p>
      <select
        onChange={handleChange}
        name="category"
        value={inputs.category}
        className="py-4 px-2 border-solid border-teal-400 border-2 border-spacing-0 rounded-lg outline-none bg-transparent"
      >
        <option value="" className="text-teal-500">
          Select Category
        </option>
        {categories?.data.map((category) => (
          <option key={category.id} value={category.id} className="bg-gray-200">
            {category.name}
          </option>
        ))}
      </select>
      <label>
        <input
          className={styles.input}
          type="text"
          value={inputs.name}
          name="name"
          onChange={handleChange}
        />
        <span>Name</span>
      </label>
      <label>
        <textarea
          className={styles.input}
          value={inputs.description}
          name="description"
          onChange={handleChange}
        />
        <span>Discription</span>
      </label>

      <label>
        <input
          className={styles.input}
          type="text"
          value={inputs.richDescription}
          name="richDescription"
          onChange={handleChange}
        />
        <span>Rich Description</span>
      </label>
      <label>
        <input
          className={styles.input}
          type="text"
          value={inputs.brand}
          name="brand"
          onChange={handleChange}
        />
        <span>Brand</span>
      </label>

      <div className={styles.flex}>
        <label>
          <input
            className={styles.input}
            type="number"
            value={inputs.price}
            name="price"
            onChange={handleChange}
          />
          <span>Price</span>
        </label>

        <label>
          <input
            className={styles.input}
            type="number"
            value={inputs.countInstock}
            name="countInstock"
            onChange={handleChange}
          />
          <span>Count Instock</span>
        </label>
      </div>
      <select
        name="isFeatured"
        id=""
        className="py-4 px-2 border-solid border-teal-400 border-2 border-spacing-0 rounded-lg outline-none bg-transparent"
        onChange={handleChange}
      >
        <option value="" className="text-teal-500">
          Select Category
        </option>

        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      {updateMode ? (
        <button className={`${styles.submit}`}>Update</button>
      ) : (
        <button className={`${styles.submit}`}>Submit</button>
      )}

      {/*//?===========UPLOAD AN IMAGE=============*/}
    </>
  );
}
