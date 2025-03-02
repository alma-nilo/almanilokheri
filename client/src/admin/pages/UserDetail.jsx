import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Link,
  Button,
  Card,
  TextField,
  AppBar,
  Toolbar,
  Modal,
  Paper,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme"; // Update the path to your tokens file
import CloseIcon from "@mui/icons-material/Close";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Logo from "../../Assets/Logo.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AlertApi } from "../../context/AlertContext";
import { AuthApi } from "../../context/user";
import { EmailOutlined } from "@mui/icons-material";

const UserProfilePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [showProofModal, setShowProofModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnloading, setbtnLoading] = useState(false);

  const [remarks, setremarks] = useState(" ");

  const { id } = useParams();
  const { setAlert } = AlertApi();
  const { admin } = AuthApi();

  const [userDetails, setuserDetails] = useState(null);

  const navigate = useNavigate();

  const handleAccept = async (uuid, currentstatus, email, name) => {
    setbtnLoading(true);
    let url = `${process.env.REACT_APP_API_KEY}/admins/handlestatus`;

    const playload = {
      remark: remarks,
      uuid: uuid,
      currentstatus: currentstatus,
      email: email,
      name: name,
    };
    const config = {
      headers: {
        authorization: `berer ${admin.token}`,
      },
    };
    try {
      const response = await axios.post(url, playload, config);
      setAlert({ type: "success", message: response.data.msg });
      fetchuser(id);
    } catch (error) {
      setAlert({ type: "error", message: "Somthing Went Wrong " });
      fetchuser(id);
    }
    setShowConfirmationModal(false);
    setbtnLoading(false);
  };

  const handleCloseProofModal = () => {
    setShowProofModal(false);
  };

  const fetchuser = async (paramId) => {
    let url = `${process.env.REACT_APP_API_KEY}/admins/user/${paramId}`;

    try {
      const res = await axios.get(url, {
        headers: {
          authorization: `berer ${admin.token}`,
        },
      });

      setuserDetails(res.data.data);
      setLoading(false);
    } catch (error) {
      navigate("/admin/user");
    }
  };

  useEffect(() => {
    fetchuser(id);
  }, [admin]);

  if (loading) {
    return <Loader />;
  }
  {
    return (
      <>
        {/* View Proof Modal */}
        <Modal
          open={showProofModal}
          onClose={handleCloseProofModal}
          aria-labelledby="view-proof-modal"
          aria-describedby="view-proof-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 1000,
              bgcolor: theme.palette.background.paper,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="view-proof-modal" variant="h6" component="h2">
              {userDetails?.name}
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <iframe
                src={userDetails?.proof}
                title="Proof Document"
                width="1000"
                height="300"
                frameBorder="0"
              />
            </Box>
          </Box>
        </Modal>

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
            <Typography color={colors.primary[100]} variant="h6">
              GBN Govt. Polytechnic Nilokheri
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          display="flex"
          position="relative"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          bgcolor={
            theme.palette.mode === "dark"
              ? colors.primary[500]
              : colors.primary[400]
          }
          p={3}
        >
          <Card
            elevation={3}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "24px",
              maxWidth: "800px",
              bgcolor:
                theme.palette.mode === "dark"
                  ? "primary.800"
                  : "background.default",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Left Section */}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              p={2}
            >
              <img
                src={userDetails?.profile}
                alt="Profile"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  marginBottom: "16px",
                  objectFit: "cover",
                }}
              />
              <Typography variant="h5" gutterBottom>
                {userDetails?.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {userDetails?.profession}
              </Typography>
              <Box mt={2} mb={1} display="flex">
                <Button
                  variant="contained"
                  color={
                    userDetails?.status === "Approve" ? "success" : "error"
                  }
                  startIcon={
                    userDetails?.status === "Approve" ? (
                      <CheckCircleIcon />
                    ) : (
                      <RemoveCircleIcon />
                    )
                  }
                  onClick={() => {
                    if (userDetails?.status === "proof") {
                      navigate(`/admin/tempuser/${userDetails.uuid}`);
                      return;
                    }
                    setShowConfirmationModal(true);
                  }}
                  style={{ marginRight: "8px" }}
                >
                  {userDetails?.status === "Approve" && "Active"}
                  {userDetails?.status === "Block" && "Blocked"}
                  {userDetails?.status === "NotApprove" && "Verify"}
                  {userDetails?.status === "proof" && "Proof Verify"}
                </Button>
              </Box>
            </Box>

            {/* Right Section */}
            <Box p={2}>
              <Typography variant="h6">About Me</Typography>
              <Typography variant="body1" color="text.secondary" mt={1}>
                {userDetails?.about}
              </Typography>
              <Box mt={2}>
                <Typography variant="subtitle1" color="text.secondary">
                  Batch:{" "}
                  <span className="font-bold">
                    {userDetails?.startYear + " - " + userDetails?.endYear}
                  </span>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  RollNo{" "}
                  <span className="font-bold">{userDetails?.rollNo}</span>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Mobile No{" "}
                  <span className="font-bold">{userDetails?.mobile}</span>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Trade <span className="font-bold">{userDetails?.Trade}</span>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Email: <span className="font-bold">{userDetails?.email}</span>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <LinkedInIcon style={{ marginRight: "8px" }} />
                  <Link
                    href={`${userDetails?.linkdln}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="text.secondary"
                  >
                    linkedin.com
                  </Link>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <FacebookIcon style={{ marginRight: "8px" }} />
                  <Link
                    href={`${userDetails?.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="text.secondary"
                  >
                    facebook.com
                  </Link>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  <TwitterIcon style={{ marginRight: "8px" }} />
                  <Link
                    href={`${userDetails?.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="text.secondary"
                  >
                    twitter.com
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Card>

          {/* Email Icon */}
          <div
            className="w-15 absolute top-20 right-5  z-10 h-15 rounded-full bg-green-500 p-4 hover:bg-green-600 hover:scale-90 focus:scale-95 active:bg-green-600  "
            title={`Send Email to  ${userDetails?.name}`}
            onClick={() => {
              window.open(`mailto:${userDetails?.email}`);
            }}
          >
            <EmailOutlined color="#fff" sx={{ fontSize: "20px" }} />
          </div>

          {/* Accept */}

          <Modal
            open={showConfirmationModal}
            onClose={() => setShowConfirmationModal(false)}
            aria-labelledby="confirmation-modal"
            aria-describedby="confirmation-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            style={{
              backdropFilter: showConfirmationModal ? "blur(8px)" : "none",
              zIndex: showConfirmationModal ? 999 : -1,
            }}
          >
            <Box
              p={3}
              maxWidth="500px"
              component={Paper}
              elevation={3}
              sx={{
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "primary.800"
                    : "background.default",
              }}
            >
              <IconButton
                onClick={() => setShowConfirmationModal(false)}
                style={{ position: "absolute", top: 0, right: 0 }}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" gutterBottom>
                {userDetails?.status !== "Approve" ? "Active !" : "Blocked !"}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Are you sure you want to{" "}
                {userDetails?.status !== "Approve" ? "Active !" : "Block"} :{" "}
                <span
                  className={`font-bold ${
                    userDetails?.status !== "Approve"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {userDetails?.name}
                </span>
              </Typography>
              {userDetails?.status === "Approve" ? (
                <>
                  <TextField
                    id="remarks"
                    label="Remarks"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={remarks}
                    onChange={(e) => setremarks(e.target.value)}
                    sx={{ mt: 2 }}
                  />
                </>
              ) : (
                ""
              )}
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color={
                    userDetails?.status !== "Approve" ? "success" : "error"
                  }
                  startIcon={
                    userDetails?.status !== "Approve" ? (
                      <CheckCircleIcon />
                    ) : (
                      <RemoveCircleIcon />
                    )
                  }
                  onClick={() =>
                    handleAccept(
                      userDetails?.uuid,
                      userDetails?.status,
                      userDetails?.email,
                      userDetails?.name
                    )
                  }
                  style={{ marginRight: "8px" }}
                  disabled={btnloading}
                >
                  {btnloading
                    ? "Plz Wait......"
                    : `${
                        userDetails?.status !== "Approve" ? "Active !" : "Block"
                      } `}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CancelIcon />}
                  onClick={() => {
                    setShowConfirmationModal(false);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </>
    );
  }
};

export default UserProfilePage;
