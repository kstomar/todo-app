import * as React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  Box
} from '../utils/material';
import { AppToolbar } from '../styles/styles';

const Header = () => {

  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };
  const date = new Date().toLocaleString('en-US', options);

  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor: "#4A154B"}}>
        <Toolbar sx={ AppToolbar }>
          <Typography variant="h6" component="div">
            To Do Board
          </Typography>
          <Typography variant="h6" component="div">
            {date}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default React.memo(Header);
