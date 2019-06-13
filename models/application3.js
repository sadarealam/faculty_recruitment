

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var Application3 = new Schema({
no: String,
username: String,
teaching_university: [ String ],
teching_post: [ String],
teching_duration_from: [ String], 
teching_duration_to: [ String ],   
teaching_experience_year: [ String],
teaching_experience_month: [String],
teaching_pb: [ String],
teaching_rp: [ String],
teaching_gross: [ String ],
teaching_nirf: [ String ],
industry_org: [ String ],
industry_post: [ String],
industry_duration_from: [ String],
industry_duration_to: [ String ],  
industry_exp_year: [String ],
industry_exp_month: [ String ],
name_referee1: String,
address_referee1: String,
phone_referee1: String,
mobile_referee1: String,
email_referee1: String,
name_referee2: String,
address_referee2: String,
phone_referee2: String,
mobile_referee2: String,
email_referee2: String,
adi_info: String});

module.exports = mongoose.model('Application3', Application3);

