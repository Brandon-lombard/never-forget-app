import React, { useState, useEffect } from 'react'

// css
import './App.css';

// components
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserfavoriteList from './components/dataDisplay/UserFavoriteList';
import SearchedResultContainer from './components/dataDisplay/SearchedResultContainer';
import Loader from './components/loader/Loader';


function App() {

  // State
  // favorite list from saved json file

  const [ favoriteItems, setFavoriteItems ] = useState();
  const [ trackId, setTrackId ] = useState();

  // search result state Itunes Api

  const [ userSearch, setUserSearch ] = useState();
  const [ mediaType, setMediaType ] = useState("/");
  const [ searchResults, setSearchResults ] = useState();

  // Control state
  // data display 

  const [ searchDisplay, setSearchDisplay ] = useState(false);
  const [ favoriteItemsDisplay, setFavoriteItemsDisplay ] = useState(true);

  // error // loader
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ error, setError ] = useState(false);
  const [loading, setLoading ] = useState(true);

  // Use effect for running get request once
  useEffect(() => {

    // Fetch get request from express server http://localhost:8080/api/ on page load
    fetchFromExpressServer();

  },[]);

  // fetch function from express
  const fetchFromExpressServer = () => {

    // Set saved item list display hidden for loading animation
    setFavoriteItemsDisplay(false);

    // set error message false for error
    setError(false);

    // Set loading animation until fetch request hides it
    setLoading(true);

    // set time out for 2 second so loading animation can be displayed
    setTimeout(() => {

      // Fetch get request from express server http://localhost:8080/api/
      fetch(`/search`)
        .then(response => {
            
            // Handle response incase of an error if data was returned or not

            if(response.ok) {

                // Turn into javascript objects to use data from
              
                return response.json();
            }

            // If error send error message to state

            throw Error(`no content`);

        })
        .then(data => {

          // data handle for empty arr

          // check if array has data
          if(data.length === 0) {
            
            // if empty set error message telling the user there is no items saved yet
            setErrorMessage("No items saved yet");

            // Show this error in state
            setError(true);

            // change loading to false to stop loading animation
            setLoading(false);

            } else{
            
            // if there is objects inside the array set states of returned values

            // set error to hidden
            setError(false);

            // set loading to hidden
            setLoading(false);

            // set arr returned to state
            setFavoriteItems(data);
            
            setFavoriteItemsDisplay(true)

            }          
        })
        .catch(err => {

              // If different error, the type of error is returned here

              // if err occurs

              // show error
              setError(true);

              // set loading false
              setLoading(false);

            }
        );
    }, 1000);// 1 secs
    
  }

  // fetch from api function
  const fetchItunes = () => {

    // set loading state to show loading animation
    setLoading(true)

    // set timeout to give time for loading animation
    setTimeout(() => {

      // Fetch request to itunes search API
      fetch(`https://itunes.apple.com/search?term=${userSearch}${mediaType}`)
      .then(response => {
            
        // Handle response incase of an error if data was returned or not

        if(response.ok) {

            // Turn into javascript objects to use data from
          
            return response.json()
        }

        // If error send error message to state

        throw Error( `no media content for this artist ${userSearch}`  )

    })
      .then(data => {

          // data handle for empty arr

          // check if array has data
          if(data.results.length === 0) {

          // if empty set error message telling the user there is no items for this search
          setErrorMessage("No content available for this media");

          // Show this error in state
          setError(true);

          // change loading to false to stop loading animation
          setLoading(false);

          // hide previous search state display
          setSearchDisplay(false);
          }

          // hide animation if data is returned in array
          setLoading(false);
          
          // Set returned data in state
          setSearchResults(data.results);
      })
      .catch(err => {

        // If different error, the type of error is returned here

        // set error message of error
        setErrorMessage(err.message);

        // Show error state message
        setError(true)

        // set loading animation to false
        setLoading(false)
      }) 
    },1000); // 1 second

  }
  return (
    <div className="App">
    
    {/* Header component */}
    <Header /> 

    {/* Search bar component */}
    <SearchBar 
    
    setUserSearch = { setUserSearch }
    setMediaType = { setMediaType }
    fetchItunes = { fetchItunes }
    setSearchDisplay = { setSearchDisplay }
    setFavoriteItemsDisplay = { setFavoriteItemsDisplay }
    setError = { setError }
    setSearchResults = { setSearchResults }
    />

    {/* Error message display if error state is set to true */}
    { error && <h1 className="error"> {errorMessage} </h1> }

    {/* Loader animation display if error state is set to true */}
    { loading && <Loader />}

    {/* favorite item component display when set true */}
    { favoriteItemsDisplay && <UserfavoriteList 
    
    favoriteItems= { favoriteItems }
    setTrackId = { setTrackId }
    trackId = { trackId }
    fetchFromExpressServer = { fetchFromExpressServer }
    />
    }
    
    {/* Search result component display when set true */}
    { searchDisplay && <SearchedResultContainer 
    
    searchResults = { searchResults }
    fetchFromExpressServer = { fetchFromExpressServer }
    setSearchDisplay = { setSearchDisplay }
    setFavoriteItemsDisplay = { setFavoriteItemsDisplay }
    />
    } 

    {/* footer */}
    <footer>

      <h2>Never Forget app was created by &copy; Brandon Lombard in 2022</h2>

      {/* credit to site of search icon image */}
      
      <a target="" href="https://icons8.com/icon/59878/search">Search</a> icon by <a target="" href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}

export default App;
