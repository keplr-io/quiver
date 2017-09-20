from __future__ import absolute_import, division, print_function

'''
    From https://github.com/fchollet/deep-learning-models
'''

import json

from keras.utils.data_utils import get_file
from keras import backend as K
import numpy as np

CLASS_INDEX = None
CLASS_INDEX_PATH = 'https://s3.amazonaws.com/deep-learning-models/image-models/imagenet_class_index.json'
EPS = np.finfo(np.float32).eps


def preprocess_input(x, dim_ordering='default', mean=None, std=None):
    if dim_ordering == 'default':
        dim_ordering = K.image_dim_ordering()
    assert dim_ordering in {'tf', 'th'}

    if mean is not None:
        x = x - np.array(mean, dtype='float32')
    if std is not None:
        x = x / (np.array(std, dtype='float32') + EPS)

    if mean is None and std is None:
        if dim_ordering == 'th':
            x[:, 0, :, :] -= 103.939
            x[:, 1, :, :] -= 116.779
            x[:, 2, :, :] -= 123.68
            # 'RGB'->'BGR'
            x = x[:, ::-1, :, :]
        else:
            x[:, :, :, 0] -= 103.939
            x[:, :, :, 1] -= 116.779
            x[:, :, :, 2] -= 123.68
            # 'RGB'->'BGR'
            x = x[:, :, :, ::-1]
    return x


def decode_imagenet_predictions(preds, top=5):
    global CLASS_INDEX
    if len(preds.shape) != 2 or preds.shape[1] != 1000:
        raise ValueError('`decode_predictions` expects '
                         'a batch of predictions '
                         '(i.e. a 2D array of shape (samples, 1000)). '
                         'Found array with shape: ' + str(preds.shape))
    if CLASS_INDEX is None:
        fpath = get_file('imagenet_class_index.json',
                         CLASS_INDEX_PATH,
                         cache_subdir='models')
        CLASS_INDEX = json.load(open(fpath))
    results = []

    for pred in preds:
        top_indices = pred.argsort()[-top:][::-1]
        result = [tuple(CLASS_INDEX[str(i)]) + (pred[i],) for i in top_indices]
        results.append(result)
    return results
