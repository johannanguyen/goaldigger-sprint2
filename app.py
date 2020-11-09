import os
import flask
from flask import Flask, render_template
import flask_socketio
import flask_sqlalchemy


app = Flask(__name__)
server_socket = flask_socketio.SocketIO(app)
server_socket.init_app(app, cors_allowed_origins="*")


@app.route("/", methods=["GET", "POST"])
def index():
    """ Runs the app!!!"""
    return flask.render_template("index.html")


@app.route('/second', methods=["GET", "POST"])
def second():
    return flask.render_template("second.html")
    
@app.route('/main', methods=["GET", "POST"])
def main():
    return flask.render_template("main.html")


if __name__ == "__main__":
    server_socket.run(
        app,
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8080)),
        debug=True,
    )
