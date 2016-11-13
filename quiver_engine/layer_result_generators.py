from keras.models import Model

def get_outputs_generator(model, layer_name):
    layer_model = Model(
        input=model.input,
        output=model.get_layer(layer_name).output
    )

    return layer_model.predict
