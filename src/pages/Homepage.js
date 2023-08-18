import { useState, useEffect } from 'react';
import './Homepage.css';
import './Loading.css';
import HeaderNav from "../components/HeaderNav";
import PostForm from "../components/PostForm";
import Post from '../components/Post';


function Homepage() {

    const [load_quantity, setQuantity] = useState(10);
    const [counter, setCounter] = useState(0);
    const [is_loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    
    function set_top_offset() {
        const header_nav = document.querySelector('#header-nav');
        const homepage = document.querySelector('#Homepage');
        homepage.style.paddingTop = header_nav.offsetHeight + 'px';
    }

    useEffect (() => {
        document.title = 'Home - Social Network';

        function get_posts() {
            const start = counter;
            const end = counter + load_quantity;
            setCounter(end);
            
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
                    console.log(JSON.parse(response)); // DEBUG
                    const new_posts = JSON.parse(response);
                    if (new_posts.length === 0) {
                        window.onscroll = undefined;
                    } else {
                        setPosts(posts.concat(new_posts));
                    }
                }
                setLoading(false);
                return false;
            });
        }
        set_top_offset();
        if (counter === 0) {
            get_posts();
        }     
        window.onscroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                get_posts();
            }
        };

    }, [posts, counter, load_quantity, is_loading]);

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
                        key={post.pk}
                        user_id={post.fields.user}
                        text={post.fields.text}
                        created_at={post.fields.created_at}
                        post_img_url={'media/' + post.fields.img}
                        likes={post.fields.likes}
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
                    
                    Following Posts
                </div>

            </div>

        </>     
    );
}

export default Homepage;