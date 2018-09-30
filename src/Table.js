import React, { Component } from 'react';

import { ratingsPercentages } from './FSA.js'

export class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scores: null
        }
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
        if (localAuthorityId === null) {
            return;
        }
        if (localAuthorityId === prevProps.localAuthorityId) {
            return;
        }
        this.setState({ scores: null });
        const url = `http://api.ratings.food.gov.uk/Establishments?localAuthorityId=${encodeURIComponent(localAuthorityId)}&pageSize=0`;
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'x-api-version': 2
            }})
            .then(response => response.json())
            .then(ratingsPercentages)
            .then(scores => this.setState({ scores }));
    }

}


