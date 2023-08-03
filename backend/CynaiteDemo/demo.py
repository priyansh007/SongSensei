import requests

CYANITE_API_KEY = 'nothing'

def send_graphql_request():
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
        print("Response Data:", data)
    else:
        print("Failed to send the GraphQL request. Status code:", response.status_code)

# Call the function to send the GraphQL request
send_graphql_request()
