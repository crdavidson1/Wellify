import React from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import BarChartIcon from '@mui/icons-material/BarChart'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'

const Sidebar: React.FC = () => {
  return (
    <Drawer PaperProps={{ sx: { backgroundColor: '#0064C5' } }} variant="permanent">
      <div>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            marginTop: '20px',
            fontWeight: 'bold',
            color: 'white',
            fontSize: '1.7rem'
          }}
        >
          Wellify
        </Typography>
        <List>
          <ListItemButton
            component={Link}
            to="/"
            sx={{
              '&:hover': {
                backgroundColor: '#89c9fb'
              }
            }}
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              primaryTypographyProps={{ sx: { color: 'white', fontSize: '1.25rem' } }}
            />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/statistics"
            sx={{
              '&:hover': {
                backgroundColor: '#89c9fb'
              }
            }}
          >
            <ListItemIcon>
              <BarChartIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary="Statistics"
              primaryTypographyProps={{ sx: { color: 'white', fontSize: '1.25rem' } }}
            />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/settings"
            sx={{
              '&:hover': {
                backgroundColor: '#89c9fb'
              }
            }}
          >
            <ListItemIcon>
              <SettingsIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{ sx: { color: 'white', fontSize: '1.25rem' } }}
            />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/notifications"
            sx={{
              '&:hover': {
                backgroundColor: '#89c9fb'
              }
            }}
          >
            <ListItemIcon>
              <NotificationsIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText
              primary="Notifications"
              primaryTypographyProps={{ sx: { color: 'white', fontSize: '1.25rem' } }}
            />
          </ListItemButton>
        </List>
      </div>
    </Drawer>
  )
}
export default Sidebar
