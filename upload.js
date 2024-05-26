let CLIENT_ID = weselewstodole2024@gmail.com

let API_KEY = round-bruin-424408-f3
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
let SCOPES = 'https://www.googleapis.com/auth/drive.file';

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        gapi.auth2.getAuthInstance().signIn();
    });
}

function uploadFiles() {
    let files = document.getElementById('fileInput').files;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let metadata = {
                'name': file.name,
                'mimeType': file.type
            };
            let accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
            let form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', file);

            fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
                body: form
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', handleClientLoad);
