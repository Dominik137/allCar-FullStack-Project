import React, { useState, useEffect } from "react";

function Test() {
    // // Define the endpoint URLs
    // const loginUrl = "https://carapi.app/api/auth/login";
    // const engineDataUrl = "https://carapi.app/api/engines?limit=10&sort=make_model_trim_id&direction=asc&verbose=yes";
    
    // useEffect(() => {
    //     // Prepare the request body for authentication
    //     const loginData = {
    //         api_token: "502f876d-743d-43a3-913e-06ddf7588586",
    //         api_secret: "4633e95291a659d3bf570a3e60ad4135"
    //     };
        
    //     // Authenticate and get the JWT token
    //     fetch(loginUrl, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(loginData)
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Failed to authenticate: ' + response.status);
    //         }
    //         return response.text();
    //     })
    //     .then(jwtToken => {
    //         console.log('JWT Token:', jwtToken);
        
    //         // Make a request to fetch engine data
    //         const params = {
    //             make: "Volkswagen",
    //             model: "GTI",
    //             year: "2019",
    //             id: 1
    //         };
    //         const queryParams = new URLSearchParams(params).toString(); // Convert params to query string
    //         const engineDataRequestUrl = `${engineDataUrl}&${queryParams}`;
        
    //         fetch(engineDataRequestUrl, {
    //             headers: {
    //                 'Authorization': `Bearer ${jwtToken}`,
    //                 'Accept': 'application/json'
    //             }
    //         })
    //         .then(engineResponse => {
    //             if (!engineResponse.ok) {
    //                 throw new Error('Failed to fetch engine data: ' + engineResponse.status);
    //             }
    //             return engineResponse.json();
    //         })
    //         .then(engineData => {
    //             console.log('Engine data:', engineData);
    //         })
    //         .catch(error => {
    //             console.error(error.message);
    //         });
    //     })
    //     .catch(error => {
    //         console.error(error.message);
    //     });
    // }, []); // Empty dependency array to ensure the effect runs only once
  
    return <div>Test component</div>;
}

export default Test;
