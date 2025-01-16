import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Header from "../components/Header";
import { AuthApi } from "../../context/user";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { users } from "../data/userData.js";
const AllAlumni = () => {
  const [DataUser, setDataUser] = useState([]);
  const { admin } = AuthApi();
  const navigate = useNavigate();

  const fetch = useCallback(async () => {
    const config = {
      headers: {
        authorization: `Berer ${admin?.token}`,
      },
    };

    let url = `${process.env.REACT_APP_API_KEY}/admins/alluser`;
    try {
      const { data } = await axios.get(url, config);
      setDataUser(data.data);
    } catch (error) {}
  }, [admin?.token]);

  const HandleView = (uid) => {
    navigate(`/admin/user/${uid}`);
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
    },
    {
      field: "rollNo",
      headerName: "rollNo",
      flex: 1,
    },
    {
      field: "status",
      headerName: "status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width="70%"
            m="0 0"
            p="5px"
            display="flex"
            backgroundColor={
              status === "Approve"
                ? colors.greenAccent[500]
                : status === "Block"
                ? colors.redAccent[500]
                : colors.redAccent[500]
            }
            borderRadius="4px"
          >
            {status === "Approve" && <VerifiedUserIcon />}
            {status === "Block" && <RemoveCircleIcon />}
            {status !== "Block" && status !== "Approve" && <RemoveCircleIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status === "Approve" && "Verified"}
              {status === "Block" && "Blocked"}
              {status !== "Block" && status !== "Approve" && "Not Verified"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "view",
      headerName: "VIEW",
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
  async function addNewUser() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/admins/add-new`,
        {
          data: users,
        },
        {
          headers: {
            authorization: `Berer ${admin?.token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddNewUser = () => {
    let confirmAdd = prompt("Are you sure you want to add new user?");
    if (confirmAdd) {
      addNewUser();
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Box m="0px 10px 10px 10px">
      <Header title="All User" subtitle="Managing the All Member" />
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

      <div
        className="absolute top-20 right-10 max-w-40 min-w-fit overflow-auto h-10  "
        onClick={handleAddNewUser}
      >
        <div className="py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 hover:scale-95  ">
          <button className="text-white font-medium"> Add new Users</button>
        </div>
      </div>
    </Box>
  );
};

export default AllAlumni;
