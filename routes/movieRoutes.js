const express = require('express');
const router = express.Router();
var connection = require('../database')






// GET ROUTES



router.get('/movies', (req, res) => {

    connection.query("SELECT * from movies", (err, rows, fields, result) => {
        if (err) throw err;
        res.send(rows);
    })
});




router.get('/one-movie/:id', (req, res) => {
    let id = req.params.id;
    connection.query("SELECT * FROM movies WHERE movie_id = ?", [id], (err, rows, fields, result) => {
        if (err) throw err;
        res.send(rows)
    })
})





// POST ROUTES


router.post('/addMovie', (req, res) => {



    let multiMovies = []


    if (req.body.length > 1) {
        console.log('request.body multi out', req.body)

        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                let value = req.body[key];
                multiMovies.push(value)

                connection.query("INSERT INTO movies \
          (title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, director, color, dir_id) \
           VALUES \
           (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT name FROM directors WHERE director_id = ? LIMIT 1), ?, ?)",
                    [value.title, value.duration, value.gross, JSON.stringify(value.genres), value.num_voted_users, value.cast_total_facebook_likes, JSON.stringify(value.plot_keywords), value.imdb_link, value.num_user_for_reviews, value.language, value.country, value.content_rating, value.budget, value.title_year, value.imdb_score, value.aspect_ratio, value.movie_facebook_likes,  value.dir_id, value.color, value.dir_id], function (err, result) {
                        if (err) {
                            console.log(err);

                        }
                        //   console.log('hoon rr', directorId);

                        // if(result?.insertId) movieId = result?.insertId
                    });

                console.log('request.body in', req.body)

                //   console.log( `value for ${key} is ${value.name}`) ;



            }





        }

        res.status(200).json(multiMovies)

    } else {



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
        let actors = JSON.stringify(req.body.actors);
        let color = req.body.color;
        // let director = req.body.director;
        let dir_id = req.body.dir_id;

        // hon e3mal check 3la el dir_id or director




        connection.query("INSERT INTO movies \
    (title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, director, color, dir_id) \
     VALUES \
     (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT name FROM directors WHERE director_id = ? LIMIT 1), ?,?)",
            [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes,  dir_id, color, dir_id], function (err, result) {
                if (err) {
                    console.log(err);

                }
                // console.log('hoon rr', directorId);

                // if(result?.insertId) movieId = result?.insertId
                // let oneMovie = {"name": name, "facebook_likes": facebook_likes}
                // res.json(oneMovie)
                res.send(result)
            });



        console.log('request.body one', req.body)


    }
})




// PATCH ROUTES





router.patch('/editMovie/:id', (req, res) => {


    let id = req.params.id
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
    let actors = JSON.stringify(req.body.actors);
    let color = req.body.color;
    // let director = req.body.director;
    let dir_id = req.body.dir_id;

    // hon e3mal check 3la el dir_id or director




    connection.query("UPDATE movies SET \
    title = ?, duration = ?, gross = ?, genres = ?, num_voted_users = ?, cast_total_facebook_likes = ?, plot_keywords = ?, imdb_link = ?, num_user_for_reviews = ?, language = ?, country = ?, content_rating = ?, budget = ?, title_year = ?, imdb_score = ?, aspect_ratio = ?, movie_facebook_likes = ?, director = (SELECT name FROM directors WHERE director_id = ? LIMIT 1), color = ?, dir_id = ? WHERE movie_id = ?" ,
        [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, dir_id, color, dir_id, id], function (err, result) {
            if (err) {
                console.log(err);

            }
            // console.log('hoon rr', directorId);

            // if(result?.insertId) movieId = result?.insertId
            // let oneMovie = {"name": name, "facebook_likes": facebook_likes}
            // res.json(oneMovie)
            res.send({ "title": title, "duration": duration, "gross": gross, "num_voted_users": num_voted_users, "cast_total_facebook_likes": cast_total_facebook_likes, "plot_keywords": plot_keywords, "imdb_link": imdb_link, "num_user_for_reviews": num_user_for_reviews, "language": language, "country": country, "content_rating": content_rating, "budget": budget, "title_year": title_year, "imdb_score": imdb_score, "aspect_ratio": aspect_ratio, "movie_facebook_likes": movie_facebook_likes, "actors": actors, "color": color, "dir_id": dir_id })
        });



    console.log('request.body one', req.body)

});



// DELETE ROUTES



router.delete('/deleteMovie/:id', (req, res) => {
    let id = req.params.id;
    connection.query("DELETE FROM movies WHERE movie_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.send("row with this id " + id + " is deleted")
    })
})




module.exports = router;

