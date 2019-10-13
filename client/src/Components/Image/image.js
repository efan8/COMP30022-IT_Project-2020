import { get, post } from "../HTTP/http";
import FormData from 'form-data';

const UPLOAD_IMAGE = "upload_image";

export function upload_image(file, item_id) {
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
            console.log(res);
            resolve(res);
        }).catch(error => {
            console.log(error);
            reject(error);
        });
    });
}
