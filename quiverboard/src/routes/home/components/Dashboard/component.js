import React, {Component, PropTypes} from 'react';
import './style.scss';
import ModelGraph from 'components/ModelGraph';

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
                <div className='col-md-3'>
                    <ModelGraph modelConfig={this.props.model} selectNode={
                        (layerName) => {
                            this.props.loadLayerData(layerName, 'elephant.jpg')
                            this.props.setCurrentLayer(layerName)
                        }
                    } />
                </div>
                <div className='col-md-9'>{
                    this.props.currentLayer ? (
                        this.props.layers[this.props.currentLayer] ? this.props.layers[this.props.currentLayer].map(
                            (layerImgSrc, idx) => (
                                <img key={idx} width={100} height={100} src={`${QUIVER_URL}/temp-file/${layerImgSrc}`}/>
                            )
                        ) : 'No data for this layer'
                    ) : 'Select a layer'
                }</div>
            </div>
        );
    }
};
