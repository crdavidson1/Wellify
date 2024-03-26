import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const Sidebar: React.FC = () => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/settings">
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton component={Link} to="/statistics">
          <ListItemText primary="Statistics" />
        </ListItemButton>
        <ListItemButton component={Link} to="/notifications">
          <ListItemText primary="Notifications" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
