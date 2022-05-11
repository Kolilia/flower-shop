import { view } from "@risingstack/react-easy-state";
import React from "react";
import flowers from "../../../store/flowers";
import CustomTextField from "./../../System/CustomTextField";

const BlockPrice = view(() => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginRight: ".3rem",
      }}
    >
      <div style={{ width: 150 }}>
        <CustomTextField
          value={flowers.params.fromPrice || ""}
          placeholder="От"
          onChange={(e, value) => {
            flowers.params.page = 1;
            flowers.params.fromPrice = value;
          }}
          fullWidth
        />{" "}
      </div>

      <div style={{ width: 150 }}>
        <CustomTextField
          value={flowers.params.toPrice || ""}
          placeholder="До"
          onChange={(e, value) => {
            flowers.params.page = 1;
            flowers.params.toPrice = value;
          }}
          fullWidth
        />
      </div>
    </div>
  );
});

export default BlockPrice;
