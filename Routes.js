const express = require("express");
const router = express.Router();
const shoppingList = require("./shoppingList");
const uuid = require("uuid")

router.get('/',(req,res)=>res.json(shoppingList));

//To get a single member
router.get("/:id",(req,res)=>{
    const found = shoppingList.some(list=>list.id === parseInt(req.params.id));
    if(found){
        res.json(shoppingList.filter(list=>{
            return list.id === parseInt(req.params.id);
        }));
    }else{
        res.status(400).json({msg : `no member with the id of ${req.params.id}`})
    }
})

//To create a new member
router.post("/",(req,res)=>{
    const newMember= {
        id: uuid.v4(),
        name: req.body.name,
        price: req.body.price,

    }
    if(!newMember.name || !newMember.price){
        return res.status(400).json({msg: "Please include a name and price"});
    }

    shoppingList.push(newMember);
    res.json(shoppingList);
})

//To update a member
router.patch("/:id",(req,res)=>{
    const found = shoppingList.some(list=>list.id === parseInt(req.params.id));
    if(found){
        updatedList = req.body;
       shoppingList.forEach(list => {
           if(list.id === parseInt(req.params.id)){
            list.name = updatedList.name? updatedList.name : list.name;
            list.email = updatedList.email? updatedList.email : list.email;
               res.json({msg: "List updated", shoppingList});
           }
       });
    }else{
        res.status(400).json({msg : `no member with the id of ${req.params.id}`})
    }
})

//To delete a member
router.delete("/:id",(req,res)=>{
    const found = shoppingList.some(list=>list.id === parseInt(req.params.id));
    if(found){
        res.json({msg: "Member deleted",shoppingList: shoppingList.filter(list=>{
            return list.id !== parseInt(req.params.id);
        })});
    }else{
        res.status(400).json({msg : `no member with the id of ${req.params.id}`})
    }
})

module.exports = router;