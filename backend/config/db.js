const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://omar:omar123@kimosdb.b94pd2c.mongodb.net/KIMOS?retryWrites=true&w=majority");
        console.log(`MONGODB connected: ${conn.connection.host}`);
    }catch(error){
        console.log(error)
        process.exit(1);

    }
}
module.exports = connectDB