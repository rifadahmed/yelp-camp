var express=require("express"),
    comment=require("../models/comment"),
    campground=require("../models/campground")
    router=express.Router(),
    middleware=require("../middleware")
//new route for comments
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(error,findData){
        if(error)
        {
            console.log(error)
        }
        else
        {
           // console.log(findData);
            res.render("comments/new",{camp:findData})
        }
    })
    
})

//crate route for comments
router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
    var newComment=req.body.comment;
    campground.findById(req.params.id,function(error,findCamp){
        if(error)
        {
            console.log(error)
        }
        else
        {
            comment.create(newComment,function(error,newComment){
                if(error)
                {
                    console.log(error)
                }
                else
                {
                    newComment.author.id=req.user._id;
                    newComment.author.username=req.user.username;
                    newComment.save();
                    findCamp.comments.push(newComment);
                    findCamp.save(function(error,data){
                        if(error)
                        {
                            console.log(error)
                        }
                        else{
                            console.log(data);
                            req.flash("commentAdded","Comment added successfully")
                            res.redirect("/campgrounds/"+req.params.id)
                        }
                    })
                }
            })

            // console.log(findData.comments)
            // findData.save();

        }
    })
})
//edit comment route
router.get("/campgrounds/:id/comments/:commentId/edit",middleware.checkCommentOwnership,function(req,res){
    var commentId=req.params.commentId;
    var campId=req.params.id;
 comment.findById(commentId,function(error,found){
     if(error)
     {
         console.log(error)
     }
     else
     {
        res.render("comments/edit",{found:found,campId:campId})
     }
 })    
})

//update comment route
router.put("/campgrounds/:id/comments/:commentId",middleware.checkCommentOwnership,function(req,res){
    var commentId=req.params.commentId;
    var updatedComment=req.body.comment;
    comment.findByIdAndUpdate(commentId,updatedComment,function(error,updated){
        req.flash("commentUpdated","Comment updated successfully")
        res.redirect("/campgrounds/"+req.params.id);
    })
    
}) 

router.delete("/campgrounds/:id/comments/:commentId",middleware.checkCommentOwnership,function(req,res){
    var commentId=req.params.commentId;
    var updatedComment=req.body.comment;
    comment.findByIdAndDelete(commentId,function(error,updated){
        req.flash("commentDeleted","Comment deleted successfully")
        res.redirect("/campgrounds/"+req.params.id);
    })
    
    
}) 




module.exports=router;