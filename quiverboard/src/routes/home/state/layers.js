import { fetchLayerData } from '../resource';

export const loadLayerData = (layerName, inputName) =>
    dispatch => {
        dispatch(updateLayerLoadingState(true));
        fetchLayerData(layerName, inputName)
            .then(response => {
                dispatch(updateLayerLoadingState(false));
                return response.json();
            })
            .catch(err => console.log(err))
            .then(layerData => {
                dispatch(updateLayer(layerName, layerData));
            });
    };

export const updateLayer = (layerName, layerData) => ({
    type: 'update-layer',
    data: {
        layerName,
        layerData
    }
});

export const updateLayerLoadingState = isLoading => ({
    type: 'set-layer-loading-state',
    isLoading
});

export function layerLoadingStateReducer(state = false, action) {
    switch (action.type) {
        case 'set-layer-loading-state':
            return action.isLoading;
        default:
            return state;
    }
}

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
