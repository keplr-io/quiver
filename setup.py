from setuptools import setup, find_packages

setup(
    name='quiver_engine',
    version="0.1.2",
    author="Jake Bian",
    author_email="jake@keplr.io",
    description=("Interactive per-layer visualization for convents in keras"),
    license='mit',
    packages=find_packages(),
    package_data={'': ['quiverboard/dist/**/*']},
    include_package_data=True,
    install_requires=[
        'keras',
        'flask',
        'flask_cors',
        'gevent',
        'numpy',
        'pillow'
    ]
)
