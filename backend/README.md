Run these when changing or modifying models: 
    python manage.py makemigrations
    python manage.py migrate 

Make a ".env" file in "SongSenseiBackend"
Put these variables into the ".env" file:
    CYANITE_ACCESS_TOKEN = [your access token]
    DJANGO_SECRET_KEY = [your django secret key]

Install Requirements:
    pip install -r Requirements.txt

To create and activate the virtual environment, run:
    python -m venv SongSenseiVirtualEnv
    SongSenseiVirtualEnv\Scripts\activate.bat

In the same level as manage.py:
    Register a user with python manage.py createsuperuser
    Run backend server with python manage.py runserver