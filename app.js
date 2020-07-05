const express = require("express");
const bodyParser =require("body-parser");
const request =require("request");
const https = require("https");
app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.listen(3000,function(){
	console.log("Server is up");
});
app.get("/",function(req,res){
	res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
	const firstName =req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;
	// console.log(firstName,lastName,email);
	// response.send("The detail is " + firstName + " " + lastName + " " + email);
	const data ={
		members: [
		{
			email_address : email,
			status: "subscribed",
			merge_fields:{
				FNAME: firstName,
				LNAME: lastName
			} 
		}
	  ]
	};
	const jsonData = JSON.stringify(data);
	const url ="https://us10.api.mailchimp.com/3.0/lists/7a2256d1ab";
	const options ={
		method: "POST",
		auth: "Jaiskid:416916fd3eacbe3e67e95923b88e2982-us10"
	}
	const request = https.request(url,options,function(response){
		if(response.statusCode === 200){
			res.sendFile(__dirname + "/success.html");
		}
		else{
			res.sendFile(__dirname + "/failure.html");
		}
		response.on("data",function(data){
			console.log(JSON.parse(data));
		})
	})
	request.write(jsonData);
	request.end();
});
app.post("/failure",function(req,res){
	res.redirect("/");
});
//id
// 7a2256d1ab
//api
// 416916fd3eacbe3e67e95923b88e2982-us10