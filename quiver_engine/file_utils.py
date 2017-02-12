from scipy.misc import imsave
from os.path import relpath, abspath
from quiver_engine.util import deprocess_image

def save_layer_img(layer_outputs, layer_name, idx, temp_folder, input_path):
    filename = get_output_filename(layer_name, idx, temp_folder, input_path)
    imsave(filename, deprocess_image(layer_outputs))
    return relpath(filename, abspath(temp_folder))

def get_output_filename(layer_name, z_idx, temp_folder, input_path):
    return '{}/{}_{}_{}.png'.format(temp_folder, layer_name, str(z_idx), input_path)
