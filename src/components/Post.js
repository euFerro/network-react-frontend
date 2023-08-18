import "./Post.css"
import { useEffect, useState } from "react";


function Post({user_id, text, post_img_url, created_at, likes}) {

    function style_like_btn() {
        this.style.color = "#ee0055";
        this.childNodes[0].style.backgroundColor = "#330011";
        this.childNodes[0].childNodes[0].childNodes[0].style.fill = "#ee0055";
    }
    
    function unstyle_like_btn() {
        this.style.color = "#777";
        this.childNodes[0].style.backgroundColor = "transparent";
        this.childNodes[0].childNodes[0].childNodes[0].style.fill = "#777";
    }
    
    function style_comment_btn() {
        this.style.color = "#00ffff";
        this.childNodes[0].style.backgroundColor = "#003333";
        this.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.fill = "#00ffff";
    }
    
    function unstyle_comment_btn() {
        this.style.color = "#777";
        this.childNodes[0].style.backgroundColor = "transparent";
        this.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.fill = "#777";
    }    

    useEffect(() => {
        const like_divs = document.querySelectorAll('.like-div');
        like_divs.forEach(element => {
            element.onmouseover = style_like_btn;
            element.onmouseout = unstyle_like_btn;
        });

        const comment_divs = document.querySelectorAll('.comment-div');
        comment_divs.forEach(element => {
            element.onmouseover = style_comment_btn;
            element.onmouseout = unstyle_comment_btn;
        });
    })

    let post_img = '';
    if (post_img_url !== 'media/') {

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
                    <a href="post.user_url">
                        <img
                            className="profile-pic"
                            alt="Avatar"
                            src="profile_img_url"
                        />
                    </a>
                </div>

                <div className="post-content">

                    <div className="post-header">
                        <a className="name-link" href="post.user.page_url">
                            <span className="post-fullname">
                                {user_id} fullname
                            </span>
                        </a>
                        <span className="post-info">
                            @{user_id}
                        </span>
                        <span className="post-info">
                            {created_at}
                        </span>
                    </div>
                    
                    <div className="post-text">{text}</div>
                
                    {post_img}

                    <div className="post-footer">

                        <div className="like-div">
                            <div className="footer-btn-div">
                                <svg className="footer-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="footer-path" d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"/>
                                </svg>
                            </div>
                            <span className="footer-num">{likes}</span>
                        </div>

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
                            <span className="footer-num">post.comments</span>
                        </div>

                    </div>

                </div>

            </div>
        </>

    );

}

export default Post;
