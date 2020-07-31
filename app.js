const express=require('express');
const bodyParser=require('body-parser');
var app=express();
app.use(express.static("static"));
app.use(bodyParser.urlencoded({
	extended: true
}));
var task=['assignment','Script writing'];
var complete=['sweeping'];
app.set('view engine','ejs');

/*app.get('/',function(req,res){
	res.render('index');
});*/
app.post('/add',function(req,res){
	var newTask=req.body.newtask;
	task.push(newTask);
	res.redirect("/");
});
app.post('/delete',function(req,res){
	var completeTask=req.body.check;
	if(typeof completeTask==="string"){
		complete.push(completeTask);
		task.splice(task.indexOf(completeTask),1);
	}
	else if(typeof completeTask==="object"){
		for(var i=0;i<completeTask.length;i++){
			complete.push(completeTask[i]);
			task.splice(task.indexOf(completeTask[i]),1);
		}
	}
	
	res.redirect("/");
});
app.get('/',function(req,res){
	res.render("index",{task:task,complete:complete});
});
app.listen(3001,function(){
	console.log("server running on port 3001");
});