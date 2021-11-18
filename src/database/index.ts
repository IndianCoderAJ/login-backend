 
 import mongoose from 'mongoose';



let dbConnection = () => {
    let MongoConnectionURL:string = ' ';

    console.log(MongoConnectionURL,process.env.NODE_ENV_SET);
    
    if (process.env.NODE_ENV_SET === `production` ? MongoConnectionURL = process.env.DB_LIVE_URL : MongoConnectionURL = process.env.DB_LOCAL_URL)
    
    
     mongoose
    .connect(MongoConnectionURL)
    .then((res) => {
        console.log("Mongodb connected..");
    })
    .catch(err => {
        console.log(err);
        process.exit(1)
    });
 }

 export default dbConnection;

