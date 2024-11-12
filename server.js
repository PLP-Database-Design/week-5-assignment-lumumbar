// import some dependencies/package


const express = require('express');
const app = express();
const mysql = require('mysql2')
const cors = require('cors');
const dotenv = require('dotenv');


app.use(express.json());
app.use(cors());
dotenv.config();


//connnecting to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


db.connect((err) => {
    
    if(err) return console.log("Error connecting to MySQL");

    console.log("Connected to Mysql as id: ", db.threadId);
})

// Retrieve all patients
app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT * FROM patients"
    db.query(getPatients, (err, results) =>{
        if(err){
            return res.status(500).send("Failed to fetch patients")
        }
        res.status(200).send(results)
    })
})
    

//Retrieve all providers
app.get('/get-providers', (req, res) => {
    const getProviders = "SELECT * FROM providers"

    db.query(getProviders, (err, results) =>{

        if(err){
            return res.status(500).send("failed to fetch the providers")
        }
        res.status(200).send(results)
    })
})

//Filter patients by First Name
app.get('/get-firstName', (req,res) =>{
    const getFirstName = "SELECT first_name FROM patients"

    db.query(getFirstName,(err, results) =>{
        if(err){
            return res.status(500).send("Failed to fetch firstName")
        }
        res.status(200).send(results)
    })
})

//Retrieve all providers by their specialty
app.get('/get-specialty', (req,res) => {
    const getSpecialty ="SELECT * FROM providers ORDER BY provider_specialty"

    db.query(getSpecialty,(err, results) =>{
        if(err){
            return res.status(500).send("Failed to fetch provider specialty")
        }
        res.status(200).send(results)
    })
})

//Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    //Send a message to the browser
    console.log('Sending message to the browser..')
    app.get('/', (rq,res) => {
        res.send('EVERYTHING IS WORKING');
    });
});