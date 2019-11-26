const express = require('express');
const app = express();
const axios = require('axios');
const Dictionary = require('./Dictionary').Dictionary;

const apikey = '4cc398d4-9fe2-4d23-a227-4ea6193a486b';


app.get('/searchWord',(req,res)=>{
  const link = `https://www.dictionaryapi.com/api/v3/references/sd4/json/${req.query.word}?key=${apikey}`;
  axios.get(link).then(response=>{
    var data = response.data[0]
    var val = {
      "name": data.meta.id,
      // "f1":data.f1,
      "def":data.def[0].sseq[0][0][1].dt[0][1],
      "created":new Date().toISOString().slice(0, 19).replace('T', ' ')
      // "shortdef": data.shortdef[0]
    }
    var model = new Dictionary(val);
    model.save();

    res.send(val)
  })
})

// get from database
app.get('/getAll',async (req,res)=>{
  res.send(await Dictionary.find({}));
})

app.get('/deleteRecord',async (req,res)=>{
  res.send(await Dictionary.findByIdAndDelete(req.query.id))
})
//localhost:5000/getmovie?title=MovieTitle
// app.get('/getmovie', (req, res) => {
//   const title = req.query.title;
//   const querystr = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`;

//   axios
//     .get(querystr)
//     .then(response => {
//       const movie = new Movie({
//         title: response.data.Title,
//         year: response.data.Year,
//         genre: response.data.Genre,
//         actors: response.data.Actors,
//         plot: response.data.Plot,
//         poster: response.data.Poster
//       });
//       if (!movie.title) {
//         res.status(200).json('Not found');
//         return;
//       }
//       movie
//         .save()
//         .then(response => {
//           res.status(200).json(response);
//         })
//         .catch(error => {
//           res.status(400).json(error);
//         });
//     })
//     .catch(error => {
//       res.status(400).json(error);
//     });
// });

// //localhost:5000/getallmovies
// app.get('/getallmovies', (req, res) => {
//   Movie.find({})  
//     .then(response => {
//       res.status(200).json(response);
//     })
//     .catch(error => {
//       res.status(400).json(error);
//     });
// });

// //localhost:5000/deletemovie?title=MovieTitle
// app.get('/deletemovie', (req, res) => {
//   Movie.deleteMany({ title: req.query.title })
//     .then(response => {
//       res.status(200).json(response);
//     })  
//     .catch(error => {
//       res.status(400).json(error);
//     });
// });


app.listen(5000, () => {
  console.log('server listening on port 5000');
});
