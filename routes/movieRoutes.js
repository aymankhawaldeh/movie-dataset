const express = require('express');
const router = express.Router();
const { check, body, validationResult } = require('express-validator')
var connection = require('../database')

const Joi = require('joi');
const { func } = require('joi');




function createMovieSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        title: Joi.string().min(3).max(30).required(),
        duration: Joi.number().integer().min(0).strict(),
        gross: Joi.number().min(0).strict(),
        genres: Joi.array().items(Joi.string()).min(1).unique(),
        num_voted_users: Joi.number().integer().min(0).strict(),
        cast_total_facebook_likes: Joi.number().integer().min(0).strict(),
        plot_keywords: Joi.array().items(Joi.string()).min(1).unique(),
        imdb_link: Joi.string(),
        num_user_for_reviews: Joi.number().integer().min(0).strict(),
        language: Joi.string().regex(/^[a-zA-Z ]+$/, 'Alpha, only spaces and text in').min(3).max(15),
        country: Joi.string().regex(/^[a-zA-Z ]+$/, 'Alpha, only spaces and text in').min(3).max(15),
        content_rating: Joi.string().min(3).max(15),
        budget: Joi.number().min(0).strict(),
        title_year: Joi.number().integer().min(1990).max(2022),
        imdb_score: Joi.number().min(0).strict(),
        aspect_ratio: Joi.number().min(0).strict(),
        movie_facebook_likes: Joi.number().integer().min(0).strict(),
        color: Joi.string().regex(/^[a-zA-Z ]+$/, 'Alpha, only spaces and text in').min(3).max(10),
        director_name: Joi.string().regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Alpha, only real name in').min(3).max(25).required()

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


