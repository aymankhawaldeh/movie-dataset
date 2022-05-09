const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
var connection = require('../database')





// GET ROUTES

router.get('/directors', (req, res) => {

    connection.query("SELECT * from directors", (err, rows, fields, result) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if (rows.length == 0) {
            return res.status(404).json({ msg: 'No Directors found' })

        } else {
            res.status(200).send(rows)
        }
    })
});




router.get('/director/:id', [check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt({ gt: -1 }).withMessage('id must be an Integer number')], (req, res) => {
    let id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    connection.query("SELECT * FROM directors WHERE id = ?", [id], (err, rows, fields, result) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if (rows.length == 0) {
            return res.status(404).json({ msg: 'Director not found' })

        } else {
            res.status(200).send(rows[0])
        }
    })
})


// POST ROUTES




router.post('/addDirector', [
    check('name', 'Name must be Alpha AND not empty').isAlpha('en-US', {ignore: ' '}), check('name', 'Name is required').not().isEmpty(), check('facebook_likes').isInt().withMessage('facebook_likes must be an Integer number'), check('facebook_likes').not().isString().withMessage('facebook_likes must be an Integer number')],  (req, res) => {






        let name = req.body.name;
        let facebook_likes = req.body.facebook_likes;
        let obj = {
            Status: 'Director Created Successfully',
            Data: req.body
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

         connection.query("SELECT * from  directors where name = ? ", [name], (err, result, rows, fields) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');

            }

            if (result.length == 0) {
                connection.query("INSERT INTO directors (name, facebook_likes) VALUES (?,?) ", [name, facebook_likes], (err, result, rows, fields) => {
                    if (err) {
                        console.log(err.message)
                        res.status(500).send('Server Error');
    
                    }

                    // let oneDirector = { "name": name, "facebook_likes": facebook_likes }
                    console.log(obj)
                    res.status(201).json(obj)

                })

            } else {
                return res.status(400).json({ msg: 'Director already exists' })

            }



        })

    })






// PUT ROUTES





router.put('/editDirector/:id', [
    check('name', 'Name must be Alpha AND not empty').isAlpha('en-US', {ignore: ' '}), check('name', 'Name is required').not().isEmpty(), check('facebook_likes').isInt().withMessage('facebook_likes must be an Integer number'), check('facebook_likes').not().isString().withMessage('facebook_likes must be an Integer number'), check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt({ gt: -1 }).withMessage('id must be an Integer number')], (req, res) => {


        let id = req.params.id
        let name = req.body.name;
        let facebook_likes = req.body.facebook_likes;
        let obj = {
            Status: 'Director Updated Successfully',
            Data: req.body
        };



        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        connection.query("SELECT * from  directors where id = ? ", [id], (err, result, rows, fields) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');

            }

            if (result.length == 0) {
                return res.status(404).json({ msg: 'Director not exists' })



            } else {

                connection.query("SELECT * from  directors where name = ? AND id != ?", [name, id], (err, result) => {
                    if (err) {
                        console.log(err.message)
                        res.status(500).send('Server Error');
    
                    }
                    if (result.length == 0) {
                        connection.query("UPDATE  directors SET name = ? , facebook_likes = ? WHERE id = ? ", [name, facebook_likes, id], (err, result) => {
                            if (err) {
                                console.log(err.message)
                                res.status(500).send('Server Error');
            
                            }
                            console.log(obj)
                            res.status(200).json(obj)
                        })



                    } else {
                        return res.status(400).json({ msg: 'Director with that name already exists' })

                    }
                })



                // let oneDirector = { "name": name, "facebook_likes": facebook_likes }




            }








        })




    });





// DELETE ROUTES


router.delete('/deleteDirector/:id', [check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt({ gt: -1 }).withMessage('id must be an Integer number')],  (req, res) => {
    let id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

     connection.query("Select * FROM directors WHERE id = ?", [id], (err, result) => {
        if (result.length == 0) {
            return res.status(404).json({ msg: 'Director not found' })

        } else {

            connection.query("DELETE FROM dirctor WHERE id = ?", [id], (err, result) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');

                }
                res.status(200).json({ msg: 'Director removed' });
            })
        }
    })
})




module.exports = router;

