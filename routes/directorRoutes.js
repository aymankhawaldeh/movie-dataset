const express = require('express');
const router = express.Router();
var connection = require('../database')





// GET ROUTES

router.get('/directors', (req, res) => {

    connection.query("SELECT * from directors", (err, rows, fields, result) => {
        if (err) throw err;
        res.send(rows);
    })
});




router.get('/director/:id', (req, res) => {
    let id = req.params.id;
    connection.query("SELECT * FROM directors WHERE director_id = ?", [id], (err, rows, fields, result) => {
        if (err) throw err;
        res.send(rows)
    })
})


// POST ROUTES




router.post('/addDirector', (req, res) => {



    let multiDirectors = []


    if (req.body.length > 1) {
        console.log('request.body multi out', req.body)

        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                let value = req.body[key];
                multiDirectors.push(value)

                connection.query("INSERT INTO directors (name, facebook_likes) VALUES (?,?) ", [value.name, value.facebook_likes], (err, result, rows, fields) => {
                    if (err) throw err;

                })

                console.log('request.body in', req.body)

                console.log(`value for ${key} is ${value.name}`);



            }





        }

        res.status(200).json(multiDirectors)

    } else {
        let name = req.body.name;
        let facebook_likes = req.body.facebook_likes;

        connection.query("INSERT INTO directors (name, facebook_likes) VALUES (?,?) ", [name, facebook_likes], (err, result, rows, fields) => {
            if (err) throw err;

            let oneDirector = { "name": name, "facebook_likes": facebook_likes }
            res.json(oneDirector)

        })
        console.log('request.body one', req.body)


    }
})






// PUT ROUTES





router.put('/editDirector/:id', (req, res) => {


    let id = req.params.id
    let name = req.body.name;
    let facebook_likes = req.body.facebook_likes;


    connection.query("UPDATE  directors SET name = ? , facebook_likes = ? WHERE director_id = ? ", [name, facebook_likes, id], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send({ "name": name, "facebook_likes": facebook_likes })
    })

});





// DELETE ROUTES


router.delete('/deleteDirector/:id', (req, res) => {
    let id = req.params.id;
    connection.query("DELETE FROM directors WHERE director_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.send("row with this id " + id + " is deleted")
    })
})




module.exports = router;

