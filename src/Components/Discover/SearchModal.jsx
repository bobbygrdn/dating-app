import React, { useContext, useEffect } from "react";
import DiscoverContext from "../../context/DiscoverContext";
import LandingContext from "../../context/LandingContext"

function SearchModal ({show}) {
    /* Destructuring the context object. */
    const { setSearchModal, setDistance, setAge1, setAge2, setGender, age1, age2, gender, distance, addUsers} = useContext(DiscoverContext)

    const { userData } = useContext(LandingContext)

    /**
     * When the user clicks the close button, the search modal will close.
     */
    const closeModal = () => {
        setSearchModal(false)
    }

    
   /**
    * When the user clicks the search button, the search modal closes and the users are updated.
    */
    const search = () => {
        setSearchModal(false)
        updateUsers()
    }

    /**
     * When the user clicks the button, the function will fetch the data from the API, and then add the
     * data to the page.
     */
    const updateUsers = () => {
       fetch(`https://find-luv.herokuapp.com/api/current/${userData.user_id}/${age1}/${age2}/${gender}`)
       .then(response => response.json())
       .then(data => addUsers(data))

    }   
    
    /* Checking if the show variable is true or false. If the show variable is true, then the
        checkForDarkTheme() function will be called. If the show variable is false, then the
        checkForDarkTheme() function will not be called. */
    useEffect(() => {
        checkForDarkTheme()
      },[show])
  
      /**
       * If darkTheme is true, add the class 'singleUserModalDarkTheme' to the searchModal element.
       * If darkTheme is false, remove the class 'singleUserModalDarkTheme' from the searchModal
       * element.
       * @returns the classList.add or classList.remove method.
       */
      const checkForDarkTheme = () => {
          let searchModal = document.querySelector('.searchModal')
        if(userData.dark_theme && searchModal) {
      return searchModal.classList.add('singleUserModalDarkTheme')
        }
        if(!userData.dark_theme && searchModal){
         return searchModal.classList.remove('singleUserModalDarkTheme')
        }
      }

    /* Returning the HTML code for the search modal. */
    return (
        <>
        {/* A ternary operator. If the show variable is true, then the HTML code will be rendered. If the show variable is false, then nothing will be rendered.  */}
        {show ?
        <div className="searchContainer">
            <div className="searchModal">
                <button className="closeButton" onClick={closeModal}>Close</button>

            <div className="header">
                <h2>Find Your Better Match</h2>
            </div>

            <div className="searchContent">

                {/* This is a dropdown menu that allows the user to select a gender. */}
                <div className="criteria">
                <label htmlFor="gender" className="attributeSelect">Choose a Gender: </label>
                <select name="gender" id="gender" defaultValue={null} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Choose a Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                </div>

                
                {/* Creates two input fields that allow the user to select an age range. */}
                <div className="criteria">
                <label htmlFor="age" className="attributeSelect">Choose an Age Range: </label>
                    <input type="number" defaultValue={null} name="age1" id="age" min="18" max="100" step="1" placeholder={'Age 1'} onChange={(e) => setAge1(e.target.value)}></input>
                
                    <input type="number" defaultValue={null} name="age1" id="age" min="18" max="100" step="1" placeholder={'Age 2'} onChange={(e) => setAge2(e.target.value)}></input>
                </div>

                {/* A dropdown menu that allows the user to select a distance. */}
                <div className="criteria">
                <label htmlFor="distance" className="attributeSelect">Choose a Distance: </label>
                <select name="distance" id="distance" onChange={(e) => setDistance(e.target.value)}>
                    <option value="">Choose a Distance</option>
                    <option value="20">20 Miles</option>
                    <option value="25">25 Miles</option>
                </select>
                </div>

            </div>

            {/* A button that allows the user to submit the search. */}
            <div className="footer">
                <button className="submitSearchButton" onClick={search}>Submit</button>
            </div>

            </div>
        </div>
        : null}
        </>
    )

}

export default SearchModal