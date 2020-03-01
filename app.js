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
    image:String
})

//campgroundMode
var campground=mongoose.model("campground",campgroundSchema);

// var x={
//     name:"mohamaya",
//         image:"https://images.unsplash.com/photo-1513104399965-f5160d963d39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
// }
//create camp
// campground.create(x,function(err,camp){
//     if(err)
//     {
//         console.log("cant create");
//     }
//     else
//     {
//         console.log(camp);
//     }
// })



app.get("/",function(req,res){
    res.render("landing")
})

app.get("/campgrounds",function(req,res){
   campground.find({},function(error,allCampgrounds){
       if(error)
       {
           console.log("cant find");
       }
       else{
        res.render("campgrounds",{campgrounds:allCampgrounds})
       }
   })
    
})

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var newCamp={name:name,image:image}
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

app.get("/campgrounds/new",function(req,res){
    res.render("new");
})
app.listen(3000,function(){
    console.log("server started");
})