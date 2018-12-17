const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;

const StudentCourse = new Schema({
    stud_dept: {
        type: String,
        required: true
    },
    stud_faculty: {
        type: String,
        required: true
    },
    courses: {
        type: [String],
        required: true
    },
    stud_level: {
        type: String,
        required: true
    }
})
const StudentSchema = new Schema({
    stud_id: {
        type: Object(String),
        unique: [true, 'Student id already exist, if new student please check id ']
    },
    regnum: {
        type: String,
        unique: [true, 'reg number already exist '],
        required: true
    },
    firstname: {
        type: String,
        required: [true, 'student firstname is required']
    },
    lastname: {
        type: String,
        required: [true, 'student lastname is required']
    },
    middlename: {
        type: String,
        required: [true, 'student middle name is required']
    },
    regdate: {
        type: Date,
        default: Date.now()
    },
    passkey: {
        type: String,
        required: true
    },
    passkeyConf: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    student_acdemics: StudentCourse
});



const StudentModel = mongoose.model('students', StudentSchema);
module.exports = StudentModel

module.exports.createStudent = function(newStudent, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newStudent.password, salt, function(err, hash) {
            newStudent.password = hash;
            newStudent.save(callback);
        });
    });
}

module.exports.getStudentByRegnum = function(regnum, callback) {
    var query = { regnum: regnum };
    StudentModel.findOne(query, callback);
}

module.exports.getStudentById = function(id, callback) {
    StudentModel.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}