import "./UnfollowBtn.css";


function UnfollowBtn({csrf_token}) {
    

    return(

        <>
            <form id="unfollow-form">
                <input id="unfollow_csrft" type="hidden" value={csrf_token}/>
                <input id="user-id" type="hidden" value="{{user.id}}"/>
                <input id="follow-id" type="hidden" value="{{user_obj.id}}"/>
                <button id="following-btn" className="secondary-btn" type="submit">following</button>
            </form>
        </>

    );

}

export default UnfollowBtn;