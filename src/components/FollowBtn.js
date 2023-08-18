import "./FollowBtn.css"


function FollowBtn({user, follow, csrf_token}) {
    

    return(

        <>
            <form id="follow-form">
                <input id="follow_csrft" type="hidden" value={csrf_token}/>
                <input id="user-id" type="hidden" value="{{user.id}}"/>
                <input id="follow-id" type="hidden" value="{{user_obj.id}}"/>
                <button id="follow-btn" className="primary-btn" type="submit">follow</button>
            </form>
        </>

    );

}

export default FollowBtn;