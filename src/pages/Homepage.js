import { useState, useEffect } from 'react';
import './Homepage.css';
import './Loading.css';
import HeaderNav from "../components/HeaderNav";
import PostForm from "../components/PostForm";
import Post from '../components/Post';


function Homepage() {

    const [load_quantity, setQuantity] = useState(10);
    const [posts, setPosts] = useState([]);
    const [is_loading, setLoading] = useState(false);
    let counter = 0;

    
    function set_top_offset() {
        const header_nav = document.querySelector('#header-nav');
        const homepage = document.querySelector('#Homepage');
        homepage.style.paddingTop = header_nav.offsetHeight + 'px';
    }

    function get_posts() {
        const start = counter;
        const end = counter + load_quantity;
        counter = end;
        
        setLoading(true);
        fetch(`/posts?start=${start}&end=${end}`, {
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
                    // console.log(posts);
                        setPosts(posts.concat(posts));
                        // DEBUG
                        // console.log('POSTS ARRAY SET');
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
        if (counter <= 0) {
            get_posts();
        }     
        window.onscroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                get_posts();
                console.log('END OF PAGE');
            }
        };

    }, []);

    return(
        <>
            <HeaderNav all_posts_id={'all-posts-div'} following_posts_id={'following-posts-div'}/>

            <div id='Homepage'>
                
                <PostForm/>

                <div id="all-posts-div">

                {is_loading ? (
                    <div className='loading-container'>
                        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                ) : (
                    <></>
                )}

                {posts.map(post => {
                    return <Post
                        key={post.key}
                        user_id={post.user_id}
                        profile_picture_url={post.profile_picture_url}
                        username={post.username}
                        text={post.text}
                        date={post.date}
                        post_img_url={post.image_url}
                        likes={post.likes}
                        />;
                })}

                </div>

                <div id="following-posts-div">

                    {is_loading ? (
                        <div className='loading-container'>
                            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                        </div>
                    ) : (
                        <></>
                    )}
                    
                    Following Posts Here
                </div>

            </div>

        </>     
    );
}

export default Homepage;