var express=require("express"),
    router=express.Router();
    campground=require("../models/campground")
router.get("/",function(req,res){
    campground.find({},function(error,allCampgrounds){
        if(error)
        {
            console.log("cant find");
        }
        else{
         res.render("campgrounds/index",{campgrounds:allCampgrounds})
        }
    })
     
 })
 
 //new route
 router.get("/new",isLoggedIn,function(req,res){
     res.render("campgrounds/new");
 })
 
 
 //create route
 router.post("/",function(req,res){
     var name=req.body.name;
     var image=req.body.image;
     var description=req.body.description;
     var author={
         id:req.user._id,
         username:req.user.username
     }
     console.log(author);
     var newCamp={name:name,image:image,description:description,author:author}
     campground.create(newCamp,function(error,camp){
         if(error)
         {
             console.log("cant create")
         }
         else
         {
             res.redirect("/campgrounds");
         }
     })
     
    
 })
 
 //show route
 router.get("/:id",function(req,res){
     var id=req.params.id
     campground.findById(id).populate("comments").exec(function(error,camp){
         if(error)
         {
             console.log("cant find");
         }
         else{
        
             res.render("campgrounds/show",{camp:camp})
     }
     })
 })
//edit campgrounds
router.get("/:id/edit",checkCampgroundOwnership,function(req,res){
    campground.findById(req.params.id,function(error,foundCamp){
    res.render("campgrounds/edit",{camp:foundCamp});

    })
   
})
//update campground
router.put("/:id/edit",checkCampgroundOwnership,function(req,res){
    newCampInfo=req.body.foundCamp;
    campground.findByIdAndUpdate(req.params.id,newCampInfo,function(error,updatedCamp){
        if(error)
        {
            console.log(error)
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//delete campgrounds
router.delete("/:id",checkCampgroundOwnership,function(req,res){
    campground.findByIdAndDelete(req.params.id,function(error,data)
    {
        if(error)
        {console.log(error)
        }
        else
        res.redirect("/campgrounds")
    })
   
})
 function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
      return  next()
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req,res,next){
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
 module.exports=router;