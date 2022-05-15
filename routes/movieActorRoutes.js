const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
var connection = require('../database')




router.get('/getMoviesActors', (req, res) => {





    connection.query("SELECT * from movies_actors ", (err, result, rows, fields) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if (rows.length == 0) {
            return res.status(204).json({ msg: 'No relations found' })

        } else {
            res.status(200).send(result)
        }
    })



})



router.get('/getOneMoviesActors',
    [
        check('movie_id').not().isEmpty().withMessage('you must identify movie_id'), check('movie_id').optional().isInt({ gt: -1 }).withMessage('movie_id must be a real Integer number'),
        check('actor_id').not().isEmpty().withMessage('you must identify actor_id'), check('actor_id').optional().isInt({ gt: -1 }).withMessage('actor_id must be a real Integer number'),

    ], (req, res) => {


        let movie_id = req.query.movie_id
        let actor_id = req.query.actor_id
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }




        connection.query("SELECT * from movies_actors WHERE movie_id = ? AND actor_id = ? ", [movie_id, actor_id], (err, result, rows, fields) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');

            }
            if (result.length == 0) {
                return res.status(204).json({ msg: 'No relation found' })

            } else {
                res.status(200).send(result[0])
            }
        })



    })




router.post('/addActorMovie', [
    check('movie_id').not().isEmpty().withMessage('you must identify movie_id'),
     check('movie_id').optional().isInt({ gt: -1 }).withMessage('movie_id must be a real Integer number'),
     check('movie_id').optional().not().isString().withMessage('movie_id must be a real Integer number'),


    check('actor_id').not().isEmpty().withMessage('you must identify actor_id'),
     check('actor_id').optional().isInt({ gt: -1 }).withMessage('actor_id must be a real Integer number'),
     check('actor_id').optional().not().isString().withMessage('movie_id must be a real Integer number'),


], (req, res) => {


    let movie_id = req.body.movie_id;
    let actor_id = req.body.actor_id;
    let obj = {
        Status: 'Movie Actor Relation Created Successfully',
        Data: req.body
    };


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    connection.query("SELECT * FROM movies WHERE id = ?", [movie_id], function(err, result){
        if (err) {
            console.log(err.message)
           return res.status(500).send('Server Error');

        }
        if(result.length == 0){
            return res.status(204).json({ msg: 'This movie_id is not exist in movies table' })


        } else {
    

    connection.query("SELECT movie_id, actor_id from movies_actors WHERE movie_id = ? AND actor_id = ?", [movie_id, actor_id], (err, result, rows, fields) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if (result.length == 0) {

            

              if(req.body.actor_id){
                connection.query("SELECT * FROM actors WHERE id = ?", [actor_id], function(err, result){
                    if (err) {
                        console.log(err.message)
                       return res.status(500).send('Server Error');
        
                    }
                    if(result.length == 0){
                        return res.status(204).json({ msg: 'This actor_id is not exist in actors table' })


                    } else {
                        connection.query("INSERT IGNORE INTO movies_actors (movie_id, actor_id) VALUES (?, ?)", [movie_id, actor_id], function (err) {
                            if (err) {
                                console.log(err.message)
                                res.status(500).send('Server Error');
                
                            }
                            res.status(201).json(obj)
            
            
                        })
                   
                    }
                })
              }
 
        } else {
            return res.status(400).json({ msg: 'This relation already exists' })
        }

    })}
})




})





router.delete('/deleteMovieActor', [
    check('movie_id').not().isEmpty().withMessage('you must identify movie_id'), check('movie_id').isInt({ gt: -1 }).withMessage('movie_id must be an Integer number'),
    check('actor_id').not().isEmpty().withMessage('you must identify actor_id'), check('actor_id').isInt({ gt: -1 }).withMessage('actor_id must be an Integer number')

], (req, res) => {

    let movie_id = req.query.movie_id;
    let actor_id = req.query.actor_id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }

    connection.query("SELECT movie_id, actor_id from movies_actors WHERE movie_id = ? AND actor_id = ?", [movie_id, actor_id], (err, result, rows, fields) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');
        }

        if (result.length == 0) {
            return res.status(204).json({ msg: 'This relation is not exist' })
        } else {

            connection.query("DELETE FROM movies_actors WHERE movie_id = ? AND actor_id = ?", [movie_id, actor_id], (err, result) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');
                }
                res.status(200).json({ msg: 'relation  removed' });


            })
        }



    })


})











module.exports = router;
