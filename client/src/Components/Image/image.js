import { get, post } from "../HTTP/http";
import FormData from 'form-data';

const UPLOAD_IMAGE = "upload_image";

export function upload_image(file, item_id, image_urls) {
    return new Promise(function(resolve, reject) {
        var data = new FormData();
        var options = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        };
        data.append('file', file, file.fileName);
        data.append('item_id', item_id);
        post(UPLOAD_IMAGE, data, options).then(res => {
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
