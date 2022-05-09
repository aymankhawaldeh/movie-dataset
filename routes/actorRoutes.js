const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
var connection = require('../database')


// GET ROUTES


router.get('/actors', (req, res) => {

    connection.query("SELECT * from actors", (err, rows, fields, result) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if(rows.length == 0){
            return res.status(404).json({msg: 'No Actors found'})

        } else {
        res.status(200).send(rows)
        }  
    })
});




router.get('/actor/:id', [check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt().withMessage('id must be an Integer number')], (req, res) => {
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
            return res.status(404).json({msg: 'Actor not found'})

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



router.post('/addActor', [
    check('name', 'Name must be Alpha AND not empty').isAlpha('en-US', {ignore: ' '}), check('name', 'Name is required').not().isEmpty(), check('facebook_likes').isInt().withMessage('facebook_likes must be an Integer number'), check('facebook_likes').not().isString().withMessage('facebook_likes must be an Integer number') ],(req, res) => {
  
        let name = req.body.name;
        let facebook_likes = req.body.facebook_likes;
        let obj ={
            Status: 'Actor Created Successfully',
            Data: req.body
   };

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
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

        })

    } else {
        return res.status(400).json({ msg: 'Actor already exists' })

    }



})

    
})




// PUT ROUTES





router.put('/editActor/:id', [
    check('name', 'Name must be Alpha AND not empty').isAlpha('en-US', {ignore: ' '}), check('name', 'Name is required').not().isEmpty(), check('facebook_likes').isInt().withMessage('facebook_likes must be an Integer number'), check('facebook_likes').not().isString().withMessage('facebook_likes must be an Integer number'), check('id').not().isEmpty().withMessage('you must identify the id for the data'),  check('id').isInt().withMessage('id must be an Integer number')], (req, res) => {


    let id = req.params.id
    let name = req.body.name;
    let facebook_likes = req.body.facebook_likes;
    let obj = {
        Status: 'Actor Updated Successfully',
        Data: req.body
    };


    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }




    connection.query("SELECT * from  actors where id = ? ", [id], (err, result, rows, fields) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }

            if (result.length == 0) {
                return res.status(404).json({ msg: 'Actor not exists' })



            } else {

                connection.query("SELECT * from  actors where name = ? ", [name], (err, result) => {
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
                        })



                    } else {
                        return res.status(400).json({ msg: 'Actor with that name already exists' })

                    }
                })




            }








        })

});





// DELETE ROUTES


router.delete('/deleteActor/:id', [check('id').not().isEmpty().withMessage('you must identify the id for the data'),  check('id').isInt().withMessage('id must be an Integer number')], (req, res) => {
    let id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

     connection.query("Select * FROM actors WHERE id = ?", [id], (err, result) => {
        if (result.length == 0) {
            return res.status(404).json({ msg: 'Actor not found' })

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
