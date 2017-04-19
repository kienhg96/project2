const fs = require('fs');
const path = require('path');

// const deleteFolderRecursive = function(folderPath) {
//     if( fs.existsSync(path) ) {
//         fs.readdirSync(path).forEach(function(file,index) {
//             var curPath = path + "/" + file;
//             if(fs.lstatSync(curPath).isDirectory()) { // recurse
//                 deleteFolderRecursive(curPath);
//             } else { // delete file
//                 fs.unlinkSync(curPath);
//             }
//         });
//         fs.rmdirSync(path);
//     }
// };

const deleteFolderRecursive = function(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return console.error(err);
        }
        for (let i in files) {
            let filePath = path.join(folderPath, files[i].toString());
            fs.lstat(filePath, (err, result) => {
                if (err) {
                    return console.error(err);
                }
                if (result.isDirectory()) {
                    deleteFolderRecursive(filePath);
                } else if (result.isFile()) {
                    fs.unlink(filePath, (err) => {
                        console.error(err);
                    });
                } else {
                    console.error(new Error('File deleled'));
                }
            });
        }
    });
}

module.exports = deleteFolderRecursive;