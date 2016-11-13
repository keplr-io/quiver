import json
import numpy as np

from flask import Flask, request, send_from_directory
from flask.json import jsonify
from flask_cors import CORS

from keras.preprocessing import image
from keras.models import Model
from keras import backend as K

from imagenet_utils import preprocess_input
from os.path import abspath
from scipy.misc import imsave

# util function to convert a tensor into a valid image
def deprocess_image(x):
    # normalize tensor: center on 0., ensure std is 0.1
    x -= x.mean()
    x /= (x.std() + 1e-5)
    x *= 0.1

    # clip to [0, 1]
    x += 0.5
    x = np.clip(x, 0, 1)

    return x


def get_app(model, session, temp_folder='/tmp'):

    app = Flask(__name__)
    CORS(app)

    @app.route('/')
    def home():
        return 'quiver home'

    @app.route('/temp-file/<path>')
    def get_temp_file(path):
        print('lol')
        return send_from_directory(abspath(temp_folder), path)

    @app.route('/layer/<layer_name>', methods=['GET'])
    def get_model(layer_name):

        layer_model = Model(
            input=model.input,
            output=model.get_layer(layer_name).output
        )

        img_path = 'elephant.jpg'
        img = image.load_img(img_path, target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        with session as sess:
            layer_outputs = layer_model.predict(x)
            output_files = []

            for z in range(0, layer_outputs.shape[2]):

                img = layer_model.predict(x)[0][:, :, z]
                deprocessed = deprocess_image(img)
                filename = get_output_name(temp_folder, layer_name, z)
                output_files.append(filename)
                imsave(filename, deprocessed)

            return jsonify(output_files)


    return app

def get_output_name(temp_folder, layer_name, z_idx):
    return temp_folder + '/' + layer_name + '_' + str(z_idx) + '.png'