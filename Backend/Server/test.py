import requests
import os
api_token = os.getenv("CARAPI_API_TOKEN")
api_secret = os.getenv("CARAPI_API_SECRET")
# print(api_secret)
# Define the endpoint URL
login_url = "https://carapi.app/api/auth/login"
engine_data_url = "https://carapi.app/api/engines?limit=&sort=make_model_trim_id&direction=asc&verbose=yes"

# Prepare the request body for authentication
login_data = {
    "api_token": api_token,
    "api_secret": api_secret
}

# Authenticate and get the JWT token
response = requests.post(login_url, json=login_data)

# Check if the authentication was successful
if response.status_code == 200:
    jwt_token = response.text.strip()  # Extract the JWT token
    headers = {
        "Authorization": f"Bearer {jwt_token}",
        "Accept": "application/json"
    }
    # print(jwt_token)
    # Make a request to fetch engine data
    params = {
        "make": "Volkswagen",
        "model": "GTI",
        "year": "2019",
        "id": 1
    }
    engine_response = requests.get(engine_data_url, params=params, headers=headers)

    # Check if the request was successful
    if engine_response.status_code == 200:
        engine_data = engine_response.json()
        print("Engine data:", engine_data['data'])
    else:
        print("Failed to fetch engine data:", engine_response.status_code, "-", engine_response.text)
else:
    print("Failed to authenticate:", response.status_code, "-", response.text)