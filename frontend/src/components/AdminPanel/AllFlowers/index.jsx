import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import flowers from "../../../store/flowers";
import SearchField from "../../System/SearchField";
import ZeusButton from "../../System/ZeusButton";
import ZeusTable from "../../System/ZeusTable";
import EditFlower from "./EditFlower";
import ReplaceImage from "./ReplaceImage";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    width: "100%",
    height: "100%",
  },
  block: {
    minWidth: 500,
    padding: "15px 20px",
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",
    whiteSpace: "nowrap",
    height: "min-content",
  },
});

const AllFlowers = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(1);

  const params = useRef({
    page: 1,
    perPage: 10,
  });

  const fetcher = useCallback(async (newParams) => {
    setLoading(true);

    params.current = {
      ...params.current,
      ...newParams,
    };

    const result = await flowers.fetchFlowersByAdmin(params.current);

    if (result) {
      setItems(result?.data);

      setPages(result?.pages);
    }

    setLoading(false);
  }, []);

  const columns = useMemo(() => {
    return [
      {
        Header: "Image",
        disableSortBy: true,
        accessor: (rowData) => {
          return (
            <img src={rowData?.imageHref} style={{ maxWidth: 120 }} alt="" />
          );
        },
      },
      {
        Header: "Название",
        disableSortBy: true,
        accessor: (rowData) => {
          return rowData?.name;
        },
      },
      {
        Header: "Цена",
        disableSortBy: true,
        accessor: (rowData) => {
          return `₽ ${rowData?.price}`;
        },
      },
      {
        Header: " ",
        disableSortBy: true,
        accessor: (rowData) => {
          const Actions = ({ rowData }) => {
            const [openReplace, setOpenReplace] = useState(false);
            const [openEdit, setOpenEdit] = useState(false);

            return (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    whiteSpace: "nowrap",
                  }}
                >
                  <a
                    onClick={() => setOpenEdit(true)}
                    style={{ marginBottom: 5 }}
                  >
                    Редактировать
                  </a>
                  <a onClick={() => setOpenReplace(true)}>
                    Заменить фотографию
                  </a>
                </div>

                {openReplace && (
                  <ReplaceImage
                    open={openReplace}
                    setOpen={setOpenReplace}
                    flowerId={rowData?._id}
                    refetch={fetcher}
                  />
                )}

                {openEdit && (
                  <EditFlower
                    open={openEdit}
                    setOpen={setOpenEdit}
                    flower={rowData}
                    refetch={fetcher}
                  />
                )}
              </>
            );
          };

          return <Actions rowData={rowData} />;
        },
      },
    ];
  }, [fetcher]);

  const memoData = useMemo(() => {
    return items;
  }, [items]);

  const onSearch = useCallback(
    (search) => {
      fetcher({ search, page: 1 });
    },
    [fetcher]
  );

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ZeusButton component={Link} to="/admin/all-flowers/create">
            Создать
          </ZeusButton>
        </div>

        <div style={{ height: 15 }} />

        <SearchField
          onSearch={onSearch}
          defaultValue={params?.current?.search}
          variant="standard"
        />

        <div style={{ height: 15 }} />

        {loading && <LinearProgress />}

        <ZeusTable
          data={memoData}
          fetchData={fetcher}
          columns={columns}
          pageCount={pages}
        />
      </div>
    </div>
  );
};

export default AllFlowers;
