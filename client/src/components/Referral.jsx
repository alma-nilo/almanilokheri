import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import {
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Referral = ({ setReferralaccount }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  let searchTimer;

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setReferralaccount(profile);
  };

  //   const filteredProfiles = profiles.filter((profile) =>
  //     profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  const fetchProfiles = async (searchTerm) => {
    setisLoading(true);
    try {
      let url = `${process.env.REACT_APP_API_KEY}/referral?search=${searchTerm}`;
      const response = await axios.get(url);
      console.log(response.data);
      setProfiles(response.data);
    } catch (error) {
      console.error(error);
    }
    setisLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    clearTimeout(searchTimer); // Clear previous timer

    searchTimer = setTimeout(() => {
      if (e.target.value) {
        fetchProfiles(e.target.value);
      } else {
        setProfiles([]);
      }
    }, 500); // Set new timer
  };

  return (
    <div className="mx-auto p-4 max-w-lg">
      {!selectedProfile ? (
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Search  by ( name / roll no / email ) "
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />

          {isLoading ? (
            <Stack
              sx={{ color: "grey.500" }}
              spacing={2}
              direction="row"
              className="w-full  flex justify-center mt-4"
            >
              <CircularProgress color="secondary" />
              <CircularProgress color="success" />
              <CircularProgress color="inherit" />
            </Stack>
          ) : (
            <List className="mt-4">
              {profiles.map((profile, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleProfileSelect(profile)}
                  className="border border-zinc-400 my-2 shadow-md hover:shadow-lg rounded-md bg-green-500/20 hover:bg-green-500/30"
                >
                  <ListItemAvatar>
                    <Avatar src={profile?.profile} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={profile?.name}
                    secondary={
                      <>
                        <p className="font-semibold">Email: {profile?.email}</p>
                        <div className="flex flex-col md:flex-row  md:justify-between text-sm font-mono  mt-2 ">
                          <div>
                            <p>Roll No: {profile?.rollNo}</p>
                            <p>Trade: {profile?.Trade}</p>
                          </div>
                          <div>
                            <p>Profession: {profile?.profession}</p>
                            <p>
                              Batch: {profile?.startYear} - {profile?.endYear}
                            </p>
                          </div>
                        </div>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      ) : (
        <ListItem className="border relative border-zinc-400 my-2 shadow-md hover:shadow-lg rounded-md bg-green-500/20 hover:bg-green-500/30">
          <ListItemAvatar>
            <Avatar src={selectedProfile?.profile} />
          </ListItemAvatar>
          <ListItemText
            primary={selectedProfile?.name}
            secondary={
              <>
                <p className="font-semibold">Email: {selectedProfile?.email}</p>
                <div className="flex flex-col md:flex-row  md:justify-between text-sm font-mono  mt-2 ">
                  <div>
                    <p>Roll No: {selectedProfile?.rollNo}</p>
                    <p>Trade: {selectedProfile?.Trade}</p>
                  </div>
                  <div>
                    <p>Profession: {selectedProfile?.profession}</p>
                    <p>
                      Batch: {selectedProfile?.startYear} -{" "}
                      {selectedProfile?.endYear}
                    </p>
                  </div>
                </div>
              </>
            }
          />

          <div className="absolute  top-1 right-1">
            {" "}
            <CancelIcon
              onClick={() => {
                setSelectedProfile(null);
                setReferralaccount(null);
                setSearchTerm("");
                setProfiles([]);
              }}
              className="text-red-500 hover:text-red-400 cursor-pointer"
            />
          </div>
        </ListItem>
      )}
    </div>
  );
};

export default Referral;
