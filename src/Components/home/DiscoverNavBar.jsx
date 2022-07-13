import React, { useContext } from "react";
import DiscoverNavBarNumbers from "./DiscoverNavBarNumbers";
import DiscoverContext from "../../context/DiscoverContext";

function DiscoverNavBar () {
    const {pages} = useContext(DiscoverContext)

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