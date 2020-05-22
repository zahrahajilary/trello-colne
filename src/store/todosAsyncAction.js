import { CONSTANT } from './action-types';

export const fetchTodosSuccess = (todos) => ({
  type: CONSTANT.FETCH_TODOS_SUCCESS,
  payload: todos
})


export const fetchTodosBegin = (todos) => ({
  type: CONSTANT.FETCH_TODOS_BEGIN,
})


export const fetchTodosFailure = (error) => ({
  type: CONSTANT.FETCH_TODOS_FAILURE,
  payload: error
})

export const fetchTodos = () => {
  return dispatch => {
    dispatch(fetchTodosBegin());
    return fetch("https://jsonplaceholder.typicode.com/todos")
      .then(handleErrors)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchTodosSuccess(data.slice(0, 20)));
        return data;
      })
      .catch(error => dispatch(fetchTodosFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}