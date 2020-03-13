var express=require("express"),
    passport=require("passport"),
    user    =require("../models/user")
    router=express.Router();
router.get("/",function(req,res){
    res.render("landing")
})


//auth route

//register route
router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    var username=new user({username:req.body.username});
    var password=req.body.password;
    user.register(username,password,function(error,newUser){
        if(error)
        {
            console.log(error)
            req.flash("userExist","A user with the given username is already registered");
            res.redirect("/register");
        }
        else
        {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/campgrounds")
            })
        }
    })

})

//log in routr
router.get("/login",function(req,res){

    res.render("login");
})

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds" ,
   
    failureRedirect: '/login'
   
}),function(req,res){
    res.send("logged in")
})

//logout route
router.get("/logout",function(req,res){
    req.logOut();
    req.flash('logout', 'You are logged out.')
    res.redirect("/campgrounds");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
      return  next()
    }
    res.redirect("/login");
}

module.exports=router;