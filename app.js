const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
app.use(cors())
app.options('*', cors())
const Posts = require('./model/mongoscheme')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000
const uri = "mongodb+srv://deepakgarg08:92119211@cluster0-zr3gu.mongodb.net/examresult?retryWrites=true";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) console.log('error connecting the mongodb' + err)
    else console.log('connection is successful.')
})
mongoose.set('useCreateIndex', true);

app.get('/', (req, res) => {

    res.send('Welcome ')

})

app.post('/new', async (req, res) => {
    let studentDetails = req.body
    studentDetails.htm = (Number)(studentDetails.hthm)
    studentDetails.mtm = (Number)(studentDetails.mthm)
    studentDetails.etm = (Number)(studentDetails.ethm)
    studentDetails.sstm = (Number)(studentDetails.ssthm) + (Number)(studentDetails.sspm) || 0
    studentDetails.sctm = (Number)(studentDetails.scthm) + (Number)(studentDetails.scpm) || 0
    studentDetails.phtm = (Number)(studentDetails.phthm) + (Number)(studentDetails.phpm) || 0

    studentDetails.total_marks = studentDetails.htm + studentDetails.mtm + studentDetails.etm + studentDetails.sstm + studentDetails.sctm + studentDetails.phtm
    console.log('studentDetails...after addition', studentDetails)

    var count = Object.keys(studentDetails).length
  console.log('count',count);

    let user = new Posts(studentDetails)
    await user.save().then(data => {
        console.log("check result data", data)

        return res.json(data)
        // return  window.location.href = "index.html"
    }).catch(err => {
        console.log("check error")
        return res.json(err)
    })
    console.log('bye bye')
    // return res.send("request received")

})


app.post('/result', async function (request, response) {



    let studentDetails = request.body
    console.log('studentDetails', studentDetails)


    // if (value.length === 24) {
    try {
        const student = await Posts.find({ rollno: studentDetails.rollno });;

        // console.log('student', student)
        if (student === null || student.length === 0) {
            response.send("no student found")
            return;
        }
        else if (student[0].rollno === studentDetails.rollno && student[0].dateofbirth === studentDetails.dob) {
            console.log("check student details", student)

            return response.json(student[0])
        }
        else {
            console.log("check student details when no user found", studentDetails)

            return response.json({ result: 'no result found' })

        }
        // res.sendfile()
        // // res.render("result",{
        // //     student:student[0]
        // // })


    } catch (err) {
        console.log("error occured")
        response.jaon({'error' : err})

    }
    // }


})

app.delete('/deleteall', async function (request, response) {

   
        try {
            const res = await Posts.deleteMany({});
            console.log("check deleted records count", res.deletedCount);
            await response.send(`All records (${res.deletedCount}) deleted successfully`)

        } catch (error) {
            console.log(("check err", error))
            await response.send('error occured', error)
            
        }
   
})

app.listen(port, e => console.log("server started at port " + port))
