import "./Sidebar.css";
import MainLink from "./MainLink";
import { useState, useEffect } from "react";
import { json } from "react-router-dom";


function Sidebar({user}) {

    if  (user !== undefined) {
        user = JSON.parse(user);
        console.log(user);
    }

    function Userbar({user}) {

        function logout() {
            localStorage.removeItem("logged_user");
        }

        return (
                <>
                <div id="user-bar" className="side-item-div">
    
                    <div className="post-profile-div">
                        <a href="user.page_url">
                            <img
                                className="profile-pic"
                                src={user.profile_picture_url}
                                alt=''
                            />
                        </a>
                    </div>
    
                    <div className="user-bar-item">
                        <div className="username-div">
                            <a className="name-link" href="user.page_url">
                                <strong className="username">
                                    {user.first_name} {user.last_name}
                                </strong>
                            </a>
                            <div className="subtle-username">
                                @{user.username}
                            </div>
                        </div>
                    </div>
    
                    <div onClick={logout} className="side-item-div logout-side-div">
                        <a className="" href="/logout">
                            <img
                                className="logout"
                                src="logout.svg"
                                alt=""
                            />
                        </a>
                    </div>
    
                </div>
                </>
            
        );
    
    }
    
    return (
        <>
        <div id="side-bar" className="side-bar-div">

            <div className="mainlink-div">

                <MainLink name="" img_source="favicon.svg"          url={"/home"}   have_img={true}     have_name={false}     id=""/>
                <MainLink name="Homepage" img_source="homepage.svg" url="/home"     have_img={true}     have_name={true}      id=""/>
                <MainLink name="Search" img_source="search.svg"     url="/search"   have_img={true}     have_name={true}      id=""/>
                
                {user ? (
                    <>
                    <MainLink name="Profile" img_source="user.svg"      url="/profile"  have_img={true}     have_name={true}      id=""/>
                    </>
                ) : (
                    <>
                    <MainLink name="Log In" img_source=""        url="/login"    have_img={false}    have_name={true}      id="login-link"/>
                    <MainLink name="Register" img_source=""      url="/register" have_img={false}    have_name={true}      id="register-link"/>
                    </>
                )}

            </div>

            {user ? (
                <Userbar user={user}/>
            ) : (
                <></>
            )}

        </div>
        </>
    );

}

export default Sidebar;