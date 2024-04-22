import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const EmployeeTable = (props) => {
  var list = props.list;

  // ---- Employee accounts ----
  const [rowSelectionModel, setRowSelectionModel] = useState([
    props.rowSelection,
  ]);
  //  Account headers
  const accountColumns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "username",
      headerName: "Username",
    },
    {
      field: "isActive",
      headerName: "Status",
      valueGetter: (value) => {
        return value ? "Enabled" : "Disabled";
      },
    },
  ];

  return (
    <>
      <DataGrid
        rows={list}
        columns={accountColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
          props.rowReturnFunction({
            name: "employee",
            row: newRowSelectionModel,
          });
        }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        checkboxSelection
        disableMultipleRowSelection={true}
        columnVisibilityModel={{
          id: false,
        }}
      />
    </>
  );
};

export default EmployeeTable;
