const mongoose = require('mongoose')

/* 
ethm stands for english theory marks and other respectively
sspm for social sciene practical marks and other...
egm for grading
etm...for total marks
*/

let schema = mongoose.Schema;
let dbschema = new schema({

    enrollment: 'String',
    rollno: { type: 'String', unique: true },
    nameofstudent: 'String',
    fatherName: 'String',
    motherName: 'String',
    dateofbirth: 'String',

    ethm: 'String',
    hthm: 'String',
    mthm: 'String',
    ssthm: 'String',
    scthm: 'String',
    phthm: 'String',

    sspm: 'String',
    scpm: 'String',
    phpm: 'String',

    egm: { type: 'String', uppercase: true },
    hgm: { type: 'String', uppercase: true },
    mgm: { type: 'String', uppercase: true },
    ssgm: { type: 'String', uppercase: true },
    scgm: { type: 'String', uppercase: true },
    phgm: { type: 'String', uppercase: true },

    //for total marks

    etm: 'String',
    htm: 'String',
    mtm: 'String',
    sstm: 'String',
    sctm: 'String',
    phtm: 'String',

    total_marks: 'String',

    "total_grade": { type: 'String',  uppercase: true },
    //pass or fail or re ???
    "overall_result": { type: 'String'},
    studentphoto: { data: Buffer, contentType: String }


})

// let schema = mongoose.Schema;

// var AnimalSchema = mongoose.Schema({
    
//     name: String
//   , type: String
// });

// AnimalSchema.methods.findSimilarType = function findSimilarType (cb) {
//   return this.model('Animal').find({ type: this.type }, cb);
// };


// var Animal = mongoose.model('Animal', AnimalSchema);
// var dog = new Animal({ name: 'Rover', type: 'dog' });

// dog.findSimilarType(function (err, dogs) {

//   dogs[0]
    
// //   dogs.forEach(..);
// })


// if all fields are of same type (string, number etc)
// function keyValue (obj){
//     let finalresult ={}
//     let count = Object.keys(obj)
//     for (let i=0; i<count.length; i++){
//         finalresult[count[i]] =  'String'
//     }
// }
// let studentSchema = mongoose.Schema({
//     name: 'String',
//     type: 'String'
// });


// studentSchema.methods = function studentdetails(element) {
// }




// module.exports = mongoose.model('studentdbfor', studentSchema)
module.exports = mongoose.model('studentDatabase', dbschema)