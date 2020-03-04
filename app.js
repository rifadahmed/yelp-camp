var  express    =require("express"),
     app        =express(),
     bodyParser =require("body-parser"),
     mongoose   =require("mongoose"),
     comment    =require("./models/comment"),
     campground =require("./models/campground"),
     seedDB     =require("./seed.js");
     mongoose.connect('mongodb+srv://rifad:rifad2023@cluster1-vyqk2.mongodb.net/yelp_Camp?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true  })
      seedDB()
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
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
app.get("/campgrounds/:id/comments/new",function(req,res){
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
app.post("/campgrounds/:id/comments",function(req,res){
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
app.listen(process.env.PORT ||3000,function(){
    console.log("server started");
})