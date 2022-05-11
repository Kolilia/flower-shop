import { useEffect } from "react";
import { createPortal } from "react-dom";

let div;

const getElement = document.getElementById("modal-root");

if (getElement) {
  div = getElement;
} else {
  div = document.createElement("div");
  div.id = "modal-root";
  document.body.appendChild(div);
}

const Portal = ({ children }) => {
  return createPortal(children, div);
};

export const usePortal = () => {
  useEffect(() => {
    return () => {
      document.body.removeChild(div);
    };
  }, []);

  return { Portal };
};
