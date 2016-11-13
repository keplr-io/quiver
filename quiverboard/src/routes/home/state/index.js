import { modelReducer as model } from './model';
import { layersReducer as layers } from './layers';
import { currentLayerReducer as currentLayer } from './app';

export default {
    model,
    layers,
    currentLayer
};
