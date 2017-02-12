import numpy as np
import keras.backend as K
from quiver_engine.util import get_evaluation_context
from quiver_engine.file_utils import save_layer_img
from quiver_engine.layer_result_generators import get_outputs_generator

def save_layer_outputs(input_img, model, layer_name, temp_folder, input_path):

    with get_evaluation_context():
        layer_outputs = get_outputs_generator(model, layer_name)(input_img)[0]

        if K.backend() == 'theano':
            #correct for channel location difference betwen TF and Theano
            layer_outputs = np.rollaxis(layer_outputs, 0, 3)

        return [
            save_layer_img(
                layer_outputs[:, :, channel],
                layer_name,
                channel,
                temp_folder,
                input_path
            )
            for channel in range(0, layer_outputs.shape[2])
        ]
