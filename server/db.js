const mongodb = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

require("dotenv").config();
// https://stackoverflow.com/questions/11330917/how-to-play-a-mp3-using-javascript
class Db {
    constructor() {
        this.userdb;
        this.datadb;
    }
    async connectDB() {
      const client = await mongodb.MongoClient.connect(
        process.env.DB_CONNECT_STRING,
        {
          useNewUrlParser: true
        }
      );
    console.log("db is loaded");
    this.userdb = client.db('Timeline').collection("Users");
    this.datadb = client.db('Timeline').collection("Data");
    return("yes")
    }

    //user security functions
    async registerUser(email, username, password) { 
      console.log(this.userdb.find({username: username}).count());
      let emailTaken = await this.userdb.find({email: email}).count() > 0;
      let usernameTaken = await this.userdb.find({username: username}).count() > 0;

      if(usernameTaken) { //username taken
        console.log("username taken");
        return(0);
      }
      else if (emailTaken) { //email taken
        console.log("email taken");
        return(1);
      }
      else { //register user ie insert to db
        // let userData = {v0: [1,1,1,1,1,1,1,1], v1: [3,3,2,4,2,3,2,3,2,], v2: [4,4,4,3,], v3: [3,3,3], v4: [], v5: [], v6: [], v7: [], v8: [], v9: [], v10: [], v11: []}
        let userId = (await this.userdb.insertOne({username: username, email: email, password: password, isPrivate: false})).insertedId;
        console.log("user id")
        console.log(userId.toString());
        return(userId);
      }
    }

    async getHashedPass(email, password) {
      console.log("logging in..");
      let user = await this.findUserByEmail(email);
      if(user.password) {
        return(user.password);
      }
      else {
        return(false);
      }
    }

    async getProfile(id) { //return the user's settings
      let user = await this.findUserById(id);
      console.log(user.settings);
      let returnData= {username: user.username, isPrivate: user.isPrivate};
      return(returnData);
    }

    async updateProfile(id, newSettings) { //change user settings
      let mId = ObjectId(id); //convert to mongo id
      let isPrivate = newSettings.isPrivate;
      this.userdb.updateOne( 
        { "_id": mId},
        { "$set": 
          {"isPrivate": isPrivate}
        }
      );   
      return(true); 
    }

    //helper functions
    async findUserByEmail(email) {
      return(this.userdb.findOne({email: email}))
    }
    async findUserByUsername(username) {
      return(this.userdb.findOne({username: username}))
    }
    async findUserById(id) {
      return(this.userdb.findOne(ObjectId(id)));
    }

    //dashboard functionsß
    async getUserDataById(id) {
      let data = await this.datadb.find( { uid: id } ).toArray();
      return(data);
    }

    async getUserDataByName(username) {
      let user = await this.findUserByUsername(username);
      if(user == null || user.private) 
        return(0);
      else {
        let data = await this.datadb.find( { username: username } ).toArray();
        return(data);
      }
    }
  
    async addEntry(username, entryData) {
      entryData['username'] = username;
      await this.datadb.insertOne( 
        entryData
      ); 

      let data = this.getUserDataByName(username);
      return(data);
    }
    
    async deleteEntry(username, entryId, id) {
      this.datadb.remove( { _id:  ObjectId(entryId)} );
    }

    async getEntry(username, entryId, id) {
      let mId = ObjectId(id); //convert to mongo id
      let user = await this.findUserByUsername(username);
      if (id == user._id.toString()) { //your page
        let data = await this.datadb.find( { _id: ObjectId(entryId) } ).toArray();
        return(data[0]);
      }
      else if (user == undefined || user.isPrivate) { //user is private or entry doesn't exist
        return(0)
      }
      else { // public profile
        let data = await this.datadb.find( { _id: ObjectId(entryId) } ).toArray();
        return(data[0]);
      }
    }
} 

module.exports = Db;