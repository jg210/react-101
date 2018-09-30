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
                    <h1 className="App-title">FHS ratings</h1>
                </header>
                <Authorities
                    url="http://api.ratings.food.gov.uk/Authorities/basic"
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
