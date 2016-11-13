import React, {Component, PropTypes} from 'react';
import './style.scss';
import ModelGraph from 'components/ModelGraph';

export default class Dashboard extends Component {

    static propTypes = {
        loadModel: PropTypes.func,
        loadLayerData: PropTypes.func,
        loadInputs: PropTypes.func,
        setCurrentLayer: PropTypes.func,
        setCurrentInput: PropTypes.func,

        model: PropTypes.object,
        layers: PropTypes.object,
        inputs: PropTypes.array,
        currentLayer: PropTypes.string,
        currentInput: PropTypes.string
    }

    componentWillMount() {
        this.props.loadModel();
        this.props.loadInputs();
        this.lastInput = null;
        this.lastLayer = null;
    }

    render() {
        if (!this.props.model) {
            return <div className='dash-message'>Loading model...</div>;
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
                        inputSrc => <div className={`input-container ${this.props.currentInput === inputSrc ? 'selected-input' : ''}`} key={inputSrc} onClick={() => this.props.setCurrentInput(inputSrc)}>
                            <img width={100} height={100} src={`${QUIVER_URL}/input-file/${inputSrc}`} />
                        </div>
                    )
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

                                        if (this.lastLayer !== this.props.currentLayer || this.lastInput !== this.props.currentInput) {
                                            this.props.loadLayerData(this.props.currentLayer, this.props.currentInput);
                                            this.lastLayer = this.props.currentLayer;
                                            this.lastInput = this.props.currentInput;
                                        }

                                        return (
                                            <div className='output-container'>{

                                                this.props.layers[this.props.currentLayer] ? this.props.layers[this.props.currentLayer].map(
                                                    layerImgSrc => (
                                                        <div key={layerImgSrc} className='layer-img-container'>
                                                            <img className='layer-img-img original-img' width={100} height={100} src={`${QUIVER_URL}/input-file/${this.props.currentInput}`} />
                                                            <img className='layer-img-img layer-output' key={layerImgSrc} width={100} height={100} src={`${QUIVER_URL}/temp-file/${layerImgSrc}`} />
                                                        </div>
                                                    )
                                                ) : <div className='dash-message'> 'No data for this layer' </div>

                                            }</div>
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
