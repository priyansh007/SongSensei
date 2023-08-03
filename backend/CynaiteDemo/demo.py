import requests

def send_graphql_request():
    url = "https://api.cyanite.ai/graphql"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjo2NDgsInVzZXJJZCI6NTMxNzYsImFjY2Vzc1Rva2VuU2VjcmV0IjoiMzY4N2JiNGM4ODY5YzgyZGJkYTg5MmQ3YjM4MWFiMGU1NzQ2ZThjZWM1ZWFlZGI0NjEwYzQ5OGM2ZDkzNjk4NSIsImlhdCI6MTY5MTA4NTgzOX0.KrrPDaFEqBHw2JdiRKzqfizd10hclhF9v1oKEOjW5Xw"
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
