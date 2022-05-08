const express = require('express');
const router = express.Router();
var connection = require('../database')






router.post('/addActorsMovies', (req, res) => {





   
    let arr = [];
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


    });




    function create(arr) {
        return new Promise((resolve, reject) => {
            

      
            connection.query("SELECT actors from movies WHERE id = ? ", [movie_id], (err, result, rows, fields) => {
                if (err) {
                    throw err;
                }
                console.log('rows out', rows)
                console.log('result out', result)


                 if(result[0].actors){

                //   console.log("REsult", result)

              
                    
                    console.log("All RESULT$ ", result)
                    console.log("RESULT[0].ACTORS$ ", result[0].actors)
                    let data = JSON.parse(result[0].actors);
                    let y;
                    for (let x in data) {
                        y = arr.push(data[x])
                    }
                    return y

            

                }

            })


            connection.query("SELECT name from actors WHERE id = ? ", [actor_id], (err, result, rows, fields) => {
                if (err) {
                    reject(err);
                }
                    arr.push(result[0]?.name)
                    resolve()
            })
        })

    }

    function get() {
        console.log('arr', arr)
        actors = JSON.stringify(arr)

        connection.query("UPDATE movies SET actors = ? WHERE id = ? ", [actors, movie_id], (err, result, rows, fields) => {
            if (err) throw err;
        })

    }

    create(arr).then(get).catch(err => console.log(err))

    console.log('request.body one', req.body)
        
        
    } else {
        res.send('SORRY THIS RELATION IS ALREADY EXIST')
    }
    
    })




})





router.delete('/deleteSomeMovieActor', (req, res) => {
    let arr= [];
    let newArr = [];
    let movie_id = req.query.movie_id;
    let actor_id = req.query.actor_id;
   
        connection.query("DELETE FROM movies_actors WHERE movie_id = ? AND actor_id = ?", [movie_id, actor_id], (err, result) => {
            if (err) throw err;
            // console.log(" all actors id ", actor)
            res.status(200).send("row is deleted")


        })



        
        function create(arr, newArr) {
            return new Promise((resolve, reject) => {
                

          
                connection.query("SELECT actors from movies WHERE movies.id = ? ", [movie_id], (err, result, rows, fields) => {
                    if (err) {
                        throw err;
                    }
                    console.log('rows out', rows)
                    console.log('result out', result)

                  

                        console.log("All RESULT$ ", result)
                        console.log("RESULT[0].ACTORS$ ", result[0].actors)
                        let data = JSON.parse(result[0].actors);
                        let y;
                        for (let x in data) {
                            y = arr.push(data[x])
                        }
                        return y

                

                    

                })


                connection.query("SELECT name from actors WHERE id = ? ", [actor_id], (err, result, rows, fields) => {
                    if (err) {
                        reject(err);
                    }


                    for(let i=0; i<arr.length; i++){

                        if(arr[i] !== result[0]?.name){
                            newArr.push(arr[i])

                        }

                    }
                        // arr.push(result[0]?.name)
                        resolve()
                })
            })

        }

        function get() {
            console.log('newArr', newArr)
            actors = JSON.stringify(newArr)

            connection.query("UPDATE movies SET actors = ? WHERE id = ? ", [actors, movie_id], (err, result, rows, fields) => {
                if (err) throw err;
            })

        }

        create(arr,newArr).then(get).catch(err => console.log(err))


})











module.exports = router;
