const fs = require('fs');

const filepath = './config.json'
let configData = {}


try {
    configData = JSON.parse(fs.readFileSync(filepath))
} catch (error) {
    
}

function set(data) {
    configData = {...configData, ...data};
    fs.writeFileSync(filepath, JSON.stringify(configData, null, 2));
}


module.exports = {
    configData: configData,
    set
}