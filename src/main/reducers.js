import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    todo: () => ({
        description: 'Ler livro',
        list: [{
            _id: 1,
            description: 'Pagar fatura do cartão',
            done: true
        }, {
            _id: 2,
            description: 'Reunião com equipe as 10h',
            done: false
        }, {
            _id: 3,
            description: 'Consulta medica de teste',
            done: false
        }]
    })
})

export default rootReducer