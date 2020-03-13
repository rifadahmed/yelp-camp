var campground=require("../models/campground"),
    comment=require("../models/comment")
var middlewareObj={}

middlewareObj.isLoggedIn= function (req,res,next){
    if(req.isAuthenticated())
    {
      return  next()
    }
    req.flash('loginFirst', 'Please log in first.')

    res.redirect("/login");
}

middlewareObj.checkCampgroundOwnership=function (req,res,next){
    campground.findById(req.params.id,function(error,foundCamp){
        if(error)
        {
            console.log(error)
        }
    else
    {
        if(req.isAuthenticated())
        {
            
            if(foundCamp.author.id.equals(req.user._id)){
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

middlewareObj.checkCommentOwnership=function (req,res,next){
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
module.exports=middlewareObj;