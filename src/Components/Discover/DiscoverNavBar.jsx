import React, { useContext } from "react";
import DiscoverNavBarNumbers from "./DiscoverNavBarNumbers";
import DiscoverContext from "../../context/DiscoverContext";

function DiscoverNavBar () {
    /* Destructuring the pages array from the DiscoverContext. */
    const {pages} = useContext(DiscoverContext)

    /* Returning a div with the className of discoverNav. It is also mapping through the pages array
    and returning a DiscoverNavBarNumbers component for each element in the array. */
    return (
            <div className="discoverNav">
                {pages.map((elem) => {
                    return (
                        <DiscoverNavBarNumbers elem={elem} key={elem} />
                    )
                 })}
            </div>
    )
}

export default DiscoverNavBar