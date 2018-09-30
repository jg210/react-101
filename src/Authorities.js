import React, { Component } from 'react';
import { extractLocalAuthorities } from './FSA.js';

export class Authorities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            localAuthorities: []
        }
    }

    render() {
        return (
            <select onClick={this.handleClick.bind(this)} className="Authority">
                {this.state.localAuthorities.map(localAuthority =>
                    <option key={localAuthority.localAuthorityId} value={localAuthority.localAuthorityId}>{localAuthority.name}</option>
                )}}
        </select>
        );
    }

    handleClick(event) {
        const target = event.target;
        if (target) {
            this.props.onClick(event.target.value);
        }
    }

    componentDidMount() {
        fetch(this.props.url, {
            headers: {
                'Accept': 'application/json',
                'x-api-version': 2
            }
        })
            .then(response => response.json())
            .then(extractLocalAuthorities)
            .then(localAuthorities => this.setState({ localAuthorities }));
    }

}
