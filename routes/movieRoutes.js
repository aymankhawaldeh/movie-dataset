const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
var connection = require('../database')






// GET ROUTES



router.get('/movies', (req, res) => {

    connection.query("SELECT * from movies", (err, rows, fields, result) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if (rows.length == 0) {
            return res.status(404).json({ msg: 'No Movies found' })

        } else {
            res.status(200).send(rows)
            // res.status(200).json({movies: rows})

        }
    })
});




router.get('/getMovie/:id', [check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt().withMessage('id must be an Integer number')], (req, res) => {
    let id = req.params.id;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    connection.query("SELECT * FROM movies WHERE id = ?", [id], (err, rows, fields, result) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        if (rows.length == 0) {
            return res.status(404).json({ msg: 'Movie not found' })

        } else {
            res.status(200).send(rows[0])
        }
    })
})





// POST ROUTES


router.post('/addMovie',
    [
        check('title', 'Title must be Alpha or alpha and numbers AND not empty').isString(),
        check('title', 'Title is required').not().isEmpty(),

        check('duration').isInt({ gt: -1 }).withMessage('Duration must be an Integer number and not less than 0'),
        check('duration').not().isString().withMessage('duration must be an Integer number'),

        check('gross').isNumeric({ gt: -1 }).withMessage('gross must be a number and not less than 0'),
        check('gross').not().isString().withMessage('gross must be a number'),

        check('genres').isArray().withMessage('genres must be an array'),

        check('num_voted_users').isInt({ gt: -1 }).withMessage('num_voted_users must be an Integer number and not less than 0'),
        check('num_voted_users').not().isString().withMessage('num_voted_users must be an Integer number'),


        check('cast_total_facebook_likes').isInt({ gt: -1 }).withMessage('cast_total_facebook_likes must be an Integer number and not less than 0'),
        check('cast_total_facebook_likes').not().isString().withMessage('cast_total_facebook_likes must be an Integer number'),

        check('plot_keywords').isArray().withMessage('plot_keywords must be an array'),

        check('imdb_link').isURL().withMessage('imdb_link must be link'),


        check('num_user_for_reviews').isInt({ gt: -1 }).withMessage('num_user_for_reviews must be an Integer number and not less than 0'),
        check('num_user_for_reviews').not().isString().withMessage('num_user_for_reviews must be an Integer number'),


        check('language', 'language must be Alpha').isAlpha('en-US', { ignore: ' ' }),

        check('country', 'country must be Alpha').isAlpha('en-US', { ignore: ' ' }),

        check('content_rating', 'content_rating can only contain  Alpha  or numbers or spacies').isString(),



        check('budget').isNumeric({ gt: -1 }).withMessage('budget must be a number and not less than 0'),
        check('budget').not().isString().withMessage('budget must be a number'),

        check('title_year').isInt({ min: 1900, max: 2022 }).withMessage('title_year must be a real year between( 1990 - 2022)'),




        check('imdb_score').isNumeric({ gt: -1 }).withMessage('imdb_score must be a number and not less than 0'),
        check('imdb_score').not().isString().withMessage('imdb_score must be a number'),

        check('aspect_ratio').isNumeric({ gt: -1 }).withMessage('aspect_ratio must be a number and not less than 0'),
        check('aspect_ratio').not().isString().withMessage('aspect_ratio must be a number'),



        check('movie_facebook_likes').isInt({ gt: -1 }).withMessage('movie_facebook_likes must be an Integer number and not less than 0'),
        check('movie_facebook_likes').not().isString().withMessage('movie_facebook_likes must be an Integer number'),


        check('color', 'color must be Alpha').isAlpha('en-US', { ignore: ' ' }),


        check('director_id').not().isEmpty().withMessage('you must identify director_id'),
        check('director_id').isInt().withMessage('director_id must be an Integer number'),
        check('director_id').not().isString().withMessage('director_id must be an Integer number'),



    ],

    (req, res) => {







        let title = req.body.title;
        let duration = req.body.duration;
        let gross = req.body.gross;
        let genres = JSON.stringify(req.body.genres);
        let num_voted_users = req.body.num_voted_users;
        let cast_total_facebook_likes = req.body.cast_total_facebook_likes;
        let plot_keywords = JSON.stringify(req.body.plot_keywords);
        let imdb_link = req.body.imdb_link;
        let num_user_for_reviews = req.body.num_user_for_reviews;
        let language = req.body.language;
        let country = req.body.country;
        let content_rating = req.body.content_rating;
        let budget = req.body.budget;
        let title_year = req.body.title_year;
        let imdb_score = req.body.imdb_score;
        let aspect_ratio = req.body.aspect_ratio;
        let movie_facebook_likes = req.body.movie_facebook_likes;
        // let actors = JSON.stringify(req.body.actors);
        let color = req.body.color;
        let director_id = req.body.director_id;

        let obj = {
            Status: 'Movie Created Successfully',
            Data: req.body
        };


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }






        connection.query("SELECT * from  movies where title = ? ", [title], (err, result, rows, fields) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');

            }

            if (result.length == 0) {

                connection.query("SELECT * from  directors where id = ? ", [director_id], (err, result, rows, fields) => {
                    if (err) {
                        console.log(err.message)
                        res.status(500).send('Server Error');

                    }

                    if (result.length == 0) {

                        return res.status(400).json({ msg: 'the Director with the director_id that you have entered is not exist' })


                    } else {





                        connection.query("INSERT INTO movies \
        (title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director_id) \
         VALUES \
         (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
                            [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director_id], function (err, result) {
                                if (err) {
                                    console.log(err.message)
                                    res.status(500).send('Server Error');

                                }

                                console.log(obj)
                                res.status(201).json(obj)

                            })
                    }
                });

            } else {
                return res.status(400).json({ msg: 'Movie already exists' })

            }



        })







    })


