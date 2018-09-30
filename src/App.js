import React, { Component } from 'react';
import './App.css';
import { Authorities } from './Authorities.js';
import { Table } from './Table.js';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            localAuthorityId: null
        }
        this.handleLocalAuthorityClick = this.handleLocalAuthorityClick.bind(this);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">FSA Food Hygiene Ratings</h1>
                </header>
                <Authorities
                    onClick={this.handleLocalAuthorityClick}
                />
                <Table
                    localAuthorityId={this.state.localAuthorityId}
                />
            </div>
        );
    }

    handleLocalAuthorityClick(localAuthorityId) {
        this.setState({ localAuthorityId });
    }

}

export default App;
