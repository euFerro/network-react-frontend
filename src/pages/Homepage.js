import { useState, useEffect } from 'react';
import './Homepage.css';
import './Loading.css';
import HeaderNav from "../components/HeaderNav";
import PostForm from "../components/PostForm";
import Post from '../components/Post';


function Homepage({user}) {

    const [load_quantity, setQuantity] = useState(10);
    const [allPosts, setAllPosts] = useState([]);
    const [followingPosts, setFollowingPosts] = useState([]);
    const [is_loading, setLoading] = useState(false);
    let counter_all_posts = 0;
    let counter_following_posts = 0;

    if  (user !== undefined) {
        user = JSON.parse(user);
        // console.log(user);
    }
    
    function set_top_offset() {
        const header_nav = document.querySelector('#header-nav');
        const homepage = document.querySelector('#Homepage');
        homepage.style.paddingTop = header_nav.offsetHeight + 'px';
    }

    function getAllPosts() {
        // console.log('GET ALL POSTS');
        const start = counter_all_posts;
        const end = counter_all_posts + load_quantity;
        counter_all_posts = end;
        
        setLoading(true);
        fetch(`/posts?q=all-posts&start=${start}&end=${end}`, {
            "method": "GET"
        })
        .then(response => response.json())
        .then(response => {

            if (response.error) {
                alert(`(!) ${response.error}`);
                return false;
            } else {
                const posts = JSON.parse(response);
                if (posts.length === 0) {
                    window.onscroll = undefined;
                } else {
                    setAllPosts(allPosts.concat(posts));
                    // console.log(posts);
                }
            }
            setLoading(false);
            return false;
        });
    }

    function getFollowingPosts() {
        // console.log('GET FOLLOWING POSTS');
        const start = counter_following_posts;
        const end = counter_following_posts + load_quantity;
        counter_following_posts = end;
        
        setLoading(true);
        fetch(`/posts?q=following-posts&start=${start}&end=${end}`, {
            "method": "GET",
        })
        .then(response => response.json())
        .then(response => {

            if (response.error) {
                alert(`(!) Error - ${response.error}`);
                return false;
            } else {
                const posts = JSON.parse(response);
                if (posts.length === 0) {
                    window.onscroll = undefined;
                } else {
                    setFollowingPosts(followingPosts.concat(posts));
                    // console.log(posts);
                }
            }
            setLoading(false);
            return false;
        });
    }

    useEffect (() => {
        document.title = 'Home - Social Network';

        set_top_offset();
        if (counter_all_posts === 0 ) {
            getAllPosts();
        }
        if (counter_following_posts === 0) {
            getFollowingPosts();
        }
        window.onscroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                getAllPosts();
                // console.log('END OF PAGE');
            }
        };

    }, []);

    return(
        <>
            <HeaderNav all_posts_id={'all-posts-div'} following_posts_id={'following-posts-div'} user={user}/>

            <div id='Homepage'>
                
                {user ? (
                    <PostForm user={user}/>
                ) : (
                    <></>
                )}

                <div id="all-posts-div">

                {is_loading ? (
                    <div className='loading-container'>
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                ) : (
                    <></>
                )}

                {allPosts.map(post => {
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
                        />;
                })}

                {allPosts.length === 0 ? (
                    <div className='nothing-here'>Nothing here yet.</div>
                ) : (
                    <></>
                )}

                </div>

                <div id="following-posts-div">

                    {is_loading ? (
                        <div className='loading-container'>
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                        </div>
                    ) : (
                        <></>
                    )}

                    {followingPosts.map(post => {
                        return <Post
                            key={post.pk}
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
                    
                    {followingPosts.length === 0 ? (
                        <div className='nothing-here'>Nothing here yet.</div>
                    ) : (
                        <></>
                    )}

                </div>

            </div>

        </>     
    );
}

export default Homepage;