import axios from 'axios'

const URL = "https://todoleonardo.herokuapp.com/api/todos"


export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''
        const request = axios.get(`${URL}?sort=-createAt${search}`)
            .then(resp => dispatch({
                type: 'TODO_SEARCHED',
                payload: resp.data
            }))
    }
}

export const clear = () => {
    return [{ type: 'TODO_CLEAR' }, search()]
}


export const add = (description) => {
    return dispatch => {
        if (description.trim() != "") {
            axios.post(URL, {description: description })
                .then(resp => dispatch(clear()))
                .then(resp => dispatch(search()))
        }
        else {
            console.log("Não vou adicionar nada vazio")
        }
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true})
            .then(resp => dispatch(search()))
    }
}

export const markAsPending = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false})
            .then(resp => dispatch(search()))
    }
}

export const remove = (todo) => {
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispatch(search()))
    }
}