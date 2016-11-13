export const fetchModel = () => fetch(`${QUIVER_URL}/model`);

export const fetchLayerData = (layerName, inputName) => fetch(
    `${QUIVER_URL}/layers/${inputName}`
);
