import React from 'react'


// Seach icon image
import "../images/search.png"

// css
import './searchBar.css';

export default function SearchBar({ setUserSearch, setMediaType, fetchItunes, setSearchDisplay, setFavoriteItemsDisplay, setError, setSearchResults }) {

  // Handle text of user search inside search bar
  const searchBarHandle = value => {

    // Manipulate user string to suit term of fetch 
    let searchString = value.replace(/\s/g, "+").toLowerCase(); // all lower case and all white spaces and other points change to a +

    // Set state of user input
    setUserSearch(searchString);

    // Set users favorite list to hide
    setFavoriteItemsDisplay(false);

    // Hide search display while user is typing
    setSearchDisplay(false);

    // Clear previous result state
    setSearchResults("");

    // hide error while searching
    setError(false);
  }

  // Search button onclick handle
  const searchButtonHandle = () => {

    // Set users favorite list to hide if still showing
    setFavoriteItemsDisplay(false);

    // Clear previous result state
    setSearchResults("");

    // Show user search page
    setSearchDisplay(true);

    // Call fetch from itunes Api
    fetchItunes();

    setError(false);

  }

  return (
    <div className="searchContainer">

      {/* Search bar with onchange function */}

    <input className="searchBar" type="text" onChange={e => searchBarHandle(e.target.value)} placeholder="Search for your favorite items here"/>

      {/* Media select */}
      <div className="dataInput">

          {/* Radio button that has the value for the param to select the media of the search // Music */}
          <div className="checkbox">
          <input onClick={e => setMediaType(e.target.value)} type="radio" name="genre" value="&entity=song"/>
          <label>Music</label>
          </div>

          {/* Radio button that has the value for the param to select the media of the search "Movie" */}
          <div className="checkbox">
          <input onClick={e => setMediaType(e.target.value)} type="radio" name="genre" value="&entity=movie"/>
          <label>Movie</label>
          </div>

          {/* Radio button that has the value for the param to select the media of the search "Tv Show" */}
          <div className="checkbox">
          <input onClick={e =>  setMediaType(e.target.value)} type="radio" name="genre" value="&entity=tvShow"/>
          <label>TV show</label>
          </div>

          {/* Radio button that has the value for the param to select the media of the search "Podcast" */}
          <div className="checkbox">
          <input onClick={e => setMediaType(e.target.value)} type="radio" name="genre" value="&entity=podcast"/>
          <label>Podcast</label>
          </div>

          {/* Radio button that has the value for the param to select the media of the search "Music videos" */}
          <div className="checkbox">
          <input onClick={e => setMediaType(e.target.value)} type="radio" name="genre" value="&entity=musicVideo"/>
          <label>Music video</label>
          </div>

          {/* Radio button that has the value for the param to select the media of the search "Audio book " */}
          <div className="checkbox">
          <input onClick={e => setMediaType(e.target.value)} type="radio" name="genre" value="&entity=audiobook"/>
          <label>Audiobook</label>
          </div>

          {/* Radio button that has the value for the param to select the media of the search "Short film" */}
          <div className="checkbox">
          <input onClick={e => setMediaType(e.target.value)} type="radio" name="genre" value="&entity=shortFilm"/>
          <label>Short film</label>
          </div>

          {/* Radio button that has the value for the param to select the media of the search "E-book" */}
          <div className="checkbox">
          <input onClick={e => setMediaType(e.target.value)} type="radio" name="genre" value="&entity=ebook"/>
          <label>E-book</label>
          </div>

          {/* Radio button that has the value for the param to select the media of the search "All media" */}
          <div className="checkbox">
          <input onClick={e => setMediaType(e.target.value)} type="radio" name="genre" value="/" defaultChecked/>
          <label>All</label>

    </div>

    </div>

      {/* Search button with click function to search results */}
      <button className="searchBtn"type="button" onClick={() => searchButtonHandle()}>search</button>

    </div>
  )
}
