const { get } = require("mongoose");
{
let createComment = function(){
    let newCommentForm = $('#new-comments-form');

    newCommentForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type:'post',
            url:'/comments/create',
            data:newCommentForm.serialize(),
            success: function(data){
                let newComment = newCommentDom(data.data.comment);
                $('#post-comments-list>ul').prepend(newComment);   
                deleteComment($(' .delete-comment-button',newComment)); 
            } ,
            error:function(error){
                console.log(error.responseText);
            }
        });

    })
}

    let newCommentDom = function(comment){
            return $(`<ul id="post-comments-${comment._id}">
            <li>
            <% for(let comment of post.comment){%>
                <p>
                   
                        <small>
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                        </small>
                   
                    ${comment.content}
                    <br>
                    <small>
                        ${comment.user.name}
                    </small>
                </p>
        
            <%}%>
        </li>
        </ul>`)
    }

    // delete comment

    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`post-comments-${data.data.comment_id}`).remove();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }

    createComment();    

}