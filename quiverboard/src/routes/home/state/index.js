import { modelReducer as model } from './model';
import { layersReducer as layers } from './layers';
import { inputsReducer as inputs } from './inputs';
import { currentLayerReducer as currentLayer, currentInputReducer as currentInput } from './app';

export default {
    model,
    layers,
    inputs,
    currentLayer,
    currentInput
};
