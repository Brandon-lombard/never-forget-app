import React from 'react'

// components
import SearchResultCard from './cards/SearchResultCard';

// css 
import './searchResultContainer.css'

export default function SearchedResultContainer({ searchResults, fetchFromExpressServer, setSearchDisplay, setFavoriteItemsDisplay }) {

  // Function to handle going back to favorite list of items
  const backBtnHandle = () => {

    // Search display hidden
    setSearchDisplay(false);

    // favorite list of items display show
    setFavoriteItemsDisplay(true);
  }
  return (
    <div className="searchResultContainer">

      { searchResults && <div className="ContentWrapper">

      {/* Header of Search Results page */}
        <h2 className="resultsHeading">'Search Results'</h2>

        {/* Back button */}
        <h2 className="back" onClick={() => backBtnHandle()}>Back to favorites</h2>

        <div className="results">

          {/* check if there is data in returned search results and map out each obj in teh cards*/}
          {searchResults.map(function(searchResult, i) {
              return (

                      <SearchResultCard key= { i }
                      
                      fetchFromExpressServer= { fetchFromExpressServer }
                      trackId= { searchResult.trackId }
                      image= { searchResult.artworkUrl100 }
                      artist= { searchResult.artistName }
                      mediaItem= { searchResult.kind }
                      song= { searchResult.trackName }
                      wrapperType= { searchResult.wrapperType }
                      collectionName= { searchResult.collectionName }
                      setSearchDisplay = { setSearchDisplay }
                      setFavoriteItemsDisplay = { setFavoriteItemsDisplay }
                      />
                    )
            }) 
          }
        </div>

      </div>
}
    </div>
  )
}
