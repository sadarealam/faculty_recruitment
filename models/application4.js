

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var Application4 = new Schema({ 
no: String,
username: String,
car1: String,
car2: String,
car3: String,
car4: String,
presenet_emp_org: String,
presenet_emp_designation: String,
presenet_emp_doa: String,
presenet_emp_regular: String,
presenet_emp_agp: String,
presenet_emp_basic: String,
expectated_basic: String,
justification: String });

module.exports = mongoose.model('Application4', Application4);
