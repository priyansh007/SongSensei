import requests
from requestupload import *
from uploadfile import *
from django.db import models

file_name = 'C:/Users/hgwg2/Desktop/SongSensei/backend/CynaiteDemo/frog.mp3'

data = send_graphql_request()
upload_url = data['uploadUrl']
id = data['id']

with open(file_name, "rb") as file:
    upload_file(upload_url, file)