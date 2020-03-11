var express=require("express"),
    comment=require("../models/comment")
    router=express.Router();
//new route for comments
router.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
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
router.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
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
router.get("/campgrounds/:id/comments/:commentId/edit",checkCommentOwnership,function(req,res){
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
router.put("/campgrounds/:id/comments/:commentId",checkCommentOwnership,function(req,res){
    var commentId=req.params.commentId;
    var updatedComment=req.body.comment;
    comment.findByIdAndUpdate(commentId,updatedComment,function(error,updated){
        res.redirect("/campgrounds/"+req.params.id);
    })
    
}) 

router.delete("/campgrounds/:id/comments/:commentId",checkCommentOwnership,function(req,res){
    var commentId=req.params.commentId;
    var updatedComment=req.body.comment;
    comment.findByIdAndDelete(commentId,function(error,updated){
        res.redirect("/campgrounds/"+req.params.id);
    })
    
    
}) 



function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
      return  next()
    }
    res.redirect("/login");
}
function checkCommentOwnership(req,res,next){
    comment.findById(req.params.commentId,function(error,foundComment){
        if(error)
        {
            console.log(error)
        }
    else
    {
        if(req.isAuthenticated())
        {
            
            if(foundComment.author.id.equals(req.user._id)){
                next();
            }
            else
            res.redirect("back")
        }
        else
        {
            res.redirect("/login");
        }
        
       
    }
    })
   

}
module.exports=router;