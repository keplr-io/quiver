import { fetchModel } from '../resource';

export const loadModel = () => dispatch => fetchModel()
    .then(response => response.json())
    .then(model => dispatch(updateModel(model)));

export const updateModel = model => ({
    type: 'update-model-config',
    model
});

export function modelReducer(state = null, action) {
    switch (action.type) {
        case 'update-model-config':
            return action.model;

        default:
            return state;
    }
}
