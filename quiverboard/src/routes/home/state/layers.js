import fetchLayerData from './resource';

export const loadLayerData = (layerName, inputName) =>
    dispatch => fetchLayerData(layerName, inputName)
        .then(layerData => dispatch(
            updateLayer(layerName, layerData)
        ));

export const updateLayer = (layerName, layerData) => ({
    type: 'update-layer',
    data: {
        layerName,
        layerData
    }
});

export function layersReducer(state = {}, action) {
    switch (action.type) {
        case 'update-layer':
            return Object.assign({}, state, {
                [action.data.layerName]: action.data.layerData
            });

        default:
            return state;
    }
}
