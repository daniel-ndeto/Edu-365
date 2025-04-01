import React, { useState } from "react";
import { StyledTableCell, StyledTableRow } from "./styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
} from "@mui/material";

// TableViewTemplate component for rendering a table with pagination
const TableViewTemplate = ({ columns, rows }) => {
  // State for managing the current page
  const [page, setPage] = useState(0);
  // State for managing the number of rows per page
  const [rowsPerPage, setRowsPerPage] = useState(5);
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {/* Map through the columns and render a table header cell for each */}
              {columns.map((column, index) => (
                <StyledTableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {/* Slice the rows based on the current page and rows per page */}
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {/* Map through the columns and render a table cell for each */}
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={index} align={column.align}>
                          {/* Format the value if a format function is provided */}
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Table pagination component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 5));
          setPage(0);
        }}
      />
    </>
  );
};

export default TableViewTemplate;
