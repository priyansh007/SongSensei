import requests

from retrievesimilarsongs.librarysimilarsongs import *
from requestupload import *
from uploadfile import *
from createlibrarytrack import *
from django.db import models

from django.core.serializers.json import DjangoJSONEncoder
import json


file_path = 'C:/Users/hgwg2/Desktop/SongSensei/backend/CynaiteDemo/tune.mp3'
str = 'newtune'
file_name = json.dumps(str, cls=DjangoJSONEncoder)
# models.CharField(max_length=len(str), default=str)

data = request_upload()
upload_url = data['uploadUrl']
id = data['id']
print(id)

with open(file_path, "rb") as file:
    upload_file(upload_url, file)

track_id = create_library_track(id, file_name)

similar_songs = request_similar_from_library(track_id)