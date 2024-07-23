import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

import TrafficIcon from "@mui/icons-material/Traffic";

import Header from "../components/Header";
import LineChart from "../components/LineChart";
import StatBox from "../components/StatBox";

import { useEffect, useState } from "react";
import { AuthApi } from "../../context/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CleaningServices } from "@mui/icons-material";
const DashHome = ({ deviceCount }) => {
  const [DashData, setDashData] = useState(null);
  const [DashDataActivity, setDashDataActivity] = useState(null);
  const [pendingRef, setPendingRef] = useState([]);
  const [TrafficMonths, setTrafficMonths] = useState([
    {
      id: "Month",
      color: "a4a9fc",
      data: [
        {
          x: "1-5",
          y: 0,
        },
        {
          x: "6-10",
          y: 0,
        },
        {
          x: "11-15",
          y: 0,
        },
        {
          x: "16-20",
          y: 0,
        },
        {
          x: "21-25",
          y: 0,
        },
        {
          x: "25-31",
          y: 0,
        },
      ],
    },
  ]);

  const [TrafficRecordData, setTrafficRecordData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { admin } = AuthApi();

  const navigate = useNavigate();

  const fetchDashboardDetail = async () => {
    // debugger;
    const url = `${process.env.REACT_APP_API_KEY}/admins/Dashboard`;

    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      //console.log(response.data.UserData);
      setDashData(response.data.UserData);
      setDashDataActivity(response.data.Activity);
    } catch (error) {
      //console.log(error);
    }
  };

  //*** fetch pending refrence users */

  const fetchPendingReference = async () => {
    const url = `${process.env.REACT_APP_API_KEY}/admins/pendingRef`;

    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      // console.log(response);
      setPendingRef(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrafficMonthData = async () => {
    const url = `${process.env.REACT_APP_API_KEY}/admins/monthsTrafficData`;

    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      // //console.log(response.data.data);
      setTrafficMonths(response.data.Traffic);
    } catch (error) {}
  };

  const setMonthRecord = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthIndex = now.getMonth();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const givenMonth = process.env.REACT_APP_Month; // Specify the month as a string
    const givenYear = parseInt(process.env.REACT_APP_Year);

    const arr = [];

    // Convert the given month string to its index
    const givenMonthIndex = months.indexOf(givenMonth);

    // Check if the given month is valid
    if (givenMonthIndex !== -1) {
      // Loop from the current month/year to the given month/year
      for (let year = currentYear; year >= givenYear; year--) {
        const startMonth = year === currentYear ? currentMonthIndex : 11; // Start from the current month in the current year
        const endMonth = year === givenYear ? givenMonthIndex : 0; // End at the given month in the given year

        for (
          let monthIndex = startMonth;
          monthIndex >= endMonth;
          monthIndex--
        ) {
          const monthName = months[monthIndex];
          arr.push({ month: monthName, year: year });
        }
      }
    } else {
      //console.log("Invalid givenMonth value");
    }

    setTrafficRecordData(arr);
    // //console.log(arr);
  };
  useEffect(() => {
    fetchDashboardDetail();
    fetchTrafficMonthData();
    setMonthRecord();
    fetchPendingReference();
  }, [admin]);

  // console.log(pendingRef);

  return (
    <>
      <Box m="10px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(15, 1fr)"
          gridAutoRows="140px"
          gap="15px"
        >
          {/* ROW 1 */}
          {/* <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={DashData?.AllUser}
              subtitle="All Alumni"
              progress={DashData?.AllUser === 0 ? "0" : 1}
              increase={DashData?.AllUser === 0 ? "0%" : "+100%"}
              icon={
                <GroupsIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box> */}
          {/* ////****pending reference */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={pendingRef?.length}
              subtitle="Pending Reference"
              progress={pendingRef.length === 0 ? "0" : 1}
              increase={
                pendingRef?.length === 0
                  ? "-0%"
                  : "-" +
                    ((pendingRef?.length / DashData?.AllUser) * 100).toFixed(
                      2
                    ) +
                    "%"
              }
              icon={
                <WorkHistoryIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={DashData?.ActiveUser}
              subtitle="Verified"
              progress={DashData?.ActiveUser / DashData?.AllUser}
              increase={
                DashData?.ActiveUser === 0
                  ? "+0%"
                  : "+" +
                    ((DashData?.ActiveUser / DashData?.AllUser) * 100).toFixed(
                      2
                    ) +
                    "%"
              }
              icon={
                <AccountCircleIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={DashData?.UnVerifiedUser}
              subtitle="UnVerified"
              progress={
                DashData?.UnVerifiedUser === 0
                  ? "0"
                  : DashData?.UnVerifiedUser / DashData?.AllUser
              }
              increase={
                DashData?.UnVerifiedUser === 0
                  ? "-0%"
                  : "-" +
                    (
                      (DashData?.UnVerifiedUser / DashData?.AllUser) *
                      100
                    ).toFixed(2) +
                    "%"
              }
              icon={
                <NoAccountsIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={DashData?.BlockUser}
              subtitle="Block"
              progress={DashData?.BlockUser / DashData?.AllUser}
              increase={
                DashData?.BlockUser === 0
                  ? "-0%"
                  : "-" +
                    ((DashData?.BlockUser / DashData?.AllUser) * 100).toFixed(
                      2
                    ) +
                    "%"
              }
              icon={
                <NoAccountsIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={DashData?.PendingUser}
              subtitle="Pending"
              progress={DashData?.PendingUser / DashData?.AllUser}
              increase={
                DashData?.PendingUser === 0
                  ? "-0%"
                  : "-" +
                    ((DashData?.PendingUser / DashData?.AllUser) * 100).toFixed(
                      2
                    ) +
                    "%"
              }
              icon={
                <TrafficIcon
                  sx={{
                    color: colors.greenAccent[600],
                    fontSize: "26px",
                  }}
                />
              }
            />
          </Box>

          {/* ROW 2 */}
          <Box
            gridColumn="span 11"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Total Traffic Received
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  {deviceCount}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Average Traffic of{" "}
                  {new Date().toLocaleString("en-US", { month: "long" })}
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >
                  {DashDataActivity?.avg}
                </Typography>
              </Box>
            </Box>

            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} data={TrafficMonths} />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Traffic Record
              </Typography>
            </Box>
            {TrafficRecordData?.map((transaction, i) => (
              <Box
                key={`${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography color={colors.grey[100]}>
                    {transaction.month} - {transaction.year}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  onClick={() => {
                    navigate(
                      `/admin/monthsRecord/${transaction.month}/${transaction.year}`
                    );
                  }}
                  className="cursor-pointer"
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  view
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashHome;
