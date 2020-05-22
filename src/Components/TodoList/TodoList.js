import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import TodoItem from '../TodoItem/TodoItem'
import AddButtonAction from '../AddButtonAction/AddButtonAction';
import { connect } from 'react-redux';
import { dragDropCard } from '../../store/actions'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      transition: undefined
    }
  }

  handleShowSnak = (trans) => () => {
    this.setState({
      transition: trans
    }, () => {
      this.setState({
        open: true
      })
    });
  };

  handleCloseSnak = () => {
    this.setState({
      open: false
    })
  }
  dragOver = (e) => {
    e.preventDefault();
  }


  dropCard = (e) => {
    e.preventDefault();
    const { listId, dispatch } = this.props;
    const dropCardId = e.dataTransfer.getData("cardId");
    const dropListId = e.dataTransfer.getData("listId");
    dispatch(dragDropCard(dropCardId, dropListId, listId));
    this.setState({
      open: true
    })
  }

  render() {

    const { title, cards, listId } = this.props

    const card = cards && cards.map((card) =>
      <TodoItem
        index={card.id}
        text={card.text}
        key={card.id}
        createdDate={card.createdDate}
        title={card.title}
        listId={listId}
        id={card.id} />)

    const snak =
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleCloseSnak}
        message="drap item was succefully"
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleCloseSnak}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />

    return (

      <Card onDragOver={(e) => this.dragOver(e)} onDrop={(e) => this.dropCard(e)} style={styles.cardColor}>
        <CardContent>
          <Typography color="textPrimary">
            {title}
          </Typography>
          {card}
          <AddButtonAction listId={listId} />
        </CardContent>
        {snak}
      </Card>

    )
  }
}
const styles = {
  cardColor: {
    backgroundColor: '#f9f9f9',
    margin: 5
  }
}


export default connect()(TodoList)