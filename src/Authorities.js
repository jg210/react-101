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
                <option value={localAuthority.localAuthorityId}>{localAuthority.name}</option>
            )}}
        </select>
    );
  }

  componentDidMount() {
      fetch(this.props.url, {
        headers: {
          'Accept': 'application/json',
          'x-api-version': 2
        }})
      .then(response => response.json())
      .then(json => json.authorities.map(authority => ({ name: authority.Name, localAuthorityId: authority.LocalAuthorityId })))
      .then(localAuthorities => this.setState({localAuthorities}));
  }

}


