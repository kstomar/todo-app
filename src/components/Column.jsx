import React, {useState, useEffect} from 'react';

import Cards from  './Cards'
import AddTitle from './AddTitle';
import { ColumnContainer, PaperLayout } from '../styles/styles'
import { Grid, Container, Paper  } from '../utils/material';
import { uniqueId }  from '../utils/uniqueId';
import { setData, getData} from '../utils/storage';
import Header from './Header';

const Column = () => {
  const [columns, setColumns] = useState(getData() || [])
  const [target, setTarget] = useState({
    cardId:"",
    columnId:""
  })

  // Add card
  const addCards = (title, columnId) => {
    const index = columns.findIndex((item) => item.id === columnId);
    if (index < 0) return;
    const card = {
      id: uniqueId(),
      title: title,
      create_date: new Date().toLocaleDateString(),
      update_date:"",
      status: columns[index].title
    }
    const teampColumns = [...columns, ]
    teampColumns[index].cards.push(card);
    setColumns(teampColumns);
  }

  const handleDragEnter = (columnId, cardId) => {
    if (target.cardId === cardId) return;
    setTarget({
      cardId,
      columnId
    });
  }

  const handleDragEnd = (columnId, cardId) => {
    let columnSourceIndex, cardSourceIndex, targetColumnIndex, targetCardIndex;
    columnSourceIndex = columns.findIndex((item) => item.id === columnId);

    if (columnSourceIndex < 0) return;
    cardSourceIndex = columns[columnSourceIndex]?.cards?.findIndex(
      (item) => item.id === cardId
    );

    if (cardSourceIndex < 0) return;
    targetColumnIndex = columns.findIndex((item) => item.id === target.columnId);

    if (targetColumnIndex < 0) return;
  
    targetCardIndex = columns[targetColumnIndex]?.cards?.findIndex(
      (item) => item.id === target.cardId
    );

    const tempColumns = [...columns];
    const sourceCard = tempColumns[columnSourceIndex].cards[cardSourceIndex];
    tempColumns[columnSourceIndex].cards.splice(cardSourceIndex, 1);
    tempColumns[targetColumnIndex].cards.splice(targetCardIndex, 0, sourceCard);
    setColumns(tempColumns);
    setTarget({
      cardId: "",
      columnId: "",
    });  
  } 
  
  // Remove card 
  const removeCard = (columnId, cardId) => {
    const columnIndex = columns.findIndex((item) => item.id === columnId);
    if(columnIndex < 0 ){
      return ;
    }
    const tempColumns = [...columns]
    const cards = tempColumns[columnIndex].cards;
    const cardIndex = cards.findIndex((item=> item.id === cardId));
    if(cardIndex < 0 ){
      return ;
    }
    cards.splice(cardIndex, 1);
    setColumns(tempColumns);
  }

  const addColums = (title) => {
    if(title) {
      const newColums = {
        id: uniqueId(),
        title,
        create_date: new Date().toLocaleDateString(),
        cards: []
      }
      setColumns([...columns,newColums ])
    }
    else {
      alert("Title is Empty");
    }
  }

  const removeColumns = (columnId) =>  {
    const tempColumns = columns.filter(item=> item.id!==columnId);
    setColumns(tempColumns);
  }

  const updateCard = (columnId, cardId, title) => {
    const index = columns.findIndex((item) => item.id === columnId);
    if (index < 0) return;
    
    const tempColumns = [...columns];
    const cards = tempColumns[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cardId);
    if (cardIndex < 0) return;
    tempColumns[index].cards[cardIndex].title = title;
    tempColumns[index].cards[cardIndex].updateDate = new Date().toLocaleDateString()
    setColumns(tempColumns);
  }

  const updateColumn = (columnId, title) => {
    const index = columns.findIndex((item) => item.id === columnId);

    if (index < 0) return;

    const tempColumns = [...columns];
    tempColumns[index].title = title;
    setColumns(tempColumns);

  }

  useEffect(() => {
    setData(columns);
  }, [columns]);

  return (
  	  <>
				<Header></Header>
				<Container sx={{ marginTop:"20px"}} maxWidth="100vw" >
          <Grid container>
            <Grid item={true} xs={10} md={10}>
            </Grid>
            <Grid item={true} xs={2} md={2}>
              <AddTitle
                text="+ Add Column"
                placeholder="Enter Column Title"
                onSubmit={(value) => addColums(value)}
              />
            </Grid>
  				</Grid>
				</Container>
        <Container sx={ ColumnContainer} maxWidth="100vh" >
						<Grid container spacing={4} wrap="nowrap">
  							{columns.map((item) => (
  								<Grid key={item.id} item={true} xs={12} md={3}>
                    <Paper sx={ PaperLayout }>
                      <Cards
                        removeColumns={removeColumns}
                        column={item}
                        addCard={addCards}
                        removeCard={removeCard}
                        handleDragEnter={handleDragEnter}
                        handleDragEnd={handleDragEnd}
                        updateCard={updateCard}
                        updateColumn = {updateColumn}
                      />
                    </Paper>
  								</Grid>
  							))}
						</Grid>
				</Container>
    </>
  );
}

export default React.memo(Column)
