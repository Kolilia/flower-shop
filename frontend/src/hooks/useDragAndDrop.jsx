import { useCallback, useEffect, useRef } from "react";

export const useDragAndDrop = ({ ref, onChange }) => {
  const initial = useRef(false);

  const preventDefaults = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const dt = e.dataTransfer;
      const files = dt.files;

      onChange(files[0]);
    },
    [onChange]
  );

  useEffect(() => {
    if (!initial.current && ref.current) {
      initial.current = true;

      ["dragstart", "dragenter", "dragover", "dragleave", "drop"].forEach(
        (eventName) => {
          ref.current.addEventListener(eventName, preventDefaults, false);
        }
      );

      ref.current.addEventListener("drop", handleDrop, false);
    }
  }, [handleDrop, preventDefaults, ref]);
};
