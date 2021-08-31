const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
// const helmet = require('helmet');
 const cors = require('cors')
 app.use(cors())
 const path = require('path')
app.use( express.static(path.join(__dirname, 'public')))
 
// app.use(
// 	helmet({
// 	  contentSecurityPolicy: {
// 		directives: {
// 		  ...helmet.contentSecurityPolicy.getDefaultDirectives(),
// 		  "script-src": ["'self'", "'nonce-2726c7f26c'"],
// 		},
// 	  },
// 	})
//   );


const multer = require('multer')
const { google } = require('googleapis')

const fs = require('fs')
//const unlinkAsync = promisify(fs.unlink)

app.set('view engine', 'ejs')
const dir = './upload'
const CLIENT_ID = '813472167072-7hk1afdthisdji8qjsmq1m1poulu5umg.apps.googleusercontent.com'
const CLIENT_SECRET = 'Tqy_7qDpc1eSqJ_cdjL0k4MR'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04H_m5VQ95vjJCgYIARAAGAQSNwF-L9Ir6OLxMNc917NxYNUpb0NeXfl1q8Du4lYQAd2X5a6yJS5lA84mDpcqT8sHtG9pzONvCtw'

const oauth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,REDIRECT_URI

	);

oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const drive = google.drive({
	version:'v3',
	auth:oauth2Client
})

app.get('/home', function (req, res) {

	res.sendFile(path.join(__dirname+'/index.html'));
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
	const files = fs.readdirSync(dir)
console.log(dir);
var dirs1 = []
for (const file of files) {
dirs1.push(`./upload/${file}`)

}
for(i in dirs1){
fs.unlinkSync(dirs1[i]);
}
})
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
callback(null, './upload')
    
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
});

var upload = multer({ storage: storage });

app.post('/projects', upload.array('uploadedImages', 10), async function(req, res, err) {
  if (err) {
   // console.log('error');
    console.log(err);
  }

  var filess = await req.files;
await res.json({"files":[filess]});

await setTimeout(datas , 10000 )
  
 // await datas();




 
});



// 




 function datas(){
	const files = fs.readdirSync(dir)
	console.log(dir);
var dirs = []
for (const file of files) {
  dirs.push(`./upload/${file}`)

}
 async function uploadss() {
	try{
		for(link in dirs){
			let liss = `${dirs[link]}`;

			console.log(typeof liss)
			if (liss.includes('.jpeg') || liss.includes('.jpg')) {
		const response = await drive.files.create({
			requestBody: {
				name : `one${link}.jpg`,
				mimeType:'image/jpg'
			},
			media:{
				mimeType:'image/jpg',
				body: fs.createReadStream(dirs[link]),
			},
		})
		
		console.log(response.data)
}
else if(liss.includes('.pdf')){
	let response = await drive.files.create({
			requestBody: {
				name : `one${link}.pdf`,
				mimeType:'application/pdf'
			},
			media:{
				mimeType:'application/pdf',
				body: fs.createReadStream(dirs[link]),
}
})

	console.log(response.data.id)
	}
}
	}catch(error){
		console.log(error)
	}


}

uploadss();
}







app.listen(PORT,()=>{
	console.log(`port ${PORT} started`)
})
