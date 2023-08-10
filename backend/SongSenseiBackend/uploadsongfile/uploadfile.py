import requests
import os

# this function takes in the upload url and a binary field object
def upload_file(upload_url, file):
    #file_size = len(file)

    headers = {
        "Content-Type": "audio/mpeg",
        #"Content-Length": str(file_size),
    }

    # open file in a "with" so that it closes afterwards (for deletion)
    with open(file.path, 'rb') as file_handle:

        response = requests.put(upload_url, data=file_handle, headers=headers)

        if response.status_code == 200:
            print("Upload successful.")
        else:
            print(f"Upload failed with status code: {response.status_code}")
            print(response.text)
    
    os.remove(file.path)
