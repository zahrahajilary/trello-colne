import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import Close from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

class DetailItemDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            title: ''
        }
    }
    componentDidMount() {
        this.findItem()
    }

    findItem = () => {
        const { lists, listId, cardId } = this.props;
        const detailItem = lists.map(list => list.id === listId && list.cards.find(card => card.id === cardId));
        this.setState({
            text: detailItem[0].text,
            title: detailItem[0].title
        })
    }

    titleHandler = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    textHandler = (event) => {
        this.setState({
            text: event.target.value
        })
    }

    render() {
        const { closeDialog, status, updateItem } = this.props;
        const inputText = <>
            <TextField fullWidth id="outlined-basic"
                label="title"
                variant="outlined"
                value={this.state.title}
                onChange={this.titleHandler}
                style={{ margin: 5 }} />
            <TextField
                id="outlined-textarea"
                label="description"
                placeholder="description"
                multiline
                variant="outlined"
                value={this.state.text}
                onChange={(event) => this.textHandler(event)}
                style={{ margin: 5 }}
                fullWidth
            />
        </>
        return (
            <Dialog open={status}
                onClose={closeDialog}
            >
                <Close onClick={closeDialog} />
                <DialogContent>
                    <DialogTitle >Edit todo Item?</DialogTitle>
                    <hr />
                    {inputText}

                </DialogContent>

                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => updateItem(this.state.title, this.state.text)} color="primary" autoFocus>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists.trello
    }
}

export default connect(mapStateToProps)(DetailItemDialog)