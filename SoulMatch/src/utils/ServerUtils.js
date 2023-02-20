const SERVER_ENDPOINT = 'http://localhost:8080';

async function sendApiRequest(endpoint, body) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    };

    return await fetch(SERVER_ENDPOINT + endpoint, options).then(handleResponse).catch(console.error);
}

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

export {
    sendApiRequest,
    handleResponse
};