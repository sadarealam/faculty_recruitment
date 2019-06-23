var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var Application1 = new Schema(
        { no: String,
            username:String,
        applicant_name: String,    
        father_name: String,
        mother_name: String,    
        spouse_name: String,   
        dob: String,
        ageyear: String,
        agemonth: String,
        ageday: String,
        nationality: String,
        religion: String,
        cast: String,
        pwd: String,
        gender: String,
        marital_status: String,
        id_type1: String,
        id_type1: String,
        id1: String,
        id2: String,
        correspondence_address: String,
        permanent_address: String,
        phone_office: String,
        phone_residence: String,
        mobile1: String,
        mobile2: String,
        email: String });


  module.exports = mongoose.model('Application1', Application1);