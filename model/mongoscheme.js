const mongoose = require('mongoose')

/* 
ethm stands for english theory marks and other respectively
sspm for social sciene practical marks and other...
egm for grading
etm...for total marks
*/

let dbschema = mongoose.Schema({

enrollment : 'String',
rollno :  { type: String, unique: true },
nameofstudent : 'String',
fatherName : 'String',
motherName : 'String',
dateofbirth : 'String',

ethm : 'Number',
hthm : 'Number',
mthm : 'Number',
ssthm : 'Number',
scthm : 'Number',
phthm : 'Number',


sspm : 'Number',
scpm : 'Number',
phpm : 'Number',

egm :  { type: String,uppercase: true },
hgm :  { type: String,uppercase: true },
mgm :  { type: String,uppercase: true },
ssgm :  { type: String,uppercase: true },
scgm :  { type: String,uppercase: true },
phgm :  { type: String,uppercase: true },

//for total marks

"etm": {
    type: String,
    required: false
},
"htm": {
    type: String,
    required: false
},
"mtm": {
    type: String,
    required: false
},
"sstm": {
    type: String,
    required: false
},
"sctm": {
    type: String,
    required: false
},
"phtm": {
    type: String,
    required: false
},

//other useful

"total": {
    type: Number,
    required: false
},
"phtm": {
    type: Number,
    required: false
},

"total_marks": {
    type: Number,
    required: false
},

"total_grade": {
    type: String,
    required: false,
    uppercase: true
},
//pass or fail or re ???
"overall_result": {
    type: String,
    required: false
},

})


module.exports = mongoose.model('studentDatabase', dbschema)