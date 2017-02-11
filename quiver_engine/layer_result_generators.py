from keras.models import Model


def get_outputs_generator(model, layer_name):
    return Model(
        input=model.input,
        output=model.get_layer(layer_name).output
    ).predict
