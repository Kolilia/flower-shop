import { useCallback, useState } from "react";
import { validateFileSize } from "../helpers/validateFileSize";

export const useUploadFile = () => {
  const [file, setFile] = useState(null);

  const upload = useCallback(
    (file) => {
      if (!validateFileSize(file.size, 8)) {
        return;
      }

      setFile(file);
    },

    []
  );

  return {
    file,
    upload,
  };
};
