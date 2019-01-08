const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('database')

db.run(`CREATE TABLE IF NOT EXISTS data(
    id INTEGER NOT NULL,
    timeStamp INTEGER NOT NULL,
    company VARCHAR(255) NOT NULL,
    value FLOAT NOT NULL,
    units VARCHAR(30) NOT NULL,
    deviceType VARCHAR(255) NOT NULL,
    deviceName VARCHAR(255) NOT NULL,
    lat FLOAT NOT NULL,
    lng FLOAT NOT NULL)`)

getData = (message) => {
    let messagesObject = JSON.parse(message.toString())
    let messagesArray = Object.entries(messagesObject).map(([deviceName, data]) => {
        const { lat, lng } = data.coord
        delete data.coord
        return [...Object.values(data),deviceName,lat,lng]
    })
    return messagesArray
}

module.exports.insert = (message) => {
    let valArrays = getData(message)
    console.log(valArrays)
    for(let i = 0; i < valArrays.length; i++){
        db.run(`INSERT INTO data(id, timeStamp, company, value, units, deviceType, deviceName, lat, lng) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`, valArrays[i],(err) => {
            if(err){
                console.log(err)
            }
        })
    }
}
