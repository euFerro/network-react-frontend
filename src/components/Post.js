import { Link } from "react-router-dom";
import "./Post.css"
import LikeBtn from "./LikeBtn";


function Post({user_id, post_id, username, profile_picture_url, text, post_img_url, date, likes, comment_count}) {    

    let post_img = '';
    if (post_img_url !== '') {

        post_img = <div className="post-img-div">
                        <img
                            className="post-img"
                            src={post_img_url}
                            alt="Post img"
                        />
                    </div>
    }

    return(

        <>
            <div className="post">

                <div className="post-profile-div">
                    <Link to={'/profile/' + username}>
                        <img
                            className="profile-pic"
                            alt="Avatar"
                            src={profile_picture_url}
                        />
                    </Link>
                </div>

                <div className="post-content">

                    <div className="post-header">
                        <Link className="name-link" to={'/profile/' + username}>
                            <span className="post-fullname">
                                {username}
                            </span>
                        </Link>
                        <span className="post-info">
                            @{username}
                        </span>
                        <span className="post-info">
                            {date.hour}:{date.minute} {date.month}/{date.day}/{date.year}
                        </span>
                    </div>
                    <Link className='nodecoration' to={`/post/${post_id}`}>
                        <div className="post-text">{text}</div>
                        {post_img}
                    </Link>

                    <div className="post-footer">

                        <LikeBtn post_id={post_id} likes={likes}/>

                        <div className="comment-div">
                            <div className="footer-btn-div">
                                <svg className="footer-svg" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssketch="http://www.bohemiancoding.com/sketch/ns">
                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketchtype="MSPage">
                                        <g sketchtype="MSLayerGroup" transform="translate(-100.000000, -255.000000)" fill="#000000">
                                            <path className="footer-path" fill="#777" d="M116,281 C114.832,281 113.704,280.864 112.62,280.633 L107.912,283.463 L107.975,278.824 C104.366,276.654 102,273.066 102,269 C102,262.373 108.268,257 116,257 C123.732,257 130,262.373 130,269 C130,275.628 123.732,281 116,281 L116,281 Z M116,255 C107.164,255 100,261.269 100,269 C100,273.419 102.345,277.354 106,279.919 L106,287 L113.009,282.747 C113.979,282.907 114.977,283 116,283 C124.836,283 132,276.732 132,269 C132,261.269 124.836,255 116,255 L116,255 Z" sketchtype="MSShapeGroup"></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <span className="footer-num">{comment_count}</span>
                        </div>

                    </div>

                </div>

            </div>
        </>

    );

}

export default Post;
