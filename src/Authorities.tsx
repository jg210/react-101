import React, { Component } from 'react';
import {
    extractLocalAuthorities,
    fetchLocalAuthoritiesJson
} from './FSA';

// Drop down list that populates itself with list of local authorities.
export class Authorities extends Component {

    constructor(props) {
        super(props);
        this.state = {
            localAuthorities: null
        }
    }

    render() {
        let dropdown = null;
        if (this.state.localAuthorities === null) {
            dropdown = <div>loading...</div>
        } else {
            dropdown = <select onClick={this.handleClick.bind(this)}>
                {this.state.localAuthorities.map((localAuthority, i) =>
                    <option key={i} value={localAuthority.localAuthorityId}>{localAuthority.name}</option>
                )}
            </select>
        }
        return (
            <div className="Authority">
                {dropdown}
            </div>
        );
    }

    handleClick(event) {
        const target = event.target;
        if (target) {
            this.props.onClick(event.target.value);
        }
    }

    componentDidMount() {
        fetchLocalAuthoritiesJson()
            .then(extractLocalAuthorities)
            .then(localAuthorities => this.setState({ localAuthorities }));
    }

}
