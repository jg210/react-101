import React, { Component } from 'react';
import {
    extractLocalAuthorities,
    fetchLocalAuthoritiesJson,
    LocalAuthority
} from './FSA';

interface Props {
    onClick: (localAuthorityId: number) => void
}

interface State {
    localAuthorities: LocalAuthority[] | null
}

// Drop down list that populates itself with list of local authorities.
export class Authorities extends Component<Props,State> {

    state: State = {
        localAuthorities: null
    };

    constructor(props: Props) {
        super(props);
    }

    render() {
        let dropdown = null;
        if (this.state.localAuthorities === null) {
            dropdown = <div>loading...</div>
        } else {
            dropdown = <select onClick={this.handleClick.bind(this)}>
                {this.state.localAuthorities.map((localAuthority: LocalAuthority, i: number) =>
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

    handleClick(event: any) { // TODO use more specific type.
        const target = event.target;
        if (target) {
            this.props.onClick(event.target.value);
        }
    }

    componentDidMount() {
        fetchLocalAuthoritiesJson()
            .then(extractLocalAuthorities)
            .then((localAuthorities: LocalAuthority[]) => this.setState({ localAuthorities }));
    }

}
