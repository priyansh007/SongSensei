# Instruction to run Backend

- To create and activate the virtual environment, run:
    - `python -m venv SongSenseiVirtualEnv`
    - windows - `SongSenseiVirtualEnv\Scripts\activate.bat`
    - mac - `source SongSenseiVirtualEnv/bin/activate`

- Install Requirements:
    - `pip install -r Requirements.txt`

- Make a ".env" file in "SongSenseiBackend" Put these variables into the ".env" file:
    - `CYANITE_ACCESS_TOKEN = [You can get token from https://app.cyanite.ai/library]`
    - `DJANGO_SECRET_KEY = 'django-insecure-)ngq+m#lxw@6j6ck3%26#p5f9ao8wh)eza67pc2joc0s1sgh'`
    - `CLIENT_ID='Client ID from spotify developer account'`
    - `CLIENT_SECRET='Client Secret from spotify developer account'`
    - `REDIRECT_URI='http://localhost:3000/search'`

# Instruction to run Django project

- Go inside SongSenseiBackend folder
    - `cd SongSenseiBackend`

- Run these when changing or modifying models: 
    - `python manage.py makemigrations`
    - `python manage.py migrate`

- In the same level as manage.py:
    - Register a user with `python manage.py createsuperuser`
    - Run backend server with `python manage.py runserver`
