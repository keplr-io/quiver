import React from 'react';

import cytoscape from 'cytoscape';
import cydagre from 'cytoscape-dagre';
import dagre from 'dagre';
import { computeCytoscapeGraph } from './util';
import './style.scss';

export default class ModelGraph extends React.Component {

    static propTypes = {
        modelConfig: React.PropTypes.object,
        selectNode: React.PropTypes.func
    }

    componentDidMount() {

        cydagre(cytoscape, dagre);

        const cyGraph = cytoscape({
            container: this.refs.graphvisContainer,
            elements: computeCytoscapeGraph(this.props.modelConfig),
            layout: {
                name: 'dagre',
                rankDir: 'TD'
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'content': 'data(id)',
                        'text-opacity': 0.5,
                        'text-valign': 'bottom',
                        'text-halign': 'center',
                        'text-margin-y': 15,
                        'cursor': 'pointer'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 4,
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ]
        });

        cyGraph.nodes()
            .on('select', (clickEvt) => this.props.selectNode(clickEvt.cyTarget._private.data.data.name))
            .on(
                'unselect', (clickEvt) => clickEvt
                // TODO: do stuff here
            );

    }

    render() {
        return (
            <div className='model-graph-container'>
                <div ref='graphvisContainer' className='graph-vis-container'></div>
            </div>

        );
    }

}
