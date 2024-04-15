import {
    DataGrid,
    GridToolbarColumnsButton,
    GridToolbarContainer
  } from "@mui/x-data-grid";
  import SearchBar from "material-ui-search-bar";
  import React, { useState } from "react";
  
  const CustomToolbar = (props) => (
    <div>
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
      </GridToolbarContainer>
      <SearchBar {...props} />
    </div>
  );
  const DATASET = [
    { id: 1, file_id: 134, name: "Joe" },
    { id: 2, file_id: 123, name: "Jane" },
    { id: 3, file_id: 453, name: "James" },
    { id: 4, file_id: 134, name: "Jeniffer" }
  ];
  
  export default function Tester() {
    const [searchText, setSearchText] = useState("");
    const [tableData, setTableData] = useState(DATASET);
    const [columns] = useState([
      { headerName: "File ID", field: "file_id", width: 120 },
      { headerName: "Name", field: "name", width: 130 }
    ]);
  
    const requestSearch = (searchValue) => {
      const searchRegex = new RegExp(`.*${searchValue}.*`, "ig");
      const filteredRows = DATASET.filter((o) => {
        return Object.keys(o).some((k) => {
          return searchRegex.test(o[k].toString());
        });
      });
      setTableData(filteredRows);
    };
  
    const cancelSearch = () => {
      setSearchText("");
      requestSearch(searchText);
    };
  
    return (
      <div style={{ height: 500, width: "100%", backgroundColor: "white" }}>
        <DataGrid
          components={{ Toolbar: CustomToolbar }}
          rows={tableData}
          columns={columns}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (searchVal) => requestSearch(searchVal),
              onCancelSearch: () => cancelSearch()
            }
          }}
        />
      </div>
    );
  }
  