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
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo from "../../Assets/Logo.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AlertApi } from "../../context/AlertContext";
import { AuthApi } from "../../context/user";

const UserProfilePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [showProofModal, setShowProofModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnloading, setbtnLoading] = useState(false);

  const { id } = useParams();
  const { setAlert } = AlertApi();
  const { admin, fetchUserReqCount } = AuthApi();

  const [userDetails, setuserDetails] = useState(null);

  const navigate = useNavigate();

  const handleAccept = async () => {
    setbtnLoading(true);
    let url = `${process.env.REACT_APP_API_KEY}/admins/response`;
    try {
      const response = await axios.post(
        url,
        {
          email: `${userDetails?.email}`,
          flage: "Accept",
        },
        {
          headers: {
            authorization: `berer ${admin.token}`,
          },
        }
      );
      setAlert({ type: "success", message: response.data.msg });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      navigate("/admin/req");
    } catch (error) {
      setAlert({ type: "error", message: error.response.data.msg });
    }
    setbtnLoading(false);
    fetchUserReqCount();
  };

  const handleReject = async () => {
    setbtnLoading(true);
    let url = `${process.env.REACT_APP_API_KEY}/admins/response`;
    try {
      const response = await axios.post(
        url,
        {
          email: `${userDetails?.email}`,
          flage: "Reject",
          remark: remarks,
        },
        {
          headers: {
            authorization: `berer ${admin.token}`,
          },
        }
      );
      setAlert({ type: "success", message: response.data.msg });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      navigate("/admin/req");
    } catch (error) {
      setAlert({ type: "error", message: error.response.data.msg });
    }
    setbtnLoading(false);
    fetchUserReqCount();
  };

  const handleViewProof = () => {
    setShowProofModal(true);
  };

  const handleCloseProofModal = () => {
    setShowProofModal(false);
  };

  const fetchuser = async (paramId) => {
    let url = `${process.env.REACT_APP_API_KEY}/signup/${paramId}`;

    try {
      const res = await axios.post(url);

      setuserDetails(res.data.data);
      setLoading(false);
    } catch (error) {
      navigate("/admin/req");
    }
  };

  useEffect(() => {
    fetchuser(id);
  }, [id]);

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
                onError={(e) => console.error("Failed to load iframe:", e)}
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
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={() => setShowConfirmationModal(true)}
                  style={{ marginRight: "8px" }}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CancelIcon />}
                  onClick={() => setShowRejectModal(true)}
                >
                  Reject
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
                  RollNo:{" "}
                  <span className="font-bold">{userDetails?.rollNo}</span>
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Mobile No:{" "}
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
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<VisibilityIcon />}
                  onClick={handleViewProof}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                >
                  View Proof
                </Button>
              </Box>
            </Box>
          </Card>

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
                Accept !
              </Typography>
              <Typography variant="body1" gutterBottom>
                Are you sure you want to Accept{" "}
                <span className="font-bold text-green-500">
                  {userDetails?.name}
                </span>
              </Typography>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                  onClick={handleAccept}
                  style={{ marginRight: "8px" }}
                  disabled={btnloading}
                >
                  {btnloading ? "Plz Wait......" : "Confirm"}
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
          {/* reject model  */}
          <Modal
            open={showRejectModal}
            onClose={() => setShowRejectModal(false)}
            aria-labelledby="confirmation-modal"
            aria-describedby="confirmation-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            style={{
              backdropFilter: showRejectModal ? "blur(8px)" : "none",
              zIndex: showRejectModal ? 999 : -1,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: theme.palette.background.paper,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="reject-modal" variant="h6" component="h2">
                Reject{" "}
                <span className="font-bold text-red-500">
                  {userDetails?.name}
                </span>
              </Typography>
              <Typography id="reject-modal-description" sx={{ mt: 2 }}>
                Please provide remarks for rejection:
              </Typography>
              <TextField
                id="remarks"
                label="Remarks"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Box
                sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CheckCircleIcon />}
                  onClick={handleReject}
                  disabled={btnloading}
                >
                  {btnloading ? "Plz Wait......" : " Confirm Reject"}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CancelIcon />}
                  onClick={() => {
                    setShowRejectModal(false);
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
