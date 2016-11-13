import { connect } from 'react-redux';
import { loadModel } from '../../state/model';
import { loadLayerData } from '../../state/layers';
import { setCurrentLayer } from '../../state/app';
import DashboardComponent from './component';

export default connect(
    state => ({
        model: state.model,
        layers: state.layers,
        currentLayer: state.currentLayer
    }),
    {
        loadModel,
        loadLayerData,
        setCurrentLayer
    }
)(DashboardComponent);
