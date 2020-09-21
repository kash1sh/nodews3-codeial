// const { get } = require("mongoose");
// const { ToggleLike } = require("../../controllers/likes_controller");
// const POst = require("../../models/post");

{
    // method for submiting form data using ajax
    let createPost =function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
        
        // adding ajax part
        $.ajax({
            type:'post',
            url:'/posts/create',
            data:newPostForm.serialize(),
            sucess:function(data){
                let newPost = newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button',newPost));
                
                // CHANGE::
                new ToggleLike($('.toggle-like-button',newPost));
            },
            error:function(error){
                console.log(error.responseText);
            }
        });
        
        })
    }
    // method to create a post in DOM   
    let newPostDom = function(post){
        // CHANGE::show the count of likes
        return $(` <li id="post-${post._id}">
        <p>
           
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                </small>
            
          
            ${post.content}
            <br>
            <small>
                ${post.user.name}
            </small>
        <small>
            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">\
            0 Likes</a>
            </small>
            </p>
    </li>
        <div class="post-comments">
            
                <form action="/comments/create" method="POST">
                    <!-- <textarea name="content" cols="30" rows="3" placeholder="Lets Post"></textarea> -->
                    <input type="text" name="content" placeholder="Add Comment">
                    <input type="hidden" name="post" value="${post._id}">

                    <input type="submit" value="Add Comment">
                    </form>
                

                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                      
                    </ul>
                </div>
        </div>
    </li>`)
    }

// yaha pe, hune pehle post.ejs mein likes ke liye ek a tag daala, ab hamne ajax call ke liye use home_posts.js mein daala diya, ye basically
// call kar raha hai na, ajax call?  nahi nahi nahi ye h  ajax call -- ye sara jo `` backticks m h ye toh bss ek html structure h 
// jo hume callback data se bna liya  or html m append kra dia bss , jaise maine posts.ejs mein already ye a tag for likes ka html daala hua
// hai, toh yaha add karne ki kya need hai?   ok     so html m jo b lines chlri h vo tb chlri h jb page load hoga , ab yaha ajax ki wjh se 
// page load hi ni hota -- toh agr m khali call krke chd du -- toh database m post wgerah sab bn jaega but mere page p tbtk show nhi hoga
// jbtk refresh na kru -- or agr refesh krna pdra h toh fayda kya ajax se krne ka -- isiliye humne javascript ki help se ise append krdia 
// kuki html elements toh hum javascript se bna skte h na 
// acha 
    // Method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error:function(err){
                        console.log(err.responseText);
                }

            });
        })
    };
    
    let convertPostsToAjax = function(){
        $('#post-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);  
    
            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]  
            new PostComments(postId);
        });
    }
    createPost();
}
