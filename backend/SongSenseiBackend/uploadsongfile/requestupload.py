import requests
import os
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
CYANITE_API_KEY = os.environ.get('CYANITE_ACCESS_TOKEN')

#returns json response data in a dictionary
def request_upload():
    url = "https://api.cyanite.ai/graphql"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + CYANITE_API_KEY
    }

    # Define the GraphQL mutation
    mutation = """
        mutation FileUploadRequestMutation {
            fileUploadRequest {
                id
                uploadUrl
            }
        }
    """

    # Create the request payload as a JSON string
    payload = {"query": mutation}

    # Send the POST request
    response = requests.post(url, json=payload, headers=headers)

    # Check the response status code
    if response.status_code == 200:
        # Parse the response JSON data
        data = response.json()
        print(data)
        return data['data']['fileUploadRequest'] # returns a dictionary with 'id' and 'uploadUrl'
    else:
        print("Failed to send the GraphQL request. Status code:", response.status_code)
        return 'Failed to send the GraphQL request.'


#{'data': 
# {'fileUploadRequest': 
#  {'id': 'NTMxODAvNzM1YzUyNTEtYjY3NC00NzJiLTk4Y2EtOTcxNTZmNjRhYWEz', 
#   'uploadUrl': 'https://s3.eu-central-1.amazonaws.com/cyanite-file-storage/53180/735c5251-b674-472b-98ca-97156f64aaa3?Content-Type=audio%2Fmpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEAGRZG3TDV5AMHQ%2F20230803%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230803T202637Z&X-Amz-Expires=900&X-Amz-Signature=be62707d8c3472eeb8114d33e78f411ddcded58c096cb1c470d66d651dde42b2&X-Amz-SignedHeaders=host'
#   }
# }
#}
