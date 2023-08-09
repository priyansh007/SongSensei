# How to run Spotify API backend:

- Navigate to the folder "Spotify API Backend"
    - Run "node index.js"

- Make a ".env" file in "Spotify API Backend" Put these variables into the ".env" file:
    - CLIENT_ID= [Spotify API client id]
    - CLIENT_SECRET= [Spotify API client secret]
    - REDIRECT_URI= http://localhost:3000/search

# How to get Spotify Client id and secret:

1. Log in to Spotify’s Developer Dashboard
Simply head to the Spotify Developer Dashboard and click the “Login” button on the bottom of the screen (just use your normal Spotify login).

2. Create an App
Select the “Create an App” button and provide a brief name and app description. You will also need to carefully read and accept the Spotify Developer Terms of Service.
    - Add redirect URIs to the app

3. Copy Client ID & Client Secret
Once your app is created, you should see the Client ID and Client Secret. Simply copy these values into a secure location like a password manager, so you don’t need to keep logging in to the Spotify Developer Dashboard.