const UPLOAD_ENDPOINT = 'http://localhost:8080/upload';
const IMAGES_ENDPOINT = 'http://localhost:8080/files/';

function uploadPicture(userId, file) {
    const extension = file.name.split('.');
    const fileName = userId + '-image-' + Math.random() + '.' + extension[extension.length -1];
    uploadFile(new File([file], fileName, {type: file.type}));
    return fileName;
}

async function uploadFile(file) {
    let formData = new FormData();
    formData.append('file', file);

    let options = {
        method: 'POST',
        body: formData
    };

    return await fetch(UPLOAD_ENDPOINT, options);
}

export {
    uploadPicture
};