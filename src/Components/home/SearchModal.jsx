import React, { useContext } from "react";
import DiscoverContext from "../../context/DiscoverContext";

function SearchModal ({show}) {
    const {searchModal, setSearchModal} = useContext(DiscoverContext)

    const closeModal = () => {
        setSearchModal(false)
    }

    return (
        <>
        {show ?
        <div className="searchContainer">
            <div className="searchModal">
                <button className="closeButton" onClick={closeModal}>Close</button>

            <div className="header">
                <h2>Search Criteria</h2>
            </div>

            <div className="content">

            </div>

            <div className="footer">
                <button className="submitSearchButton" onClick={closeModal}>Submit</button>
            </div>

            </div>
        </div>
        : null}
        </>
    )

}

export default SearchModal