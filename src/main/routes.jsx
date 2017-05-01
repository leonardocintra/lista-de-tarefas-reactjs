import React from 'react'
import { Redirect } from 'react-router'
import { HashRouter, Route, Link } from 'react-router-dom'

import Todo from '../todo/todo'
import About from '../about/about'

export default props => (
    <HashRouter>
        <div>
            <Route path='/todos' component={ Todo } />
            <Route path='/about' component={ About } />
            <Redirect from='*' to='/todos' />
        </div>
    </HashRouter>
)

/**
 * Redirect = Caso digitar uma URL invalida, ele volta para a pagina /todos
 */
