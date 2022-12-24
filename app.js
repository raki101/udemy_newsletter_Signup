const express = require("express");
const app = express();
const request = require("request");
const bodyparser = require("body-parser");
const https = require("https");
const { response } = require("express");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    var first = req.body.firstName;
    var second = req.body.lastName;
    var email = req.body.email;
    //console.log(first,second,email);
    
    var data = {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:first,
                    LNAME:second
                }
            }
        ]
    };
    var jsondata = JSON.stringify(data);
    var url = "https://us9.api.mailchimp.com/3.0/lists/19b34d80f9";
    
    var options ={
        method:"POST",
auth:"rakesh:ac9de654c37a2c1c84acb359a9ef68b3-us9"
    }
    
    const request=https.request(url,options,function(response){
        if(response.statusCode  == 200)
        {
                res.sendFile(__dirname+"/success.html");
            
        }  
        else{
                res.sendFile(__dirname+"/failure.html");
        }
        
        response.on("data",function(data)
            {
                console.log(JSON.parse(data));
            }
    )})
    //request.write(jsondata);
    request.end();

});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000");
})

//ac9de654c37a2c1c84acb359a9ef68b3-us9
//19b34d80f9