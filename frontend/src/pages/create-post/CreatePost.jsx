import { useState, useEffect } from "react";
import "./create-post.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { ColorRing }  from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";


const CreatePost = () => {

   const dispatch = useDispatch();
   const { loading , isPostCreated } = useSelector(state => state.post);
   const { categories } = useSelector(state => state.category);

//bch n5dh valuer men input 


   const [ title, setTitle ]= useState("");
   const [ description, setDescription ]= useState("");
   const [ category, setCategory ]= useState("");
   const [ file, setFile ]= useState(null);



//bch njm nb3th les donnees eli fi input lel serveur
//Form Submit Handler

const formSubmitHandler = (e) =>
{
e.preventDefault();

if(title.trim() === "") return toast.error("Post Title is required");
if(category.trim() === "") return toast.error("Post Category is required");
if(description.trim() === "") return toast.error("Post Description is required");
if(!file) return toast.error("Post Image is required");



//file feha image lzm nb3thha l serveur forme data 

const formData = new FormData(); //classe men java script 
formData.append("image", file); //image key w file value 
formData.append("title", title);
formData.append("description", description);
formData.append("category", category);

//toast.error twali error dhahra lel user

//createpost y5dh formdata image w title w yb3thhom l serveur w serveur y7fdh data base


dispatch(createPost(formData));



};


//b3d ma y7fdh post fi serveur nhbou y7eli home page 


const navigate = useNavigate();
useEffect(() => { 
   if(isPostCreated) {
      navigate("/");
   }
}, [isPostCreated, navigate]);


useEffect(() => { 
   dispatch(fetchCategories());
}, []);


   
   return ( 

        <section className="create-post">
       
          <h1 className="create-post-title">
            Create New Post
            </h1> 

             <form onSubmit={formSubmitHandler} className="create-post-form">
                <input 
                type="text" 
                placeholder="Post Title"
                className = "create-post-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}  //value tmthel title eli yktbha most5dem w target ya3ni input 
                />
                <select 
                  value={category}
                  onChange={(e) =>  setCategory(e.target.value)} 
                  className = "create-post-input">
                    <option disabled value="">

                      Select A Category  
                    </option>

                    {categories.map(category =>
                     <option key={category._id} value={category.title}>
                        {category.title}
                     </option>
                     )}


                </select>

                <textarea 
                className="create-post-textarea" 
                rows="5"
                placeholder="Post Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                >

                </textarea>
                <input 
                type="file" 
                name="file" 
                id="file" 
                className="create-post-upload"
                onChange={(e) =>  setFile(e.target.files[0])} //taswira tet5zen fi inedx[0]
                />
                <button type="submit" className="create-post-btn">
                   {
                     loading ? 
                     (
                        <ColorRing
                        visible={true}
                         height="60"
                         width="60"
                         ariaLabel="blocks-loading"
                           wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                         colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                           />
                     ) : " Create"
                   }
                   </button>
             </form>
        </section>
     );
}
 
export default CreatePost;