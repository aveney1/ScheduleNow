import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";

const AvailabilityTable = (props) => {
  const user = props.user;
  var list = props.list;
  const [rowSelectionModel, setRowSelectionModel] = useState([
    props.rowSelection,
  ]);

  const availabilityColumns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "day",
      headerName: "Day",
      width: 100,
      sortable: true,
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 100,
      valueFormatter: (value) => dayjs("2000-01-01 " + value).format("h:mm a"),
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 100,
      valueFormatter: (value) => dayjs("2000-01-01 " + value).format("h:mm a"),
    },
    {
      field: "employeeId",
      headerName: "Employee",
      width: 120,
      valueGetter: (value) => {
        if (value === user.employeeId) {
          return user.firstName + " " + user.lastName;
        } else {
          return props.formatName(value);
        }
      },
    },
  ];

  return (
    <>
      <DataGrid
        rows={list}
        columns={availabilityColumns}
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
        onRowSelectionModelChange={(newSelection) => {
          setRowSelectionModel(newSelection);
          props.rowReturnFunction({ name: "availability", row: newSelection });
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

export default AvailabilityTable;
