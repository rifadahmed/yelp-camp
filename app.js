var  express    =require("express"),
     app        =express(),
     bodyParser =require("body-parser"),
     mongoose   =require("mongoose");
     mongoose.connect('mongodb+srv://rifad:rifad2023@cluster1-vyqk2.mongodb.net/yelp_Camp?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true  })


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");

//campgroundSchema
var campgroundSchema= new mongoose.Schema({
    name:String,
    image:String,
    description:String
})

//campgroundMode
var campground=mongoose.model("campground",campgroundSchema);





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
        res.render("index",{campgrounds:allCampgrounds})
       }
   })
    
})

//new route
app.get("/campgrounds/new",function(req,res){
    res.render("new");
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
    campground.findById(id,function(error,camp){
        if(error)
        {
            console.log("cant find");
        }
        else{
       
            console.log(camp);
            res.render("show",{camp:camp})
    }
    })
})

app.listen(3000,function(){
    console.log("server started");
})