import { makeStyles } from "@material-ui/core/styles";
import { view } from "@risingstack/react-easy-state";
import React, { useCallback, useEffect } from "react";
import flowers from "../../../store/flowers";
import SearchField from "../../System/SearchField";
import { useDebounce } from "./../../../hooks/useDebounce";
import BlockPrice from "./BlockPrice";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    padding: ".8rem",
    maxWidth: 350,
    width: "100%",
    height: "min-content",
  },
});

const WatchChangeFilters = view(() => {
  const {
    page,
    perPage,
    search,
    fromPrice,
    toPrice,
    sortBy,
    sortDirection,
    type,
  } = flowers.params;

  const debouncedFromPrice = useDebounce(fromPrice, 500);
  const debouncedToPrice = useDebounce(toPrice, 500);

  useEffect(() => {
    const makeParams = {
      page,
      perPage,
      search,
      fromPrice: debouncedFromPrice,
      toPrice: debouncedToPrice,
      sortBy,
      sortDirection,
      type,
    };

    flowers.fetchFlowers(makeParams);
  }, [
    page,
    perPage,
    debouncedFromPrice,
    debouncedToPrice,
    search,
    sortBy,
    sortDirection,
    type,
  ]);

  return null;
});

const Filters = view(() => {
  const classes = useStyles();

  const onSearch = useCallback((search) => {
    flowers.params.search = search;
    flowers.params.page = 1;
  }, []);

  return (
    <>
      <WatchChangeFilters />

      <div className={classes.root}>
        <h2 style={{ margin: 0, marginBottom: 15, textAlign: "center" }}>
          Поиск
        </h2>

        <SearchField defaultValue={flowers.params.search} onSearch={onSearch} />

        <div style={{ height: 15 }} />

        <BlockPrice />
      </div>
    </>
  );
});

export default Filters;
