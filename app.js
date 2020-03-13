var  express                    =require("express"),
     app                        =express(),
     bodyParser                 =require("body-parser"),
     mongoose                   =require("mongoose"),
     passport                   =require("passport"),
     LocalStrategy              =require("passport-local"),
     methodOverride             =require("method-override"),
     campground                 =require("./models/campground"),
     comment                    =require("./models/comment"),
     user                       =require("./models/user")
     mongoose.connect('mongodb+srv://rifad:rifad2023@cluster1-vyqk2.mongodb.net/yelp_Camp?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true  })
     var flash = require('connect-flash')
     app.use(flash())
      var commentRoutes     =require("./routes/comments"),
          campgroundRoutes  =require("./routes/campgrounds"),
          indexRoutes       =require("./routes/index");
    app.use(express.static(__dirname + '/public'))
    app.use(methodOverride('_method'))

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
    res.locals.loginFirst=req.flash("loginFirst")
    res.locals.logout=req.flash('logout')
    res.locals.userExist=req.flash('userExist')
    res.locals.campUpdated=req.flash("campUpdated")
    res.locals.campDeleted=req.flash("campDeleted")
    res.locals.commentAdded=req.flash("commentAdded")
    res.locals.commentUpdated=req.flash("commentUpdated")
    res.locals.commentDeleted=req.flash("commentDeleted")
    next();
})

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(commentRoutes);
app.listen(process.env.PORT ||3000,function(){
    console.log("server started");
})