// PUT ROUTES - Must fill all the data to not come null

// router.put('/editAllMovieFields/:id', (req, res) => {


//     let id = req.params.id
//     let title = req.body.title;
//     let duration = req.body.duration;
//     let gross = req.body.gross;
//     let genres = JSON.stringify(req.body.genres);
//     let num_voted_users = req.body.num_voted_users;
//     let cast_total_facebook_likes = req.body.cast_total_facebook_likes;
//     let plot_keywords = JSON.stringify(req.body.plot_keywords);
//     let imdb_link = req.body.imdb_link;
//     let num_user_for_reviews = req.body.num_user_for_reviews;
//     let language = req.body.language;
//     let country = req.body.country;
//     let content_rating = req.body.content_rating;
//     let budget = req.body.budget;
//     let title_year = req.body.title_year;
//     let imdb_score = req.body.imdb_score;
//     let aspect_ratio = req.body.aspect_ratio;
//     let movie_facebook_likes = req.body.movie_facebook_likes;
//     // let actors = JSON.stringify(req.body.actors);
//     let color = req.body.color;
//     // let director = req.body.director;
//     let director_id = req.body.director_id;

//     // hon e3mal check 3la el dir_id or director




//     connection.query("UPDATE movies SET \
//     title = ?, duration = ?, gross = ?, genres = ?, num_voted_users = ?, cast_total_facebook_likes = ?, plot_keywords = ?, imdb_link = ?, num_user_for_reviews = ?, language = ?, country = ?, content_rating = ?, budget = ?, title_year = ?, imdb_score = ?, aspect_ratio = ?, movie_facebook_likes = ?,  color = ?, director_id = ? WHERE movies.id = ?" ,
//         [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director_id, id], function (err, result) {
//             if (err) {
//                 console.log(err);

//             }
//             // console.log('hoon rr', directorId);

