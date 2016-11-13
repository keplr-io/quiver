import { connect } from 'react-redux';
import { loadModel } from '../../state/model';
import { loadLayerData } from '../../state/layers';
import { setCurrentLayer, setCurrentInput } from '../../state/app';
import { loadInputs } from '../../state/inputs';
import DashboardComponent from './component';

export default connect(
    state => ({
        model: state.model,
        layers: state.layers,
        inputs: state.inputs,
        currentLayer: state.currentLayer,
        currentInput: state.currentInput
    }),
    {
        loadModel,
        loadLayerData,
        loadInputs,
        setCurrentLayer,
        setCurrentInput
    }
)(DashboardComponent);
