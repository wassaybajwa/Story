const express = require("express");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.urlencoded({extended: true }));
app.use(express.static("public"));

app.get('/', function (req, res){

    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function (req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                    
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/38de4a2eb1";

    const options = {
        mathod: "POST",
        auth: "wassaybajwa:0d5c7d9d97429f4297f9fd25f3245e1a-us6"
    }

    https.request(url, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
            }else{
                res.sendFile(__dirname + "/failure.html");
           }
           response.on(data, function(){
            console.log(JASON.parse(data));
        })
    })
    
    // request.write(jsonData);
    // request.end();
    // https.request()
})



app.listen(3000, function (){

    console.log("Server is running on port 3000")
})


// API Key
// 0d5c7d9d97429f4297f9fd25f3245e1a-us6

// List ID
// // 38de4a2eb1