import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Header from "../components/Header";
import { AuthApi } from "../../context/user";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PendingRef = () => {
  const [DataUser, setDataUser] = useState([]);

  const { admin } = AuthApi();
  const navigate = useNavigate();

  const fetch = async () => {
    const config = {
      headers: {
        authorization: `Berer ${admin?.token}`,
      },
    };
    let url = `${process.env.REACT_APP_API_KEY}/admins/pendingRef`;
    try {
      const data = await axios.get(url, config);
      console.log(DataUser);
      setDataUser(data.data);
    } catch (error) {}
  };

  const HandleView = (uuid) => {
    navigate(`/admin/tempuser/${uuid}`);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "rollNo",
      headerName: "RollNo",
      flex: 1,
    },
    {
      field: "batch",
      headerName: "Batch",
      flex: 1,
    },

    {
      field: "view",
      headerName: "View",
      flex: 1,
      renderCell: ({ row: { view } }) => {
        return (
          <Box
            width="60%"
            m="0 0"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
            onClick={() => {
              HandleView(view);
            }}
          >
            {<RemoveRedEyeIcon />}

            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {"View"}
            </Typography>
          </Box>
        );
      },
    },
  ];
  useEffect(() => {
    fetch();
  }, [admin]);

  return (
    <Box m="0px 10px 10px 10px">
      <Header
        title="Pending References"
        subtitle="Managing the Pending References of Users"
      />
      <Box
        m="0px 5px 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.blueAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={DataUser} columns={columns} />
      </Box>
    </Box>
  );
};

export default PendingRef;
