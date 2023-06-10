import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  IconButton, 
  Button,
  TextField,
  Grid,
  CloseIcon,
} from '../utils/material';

const AddTitle = (props) => {

  const {
    onSubmit,
    text,
  } = props;

  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);

  return (
    <Grid container alignItems="center" mt={4}>
      {showEdit ? (
        <>
          <Grid item={true} xs={12}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if(inputValue === ""){
                  setShowError(true)
                  return;
                }
            
                if (onSubmit) {
                  onSubmit(inputValue);
                  setShowEdit(false);
                  setInputValue('');
                }
              }}
            >
               <TextField
                autoFocus
                value={inputValue}
                placeholder={props.placeholder}
                multiline
                error = {showError}
                InputProps={{
					        style: {
					        	backgroundColor: "#ffff",
					        	outline: "1px solid #4A154B"
					        },
					      }}
                variant="outlined"
                color="secondary"
                fullWidth
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setShowError(false);
                }}
              />
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Button type="submit" variant="contained" style={{backgroundColor:"#4A154B",color:"#ffff"}}>
                    {text || 'Add'}
                  </Button>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => setShowEdit(false)}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </>
      ) : (
        <Grid item={true} xs={12} >
          <Button
            variant="contained"
            style={{backgroundColor:"#4A154B",color:"#ffff"}}
            fullWidth={true}
            onClick={() => setShowEdit(true)}
          >
            {text || 'Add item'}
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

AddTitle.propTypes = {
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  text: PropTypes.string
}

export default React.memo(AddTitle);
