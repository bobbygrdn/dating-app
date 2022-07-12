import React, { useContext } from "react";
import DiscoverNavBarNumbers from "./DiscoverNavBarNumbers";
import DiscoverContext from "../../context/DiscoverContext";

function DiscoverNavBar () {
    const {pages, setPage} = useContext(DiscoverContext)

    const handleClick = (e) => {
        // setPage(e.target.id)
        console.log(e.target.id);
    }

    return (
            <div className="discoverNav">
                {pages.map((elem) => {
                    return (
                        <DiscoverNavBarNumbers elem={elem} key={elem} handleClick={handleClick} />
                    )
                 })}
            </div>
    )
}

export default DiscoverNavBar