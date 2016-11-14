import { modelReducer as model } from './model';
import { layersReducer as layers, layerLoadingStateReducer as isLayerLoading } from './layers';
import { inputsReducer as inputs } from './inputs';
import { predictionsReducer as predictions } from './predictions';
import {
    currentLayerReducer as currentLayer,
    currentInputReducer as currentInput,
    layerInfoIsCollapsedReducer as layerInfoIsCollpased
} from './app';

export default {
    model,
    layers,
    inputs,
    predictions,
    currentLayer,
    currentInput,
    isLayerLoading,
    layerInfoIsCollpased
};
