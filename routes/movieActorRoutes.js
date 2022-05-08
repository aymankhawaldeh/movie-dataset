const express = require('express');
const router = express.Router();
var connection = require('../database')






router.post('/addActorMovie', (req, res) => {

   
    let movie_id = req.body.movie_id;
    let actor_id = req.body.actor_id;

    // CHECK IF movie_id AND actor_id are already exist DO NOT INSERT

    connection.query("SELECT movie_id, actor_id from movies_actors WHERE movie_id = ? AND actor_id = ?", [movie_id, actor_id], (err, result, rows, fields) => {
        if (err) {
            throw err;
        } 
    console.log(result.length)
    if(result.length == 0){
        
    connection.query("INSERT IGNORE INTO movies_actors (movie_id, actor_id) VALUES (?, ?)", [movie_id, actor_id], function (err) {
        if (err) {
            console.log(err);
        }
        let oneActorMovie = { "movie_id": movie_id, "actor_id": actor_id }
        res.json(oneActorMovie)


    })
            
    } else {
        res.send('SORRY THIS RELATION IS ALREADY EXIST')
    }
    
    })




})





router.delete('/deleteMovieActor', (req, res) => {
 
    let movie_id = req.query.movie_id;
    let actor_id = req.query.actor_id;

    connection.query("SELECT movie_id, actor_id from movies_actors WHERE movie_id = ? AND actor_id = ?", [movie_id, actor_id], (err, result, rows, fields) => {
        if (err) {
            throw err;
        } 
    console.log(result.length)
    if(result.length == 0){
        res.send('SORRY THIS RELATION IS not EXIST')



    } else {
   
        connection.query("DELETE FROM movies_actors WHERE movie_id = ? AND actor_id = ?", [movie_id, actor_id], (err, result) => {
            if (err) throw err;
            // console.log(" all actors id ", actor)
            res.status(200).send("row is deleted")


        }) }



    })


})











module.exports = router;
