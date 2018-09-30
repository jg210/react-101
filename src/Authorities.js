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
        <select onChange={this.handleChange.bind(this)}>
            {this.state.localAuthorities.map(localAuthority =>
                <option key={localAuthority.localAuthorityId} value={localAuthority.localAuthorityId}>{localAuthority.name}</option>
            )}}
        </select>
    );
  }

  handleChange(event) {
    this.props.onSelect(event.target.value);
  }

  // TODO Move to new file.
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
