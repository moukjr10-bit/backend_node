const mongoose=require("mongoose");

const reponseSchema=new mongoose.Schema(
{
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Question",
        required:true
    },

    auteur:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      
    },

    texte:{
        type:String,
        required:true
    },

    vote:{
        type:Number,
        default:0
    }
},
{
    timestamps:true
});

module.exports=mongoose.model("Reponse",reponseSchema);