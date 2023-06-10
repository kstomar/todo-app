import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  MoreVertIcon, 
  Card, 
  Button,
  TextField,   
  IconButton, 
  Menu, 
  MenuItem, 
  Typography,
  Grid   
} from '../utils/material';

const CardItem = (props) => {

  const {
    cardsData,
    updateCard,
    handleDragEnd,
    handleDragEnter,
    columnId,
    removeCard
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(cardsData?.title);
  const [showError, setShowError] = useState(false);


  const handleUpdateClick = () => {
    if(editTitle === ""){
      setShowError(true)
      return;
    }

    updateCard(columnId, cardsData.id, editTitle);
    setEditMode(false);
    setAnchorEl(null);
  };

  return (
    <Card
      draggable
      onDragEnd={() =>  {
        handleDragEnd(columnId, cardsData?.id)
      }}
      onDragEnter={() => { 
        handleDragEnter(columnId, cardsData?.id)
      }}
    
      sx={{mb:5, p:"10px"}}
    >
      <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        {editMode ? ( // render a TextField component if the card is in edit mode
          <TextField                 
          color="secondary"
          value={editTitle} 
          error = {showError}
          label={ showError ? "Enter column Title": "Edit title"}
          onChange={(e) => {
            setEditTitle(e.target.value) 
            setShowError(false);
            }
          }/>
        ) : (
          <Typography gutterBottom variant="h5">
            {cardsData?.title}
          </Typography>
        )}
      </Grid>
      <Grid>
        {editMode ? ( // render an "Update" button if the card is in edit mode
          <Button type="submit" variant="contained" style={{backgroundColor:"#4A154B",color:"#ffff", marginRight:"20px"}} onClick={handleUpdateClick}>Update</Button>
        ) : (
          <div style={{ marginLeft: 'auto' }}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={(e) => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => removeCard(columnId, cardsData.id)}>Delete</MenuItem>
              <MenuItem onClick={(e) => setEditMode(true)}>Edit</MenuItem>
            </Menu>
          </div>
        )}
        </Grid>
        </Grid>
    </Card>
  );
}

CardItem.propTypes = {
  cardsData: PropTypes.shape({}),
  updateCard: PropTypes.func,
  handleDragEnd: PropTypes.func,
  handleDragEnter: PropTypes.func,
  columnId: PropTypes.string,
  removeCard: PropTypes.func,
};

export default React.memo(CardItem);
