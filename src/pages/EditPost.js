import BackBar from "../components/BackBar";
import PostForm from "../components/PostForm";

export default function EditPost() {

    const logged_user = JSON.parse(localStorage.getItem("logged_user"));

    return(

        <>
        <BackBar title={'Edit Post'}/>

        <PostForm
            user={logged_user}
            title={logged_user.username}
            placeholder={'Edit the text of your post here'}
            btn_name={'Save'}
        />
        </>
    );
}