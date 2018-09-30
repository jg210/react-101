import React, { Component } from 'react';

export class Authorities extends Component {

  constructor(props) {
      super(props);
      this.state = {
          localAuthorities: []
      }
  }

  render() {
    return (
        <select>
            {this.state.localAuthorities.map(localAuthority =>
                <option key={localAuthority.localAuthorityId} value={localAuthority.localAuthorityId}>{localAuthority.name}</option>
            )}}
        </select>
    );
  }

  parseJson(json) {
    return json.authorities.map(authority => ({
        name: authority.Name,
        localAuthorityId: authority.LocalAuthorityId
    }));
  }

  componentDidMount() {
      fetch(this.props.url, {
        headers: {
          'Accept': 'application/json',
          'x-api-version': 2
        }})
      .then(response => response.json())
      .then(this.parseJson)
      .then(localAuthorities => this.setState({localAuthorities}));
  }

}


