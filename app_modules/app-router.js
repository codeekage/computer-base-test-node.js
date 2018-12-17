const path = require('path')
const fs = require('fs');


getFileInfoFromFolder = (route) => {
    const files = fs.readdirSync(route, 'utf8');
    const response = [];
    for (let file of files) {
        const extension = path.extname(file);
        response.push(file);
    }
    return response;
}

module.exports = (route, xapp) => {
    var final = getFileInfoFromFolder('./routes')
    var file = 0;
    var check = [];
    for (file; file < final.length; file++) {
        xapp.use(route, require('../routes/' + final[file]))
    }
}