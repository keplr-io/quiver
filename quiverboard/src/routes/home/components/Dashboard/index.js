import { connect } from 'react-redux';
import { loadModel } from '../../state/model';
import { loadLayerData } from '../../state/layers';
import DashboardComponent from './component';

export default connect(
    state => ({
        model: state.model,
        layers: state.layers
    }),
    {
        loadModel,
        loadLayerData
    }
)(DashboardComponent);
