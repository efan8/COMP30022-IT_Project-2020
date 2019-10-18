import { get, post } from "../HTTP/http";
import FormData from 'form-data';
import imageCompression from 'browser-image-compression';

const UPLOAD_IMAGE = "upload_image";
const MAX_IMAGE_SIZE = 0.2;   // MB
const MAX_IMAGE_WIDTH = 1920;

export function upload_image(file, item_id, image_urls) {
    return new Promise(function(resolve, reject) {
        var data = new FormData();
        var options = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        };
        data.append('item_id', item_id);

        var options = {
            maxSizeMB: MAX_IMAGE_SIZE,
            maxWidthOrHeight: MAX_IMAGE_WIDTH,
            useWebWorker: true
        };
        imageCompression(file, options).then(function (compressedFile) {
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            data.append('file', compressedFile, file.name);
            data.append('filename', file.name);

            return post(UPLOAD_IMAGE, data, options);
        }).then(res => {
            var url = res.data;
            console.log(url);
            if (!image_urls) {
                resolve([url]);
            }
            else {
                image_urls.push(url);
                resolve(image_urls);
            }
        }).catch(error => {
            console.log(error);
            reject(error);
        });


    });
}

export function upload_images(files, item_id) {
    var promise_chain = Promise.resolve();
    for (let file of files) {
        promise_chain = promise_chain.then(image_urls => upload_image(file, item_id, image_urls));
    }
    return promise_chain;
}
