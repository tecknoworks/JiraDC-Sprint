const express = require('express')
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const Sprint = require('./models/sprint')

const port = 8090

var mongoDB = 'mongodb+srv://Damaris:12345@cluster0.gdp4f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/sprint', async (req, res) => {
    let newSprint = req.body
    var addSprint=new Sprint({name:newSprint.name,project_id:newSprint.project_id})
    await Sprint.create(addSprint)
    res.send(newSprint)
})

app.get('/sprint', async (req, res) =>{
    // const record= await Project.find({'type':req.query.type}).exec()
    const record= await Sprint.find({})
    console.log(record)
    res.json(record)
})

app.get('/project/kanban', async (req, res) =>{
    const record= await Project.find({'type':'kanban'}).exec()
    console.log(record)
    res.json(record)
})
app.get('/project/scrum', async (req, res) =>{
    const record= await Project.find({'type':'scrum'}).exec()
    res.json(record)
})
app.get('/project/bugtracking', async (req, res) =>{

    const record= await Project.find({'type':'bug tracking '}).exec()
    res.json(record)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })