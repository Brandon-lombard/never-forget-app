import React from 'react';

// css
import './searchResultCard.css';

export default function SearchResultCard({ image, artist, mediaItem, song, trackId, fetchFromExpressServer, collectionName, wrapperType, setSearchDisplay, setFavoriteItemsDisplay }) {

  // Check if media has a value if not get value from another key in obj
  let media =  mediaItem ? mediaItem : wrapperType; // audiobook film tv show

  // Check if song name has a value if not get value from another key in obj
  let track = song ? song : collectionName; // audiobook film tv show

  // Handle click for post method
  const addFavoriteHandle = () => {

    // declare id as some obj dont have a track id
    let id

    // Create obj to push to json file using post method
    let favouriteClick = { image, artist, media, track };

    // handle for id if track id is undefined
    if(trackId === undefined) {

      // Generate id for undefined value and set it to the id declaration
      id = Math.floor((Math.random() * Date.now()).toFixed(9));

      // push the key/value pair to object to post
      favouriteClick.id = id;
    } else {

      // if trackId is defined set it to declaration
      id = trackId;

      // push the key/value pair to object to post
      favouriteClick.id = id;
    }

    // Post method from express server on http://localhost:8080/api
    fetch(`/add`, {
      method: 'POST',

      // Type of data expected
      headers: {
       "Content-Type" : "application/json"
      },

      // Changing object to readable format for json file 
      body: JSON.stringify(favouriteClick)
    }).then(() => {
      
      // fetch new data calling the get method
      fetchFromExpressServer();

      // Set search items display to false to hide 
      setSearchDisplay(false);
    
    });
  }

  return (

    // card container with onclick funtion to post the items data
    <div onClick={() => addFavoriteHandle()} className="cardContainer">

      <div className="wrapper">

        <div className="imgContainer">

          {/* result image display */}
          <img src={`${ image }`} alt="Album art" />

        </div>

        <div className="infoContainer">
          
           {/* result song display */}
          <h3 className="songName">Title : {`${ track  }`} </h3>

           {/* result artist display */}
          <h4 className="songArtist">Artist : {`${ artist }`}</h4>

           {/* result media type display */}
          <p className="typeOfMedia">Media : {`${ media }`} </p>

        </div>

      </div>

      {/* hidden text overlay // show on hover */}
      <div className="textOverlay"><p>Click to add song to favorite</p></div>

    </div>
  )
}
