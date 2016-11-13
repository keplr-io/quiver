import tornado.web

def get_app():
    class RootHandler(tornado.web.RequestHandler):
        def get(self):
            self.write('hola')

    def make_app():
        return tornado.web.Application([
            (r"/", RootHandler),
        ])
    return make_app()


def run_app(app):
    app.listen(5000)
    tornado.ioloop.IOLoop.current().start()

def launch(model, temp_folder, port):
    run_app(get_app())