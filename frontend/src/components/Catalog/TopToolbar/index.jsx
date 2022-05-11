import { makeStyles } from "@material-ui/core/styles";
import React, { useMemo, useState } from "react";
import { secondaryThemeColor } from "../../../helpers/colors";
import flowers from "../../../store/flowers";
import CustomSimpleMenu from "../../System/CustomSimpleMenu";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding: ".5rem",
    backgroundColor: "#fbfbf5",
    alignItems: "flex-end",
    marginBottom: "1rem",
    borderRadius: "1rem",
  },
  sortBlock: {
    maxWidth: 200,
    width: "100%",
  },
  rootIcon: {
    cursor: "pointer",
  },
  active: {
    color: secondaryThemeColor,
    cursor: "default",
  },
});

const TopToolbar = () => {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState("Cheap");

  const options = useMemo(() => {
    return [
      {
        label: "Сначала дешевые",
        value: "Cheap",
      },
      {
        label: "Сначала дорогие",
        value: "Expensive",
      },
      {
        label: "По наименованию",
        value: "Name",
      },
    ];
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.sortBlock}>
        <CustomSimpleMenu
          value={sortBy || "Cheap"}
          onChange={(e, value) => {
            if (value === "Cheap") {
              flowers.params.sortBy = "price";
              flowers.params.sortDirection = "asc";
            }

            if (value === "Expensive") {
              flowers.params.sortBy = "price";
              flowers.params.sortDirection = "desc";
            }

            if (value === "Name") {
              flowers.params.sortBy = "name";
              flowers.params.sortDirection = "asc";
            }

            setSortBy(value);
          }}
          options={options}
          label="Сортировка"
          fullWidth
        />
      </div>
    </div>
  );
};

export default TopToolbar;
