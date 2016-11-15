import { fetchPredictions } from '../resource';

export const loadPredictions = inputName =>
     dispatch =>
        fetchPredictions(inputName)
        .then(response => response.json())
        .catch(err => { console.log(err); })
        .then(predictions => dispatch(updatePredictions(predictions[0])));

export const updatePredictions = predictions => ({
    type: 'update-predictions',
    predictions
});

export function predictionsReducer(state = [], action) {
    switch (action.type) {
        case 'update-predictions':
            return action.predictions;

        default:
            return state;
    }
}
