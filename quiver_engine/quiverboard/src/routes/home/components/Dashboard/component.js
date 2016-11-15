import React, {Component, PropTypes} from 'react';
import './style.scss';
import ModelGraph from 'components/ModelGraph';
import Loader from 'halogen/RotateLoader';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';

export default class Dashboard extends Component {

    static propTypes = {
        loadModel: PropTypes.func,
        loadLayerData: PropTypes.func,
        loadInputs: PropTypes.func,
        setCurrentLayer: PropTypes.func,
        setCurrentInput: PropTypes.func,
        setIsLayerInfoCollapsed: PropTypes.func,
        loadPredictions: PropTypes.func,

        model: PropTypes.object,
        layers: PropTypes.object,
        inputs: PropTypes.array,
        predictions: PropTypes.array,
        currentLayer: PropTypes.string,
        currentInput: PropTypes.string,
        isLayerLoading: PropTypes.bool,
        layerInfoIsCollpased: PropTypes.bool
    }

    componentWillMount() {
        this.props.loadModel();
        this.props.loadInputs();
        this.lastInput = null;
        this.lastLayer = null;
    }

    render() {
        if (!this.props.model) {
            return <div className='dash-loader'>
                <Loader color='rgba(0, 0, 0, 0.3)' size='20px'></Loader>
            </div>;
        }

        return (
            <div>

                <div className='graph-container'>
                    <ModelGraph modelConfig={this.props.model} selectNode={
                        (layerName) => {
                            this.props.setCurrentLayer(layerName);
                        }
                    } />
                </div>

                <div className='experiment-container'>
                    <div className='inputs-container'>{
                        this.props.inputs.map(
                            inputSrc => <div className={
                                `input-container ${this.props.currentInput === inputSrc ? 'selected-input' : ''}`
                            } key={inputSrc} onClick={() => this.props.setCurrentInput(inputSrc)}>
                                <img width={100} height={100} src={`${QUIVER_URL}/input-file/${inputSrc}`} />
                            </div>
                        )
                    }</div>

                    <div className='predictions-container'>{
                        this.props.predictions.map(prediction => (
                            <div className='prediction-container'>{prediction[1].split('_').join(' ')} <span className='confidence'>({
                                Math.round(prediction[2] * 1000000)/10000}%</span>)</div>
                        ))
                    }</div>


                    {
                        (() => {

                            if (!this.props.currentInput) {
                                return <div className='dash-message'>Select an input image.</div>;
                            }

                            return (
                                <div>

                                    {
                                        (() => {
                                            if (!this.props.currentLayer) {
                                                return <div className='dash-message'> Select a layer. </div>;
                                            }

                                            if (this.lastInput !== this.props.currentInput) {
                                                this.props.loadPredictions(this.props.currentInput);
                                            }

                                            if (this.lastLayer !== this.props.currentLayer || this.lastInput !== this.props.currentInput) {
                                                this.props.loadLayerData(this.props.currentLayer, this.props.currentInput);
                                                this.lastLayer = this.props.currentLayer;
                                                this.lastInput = this.props.currentInput;
                                            }

                                            let layerConfig = (
                                                this.props.model.class_name === 'Sequential'
                                                    ? this.props.model.config
                                                    : this.props.model.config.layers
                                            ).filter(
                                                layer => (
                                                    this.props.model.class_name === 'Sequential' ?
                                                    layer.config.name : layer.name
                                                )=== this.props.currentLayer
                                            )[0];

                                            return (
                                                <div className='layer-container'>
                                                    <div className='layer-info-container'>
                                                        <div className='layer-name'>
                                                            <span>{layerConfig.name} </span>
                                                            <span>({layerConfig.class_name})</span>
                                                            <span onClick={() => this.props.setIsLayerInfoCollapsed(!this.props.layerInfoIsCollpased)}
                                                                className='collapse-expand-btn'>{
                                                                this.props.layerInfoIsCollpased ? '+' : '-'
                                                            }</span>
                                                        </div>
                                                        {
                                                            this.props.layerInfoIsCollpased ? <span /> : <div className='layer-config'>
                                                                <SyntaxHighlighter language='json' style={github}>
                                                                {JSON.stringify(layerConfig.config, null, 4)}
                                                                </SyntaxHighlighter>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className='output-container'>{

                                                        this.props.layers[this.props.currentLayer] ? this.props.layers[this.props.currentLayer].map(
                                                            layerImgSrc => (
                                                                <div key={layerImgSrc} className='layer-img-container' style={{
                                                                    width: 100,
                                                                    height: 100
                                                                }}>
                                                                    <img className='layer-img-img original-img'
                                                                        src={`${QUIVER_URL}/input-file/${this.props.currentInput}`} />
                                                                    <img className='layer-img-img layer-output'
                                                                        key={layerImgSrc}
                                                                        src={`${QUIVER_URL}/temp-file/${layerImgSrc}`}
                                                                    />
                                                                </div>
                                                            )
                                                        ) : (
                                                            this.props.isLayerLoading ? <div className='dash-loader'>
                                                                <Loader color='rgba(0, 0, 0, 0.3)' size='20px'></Loader>
                                                            </div> : <div className='dash-message'>
                                                                No data for this layer
                                                            </div>
                                                        )

                                                    }</div>
                                                </div>
                                            );
                                        })()
                                    }

                                </div>
                            );

                        })()
                    }
                </div>
            </div>
        );
    }
};
