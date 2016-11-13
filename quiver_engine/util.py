import numpy as np
from keras.preprocessing import image
from imagenet_utils import preprocess_input

'''
    From:
    https://blog.keras.io/how-convolutional-neural-networks-see-the-world.html
'''

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

def load_img(input_path, target_shape):
    img = image.load_img(input_path, target_size=target_shape)

    return preprocess_input(
        np.expand_dims(
            image.img_to_array(img),
            axis=0
        )
    )
