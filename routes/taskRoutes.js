const express = require('express');
const router = express.Router();
var connection = require('../database')






// ASSIGNMENT SOLUTION

// 1) 

router.get('/movie/search', (req, res) => {



    let title = req.query.title;
    let genres = JSON.stringify(req.query.genres)
    let plot_keywords = JSON.stringify(req.query.plot_keywords)



    newGenres = genres ? genres.replace(/\'/gi, '') : null
    new_plot_keywords = plot_keywords ? plot_keywords.replace(/\'/gi, '') : null


    connection.query(`SELECT * FROM movies WHERE title = ? OR JSON_CONTAINS(genres, ?) OR  JSON_CONTAINS(plot_keywords, ?)`, [title, newGenres, new_plot_keywords], (err, result, rows, fields) => {
        if (err) throw err;

        // console.log(" all actors id ", actor)
        // console.log("result", result)
        // console.log("rows", rows)
        //   console.log("rows", rows)
        //   console.log("genres", genres)
        //   console.log("result", result[0])

        res.send(result)


    })





})


// 2)
router.get('/movie/count', (req, res) => {


    connection.query(`  SELECT  count(title) as 'number of movies',  language, country, if(max(imdb_score) - min(imdb_score) = 0, max(imdb_score), concat(min(imdb_score),'-',max(imdb_score))) as 'imdb_score'  from movies group by language, country
    HAVING language != 'null' AND country != 'null'`, (err, result, rows) => {
        if (err) throw err;

        // console.log(" all actors id ", actor)
         console.log("result", result)

        // console.log("rows", rows)
        res.status(200).send(result)
       


    })
})


// 3)

router.get('/movie/all', (req, res) => {



    let genres = JSON.stringify(req.query.genres)
    let plot_keywords = JSON.stringify(req.query.plot_keywords);



    newGenres = genres ? genres.replace(/\'/gi, '') : null
    new_plot_keywords = plot_keywords ? plot_keywords.replace(/\'/gi, '') : null
    console.log("newGenres", newGenres)
    console.log("genres", genres)

    if( !newGenres && !new_plot_keywords){
       
        connection.query("SELECT * FROM movies", (err, result, rows, fields) => {
            if (err) throw err;
    
       
    
            res.send(result)
    
    
        })
    
        
    } else {


    connection.query(`SELECT * FROM movies WHERE JSON_CONTAINS(genres, ?)  OR  JSON_CONTAINS(plot_keywords, ?)`, [newGenres, new_plot_keywords], (err, result, rows, fields) => {
        if (err) throw err;

        // console.log(" all actors id ", actor)
        // console.log("result", result)
        // console.log("rows", rows)
        //   console.log("rows", rows)
        //   console.log("genres", genres)
        //   console.log("result", result[0])

        res.send(result)


    })
    }


})





module.exports = router;
