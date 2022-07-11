import React, { useContext } from "react";
import DiscoverContext from "../../context/DiscoverContext";

function SearchModal ({show}) {
    /* Destructuring the context object. */
    const { setSearchModal, setDistance, setAge1, setAge2, setGender, age1, age2, gender, distance, addUsers} = useContext(DiscoverContext)

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
        // updateUsers()
    }

    /**
     * The function updateUsers() is a function that fetches data from the API and then adds the data to the addUsers() function.
     */
    const updateUsers = () => {

        /* Creating an object with the values of the state variables. */
        let data = {
            gender: gender,
            age1: age1,
            age2: age2,
            distance: distance
        }

        /* Creating an object with the method, body, and headers. */
        let fetchData = {
            method: 'GET',
            body: JSON.stringify(data),
            Headers: new Headers({
                'Content-Type': 'application/josn'
            })
        }

       /* Fetching data from the API and then adding the data to the addUsers() function. */
        fetch('https://find-luv.herokuapp.com/api/users', fetchData)
        .then(response => response.json())
        .then(data => addUsers(data))

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
                <select name="gender" id="gender" defaultValue={"male"} onChange={(e) => setGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                </div>

                
                {/* Creates two input fields that allow the user to select an age range. */}
                <div className="criteria">
                <label htmlFor="age" className="attributeSelect">Choose an Age Range: </label>
                    <input type="number" name="age1" id="age" min="18" max="100" step="1" placeholder="18" onChange={(e) => setAge1(e.target.value)}></input>
                
                    <input type="number" name="age1" id="age" min="18" max="100" step="1" placeholder="100" onChange={(e) => setAge1(e.target.value)}></input>
                </div>

                {/* A dropdown menu that allows the user to select a distance. */}
                <div className="criteria">
                <label htmlFor="distance" className="attributeSelect">Choose a Distance: </label>
                <select name="distance" id="distance" defaultValue={"25"} onChange={(e) => setDistance(e.target.value)}>
                    <option value="5">5 Miles</option>
                    <option value="10">10 Miles</option>
                    <option value="15">15 Miles</option>
                    <option value="20">20 Miles</option>
                    <option value="25">25 Miles</option>
                    <option value="30">30 Miles</option>
                    <option value="40">40 Miles</option>
                    <option value="50">50 Miles</option>
                    <option value="100">100 Miles</option>
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