import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'


const URL = "https://todoleonardo.herokuapp.com/api/todos"


export default class Todo extends Component {
    
    constructor(props) {
        super(props)
        this.state = { description: '', list: []}
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.refresh()
    }

    // Recarrega os dados da pagina
    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''

        axios.get(`${URL}?sort=-createAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data }))
    }

    // faz uma busca por descricao
    handleSearch() {
        this.refresh(this.state.description)
    }

    // Muda o estado do ... ?
    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    // Adicionar tarefa
    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())
    }

    // Remover tarefa
    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    // Marca a tarefa como concluida
    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => this.refresh(this.state.description))
    }

    // Marca a tarefa como pendente
    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => this.refresh(this.state.description))
    }

    // Limpa os dados do input text
    handleClear() {
        this.refresh()
    }
    
    render() {
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />

                <TodoForm 
                    description={ this.state.description }
                    handleChange={ this.handleChange }
                    handleAdd={ this.handleAdd }
                    handleClear={ this.handleClear }
                    handleSearch={ this.handleSearch } />
                    
                <TodoList 
                    list={ this.state.list }
                    handleMarkAsDone={ this.handleMarkAsDone }
                    handleMarkAsPending={ this.handleMarkAsPending }
                    handleRemove={ this.handleRemove } />
            </div>
        )
    }
}