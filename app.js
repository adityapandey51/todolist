// not being used in the todolist but can be used to render the current date instead of Today on home route
module.exports.date=function (){
var date=new Date();
    // one way of doing
    // switch(currentday){
    //     case 0:
    //         day="Sunday"
    //         break
    //     case 1:
    //         day="Monday"
    //         break
    //     case 2:
    //         day="Tuesday"
    //         break
    //     case 3:
    //         day="Wednesday"
    //         break
    //     case 4:
    //         day="Thursday"
    //         break
    //     case 5:
    //         day="Friday"
    //         break
    //     case 6:
    //         day="Saturday"
    //         break
    //     default:
    // }
    //  other way
    var options={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
    }
    return date.toLocaleDateString("en-US",options);
}

module.exports.day=function(){
    var date=new Date();
        // one way of doing
        // switch(currentday){
        //     case 0:
        //         day="Sunday"
        //         break
        //     case 1:
        //         day="Monday"
        //         break
        //     case 2:
        //         day="Tuesday"
        //         break
        //     case 3:
        //         day="Wednesday"
        //         break
        //     case 4:
        //         day="Thursday"
        //         break
        //     case 5:
        //         day="Friday"
        //         break
        //     case 6:
        //         day="Saturday"
        //         break
        //     default:
        // }
        //  other way
        var options={
            weekday:"long",
        }
        return date.toLocaleDateString("en-US",options);
    }
    