import React from 'react';
import Grid from './Grid'
import Metric from './Metric'
import Link from './Link'

export default class Status extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accuracy: 0,
            test_scores: [],
            test_labels: [],
            annotation_count: 0,
            labels: []
        }
    }

    componentDidMount() {
        let intervalId = setInterval(this.timer.bind(this), 1000);

        // store intervalId in the state so it can be accessed later:
        this.setState({intervalId: intervalId});
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    }

    timer() {
        // workaround for undefined this
        let setter = this.setState.bind(this);


        fetch('http://localhost:5000/status')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setter({
                    accuracy: data.accuracy,
                    test_scores: data.test_scores,
                    test_labels: data.test_labels,
                    annotation_count: data.annotation_count,
                    labels: data.labels
                });
            });

    }

    render() {
        return (
            <div className="status">
                <Metric id="accuracy" label="Accuracy" value={this.state.accuracy} type="percent" />
                <Metric id="annotation_count" label="Annotation count" value={this.state.annotation_count} />
                <Link url="http://bit.ly/bloomy2018" />
                <Grid test_labels={this.state.test_labels} test_scores={this.state.test_scores} labels={this.state.labels} />
            </div>
        );
    }
}