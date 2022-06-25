const environment = require('../environments/env-backend.js')

module.exports = {
    db : `mongodb+srv://${environment.mongoUserName}:${environment.mongoPassword}@cluster0.lctv5.mongodb.net/?retryWrites=true&w=majority`
}