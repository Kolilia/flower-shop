import { LinearProgress, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { view } from "@risingstack/react-easy-state";
import React, { useMemo, useState } from "react";
import { secondaryThemeColor } from "../../helpers/colors";
import flowers from "../../store/flowers";
import CustomSimpleMenu from "../System/CustomSimpleMenu";
import Item from "./components/Item";
import Filters from "./Filters";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  content: {
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    padding: ".8rem",
    marginRight: 10,
  },
  gridFlowers: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gridAutoRows: "min-content",
    gridGap: "10px",
  },

  rootTab: {
    backgroundColor: secondaryThemeColor,
    padding: "10px 15px",
    borderRadius: "1rem",
    fontFamily: "'Roboto Flex', sans-serif",
  },
  indicator: {
    backgroundColor: secondaryThemeColor,
  },
});

const Catalog = view(() => {
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

  const mapOptions = flowers.items.map((flower) => {
    return <Item key={flower._id} flower={flower} />;
  });

  const onChangePagination = (e, page) => {
    flowers.params.page = page;
  };

  return (
    <div className={classes.root}>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        className={classes.rootTab}
        value={flowers.params.type}
        classes={{
          indicator: classes.indicator,
        }}
        onChange={(event, value) => {
          flowers.params.type = value;
        }}
      >
        <Tab
          label="Акции"
          value="stock"
          style={{
            color: flowers.params.type === "stock" ? "#000" : "#fbfbf5",
            textTransform: "none",
            fontSize: "1.2rem",
          }}
        />
        <Tab
          label="Букеты"
          value="bouquets"
          style={{
            color: flowers.params.type === "bouquets" ? "#000" : "#fbfbf5",
            textTransform: "none",
            fontSize: "1.2rem",
          }}
        />
        <Tab
          label="Цветы"
          value="flowers"
          style={{
            color: flowers.params.type === "flowers" ? "#000" : "#fbfbf5",
            textTransform: "none",
            fontSize: "1.2rem",
          }}
        />
        <Tab
          label="Подарки"
          value="gift"
          style={{
            color: flowers.params.type === "gift" ? "#000" : "#fbfbf5",
            textTransform: "none",
            fontSize: "1.2rem",
          }}
        />
        <Tab
          label="Свадебные композиции"
          value="weddingCompositions"
          style={{
            color:
              flowers.params.type === "weddingCompositions"
                ? "#000"
                : "#fbfbf5",
            textTransform: "none",
            fontSize: "1.2rem",
          }}
        />
      </Tabs>

      <h1>Доставка цветов</h1>

      {/*    <TopToolbar /> */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            {flowers.loading && <LinearProgress />}

            <div className={classes.content}>
              <CustomSimpleMenu
                style={{ maxWidth: 200, marginBottom: 15 }}
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

              <div className={classes.gridFlowers}>{mapOptions}</div>
            </div>
          </div>

          {flowers?.pages > 1 && (
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Pagination
                count={flowers.pages}
                page={flowers.params.page}
                onChange={onChangePagination}
                size="large"
              />
            </div>
          )}
        </div>

        <Filters />
      </div>
    </div>
  );
});

export default Catalog;
