const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "pass123",
    database: "basketballplayersystem",
});

app.post('/create', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const position = req.body.position;
    const totalpoints = req.body.totalpoints;
    const totalassists = req.body.totalassists;
    const totalrebounds = req.body.totalrebounds;

    db.query(
        'INSERT INTO ballplayers (name, age, position, totalpoints, totalassists, totalrebounds) VALUES (?,?,?,?,?,?)',
        [name, age, position, totalpoints, totalassists, totalrebounds],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get('/players', (req, res) => {
    db.query('SELECT * FROM ballplayers', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.put('/update', (req, res) => {
    const id = req.body.id
    const newPoints = req.body.totalpoints
    db.query('UPDATE ballplayers SET totalpoints = ? WHERE idplayers = ?', [newPoints, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
app.put('/updateassists', (req, res) => {
    const id = req.body.id
    const newAssists = req.body.totalassists
    db.query('UPDATE ballplayers SET totalassists = ? WHERE idplayers = ?', [newAssists, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
app.put('/updaterebounds', (req, res) => {
    const id = req.body.id
    const newRebounds = req.body.totalrebounds
    db.query('UPDATE ballplayers SET totalrebounds = ? WHERE idplayers = ?', [newRebounds, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.delete('/delete/:id', (req,res) => {
    const id = req.params.id
    db.query('DELETE FROM ballplayers WHERE idplayers = ?', id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.listen(3001, () => { console.log("server runs") })