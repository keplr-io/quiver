import React, {Component, PropTypes} from 'react';
import './style.scss';

export default class Dashboard extends Component {

    static propTypes = {
        loadModel: PropTypes.func,
        loadLayerData: PropTypes.func,
        currentLayer: PropTypes.string,
        setCurrentLayer: PropTypes.func,
        model: PropTypes.object,
        layers: PropTypes.object
    }

    componentWillMount() {
        this.props.loadModel();
    }

    render() {
        if (!this.props.model) {
            return <div>Loading model...</div>;
        }

        return (
            <div>
                <div>{
                    this.props.model.config.layers.map(
                        layer => (
                            <div key={layer.name}
                                onClick={
                                    () => {
                                        this.props.loadLayerData(layer.name, 'elephant.jpg')
                                        this.props.setCurrentLayer(layer.name)
                                    }
                                }
                                className='btn btn-default'>
                                {layer.name} ({layer.class_name})
                            </div>
                        )
                    )

                }</div>
                <div>{
                    this.props.currentLayer ? (
                        this.props.layers[this.props.currentLayer] ? this.props.layers[this.props.currentLayer].map(
                            (layerImgSrc, idx) => (
                                <img key={idx} src={`${QUIVER_URL}/temp-file/${layerImgSrc}`}/>
                            )
                        ) : 'No data for this layer'
                    ): 'Select a layer'
                }</div>
            </div>
        );
    }
};
