const express = require('express')
// const body = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const Posts = require('./model/mongoscheme')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000
const uri = "mongodb+srv://deepakgarg08:92119211@cluster0-zr3gu.mongodb.net/examresult?retryWrites=true";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log('error connecting the mongodb' + err)
    else console.log('connection is successful.')
})


app.get('/', (req, res) => {

    res.send('Welcome ')

})

app.post('/new', async (req, res) => {
    console.log('req', req.body)
    let studentDetails = req.body
    console.log('studentDetails', studentDetails)
    studentDetails.htm = (Number)(studentDetails.hthm)
    studentDetails.mtm = (Number)(studentDetails.mthm)
    studentDetails.etm = (Number)(studentDetails.ethm)
    studentDetails.sstm =(Number) (studentDetails.ssthm) + (Number)(studentDetails.sspm)
    studentDetails.sctm =(Number) (studentDetails.scthm) + (Number)(studentDetails.scpm)
    studentDetails.phtm =(Number) (studentDetails.phthm) + (Number)(studentDetails.phpm)

    studentDetails.total_marks = studentDetails.htm + studentDetails.mtm + studentDetails.etm + +    studentDetails.sstm + studentDetails.sctm + studentDetails.phtm
    console.log('studentDetails...after addition', studentDetails)



    // const { initial_balance } = req.body

    // if (initial_balance < 2000) {
    //     return res.send('bhag yha sei...gareeb sala')
    // }
    let user =  new Posts(studentDetails)
    await user.save().then( data => {
        console.log("check result data", res.json(data))

        return  res.json(data)
    }).catch(err => {
        console.log("check error")
        return res.json(err)
    })
  console.log('i m fired')
    return res.send("request received")

})

app.listen(port, e => console.log("server started at port " + port))
