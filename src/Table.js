import React, { Component } from 'react';

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
                        <tr>
                            <td>{score.rating}</td>
                            <td>{Math.round(score.percentage)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    // TODO Move to new file.
    // Parse json and return order Array of [ rating, fraction ] tuples.
    parseJson(json) {
        const scoreCounts = new Map();
        let count = 0;
        json.establishments.forEach(establishment => {
            let rating = establishment.RatingValue;
            if (rating === "AwaitingInspection") {
                rating = "Awaiting Inspection";
            }
            let oldCount = scoreCounts.get(rating);
            if (oldCount === undefined) {
                oldCount = 0;
            }
            scoreCounts.set(rating, oldCount + 1);
            count++;
        });
        const ratings = Array.from(scoreCounts.keys()).sort();
        return ratings.map(rating => ({ rating: rating, percentage: 100 * scoreCounts.get(rating) / count }));
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
            }
        })
            .then(response => response.json())
            .then(this.parseJson)
            .then(scores => this.setState({ scores }));
    }

}


