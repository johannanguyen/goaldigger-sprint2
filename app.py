import os
from os.path import join, dirname
import flask
from flask import Flask, render_template
import flask_socketio
import flask_sqlalchemy
from dotenv import load_dotenv
import requests
from flask import request
from datetime import datetime

#MAYBE WE DON'T NEED THESE TWO LINES.
from engineio.payload import Payload
Payload.max_decode_packets = 50



app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
server_socket = flask_socketio.SocketIO(app)
server_socket.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), "sql.env")
load_dotenv(dotenv_path)
database_uri = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_DATABASE_URI"] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app

import models

db.create_all()
db.session.commit()




EMIT_EXERCISE_NEWSFEED_CHANNEL = "homepage"
GOOGLE_INFO_RECEIVED_CHANNEL = "google info received"
GROUP_PAGE_REQUEST = "group feed"

def emit_newsfeed(channel, sid):
    all_goals = [
        {
            "user_id": db_users.id,
            "username": db_users.name,
            "img_url": db_users.img_url,
            "category": db_goals.category,
            "description": db_goals.description,
            "progress": db_goals.progress,
            "post_text": db_goals.post_text
        }
        for db_users, db_goals in\
        db.session.query(models.Users, models.Goals)\
        .filter(models.Users.id == models.Goals.user_id)\
        .order_by(models.Goals.date).all()
    ]
    print("running emit_newsfeed")
    server_socket.emit(channel, all_goals, sid)

def emit_group_feed(channel, groupName, sid):
    
    groupObject = models.Groups.query.filter_by(name=groupName).first()
    if groupObject:
        group_info = {
            "group_description": groupObject.description,
            "sidebar_text": groupObject.sidebar_text,
            "name": groupObject.name,
            "groupId": groupObject.id
        }
        
        group_goals = [
            {
                "description": db_goals.description,
                "progress": db_goals.progress,
                "username": db_users.name,
                "img_url": db_users.img_url,
                "category": db_goals.category,
                "post_text": db_goals.post_text,
            }
            for db_users, db_goals, db_groups_users in\
            db.session.query(models.Users, models.Goals, models.GroupsUsers)\
            .filter(models.GroupsUsers.group_id == groupObject.id)\
            .filter(models.Users.id == models.GroupsUsers.user_id)\
            .filter(models.Goals.user_id == models.GroupsUsers.user_id)\
            .order_by(models.Goals.date).all()
        ]
        server_socket.emit(channel, {"group_info": group_info, "group_goals": group_goals} , sid)
    else:
        server_socket.emit(channel, None , sid)

def emit_category(channel, sid):
    category_goals = [
        {
            "user_id": db_users.id,
            "username": db_users.name,
            "img_url": db_users.img_url,
            "category": db_goals.category,
            "description": db_goals.description,
            "progress": db_goals.progress,
            "post_text": db_goals.post_text
        }
        for db_users, db_goals in\
        db.session.query(models.Users, models.Goals)\
        .filter(models.Users.id == models.Goals.user_id)\
        .filter(models.Goals.category == channel)\
        .order_by(models.Goals.date).all()
    ]
    
    server_socket.emit(channel, category_goals, sid)


def push_new_user_to_db(email, username, image, is_signed_in, id_token):
    db.session.add(models.Users(email, username, image, is_signed_in, id_token));
    db.session.commit();


@server_socket.on('group page')
def send_group_info(data):
    #print(data["groupName"])
    emit_group_feed(GROUP_PAGE_REQUEST, data["groupName"], request.sid)

@server_socket.on('google login')
def on_new_google_user(data):
    # Grabs all of the users CURRENTLY in the database
    # Grabs the new google login email and checks to see if it is in the list of emails
    #     If it is not, it will add that user to the database
    # The email array will have to be repopulated (to account for newly added user)
    # primary_id is determined by taking the index of where the email is located in the email array + 1
    #     example:
    #         all_emails = [johanna@gmail.com, joey@gmail.com]
    #         johanna's primary id = 0 + 1 = 1
    # Grabs all the goals and progress in the database relating to the primary id
    # Emits username and image to client
    # Emits the goals and progress
    
    user = db.session.query(models.Users).filter_by(email=data["email"]).first()

    if (not user):
        push_new_user_to_db(data['email'], data['username'], data['image'], "Null", data['id_token'])

    user = db.session.query(models.Users).filter_by(email=data["email"]).first()

    personal_profile = {
        "username": data["username"],
        "image": data["image"],
        "user_id": user.id
    }

    personal_goals = [
        {
            "description": personal_goal.description,
            "progress": personal_goal.progress
        }
        for personal_goal in models.Goals.query.filter(models.Goals.user_id == user.id).all()
    ]
    server_socket.emit("google info received", personal_profile, request.sid)
    server_socket.emit("user goals", personal_goals, request.sid)



@server_socket.on('add_goal')
def add_goal(data):
    category = data["category"]
    user_id = data["users"]["primary_id"]
    description = data["goal"]
    progress = data["progress"]
    post_text = data["postText"]

    server_socket.emit("add_goal", data, request.sid)

    db.session.add(models.Goals(user_id, category, description, progress, post_text))
    db.session.commit()



def emit_google_info(channel):
    all_users = [{
        "username": user.name,
        "img_url": user.img_url,
        "user_id": user.id
        } for user in db.session.query(models.Users).all()]

    server_socket.emit(channel, {
        'allusers' : all_users
    })



@server_socket.on("connect")
def on_connect():
    emit_category("Work", request.sid)
    emit_category("School", request.sid)
    emit_category("Exercise", request.sid)
    emit_category("Food", request.sid)
    emit_category("Art", request.sid)
    emit_category("Lifestyle", request.sid)
    emit_category("Finance", request.sid)
    emit_category("Misc", request.sid)
    emit_newsfeed(EMIT_EXERCISE_NEWSFEED_CHANNEL, request.sid)
    #emit_google_info(GOOGLE_INFO_RECEIVED_CHANNEL)

        
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path[-4:] == ".png":
        try:
            return flask.send_from_directory('./', path)
        except:
            return "File not found", 404
    return render_template("index.html")


if __name__ == "__main__":
    server_socket.run(
        app,
        host=os.getenv("IP", "0.0.0.0"),
        port=int(os.getenv("PORT", 8080)),
        debug=True,
    )