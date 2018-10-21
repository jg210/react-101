import React, { Component } from 'react';

import {
    ratingsPercentages,
    fetchEstablishmentsJson
} from './FSA.js'

const LOADING_STATE = {
    scores: null
}

// Table showing percentage of establishments with each rating.
export class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {...LOADING_STATE};
    }

    render() {
        if (this.props.localAuthorityId === null) {
            return null;
        }
        if (this.state.scores === null) {
            return (
                <div>loading...</div>
            );
        }
        return (
            <table className="Table">
                <thead>
                    <tr>
                        <th>Rating</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.scores.map(score => (
                        <tr key={score.rating}>
                            <td>{score.rating}</td>
                            <td>{Math.round(score.percentage)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    componentDidUpdate(prevProps) {
        const localAuthorityId = this.props.localAuthorityId;
        if (localAuthorityId === prevProps.localAuthorityId) {
            return;
        }
        this.setState({...LOADING_STATE});
        if (localAuthorityId === null) {
            return;
        }
        fetchEstablishmentsJson(localAuthorityId)
            .then(ratingsPercentages)
            .then(scores => this.setState({ scores }));
    }

}


