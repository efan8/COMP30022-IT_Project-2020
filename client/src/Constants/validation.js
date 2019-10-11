/* All image upload validation functions */

// The checker for the number of files that can be uploaded in one go
export function maxPossibleFiles(event){
    let files = event.target.files // create file object
    if (files.length > 5) {
        const msg = 'Only 5 images can be uploaded at a time'
        event.target.value = null // discard selected file
        console.log(msg)
        return false;
    }
    return true;
}

// Do we want to limit file size? 
