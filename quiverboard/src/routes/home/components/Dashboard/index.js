import { connect } from 'react-redux';
import { loadModel } from '../../state/model';
import { loadLayerData } from '../../state/layers';
import { loadInputs } from '../../state/inputs';
import { loadPredictions } from '../../state/predictions';

import { setCurrentLayer, setCurrentInput, setIsLayerInfoCollapsed } from '../../state/app';

import DashboardComponent from './component';

export default connect(
    state => ({
        model: state.model,
        layers: state.layers,
        inputs: state.inputs,
        predictions: state.predictions,
        currentLayer: state.currentLayer,
        currentInput: state.currentInput,
        isLayerLoading: state.isLayerLoading,
        layerInfoIsCollpased: state.layerInfoIsCollpased
    }),
    {
        loadModel,
        loadLayerData,
        loadInputs,
        loadPredictions,
        setCurrentLayer,
        setCurrentInput,
        setIsLayerInfoCollapsed
    }
)(DashboardComponent);
