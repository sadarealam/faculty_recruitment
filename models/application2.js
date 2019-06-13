var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var Application2 = new Schema({ 
    no: String,
    username: String,
    degree: [ String ],
    subject: [String],
    university: [ String ],
    grade: [String],
    divison: [ String],
    yop: [ String],
    dor_phd: String,
    wftpt:String,
    phd_department: String,
    phd_university: String,
    phd_thesis_date: String,
    phd_award_date: String,
    phd_title: String,
    pdf_area: String,
    pdf_university: [ String ],
    pdf_duration_from: [ String],   
    pdf_duration_to: [ String ],     
    ugc: String,
    subject_slet: String,
    subject_net: String,
    registration_slet: String,
    registration_net: String,
    roll_slet: String,
    roll_net: String,
    yop_slet: String,
    yop_net: String });


module.exports = mongoose.model('Application2', Application2);
