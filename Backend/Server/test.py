import requests
import os

Wheel_api_key = os.getenv("WHEELAPI_KEY")

def get_wheel_options(make, model, year, region, api_key):
    url = f"https://api.wheel-size.com/v2/search/by_model/?make={make}&model={model}&year={year}&region={region}&user_key={api_key}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        print(f"Failed to fetch wheel options. Status code: {response.status_code}")
        return None

# Example usage
make = "Nissan"
model = "juke"
year = "2011"
region = "usdm"
api_key = "975e3f1046075739c78fefe34d46c9e6"

wheel_options = get_wheel_options(make, model, year, region, api_key)
if wheel_options:
    print("Technical information and wheels:")
    for item in wheel_options["data"]:
        print("Trim:", item["name"])
        print("Technical:")
        print(item["technical"])
        print("Wheels:")
        for wheel in item["wheels"]:
            print(wheel)
        print()




# For CAR API
api_token = os.getenv("CARAPI_API_TOKEN")
api_secret = os.getenv("CARAPI_API_SECRET")

# Define the endpoint URL
login_url = "https://carapi.app/api/auth/login"
bodies_url = "https://carapi.app/api/bodies"

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
    
    # Make a request to fetch bodies data
    params = {
        "year": "2019",
        "make": "Volkswagen",
        "model": "GTI",
        "id": 1
    }
    bodies_response = requests.get(bodies_url, params=params, headers=headers)

    # Check if the request was successful
    if bodies_response.status_code == 200:
        bodies_data = bodies_response.json()
        print("Bodies data:", bodies_data['data'])
    else:
        print("Failed to fetch bodies data:", bodies_response.status_code, "-", bodies_response.text)
else:
    print("Failed to authenticate:", response.status_code, "-", response.text)
