import mongoose from "mongoose";

export async function connect() {


    try {
        mongoose.connect(process.env.DB_URI)
        //`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mieka.mongodb.net/`

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Database connected successfully');
        });

        connection.on('error', (err) => {
            console.log('Could not connect to the database:', err);
        });
    } catch (error) {

        console.log(error)

    }
}