import React, { useState } from "react";
import PropTypes from 'prop-types';

import CardItem from "./CardItem";
import AddTitle from "./AddTitle";
import {
  MoreVertIcon,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Grid,
  TextField
} from '../utils/material';

const Cards = props => {

  const {
    column,
    updateColumn,
    removeColumns,
    removeCard,
    handleDragEnter,
    handleDragEnd,
    updateCard,
    addCard,
  } = props;

  const [menu, setMenu] = useState(null);
  const [editTitle, setEditTitle] = useState(column?.title);
  const [editMode, setEditMode] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleUpdateClick = () => {
    if(editTitle === ""){
      setShowError(true)
      return;
    }

    setShowError(false)
    updateColumn(column.id, editTitle);
    setEditMode(false);
  };

  return (
      <Card>
        <CardContent
          draggable
          onDragEnter={() => { 
            handleDragEnter(column.id)
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid  onClick={(e) => setEditMode(true)} item xs>
              {editMode ? ( // render a TextField component if the card is in edit mode
          	<TextField 
            inputProps={{
              maxLength:20
            }}
            helperText={`${editTitle ? editTitle.length : 0}/${20}`}
            color="secondary"
            error = {showError}
            label={ showError ? "Enter Card Title": "Edit title"}
            value={editTitle} 
            onChange={(e) => {
              setEditTitle(e.target.value);
              setShowError(false);
            }}
            onBlur={handleUpdateClick}
            >
            </TextField>
            ): (
              <Typography  
              gutterBottom 
              variant="h5" 
              component="h2"
              pl={2}>
                {column?.title}
              </Typography>
              )}
            </Grid>
            <Grid item>
              <IconButton onClick={(e) => setMenu(e.currentTarget)}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={menu}
                keepMounted
                open={Boolean(menu)}
                onClose={(e) => setMenu(null)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => removeColumns(column?.id)}>Delete</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid item container justify-content="center">
            <Grid item={true} xs={12}>
              <Card className="board_cards" >
                {column.cards?.map((item, index ) => (
                  <div key={item.id}>
                    <CardItem
                      cardsData={item}
                      columnId={column?.id}
                      removeCard={removeCard}
                      handleDragEnter={handleDragEnter}
                      handleDragEnd={handleDragEnd}
                      updateCard={updateCard}              
                    />
                  </div>
                ))}
                <AddTitle
                  text="+ Add Card"
                  placeholder="Enter Card Title"
                  onSubmit={(value) => addCard(value, column?.id)}
                />
              </Card>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
  );
}

Cards.propTypes = {
  column: PropTypes.shape({}),
  updateColumn: PropTypes.func,
  removeColumns: PropTypes.func,
  removeCard: PropTypes.func,
  handleDragEnter: PropTypes.func,
  handleDragEnd: PropTypes.func,
  updateCard: PropTypes.func,
  addCard: PropTypes.func,
};

export default React.memo(Cards);
