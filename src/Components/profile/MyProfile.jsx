import React, { useState } from 'react'
import './profileStyles.css'
import DarkThemeToggleBtn from './DarkThemeToggleBtn.jsx'
import FontSizeSelection from './FontSizeSelection.jsx'
import FontStyleSelection from './FontStyleSelection.jsx'
import ProfilePicPlaceHolder from './ProfilePicPlaceHolder'

function MyProfile({ darkTheme, setDarkTheme, dummyUser, setDummyUser }) {
    const [editing, setEditing] = useState(false)

    const handleEditClick = () => {
        console.log('clicked EDIT, now page can be edited')
        setEditing(true)
    }

    const handleSaveClick = () => {
        console.log('clicked SAVE, update request sent')
        setEditing(false)
    }
    return (
        <div className='profile-page-main-container'>
            <div className='pic-container'>
                {dummyUser !== null ? <img src={dummyUser['profile_pic_url']} alt='profile-pic' /> : <ProfilePicPlaceHolder />}
            </div>

            <div className='snapshot-container'>
                <h5>snapshot info</h5>
                <p>I'm baby put a bird on it lumbersexual church-key, meggings glossier bushwick normcore deep v shabby chic banjo aesthetic heirloom portland pitchfork jianbing. Pinterest master cleanse fam neutra palo santo pabst mlkshk ramps direct trade tacos gastropub blue bottle woke. VHS yr green juice, quinoa master cleanse tattooed etsy freegan narwhal tbh slow-carb. Polaroid forage cronut small batch, offal actually single-origin coffee distillery freegan meh lo-fi. Taxidermy vexillologist copper mug bicycle rights DIY occupy chicharrones franzen tote bag irony. Mumblecore cray single-origin coffee wolf keytar deep v. Kickstarter snackwave flexitarian 8-bit chia. Twee mlkshk pickled intelligentsia. Normcore brooklyn biodiesel XOXO, banh mi kinfolk photo booth organic locavore next level hexagon schlitz activated charcoal hashtag. Subway tile yr fingerstache lomo quinoa. Yr chia listicle flexitarian sustainable, keffiyeh kogi iPhone craft beer hella austin viral quinoa messenger bag. Bitters vinyl waistcoat sartorial, actually pop-up viral bushwick blue bottle beard taiyaki salvia.</p>
            </div>

            <div className='match-preferences-options-container'>
                <h5>match preferences / options</h5>
                <p>I'm baby biodiesel twee before they sold out yuccie, yr jianbing umami chicharrones lumbersexual man bun banh mi. Pinterest echo park DIY cornhole post-ironic keytar semiotics kinfolk. Migas pabst shabby chic, mixtape schlitz godard keytar distillery vape lumbersexual intelligentsia shoreditch. Raclette af fanny pack +1 bitters.</p>
            </div>

            <div className='bio-details-container'>
                <h5>bio / details</h5>
                <p>
                    I'm baby fixie gluten-free pabst tumeric DSA vice. Pop-up taxidermy bespoke hammock, cornhole man braid wolf forage selfies asymmetrical mlkshk. Ethical pok pok praxis kitsch banjo, stumptown tacos flannel shoreditch lyft twee. Echo park vegan enamel pin tbh. Pinterest truffaut squid you probably haven't heard of them, listicle etsy venmo af man bun ugh adaptogen tumblr master cleanse VHS. Distillery plaid meggings listicle meditation PBR&B edison bulb small batch readymade vaporware typewriter affogato brooklyn. Ennui church-key taxidermy fingerstache squid.</p>
                <p>
                    Brooklyn DIY VHS blog, narwhal knausgaard shabby chic vaporware waistcoat jianbing. Poke kombucha tbh butcher truffaut. Farm-to-table yes plz franzen try-hard, cardigan before they sold out fanny pack butcher keytar. Disrupt quinoa farm-to-table franzen polaroid.
                </p>
            </div>

            <div className='user-settings-container'>
                <DarkThemeToggleBtn darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                <FontSizeSelection dummyUser={dummyUser} setDummyUser={setDummyUser} />
                <FontStyleSelection dummyUser={dummyUser} setDummyUser={setDummyUser} />
            </div>

            {editing ? <button className="edit-save-btn" onClick={handleSaveClick}>Save</button> : <button className="edit-save-btn" onClick={handleEditClick}>Edit</button>}

        </div>
    )
}

export default MyProfile