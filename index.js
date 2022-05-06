const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const csv = require('csv-parser');
const csv = require('fast-csv');
var connection = require('./database')
const app = express();
const directorRoutes = require('./routes/directorRoutes');
const actorRoutes = require('./routes/actorRoutes');
const movieRoutes = require('./routes/movieRoutes');
const movieActorRoutes = require('./routes/movieRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors());
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', directorRoutes);
app.use('/api', actorRoutes);
app.use('/api', movieRoutes);
app.use('/api', movieActorRoutes);
app.use('/api', taskRoutes);

var counter = 0;




app.get('/passing', (req, res) => {


    let csvStream = csv.parseFile(".\\csv\\movie_metadata.csv", { headers: true })
        .on("data", function (record) {
            csvStream.pause();
            if (counter < 100) {

                let title = record.movie_title.trim().replace(/\s/g, "") == "" ? null : record.movie_title.trim()
                let duration = record.duration.replace(/\s/g, "") == "" ? 0 : record.duration
                let gross = record.gross.replace(/\s/g, "") == "" ? 0 : record.gross
                let genres = JSON.stringify(record.genres.split("|"));
                let num_voted_users = record.num_voted_users.replace(/\s/g, "") == "" ? 0 : record.num_voted_users
                let cast_total_facebook_likes = record.cast_total_facebook_likes.replace(/\s/g, "") == "" ? 0 : record.cast_total_facebook_likes
                let plot_keywords = JSON.stringify(record.plot_keywords.split("|"));
                let imdb_link = record.movie_imdb_link.replace(/\s/g, "") == "" ? null : record.movie_imdb_link;
                let num_user_for_reviews = record.num_user_for_reviews.replace(/\s/g, "") == "" ? 0 : record.num_user_for_reviews
                let language = record.language.replace(/\s/g, "") == "" ? null : record.language;
                let country = record.country.replace(/\s/g, "") == "" ? null : record.country;
                let content_rating = record.content_rating.replace(/\s/g, "") == "" ? null : record.content_rating;
                let budget = record.budget.replace(/\s/g, "") == "" ? 0 : record.budget
                let title_year = record.title_year.replace(/\s/g, "") == "" ? null : record.title_year
                let imdb_score = record.imdb_score.replace(/\s/g, "") == "" ? 0 : record.imdb_score;
                let aspect_ratio = record.aspect_ratio.replace(/\s/g, "") == "" ? 0 : record.aspect_ratio
                let movie_facebook_likes = record.movie_facebook_likes.replace(/\s/g, "") == "" ? 0 : record.movie_facebook_likes;
                let actors = JSON.stringify([record.actor_1_name, record.actor_2_name, record.actor_3_name]);
                let director = record.director_name.replace(/\s/g, "") == "" ? null : record.director_name
                let color = record.color.replace(/\s/g, "") == "" ? null : record.color
                let name1 = record.actor_1_name.replace(/\s/g, "") == "" ? null : record.actor_1_name
                let name2 = record.actor_2_name.replace(/\s/g, "") == "" ? null : record.actor_2_name
                let name3 = record.actor_3_name.replace(/\s/g, "") == "" ? null : record.actor_3_name
                let facebook_likes1 = record.actor_1_facebook_likes.replace(/\s/g, "") == "" ? 0 : record.actor_1_facebook_likes
                let facebook_likes2 = record.actor_2_facebook_likes.replace(/\s/g, "") == "" ? 0 : record.actor_2_facebook_likes
                let facebook_likes3 = record.actor_3_facebook_likes.replace(/\s/g, "") == "" ? 0 : record.actor_3_facebook_likes
                let facebook_likes = record.director_facebook_likes.replace(/\s/g, "") == "" ? 0 : record.director_facebook_likes;



                connection.query("INSERT  INTO actors (name, facebook_likes) VALUES (?, ?)", [name1, facebook_likes1], function (err, result) {
                    if (err) {
                        console.log(err);
                    }

                    // if(result?.insertId)   arr.push(result?.insertId)
                });
                connection.query("INSERT  INTO actors (name, facebook_likes) VALUES (?, ?)", [name2, facebook_likes2], function (err, result) {
                    if (err) {
                        console.log(err);
                    }

                    // if(result?.insertId)   arr.push(result?.insertId)
                });
                connection.query("INSERT  INTO actors (name, facebook_likes) VALUES (?, ?)", [name3, facebook_likes3], function (err, result) {
                    if (err) {
                        console.log(err);

                    }

                    // console.log('insertooooo ' + result?.insertId)

                    // if(result?.insertId)   arr.push(result?.insertId)


                });



                let directorId = undefined
                connection.query("INSERT INTO directors (name, facebook_likes) VALUES (?, ?)", [director, facebook_likes], function (err) {
                    if (err) {
                        console.log(err);
                    }

                });




                connection.query("INSERT INTO movies \
        (title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, actors, director, color, dir_id) \
         VALUES \
         (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT director_id FROM directors WHERE name = ? LIMIT 1))",
                    [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, actors, director, color, director], function (err, result) {
                        if (err) {
                            console.log(err);

                        }
                        console.log('hoon rr', directorId);

                        // if(result?.insertId) movieId = result?.insertId
                    });




                let movieId = undefined
                connection.query("SELECT movie_id FROM movies WHERE title = ? ", title, function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                    movieId = rows[0]?.movie_id

                    console.log('movieID rr', movieId);


                });



                console.log('barra rr', movieId);



                let sql = "SELECT actor_id FROM actors WHERE name  IN (" + connection.escape([name1, name2, name3]) + ")";
                console.log("sqllll ", sql)
                connection.query(sql, function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                    // console.log('resulttttt' , result)
                    // console.log('fieldssss' , fields)
                    // console.log('rowssss' , rows[0]?.actor_id)
                    // if(rows[0] && rows[0]?.actor_id)  arr.push(rows[0].actor_id)
                    // console.log('allrows ', rows)
                    console.log('out rr', movieId);

                    rows.map((elm) => {
                        console.log('in rr', movieId);


                        connection.query("INSERT IGNORE INTO movies_actors (movie_id, actor_id) VALUES (?, ?)", [movieId, elm.actor_id], function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });

                    })

                    // arr = rows.map((actorID) => actorID.actor_id)
                    // console.log('arrrrrrrrrrrrrrr', arr)


                })


                csvStream.resume();





                ++counter;
            }
        }).on("end", function () {
            console.log("Job is done!");
        }).on("error", function (err) {
            console.log(err);
        });

    res.send("data ADDED!")



});











app.listen(8000, () => {

    console.log('App is listening on port 8000');
    connection.connect(function (err) {
        if (err) throw err;
        console.log('database connected')
    })


})






