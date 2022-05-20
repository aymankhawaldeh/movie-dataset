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
        name: Joi.string().regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Alpha, only real name in').min(3).max(25).required(),
        facebook_likes: Joi.number().integer().min(0).strict()
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

         
        next(res.status(400).json({ error: message.split('"').join('') }));
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }
}



function editActorSchemaId(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        id: Joi.number().integer().min(1).label('id params in the url').required()
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: false, // ignore unknown props
        stripUnknown: false // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.params, options);

    if (error) {
        // on fail return comma separated errors
        let message = error.details.map(x => x.message).join(', ')

         
        next(res.status(400).json({ error: message.split('"').join('') }));
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.params = value;
        next();
    }
}




function editActorSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        name: Joi.string().regex(/^[a-zA-Z ]+$/, 'Alpha, only spaces and text in').min(3).max(25).required(),  
        facebook_likes: Joi.number().integer().min(0).strict()
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

         
        next(res.status(400).json({ error: message.split('"').join('') }));
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.body = value;
        next();
    }
}




function getActorSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        length: Joi.number().integer().min(1).required(),
        page: Joi.number().integer().min(1).required()
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

         
        next(res.status(400).json({ error: message.split('"').join('') }));
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.query = value;
        next();
    }
}



function getOneActorSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        id: Joi.number().integer().min(1)
        });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: false, // ignore unknown props
        stripUnknown: false // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.params, options);

    if (error) {
        // on fail return comma separated errors
        let message = error.details.map(x => x.message).join(', ')

         
        next(res.status(400).json({ error: message.split('"').join('') }));
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.params = value;
        next();
    }
}



function deleteOneActorSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        id: Joi.number().integer().min(1)
        });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: false, // ignore unknown props
        stripUnknown: false // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.params, options);

    if (error) {
        // on fail return comma separated errors
        let message = error.details.map(x => x.message).join(', ')

         
        next(res.status(400).json({ error: message.split('"').join('') }));
    } else {
        // on success replace req.body with validated value and trigger next middleware function
        req.params = value;
        next();
    }
}





// GET ROUTES


// router.get("/actors", (req, res) => {

//     connection.query("SELECT * from actors", (err, rows, fields, result) => {
//         if (err) {
//             console.log(err.message)
//             res.status(500).send('Server Error');

//         }
//         if(rows.length == 0){
//             return res.status(404).json({msg: 'No Actors found'})

//         } else {
//         res.status(200).send(rows)
//         }  
//     })
// });

// PAGINATION

router.get('/actors',getActorSchema, (req, res, next) => {



    let count;

    connection.query("SELECT * from actors", (err,result,rows) =>{

        if (err) throw err;

        count = result.length
    })

 
    // limit per page as || 20
    const length = req.query.length
    // page number
    const page = req.query.page

    if(!length || !page){

        


    connection.query("SELECT * from actors", (err, rows, fields, result) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if (rows.length == 0) {
            return res.status(404).json({ msg: 'No Actors found' })
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
    const prodsQuery = "select * from actors limit "+length+" OFFSET "+offset
 
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







router.get('/actor/:id', getOneActorSchema,[check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt({ gt: -1 }).withMessage('id must be a real Integer number')], (req, res, next) => {
    let id = req.params.id;
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        let message = errors.array().map(x => x.msg).join(', ')
        return res.status(400).json({ error: message});
    }


    connection.query("SELECT * FROM actors WHERE id = ?", [id], (err, rows, fields, result) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if(rows.length == 0){
            return res.status(404).json({msg: 'Actor not found'})
            next()

        } else {
        res.status(200).send(rows[0])
        next()
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
//    if (!errors.isEmpty()) {
//      return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
//    }
if (!errors.isEmpty()) {
        
    let message = errors.array().map(x => x.msg).join(', ')
    return res.status(400).json({ error: message});
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





router.put('/editActor/:id',
editActorSchemaId, 
    editActorSchema  
    , (req, res, next) => {


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
        
        let message = errors.array().map(x => x.msg).join(', ')
        return res.status(400).json({ error: message});
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


router.delete('/deleteActor/:id',deleteOneActorSchema, [check('id').not().isEmpty().withMessage('you must identify the id for the data'),  check('id').isInt({ gt: -1 }).withMessage('id must be a real Integer number')], (req, res, next) => {
    let id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        let message = errors.array().map(x => x.msg).join(', ')
        return res.status(400).json({ error: message});
    }

     connection.query("Select * FROM actors WHERE id = ?", [id], (err, result) => {
        if (result.length == 0) {
            return res.status(404).json({ msg: 'Actor not found' })
            next()

        } else {

            connection.query("DELETE FROM actors WHERE id = ?", [id], (err, result) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');

                }
                res.status(200).json({ msg: 'Actor removed' });
                next()
            })
        }
    })
})




module.exports = router;
