import requests

upload_url = "https://s3.eu-central-1.amazonaws.com/cyanite-file-storage/53176/3ec26828-072e-4a5d-a6c2-1729fc81ff92?Content-Type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEAGRZG3TDV5AMHQ%2F20230803%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230803T180754Z&X-Amz-Expires=900&X-Amz-Signature=30b57fcfae2fb0e9c763158f27c420ab1f66c6ba1151539e77e7a4f7355580fc&X-Amz-SignedHeaders=host"
file_name = "./SongSensei/backend/frog.mp3"

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
