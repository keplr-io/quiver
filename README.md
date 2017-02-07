# Quiver
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/quiverEngine/Lobby)

Interactive convnet features visualization for Keras


![gzqll3](https://cloud.githubusercontent.com/assets/5866348/20253975/f3d56f14-a9e4-11e6-9693-9873a18df5d3.gif)




**The quiver workflow**

[Video Demo](https://www.youtube.com/watch?edit=vd&v=tgRW3BRi_FA)

1. Build your model in keras

    ```python
    model = Model(...)
    ```
2. Launch the visualization dashboard with 1 line of code

    ```python
    quiver_engine.server.launch(model, classes=['cat','dog'], input_folder='./imgs')
    ```
3. Explore layer activations on all the different images in your input folder.


## Quickstart

**Installation**

```bash
    pip install quiver_engine
```

If you want the latest version from the repo

```bash
    pip install git+git://github.com/keplr-io/quiver.git
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

        classes, # list of output classes from the model to present (if not specified 1000 ImageNet classes will be used)

        top, # number of top predictions to show in the gui (default 5)

        # where to store temporary files generatedby quiver (e.g. image files of layers)
        temp_folder='./tmp',

        # a folder where input images are stored
        input_folder='./',

        # the localhost port the dashboard is to be served on
        port=5000
    )
```

## Development

**Building from master**

Check out this repository and run

```bash
cd quiver_engine
python setup.py develop
```

**Building the Client**

```bash
    cd quiverboard
    npm install
    export QUIVER_URL=localhost:5000 # or whatever you set your port to be
    npm start
```

Note this will run your web application with webpack and hot reloading. If you don't care about that, or are only in this section because pip install somehow failed for you, you should tell it to simply build the javascript files instead

```
    npm run deploy:prod
```


## Credits

- This is essentially an implementation of some ideas of [deepvis](https://github.com/yosinski/deep-visualization-toolbox) and related works.
- A lot of the pre/pos/de processing code was taken from [here](https://github.com/fchollet/deep-learning-models) and other writings of [fchollet](https://github.com/fchollet).
- The dashboard makes use of [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)

## Citing Quiver

```
misc{bianquiver,
  title={Quiver},
  author={Bian, Jake},
  year={2016},
  publisher={GitHub},
  howpublished={\url{https://github.com/keplr-io/quiver}},
}
```


