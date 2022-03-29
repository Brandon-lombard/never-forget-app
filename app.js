const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');

const routes = require('./routes');

// Initialize express
const app = express();

// App middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

// Routes

// Use routes to select method inside index.js
// app.use('/api', routes);

// Methods

// Use fs to read data from json file user favorite list
const content = JSON.parse(fs.readFileSync("./userFavorite.json"));

// Get request
app.get('/search', function (req, res) {

    // Return data from json file // userFavorite.json"
    console.log("logged")
    res.send(content)

  })

// Post request with /api/add
  app.post('/add', function (req, res) {

// Create new object collected from body data
    const newFavorite = Object.assign(req.body);

// Push new object to data stored in content variable
    content.push(newFavorite);

// Write new object in array in userFavoriteList.json
    fs.writeFileSync("userFavorite.json", JSON.stringify(content), (err) => {

      // if error occurs return error to console
      if (err) {

          console.log("Cannot load to file", err);
    }
})

  // return the new data to file
  return res.json({

      message: 'New favorite added',
      content
  })
})

// Delete Method Requesting an id
app.delete("/delete/:id", (req, res) =>{

// Get id of selected data
  const id = Number(req.params.id);

// Loop through array till the id matches an obj
  for (let i = 0; i < content.length; i++) {

// When id matched use splice method to delete object
      if (content[i].id === id) {

// when id matched use splice to delete this object from the arr
            content.splice(i, 1)
      }
  }

// Write new array with deleted object to json file
  fs.writeFileSync("userFavorite.json", JSON.stringify(content), (err) => {

// If error 
      if (err) {

          console.log("Cannot load to file", err);
      }

      // Push new array to json file
      content.push(content);
  })

  // Return json to frontend

  return res.json({

      message: 'Favorite item deleted',
      content
  })
}

)

if (process.env.NODE_ENV === 'production'){
    // app.use(express.static("frontend/build"));
    // app.get("*", (req,res) => {
    //     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    // })
    app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html'));
});
}

// Port listening on
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('listening on port', PORT));


//  heroku create -b https://github.com/mars/create-react-app-buildpack.git
// heroku login
// git add
// git commit
// git status
// heroku local
// git push heroku main                                                   