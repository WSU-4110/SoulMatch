const SERVER_ENDPOINT = 'http://10.0.0.7:8080';

async function sendApiRequest(endpoint, body) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    };

    return fetch(SERVER_ENDPOINT + endpoint, options).then(handleResponse).catch(console.error);
}

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json.data : Promise.reject(json);
    });
}

export {
    sendApiRequest,
    handleResponse
};