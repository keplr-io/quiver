from __future__ import print_function

import json

import os
from os.path import abspath, dirname, join
import webbrowser

from flask import Flask, send_from_directory
from flask.json import jsonify
from flask_cors import CORS

from gevent.wsgi import WSGIServer

from quiver_engine.util import (
    load_img, safe_jsonnify, decode_predictions,
    get_input_config, get_evaluation_context,
    validate_launch
)

from quiver_engine.file_utils import list_img_files
from quiver_engine.vis_utils import save_layer_outputs


def get_app(model, classes, top, html_base_dir, temp_folder='./tmp', input_folder='./'):
    '''
    The base of the Flask application to be run
    :param model: the model to show
    :param classes: list of names of output classes to show in the GUI.
        if None passed - ImageNet classes will be used
    :param top: number of top predictions to show in the GUI
    :param html_base_dir: the directory for the HTML (usually inside the
        packages, quiverboard/dist must be a subdirectory)
    :param temp_folder: where the temporary image data should be saved
    :param input_folder: the image directory for the raw data
    :return:
    '''

    single_input_shape, input_channels = get_input_config(model)

    app = Flask(__name__)
    app.threaded = True
    CORS(app)

    '''
        Static Routes
    '''


    @app.route('/')
    def home():
        return send_from_directory(
            join(html_base_dir, 'quiverboard/dist'),
            'index.html'
        )

    @app.route('/<path>')
    def get_board_files(path):
        return send_from_directory(
            join(html_base_dir, 'quiverboard/dist'),
            path
        )

    @app.route('/temp-file/<path>')
    def get_temp_file(path):
        return send_from_directory(abspath(temp_folder), path)

    @app.route('/input-file/<path>')
    def get_input_file(path):
        return send_from_directory(abspath(input_folder), path)



    '''
        Computations
    '''

    @app.route('/model')
    def get_config():
        return jsonify(json.loads(model.to_json()))


    @app.route('/inputs')
    def get_inputs():
        return jsonify(list_img_files(input_folder))

    @app.route('/layer/<layer_name>/<input_path>')
    def get_layer_outputs(layer_name, input_path):
        return jsonify(
            save_layer_outputs(
                load_img(
                    join(abspath(input_folder), input_path),
                    single_input_shape,
                    grayscale=input_channels == 1
                ),
                model,
                layer_name,
                temp_folder,
                input_path
            )
        )

    @app.route('/predict/<input_path>')
    def get_prediction(input_path):
        with get_evaluation_context():
            return safe_jsonnify(
                decode_predictions(
                    model.predict(
                        load_img(
                            join(abspath(input_folder), input_path),
                            single_input_shape,
                            grayscale=(input_channels == 1)
                        )
                    ),
                    classes,
                    top
                )
            )

    return app


def run_app(app, port=5000):
    http_server = WSGIServer(('', port), app)
    webbrowser.open_new('http://localhost:' + str(port))
    http_server.serve_forever()

def launch(model, classes=None, top=5, temp_folder='./tmp', input_folder='./', port=5000, html_base_dir=None):
    os.system('mkdir -p %s' % temp_folder)

    html_base_dir = html_base_dir if html_base_dir is not None else dirname(abspath(__file__))

    validate_launch(html_base_dir)

    return run_app(
        get_app(
            model, classes, top,
            html_base_dir=html_base_dir,
            temp_folder=temp_folder,
            input_folder=input_folder
        ),
        port
    )
