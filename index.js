// requiring thee neccessary modules
const express=require("express");
const mongoose=require("mongoose");
const bodyParser= require("body-parser");
const _=require("lodash")

const app= express();
const x=require(__dirname+"/app.js")

// EJS looks into views folder to render things to web
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

// connectiing to mongod server and creating a todolist database
mongoose.connect("mongodb://127.0.0.1:27017/todolistdb");

// to render static files to the server based web
app.use(express.static("public"));

// creating a structure for various collections in todolist db
const itemsSchema=new mongoose.Schema({
    name:{
        type:String
    }
});
const listSchema=new mongoose.Schema({
    name:String,
    items:[itemsSchema]
})

// collectins based on above schema
const Item=mongoose.model("Item",itemsSchema);
const List=mongoose.model("List",listSchema)

//  default items for Item collection
const item1=new Item({
    name:"Buy Food"
});
const item2=new Item({
    name:"Cook Food"
});
const item3=new Item({
    name:"Cook Food"
});

const defaultitems=[item1,item2,item3];

// when user visits home route
app.get("/",function(req,res){
    Item.find()
    .then((founditems)=>{
        // if visited fo forst time
        if (founditems.length===0){
            Item.insertMany(defaultitems)
            .then(()=>{
               console.log("inserted successfully")
            })
           .catch((err)=>{
               console.log(err)  
            });
            res.redirect("/");
        }else{
            res.render("list",{listTitle : "Today", newItem: founditems})
        }
    })
    .catch((err)=>{
        console.log(err)
    })}
    
);

// for custom list
app.get("/:topic",function(req,res){
    // using lodash to make path case insensitive
    const topic=_.capitalize(req.params.topic);
    List.findOne({name:topic})
    .then((foundlist)=>{
        if(!foundlist){
            const list=new List({
                name:topic,
                items:defaultitems
            })
            list.save()
            res.redirect("/"+topic)
        }else{
            res.render("list",{listTitle : foundlist.name, newItem: foundlist.items})
        }
    })
})

// to add items to lists
app.post("/",function(req,res){
    var item=req.body.item;
    var page=req.body.button;
    // to add items to home route list
   if (page==="Today"){
    const it=new Item({name:item})
    it.save();
    res.redirect("/")
   }else{
    // to add items to custom list
    List.findOne({name:page})
    .then((foundpage)=>{
        const it={name:item}
        foundpage.items.push(it);
        foundpage.save();
        res.redirect("/"+page)

    })
    .catch((err)=>{
        console.log(err)
    })
   }
    
    }
);

// to delete items
app.post("/delete",function(req,res){
        const id=req.body.checkbox;
        const listName=req.body.listName
        
        // to delete items from homeroute
        if(listName==="Today"){
            Item.findByIdAndRemove(id)
            .then(()=>{
                res.redirect("/")
            })
            .catch((err)=>{
                console.log(err)
            })
        }else{
            // to delete items from custom lists
            // findoneandUPdate and $pull insted of loops
            List.findOneAndUpdate({name:listName},{$pull:{items:{_id:id}}})
            .then(()=>{
                res.redirect("/"+listName)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
});


// listening to the server on port 3000
app.listen(3000,function(){
    console.log("server started on port 3000");
});