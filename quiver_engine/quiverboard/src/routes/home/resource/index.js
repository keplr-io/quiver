export const fetchInputs = () => fetch(`${QUIVER_URL}/inputs`);

export const fetchModel = () => fetch(`${QUIVER_URL}/model`);

export const fetchPredictions = (inputName) => fetch(`${QUIVER_URL}/predict/${inputName}`);

export const fetchLayerData = (layerName, inputName) => fetch(
    `${QUIVER_URL}/layer/${layerName}/${inputName}`
);
