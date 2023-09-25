import "./FollowBtn.css"


function FollowBtn({user_id, follow_id}) {
    
    function followUser() {
        const csrf_token = document.cookie;
        console.log(`csrf_token: ${csrf_token}`)

        const formData = FormData();
        formData.append('user', user_id);
        formData.append('follow', follow_id);

        fetch('/follow', {
            "method": "POST",
            "credentials": "same-origin",
            "headers": {
                "X-CSRFToken": csrf_token
            },
            "body" : formData
        })
        .then(response => response.json())
        .then(response => {
            // do something
            if (response.ok) {
                console.log(response.ok);
            }
            if (response.error) {
                alert(response.error)
            }
        })
        return false;
    }

    return(

        <>
        <button onClick={followUser} id="follow-btn" className="primary-btn" type="submit">follow</button>
        </>

    );

}

export default FollowBtn;