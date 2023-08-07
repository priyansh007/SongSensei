import requests

upload_url = "PUTURLHERE"
file_name = "PUTMP3HERE"

def main():
    with open(file_name, "rb") as file:
        file_size = len(file.read())

    headers = {
        "Content-Type": "audio/mpeg",
        "Content-Length": str(file_size),
    }

    with open(file_name, "rb") as file:
        response = requests.put(upload_url, data=file, headers=headers)

    print(response.text)

if __name__ == "__main__":
    main()
