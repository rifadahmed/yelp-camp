var mongoose    =   require("mongoose")
    campground  = require("./models/campground");
    Comment     =require("./models/comment")

    var data=[
        {
            name: "modumoti 1",
            image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: "blaa blla blaaa"
        },
        {name: "modumoti ",
        image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "hahhaah"

        }

    ]
    var dummyComment={
        text:"very nice place",
        author:"rifad"
    }
function campDelete(){
    campground.remove({},function(error,removeData){
    if(error){
        console.log(error)
    }
    else
    {
        console.log("deleted");
        data.forEach(function(x){
            campground.create(x,function(error,newCamp){
                if(error){
                    console.log(error)
                }
                else
                {
                    console.log("camp added")
                    Comment.create(dummyComment,function(error,newComment){
                        if(error)
                        {
                            console.log(error)
                        }
                        else
                        {
                            newCamp.comments.push(newComment);
                            newCamp.save();
                        }
                    }
                    )
                }
               
            })
        }
        
        )
       
    }
})
}
module.exports=campDelete;