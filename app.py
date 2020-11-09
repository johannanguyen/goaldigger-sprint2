import os
from os.path import join, dirname
import flask
from flask import Flask, render_template
import flask_socketio
import flask_sqlalchemy
from dotenv import load_dotenv
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

import models

NUM_USERS = 0

EMIT_EXERCISE_NEWSFEED_CHANNEL = "homepage"
GOOGLE_INFO_RECEIVED_CHANNEL = "google info received"

def emit_newsfeed(channel, sid):
    all_ids = [
        DB_id.id
        for DB_id in db.session.query(models.Users).all()
    ]
    all_names = [
        DB_name.name
        for DB_name in db.session.query(models.Users).all()
    ]


    all_images = [
        DB_img_url.img_url
        for DB_img_url in db.session.query(models.Users).all()
    ]
    """
    all_goal_ids = [
        DB_id.id
        for DB_id in db.session.query(models.Goals).all()
    ]
    """
    all_categories = [
        DB_category.category
        for DB_category in db.session.query(models.Goals).all()
    ]
    
    all_user_primary_ids = [
        DB_user_primary_id.user_id
        for DB_user_primary_id in db.session.query(models.Goals).all()
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

    
    for db_users, db_goals in db.session.query(models.Users, models.Goals).filter(models.Users.id == models.Goals.user_id).order_by(models.Goals.date).all():
        all_ids.append(db_users.id)
        all_names.append(db_users.name)
        all_images.append(db_users.img_url)
        all_categories.append(db_goals.category)
        all_descriptions.append(db_goals.description)
        all_progress.append(db_goals.progress)
    
    server_socket.emit(
        channel,
        {
            "all_ids": all_ids,
            "all_names": all_names,
            "all_images": all_images,
            #"all_goal_ids": all_goal_ids,
            "all_categories": all_categories,
            "all_user_primary_ids": all_user_primary_ids,
            "all_descriptions": all_descriptions,
            "all_progress": all_progress,
            #"all_dates": all_dates,
            "all_post_texts": all_post_texts
        },
        sid,
    )

    print(all_ids, all_names, all_images)

def push_new_user_to_db(email, username, image, is_signed_in, id_token):
    db.session.add(models.Users(email, username, image, is_signed_in, id_token));
    db.session.commit();

@server_socket.on('new google user')
def on_new_google_user(data):
    print("Got an event for new google user input with data:", data)
    push_new_user_to_db(data['email'], data['username'], data['image'], data['is_signed_in'], data['id_token'])
    
def emit_google_info(channel):
        
    all_users = [{
        "username": user.name,
        "img_url": user.img_url    
        } for user in db.session.query(models.Users).all()]

    server_socket.emit(channel, {
        'allusers' : all_users
    })
    

@server_socket.on("connect")
def on_connect():
    emit_newsfeed(EMIT_EXERCISE_NEWSFEED_CHANNEL, request.sid)
    emit_google_info(GOOGLE_INFO_RECEIVED_CHANNEL)


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
