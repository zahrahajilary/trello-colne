import React, { Component } from 'react';
import TodoList from '../TodoList/TodoList'
import AddButtonAction from '../AddButtonAction/AddButtonAction'
import { connect } from 'react-redux'
import { fetchTodos } from '../../store/todosAsyncAction'
class Home extends Component {
    componentDidMount() {
        const { dispatch, lists } = this.props;
        if (lists) {
            lists.forEach(list => {
                if (list.title === 'todo' && list.cards.length < 2) {
                    dispatch(fetchTodos())
                }
            })
        }
    }

    render() {
        const { lists } = this.props
        return (
            <div style={styles.container}>
                {lists && lists.map(list =>
                    <TodoList
                        title={list.title}
                        key={list.id}
                        cards={list.cards}
                        listId={list.id}
                    />
                )}
                <AddButtonAction list />
            </div>
        )
    }
}
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'center',
        overflowX: 'auto'
    }
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists.trello
    }
}
export default connect(mapStateToProps)(Home);