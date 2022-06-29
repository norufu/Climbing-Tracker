const express = require('express')
const { createServer } = require("http");
// const { Server } = require("socket.io");
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Db = require("./db");

//initialize db
const db = new Db();
console.log(db.connectDB());

const app = express()
const httpServer = createServer(app);
// const io = new Server(httpServer, { 
    // cors: {
        // origin: "http://localhost:3000"
    // }
//  });

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//user & security paths
const verifyJWT = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(token == undefined) {
        token = req.query.token;
    }
    console.log(token);
    if(!token) {
        res.send({auth:false, message:"Failed to authenticate"});
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.send({auth: false, message: "Failed to authenticate"}); //invalid credentials
            }
            else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

async function decodeJwtId(token) {
    let decoded = null;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      return(null)
    }
    return decoded.id;
  }

app.get('/isAuthed', verifyJWT, (req, res) => {
    res.send({auth: true, message: "Authorized"});
})

app.post('/register', async (req, res) => {
    let info = req.body;
    console.log(req.body);
    console.log(info);

    if(info.password.length < 5) {
        console.log("password too short")
        res.status(403).send("Please make password longer")
        return;
    }
    else if(info.password != info.passwordConfirm) {
        console.log("password not match")
        res.status(403).send("Passwords do not match")
        return;
    }
    else {//Attempt to register the user
        let userId = await db.registerUser(info.email, info.username, bcrypt.hashSync(info.password, 12));
        if(userId == 0) { // username taken
            res.status(403).send("Failed to register user, Username already in use")
        }
        else if (userId == 1) { // email taken
            res.status(403).send("Failed to register user, Email already in use")
        }
        else {
            let token = jwt.sign({ id: userId}, process.env.JWT_SECRET, {
                expiresIn: 86400
            });
            res.json({auth: true, token: token});
        }
    }
})

app.post('/login', async (req, res) => {
    let info = req.body;
    console.log(req.body);
    console.log(info.email);
    //check login info
    let user = await db.findUserByEmail(info.email);
    if(bcrypt.compareSync(req.body.password, user.password)) { //if successful login
        let token = jwt.sign({id: user._id.toString()}, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
        res.json({auth: true, token: token});
    }
    else {
        res.status(403).json({auth: true, message:"invalid credentials"});
    }
})


app.get('/profile', async (req, res) => {
    let id = await decodeJwtId(req.query.token);
    let profileData = await db.getProfile(id);
    console.log(profileData);
    res.json(profileData);
})

app.post('/profile', async (req, res) => {
    let id = await decodeJwtId(req.body.token);
    console.log(req.body);
    console.log(id);
    //Update here
    let result = await db.updateProfile(id, req.body.data);
    if(result) {
        res.send({success: true, message: "Updated Succesfully"});
    }
    else {
        res.send({success: false, message: "Update Failed, Check your input"});
    }
})

app.get('/userData', async (req, res) => {
    let dashboardData;
    console.log(req.query.username)
    if(req.query.username) {
        dashboardData = await db.getUserDataByName(req.query.username);
    }
    else {
        let id = await decodeJwtId(req.query.token);
        dashboardData = await db.getUserDataById(id);
    }

    console.log(dashboardData);
    res.json(dashboardData);
})

app.post('/addEntry', async (req, res) => {
    console.log(req.body.token);
    let id = await decodeJwtId(req.body.token);
    let returnData = await db.addEntry(id, req.body.entryData)
    res.json(returnData);
})

app.get('/getEntry', async (req, res) => {
    console.log('getting entry');
    console.log(req.query);
    if(req.query.token) {
        let id = await decodeJwtId(req.query.token);
        db.getEntry(req.query.username, req.query.entryId, id)
    }
})

app.post('/deleteEntry', async (req, res) => {
    console.log('deleting entry');
    console.log(req.body);
    // if(req.query.token) {
    //     let id = await decodeJwtId(req.query.token);
    //     db.getEntry(req.query.username, req.query.entryId, id)
    // }
    res.json(1);
})

var port = process.env.PORT || 5001

httpServer.listen(port, () => {
    console.log('Server started at http://localhost:5001')
})


