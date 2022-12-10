import React, { useRef, useCallback } from "react";
import Image from "react-bootstrap/Image";

type Props = {
  src: string;
  alt?: string;
};

export const ImageDialog = ({ src, alt = "" }: Props) => {
  const ref = useRef<HTMLDialogElement | null>(null);

  const handleOpenDialog = useCallback(() => {
    if (ref.current) ref.current.showModal();
  }, [ref]);

  const handleCloseDialog = useCallback(() => {
    if (ref.current) ref.current.close();
  }, [ref]);

  return (
    <React.Fragment>
      <div
        role="button"
        onClick={handleOpenDialog}
        onKeyDown={handleOpenDialog}
        style={customStyle.imageBox}
        tabIndex={0}
      >
        <Image src={src} alt={alt} height="300" />
      </div>
      <dialog
        ref={ref}
        style={customStyle.imageDialog}
        onClick={handleCloseDialog}
      >
        <div style={customStyle.contentsImg}>
          <img src={src} alt={alt} height="100%" />
        </div>
      </dialog>
    </React.Fragment>
  );
};

const customStyle = {
  imageBox: {
    cursor: "zoom-in",
    display: "inline-block",
  },
  imageDialog: {
    padding: 0,
  },
  contentsImg: {
    verticalAlign: "top",
    height: "80vh",
  },
};