function editMovieSchemaId(req, res, next) {
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

function editMovieSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        title: Joi.string().min(3).max(30),
        duration: Joi.number().integer().min(0).strict(),
        gross: Joi.number().min(0).strict(),
        genres: Joi.array().items(Joi.string()).min(1).unique(),
        num_voted_users: Joi.number().integer().min(0).strict(),
        cast_total_facebook_likes: Joi.number().integer().min(0).strict(),
        plot_keywords: Joi.array().items(Joi.string()).min(1).unique(),
        imdb_link: Joi.string(),
        num_user_for_reviews: Joi.number().integer().min(0).strict(),
        language: Joi.string().regex(/^[a-zA-Z ]+$/, 'Alpha, only spaces and text in').min(3).max(15),
        country: Joi.string().regex(/^[a-zA-Z ]+$/, 'Alpha, only spaces and text in').min(3).max(15),
        content_rating: Joi.string().min(3).max(15),
        budget: Joi.number().min(0).strict(),
        title_year: Joi.number().integer().min(1990).max(2022),
        imdb_score: Joi.number().min(0).strict(),
        aspect_ratio: Joi.number().min(0).strict(),
        movie_facebook_likes: Joi.number().integer().min(0).strict(),
        color: Joi.string().regex(/^[a-zA-Z ]+$/, 'Alpha, only spaces and text in').min(3).max(10),
        director_name: Joi.string().regex(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Alpha, only real name in').min(3).max(25)

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



function getMovieSchema(req, res, next) {
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



function getOneMovieSchema(req, res, next) {
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



function deleteOneMoviechema(req, res, next) {
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



// router.get('/movies', (req, res) => {

//     connection.query("SELECT * from movies", (err, rows, fields, result) => {
//         if (err) {
//             console.log(err.message)
//             res.status(500).send('Server Error');

//         }
//         if (rows.length == 0) {
//             return res.status(404).json({ msg: 'No Movies found' })

//         } else {
//             res.status(200).send(rows)
//             // res.status(200).json({movies: rows})

//         }
//     })
// });

// PAGINATION

router.get('/movies', getMovieSchema, (req, res, next) => {



    let count;

    connection.query("SELECT * from movies", (err, result, rows) => {

        if (err) throw err;

        count = result.length
    })


    // limit per page as || 20
    const length = req.query.length
    // page number
    const page = req.query.page

    if (!length || !page) {




        connection.query("SELECT * from movies", (err, rows, fields, result) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');

            }
            if (rows.length == 0) {
                return res.status(404).json({ msg: 'No movies found' })
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
        const prodsQuery = "select * from movies limit " + length + " OFFSET " + offset

        connection.query(prodsQuery, function (error, results, fields) {
            // When done with the connection, release it.
            if (error) throw error;


            if (results.length == 0) {
                res.status(404).json({ "msg": `sorry there is no data in this page number (${page})` })
                next()

            } else {

                // create payload
                var jsonResult = {
                    'count': count,
                    'page_number': page,
                    'length': results.length,
                    'data': results
                }
                // create response
                var myJsonString = JSON.parse(JSON.stringify(jsonResult));
                // res.statusMessage = "Products for page "+page;
                res.statusCode = 200;
                res.json(myJsonString);
                // res.end();
            }
        })
    }
})






router.get('/getMovie/:id', getOneMovieSchema, [
    check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt({ gt: -1 }).withMessage('id must be a real Integer number')
], (req, res, next) => {
    let id = req.params.id;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        let message = errors.array().map(x => x.msg).join(', ')
        return res.status(400).json({ error: message });
    }



    connection.query("SELECT * FROM movies WHERE id = ?", [id], (err, rows, fields, result) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if (rows.length == 0) {
            return res.status(404).json({ msg: 'Movie not found' })
            next()

        } else {
            res.status(200).send(rows[0])
            next()

        }
    })
})





// POST ROUTES





router.post('/addMovie',
    createMovieSchema,
    [
        // check('title', 'Title must be Alpha or alpha and numbers AND not empty').optional().isString(),
        // check('title', 'Title is required').not().isEmpty(),

        body('duration').optional().isInt({ gt: -1 }).withMessage('Duration must be an Integer number and not less than 0'),
        body('duration').optional().not().isString().withMessage('duration must be an Integer number'),

        check('gross').optional().isNumeric({ gt: -1 }).withMessage('gross must be a number and not less than 0'),
        check('gross').optional().not().isString().withMessage('gross must be a number'),

        check('genres').optional().isArray().notEmpty().withMessage('genres must be an array with data'),


        check('num_voted_users').optional().isInt({ gt: -1 }).withMessage('num_voted_users must be an Integer number and not less than 0'),
        check('num_voted_users').optional().not().isString().withMessage('num_voted_users must be an Integer number'),


        check('cast_total_facebook_likes').optional().isInt({ gt: -1 }).withMessage('cast_total_facebook_likes must be an Integer number and not less than 0'),
        check('cast_total_facebook_likes').optional().not().isString().withMessage('cast_total_facebook_likes must be an Integer number'),


        check('plot_keywords').optional().notEmpty().isArray().withMessage('plot_keywords must be an array with data'),


        check('imdb_link').optional().isURL().withMessage('imdb_link must be link'),


        check('num_user_for_reviews').optional().isInt({ gt: -1 }).withMessage('num_user_for_reviews must be an Integer number and not less than 0'),
        check('num_user_for_reviews').optional().not().isString().withMessage('num_user_for_reviews must be an Integer number'),


        check('language', 'language must be Alpha').optional().isAlpha('en-US', { ignore: ' ' }),

        check('country', 'country must be Alpha').optional().isAlpha('en-US', { ignore: ' ' }),

        check('content_rating', 'content_rating must be string').optional().isString(),



        check('budget').optional().isNumeric({ gt: -1 }).withMessage('budget must be a number and not less than 0'),
        check('budget').optional().not().isString().withMessage('budget must be a number'),

        check('title_year').optional().isInt({ min: 1900, max: 2022 }).withMessage('title_year must be a real year between( 1990 - 2022)'),




        check('imdb_score').optional().isNumeric({ gt: -1 }).withMessage('imdb_score must be a number and not less than 0'),
        check('imdb_score').optional().not().isString().withMessage('imdb_score must be a number'),

        check('aspect_ratio').optional().isNumeric({ gt: -1 }).withMessage('aspect_ratio must be a number and not less than 0'),
        check('aspect_ratio').optional().not().isString().withMessage('aspect_ratio must be a number'),



        check('movie_facebook_likes').optional().isInt({ gt: -1 }).withMessage('movie_facebook_likes must be an Integer number and not less than 0'),
        check('movie_facebook_likes').optional().not().isString().withMessage('movie_facebook_likes must be an Integer number'),


        check('color', 'color must be Alpha').optional().isAlpha('en-US', { ignore: ' ' })

        // check('director_id').optional().not().isString().withMessage('director_id must be an Integer number')


        // ,check('director_id').not().isEmpty().withMessage('you must identify director_id'),
        // check('director_id').optional().isInt().withMessage('director_id must be an Integer number')

        , check('director_name', 'director_name is required').not().isEmpty(),
        check('director_name', 'director_name must be Alpha AND not empty').optional().isString()





    ],

    (req, res, next) => {






        let title = req.body.title;
        let duration
        req.body.duration ? duration = req.body.duration : duration = 0
        let gross
        req.body.gross ? gross = req.body.gross : gross = 0
        let genres = JSON.stringify(req.body.genres);
        let num_voted_users
        req.body.num_voted_users ? num_voted_users = req.body.num_voted_users : num_voted_users = 0
        let cast_total_facebook_likes
        req.body.cast_total_facebook_likes ? cast_total_facebook_likes = req.body.cast_total_facebook_likes : cast_total_facebook_likes = 0
        let plot_keywords = JSON.stringify(req.body.plot_keywords);
        let imdb_link = req.body.imdb_link;
        let num_user_for_reviews
        req.body.num_user_for_reviews ? num_user_for_reviews = req.body.num_user_for_reviews : num_user_for_reviews = 0
        let language = req.body.language;
        let country = req.body.country;
        let content_rating = req.body.content_rating;
        let budget
        req.body.budget ? budget = req.body.budget : budget = 0
        let title_year = req.body.title_year;
        let imdb_score
        req.body.imdb_score ? imdb_score = req.body.imdb_score : imdb_score = 0
        let aspect_ratio
        req.body.aspect_ratio ? aspect_ratio = req.body.aspect_ratio : aspect_ratio = 0
        let movie_facebook_likes
        req.body.movie_facebook_likes ? movie_facebook_likes = req.body.movie_facebook_likes : movie_facebook_likes = 0
        // let actors = JSON.stringify(req.body.actors);
        let color = req.body.color;
        // let director_id = req.body.director_id;
        let director_name = req.body.director_name;
        let arr = []


        let obj = {
            Status: 'Movie Created Successfully',
            Data: req.body
        };


        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let message = errors.array().map(x => x.msg).join(', ')
            return res.status(400).json({ error: message });
        }






        connection.query("SELECT * from  movies where title = ? ", [title], (err, result, rows, fields) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');

            }

            if (result.length == 0) {

                connection.query("SELECT * from  directors where name = ? ", [director_name], (err, result, rows, fields) => {
                    if (err) {
                        console.log(err.message)
                        res.status(500).send('Server Error');

                    }

                    if (result.length == 0) {

                        return res.status(400).json({ msg: 'the Director with the name that you have entered is not exist' })
                        next()


                    } else {





                        connection.query("INSERT INTO movies \
        (title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director_id, director_name) \
         VALUES \
         (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,(SELECT id FROM directors WHERE name = ? LIMIT 1),?)",
                            [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director_name, director_name], function (err, result) {
                                if (err) {
                                    console.log(err.message)
                                    res.status(500).send('Server Error');

                                }

                                console.log(obj)
                                res.status(201).json(obj);
                                next()


                            })



                        function create(arr) {
                            return new Promise((resolve, reject) => {



                                connection.query("SELECT movies from directors WHERE name = ? ", [director_name], (err, result, rows, fields) => {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log('rows out', rows)
                                    console.log('result out', result)
                                    console.log('field out', fields)


                                    if (result[0].movies) {

                                        //   console.log("REsult", result)



                                        console.log("All RESULT$ ", result)
                                        console.log("RESULT[0].ACTORS$ ", result[0].movies)
                                        let data = JSON.parse(result[0].movies);
                                        let y;
                                        for (let x in data) {
                                            y = arr.push(data[x])
                                        }
                                        return y



                                    }

                                })


                                connection.query("SELECT title from movies WHERE title = ? ", [title], (err, result, rows, fields) => {
                                    if (err) {
                                        reject(err);
                                    }
                                    arr.push(result[0]?.title)
                                    resolve()
                                })
                            })

                        }




                        function get() {
                            console.log('arr', arr)
                            movies = JSON.stringify(arr)

                            connection.query("UPDATE directors SET movies = ? WHERE name = ? ", [movies, director_name], (err, result, rows, fields) => {
                                if (err) throw err;
                            })

                        }

                        create(arr).then(get).catch(err => console.log(err))






                    }
                });

            } else {
                return res.status(400).json({ msg: 'Movie already exists' })
                next()


            }



        })







    })





// PUT ROUTES - Must fill all the data to not come null

// router.put('/editMovie/:id',

//     [


//         check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt({ gt: -1 }).withMessage('id must be a real Integer number'),

//         check('title', 'Title must be Alpha or alpha and numbers AND not empty').optional().isString(),
//         check('title', 'Title is required').not().isEmpty(),

//         body('duration').optional().isInt({ gt: -1 }).withMessage('Duration must be an Integer number and not less than 0'),
//         body('duration').optional().not().isString().withMessage('duration must be an Integer number'),

//         check('gross').optional().isNumeric({ gt: -1 }).withMessage('gross must be a number and not less than 0'),
//         check('gross').optional().not().isString().withMessage('gross must be a number'),


//         check('genres').optional().not().isEmpty().withMessage('genres must be an array with data'),
//         check('genres').optional().isArray().notEmpty().withMessage('genres must be an array with data'),

//         check('num_voted_users').optional().isInt({ gt: -1 }).withMessage('num_voted_users must be an Integer number and not less than 0'),
//         check('num_voted_users').optional().not().isString().withMessage('num_voted_users must be an Integer number'),


//         check('cast_total_facebook_likes').optional().isInt({ gt: -1 }).withMessage('cast_total_facebook_likes must be an Integer number and not less than 0'),
//         check('cast_total_facebook_likes').optional().not().isString().withMessage('cast_total_facebook_likes must be an Integer number'),

//         check('plot_keywords').optional().not().isEmpty().withMessage('plot_keywords must be an array with data'),
//         check('plot_keywords').optional().notEmpty().isArray().withMessage('plot_keywords must be an array with data'),

//         check('imdb_link').optional().isURL().withMessage('imdb_link must be link'),


//         check('num_user_for_reviews').optional().isInt({ gt: -1 }).withMessage('num_user_for_reviews must be an Integer number and not less than 0'),
//         check('num_user_for_reviews').optional().not().isString().withMessage('num_user_for_reviews must be an Integer number'),


//         check('language', 'language must be Alpha').optional().isAlpha('en-US', { ignore: ' ' }),

//         check('country', 'country must be Alpha').optional().isAlpha('en-US', { ignore: ' ' }),

//         check('content_rating', 'content_rating must be string').optional().isString(),



//         check('budget').optional().isNumeric({ gt: -1 }).withMessage('budget must be a number and not less than 0'),
//         check('budget').optional().not().isString().withMessage('budget must be a number'),

//         check('title_year').optional().isInt({ min: 1900, max: 2022 }).withMessage('title_year must be a real year between( 1990 - 2022)'),




//         check('imdb_score').optional().isNumeric({ gt: -1 }).withMessage('imdb_score must be a number and not less than 0'),
//         check('imdb_score').optional().not().isString().withMessage('imdb_score must be a number'),

//         check('aspect_ratio').optional().isNumeric({ gt: -1 }).withMessage('aspect_ratio must be a number and not less than 0'),
//         check('aspect_ratio').optional().not().isString().withMessage('aspect_ratio must be a number'),



//         check('movie_facebook_likes').optional().isInt({ gt: -1 }).withMessage('movie_facebook_likes must be an Integer number and not less than 0'),
//         check('movie_facebook_likes').optional().not().isString().withMessage('movie_facebook_likes must be an Integer number'),


//         check('color', 'color must be Alpha').optional().isAlpha('en-US', { ignore: ' ' }),

//         check('director_id').optional().not().isString().withMessage('director_id must be an Integer number'),


//         check('director_id').not().isEmpty().withMessage('you must identify director_id'),
//         check('director_id').optional().isInt().withMessage('director_id must be an Integer number')


//     ]
//     , (req, res) => {


//         let id = req.params.id
//         let title = req.body.title;
//         let duration
//         req.body.duration ? duration = req.body.duration : duration = 0
//         let gross
//         req.body.gross ? gross = req.body.gross : gross = 0
//         let genres = JSON.stringify(req.body.genres);
//         let num_voted_users
//         req.body.num_voted_users ? num_voted_users = req.body.num_voted_users : num_voted_users = 0
//         let cast_total_facebook_likes
//         req.body.cast_total_facebook_likes ? cast_total_facebook_likes = req.body.cast_total_facebook_likes : cast_total_facebook_likes = 0
//         let plot_keywords = JSON.stringify(req.body.plot_keywords);
//         let imdb_link = req.body.imdb_link;
//         let num_user_for_reviews
//         req.body.num_user_for_reviews ? num_user_for_reviews = req.body.num_user_for_reviews : num_user_for_reviews = 0
//         let language = req.body.language;
//         let country = req.body.country;
//         let content_rating = req.body.content_rating;
//         let budget
//         req.body.budget ? budget = req.body.budget : budget = 0
//         let title_year = req.body.title_year;
//         let imdb_score
//         req.body.imdb_score ? imdb_score = req.body.imdb_score : imdb_score = 0
//         let aspect_ratio
//         req.body.aspect_ratio ? aspect_ratio = req.body.aspect_ratio : aspect_ratio = 0
//         let movie_facebook_likes
//         req.body.movie_facebook_likes ? movie_facebook_likes = req.body.movie_facebook_likes : movie_facebook_likes = 0
//         // let actors = JSON.stringify(req.body.actors);
//         let color = req.body.color;
//         let director_id = req.body.director_id;

//         let obj = {
//             Status: 'Movie Updated Successfully',
//             Data: req.body
//         };



//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
//         }


//         connection.query(`SELECT * FROM movies WHERE id = ${id}`,
//             function (err, result) {
//                 if (err) {
//                     console.log(err.message)
//                     res.status(500).send('Server Error');

//                 }


//                 if (result.length == 0) {
//                     res.status(204).json({ msg: 'Movie is not exist' })

//                 } else if (req.body.director_id) {


//                     connection.query("SELECT * from  directors where id = ? ", [director_id], (err, result) => {
//                         if (err) {
//                             console.log(err.message)
//                             res.status(500).send('Server Error');

//                         }

//                         if (result.length == 0) {
//                             return res.status(204).json({ msg: 'please add a valid related id for directors' })
//                         } else {






//                             connection.query("SELECT * from  movies where title = ? AND id != ? ", [title, id], (err, result) => {
//                                 if (err) {
//                                     console.log(err.message)
//                                     res.status(500).send('Server Error');

//                                 }

//                                 if (result.length == 0) {



//                                     connection.query("UPDATE movies SET \
//     title = ?, duration = ?, gross = ?, genres = ?, num_voted_users = ?, cast_total_facebook_likes = ?, plot_keywords = ?, imdb_link = ?, num_user_for_reviews = ?, language = ?, country = ?, content_rating = ?, budget = ?, title_year = ?, imdb_score = ?, aspect_ratio = ?, movie_facebook_likes = ?,  color = ?, director_id = ? WHERE movies.id = ?" ,
//                                         [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director_id, id], function (err, result) {
//                                             if (err) {
//                                                 console.log(err);

//                                             }
//                                             console.log(obj)
//                                             res.status(200).json(obj)
//                                         })



//                                 } else {
//                                     return res.status(400).json({ msg: 'Movie with that title already exists' })

//                                 }

//                             })
//                         }
//                     })

//                 }
//             })




//     });



// PUT ROUTES -  No need to fill all the data to update some fields









router.put('/editMovie/:id',
    editMovieSchemaId,
    editMovieSchema,

    [



        // check('title', 'Title must be Alpha or alpha and numbers AND not empty').optional().isString(),
        // check('title', 'Title is required').optional().not().isEmpty(),

        body('duration').optional().isInt({ gt: -1 }).withMessage('Duration must be an Integer number and not less than 0'),
        body('duration').optional().not().isString().withMessage('duration must be an Integer number'),

        check('gross').optional().isNumeric({ gt: -1 }).withMessage('gross must be a number and not less than 0'),
        check('gross').optional().not().isString().withMessage('gross must be a number'),

        check('genres').optional().not().isEmpty().withMessage('genres must be an array with data'),
        check('genres').optional().isArray().notEmpty().withMessage('genres must be an array with data'),


        check('num_voted_users').optional().isInt({ gt: -1 }).withMessage('num_voted_users must be an Integer number and not less than 0'),
        check('num_voted_users').optional().not().isString().withMessage('num_voted_users must be an Integer number'),


        check('cast_total_facebook_likes').optional().isInt({ gt: -1 }).withMessage('cast_total_facebook_likes must be an Integer number and not less than 0'),
        check('cast_total_facebook_likes').optional().not().isString().withMessage('cast_total_facebook_likes must be an Integer number'),

        check('plot_keywords').optional().not().isEmpty().withMessage('plot_keywords must be an array with data'),
        check('plot_keywords').optional().notEmpty().isArray().withMessage('plot_keywords must be an array with data'),

        check('imdb_link').optional().isURL().withMessage('imdb_link must be link'),


        check('num_user_for_reviews').optional().isInt({ gt: -1 }).withMessage('num_user_for_reviews must be an Integer number and not less than 0'),
        check('num_user_for_reviews').optional().not().isString().withMessage('num_user_for_reviews must be an Integer number'),


        check('language', 'language must be Alpha').optional().isAlpha('en-US', { ignore: ' ' }),

        check('country', 'country must be Alpha').optional().isAlpha('en-US', { ignore: ' ' }),

        check('content_rating', 'content_rating must be string').optional().isString(),



        check('budget').optional().isNumeric({ gt: -1 }).withMessage('budget must be a number and not less than 0'),
        check('budget').optional().not().isString().withMessage('budget must be a number'),

        check('title_year').optional().isInt({ min: 1900, max: 2022 }).withMessage('title_year must be a real year between( 1990 - 2022)'),




        check('imdb_score').optional().isNumeric({ gt: -1 }).withMessage('imdb_score must be a number and not less than 0'),
        check('imdb_score').optional().not().isString().withMessage('imdb_score must be a number'),

        check('aspect_ratio').optional().isNumeric({ gt: -1 }).withMessage('aspect_ratio must be a number and not less than 0'),
        check('aspect_ratio').optional().not().isString().withMessage('aspect_ratio must be a number'),



        check('movie_facebook_likes').optional().isInt({ gt: -1 }).withMessage('movie_facebook_likes must be an Integer number and not less than 0'),
        check('movie_facebook_likes').optional().not().isString().withMessage('movie_facebook_likes must be an Integer number'),


        check('color', 'color must be Alpha').optional().isAlpha('en-US', { ignore: ' ' }),

        // check('director_id').optional().not().isString().withMessage('director_id must be an Integer number'),
        // check('director_id').optional().isInt().withMessage('director_id must be an Integer number')

        check('director_name', 'director_name must be Alpha AND not empty').optional().isString()


    ],
    (req, res, next) => {


        let id = req.params.id
        let title;
        let duration
        let gross
        let genres
        let num_voted_users
        let cast_total_facebook_likes
        let plot_keywords
        let imdb_link
        let num_user_for_reviews
        let language
        let country
        let content_rating
        let budget
        let title_year
        let imdb_score
        let aspect_ratio
        let movie_facebook_likes
        let color
        let director_id
        let director_name
        let dir_name
        let arr = [];
        let newarr = [];
        let arr1 = [];
        let obj = {
            Status: 'Movie Updated Successfully',
            Data: { "title": title, "duration": duration, "gross": gross, "num_voted_users": num_voted_users, "cast_total_facebook_likes": cast_total_facebook_likes, "plot_keywords": plot_keywords, "imdb_link": imdb_link, "num_user_for_reviews": num_user_for_reviews, "language": language, "country": country, "content_rating": content_rating, "budget": budget, "title_year": title_year, "imdb_score": imdb_score, "aspect_ratio": aspect_ratio, "movie_facebook_likes": movie_facebook_likes, "color": color, "director_id": director_id }
        };

        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let message = errors.array().map(x => x.msg).join(', ')
            return res.status(400).json({ error: message });
        }

        connection.query(`SELECT * FROM movies WHERE id = ${id}`,
            function (err, result) {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');

                }

                if (result.length == 0) {
                    res.status(404).json({ msg: 'Movie is not exist' })
                    next()

                } else {

                    req.body.title ? title = req.body.title : title = result[0].title
                    req.body.duration ? duration = req.body.duration : duration = result[0].duration
                    req.body.gross ? gross = req.body.gross : gross = result[0].gross
                    req.body.genres ? genres = JSON.stringify(req.body.genres) : genres = result[0].genres
                    req.body.num_voted_users ? num_voted_users = req.body.num_voted_users : num_voted_users = result[0].num_voted_users
                    req.body.cast_total_facebook_likes ? cast_total_facebook_likes = req.body.cast_total_facebook_likes : cast_total_facebook_likes = result[0].cast_total_facebook_likes
                    req.body.plot_keywords ? plot_keywords = JSON.stringify(req.body.plot_keywords) : plot_keywords = result[0].plot_keywords
                    req.body.imdb_link ? imdb_link = req.body.imdb_link : imdb_link = result[0].imdb_link
                    req.body.num_user_for_reviews ? num_user_for_reviews = req.body.num_user_for_reviews : num_user_for_reviews = result[0].num_user_for_reviews
                    req.body.language ? language = req.body.language : language = result[0].language
                    req.body.country ? country = req.body.country : country = result[0].country
                    req.body.content_rating ? content_rating = req.body.content_rating : content_rating = result[0].content_rating
                    req.body.budget ? budget = req.body.budget : budget = result[0].budget
                    req.body.title_year ? title_year = req.body.title_year : title_year = result[0].title_year
                    req.body.imdb_score ? imdb_score = req.body.imdb_score : imdb_score = result[0].imdb_score
                    req.body.aspect_ratio ? aspect_ratio = req.body.aspect_ratio : aspect_ratio = result[0].aspect_ratio
                    req.body.movie_facebook_likes ? movie_facebook_likes = req.body.movie_facebook_likes : movie_facebook_likes = result[0].movie_facebook_likes
                    req.body.color ? color = req.body.color : color = result[0].color
                    director_id = result[0].director_id
                    req.body.director_name ? director_name = req.body.director_name : director_name = result[0].director_name

                    let previousDirectorName = result[0].director_name;
                    let previousTitleName = result[0].title;
                    let prevTitleJson = JSON.stringify(result[0].title)
                    console.log(prevTitleJson)


                    let obj = {
                        Status: 'Movie Updated Successfully',
                        Data: req.body
                    };


                    if (req.body.title) {
                        connection.query("select * from movies where title = ? AND id != ?", [title, id], function (err, result) {
                            if (err) throw err;
                            if (result.length !== 0) {
                                return res.status(400).json({ msg: 'please add a new title, this movie already exists' })
                                next()

                            } else {
                                if (req.body.director_name) {

                                    connection.query("SELECT * from directors WHERE name = ?",
                                        [director_name], function (err, result) {
                                            if (err) {
                                                console.log(err.message)
                                                return res.status(500).send('Server Error');

                                            }
                                            console.log("resultttt", result)


                                            if (result.length !== 0) {
                                                let dir_id = result[0].id

                                                connection.query("UPDATE movies SET \
                                            title = ?, duration = ?, gross = ?, genres = ?, num_voted_users = ?, cast_total_facebook_likes = ?, plot_keywords = ?, imdb_link = ?, num_user_for_reviews = ?, language = ?, country = ?, content_rating = ?, budget = ?, title_year = ?, imdb_score = ?, aspect_ratio = ?, movie_facebook_likes = ?, color = ?, director_id = ?, director_name = ? WHERE movies.id = ?" ,
                                                    [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, dir_id, director_name, id], function (err, result) {
                                                        if (err) {
                                                            console.log(err.message)
                                                            return res.status(500).send('Server Error');

                                                        }
                                                        // onsole.log(obj)
                                                        res.status(200).json(obj)

                                                        next()
                                                        

                                                        if (previousDirectorName !== director_name && previousTitleName !== title) {


                                                            function create(arr) {
                                                                return new Promise((resolve, reject) => {


                                                                    dir_name = previousDirectorName;
                                                                    console.log("previuoussdsdsd", dir_name)


                                                                    connection.query("SELECT movies from directors WHERE name = ? ", [dir_name], (err, result, rows, fields) => {
                                                                        if (err) {
                                                                            throw err;
                                                                        }


                                                                        if (result[0].movies) {

                                                                            let datanew = JSON.parse(result[0].movies);
                                                                            let y;
                                                                            for (let x in datanew) {
                                                                                y = arr.push(datanew[x])
                                                                            }
                                                                            console.log("bre arr",arr)


                                                                            resolve(
                                                                                newarr = arr.filter(function (ele) {
                                                                                    return ele != previousTitleName;
                                                                                }))




                                                                        }



                                                                    })










                                                                })


                                                            }




                                                            function get() {


                                                                moviess = JSON.stringify(newarr)
                                                                console.log("in get previous", dir_name)
                                                                console.log("in get new arr", newarr)
                                                                console.log("mivuesssss", moviess)



                                                                connection.query("UPDATE directors SET movies = ? WHERE name = ? ", [moviess, dir_name], (err, result, rows, fields) => {
                                                                    if (err) throw err;
                                                                    console.log("hoon")

                                                                })

                                                            

                                                            }

                                                            create(arr).then(get).catch(err => console.log(err));









                                                            function create1(arr1) {
                                                                return new Promise((resolve, reject) => {



                                                                    connection.query("SELECT movies from directors WHERE name = ? ", [director_name], (err, result, rows, fields) => {
                                                                        if (err) {
                                                                            throw err;
                                                                        }

                                                                        console.log("Result movies", result[0].movies)


                                                                        if (result[0].movies) {

                                                                            let dataq = JSON.parse(result[0].movies);
                                                                            let j;
                                                                            for (let x in dataq) {
                                                                                j = arr1.push(dataq[x])
                                                                            }
                                                                            return j



                                                                        }

                                                                    })



                                                                    connection.query("SELECT title from movies WHERE title = ? ", [title], (err, result, rows, fields) => {
                                                                        if (err) {
                                                                            reject(err);
                                                                        }
                                                                        resolve(arr1.push(result[0]?.title))
                                                                       
                                                                    })
                                                                })

                                                            }




                                                            function get1() {
                                                                console.log("arr1",arr1)

                                                                movies = JSON.stringify(arr1)

                                                                connection.query("UPDATE directors SET movies = ? WHERE name = ? ", [movies, director_name], (err, result, rows, fields) => {
                                                                    if (err) throw err;
                                                                    console.log("mesh hoon")
                                                                })

                                                            }

                                                            create1(arr1).then(get1).catch(err => console.log(err))


                                                        } else if (previousDirectorName == director_name && previousTitleName !== title) {

                                                            //


                                                            function create(arr) {
                                                                return new Promise((resolve, reject) => {


                                                                    dir_name = previousDirectorName;
                                                                    console.log("previuoussdsdsd", dir_name)


                                                                    connection.query("SELECT movies from directors WHERE name = ? ", [dir_name], (err, result, rows, fields) => {
                                                                        if (err) {
                                                                            throw err;
                                                                        }


                                                                        if (result[0].movies) {

                                                                            let datanew = JSON.parse(result[0].movies);
                                                                            let y;
                                                                            for (let x in datanew) {
                                                                                y = arr.push(datanew[x])
                                                                            }
                                                                            console.log("bre arr",arr)


                                                                            
                                                                                newarr = arr.filter(function (ele) {
                                                                                    return ele != previousTitleName;
                                                                                })



                                                                                resolve(newarr.push(title))



                                                                        }

                                                                    })

                                                                })


                                                            }




                                                            function get() {


                                                                moviess = JSON.stringify(newarr)
                                                                console.log("in get previous", dir_name)
                                                                console.log("in get new arr", newarr)
                                                                console.log("mivuesssss", moviess)



                                                                connection.query("UPDATE directors SET movies = ? WHERE name = ? ", [moviess, dir_name], (err, result, rows, fields) => {
                                                                    if (err) throw err;
                                                                    console.log("hoon")

                                                                })

                                                            

                                                            }

                                                            create(arr).then(get).catch(err => console.log(err));




                                                        } else if (previousDirectorName !== director_name && previousTitleName == title) {

                                                            //



                                                            function create(arr) {
                                                                return new Promise((resolve, reject) => {


                                                                    dir_name = previousDirectorName;
                                                                    console.log("previuoussdsdsd", dir_name)


                                                                    connection.query("SELECT movies from directors WHERE name = ? ", [dir_name], (err, result, rows, fields) => {
                                                                        if (err) {
                                                                            throw err;
                                                                        }


                                                                        if (result[0].movies) {

                                                                            let datanew = JSON.parse(result[0].movies);
                                                                            let y;
                                                                            for (let x in datanew) {
                                                                                y = arr.push(datanew[x])
                                                                            }
                                                                            console.log("bre arr",arr)


                                                                            resolve(
                                                                                newarr = arr.filter(function (ele) {
                                                                                    return ele != previousTitleName;
                                                                                }))




                                                                        }



                                                                    })










                                                                })


                                                            }




                                                            function get() {


                                                                moviess = JSON.stringify(newarr)
                                                                console.log("in get previous", dir_name)
                                                                console.log("in get new arr", newarr)
                                                                console.log("mivuesssss", moviess)



                                                                connection.query("UPDATE directors SET movies = ? WHERE name = ? ", [moviess, dir_name], (err, result, rows, fields) => {
                                                                    if (err) throw err;
                                                                    console.log("hoon")

                                                                })

                                                            

                                                            }

                                                            create(arr).then(get).catch(err => console.log(err));









                                                            function create1(arr1) {
                                                                return new Promise((resolve, reject) => {



                                                                    connection.query("SELECT movies from directors WHERE name = ? ", [director_name], (err, result, rows, fields) => {
                                                                        if (err) {
                                                                            throw err;
                                                                        }

                                                                        console.log("Result movies", result[0].movies)


                                                                        if (result[0].movies) {

                                                                            let dataq = JSON.parse(result[0].movies);
                                                                            let j;
                                                                            for (let x in dataq) {
                                                                                j = arr1.push(dataq[x])
                                                                            }
                                                                            return j



                                                                        }

                                                                    })



                                                                    connection.query("SELECT title from movies WHERE title = ? ", [title], (err, result, rows, fields) => {
                                                                        if (err) {
                                                                            reject(err);
                                                                        }
                                                                        resolve(arr1.push(result[0]?.title))
                                                                       
                                                                    })
                                                                })

                                                            }




                                                            function get1() {
                                                                console.log("arr1",arr1)

                                                                movies = JSON.stringify(arr1)

                                                                connection.query("UPDATE directors SET movies = ? WHERE name = ? ", [movies, director_name], (err, result, rows, fields) => {
                                                                    if (err) throw err;
                                                                    console.log("mesh hoon")
                                                                })

                                                            }

                                                            create1(arr1).then(get1).catch(err => console.log(err))






                                                        }




                                                    });

                                            } else {
                                                return res.status(400).json({ msg: 'the Director with the director_name that you have entered is not exist' })
                                                next()


                                            }




                                        });


                                } else {




                                    connection.query("UPDATE movies SET \
                title = ?, duration = ?, gross = ?, genres = ?, num_voted_users = ?, cast_total_facebook_likes = ?, plot_keywords = ?, imdb_link = ?, num_user_for_reviews = ?, language = ?, country = ?, content_rating = ?, budget = ?, title_year = ?, imdb_score = ?, aspect_ratio = ?, movie_facebook_likes = ?, color = ?, director_id = ?, director_name = ? WHERE movies.id = ?" ,
                                        [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director_id, director_name, id], function (err, result) {
                                            if (err) {
                                                console.log(err.message)
                                                return res.status(500).send('Server Error');

                                            }



                                            let arre = [];
                                            let newarre = [];



                                            connection.query("SELECT * from directors WHERE JSON_CONTAINS(movies, ?)  ", [prevTitleJson], (err, result, rows, fields) => {
                                                if (err) throw err;


                                                if (result.length !== 0) {



                                                    let cuurentDirectorID = result[0].id
                                                    console.log(cuurentDirectorID)

                                                    function createe() {
                                                        return new Promise((resolve, reject) => {


                                                            let datanew = JSON.parse(result[0].movies);
                                                            let y;
                                                            for (let x in datanew) {
                                                                y = arre.push(datanew[x])
                                                            }


                                                            newarre = arre.filter(function (ele) {
                                                                return ele != previousTitleName;
                                                            })

                                                            resolve(newarre.push(title))


                                                        });

                                                    }



                                                    function gett() {
                                                        moviesssss = JSON.stringify(newarre)
                                                        connection.query("UPDATE directors SET movies = ? WHERE id = ? ", [moviesssss, cuurentDirectorID], (err, result, rows, fields) => {
                                                            if (err) throw err;
                                                        })

                                                    }


                                                }


                                                createe(arre).then(gett).catch(err => console.log(err))




                                            })

                                            console.log(obj)
                                            res.status(200).json(obj)
                                            next()

                                        });
                                }
                            }
                        })
                    }

                    if (!req.body.title) {

                        if (req.body.director_name) {

                            connection.query("SELECT * from directors WHERE name = ?",
                                [director_name], function (err, result) {
                                    if (err) {
                                        console.log(err.message)
                                        return res.status(500).send('Server Error');

                                    }
                                    console.log("resultttt", result)


                                    if (result.length !== 0) {
                                        let dir_id = result[0].id


                                        connection.query("UPDATE movies SET \
                                        title = ?, duration = ?, gross = ?, genres = ?, num_voted_users = ?, cast_total_facebook_likes = ?, plot_keywords = ?, imdb_link = ?, num_user_for_reviews = ?, language = ?, country = ?, content_rating = ?, budget = ?, title_year = ?, imdb_score = ?, aspect_ratio = ?, movie_facebook_likes = ?, color = ?, director_id = ?, director_name = ? WHERE movies.id = ?" ,
                                            [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, dir_id, director_name, id], function (err, result) {
                                                if (err) {
                                                    console.log(err.message)
                                                    return res.status(500).send('Server Error');

                                                }
                                                // onsole.log(obj)
                                                res.status(200).json(obj)
                                                next()


                                                if (previousDirectorName !== director_name) {


                                                    function create(arr) {
                                                        return new Promise((resolve, reject) => {


                                                            dir_name = previousDirectorName;
                                                            console.log("previuoussdsdsd", dir_name)


                                                            connection.query("SELECT movies from directors WHERE name = ? ", [dir_name], (err, result, rows, fields) => {
                                                                if (err) {
                                                                    throw err;
                                                                }


                                                                if (result[0].movies) {

                                                                    let datanew = JSON.parse(result[0].movies);
                                                                    let y;
                                                                    for (let x in datanew) {
                                                                        y = arr.push(datanew[x])
                                                                    }


                                                                    resolve(
                                                                        newarr = arr.filter(function (ele) {
                                                                            return ele != title;
                                                                        }))




                                                                }



                                                            })










                                                        })


                                                    }




                                                    function get() {


                                                        moviess = JSON.stringify(newarr)
                                                        console.log("in get previous", dir_name)
                                                        console.log("in get new arr", newarr)


                                                        connection.query("UPDATE directors SET movies = ? WHERE name = ? ", [moviess, dir_name], (err, result, rows, fields) => {
                                                            if (err) throw err;

                                                        })

                                                    }

                                                    create(arr).then(get).catch(err => console.log(err));












                                                    function create1(arr1) {
                                                        return new Promise((resolve, reject) => {



                                                            connection.query("SELECT movies from directors WHERE name = ? ", [director_name], (err, result, rows, fields) => {
                                                                if (err) {
                                                                    throw err;
                                                                }


                                                                if (result[0].movies) {

                                                                    let data = JSON.parse(result[0].movies);
                                                                    let j;
                                                                    for (let x in data) {
                                                                        j = arr1.push(data[x])
                                                                    }
                                                                    return j



                                                                }

                                                            })


                                                            connection.query("SELECT title from movies WHERE title = ? ", [title], (err, result, rows, fields) => {
                                                                if (err) {
                                                                    reject(err);
                                                                }
                                                                arr1.push(result[0]?.title)
                                                                resolve()
                                                            })
                                                        })

                                                    }




                                                    function get1() {
                                                        movies = JSON.stringify(arr1)

                                                        connection.query("UPDATE directors SET movies = ? WHERE name = ? ", [movies, director_name], (err, result, rows, fields) => {
                                                            if (err) throw err;
                                                        })

                                                    }

                                                    create1(arr1).then(get1).catch(err => console.log(err))


                                                }

                                            });

                                    } else {
                                        return res.status(400).json({ msg: 'the Director with the director_name that you have entered is not exist' })
                                        next()


                                    }




                                });


                        } else {




                            connection.query("UPDATE movies SET \
                            title = ?, duration = ?, gross = ?, genres = ?, num_voted_users = ?, cast_total_facebook_likes = ?, plot_keywords = ?, imdb_link = ?, num_user_for_reviews = ?, language = ?, country = ?, content_rating = ?, budget = ?, title_year = ?, imdb_score = ?, aspect_ratio = ?, movie_facebook_likes = ?, color = ?, director_id = ?, director_name = ? WHERE movies.id = ?" ,
                                [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director_id, director_name, id], function (err, result) {
                                    if (err) {
                                        console.log(err.message)
                                        return res.status(500).send('Server Error');

                                    }



                                    console.log(obj)
                                    res.status(200).json(obj)
                                    next()

                                });
                        }
                    }
                }

            });





    });



