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
const movieActorRoutes = require('./routes/movieActorRoutes');
const taskRoutes = require('./routes/taskRoutes');

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

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
             if (counter < 75) {

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



                connection.query("INSERT INTO directors (name, facebook_likes) VALUES (?, ?)", [director, facebook_likes], function (err) {
                    if (err) {
                        console.log(err);
                    }

                });




                connection.query("INSERT INTO movies \
        (title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director_id) \
         VALUES \
         (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT id FROM directors WHERE name = ? LIMIT 1))",
                    [title, duration, gross, genres, num_voted_users, cast_total_facebook_likes, plot_keywords, imdb_link, num_user_for_reviews, language, country, content_rating, budget, title_year, imdb_score, aspect_ratio, movie_facebook_likes, color, director], function (err, result) {
                        if (err) {
                            console.log(err);

                        }

                        // if(result?.insertId) movieId = result?.insertId
                    });




                let movieId = undefined
                connection.query("SELECT id FROM movies WHERE title = ? ", title, function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
                    movieId = rows[0]?.id



                });






                let sql = "SELECT id FROM actors WHERE name  IN (" + connection.escape([name1, name2, name3]) + ")";
                connection.query(sql, function (err, rows) {
                    if (err) {
                        console.log(err);
                    }
              

                    rows.map((elm) => {


                        connection.query("INSERT IGNORE INTO movies_actors (movie_id, actor_id) VALUES (?, ?)", [movieId, elm.id], function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });

                    })

                  


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

    connection.connect((err) => {
        if (err) throw err;
        console.log('database connected');


        let createDirectors = `CREATE TABLE IF NOT EXISTS directors (
            id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            name varchar(45) UNIQUE not null,
            facebook_likes INT
            
            );`;


        let createActors = `CREATE TABLE IF NOT EXISTS actors(
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            name VARCHAR(45) UNIQUE NOT NULL,
            facebook_likes INT            );`



        let createMovies = `CREATE TABLE IF NOT EXISTS movies (
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(45) UNIQUE NOT NULL,
                duration INT,
                gross DECIMAL,
                genres JSON,
                num_voted_users INT,
                cast_total_facebook_likes INT,
                plot_keywords JSON,
                imdb_link VARCHAR(255),
                num_user_for_reviews INT,
                language VARCHAR(15),
                country VARCHAR(25),
                content_rating VARCHAR(25),
                budget DECIMAL,
                title_year YEAR(4),
                imdb_score float,
                aspect_ratio double,
                movie_facebook_likes INT,
                color VARCHAR(15),
                director_id INT not null,
                CONSTRAINT di_co
                FOREIGN KEY(director_id) REFERENCES directors(id)
                ON DELETE CASCADE ON UPDATE CASCADE
                
                
                );`



        let createMoviesActors = `CREATE TABLE IF NOT EXISTS movies_actors (
       movie_id INT NOT NULL,
       actor_id INT NOT NULL,
       PRIMARY KEY (movie_id, actor_id),
       CONSTRAINT mov_co
       FOREIGN KEY(movie_id) REFERENCES movies(id)
       ON DELETE CASCADE ON UPDATE CASCADE,
       CONSTRAINT act_co
       FOREIGN KEY(actor_id) REFERENCES actors(id)
       ON DELETE CASCADE ON UPDATE CASCADE
       );`




        connection.query(createDirectors, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });

        connection.query(createActors, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });


        connection.query(createMovies, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });


        connection.query(createMoviesActors, function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }
        });




    })


})






