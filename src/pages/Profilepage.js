import "./Profilepage.css";
import FollowBtn from "../components/FollowBtn";
import UnfollowBtn from "../components/UnfollowBtn";


function Profilepage({user}) {

    if  (user !== undefined) {
        user = JSON.parse(user);
        console.log(user);
    }

    return(

        <>
            <script src="network/scripts/profile.js"></script>

            <div className="post-div">

                <div className="profile-header">

                    <div className="profile-img-div">
                        <img
                            className="profile-img"
                            src={user.profile_picture_url}
                            alt="Profile Avatar"
                        />
                    </div>

                    <div className="profile-header-item">

                        <div className="profile-name">
                            {user.first_name} {user.last_name}
                        </div>

                        <div className="follow-div">

                            <button id="edit-profile-btn" className="secondary-btn" type="submit">edit profile</button>

                            <UnfollowBtn/>
                            <FollowBtn/>

                        </div>
                    </div>

                    <div className="subtle-text">
                        @{user.username}
                    </div>

                    <div className="profile-header-item">
                        <div className="profile-header-item">
                            following_count <span className="subtle-text mx-1">Following</span>
                        </div>
                        <div className="profile-header-item">
                            followers_count <span className="subtle-text mx-1">Followers</span>
                        </div>
                    </div>

                </div>
                
                <div id="all-posts-div">

                    for post in posts TODO
                
                </div>

            </div>
        </>

    );

}

export default Profilepage;