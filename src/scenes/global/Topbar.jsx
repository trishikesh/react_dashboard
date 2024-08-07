import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SuprSendInbox from '@suprsend/react-inbox';
import 'react-toastify/dist/ReactToastify.css'; 

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // State to store distinctId and subscriberId
  const [distinctId, setDistinctId] = useState(null);
  const [subscriberId, setSubscriberId] = useState(null);

  useEffect(() => {
    // Fetch or generate distinctId and subscriberId here
    // For example, from localStorage or a backend API
    // Example with dummy values:
    const fetchedDistinctId = 'yourDistinctId'; // Replace with actual fetching logic
    const fetchedSubscriberId = 'yourSubscriberId'; // Replace with actual fetching logic

    setDistinctId(fetchedDistinctId);
    setSubscriberId(fetchedSubscriberId);
  }, []);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        
        {/* SuprSendInbox Component */}
        {distinctId && subscriberId && (
          <SuprSendInbox
            workspaceKey="<workspace_key>"
            subscriberId={subscriberId}
            distinctId={distinctId}
          />
        )}

        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        
        {/* Display IDs */}
        
      </Box>
    </Box>
  );
};

export default Topbar;
