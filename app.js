var  express                    =require("express"),
     app                        =express(),
     bodyParser                 =require("body-parser"),
     mongoose                   =require("mongoose"),
     passport                   =require("passport"),
     LocalStrategy              =require("passport-local"),
     campground                 =require("./models/campground"),
     comment                    =require("./models/comment"),
     user                       =require("./models/user")
     mongoose.connect('mongodb+srv://rifad:rifad2023@cluster1-vyqk2.mongodb.net/yelp_Camp?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true  })
   
      var commentRoutes     =require("./routes/comments"),
          campgroundRoutes  =require("./routes/campgrounds"),
          indexRoutes       =require("./routes/index");
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

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(commentRoutes);
app.listen(process.env.PORT ||3000,function(){
    console.log("server started");
})