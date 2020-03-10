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
    
})
}
module.exports=campDelete;