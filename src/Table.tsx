import axios from 'axios';

import React, { Component } from 'react';

import {
    ratingsPercentages,
    fetchEstablishmentsJson
} from './FSA'

const LOADING_STATE = {
    scores: null
}

// Table showing percentage of establishments with each rating.
export class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {...LOADING_STATE};
        this.cancelTokenSource = null;
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
                    {this.state.scores.map((score, i) => (
                        <tr key={i}>
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
        if (!(this.cancelTokenSource === null)) {
            this.cancelTokenSource.cancel();
        }
        this.setState({...LOADING_STATE});
        if (localAuthorityId === null) {
            return;
        }
        this.cancelTokenSource = axios.CancelToken.source()
        fetchEstablishmentsJson(localAuthorityId, this.cancelTokenSource)
            .then(ratingsPercentages)
            .then(scores => {
                this.setState({ scores });
                this.cancelTokenSource = null;
            });
    }

}


