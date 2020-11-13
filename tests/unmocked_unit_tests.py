import unittest
import unittest.mock as mock
import datetime
import os
from os.path import join, dirname
import sys
sys.path.append(join(dirname(__file__), "../"))
import models

#run commands
#coverage run -m --source=. unittest tests/*.py
#coverage html

KEY_INPUT="input"
KEY_EXPECTED="expected"
KEY_EMAIL="email"
KEY_NAME="name"
KEY_IMG_URL="image url"
KEY_GOOGLE_ID="google_id"
KEY_IS_SIGNED_IN="true or false"
KEY_USER_ID="integer user id"
KEY_CATEGORY="category"
KEY_DESCRIPTION="goal description"
KEY_PROGRESS="goal progress"
KEY_POST_TEXT="post text"


class user_Init(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 
                    {
                        KEY_EMAIL: "cris@gmail.com",
                        KEY_NAME: "cris",
                        KEY_IMG_URL: "img_url.com.png",
                        KEY_GOOGLE_ID: "1a2b3c4d5e6f",
                        KEY_IS_SIGNED_IN: "true"
                    }
                ,
                KEY_EXPECTED: ""
            },
        ]
        
    def test_user_init(self):
        for testcase in self.success_test_params:
            obj = testcase[KEY_INPUT]
            models.Users(obj[KEY_EMAIL], obj[KEY_NAME], obj[KEY_IMG_URL], obj[KEY_IS_SIGNED_IN], obj[KEY_GOOGLE_ID])

class goal_Init(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 
                    {
                        KEY_USER_ID:"1",
                        KEY_CATEGORY: "Exercise",
                        KEY_DESCRIPTION: "Press bench 100 pounds",
                        KEY_PROGRESS: "Started",
                        KEY_POST_TEXT: "Excited to start this goal",
                    }
                ,
                KEY_EXPECTED: ""
            },
        ]
        
    def test_user_init(self):
        for testcase in self.success_test_params:
            obj = testcase[KEY_INPUT]
            models.Goals(obj[KEY_USER_ID], obj[KEY_CATEGORY], obj[KEY_DESCRIPTION], obj[KEY_PROGRESS], obj[KEY_POST_TEXT])
