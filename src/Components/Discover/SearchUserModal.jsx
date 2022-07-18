import React, { useContext, useEffect } from "react";
import DiscoverContext from "../../context/DiscoverContext";
import LandingContext from "../../context/LandingContext"

function SearchUserModal ({show}) {
    /* Destructuring the context object. */
    const { setSearchUserModal, searchUserModal, name, setName, setSingleModal, userName, setUserName, addSingleUser, singleUser } = useContext(DiscoverContext)

    const { userData } = useContext(LandingContext)

    /**
     * When the user clicks the close button, the search modal will close.
     */
    const closeModal = () => {
        setSearchUserModal(false)
    }

    
   /**
    * When the user clicks the search button, the search modal closes and the users are updated.
    */
    const search = () => {
        // updateUsers()
        setSearchUserModal(false)
    }

    /**
     * When the user clicks the button, the function will fetch the data from the API, and then add the
     * data to the page.
     */
    const updateUsers = () => {
        if((name !== null || name !== '') && (userName === null || userName === '')) {
            fetch(`http://localhost:8000/api/single/${name}`)
            .then(response => response.json())
            .then(data => addSingleUser(data[0]))
            .then(() => console.log(singleUser))
        } 
        if((name === null || name === '') && (userName !== null || userName === '')) {
            fetch(`http://localhost:8000/api/single/${userName}`)
            .then(response => response.json())
            // .then(data => console.log(data))
            .then(data => addSingleUser(data[0]))
        }
        if((name !== null || name !== '') && (userName !== null || userName !== '')) {
            fetch(`http://localhost:8000/api/single/${name}/${userName}`)
            .then(response => response.json())
            // .then(data => console.log(data))
            .then(data => addSingleUser(data[0]))
        }
        if(singleUser !== undefined) {
            setSingleModal(true)
        }

        setName(null)
        setUserName(null)
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
          let searchModal = document.querySelector('.searchUserModal')
        if(userData.dark_theme && searchUserModal) {
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
        <div className="searchUserContainer">
            <div className="searchUserModal">
                <button className="closeButton" onClick={closeModal}>Close</button>

            <div className="header">
                <h2>Find Your Better Match</h2>
            </div>

            <div className="searchUserContent">

                
                <div className="criteria">
                    <label htmlFor="name" className="attributeSelect">Search by a Name: </label>
                        <input type="text" defaultValue={null} name="name" id="name" placeholder={'First Name'} onChange={(e) => setName(e.target.value)}></input>
                </div>

                <div className="criteria">
                    <label htmlFor="userName" className="attributeSelect">Search by a Username: </label>
                        <input type="text" defaultValue={null} name="userName" id="userName" placeholder={'Username'} onChange={(e) => setUserName(e.target.value)}></input>
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

export default SearchUserModal