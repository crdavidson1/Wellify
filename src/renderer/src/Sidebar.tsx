import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';


const Sidebar: React.FC = () => {
  return (
      <Drawer variant="permanent">
          <List>
              <ListItemButton component={Link} to="/">
                  <ListItemIcon>
                      <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
              </ListItemButton>
              <ListItemButton component={Link} to="/statistics">
                  <ListItemIcon>
                      <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Statistics" />
              </ListItemButton>
              <ListItemButton component={Link} to="/settings">
                  <ListItemIcon>
                      <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
              </ListItemButton>
              <ListItemButton component={Link} to="/notifications">
                  <ListItemIcon>
                      <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Notifications" />
              </ListItemButton>
          </List>
      </Drawer>
  );
}
export default Sidebar;
