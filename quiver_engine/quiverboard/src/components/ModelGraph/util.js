export function computeCytoscapeGraph(kerasGraph, prefix) {
    return kerasGraph.class_name === 'Model'
        ? getModelCytoscapeGraph(kerasGraph, prefix)
        : getSequentialCytoscapeGraph(kerasGraph, prefix);
}

export function getModelCytoscapeGraph(kerasGraph) {

    /**
     * Precompute this for performance
     */
    const subgraphMap = kerasGraph.config.layers.reduce(
        (currentMap, layer) => Object.assign(
            currentMap, {
                [layer.name]: isNodeSubgraph(layer) ? layer : false
            }
        ), {}
    );

    return [].concat(
        /**
         * Nodes
         */
        kerasGraph.config.layers.reduce(
            (nodes, layer) => (
                subgraphMap[layer.name]
                    ? nodes.concat(computeCytoscapeGraph(layer, layer.name))
                    : nodes.concat([
                        {
                            data: {
                                id: layer.name,
                                data: layer,
                                shape: layer.class_name === 'Convolution2D' ? 'roundrectangle' : 'ellipse'
                            }
                        }
                    ])
            ), []
        )
    ).concat(
        /**
         * Links
         */
        kerasGraph.config.layers.reduce((links, layer) => (
            links.concat(
                layer.inbound_nodes.length ? layer.inbound_nodes[0].map(
                    (inboundNode) => ({
                        data: {
                            id: layer.name + '-' + inboundNode[0],
                            source: subgraphMap[inboundNode[0]]
                                ? getSubgraphEnd(subgraphMap[inboundNode[0]]) : inboundNode[0],
                            target: subgraphMap[layer.name]
                                ? getSubgraphStart(subgraphMap[layer.name]) : layer.name
                        }
                    })
                ) : []
            )
        ), [])
    );
}

export function getSequentialCytoscapeGraph(kerasGraph, prefix = '') {
    return [].concat(
        /**
         * Nodes
         */
        kerasGraph.config.map(
            (layer) => ({
                data: {
                    id: layer.config.name,
                    data: layer.config,
                    shape: layer.class_name === 'Convolution2D' ? 'roundrectangle' : 'ellipse'
                }
            })
        )
    ).concat(
        /**
         * Links
         */
        kerasGraph.config.reduce((linksData, layer) => (
            {
                links: linksData.links.concat(
                    linksData.lastNodeId
                    ? [
                        {
                            data: {
                                id: layer.config.name + '-' + linksData.lastNodeId,
                                source: linksData.lastNodeId,
                                target: layer.config.name
                            }
                        }
                    ] : []
                ),
                lastNodeId: layer.config.name
            }
        ), {
            links: [],
            lastNodeId: ''
        }).links
    );

}

function getSubgraphStart(subgraph) {
    return subgraph.class_name === 'Sequential'
        ? subgraph.name + '.' + subgraph.config[0].config.name : null;
}

function getSubgraphEnd(subgraph) {
    return subgraph.class_name === 'Sequential'
        ? subgraph.name + '.' + subgraph.config[subgraph.config.length - 1].config.name : null;
}

function isNodeSubgraph(layer) {
    return ['Sequential', 'Model'].indexOf(layer.class_name) !== -1;
}
