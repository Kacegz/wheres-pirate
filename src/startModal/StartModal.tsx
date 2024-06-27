import { createPortal } from "react-dom";
import styles from "./startModal.module.scss";
import { useEffect, useState } from "react";

export default function Modal() {
  const [open, setOpen] = useState(true);
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
            <div className={styles.modal}>
              <button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Start the game
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
