import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import { Button } from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { addList, addCard } from '../../store/actions';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';

class AddButtonAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false,
            text: '',
            title: ''

        }
    };

    renderAddButton = () => {
        const { list } = this.props
        const buttonText = list ? "Add another list" : "add another card";
        const buttonOpacity = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit"

        return (
            <div
                onClick={this.openForm}
                style={{
                    ...styles.openFormButtonGroup,
                    opacity: buttonOpacity,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground
                }}>
                <AddIcon />
                <p>{buttonText}</p>
            </div>
        )
    };

    openForm = () => {
        this.setState({
            formOpen: true,

        })
    };

    closeForm = () => {
        this.setState({
            formOpen: false
        })
    };

    handleTextChange = (e) => {
        this.setState({
            text: e.target.value,
        })
    };

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
        })
    };

    handleAddList = () => {
        const { dispatch } = this.props;
        const { title } = this.state;
        if (title) {
            dispatch(addList(title))
            this.setState({
                title: ''
            })
        }
        return;
    };

    handleAddCard = () => {
        const { dispatch, listId } = this.props;
        const { text, title } = this.state;
        if (text && title) {
            dispatch(addCard(text, title, listId))
            this.setState({
                text: '',
                title: ''
            })
        }
    }

    renderForm = () => {
        const { list } = this.props;
        const placeholder = list ? "Enter the list title ...." : "Enter a title for a card ...";
        const buttonTitle = list ? 'add list' : 'add Card'
        const titleBox = list ? null : <TextField
            fullWidth
            id="outlined-basic"
            label="title"
            variant="outlined"
            value={this.state.text}
            onChange={this.handleTextChange} />
        return <>
            <Card style={{
                overflow: 'hidden',
                minHeigh: 80,
                minWidth: 272,
                padding: '6px 8px 2px'

            }}>
                {titleBox}
                <br />
                <TextField
                    id="outlined-textarea"
                    label={list ? "title" : "description"}
                    placeholder={placeholder}
                    multiline
                    variant="outlined"
                    onChange={this.handleTitleChange}
                    style={{ marginTop: 5 }}
                    fullWidth
                />
            </Card>
            <div style={styles.formButtonGroup}>
                <Button variant="contained"
                    style={{ color: 'white', backgroundColor: "#5aac44" }}
                    onMouseDown={list ? this.handleAddList : this.handleAddCard}

                >{buttonTitle}</Button>
                <Close style={{ marginLeft: 8, cursor: 'pointer' }} onClick={this.closeForm} />
            </div>
        </>
    };
    render() {
        return (
            this.state.formOpen ? this.renderForm() : this.renderAddButton()
        )
    }

}
const styles = {
    openFormButtonGroup: {
        display: "flex",
        direction: 'row',
        alignItems: 'center',
        cursor: "pointer",
        borderRadius: 3,
        height: 36,
        width: 272,
        paddingLeft: 10

    },
    formButtonGroup: {
        display: 'flex',
        alignItems: 'center',
    }
}
export default connect()(AddButtonAction);