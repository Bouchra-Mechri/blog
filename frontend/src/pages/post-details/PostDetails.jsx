import { useEffect , useState } from "react";
import { Link, useParams , useNavigate } from "react-router-dom";
import "./post-details.css";
import {toast} from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { 
  deletePost,
   fetchSinglePost,
   toggleLikePost,
   updatePostImage
   } from "../../redux/apiCalls/postApiCall";


const PostDetails = () => {

  const dispatch = useDispatch();
  const { post } = useSelector(state => state.post);
  //var [post,setPost]=useState(null);


  const { user } = useSelector(state => state.auth); //y3ni user hedha mt3ou post ynjm ychouf delete w update 

    const { id } = useParams();
//ay id men url string lzm n7wlha ila number nst3ml parseint y7wl string l number


  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

useEffect(() => { 
  window.scrollTo(0, 0);
  dispatch(fetchSinglePost(id))
}, [id]);


// update Image Submit Handler 

const updateImageSubmitHandler = (e) => {
  
  e.preventDefault();
  if(!file) return toast.warning("there is no file!");

 const formData = new FormData();
 formData.append("image", file);
 dispatch(updatePostImage(formData,post?._id));
};


const navigate = useNavigate();

//Delete Post Handler 

const deletePostHandler = () => {

//ba3d ma t3ml delete l post hezni l profile mt3i 
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this post!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((isOk) => {
    if (isOk) {
   dispatch(deletePost(post?._id));
   navigate(`/profile/${user?._id}`);
    }
  });

}



    return (
        
    <section className="post-details"> 
     <div className="post-details-image-wrapper">
        <img
        src={file ? URL.createObjectURL(file) : post?.image.url}
        alt=""
        className="post-details-image"   
        />
 


{/* idha user post mt3ou ynjm yatl3lou upload wala update lel post mt3ou  */}




{user?._id === post?.user?._id && ( 

<form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
<label htmlFor="file" className="update-post-label">
   <i className="bi bi-image-fill"></i>
   Select new image
</label>
<input
 style={{ display:'none' }} 
 type="file" 
 name="file"
  id="file"
  onChange={(e) => setFile(e.target.files[0])}
   />
<button type="submit">upload</button>
</form>

)}

     </div>
     <h1 className="post-details-title">{ post?.title } </h1>
     <div className="post-details-user-info">
        <img src={post?.user.profilePhoto?.url} alt="" className="post-details-user-image" />
        <div className="post-details-user">
            <strong>
                <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
            </strong>
            <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
     </div>
     <p className="post-details-description">
        {post?.description}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Enim quod laudantium quaerat distinctio facilis tempora,
         natus nisi placeat maiores provident ipsam aperiam dolor veniam quasi quae possimus perferendis architecto vero?
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
        Enim quod laudantium quaerat distinctio facilis tempora,
         natus nisi placeat maiores provident ipsam aperiam dolor veniam quasi quae possimus perferendis architecto vero?
         
     </p>
     <div className="post-details-icon-wrapper">

        <div>

{/* ken user mawjoud ynjm ychouf likes  */}

{
  user && ( 
    <i
    onClick={() => dispatch(toggleLikePost(post?._id))}
     className={
      //idha ken id fi likes array y3ni 3aml like
      //idha user 3aml like bch ychouf icon loul sinon ychouf icon 2
      //methode include m java scrpit  
      post?.likes.includes(user?._id)
      ? "bi bi-hand-thumbs-up-fill"
      : "bi bi-hand-thumbs-up"

     }
     ></i>

  )
}


          <small>{post?.likes.length} likes</small>
        </div>


     {user?._id === post?.user?._id && (

      <div>
      <i onClick={() => setUpdatePost(true)} className="bi bi-pencil-square"></i>
      <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>

      </div>

     )}
     </div>
     {
       user ? <AddComment postId={post?._id}/> : 
       <p className="post-details-info-write">
        to write a comment you should login first 
       </p>
     }


    
   <CommentList comments={post?.comments} />

   {updatePost && <UpdatePostModal post={post} setUpdatePost = {setUpdatePost} />}

    </section> 
    );
};
 
export default PostDetails;