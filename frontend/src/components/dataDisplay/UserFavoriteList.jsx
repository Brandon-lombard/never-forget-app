import React from 'react'

// css 
import "./userFavoriteList.css"

// Components
import UserFavoriteCard from './cards/UserFavoriteCard'

export default function UserFavoriteList({ favoriteItems, fetchFromExpressServer }) {
  return (
    <div className="userFavoriteListContainer">

        {/* Check if there is data in returned Json file from get method */ }
        {/* Header for Favorite list item page */}

        { favoriteItems && <div className="userFavoriteListWrapper">

           <h2 className="userFavoriteListHeader">List of favorite items</h2>

            { /* map out each obj in the cards*/}
              { favoriteItems.map(function(favoriteItem, i) {
                return (

                          <UserFavoriteCard key= { i }
                          
                          fetchFromExpressServer= { fetchFromExpressServer }
                          id= { favoriteItem.id }
                          image= { favoriteItem.image }
                          artist= { favoriteItem.artist }
                          media= { favoriteItem.media }
                          track= { favoriteItem.track }

                          />
                        )
                }) 
              }

        </div>

          }
    </div>
  )
}
