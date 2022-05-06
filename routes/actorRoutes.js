const express = require('express');
const router = express.Router();
var connection = require('../database')


// GET ROUTES


router.get('/actors', (req, res) => {

    connection.query("SELECT * from actors", (err, rows, fields, result) => {
        if (err) throw err;
        res.send(rows);
    })
});



router.get('/actor/:id', (req, res) => {
    let id = req.params.id;
    connection.query("SELECT * FROM actors WHERE actor_id = ?", [id], (err, rows, fields, result) => {
        if (err) throw err;
        res.send(rows)
    })
})


// router.get('/actorByName/:name', (req,res) =>{
//     let name = req.params.name;
//     connection.query("SELECT * FROM actors WHERE name = ?", [name], (err, rows, fields, result) =>{
//         if(err) throw err;
//         res.send(rows)
//     })
// })





// POST ROUTES



router.post('/addActor', (req, res) => {



    let multiActors = []


    if (req.body.length > 1) {
        console.log('request.body multi out', req.body)

        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                let value = req.body[key];
                multiActors.push(value)

                connection.query("INSERT INTO actors (name, facebook_likes) VALUES (?,?) ", [value.name, value.facebook_likes], (err, result, rows, fields) => {
                    if (err) throw err;

                })

                console.log('request.body in', req.body)

                console.log(`value for ${key} is ${value.name}`);



            }





        }

        res.status(200).json(multiActors)

    } else {
        let name = req.body.name;
        let facebook_likes = req.body.facebook_likes;

        connection.query("INSERT INTO actors (name, facebook_likes) VALUES (?,?) ", [name, facebook_likes], (err, result, rows, fields) => {
            if (err) throw err;

            let oneActor = { "name": name, "facebook_likes": facebook_likes }
            res.json(oneActor)

        })
        console.log('request.body one', req.body)


    }
})




// PUT ROUTES





router.put('/editActor/:id', (req, res) => {


    let id = req.params.id
    let name = req.body.name;
    let facebook_likes = req.body.facebook_likes;


    connection.query("UPDATE actors SET name = ? , facebook_likes = ? WHERE actor_id = ? ", [name, facebook_likes, id], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.send({ "name": name, "facebook_likes": facebook_likes })
    })

});





// DELETE ROUTES


router.delete('/deleteActor/:id', (req, res) => {
    let id = req.params.id;
    connection.query("DELETE FROM actors WHERE actor_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.send("row with this id " + id + " is deleted")
    })
})




module.exports = router;
