import "./Profilepage.css";
import FollowBtn from "../components/FollowBtn";
import UnfollowBtn from "../components/UnfollowBtn";
import { useState, useEffect } from "react";
import Post from "../components/Post";
import { Link, useLocation, useParams } from "react-router-dom";
import BackBar from "../components/BackBar";


function Profilepage({logged_user}) {

    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [is_loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);
    const {username} = useParams();
    const [error, setError] = useState('User');

    if (logged_user !== null) {
        logged_user = JSON.parse(logged_user);
        console.log(logged_user);
    }

    function getUser() {
        setLoading(true);
        console.log('username: ' + username)

        fetch(`/profile?username=${username}`)
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                setError(response.error);
            }
            if (response.user) {
                setUser(JSON.parse(response.user));
            }
            setLoading(false);
        });
    }

    function getUserPosts() {
        setLoading(true);
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
                // console.log(user_posts);
                setPosts(posts.concat(user_posts));
            }
            setLoading(false);
        })
    }

    useEffect(() => {

        setLoading(true);

        if (user === undefined) {
            // console.log('NO USER SET');
            getUser();
        }
        if (user !== undefined) {
            // console.log('USER SET');
            if (user.username !== username) {
                // console.log('USER CHANGED');
                getUser();
                setPosts([]);
            }
            if (posts.length === 0) {
                // console.log('NEW POSTS UPDATED');
                getUserPosts();
            }
        }

        setLoading(false);
    }, [user, username, location, error, is_loading])

    if (user) {
        return(
            <>
                <BackBar title={username}/>
                
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

                                {logged_user !== null ? (
                                    <>
                                    {logged_user.username === username ? (
                                        <>
                                        <button id="edit-profile-btn" className="secondary-btn" type="submit">edit profile</button>
                                        </>
                                    ) : (
                                        <>
                                        <UnfollowBtn/>
                                        <FollowBtn/>
                                        </>
                                    )}
                                    </>
                                ) : (
                                    <>
                                    <Link to={'/login'}>
                                        <FollowBtn/>
                                    </Link>
                                    </>
                                )}
    
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
    
                        {is_loading ? (
                            <div className='loading-container'>
                                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                            </div>
                        ) : (
                            <></>
                        )}
    
                        {posts.map(post => {
                            return <Link className='nodecoration' to={`/post/${post.key}`}> <Post
                                key={post.key}
                                user_id={post.user_id}
                                profile_picture_url={post.profile_picture_url}
                                username={post.username}
                                text={post.text}
                                date={post.created_at}
                                post_img_url={post.image_url}
                                likes={post.likes}
                                comment_count={post.comment_count}
                            /></Link>;
                        })}
    
                        {posts.length === 0 ? (
                            <div className="nothing-here">nothing here yet.</div>
                        ) : (
                            <></>
                        )}
                    
                    </div>
    
                </div>
            </>
            );
    } else {
        return (<div className="nothing-here">{error}</div>);
    }

    }



export default Profilepage;