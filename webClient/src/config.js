
let BASE_URL;
if(process.env.NODE_ENV === 'production') {
    BASE_URL = '/api/v1/sample-node-api'
} else {
    BASE_URL = 'http://localhost:8080'
}

module.exports = {
    BASE_URL
}