//             // if(result?.insertId) movieId = result?.insertId
//             // let oneMovie = {"name": name, "facebook_likes": facebook_likes}
//             // res.json(oneMovie)
//             res.send({ "title": title, "duration": duration, "gross": gross, "num_voted_users": num_voted_users, "cast_total_facebook_likes": cast_total_facebook_likes, "plot_keywords": plot_keywords, "imdb_link": imdb_link, "num_user_for_reviews": num_user_for_reviews, "language": language, "country": country, "content_rating": content_rating, "budget": budget, "title_year": title_year, "imdb_score": imdb_score, "aspect_ratio": aspect_ratio, "movie_facebook_likes": movie_facebook_likes, "actors": actors, "color": color, "director_id": director_id })
//         });



//     console.log('request.body one', req.body)

// });



// PUT ROUTES -  No need to fill all the data to update some fields





router.put('/editMovie/:id',
    [


        check('id').not().isEmpty().withMessage('you must identify the id for the data'), check('id').isInt().withMessage('id must be an Integer number'),

        check('title', 'Title must be Alpha or alpha and numbers AND not empty').isString(),
        check('title', 'Title is required').not().isEmpty(),

        check('duration').isInt({ gt: -1 }).withMessage('Duration must be an Integer number and not less than 0'),
        check('duration').not().isString().withMessage('duration must be an Integer number'),

        check('gross').isNumeric({ gt: -1 }).withMessage('gross must be a number and not less than 0'),
        check('gross').not().isString().withMessage('gross must be a number'),

        check('genres').isArray().withMessage('genres must be an array'),

        check('num_voted_users').isInt({ gt: -1 }).withMessage('num_voted_users must be an Integer number and not less than 0'),
        check('num_voted_users').not().isString().withMessage('num_voted_users must be an Integer number'),


        check('cast_total_facebook_likes').isInt({ gt: -1 }).withMessage('cast_total_facebook_likes must be an Integer number and not less than 0'),
        check('cast_total_facebook_likes').not().isString().withMessage('cast_total_facebook_likes must be an Integer number'),

        check('plot_keywords').isArray().withMessage('plot_keywords must be an array'),

        check('imdb_link').isURL().withMessage('imdb_link must be link'),


        check('num_user_for_reviews').isInt({ gt: -1 }).withMessage('num_user_for_reviews must be an Integer number and not less than 0'),
        check('num_user_for_reviews').not().isString().withMessage('num_user_for_reviews must be an Integer number'),


        check('language', 'language must be Alpha').isAlpha('en-US', { ignore: ' ' }),

        check('country', 'country must be Alpha').isAlpha('en-US', { ignore: ' ' }),

        check('content_rating', 'content_rating can only contain  Alpha  or numbers or spacies').isString(),



        check('budget').isNumeric({ gt: -1 }).withMessage('budget must be a number and not less than 0'),
        check('budget').not().isString().withMessage('budget must be a number'),

        check('title_year').isInt({ min: 1900, max: 2022 }).withMessage('title_year must be a real year between( 1990 - 2022)'),




        check('imdb_score').isNumeric({ gt: -1 }).withMessage('imdb_score must be a number and not less than 0'),
        check('imdb_score').not().isString().withMessage('imdb_score must be a number'),

        check('aspect_ratio').isNumeric({ gt: -1 }).withMessage('aspect_ratio must be a number and not less than 0'),
        check('aspect_ratio').not().isString().withMessage('aspect_ratio must be a number'),



        check('movie_facebook_likes').isInt({ gt: -1 }).withMessage('movie_facebook_likes must be an Integer number and not less than 0'),
        check('movie_facebook_likes').not().isString().withMessage('movie_facebook_likes must be an Integer number'),


        check('color', 'color must be Alpha').isAlpha('en-US', { ignore: ' ' }),

        check('director_id').not().isString().withMessage('director_id must be an Integer number'),


        // check('director_id').not().isEmpty().withMessage('you must identify director_id'),
        // check('director_id').isInt().withMessage('id must be an Integer number')


    ],
    (req, res) => {


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
        // let obj = {
        //     Status: 'Movie Updated Successfully',
        //     Data: { "title": title, "duration": duration, "gross": gross, "num_voted_users": num_voted_users, "cast_total_facebook_likes": cast_total_facebook_likes, "plot_keywords": plot_keywords, "imdb_link": imdb_link, "num_user_for_reviews": num_user_for_reviews, "language": language, "country": country, "content_rating": content_rating, "budget": budget, "title_year": title_year, "imdb_score": imdb_score, "aspect_ratio": aspect_ratio, "movie_facebook_likes": movie_facebook_likes, "color": color, "director_id": director_id }
        // };

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        connection.query(`SELECT * FROM movies WHERE id = ${id}`,
            function (err, result) {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');

                }

                if(result.length == 0){
                    res.status(404).json({msg: 'Movie is not exist'})
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
                req.body.director_id ? director_id = req.body.director_id : director_id = result[0].director_id

                let obj = {
                    Status: 'Movie Updated Successfully',
                    Data: { "title": title, "duration": duration, "gross": gross, "num_voted_users": num_voted_users, "cast_total_facebook_likes": cast_total_facebook_likes, "plot_keywords": plot_keywords, "imdb_link": imdb_link, "num_user_for_reviews": num_user_for_reviews, "language": language, "country": country, "content_rating": content_rating, "budget": budget, "title_year": title_year, "imdb_score": imdb_score, "aspect_ratio": aspect_ratio, "movie_facebook_likes": movie_facebook_likes, "color": color, "director_id": director_id }
                };



                if (req.body.director_id && typeof director_id == 'number') {

                    connection.query("SELECT * from directors WHERE id = ?",
                        [director_id], function (err, result) {
                            if (err) {
                                console.log(err.message)
                                res.status(500).send('Server Error');

                            }


                            if (result.length == 0) {
                                return res.status(400).json({ msg: 'the Director with the director_id that you have entered is not exist' })

                            } else {
                                connection.query("UPDATE movies SET \
                title = ?, duration = ?, gross = ?, genres = ?, num_voted_users = ?, cast_total_facebook_likes = ?, plot_keywords = ?, imdb_link = ?, num_user_for_reviews = ?, language = ?, country = ?, content_rating = ?, budget = ?, title_year = ?, imdb_score = ?, aspect_ratio = ?, movie_facebook_likes = ?, color = ?, director_id = ? WHERE movies.id = ?" ,
                                    [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director_id, id], function (err, result) {
                                           if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');

                              }




                                        console.log(obj)
                                        res.status(200).json(obj)
                                    });

                            }




                        });


                } else if(typeof director_id !== 'number' || director_id == ""){
                    res.status(400).json({msg: 'please add a valid id'})
                } else {




                    connection.query("UPDATE movies SET \
            title = ?, duration = ?, gross = ?, genres = ?, num_voted_users = ?, cast_total_facebook_likes = ?, plot_keywords = ?, imdb_link = ?, num_user_for_reviews = ?, language = ?, country = ?, content_rating = ?, budget = ?, title_year = ?, imdb_score = ?, aspect_ratio = ?, movie_facebook_likes = ?, color = ?, director_id = ? WHERE movies.id = ?" ,
                        [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director_id, id], function (err, result) {
                            if (err) {
                                console.log(err.message)
                                res.status(500).send('Server Error');
            
                            }



                            console.log(obj)
                            res.status(200).json(obj)
                        });
                }
            }

            });





    });



// DELETE ROUTES



router.delete('/deleteMovie/:id', [check('id').not().isEmpty().withMessage('you must identify the id for the data'),  check('id').isInt().withMessage('id must be an Integer number')], (req, res) => {
    let id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    connection.query("Select * FROM movies WHERE id = ?", [id], (err, result) => {
        if (result.length == 0) {
            return res.status(404).json({ msg: 'Movie not found' })

        } else {

            connection.query("DELETE FROM movies WHERE id = ?", [id], (err, result) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');

                }
                res.status(200).json({ msg: 'Movie removed' });
            })
        }
    })




})




module.exports = router;

