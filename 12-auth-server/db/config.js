const mongoose = require("mongoose");


const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Database Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD');
    }

}



module.exports = {
    dbConnection
}