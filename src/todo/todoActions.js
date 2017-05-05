import axios from 'axios'

const URL = "https://todoleonardo.herokuapp.com/api/todos"


export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    const request = axios.get(`${URL}?sort=-createAt`)
    return {
        type: 'TODO_SEARCHED',
        payload: request
    }
}