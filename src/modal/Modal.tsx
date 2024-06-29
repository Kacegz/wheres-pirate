import { createPortal } from "react-dom";
import styles from "./modal.module.scss";
import { useEffect } from "react";
interface Modal {
  open: boolean;
  children: React.ReactElement;
}
export default function Modal({ open, children }: Modal) {
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
