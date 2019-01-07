const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('database')

db.run(`CREATE TABLE IF NOT EXISTS data(
    uid INTEGER NOT NULL,
    timeStamp TEXT NOT NULL,
    coord TEXT NOT NULL,
    company TEXT NOT NULL,
    avgTemp REAL)`)

getData = (message) => {
    let messagesArray = Object.values(message).map((message) => {
        return  Object.values(message).map((data) => {
                    if(typeof data === 'object') {
                        return JSON.stringify(data)
                    }
                    else {
                        return data
                    }
                })
    })
}

module.exports.insert = (message) => {
    let valArray = getData(message)
    console.log("hi")
    console.log(valArray)
    // for(let i = 0; i < valArray.length; i++){
    //     db.run(`INSERT INTO data(uid, timeStamp, coord, company, avgTemp) VALUES(?, ?, ?, ?, ?)`, valArray[i],(err) => {
    //         if(err){
    //             console.log(err)
    //         }
    //     })
    // }
}
