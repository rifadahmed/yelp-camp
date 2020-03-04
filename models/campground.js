var mongoose=require("mongoose");
//campgroundSchema
var campgroundSchema= new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    comments:[{type:mongoose.Schema.Types.ObjectId,
        ref:"comment"}
        
    ]
})

var campground=mongoose.model("campground",campgroundSchema);
module.exports=campground;