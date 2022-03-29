import React from 'react'

// css 
import "./userFavoriteCard.css"

export default function UserFavoriteCard({ id, track, artist, image, media, fetchFromExpressServer }) {

    // Pass id of selected card obj
    const handleDelete = (id) => {
          
          // fetch from "http://localhost:8080/" stored in proxy "/api/delete" for delete method
        
          // Using id of selected row to delete that object
          fetch(`/delete/${id}`, {
            method: 'DELETE',
        
          }).then(() => {
            
            // Reload data with updated version using get method in fetch method     
            fetchFromExpressServer();
        
          })
        }
        
  return (
    <div className="userFavCardWrapper"> 

        {/* Image from saved obj in json file */}
        <img src={`${ image }`} alt="Album art" />

         {/* Track name from saved obj in json file */}
        <h4 className="hover">Title : {`${ track  }`} </h4>

         {/* Artist name from saved obj in json file */}
        <h4>Artist : {`${ artist }`}</h4>

         {/* Media type from saved obj in json file */}
        <h4>Media : {`${ media }`} </h4>
        
        {/* Delete button to handle obj delete */}
        <button onClick={() => handleDelete(id)} type="button" className="deleteBtn">Delete item</button>

    </div>
  )
}
