const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const Joi = require('joi');
var connection = require('../database')





function createActorSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        name: Joi.string().regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Alpha, only real name in').min(3).max(30).required(),

        
        facebook_likes: Joi.number().integer().min(0).strict(),
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



function editActorSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        name: Joi.string().regex(/^[a-zA-Z ]+$/, 'Alpha, only spaces and text in').min(3).max(30).required(),

        
        facebook_likes: Joi.number().integer().min(0).strict(),
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



// GET ROUTES




router.get("/actors", (req, res) => {

    connection.query("SELECT * from actors", (err, rows, fields, result) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if(rows.length == 0){
            return res.status(204).json({msg: 'No Actors found'})

        } else {
        res.status(200).send(rows)
        }  
    })
});




router.get('/actor/:id', [check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt({ gt: -1 }).withMessage('id must be a real Integer number')], (req, res) => {
    let id = req.params.id;
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }



    connection.query("SELECT * FROM actors WHERE id = ?", [id], (err, rows, fields, result) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if(rows.length == 0){
            return res.status(204).json({msg: 'Actor not found'})

        } else {
        res.status(200).send(rows[0])
        }
    })
})


// router.get('/actorByName/:name', (req,res) =>{
//     let name = req.params.name;
//     connection.query("SELECT * FROM actors WHERE name = ?", [name], (err, rows, fields, result) =>{
//            if (err) {
//     console.log(err.message)
//     res.status(500).send('Server Error');

// }
//         res.send(rows)
//     })
// })





// POST ROUTES


router.post('/addActor', 


createActorSchema

,(req, res, next) => {
  
        let name = req.body.name;
        let facebook_likes = req.body.facebook_likes;
        let obj ={
            Status: 'Actor Created Successfully',
            Data: req.body
   };

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
   }

    connection.query("SELECT * from  actors where name = ? ", [name], (err, result, rows, fields) => {
    if (err) {
        console.log(err.message)
        res.status(500).send('Server Error');

    }

    if (result.length == 0) {
        connection.query("INSERT INTO actors (name, facebook_likes) VALUES (?,?) ", [name, facebook_likes], (err, result, rows, fields) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');

            }

            console.log(obj)
            res.status(201).json(obj)
            next()

        })

    } else {
        return res.status(400).json({ msg: 'Actor already exists' })
        next()


    }



})

    
})




// PUT ROUTES





router.put('/editActor/:id', [

    editActorSchema,
        check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt({ gt: -1 }).withMessage('id must be a real Integer number')
    
    ], (req, res, next) => {


    let id = req.params.id
    let name = req.body.name;
    
    let facebook_likes;
    req.body.facebook_likes ? facebook_likes = req.body.facebook_likes : facebook_likes =  0

    let obj = {
        Status: 'Actor Updated Successfully',
        Data: req.body
    };


    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }




    connection.query("SELECT * from  actors where id = ? ", [id], (err, result, rows, fields) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }

            if (result.length == 0) {
                return res.status(404).json({ msg: 'Actor not exists' })
                next()




            } else {

                connection.query("SELECT * from  actors where name = ? AND id != ? ", [name, id], (err, result) => {
                    if (err) {
                        console.log(err.message)
                        res.status(500).send('Server Error');
    
                    }
                    if (result.length == 0) {
                        connection.query("UPDATE  actors SET name = ? , facebook_likes = ? WHERE id = ? ", [name, facebook_likes, id], (err, result) => {
                            if (err) {
                                console.log(err.message)
                                res.status(500).send('Server Error');
            
                            }
                            console.log(obj)
                            res.status(200).json(obj)
                            next()

                        })



                    } else {
                        return res.status(400).json({ msg: 'Actor with that name already exists' })

                    }
                })




            }








        })

});





// DELETE ROUTES


router.delete('/deleteActor/:id', [check('id').not().isEmpty().withMessage('you must identify the id for the data'),  check('id').isInt({ gt: -1 }).withMessage('id must be a real Integer number')], (req, res) => {
    let id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

     connection.query("Select * FROM actors WHERE id = ?", [id], (err, result) => {
        if (result.length == 0) {
            return res.status(204).json({ msg: 'Actor not found' })

        } else {

            connection.query("DELETE FROM actors WHERE id = ?", [id], (err, result) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');

                }
                res.status(200).json({ msg: 'Actor removed' });
            })
        }
    })
})




module.exports = router;
