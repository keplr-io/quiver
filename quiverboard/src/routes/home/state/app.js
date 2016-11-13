/**
 * Data-independent application states
 */

export const setCurrentLayer = layerName => ({
    type: 'set-current-layer',
    layerName
});

export function currentLayerReducer(state = null, action) {

    switch (action.type) {
        case 'set-current-layer':
            return action.layerName;

        default:
            return state;
    }

}