// DELETE ROUTES



router.delete('/deleteMovie/:id', deleteOneMoviechema, [check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt({ gt: -1 }).withMessage('id must be a real Integer number')], (req, res, next) => {
    let id = req.params.id;
    let arr = [];
    let newarr = []
    let dir_name;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        let message = errors.array().map(x => x.msg).join(', ')
        return res.status(400).json({ error: message });
    }



    connection.query("Select * FROM movies WHERE id = ?", [id], (err, result, rows) => {
        if (result.length == 0) {
            return res.status(404).json({ msg: 'Movie not found' })
            next()

        } else {






            function create(arr) {
                return new Promise((resolve, reject) => {


                    connection.query("SELECT director_name from movies WHERE id = ? ", [id], (err, result, rows, fields) => {
                        if (err) {
                            reject(err);
                        }
                        console.log("result directors", result)

                        if (result[0].director_name) {
                            console.log(result[0].director_name)


                            dir_name = result[0].director_name;


                        }




                        console.log("out ", dir_name)




                        connection.query("SELECT movies from directors WHERE name = ? ", [dir_name], (err, result, rows, fields) => {
                            if (err) {
                                throw err;
                            }
                            // console.log('rows out', rows)
                            // console.log('result out', result)
                            // console.log('field out', fields)


                            if (result[0].movies) {

                                //   console.log("REsult", result)



                                // console.log("All RESULT$ ", result)
                                // console.log("RESULT[0].movies$ ", result[0].movies)
                                let data = JSON.parse(result[0].movies);
                                let y;
                                for (let x in data) {
                                    y = arr.push(data[x])
                                }
                                return y



                            }

                        })


                        connection.query("SELECT title from movies WHERE id = ? ", [id], (err, result, rows, fields) => {
                            if (err) {
                                reject(err);
                            }
                            // console.log("title result", result)
                            // console.log("title rows", rows)

                            // console.log("aasdasdsarr",arr)


                            //       return   arr.filter(function(ele){ 
                            //   return ele != result[0].title; 
                            //     });



                            resolve(
                                newarr = arr.filter(function (ele) {
                                    return ele != result[0].title;
                                }))
                        })
                        // console.log("newARr",arr)



                    })
                })


            }




            function get() {
                console.log('newarr', newarr)
                console.log('director name', dir_name)

                movies = JSON.stringify(newarr)

                connection.query("UPDATE directors SET movies = ? WHERE name = ? ", [movies, dir_name], (err, result, rows, fields) => {
                    if (err) throw err;

                    connection.query("DELETE FROM movies WHERE id = ?", [id], (err, result) => {
                        if (err) {
                            console.log(err.message)
                            res.status(500).send('Server Error');

                        }
                        res.status(200).json({ msg: 'Movie removed' })
                        next()
                    })
                })

            }

            create(arr).then(get).catch(err => console.log(err))




        }
    })




})




module.exports = router;

