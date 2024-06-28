import { createPortal } from "react-dom";
import styles from "./modal.module.scss";
import { useEffect, useState } from "react";

export default function Modal({ open, children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);
  return (
    <>
      {open &&
        createPortal(
          <div className={styles.overlay}>
            <div className={styles.modal}>{children}</div>
          </div>,
          document.body
        )}
    </>
  );
}
