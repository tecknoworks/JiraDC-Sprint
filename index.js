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

var mongoDB = 'mongodb+srv://cata:cata@cluster0.wcbqw.mongodb.net/first?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/sprint', async (req, res) => {
    let newSprint = req.body
    var addSprint = new Sprint(
        {
            name: newSprint.name,
            description: newSprint.description,
            project_id: newSprint.project_id,
            closed: false
        })
    await Sprint.create(addSprint)
    res.send(newSprint)
})

app.get('/sprint', async (req, res) =>{
    const record= req.query.id ? await Sprint.find({'project_id':req.query.id}) : await Sprint.find({})
    res.json(record)
})

app.post('/sprint/projectid', async (req, res) =>{
    // const record= await Project.find({'type':req.query.type}).exec()
    const record= await Sprint.find({'project_id':req.body.id})
    res.json(record)
})

app.post('/allsprints', async (req, res) =>{
    let result = [];
    if (req.body.length) {
        for (let index = 0; index < req.body.length; index++) {
            if(req.body[index]!==''){
                const issue = await Sprint.find({ '_id': req.body[index] })
                result.push(issue[0]);
            }else{
                result.push({name:"Backlog"});
            }
            
        }
    }
    res.json(result)
})
app.put('/sprint', async (req, res) => {
    const newObject = req.body
    var id_=req.params.id
    const filter={_id:req.body._id}
    let update_= await Sprint.findOneAndUpdate(filter, newObject, {
        new: true,
        upsert: true 
      });
    res.send(update_)
 })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })