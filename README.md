# Quiver: Interactive convnet features visualization for Keras

**Installation**

```bash
    pip install quiver_engine
```

**Usage**

Take your keras `model`, launching Quiver is a one-liner.

```python
    from quiver_engine import server
    server.launch(model)
```

This will launch the visualization at `localhost:5000`

**Options**

```python
    server.launch(
        model, # a Keras Model

        # where to store temporary files generatedby quiver (e.g. image files of layers)
        temp_folder='./tmp',

        # a folder where input images are stored
        input_folder='./',

        # the localhost port the dashboard is to be served on
        port=5000
    )
```



**Credits**
This is essentially an implementation of the ideas of [deepvis](https://github.com/yosinski/deep-visualization-toolbox) and related works.
