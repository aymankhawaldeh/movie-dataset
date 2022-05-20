const express = require('express');
const router = express.Router();
var connection = require('../database');
const Joi = require('joi');



function getSearchSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        title: Joi.string(),
        genres: Joi.string(),
        plot_keywords: Joi.string()

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

function getAllSchema(req, res, next) {
    // create schema object
    const schema = Joi.object({
        // name: Joi.string()
        // .alphanum().min(3).max(30).required(),
        genres: Joi.string(),
        plot_keywords: Joi.string()

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




// ASSIGNMENT SOLUTION

// 1) 

router.get('/movie/search', getSearchSchema, (req, res, next) => {



    let title;
    let genres;
    let plot_keywords;



    req.query.title ? title = req.query.title : null
    req.query.genres ? genres = JSON.stringify(req.query.genres).replace(/\'/gi, '') : null
    req.query.plot_keywords ? plot_keywords = JSON.stringify(req.query.plot_keywords).replace(/\'/gi, '') : null


    console.log(title, genres, plot_keywords)
    if (plot_keywords == null && genres == null && title == null) {

        res.status(404).json({ msg: 'Sorry their is no data available for your search' })
        next()




    } else if (plot_keywords == null && genres == null) {
        connection.query(`SELECT * FROM movies WHERE  title = ? `, [title], (err, result, rows, fields) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');

            }
            //  console.log("in", title)

            if (result.length == 0) {
                res.status(404).json({ msg: 'Sorry no data similar found' })
                next()



            } else {
                res.status(200).send(result)
                next()



            }


        })

    } else if (plot_keywords == null && title == null) {
        connection.query(`SELECT * FROM movies WHERE  JSON_CONTAINS(genres, ?) `, [genres], (err, result, rows, fields) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');

            }
            if (result.length == 0) {
                res.status(404).json({ msg: 'Sorry no data similar found' })
                next()



            } else {
                res.status(200).send(result)
                next()



            }

        })

    } else if (genres == null && title == null) {
        connection.query(`SELECT * FROM movies WHERE  JSON_CONTAINS(plot_keywords, ?) `, [plot_keywords], (err, result, rows, fields) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');

            }
            if (result.length == 0) {
                res.status(404).json({ msg: 'Sorry no data similar found' })
                next()



            } else {
                res.status(200).send(result)
                next()



            }

        })
    } else
        if (title == null) {
            connection.query(`SELECT * FROM movies WHERE  JSON_CONTAINS(genres, ?) AND  JSON_CONTAINS(plot_keywords, ?)`, [genres, plot_keywords], (err, result, rows, fields) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');

                }
                if (result.length == 0) {
                    res.status(404).json({ msg: 'Sorry no data similar found' })
                    next()



                } else {
                    res.status(200).send(result)
                    next()



                }

            })
        } else if (genres == null) {
            connection.query(`SELECT * FROM movies WHERE  title = ? AND JSON_CONTAINS(plot_keywords, ?)`, [title, plot_keywords], (err, result, rows, fields) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');

                }
                if (result.length == 0) {
                    res.status(404).json({ msg: 'Sorry no data similar found' })
                    next()



                } else {
                    res.status(200).send(result)
                    next()



                }

            })

        } else if (plot_keywords == null) {
            connection.query(`SELECT * FROM movies WHERE  title = ? AND JSON_CONTAINS(genres, ?)`, [title, genres], (err, result, rows, fields) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');

                }
                if (result.length == 0) {
                    res.status(404).json({ msg: 'Sorry no data similar found' })
                    next()



                } else {
                    res.status(200).send(result)
                    next()



                }

            })
        } else {

            connection.query(`SELECT * FROM movies WHERE title = ? AND JSON_CONTAINS(genres, ?) AND  JSON_CONTAINS(plot_keywords, ?)`, [title, genres, plot_keywords], (err, result, rows, fields) => {
                if (err) {
                    console.log(err.message)
                    res.status(500).send('Server Error');

                }
                if (result.length == 0) {
                    res.status(404).json({ msg: 'Sorry no data similar found' })
                    next()



                } else {
                    res.status(200).send(result)
                    next()



                }
            })
        }







})


// 2) a)
router.get('/movie/count', (req, res) => {


    connection.query(`  SELECT  count(title) as 'number of movies',  language, country, if(max(imdb_score) - min(imdb_score) = 0, max(imdb_score), concat(min(imdb_score),'-',max(imdb_score))) as 'imdb_score'  from movies group by language, country
    HAVING language != 'null' AND country != 'null'`, (err, result, rows) => {
        if (err) {
            console.log(err.message)
            res.status(500).send('Server Error');

        }
        // console.log(" all actors id ", actor)
        // console.log("result", result)

        // console.log("rows", rows)
        res.status(200).send(result)



    })
})

// 2) b)
// router.get('/movie/count', (req, res) => {


//     connection.query(`  SELECT  count(title) as 'number of movies',  ifnull(language, 'no language') as 'languages', ifnull(country, 'no country') as 'countries', if(max(imdb_score) - min(imdb_score) = 0, max(imdb_score), concat(min(imdb_score),'-',max(imdb_score))) as 'imdb_score'  from movies group by language, country
//     `, (err, result, rows) => {
//         if (err) throw err;

//         // console.log(" all actors id ", actor)
//         console.log("result", result)

//         // console.log("rows", rows)
//         res.status(200).send(result)



//     })
// })



// 3)

router.get('/movie/all', getAllSchema ,(req, res, next) => {



    let genres = JSON.stringify(req.query.genres)
    let plot_keywords = JSON.stringify(req.query.plot_keywords);



    newGenres = genres ? genres.replace(/\'/gi, '') : null
    new_plot_keywords = plot_keywords ? plot_keywords.replace(/\'/gi, '') : null
    console.log("newGenres", newGenres)
    console.log("genres", genres)

    if (!newGenres && !new_plot_keywords) {

        connection.query("SELECT * FROM movies", (err, result, rows, fields) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');
    
            }


            res.status(200).send(result)
            next()


        })


    } else {


        connection.query(`SELECT * FROM movies WHERE JSON_CONTAINS(genres, ?)  OR  JSON_CONTAINS(plot_keywords, ?)`, [newGenres, new_plot_keywords], (err, result, rows, fields) => {
            if (err) {
                console.log(err.message)
                res.status(500).send('Server Error');
    
            }

            if (result.length == 0) {
                res.status(404).json({ msg: 'Sorry no data similar found' })
                next()



            } else {
                res.status(200).send(result)
                next()



            }
            // console.log(" all actors id ", actor)
            // console.log("result", result)
            // console.log("rows", rows)
            //   console.log("rows", rows)
            //   console.log("genres", genres)
            //   console.log("result", result[0])

      


        })
    }


})





module.exports = router;
