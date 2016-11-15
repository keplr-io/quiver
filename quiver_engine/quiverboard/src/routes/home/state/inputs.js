import { fetchInputs } from '../resource';

export const loadInputs = () => dispatch => fetchInputs()
    .then(response => response.json())
    .then(inputs => dispatch(updateInputs(inputs)));

export const updateInputs = inputs => ({
    type: 'update-inputs',
    inputs
});

export function inputsReducer(state = [], action) {
    switch (action.type) {
        case 'update-inputs':
            return action.inputs;

        default:
            return state;
    }
}
