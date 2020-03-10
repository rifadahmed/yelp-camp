var  express                    =require("express"),
     app                        =express(),
     bodyParser                 =require("body-parser"),
     mongoose                   =require("mongoose"),
     passport                   =require("passport"),
     LocalStrategy              =require("passport-local"),
     campground                 =require("./models/campground"),
     comment                    =require("./models/comment"),
     user                       =require("./models/user"),
     seedDB                     =require("./seed.js");
     mongoose.connect('mongodb+srv://rifad:rifad2023@cluster1-vyqk2.mongodb.net/yelp_Camp?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true  })
      seedDB()
    app.use(express.static(__dirname + '/public'))
    app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()))
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})
app.get("/",function(req,res){
    res.render("landing")
})

//index route
app.get("/campgrounds",function(req,res){
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
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
})


//create route
app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description;
    var newCamp={name:name,image:image,description:description}
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
app.get("/campgrounds/:id",function(req,res){
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

//new route for comments
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
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
app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
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

//auth route

//register route
app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    var username=new user({username:req.body.username});
    var password=req.body.password;
    user.register(username,password,function(error,newUser){
        if(error)
        {
            console.log(error)
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
app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login",passport.authenticate("local",{
    failureRedirect: '/login',
    successRedirect:"/campgrounds" 
}),function(req,res){
    res.send("logged in")
})

//logout route
app.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/campgrounds");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {
      return  next()
    }
    res.redirect("/login");
}
app.listen(process.env.PORT ||3000,function(){
    console.log("server started");
})