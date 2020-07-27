var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodelogin"
});


con.connect(function (err) {
    if (err) throw err;
    console.log("connected")
    var events = "CREATE TABLE IF NOT EXISTS events (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, event_name VARCHAR(20))";
    con.query(events, function (err, result) {
        if (err) throw err;
        console.log("Events Table created");
    });

    var communications = "CREATE TABLE IF NOT EXISTS communications (event_id INT NOT NULL, FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE, id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, email_template VARCHAR(20) , phone_template VARCHAR(20), schedular DATE )";
    con.query(communications, function (err, result) {
        if (err) throw err;
        console.log("Communications Table created");
    });
});
