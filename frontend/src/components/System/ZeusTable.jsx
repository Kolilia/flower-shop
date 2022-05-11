import {
  Table as MaUTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import clsx from "clsx";
import React, { memo, useEffect, useRef } from "react";
import { usePagination, useSortBy, useTable } from "react-table";

const useStyles = makeStyles({
  rowBody: {
    transition: "all .2s ease",
    fontFamily: "'Roboto Flex', sans-serif",

    "&:hover": {
      backgroundColor: grey[200],
    },
  },
  table: {
    overflowX: "auto",
    flex: "1 1 auto",
    width: "100%",
    fontFamily: "'Roboto Flex', sans-serif",
    backgroundColor: "#fbfbf5",
    borderRadius: "1rem",

    "@global": {
      th: {
        position: "sticky",
        top: 0,
        backgroundColor: "transparent",
        zIndex: 1000,
        fontFamily: "'Roboto Flex', sans-serif",
      },
      "th, td": {
        cursor: "default",
        fontSize: ".85rem",
        fontFamily: "'Roboto Flex', sans-serif",
      },
    },
  },
  rootTable: {
    width: "unset",
    margin: "0 auto",
    fontFamily: "'Roboto Flex', sans-serif",
  },
});

const ZeusTable = memo(
  ({
    columns,
    data,
    pageCount: controlledPageCount,
    onRowClick,
    fetchData,
    customStyle,
  }) => {
    const classes = useStyles();

    const config = {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      manualSortBy: true,
      pageCount: controlledPageCount,
    };

    const {
      getTableProps,
      headerGroups,
      rows,
      prepareRow,
      pageCount,
      gotoPage,
      state: { pageIndex, sortBy },
    } = useTable(config, useSortBy, usePagination);

    const initial = useRef(false);

    useEffect(() => {
      if (fetchData) {
        fetchData({ page: pageIndex + 1 });
      }

      initial.current = true;
    }, [fetchData, pageIndex, sortBy]);

    const makeHeadRows = headerGroups.map((headerGroup, index) => {
      const makeCells = headerGroup.headers.map((column, indx) => {
        const toggleSort = column.getSortByToggleProps();

        return (
          <TableCell
            key={indx}
            {...column.getHeaderProps([
              {
                id: column.id,
                className: column.classNameHead,
                style: {
                  fontWeight: 500,
                  borderBottom: 0,
                  padding: "8px 16px",
                  fontSize: ".75rem",
                  letterSpacing: "0.04em",
                  ...(column.styleHead || {}),
                  cursor: toggleSort?.style?.cursor || "default",
                },
                onClick: toggleSort?.onClick,
              },
            ])}
          >
            <>
              {column.render("Header")}
              <span>
                {column?.isSorted ? (column?.isSortedDesc ? " 🔽" : " 🔼") : ""}
              </span>
            </>
          </TableCell>
        );
      });

      return (
        <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
          {makeCells}
        </TableRow>
      );
    });

    const makeBodyRows = rows.map((row, i) => {
      prepareRow(row);

      const makeCells = row.cells.map((cell, indx) => {
        return (
          <TableCell
            key={indx}
            {...cell.getCellProps([
              {
                className: cell.column.className,
                style: {
                  padding: "8px 16px",
                  ...(cell.column.style || {}),
                  color: "inherit",
                },
              },
            ])}
          >
            {cell.render("Cell")}
          </TableCell>
        );
      });

      return (
        <>
          <TableRow
            key={i}
            {...row.getRowProps([
              {
                className: clsx(classes.rowBody),
                onClick: onRowClick ? () => onRowClick(row.original, i) : null,
                style: { cursor: onRowClick ? "pointer" : "default" },
              },
            ])}
          >
            {makeCells}
          </TableRow>
        </>
      );
    });

    const onChangePagination = (e, page) => {
      const result = page - 1;

      gotoPage(result);
    };

    return (
      <>
        <div
          className={classes.table}
          style={{
            minHeight: 300,
            ...customStyle,
          }}
        >
          <MaUTable
            {...getTableProps()}
            classes={{
              root: classes.rootTable,
            }}
          >
            <TableHead>{makeHeadRows}</TableHead>
            <TableBody>{makeBodyRows}</TableBody>
          </MaUTable>
        </div>

        <div style={{ height: 10 }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={controlledPageCount || pageCount}
            page={pageIndex + 1}
            onChange={onChangePagination}
            style={{ fontFamily: "'Roboto Flex', sans-serif" }}
            size="large"
          />
        </div>
      </>
    );
  }
);

export default ZeusTable;
