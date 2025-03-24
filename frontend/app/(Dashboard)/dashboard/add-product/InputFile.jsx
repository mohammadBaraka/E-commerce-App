"use client";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";
import styles from "./AddProduct.module.css";
export default function InputFile({ inputs, handleChange }) {
  return (
    <label className={styles.custum_file_upload} htmlFor={inputs.image}>
      <div className={styles.icon}>
        <DocumentArrowUpIcon />
      </div>
      <div className={styles.text}>
        <span>Click to upload image</span>
      </div>
      <input
        type="file"
        id={inputs.image}
        name="image"
        onChange={handleChange}
      />
    </label>
  );
}
