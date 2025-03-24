"use client";
import { ThemeContext } from "Context/ToggleMode";
import styles from "./Toggle.module.css";
import * as React from "react";
export default function ToggleSwitch() {
  const { mode, toggle } = React.useContext(ThemeContext);

  return (
    <div>
      <label className={styles.switch} onChange={toggle}>
        <input type="checkbox" />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
}
