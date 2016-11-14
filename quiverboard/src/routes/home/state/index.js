import { modelReducer as model } from './model';
import { layersReducer as layers, layerLoadingStateReducer as isLayerLoading } from './layers';
import { inputsReducer as inputs } from './inputs';
import {
    currentLayerReducer as currentLayer,
    currentInputReducer as currentInput,
    layerInfoIsCollapsedReducer as layerInfoIsCollpased
} from './app';

export default {
    model,
    layers,
    inputs,
    currentLayer,
    currentInput,
    isLayerLoading,
    layerInfoIsCollpased
};
