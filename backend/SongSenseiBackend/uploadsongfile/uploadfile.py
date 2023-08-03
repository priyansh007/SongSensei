import requests

# this function takes in the upload url and a binary field object
def upload_file(upload_url, file):
    #file_size = len(file)

    headers = {
        "Content-Type": "audio/mpeg",
        #"Content-Length": str(file_size),
    }


    response = requests.put(upload_url, data=file, headers=headers)

    if response.status_code == 200:
        print("Upload successful.")
    else:
        print(f"Upload failed with status code: {response.status_code}")
        print(response.text)
