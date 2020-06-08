const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const path = require('path');

app.use(cors())
app.options('*', cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

const Posts = require('./model/mongoscheme')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

const port = process.env.PORT || 3000
const uri = "mongodb+srv://deepakgarg08:92119211@cluster0-zr3gu.mongodb.net/examresult?retryWrites=true";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
})
mongoose.set('useCreateIndex', true);

app.get('/', (req, res) => {
    // return res.render('result', { hello: 'world' })
    res.send('Welcome to result app ')
})

//create student data
app.post('/new', async (req, res) => {



    
    let studentDetails = req.body
    studentDetails.htm = (Number)(studentDetails.hthm)
    studentDetails.mtm = (Number)(studentDetails.mthm)
    studentDetails.etm = (Number)(studentDetails.ethm)
    studentDetails.sstm = (Number)(studentDetails.ssthm) + (Number)(studentDetails.sspm) || 0
    studentDetails.sctm = (Number)(studentDetails.scthm) + (Number)(studentDetails.scpm) || 0
    studentDetails.phtm = (Number)(studentDetails.phthm) + (Number)(studentDetails.phpm) || 0

    studentDetails.total_marks = studentDetails.htm + studentDetails.mtm + studentDetails.etm + studentDetails.sstm + studentDetails.sctm + studentDetails.phtm

    var count = Object.keys(studentDetails).length

    let user = new Posts(studentDetails)
    await user.save().then(data => {
        return res.render('result', { hello: 'world' })
        // return res.json(data)
    }).catch(err => {
        return res.json(err)
    })

})

//retrieve result
app.post('/result', async function (request, response) {
    let studentDetails = request.body
    try {
        const student = await Posts.find({ rollno: studentDetails.rollno });;

        if (student === null || student.length === 0) {
            response.send("no student found")
            return;
        }
        else if (student[0].rollno === studentDetails.rollno && student[0].dateofbirth === studentDetails.dob) {

            return response.json(student[0])
        }
        else {

            return response.json({ result: 'no result found' })

        }

    } catch (err) {
        response.jaon({ 'error': err })

    }


})

app.delete('/deleteall', async function (request, response) {


    try {
        const res = await Posts.deleteMany({});
        await response.send(`All records (${res.deletedCount}) deleted successfully`)

    } catch (error) {
        await response.send('error occured', error)

    }

})

app.listen(port, e => console.log("server started at port " + port))