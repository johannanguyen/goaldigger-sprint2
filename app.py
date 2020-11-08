import os
from os.path import join, dirname
import flask
from flask import Flask, render_template
import flask_socketio
import flask_sqlalchemy
from dotenv import load_dotenv
import models
import requests
from flask import request


app = Flask(__name__)
server_socket = flask_socketio.SocketIO(app)
server_socket.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), "sql.env")
load_dotenv(dotenv_path)
database_uri = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_DATABASE_URI"] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app

db.create_all()
db.session.commit()

NUM_USERS = 0

EMIT_EXERCISE_NEWSFEED_CHANNEL = "exercise"

def emit_newsfeed(channel, sid):
    all_ids = [
        DB_id.id
        for DB_id in db.session.query(models.Users).all()
    ]
    all_names = [
        DB_name.name
        for DB_name in db.session.query(models.Users).all()
    ]

    all_emails = [
        DB_email.email 
        for DB_email in db.session.query(models.Users).all()
    ]
    
    all_images = [
        DB_img_url.img_url
        for DB_img_url in db.session.query(models.Users).all()
    ]
        
    all_bios = [
        DB_bio.bio
        for DB_bio in db.session.query(models.Users).all()
    ]
    
    all_goal_ids = [
        DB_id.id
        for DB_id in db.session.query(models.Goals).all()
    ]
    
    all_categories = [
        DB_category.category
        for DB_category in db.session.query(models.Goals).all()
    ]
    
    all_user_primary_ids = [
        DB_user_primary_id.user_id
        for DB_user_primary_id in db.session.query(models.Goals).all()
    ]

    all_goal_ids = [
        DB_id.id
        for DB_id in db.session.query(models.Goals).all()
    ]
    
    all_descriptions = [
        DB_description.description
        for DB_description in db.session.query(models.Goals).all()
    ]
    
    all_progress = [
        DB_progress.progress
        for DB_progress in db.session.query(models.Goals).all()
    ]
    
    # all_dates = [
    #     DB_date.date
    #     for DB_date in db.session.query(models.Goals).all()
    # ]
    
    all_post_texts = [
        DB_post_text.post_text
        for DB_post_text in db.session.query(models.Goals).all()
    ]
    
    server_socket.emit(
        channel,
        {
            "all_ids": all_ids,
            "all_names": all_names,
            "all_emails": all_emails,
            "all_images": all_images,
            "all_bios": all_bios,
            "all_goal_ids": all_goal_ids,
            "all_categories": all_categories,
            "all_user_primary_ids": all_user_primary_ids,
            "all_descriptions": all_descriptions,
            "all_progress": all_progress,
            #"all_dates": all_dates,
            "all_post_texts": all_post_texts
        },
        sid,
    )

    print(all_ids, all_names, all_emails, all_images, all_bios)
    

@server_socket.on("connect")
def on_connect():
    emit_newsfeed(EMIT_EXERCISE_NEWSFEED_CHANNEL, request.sid)


@app.route("/", methods=["GET", "POST"])
def hello():
    """ Runs the app!!!"""
    return flask.render_template("index.html")


if __name__ == "__main__":
    server_socket.run(
        app,
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8080)),
        debug=True,
    )
