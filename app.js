var express=require("express");
var app=express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine","ejs");


var campgrounds=[
    {
        name:"mohamaya",
        image:"https://images.unsplash.com/photo-1513104399965-f5160d963d39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name:"mohamaya2",
        image:"https://images.unsplash.com/photo-1515014631915-3527ef2a27cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        name:"mohamaya3",
        image:"https://images.unsplash.com/photo-1502218808493-e5fd26249efc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
]
app.get("/",function(req,res){
    res.render("landing")
})

app.get("/campgrounds",function(req,res){
   
    res.render("campgrounds",{campgrounds:campgrounds})
})

app.post("/campgrounds",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var newCamp={name:name,image:image}
    campgrounds.push(newCamp);
    res.redirect("/campgrounds");
    // console.log(name + image)
})

app.get("/campgrounds/new",function(req,res){
    res.render("new");
})
app.listen(3000,function(){
    console.log("server started");
})