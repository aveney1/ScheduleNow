import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";

const AppointmentTable = (props) => {
  const user = props.user;
  var list = props.list;
  const [rowSelectionModel, setRowSelectionModel] = useState([
    props.rowSelection,
  ]);

  const appointmentColumns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "date",
      headerName: "Date",
      sortable: true,
      valueFormatter: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      field: "startTime",
      headerName: "Start Time",
      valueFormatter: (value) => dayjs("2000-01-01 " + value).format("h:mm a"),
    },
    {
      field: "endTime",
      headerName: "End Time",
      valueFormatter: (value) => dayjs("2000-01-01 " + value).format("h:mm a"),
    },
    {
      field: "employeeId",
      headerName: "Employee",
      valueGetter: (value) => {
        if (value === user.employeeId) {
          return user.firstName + " " + user.lastName;
        } else {
          return props.formatName(value);
        }
      },
    },
    {
      field: "status",
      headerName: "Status",
    },
  ];

  return (
    <>
      <DataGrid
        checkboxSelection
        disableMultipleRowSelection={true}
        rows={list}
        editMode="row"
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={appointmentColumns}
        slots={{ toolbar: GridToolbar }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
          props.rowReturnFunction({
            name: "appointment",
            row: newRowSelectionModel,
          });
        }}
        columnVisibilityModel={{
          id: false,
        }}
      />
    </>
  );
};

export default AppointmentTable;
