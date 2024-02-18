import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import Logo from "../../Assets/Logo.jpeg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { AuthApi } from "../../context/user";
import axios from "axios";
const LineChart = ({ isDashboard = false }) => {
  const [TrafficMonths, setTrafficMonths] = useState([
    {
      id: "Month",
      color: "a4a9fc",
      data: [
        { x: "1", y: 0 },
        { x: "2", y: 0 },
        { x: "3", y: 0 },
        { x: "4", y: 0 },
        { x: "5", y: 0 },
        { x: "6", y: 0 },
        { x: "7", y: 0 },
        { x: "8", y: 0 },
        { x: "9", y: 0 },
        { x: "10", y: 0 },
        { x: "11", y: 0 },
        { x: "12", y: 0 },
        { x: "13", y: 0 },
        { x: "14", y: 0 },
        { x: "15", y: 0 },
        { x: "16", y: 0 },
        { x: "17", y: 0 },
        { x: "18", y: 0 },
        { x: "19", y: 0 },
        { x: "20", y: 0 },
        { x: "21", y: 0 },
        { x: "22", y: 0 },
        { x: "23", y: 0 },
        { x: "24", y: 0 },
        { x: "25", y: 0 },
        { x: "26", y: 0 },
        { x: "27", y: 0 },
        { x: "28", y: 0 },
        { x: "29", y: 0 },
        { x: "30", y: 0 },
        { x: "31", y: 0 },
      ],
    },
  ]);
  const [average, setaverage] = useState(0);
  const [total, settotal] = useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { admin } = AuthApi();
  const { month, year } = useParams();
  //console.log(month, year);

  const fetchTraffic = async () => {
    const url = `${process.env.REACT_APP_API_KEY}/admins/OneMonthTrafficData?month=${month}&year=${year}`;

    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      // //console.log(response.data.data);
      setTrafficMonths(response.data.Traffic);
      setaverage(response.data.Average);
      settotal(response.data.Total);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTraffic();
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? colors.primary[800]
              : colors.primary[400],
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color={colors.primary[100]}
            aria-label="back"
            onClick={() => window.history.back()}
          >
            <ArrowBackIcon />
          </IconButton>
          <img
            src={Logo}
            alt="GBN Govt. Polytechnic Nilokheri"
            style={{ width: "48px", height: "48px", marginRight: "16px" }}
          />
          <Box>
            <Typography color={colors.primary[100]} variant="h6">
              GBN Govt. Polytechnic Nilokheri
            </Typography>
            <Typography color={colors.primary[100]} variant="h4">
              {month} - {year}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        mt="25px"
        p="0 30px"
        display="flex "
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight="600"
            color={colors.greenAccent[500]}
          ></Typography>
        </Box>
        <Box>
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Total Traffic Visit
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            {total}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Average Traffic
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            {average}
          </Typography>
        </Box>
      </Box>

      <ResponsiveLine
        data={TrafficMonths}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
        margin={{ top: 10, right: 110, bottom: 270, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Days", // added
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5, // added
          tickSize: 3,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Count", // added
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default LineChart;
