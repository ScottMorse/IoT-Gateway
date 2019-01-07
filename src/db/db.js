const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('database')

db.run(`CREATE TABLE IF NOT EXISTS data(
    id INTEGER NOT NULL,
    timeStamp TEXT NOT NULL,
    timeString TEXT NOT NULL,
    coord TEXT NOT NULL,
    company TEXT NOT NULL,
    avgTemp REAL)`)

getData = (message) => {
    let messagesObject = JSON.parse(message.toString())
    let messagesArray = Object.values(messagesObject).map((message) => {
        return  Object.values(message).map((data) => {
                    if(typeof data === 'object') {
                        return JSON.stringify(data)
                    }
                    else {
                        return data
                    }
                })
    })
    return messagesArray
}

module.exports.insert = (message) => {
    let valArrays = getData(message)
    for(let i = 0; i < valArrays.length; i++){
        db.run(`INSERT INTO data(id, timeStamp, timeString, coord, company, avgTemp) VALUES(?, ?, ?, ?, ?, ?)`, valArrays[i],(err) => {
            if(err){
                console.log(err)
            }
        })
    }
}
