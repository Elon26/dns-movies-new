import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import React, { FC, useEffect } from "react";
import close from "../../../assets/SVG/Close/Close.svg";
import { IModal } from "./models/IModal";
import Image from "next/image";

const Modal: FC<IModal> = ({ visible, children, callback }) => {
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [visible]);

    return (
        <>
            {visible
                ? createPortal(
                      <div className={styles.Modal}>
                          <div
                              className={styles.Modal__content}
                              onClick={(e: React.MouseEvent) =>
                                  e.stopPropagation()
                              }
                          >
                              {children}
                          </div>
                          <div
                              className={styles.Modal__exit}
                              onClick={() => {
                                  callback();
                              }}
                          >
                              <Image
                                  src={close}
                                  alt=""
                                  width={30}
                                  height={30}
                              />
                          </div>
                      </div>,
                      document.body
                  )
                : ""}
        </>
    );
};

export default Modal;
