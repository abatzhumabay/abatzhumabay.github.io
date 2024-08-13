async function apiCall(endpoint, method = 'GET', body = null) {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('ApiTokenInstance').value;
    const url = `https://7103.api.greenapi.com/waInstance${idInstance}/${endpoint}/${apiTokenInstance}`;

    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const responseText = await response.text();

        try {
            const data = JSON.parse(responseText);
            document.getElementById('response').value = JSON.stringify(data, null, 4);
        } catch (jsonError) {
            document.getElementById('response').value = `Ошибка при разборе JSON: ${jsonError.message}\n\nОтвет сервера:\n${responseText}`;
        }
    } catch (error) {
        document.getElementById('response').value = `Ошибка: ${error.message}`;
    }
}

function getSettings() {
    apiCall('getSettings');
}

function getStateInstance() {
    apiCall('getStateInstance');
}

function sendMessage() {
    const chatId = document.getElementById('chatIdMessage').value;
    const message = document.getElementById('message').value;
    const body = {
        chatId: `${chatId}@c.us`,
        message: message
    };
    apiCall('sendMessage', 'POST', body);
}

function sendFileByUrl() {
    const chatId = document.getElementById('chatIdFile').value;
    const urlFile = document.getElementById('urlFile').value;
    const body = {
        chatId: `${chatId}@c.us`,
        urlFile: urlFile,
        fileName: urlFile.split('/').pop()
    };
    apiCall('sendFileByUrl', 'POST', body);
}
