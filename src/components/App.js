import React, { Component } from 'react';
import '../styles/core/reset.css';
import PropTypes from 'prop-types';
import '../styles/App.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import BoardContainer from '../containers/BoardContainer';

class App extends Component {
    render() {
        return (
            <div className = "AppContainer">
                <BoardContainer {...this.props}/>
            </div>
        );
    }
}


export default DragDropContext(HTML5Backend)(App);
