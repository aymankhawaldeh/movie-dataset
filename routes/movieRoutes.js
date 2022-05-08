const express = require('express');
const router = express.Router();
var connection = require('../database')






// GET ROUTES



router.get('/movies', (req, res) => {

    connection.query("SELECT * from movies", (err, rows, fields, result, records) => {
        if (err) throw err;
        res.status(200).json({movies: rows});
    })
});




router.get('/getMovie/:id', (req, res) => {
    let id = req.params.id;
    connection.query("SELECT * FROM movies WHERE id = ?", [id], (err, rows, fields, result) => {
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
          (title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, director, color, director_id) \
           VALUES \
           (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT name FROM directors WHERE id = ? LIMIT 1), ?, ?)",
                    [value.title, value.duration, value.gross, JSON.stringify(value.genres), value.num_voted_users, value.cast_total_facebook_likes, JSON.stringify(value.plot_keywords), value.imdb_link, value.num_user_for_reviews, value.language, value.country, value.content_rating, value.budget, value.title_year, value.imdb_score, value.aspect_ratio, value.movie_facebook_likes,  value.director_id, value.color, value.director_id], function (err, result) {
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
        // let actors = JSON.stringify(req.body.actors);
        let color = req.body.color;
        // let director = req.body.director;
        let director_id = req.body.director_id;

        // hon e3mal check 3la el dir_id or director




        connection.query("INSERT INTO movies \
    (title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, director, color, director_id) \
     VALUES \
     (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT name FROM directors WHERE id = ? LIMIT 1), ?,?)",
            [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes,  director_id, color, director_id], function (err, result) {
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


// PUT ROUTES - Must fill all the data to not come null

router.put('/editAllMovieFields/:id', (req, res) => {


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
    // let actors = JSON.stringify(req.body.actors);
    let color = req.body.color;
    // let director = req.body.director;
    let director_id = req.body.director_id;

    // hon e3mal check 3la el dir_id or director




    connection.query("UPDATE movies SET \
    title = ?, duration = ?, gross = ?, genres = ?, num_voted_users = ?, cast_total_facebook_likes = ?, plot_keywords = ?, imdb_link = ?, num_user_for_reviews = ?, language = ?, country = ?, content_rating = ?, budget = ?, title_year = ?, imdb_score = ?, aspect_ratio = ?, movie_facebook_likes = ?, director = (SELECT name FROM directors WHERE id = ? LIMIT 1), color = ?, director_id = ? WHERE movies.id = ?" ,
        [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, director_id, color, director_id, id], function (err, result) {
            if (err) {
                console.log(err);

            }
            // console.log('hoon rr', directorId);

            // if(result?.insertId) movieId = result?.insertId
            // let oneMovie = {"name": name, "facebook_likes": facebook_likes}
            // res.json(oneMovie)
            res.send({ "title": title, "duration": duration, "gross": gross, "num_voted_users": num_voted_users, "cast_total_facebook_likes": cast_total_facebook_likes, "plot_keywords": plot_keywords, "imdb_link": imdb_link, "num_user_for_reviews": num_user_for_reviews, "language": language, "country": country, "content_rating": content_rating, "budget": budget, "title_year": title_year, "imdb_score": imdb_score, "aspect_ratio": aspect_ratio, "movie_facebook_likes": movie_facebook_likes, "actors": actors, "color": color, "director_id": director_id })
        });



    console.log('request.body one', req.body)

});



// PUT ROUTES -  No need to fill all the data to update some fields





router.put('/editMovie/:id', (req, res) => {


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

connection.query(`SELECT * FROM movies WHERE id = ${id}` ,
      function (err, result) {
            if (err) {
                console.log(err);

            }
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


     
 
    // let director = req.body.director;


            connection.query("UPDATE movies SET \
            title = ?, duration = ?, gross = ?, genres = ?, num_voted_users = ?, cast_total_facebook_likes = ?, plot_keywords = ?, imdb_link = ?, num_user_for_reviews = ?, language = ?, country = ?, content_rating = ?, budget = ?, title_year = ?, imdb_score = ?, aspect_ratio = ?, movie_facebook_likes = ?, director = (SELECT name FROM directors WHERE id = ? LIMIT 1), color = ?, director_id = ? WHERE movies.id = ?" ,
                [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, director_id, color, director_id, id], function (err, result) {
                    if (err) {
                        console.log(err);
        
                    }
                   
                    res.send({ "title": title, "duration": duration, "gross": gross, "num_voted_users": num_voted_users, "cast_total_facebook_likes": cast_total_facebook_likes, "plot_keywords": plot_keywords, "imdb_link": imdb_link, "num_user_for_reviews": num_user_for_reviews, "language": language, "country": country, "content_rating": content_rating, "budget": budget, "title_year": title_year, "imdb_score": imdb_score, "aspect_ratio": aspect_ratio, "movie_facebook_likes": movie_facebook_likes,  "color": color, "director_id": director_id })
                });
        

});

   


    console.log('request.body one', req.body)

});



// DELETE ROUTES



router.delete('/deleteMovie/:id', (req, res) => {
    let id = req.params.id;
    connection.query("DELETE FROM movies WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        res.send("row with this id " + id + " is deleted")
    })
})




module.exports = router;

