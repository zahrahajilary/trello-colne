import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import SimpleDialog from '../Dialog/Dialog'
import { removeCard, updateItem } from '../../store/actions'
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit'
import moment from 'moment'

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusDialog: false
        }
    }
    openDialog = () => {
        this.setState({
            statusDialog: true
        })
    }

    closeDialog = () => {
        this.setState({
            statusDialog: false
        })
    }
    removeItem = () => {
        const { dispatch, id, listId } = this.props
        dispatch(removeCard(id, listId));

    }
    updateItem = (title, text) => {
        const { dispatch, id, listId } = this.props
        if (id) {
            dispatch(updateItem(id, listId, title, text))
            this.closeDialog()
        }
    }

    startDrag = (e) => {
        const { id, listId } = this.props
        e.dataTransfer.setData("cardId", id);
        e.dataTransfer.setData("listId", listId);
    }
    readableDate = (time) => {
        return moment.unix(time / 1000).format('dddd MMMM Do YYYY, h:mm:ss a');
    }

    render() {
        const { text, title, createdDate, id, listId } = this.props
        const dialog = this.state.statusDialog && <SimpleDialog
            status={this.state.statusDialog}
            closeDialog={this.closeDialog}
            cardId={id}
            listId={listId}
            updateItem={this.updateItem}
        />

        return (
            <div>
                <Card style={styles.todoItem} draggable="true" onDragStart={(e) => this.startDrag(e)}>
                    <IconButton aria-label="delete" onClick={this.removeItem}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => this.openDialog(id)}>
                        <Edit fontSize="small" />
                    </IconButton>
                    <CardContent>

                        <Typography variant={"button"} display={"block"} gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>{text}</Typography>
                        <small color="gray">{this.readableDate(createdDate)}</small>


                    </CardContent>
                </Card>
                {dialog}
            </div>
        )
    }

}

const styles = {
    todoItem: {
        margin: 10
    }
}
export default connect()(TodoItem)