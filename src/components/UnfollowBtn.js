import { useEffect } from "react";
import "./UnfollowBtn.css";


function UnfollowBtn({csrf_token}) {
    
    useEffect(() => {
        const flwn_btn = document.querySelector("#following-btn");
        flwn_btn.addEventListener('mouseover', () => {
            const flwn_btn = document.querySelector("#following-btn");
            flwn_btn.innerHTML = 'unfollow';
            flwn_btn.style.color = '#ff0000';
            flwn_btn.style.backgroundcColor = '#330000';
        })
        flwn_btn.addEventListener('mouseout', () => {
            flwn_btn.style = '';
            flwn_btn.innerHTML = 'following';
        })
    })

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