const express = require('express');

// require router from express
const router = express.Router();

// require filesystem from fs
const fs = require('fs');

// Use fs to read data from json file user favorite list
const content = JSON.parse(fs.readFileSync("./userFavorite.json"));

// Get request
router.get('/search', function (req, res) {

    // Return data from json file // userFavorite.json"
    console.log("logged")
    res.send(content)

  })

// Post request with /api/add
  router.post('/add', function (req, res) {

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
router.delete("/delete/:id", (req, res) =>{

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

  module.exports = router;