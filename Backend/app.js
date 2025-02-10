const express = require ('express')
//Used to host front end
var cors = require('cors')
//lets you use express funct
const app = express()
//front end stuff
app.use(cors())

//Create router
const router = express.Router()


// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses JSON request bodies


//requests and responces from router go here 


app.use('/api', router);

app.listen(3000,function(){
    console.log('listening on port 3000')
});