import "./Profilepage.css";
import FollowBtn from "../components/FollowBtn";
import UnfollowBtn from "../components/UnfollowBtn";
import { useState, useEffect } from "react";
import Post from "../components/Post";


function Profilepage({user}) {

    const [posts, setPosts] = useState([]);
    let counter = 0;

    if  (user !== undefined) {
        user = JSON.parse(user);
        console.log(user);
    }

    function getUserPosts() {
        fetch(`/posts?q=user-posts&username=${user.username}`, {
            "method": "GET",
        })
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                alert(`(!) Error - ${response.error}`);
                return false;
            } else {
                const user_posts = JSON.parse(response);
                console.log(user_posts);
                setPosts(posts.concat(user_posts));
                counter++;
            }
            return false;
        })
    }

    useEffect(() => {
        if (counter === 0) {
            getUserPosts();
        }
    }, [])

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
                            {user.followers_count} <span className="subtle-text mx-1">Followers</span>
                        </div>
                        <div className="profile-header-item">
                            {user.following_count} <span className="subtle-text mx-1">Following</span>
                        </div>
                    </div>

                </div>
                
                <div id="all-posts-div">

                    {posts.map(post => {
                        return <Post
                            key={post.key}
                            user_id={post.user_id}
                            profile_picture_url={post.profile_picture_url}
                            username={post.username}
                            text={post.text}
                            date={post.created_at}
                            post_img_url={post.image_url}
                            likes={post.likes}
                            comment_count={post.comment_count}
                            />
                    })}
                
                </div>

            </div>
        </>

    );

}

export default Profilepage;