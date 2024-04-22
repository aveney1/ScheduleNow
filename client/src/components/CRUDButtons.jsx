import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const CRUDButtons = (props) => {
  const navigate = useNavigate();
  const localHost = "http://localhost:8800";

  const rowSelectionModel = props.row;
  const isManager = props.isManager;
  const tableName = props.tableName;
  const endpointTable = tableName=="appointment"?`${tableName}s`:`${tableName}`
  // Handle appointment and availability delete
  const handleDelete = async () => {
    const id = rowSelectionModel[0];
    if (id) {
      try {
        if (
          window.confirm(`Are you sure you wish to delete this ${tableName}?`)
        ) {

          const res = await axios.delete(
            localHost + "/"+ endpointTable+"/" + id);
          props.rowReturnFunction({ name: `${tableName}`, row: id });
        }
      } catch (err) {
        console.log(`Error deleting from ${tableName}: `, err);
      }
    } else {
      console.log("selection missing");
    }
  };

  return (
    <>
    {/* <Box sx={{ p: 2 }}> */}
      <Button
        onClick={(event) => {
          navigate(`/${tableName}/`);
        }}
        sx={{ visibility: isManager ? "hidden" : "visible" }}
        variant="contained"
      >
        Add
      </Button>
      <Button
        onClick={(event) => {
          if (rowSelectionModel.length) {
            navigate(`/${tableName}/${rowSelectionModel}`);
          } else {
            window.alert(`An ${tableName} must be selected`);
          }
        }}
        sx={{ visibility: isManager ? "hidden" : "visible" }}
        variant="contained"
      >
        Edit
      </Button>
      <Button
        onClick={(event) => {
          if (rowSelectionModel.length) {
            handleDelete(rowSelectionModel, `${tableName}`);
          } else {
            window.alert(`An ${tableName} must be selected`);
          }
        }}
        sx={{ visibility: isManager ? "hidden" : "visible" }}
        variant="contained"
      >
        Delete
      </Button>
    {/* </Box> */}
    </>
  );
};

export default CRUDButtons;
