const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
var connection = require('../database')
const Joi = require('joi');



function createMovieActorSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        actor_id: Joi.number().integer().min(0).strict().required(),
        
        movie_id: Joi.number().integer().min(0).strict().required()
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: false, // ignore unknown props
        stripUnknown: false // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        // on fail return comma separated errors
        let message = error.details.map(x => x.message).join(', ')

         
        next(res.status(400).json({ error: message }));
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }
}


function deleteActorMovieSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        actor_id: Joi.number().integer().min(1).required(),
        movie_id: Joi.number().integer().min(1).required()
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: false, // ignore unknown props
        stripUnknown: false // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.query, options);

    if (error) {
        // on fail return comma separated errors
        let message = error.details.map(x => x.message).join(', ')

         
        next(res.status(400).json({ error: message }));
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }
}


function getMovieActorSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        length: Joi.number().integer().min(1),
        
        page: Joi.number().integer().min(1)
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: false, // ignore unknown props
        stripUnknown: false // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.query, options);

    if (error) {
        // on fail return comma separated errors
        let message = error.details.map(x => x.message).join(', ')

         
        next(res.status(400).json({ error: message }));
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }
}

function getOneActorMovieSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        actor_id: Joi.number().integer().min(1).required(),
        
        movie_id: Joi.number().integer().min(1).required()
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: false, // ignore unknown props
        stripUnknown: false // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.query, options);

    if (error) {
        // on fail return comma separated errors
        let message = error.details.map(x => x.message).join(', ')

         
        next(res.status(400).json({ error: message }));
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }
}






// router.get('/getMoviesActors', (req, res) => {





//     connection.query("SELECT * from movies_actors ", (err, result, rows, fields) => {
//         if (err) {
//             console.log(err.message)
//             res.status(500).send('Server Error');

//         }
//         if (rows.length == 0) {
//             return res.status(404).json({ msg: 'No relations found' })

//         } else {
//             res.status(200).send(result)
//         }
//     })



// })

// PAGINATION


router.get('/getMoviesActors',getMovieActorSchema, (req, res, next) => {



    let count;

    connection.query("SELECT * from movies_actors", (err,result,rows) =>{

        if (err) throw err;

        count = result.length
    })

 
    // limit per page as || 20
    const length = req.query.length
    // page number
    const page = req.query.page

    if(!length || !page){

        


    connection.query("SELECT * from movies_actors", (err, rows, fields, result) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if (rows.length == 0) {
            return res.status(404).json({ msg: 'No Relations found' })
            next()


        } else {
            res.status(200).send(rows)
            next()
        }
    })


    } else {





    // calculate offset
    const offset = (page - 1) * length


    
    // query for fetching data with page number and offset
    const prodsQuery = "select * from movies_actors limit "+length+" OFFSET "+offset
 
      connection.query(prodsQuery, function (error, results, fields) {
        // When done with the connection, release it.
             if (error) throw error;

      
         if(results.length == 0){
             res.status(404).json({"msg": `sorry there is no data in this page number (${page})`})
             next()

         } else {

        // create payload
        var jsonResult = {
          'count':count,
          'page_number':page,
          'length':results.length,
          'data':results
        }
        // create response
        var myJsonString = JSON.parse(JSON.stringify(jsonResult));
        // res.statusMessage = "Products for page "+page;
        res.statusCode = 200;
        res.json(myJsonString);
        // res.end();
    }
      })}
    })





router.get('/getOneMoviesActors',
getOneActorMovieSchema,
    [
        check('movie_id').not().isEmpty().withMessage('you must identify movie_id'), check('movie_id').optional().isInt({ gt: -1 }).withMessage('movie_id must be a real Integer number'),
        check('actor_id').not().isEmpty().withMessage('you must identify actor_id'), check('actor_id').optional().isInt({ gt: -1 }).withMessage('actor_id must be a real Integer number'),

    ], (req, res, next) => {


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
                return res.status(404).json({ msg: 'No relation found' })
                next()


            } else {
                res.status(200).send(result[0])
                next()
            }
        })



    })




router.post('/addActorMovie',

createMovieActorSchema,
[
    check('movie_id').not().isEmpty().withMessage('you must identify movie_id'),
     check('movie_id').optional().isInt({ gt: -1 }).withMessage('movie_id must be a real Integer number'),
     check('movie_id').optional().not().isString().withMessage('movie_id must be a real Integer number'),


    check('actor_id').not().isEmpty().withMessage('you must identify actor_id'),
     check('actor_id').optional().isInt({ gt: -1 }).withMessage('actor_id must be a real Integer number'),
     check('actor_id').optional().not().isString().withMessage('movie_id must be a real Integer number'),


], (req, res, next) => {


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
            return res.status(404).json({ msg: 'This movie_id is not exist in movies table' })
            next()


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
                        return res.status(404).json({ msg: 'This actor_id is not exist in actors table' })
                        next()


                    } else {
                        connection.query("INSERT IGNORE INTO movies_actors (movie_id, actor_id) VALUES (?, ?)", [movie_id, actor_id], function (err) {
                            if (err) {
                                console.log(err.message)
                                res.status(500).send('Server Error');
                
                            }
                            res.status(201).json(obj)
                            next()
            
            
                        })
                   
                    }
                })
              }
 
        } else {
            return res.status(400).json({ msg: 'This relation already exists' })
            next()
        }

    })}
})




})





router.delete('/deleteMovieActor', 
deleteActorMovieSchema,
[
    check('movie_id').not().isEmpty().withMessage('you must identify movie_id'), check('movie_id').isInt({ gt: -1 }).withMessage('movie_id must be an Integer number'),
    check('actor_id').not().isEmpty().withMessage('you must identify actor_id'), check('actor_id').isInt({ gt: -1 }).withMessage('actor_id must be an Integer number')

], (req, res, next) => {

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
            return res.status(404).json({ msg: 'This relation is not exist' })
            next()

        } else {

            connection.query("DELETE FROM movies_actors WHERE movie_id = ? AND actor_id = ?", [movie_id, actor_id], (err, result) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');
                }
                res.status(200).json({ msg: 'relation  removed' });
                next()


            })
        }



    })


})











module.exports = router;
