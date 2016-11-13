import React, {Component, PropTypes} from 'react';
import './style.scss';

export default class Dashboard extends Component {

    static propTypes = {
        loadModel: PropTypes.func,
        loadLayerData: PropTypes.func
    }

    componentWillMount() {
        this.props.loadModel();
    }

    render() {
        return <pre>{
            JSON.stringify(this.props.model, null, 4)
        }</pre>;
    }
};
