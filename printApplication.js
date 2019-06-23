var Const = require('./const');
var Application = require('./models/application');
var Application1 = require('./models/application1');
var Application2 = require('./models/application2');
var Application3 = require('./models/application3');
var Application4 = require('./models/application4');
var Credit = require('./models/credit');
var pdfMakePrinter = require('pdfmake');
var path = require('path');
var fs = require('fs');

const util = require('util')

module.exports = {

	fillCharacter: function (username, no, annexure, dd, callback) {
		Application4.findOne({ username: username, no: no }, function (err, application4) {
			if (err) { }
			if (application4) {
				dd.content[13].table.body[1][2].text = application4.car1;
				dd.content[13].table.body[2][2].text = application4.car2;
				dd.content[13].table.body[3][2].text = application4.car3;
				dd.content[13].table.body[4][2].text = application4.car4;

				dd.content[14].table.body[1][1].text = application4.presenet_emp_org;
				dd.content[14].table.body[2][1].text = application4.presenet_emp_designation;
				dd.content[14].table.body[3][1].text = application4.presenet_emp_doa;
				dd.content[14].table.body[4][1].text = application4.presenet_emp_regular;
				dd.content[14].table.body[5][1].text = application4.presenet_emp_basic + ' , ' + application4.presenet_emp_agp;

				dd.content[15].table.body[2][1].text = application4.expectated_basic;
				dd.content[15].table.body[2][2].text = application4.justification;
				callback(dd, annexure);
			} else {
				callback(dd, annexure);
			}
		})
	},

	fillExperience: function (username, no, annexure, dd, callback) {
		Application3.findOne({ username: username, no: no }, function (err, application3) {
			if (err) { }
			if (application3) {
				//teaching exp
				dd.content[9].table.body.length = 3;
				for (var i = 0; i < application3.teaching_university.length; i++) {
					if (application3.teaching_university[i] == '') continue;
					var d = [{ text: 'RGPV Bhopal' }, { text: 'Assosiate Professor' }, {
						text: '27-02-2002',
					}, {
						text: '27-02-2002',
					}, {
						text: '10',
					}, {
						text: '12',
					}, { text: '20000' }, { text: '120000' }, { text: 'R' }, { text: '61-2019' }, { text: '2' }];
					d[0].text = application3.teaching_university[i];
					d[1].text = application3.teching_post[i];
					d[2].text = application3.teching_duration_from[i];
					d[3].text = application3.teching_duration_to[i];
					d[4].text = application3.teaching_experience_year[i];
					d[5].text = application3.teaching_experience_month[i];
					d[6].text = application3.teaching_pb[i];
					d[7].text = application3.teaching_rp[i];
					d[8].text = application3.teaching_gross[i];
					d[9].text = application3.teaching_nirf[i];
					d[10].text = annexure;
					annexure += 1;
					dd.content[9].table.body.push(d);
				}
				//industry exp
				dd.content[10].table.body.length = 3;
				for (var i = 0; i < application3.industry_org.length; i++) {
					if (application3.industry_org[i] == '') continue;
					var d = [{ text: 'RGPV RAju Gahandi Bhopal' }, { text: 'Assosiate Professor' }, {
						text: '27-02-2002',
					}, {
						text: '27-02-2002',
					}, {
						text: '10',
					}, {
						text: '12',
					}, { text: '2' }];
					d[0].text = application3.industry_org[i];
					d[1].text = application3.industry_post[i];
					d[2].text = application3.industry_duration_from[i];
					d[3].text = application3.industry_duration_to[i];
					d[4].text = application3.industry_exp_year[i];
					d[5].text = application3.industry_exp_month[i];
					d[6].text = annexure;
					annexure += 1;
					dd.content[10].table.body.push(d);
				}
				dd.content[11].table.body[2][0].text = application3.name_referee1;
				dd.content[11].table.body[2][2].text = application3.address_referee1;
				dd.content[11].table.body[3][0].text = application3.name_referee1;
				dd.content[11].table.body[3][2].text = application3.address_referee2;
				dd.content[11].table.body[4][1].text = application3.phone_referee1;
				dd.content[11].table.body[4][3].text = application3.phone_referee2;
				dd.content[11].table.body[5][1].text = application3.mobile_referee1;
				dd.content[11].table.body[5][3].text = application3.mobile_referee2;
				dd.content[11].table.body[6][1].text = application3.email_referee1;
				dd.content[11].table.body[6][3].text = application3.email_referee2;

				dd.content[12].table.body[1][0].text = application3.adi_info;
				callback(dd, annexure);
			} else {
				callback(dd, annexure);
			}

		})

	},

	fillEducationalInfo: function (username, no, annexure, dd, callback) {
		Application2.findOne({ username: username, no: no }, function (err, application2) {
			if (err) { }
			if (application2) {
				//for educational qualification
				dd.content[5].table.body.length = 2;
				for (var i = 0; i < application2.degree.length; i++) {
					if (application2.degree[i] == '') continue;
					var d = [{
						margin: [2, 2, 2, 5],
						text: 'BE',
					}, {
						margin: [2, 2, 2, 5],
						text: 'Computer Science & Engineering',
					}, {
						margin: [2, 2, 2, 5],
						text: 'RGPV Bhopal',
					}, {
						margin: [2, 2, 2, 5],
						text: '8.02',
					}, {
						margin: [2, 2, 2, 5],
						text: 'I',
					}, {
						margin: [2, 2, 2, 5],
						text: '2017',
					}, {
						margin: [2, 2, 2, 5],
						text: '1',
					}];
					d[0].text = application2.degree[i];
					d[1].text = application2.subject[i];
					d[2].text = application2.university[i];
					d[3].text = application2.grade[i];
					d[4].text = application2.divison[i];
					d[5].text = application2.yop[i];
					d[6].text = annexure;
					annexure += 1;
					dd.content[5].table.body.push(d);
				}
				//for phd
				dd.content[6].table.body[2][0].text = application2.dor_phd;
				dd.content[6].table.body[2][1].text = application2.wftpt;
				dd.content[6].table.body[2][2].text = application2.phd_department;
				dd.content[6].table.body[2][3].text = application2.phd_university;
				dd.content[6].table.body[2][4].text = application2.phd_thesis_date;
				dd.content[6].table.body[2][5].text = application2.phd_award_date;
				dd.content[6].table.body[3][2].text = application2.phd_title;
				//for pdf
				if (application2.pdf_area != '') {
					dd.content[7].table.body.length = 3;
					//dd.content[7].table.body[4][1].text = application2.pdf_area;
					for (var i = 0; i < application2.pdf_university.length; i++) {
						if (application2.pdf_university[i] == '') continue;
						var pdf = [{
							margin: [2, 2, 2, 5],
							text: '1 ',
						}, {
							margin: [2, 2, 2, 5],
							text: 'RGPV Bhopal ',
						}, {
							margin: [2, 2, 2, 5],
							text: '27-02-2009',
						}, {
							margin: [2, 2, 2, 5],
							text: '27-02-2009',
						}];
						pdf[0].text = i + 1;
						pdf[1].text = application2.pdf_university[i];
						pdf[2].text = application2.pdf_duration_from[i];
						pdf[3].text = application2.pdf_duration_to[i];
						dd.content[7].table.body.splice(3 + i, 0, pdf);
					}
					var pdf_area = [{
						margin: [2, 10, 2, 5],
						text: 'Area of Research',
					}, {
						margin: [2, 10, 2, 5],
						text: application2.pdf_area,
						colSpan: 3
					}, {
					}, {}];
					dd.content[7].table.body.push(pdf_area);
				}
				//for ugc
				if (application2.ugc == 'T') {
					dd.content[8].table.body[0][4].text = 'Yes';
					var ugc = [{
						margin: [2, 2, 2, 5],
						text: 'UGC',

					}, {
						margin: [2, 2, 2, 5],
						text: 'Subject ',

					}, {
						margin: [2, 2, 2, 5],
						text: 'Registration No.',


					}, {
						margin: [2, 2, 2, 5],
						text: 'Roll Number',


					}, {
						margin: [2, 2, 2, 5],
						text: 'Year of Passing',


					}];
					dd.content[8].table.body.length = 2;
					if (application2.subject_net != '') {
						ugc[0].text = 'NET';
						ugc[1].text = application2.subject_net;
						ugc[2].text = application2.registration_net;
						ugc[3].text = application2.roll_net;
						ugc[4].text = application2.yop_net;
						dd.content[8].table.body.push(ugc);
					}
					if (application2.subject_net != '') {
						ugc[0].text = 'SLET';
						ugc[1].text = application2.subject_net;
						ugc[2].text = application2.registration_net;
						ugc[3].text = application2.roll_net;
						ugc[4].text = application2.yop_net;
						dd.content[8].table.body.push(ugc);
					}

				} else {
					dd.content[8].table.body[0][4].text = 'No';
					dd.content[8].table.body.length = 1;

				}
				callback(dd, annexure);

			}
			else {
				callback(dd, annexure);
			}
		})
	},

	fillPersonalInfo: function (username, no, dd, callback) {
		Application1.findOne({ username: username, no: no }, function (err, application1) {
			if (err) { }
			if (application1) {
				dd.content[4].table.body[1][1].text = application1.applicant_name;
				dd.content[4].table.body[2][1].text = application1.father_name;
				dd.content[4].table.body[3][1].text = application1.mother_name;
				dd.content[4].table.body[4][1].text = application1.spouse_name;
				dd.content[4].table.body[5][1].text = application1.dob;
				dd.content[4].table.body[6][1].text = application1.ageyear + ' Y ' + application1.agemonth + ' M ' + application1.ageday + ' D ';
				dd.content[4].table.body[7][1].text = application1.nationality;
				dd.content[4].table.body[8][1].text = application1.religion;
				dd.content[4].table.body[9][1].text = application1.cast;
				dd.content[4].table.body[10][1].text = application1.pwd;
				dd.content[4].table.body[11][1].text = application1.gender;
				dd.content[4].table.body[12][1].text = application1.marital_status;
				//dd.content[4].table.body[13][1].text = application1.applicant_name;
				//dd.content[4].table.body[14][1].text = application1.applicant_name;
				dd.content[4].table.body[15][1].text = application1.id1;
				//dd.content[4].table.body[16][1].text = application1.applicant_name;
				//dd.content[4].table.body[17][1].text = application1.applicant_name;
				dd.content[4].table.body[18][1].text = application1.id2;
				dd.content[4].table.body[20][1].text = application1.correspondence_address;
				dd.content[4].table.body[21][1].text = application1.permanent_address;
				//dd.content[4].table.body[18][1].text = application1.id2;
				dd.content[4].table.body[23][1].text = application1.phone_residence;
				dd.content[4].table.body[24][1].text = application1.phone_office;
				dd.content[4].table.body[25][1].text = application1.mobile1;
				dd.content[4].table.body[26][1].text = application1.mobile2;
				dd.content[4].table.body[27][1].text = application1.email;
				callback(dd);
			} else {
				callback(dd);
			}
		})
	},

	fillApplication: function (application, dd, callback) {
		//console.log(dd);
		dd.content[2].table.body[0][1].text = application.adv_no;
		dd.content[2].table.body[1][1].text = new Date().toLocaleDateString();
		dd.content[2].table.body[2][1].text = '07-07-2019';
		dd.content[2].table.body[3][1].text = application.post_applied;
		dd.content[2].table.body[4][1].text = application.department_full;
		dd.content[2].table.body[5][1].text = application.specialization;
		dd.content[2].table.body[6][1].text = application.no;
		callback(dd);
	},

	printApplicatoin: function (username, no, callback) {
		// playground requires you to assign document definition to a variable called dd

		var ldd = { content: [{ table: { body: [[{ margin: [5, 5, 5, 5], width: 40, height: 40, image: "manit" }, { alignment: "center", margin: [75, 5, 80, 5], text: [{ text: "Maulana Azad\n", fontSize: 14, italics: !0 }, { text: "NATIONAL INSTITUTE OF TECHNOLOGY\n", bold: !0, fontSize: 16 }, { text: "BHOPAL 462003 MP INDIA", fontSize: 14 }] }]] } }, { table: { body: [[{ alignment: "justify", text: [{ fontSize: 10, text: "Note: Prospective candidates are advised to study the Instructions carefully and then fill up the application precisely in all respects. No column should be left blank. Incomplete application will be rejected. Candidate may attach additional sheets, if required. \n" }, { fontSize: 12, text: "Note:\n" }, { fontSize: 10, text: "1.\tThe application form is in two parts: Part-A and Part-B. \n" }, { fontSize: 10, text: "2.\tPart A of the Form deals with the personal information and Part B deals with the information required for Credit point Calculation as per Schedule “E” of the Statutes of NIT vide Gazette of India No.651 dated July 24, 2017." }] }], [{ margin: [0, 10, 0, 10], alignment: "center", text: "PART-A: PERSONAL INFORMATION ", bold: !0, fontSize: 14 }]] } }, { table: { widths: [108, 217, 162], body: [[{ margin: [2, 2, 2, 5], fontSize: 14, text: "Advertisement No:" }, {}, { fontSize: 14, rowSpan: 7, text: "Affix recent passport size photograph duly signed by candidate", alignment: "center", margin: [0, 40, 0, 0] }], [{ margin: [2, 2, 2, 5], fontSize: 14, text: "Date:" }, {}, {}], [{ margin: [2, 2, 2, 5], fontSize: 14, text: "Last Date of Submission:" }, {}, {}], [{ margin: [2, 2, 2, 5], fontSize: 14, text: "Post Applied For" }, {}, {}], [{ margin: [2, 2, 2, 5], fontSize: 14, text: "Department" }, {}, {}], [{ margin: [2, 2, 2, 5], fontSize: 14, text: "Specialization" }, {}, {}], [{ margin: [2, 2, 2, 5], fontSize: 14, text: "Application ID" }, {}, {}]] } }, { fontSize: 12, margin: [0, 40, 0, 0], table: { widths: [165, 330], body: [[{ alignment: "center", margin: [2, 2, 2, 5], text: "FEE REMITTANCE", colSpan: 2, bold: !0 }, {}], [{ margin: [2, 2, 2, 5], text: "Bank Details" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Transaction  ID of online payment & Date" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Amount" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "If exempted, reason thereof" }, { margin: [2, 2, 2, 5], text: "" }]] } }, { pageBreak: "before", fontSize: 12, margin: [0, 40, 0, 0], table: { widths: [165, 330], body: [[{ margin: [2, 2, 2, 5], text: "Personal Information", colSpan: 2, bold: !0 }, {}], [{ margin: [2, 2, 2, 5], text: "Name of Applicant" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Father's Name" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Mother's Name" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Spouse Name" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Date of Birth   " }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Age " }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Nationality" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Religion " }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Caste Category " }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Person with disability (PWD)" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Gender" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Marital Status" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Identification Document 1", colSpan: 2 }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "ID Type" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "ID No." }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Identification Document 2", colSpan: 2 }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "ID Type" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "ID No." }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Complete Postal Address with  Pin Code", colSpan: 2 }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "For Correspondence" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Permanent" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Phone No with STD Code", colSpan: 2 }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Residence" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Office" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Mobile 1" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Mobile 2" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Email" }, { margin: [2, 2, 2, 5], text: "" }]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [60, 100, 177, 40, 30, 50, 30], headerRows: 2, body: [[{ margin: [2, 2, 2, 5], text: "Educational Qualification ( UG Degree onwards) (Enclose Relevant Certificate)", colSpan: 7, bold: !0, fontSize: 14 }, {}, {}, {}, {}, {}, {}], [{ margin: [2, 2, 2, 5], text: "Degree(s)", bold: !0 }, { margin: [2, 2, 2, 5], text: "Subject / Discipline", bold: !0 }, { margin: [2, 2, 2, 5], text: "University/ Institution", bold: !0 }, { margin: [2, 2, 2, 5], text: "%  of Marks /Grade", bold: !0 }, { margin: [2, 2, 2, 5], text: "Division", bold: !0 }, { margin: [2, 2, 2, 5], text: "Year of Passing", bold: !0 }, { margin: [2, 2, 2, 5], text: "Annexure #", bold: !0 }]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [67, 60, 100, 126, 67, 67], headerRows: 2, body: [[{ margin: [2, 2, 2, 5], text: "Details of  Ph.D. ", colSpan: 6, bold: !0, fontSize: 14 }, {}, {}, {}, {}, {}], [{ margin: [2, 2, 2, 5], text: "Date of Registration ", bold: !0 }, { margin: [2, 2, 2, 5], text: "Whether Full Time or Part Time", bold: !0 }, { margin: [2, 2, 2, 5], text: "Discipline/ Department", bold: !0 }, { margin: [2, 2, 2, 5], text: "University/ Institution ", bold: !0 }, { margin: [2, 2, 2, 5], text: "Date of  Thesis Submission ", bold: !0 }, { margin: [2, 2, 2, 5], text: "Date of Award", bold: !0 }], [{ margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 10, 2, 5], text: "Title of Thesis", colSpan: 2 }, {}, { margin: [2, 10, 2, 5], text: "", colSpan: 4 }, {}, {}, {}]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [55, 292, 70, 70], headerRows: 2, body: [[{ margin: [2, 2, 2, 5], text: "Details of  PDF ", colSpan: 4, bold: !0, fontSize: 14 }, {}, {}, {}], [{ margin: [2, 2, 2, 5], text: "Sr.No", bold: !0 }, { margin: [2, 2, 2, 5], text: "University/ Institution ", bold: !0 }, { margin: [2, 2, 2, 5], text: "Duration of  PDF", bold: !0, colSpan: 2 }], [{ margin: [2, 2, 2, 5], text: " ", colspan: 2 }, {}, { margin: [2, 2, 2, 5], text: "From", bold: !0 }, { margin: [2, 2, 2, 5], text: "To", bold: !0 }], [{ margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 10, 2, 5], text: "Area of Research" }, { margin: [2, 10, 2, 5], text: "", colSpan: 3 }, {}, {}]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [55, 120, 100, 100, 100], headerRows: 2, body: [[{ margin: [2, 2, 2, 5], text: "Whether  Qualified  UGC- NET/ SLET ", colSpan: 4, bold: !0, fontSize: 14 }, {}, {}, {}, { margin: [2, 2, 2, 5], text: "Yes", bold: !0 }], [{ margin: [2, 2, 2, 5], text: "UGC", bold: !0 }, { margin: [2, 2, 2, 5], text: "Subject ", bold: !0 }, { margin: [2, 2, 2, 5], text: "Registration No.", bold: !0 }, { margin: [2, 2, 2, 5], text: "Roll Number", bold: !0 }, { margin: [2, 2, 2, 5], text: "Year of Passing", bold: !0 }], [{ margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: " " }, { margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: "" }]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [107, 80, 35, 35, 20, 20, 35, 35, 20, 30, 20], headerRows: 2, body: [[{ margin: [2, 2, 2, 5], text: "Teaching Experience ( Starting with the current position)", colSpan: 11, bold: !0, fontSize: 14 }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], [{ margin: [2, 2, 2, 5], text: "Institute/ University", bold: !0 }, { margin: [2, 2, 2, 5], text: "Post", bold: !0 }, { margin: [2, 2, 2, 5], text: "Duration", bold: !0, colSpan: 2 }, {}, { margin: [2, 2, 2, 5], text: "Experience", bold: !0, colSpan: 2 }, {}, { margin: [2, 2, 2, 5], text: "PB & G-Pay", bold: !0 }, { margin: [2, 2, 2, 5], text: "Gross Salary", bold: !0 }, { margin: [2, 2, 2, 5], text: "Regular/ Permanent", bold: !0 }, { margin: [2, 2, 2, 5], text: "NIRF ranking with year", bold: !0 }, { margin: [2, 2, 2, 5], text: "Annexure #", bold: !0 }], [{ colSpan: 2, text: "" }, {}, { margin: [2, 2, 2, 5], text: "From" }, { margin: [2, 2, 2, 5], text: "To" }, { margin: [2, 2, 2, 5], text: "Y" }, { margin: [2, 2, 2, 5], text: "M" }, { colSpan: 5, text: "" }, {}, {}, {}, {}], [{ text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [130, 90, 67, 67, 40, 40, 30], headerRows: 2, body: [[{ margin: [2, 2, 2, 5], text: "Research / Industry Experience ", colSpan: 7, bold: !0, fontSize: 14 }, {}, {}, {}, {}, {}, {}], [{ margin: [2, 2, 2, 5], text: "Organization ", bold: !0 }, { margin: [2, 2, 2, 5], text: "Post", bold: !0 }, { margin: [2, 2, 2, 5], text: "Duration", bold: !0, colSpan: 2 }, {}, { margin: [2, 2, 2, 5], text: "Experience", bold: !0, colSpan: 2 }, {}, { margin: [2, 2, 2, 5], text: "Annexure #", bold: !0 }], [{ colSpan: 2, text: "" }, {}, { margin: [2, 2, 2, 5], text: "From" }, { margin: [2, 2, 2, 5], text: "To" }, { margin: [2, 2, 2, 5], text: "Y" }, { margin: [2, 2, 2, 5], text: "M" }, {}], [{ text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [90, 164, 90, 164], headerRows: 2, body: [[{ margin: [2, 2, 2, 5], text: "Name and Address of Minimum Two Referees.", colSpan: 4, bold: !0, fontSize: 14 }, {}, {}, {}], [{ margin: [2, 2, 2, 5], text: "Name & Address", bold: !0, colSpan: 2 }, {}, { margin: [2, 2, 2, 5], text: "Name & Address", bold: !0, colSpan: 2 }, {}], [{ margin: [2, 2, 2, 5], text: " ", colSpan: 2 }, {}, { margin: [2, 2, 2, 5], text: "", colSpan: 2 }, {}], [{ margin: [2, 2, 2, 5], text: " ", colSpan: 2 }, {}, { margin: [2, 2, 2, 5], text: "", colSpan: 2 }, {}], [{ margin: [2, 2, 2, 5], text: "Phone No" }, { margin: [2, 2, 2, 5], text: " " }, { margin: [2, 2, 2, 5], text: "Phone No" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Mobile No" }, { margin: [2, 2, 2, 5], text: "" }, { margin: [2, 2, 2, 5], text: "Mobile No" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Email" }, { margin: [2, 2, 2, 5], text: " " }, { margin: [2, 2, 2, 5], text: "Email" }, { margin: [2, 2, 2, 5], text: "" }]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [487], headerRows: 2, body: [[{ margin: [2, 2, 100, 5], text: "Additional  relevant information in support of candidature", bold: !0, fontSize: 14 }], [{ margin: [2, 2, 2, 5], text: "" }]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [25, 250, 230], headerRows: 2, body: [[{}, { margin: [2, 2, 2, 5], text: "Character & Antecedents", bold: !0, fontSize: 14 }, { margin: [2, 2, 2, 5], text: "Comments", bold: !0, fontSize: 14 }], [{ margin: [2, 2, 2, 5], text: "a" }, { margin: [2, 2, 2, 5], text: "Have you ever been subject to any disciplinary action, as a student and/or as an employee, If so give full details." }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "b" }, { margin: [2, 2, 2, 5], text: "Have you ever been dismissed/suspended from service/employment, if so please give full details " }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "c" }, { margin: [2, 2, 2, 5], text: "Were you involved in any criminal case, If yes, give full details (like Crime No, Police Station, Section under which crime was registered, acquittal or conviction/ date of order and Case No)" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "d" }, { margin: [2, 2, 2, 5], text: "Is any criminal case pending against you in the court, If yes, give full details " }, { margin: [2, 2, 2, 5], text: "" }]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [170, 346], headerRows: 2, body: [[{ margin: [2, 2, 2, 5], text: "Details of Present Employment and  Employer’s endorsement ", bold: !0, fontSize: 14, colSpan: 2 }, {}], [{ margin: [2, 2, 2, 5], text: "Name of Organization" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Designation" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Date of Appointment" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Whether   Regular Permanent/ Temporary" }, { margin: [2, 2, 2, 5], text: "" }], [{ margin: [2, 2, 2, 5], text: "Basic pay and AGP (if any)" }, { margin: [2, 2, 2, 5], text: "" }]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [60, 140, 306], headerRows: 2, body: [[{ margin: [2, 2, 2, 5], text: "Expected Salary/ Pay Protection with Due Justification for Consideration by Selection Committee. ", bold: !0, fontSize: 14, colSpan: 3 }, {}, {}], [{ margin: [2, 2, 2, 5], text: "Expectation", colSpan: 2, alignment: "center" }, {}, { margin: [2, 2, 2, 5], text: "Justification", alignment: "center" }], [{ margin: [2, 2, 2, 5], text: "Basic Pay" }, { margin: [2, 2, 2, 5], text: "" }, {}]] } }, { fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [200, 306], headerRows: 2, body: [[{ margin: [2, 2, 2, 5], text: "DECLARATION", bold: !0, fontSize: 14, colSpan: 2 }, {}], [{ margin: [2, 2, 2, 5], text: "I hereby declare that I have read carefully and understood the instructions and particulars supplied to me, and that all entries in this form, as well as, in attached sheets are true to the best of my knowledge and belief. At any stage if any of the information furnished by me is found to be false or incorrect, my candidature will be treated as cancelled. If selected, I promise to abide by the rules and regulations of the Institute.", colSpan: 2, alignment: "justify" }, {}], [{ table: { widths: [60, 125], body: [[{ margin: [2, 2, 2, 5], text: "Date" }, {}], [{ margin: [2, 2, 2, 5], text: "Place" }, {}]] } }, { text: "Signature", alignment: "right" }]] } }], images: { manit: "data:image/png;base64,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" }, footer: function (t, e) { return [{ text: "Sign Above      " + t.toString() + " of " + e, alignment: "right", margin: [0, 10, 50, 0] }] }, header: function (t, e, i) { return 1 == t ? void 0 : [{ fontSize: 12, bold: !0, margin: [20, 25, 0, 0], text: "Application ID : " + no, alignment: "left" }] } };

		Application.findOne({ email: username, no: no }, function (err, application) {
			module.exports.fillApplication(application, ldd, function (rdd) {
				module.exports.fillPersonalInfo(username, no, rdd, function (rdd) {
					var annexure = 1;
					module.exports.fillEducationalInfo(username, no, annexure, rdd, function (rdd, annexure) {
						module.exports.fillExperience(username, no, annexure, rdd, function (rdd, annexure) {
							module.exports.fillCharacter(username, no, annexure, rdd, function (rdd, annexure) {

								callback(rdd);
							})

						})

					})
				});
			});
		});
	},

	fillCreditData: function (dd, credit, callback) {

		dd.content[2].table.body[2][1].text = credit.last_promotion_date;
		dd.content[2].table.body[2][3].text = credit.basic_pay_on;
		var total_credit = 0;
		//1A research project
		var research_credit = 0;
		for (var i = 0; i < credit.research_project_title.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var research = [{}, {}, {}, {}, {}, {}, {}, {}];
			research[0].text = i + 1;
			research[1].text = credit.research_project_title[i];
			research[2].text = credit.reserch_project_pi[i];
			research[3].text = credit.research_project_agency[i];
			research[4].text = credit.research_project_amount[i];
			research[5].text = credit.research_project_periodfrom[i];
			research[6].text = credit.research_project_periodto[i];
			research[7].text = credit.research_project_creditclaimed[i];
			var credit_point = parseFloat(credit.research_project_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				research_credit += credit_point
			}
			dd.content[4].table.body.splice(3 + i, 0, research);
		}
		dd.content[4].table.body[3 + credit.research_project_title.length][7].text = research_credit;
		dd.content[3].table.body[2][2].text = research_credit;
		total_credit += research_credit;

		//1B patents granted
		var patent_credit = 0;
		for (var i = 0; i < credit.patent_title.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var patent = [{}, {}, {}, {}, {}, {}];
			patent[0].text = i + 1;
			patent[1].text = credit.patent_title[i];
			patent[2].text = credit.patent_pi[i];
			patent[3].text = credit.patent_no[i];
			patent[4].text = credit.patent_authority[i];
			patent[5].text = credit.patent_creditclaimed[i];

			var credit_point = parseFloat(credit.patent_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				patent_credit += credit_point
			}
			dd.content[5].table.body.splice(2 + i, 0, patent);
		}
		dd.content[5].table.body[2 + credit.patent_title.length][5].text = patent_credit;
		dd.content[3].table.body[3][2].text = patent_credit;
		// console.log(dd.content[5].table)
		// console.log(dd.content[3].table)
		total_credit += patent_credit;

		//2 consultancy
		var consultancy_credit = 0;
		for (var i = 0; i < credit.consultancy_project_title.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var consultancy = [{}, {}, {}, {}, {}, {}, {}, {}];
			consultancy[0].text = i + 1;
			consultancy[1].text = credit.consultancy_project_title[i];
			consultancy[2].text = credit.consultancy_pi[i];
			consultancy[3].text = credit.consultancy_project_agency[i];
			consultancy[4].text = credit.consultancy_project_amount[i];
			consultancy[5].text = credit.consultancy_project_periodfrom[i];
			consultancy[6].text = credit.consultancy_project_periodto[i];
			consultancy[7].text = credit.consultancy_project_creditclaimed[i];

			var credit_point = parseFloat(credit.consultancy_project_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				consultancy_credit += credit_point
			}
			dd.content[6].table.body.splice(3 + i, 0, consultancy);
		}
		dd.content[6].table.body[3 + credit.consultancy_project_title.length][7].text = consultancy_credit;
		dd.content[3].table.body[4][2].text = consultancy_credit;
		total_credit += consultancy_credit;

		//3 consultancy
		var phd_credit = 0;
		for (var i = 0; i < credit.consultancy_project_title.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var phd = [{}, {}, {}, {}, {}, {}, {}];
			phd[0].text = i + 1;
			phd[1].text = credit.phd_credit_name[i];
			phd[2].text = credit.phd_credit_pi[i];
			phd[3].text = credit.phd_credit_title[i];
			phd[4].text = credit.phd_credit_awarded[i];
			phd[5].text = credit.phd_credit_yoa[i];
			phd[6].text = credit.phd_creditclaimed[i];


			var credit_point = parseFloat(credit.phd_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				phd_credit += credit_point
			}
			dd.content[7].table.body.splice(2 + i, 0, phd);
		}
		dd.content[7].table.body[2 + credit.phd_credit_name.length][6].text = phd_credit;
		dd.content[3].table.body[5][2].text = phd_credit;
		total_credit += phd_credit;

		//4a sci
		var sci_credit = 0;
		for (var i = 0; i < credit.sci_paper_title.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var sci = [{}, {}, {}, {}, {}, {}, {}, {}];
			sci[0].text = i + 1;
			sci[1].text = credit.sci_paper_title[i];
			sci[2].text = credit.sci_paper_journal[i];
			sci[3].text = credit.sci_paper_volume[i];
			sci[4].text = credit.sci_author_from[i];
			sci[5].text = credit.sci_author_total[i];
			sci[6].text = credit.sci_main_supervisor[i];
			sci[7].text = credit.sci_main_creditclaimed[i];


			var credit_point = parseFloat(credit.sci_main_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				sci_credit += credit_point
			}
			dd.content[8].table.body.splice(3 + i, 0, sci);
		}
		dd.content[8].table.body[3 + credit.sci_paper_title.length][7].text = sci_credit;
		//dd.content[3].table.body[6][2].text = sci_credit;
		total_credit += sci_credit;

		//4b scopus
		var scopus_credit = 0;
		for (var i = 0; i < credit.scopus_paper_title.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var scopus = [{}, {}, {}, {}, {}, {}, {}, {}];
			scopus[0].text = i + 1;
			scopus[1].text = credit.scopus_paper_title[i];
			scopus[2].text = credit.scopus_paper_journal[i];
			scopus[3].text = credit.scopus_paper_volume[i];
			scopus[4].text = credit.scopus_author_from[i];
			scopus[5].text = credit.scopus_author_total[i];
			scopus[6].text = credit.scopus_main_supervisor[i];
			scopus[7].text = credit.scopus_main_creditclaimed[i];


			var credit_point = parseFloat(credit.scopus_main_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				scopus_credit += credit_point
			}
			dd.content[9].table.body.splice(3 + i, 0, scopus);
		}
		dd.content[9].table.body[3 + credit.scopus_paper_title.length][7].text = scopus_credit;
		dd.content[9].table.body[4 + credit.scopus_paper_title.length][7].text = scopus_credit + sci_credit;
		dd.content[3].table.body[6][2].text = scopus_credit + sci_credit;
		total_credit += scopus_credit;

		//5 conference
		var conference_credit = 0;
		for (var i = 0; i < credit.conference_paper_title.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var conference = [{}, {}, {}, {}, {}, {}, {}, {}];
			conference[0].text = i + 1;
			conference[1].text = credit.conference_paper_title[i];
			conference[2].text = credit.conference_detail[i];
			conference[3].text = credit.conference_paper_volume[i];
			conference[4].text = credit.conference_author_from[i];
			conference[5].text = credit.conference_author_total[i];
			conference[6].text = credit.conference_main_supervisor[i];
			conference[7].text = credit.conference_main_creditclaimed[i];


			var credit_point = parseFloat(credit.conference_main_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				conference_credit += credit_point
			}
			dd.content[10].table.body.splice(3 + i, 0, conference);
		}
		dd.content[10].table.body[3 + credit.conference_paper_title.length][7].text = conference_credit;
		dd.content[3].table.body[7][2].text = conference_credit;
		total_credit += conference_credit;


		//6 ilar
		var ilar_credit = 0;
		for (var i = 0; i < credit.institute_post.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var ilar = [{}, {}, {}, {}, {}, {}];
			ilar[0].text = i + 1;
			ilar[1].text = credit.institute_post[i];
			ilar[2].text = credit.institute_duration_from[i];
			ilar[3].text = credit.institute_duration_to[i];
			ilar[4].text = credit.institute_nos[i];
			ilar[5].text = credit.institute_creditclaimed[i];


			var credit_point = parseFloat(credit.institute_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				ilar_credit += credit_point
			}
			dd.content[11].table.body.splice(3 + i, 0, ilar);
		}
		dd.content[11].table.body[3 + credit.institute_post.length][5].text = ilar_credit;
		dd.content[3].table.body[8][2].text = ilar_credit;
		total_credit += ilar_credit;

		//6 ilar
		var oilar_credit = 0;
		for (var i = 0; i < credit.other_institute_post.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var oilar = [{}, {}, {}, {}, {}, {}];
			oilar[0].text = i + 1;
			oilar[1].text = credit.other_institute_post[i];
			oilar[2].text = credit.other_institute_duration_from[i];
			oilar[3].text = credit.other_institute_duration_to[i];
			oilar[4].text = credit.other_institute_nos[i];
			oilar[5].text = credit.other_institute_creditclaimed[i];


			var credit_point = parseFloat(credit.other_institute_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				oilar_credit += credit_point
			}
			dd.content[12].table.body.splice(3 + i, 0, oilar);
		}
		dd.content[12].table.body[3 + credit.other_institute_post.length][5].text = oilar_credit;
		dd.content[3].table.body[9][2].text = oilar_credit;
		total_credit += oilar_credit;

		//8 ilar
		var chairman_credit = 0;
		for (var i = 0; i < credit.chairman_institute_post.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var chairman = [{}, {}, {}, {}, {}, {}];
			chairman[0].text = i + 1;
			chairman[1].text = credit.chairman_institute_post[i];
			chairman[2].text = credit.chairman_institute_duration_from[i];
			chairman[3].text = credit.chairman_institute_duration_to[i];
			chairman[4].text = credit.chairman_institute_nos[i];
			chairman[5].text = credit.chairman_institute_creditclaimed[i];


			var credit_point = parseFloat(credit.chairman_institute_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				chairman_credit += credit_point
			}
			dd.content[13].table.body.splice(3 + i, 0, chairman);
		}
		dd.content[13].table.body[3 + credit.chairman_institute_post.length][5].text = chairman_credit;
		dd.content[3].table.body[10][2].text = chairman_credit;
		total_credit += chairman_credit;


		//8 ilar
		var department_credit = 0;
		for (var i = 0; i < credit.department_post.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var department = [{}, {}, {}, {}, {}, {}];
			department[0].text = i + 1;
			department[1].text = credit.department_post[i];
			department[2].text = credit.department_duration_from[i];
			department[3].text = credit.department_duration_to[i];
			department[4].text = credit.department_nos[i];
			department[5].text = credit.department_creditclaimed[i];


			var credit_point = parseFloat(credit.department_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				department_credit += credit_point
			}
			dd.content[14].table.body.splice(3 + i, 0, department);
		}
		dd.content[14].table.body[3 + credit.department_post.length][5].text = department_credit;
		dd.content[3].table.body[11][2].text = department_credit;
		total_credit += department_credit;

		//8 ilar
		var fdp_credit = 0;
		for (var i = 0; i < credit.fdp_post.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var fdp = [{}, {}, {}, {}, {}, {}, {}];
			fdp[0].text = i + 1;
			fdp[1].text = credit.fdp_post[i];
			fdp[2].text = credit.fdp_detail[i];
			fdp[3].text = credit.fdp_duration_from[i];
			fdp[4].text = credit.fdp_duration_to[i];
			fdp[5].text = credit.fdp_nos[i];
			fdp[6].text = credit.fdp_creditclaimed[i];

			var credit_point = parseFloat(credit.fdp_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				fdp_credit += credit_point
			}
			dd.content[15].table.body.splice(3 + i, 0, fdp);
		}
		dd.content[15].table.body[3 + credit.fdp_post.length][6].text = fdp_credit;
		dd.content[3].table.body[12][2].text = fdp_credit;
		total_credit += fdp_credit;

		//8 ilar
		var national_program_credit = 0;
		for (var i = 0; i < credit.national_program_detail.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var national_program = [{}, {}, {}, {}, {}, {}];
			national_program[0].text = i + 1;
			national_program[1].text = credit.national_program_detail[i];
			national_program[2].text = credit.national_program_duration_from[i];
			national_program[3].text = credit.national_program_duration_to[i];
			national_program[4].text = credit.natinal_program_nos[i];
			national_program[5].text = credit.national_program_creditclaimed[i];


			var credit_point = parseFloat(credit.national_program_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				national_program_credit += credit_point
			}
			dd.content[16].table.body.splice(3 + i, 0, national_program);
		}
		dd.content[16].table.body[3 + credit.national_program_detail.length][5].text = national_program_credit;
		dd.content[3].table.body[13][2].text = national_program_credit;
		total_credit += national_program_credit;

		//8 ilar
		var national_conference_credit = 0;
		for (var i = 0; i < credit.national_conference_post.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var national_conference = [{}, {}, {}, {}, {}, {}, {}];
			national_conference[0].text = i + 1;
			national_conference[1].text = credit.national_conference_post[i];
			national_conference[2].text = credit.national_conference_detail[i];
			national_conference[3].text = credit.national_conference_duration_from[i];
			national_conference[4].text = credit.national_conference_duration_to[i];
			national_conference[5].text = credit.national_conference_nos[i];
			national_conference[6].text = credit.national_conference_creditclaimed[i];


			var credit_point = parseFloat(credit.national_conference_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				national_conference_credit += credit_point
			}
			dd.content[17].table.body.splice(3 + i, 0, national_conference);
		}
		dd.content[17].table.body[3 + credit.national_conference_post.length][6].text = national_conference_credit;
		dd.content[3].table.body[14][2].text = national_conference_credit;
		total_credit += national_conference_credit;

		//8 ilar
		var over_service_credit = 0;
		for (var i = 0; i < credit.over_service_designation.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var over_service = [{}, {}, {}, {}, {}, {}, {}];
			over_service[0].text = i + 1;
			over_service[1].text = credit.over_service_designation[i];
			over_service[2].text = credit.over_service_org[i];
			over_service[3].text = credit.over_service_duration_from[i];
			over_service[4].text = credit.over_service_duration_to[i];
			over_service[5].text = credit.over_service_nos[i];
			over_service[6].text = credit.over_service_creditclaimed[i];


			var credit_point = parseFloat(credit.over_service_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				over_service_credit += credit_point
			}
			dd.content[18].table.body.splice(3 + i, 0, over_service);
		}
		dd.content[18].table.body[3 + credit.over_service_designation.length][6].text = over_service_credit;
		dd.content[3].table.body[15][2].text = over_service_credit;
		total_credit += over_service_credit;

		//8 ilar
		var lab_estl_credit = 0;
		for (var i = 0; i < credit.lab_estl_name.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var lab_estl = [{}, {}, {}, {}, {}];
			lab_estl[0].text = i + 1;
			lab_estl[1].text = credit.lab_estl_name[i];
			lab_estl[2].text = credit.lab_estl_org[i];
			lab_estl[3].text = credit.lab_estl_years[i];
			lab_estl[4].text = credit.lab_estl_creditclaimed[i];



			var credit_point = parseFloat(credit.lab_estl_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				lab_estl_credit += credit_point
			}
			dd.content[19].table.body.splice(2 + i, 0, lab_estl);
		}
		dd.content[19].table.body[2 + credit.lab_estl_name.length][4].text = lab_estl_credit;
		dd.content[3].table.body[16][2].text = lab_estl_credit;
		total_credit += lab_estl_credit;

		//8 ilar
		var over_teach_credit = 0;
		for (var i = 0; i < credit.over_teach_course.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var over_teach = [{}, {}, {}, {}, {}, {}];
			over_teach[0].text = i + 1;
			over_teach[1].text = credit.over_teach_course[i];
			over_teach[2].text = credit.over_teach_cpoints[i];
			over_teach[3].text = credit.over_teach_department[i];
			over_teach[4].text = credit.over_teach_credit[i];
			over_teach[5].text = credit.over_teach_creditclaimed[i];


			var credit_point = parseFloat(credit.over_teach_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				over_teach_credit += credit_point
			}
			dd.content[20].table.body.splice(2 + i, 0, over_teach);
		}
		dd.content[20].table.body[2 + credit.over_teach_course.length][5].text = over_teach_credit;
		dd.content[3].table.body[17][2].text = over_teach_credit;
		total_credit += over_teach_credit;

		//8 ilar
		var post_grade_credit = 0;
		for (var i = 0; i < credit.post_grade_candidate.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var post_grade = [{}, {}, {}, {}, {}];
			post_grade[0].text = i + 1;
			post_grade[1].text = credit.post_grade_candidate[i];
			post_grade[2].text = credit.post_grade_title[i];
			post_grade[3].text = credit.post_grade_yoa[i];
			post_grade[4].text = credit.post_grade_creditclaimed[i];



			var credit_point = parseFloat(credit.post_grade_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				post_grade_credit += credit_point
			}
			dd.content[21].table.body.splice(2 + i, 0, post_grade);
		}
		dd.content[21].table.body[2 + credit.post_grade_candidate.length][4].text = post_grade_credit;
		dd.content[3].table.body[18][2].text = post_grade_credit;
		total_credit += post_grade_credit;


		//8 ilar
		var under_grade_credit = 0;
		for (var i = 0; i < credit.under_grade_candidate.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var under_grade = [{}, {}, {}, {}, {}];
			under_grade[0].text = i + 1;
			under_grade[1].text = credit.under_grade_candidate[i];
			under_grade[2].text = credit.under_grade_title[i];
			under_grade[3].text = credit.under_grade_yoa[i];
			under_grade[4].text = credit.under_grade_creditclaimed[i];



			var credit_point = parseFloat(credit.under_grade_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				under_grade_credit += credit_point
			}
			dd.content[22].table.body.splice(2 + i, 0, under_grade);
		}
		dd.content[22].table.body[2 + credit.under_grade_candidate.length][4].text = under_grade_credit;
		dd.content[3].table.body[19][2].text = under_grade_credit;
		total_credit += under_grade_credit;

		//8 ilar
		var text_book_credit = 0;
		for (var i = 0; i < credit.text_book_title.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var text_book = [{}, {}, {}, {}, {}];
			text_book[0].text = i + 1;
			text_book[1].text = credit.text_book_title[i];
			text_book[2].text = credit.text_book_publisher[i];
			text_book[3].text = credit.text_book_yop[i];
			text_book[4].text = credit.text_book_creditclaimed[i];



			var credit_point = parseFloat(credit.text_book_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				text_book_credit += credit_point
			}
			dd.content[23].table.body.splice(2 + i, 0, text_book);
		}
		dd.content[23].table.body[2 + credit.text_book_title.length][4].text = text_book_credit;
		dd.content[3].table.body[20][2].text = text_book_credit;
		total_credit += text_book_credit;

		//8 ilar
		var book_national_credit = 0;
		for (var i = 0; i < credit.book_national_title.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var book_national = [{}, {}, {}, {}, {}];
			book_national[0].text = i + 1;
			book_national[1].text = credit.book_national_title[i];
			book_national[2].text = credit.book_national_publisher[i];
			book_national[3].text = credit.book_national_yop[i];
			book_national[4].text = credit.book_national_creditclaimed[i];



			var credit_point = parseFloat(credit.book_national_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				book_national_credit += credit_point
			}
			dd.content[24].table.body.splice(2 + i, 0, book_national);
		}
		dd.content[24].table.body[2 + credit.book_national_title.length][4].text = book_national_credit;
		dd.content[3].table.body[21][2].text = book_national_credit;
		total_credit += book_national_credit;

		//8 ilar
		var outreach_credit = 0;
		for (var i = 0; i < credit.outreach_name.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var outreach = [{}, {}, {}, {}, {}];
			outreach[0].text = i + 1;
			outreach[1].text = credit.outreach_name[i];
			outreach[2].text = credit.outreach_duration_from[i];
			outreach[3].text = credit.outreach_duration_to[i];
			outreach[4].text = credit.out_reach_creditclaimed[i];



			var credit_point = parseFloat(credit.out_reach_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				outreach_credit += credit_point
			}
			dd.content[25].table.body.splice(3 + i, 0, outreach);
		}
		dd.content[25].table.body[3 + credit.outreach_name.length][4].text = outreach_credit;
		dd.content[3].table.body[22][2].text = outreach_credit;
		total_credit += outreach_credit;

		//8 ilar
		var fellow_credit = 0;
		for (var i = 0; i < credit.fellow_name.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var fellow = [{}, {}, {}, {}, {}];
			fellow[0].text = i + 1;
			fellow[1].text = credit.fellow_name[i];
			fellow[2].text = credit.fellow_doa[i];
			fellow[3].text = credit.fellow_tdoa[i];
			fellow[4].text = credit.fellow_creditclaimed[i];



			var credit_point = parseFloat(credit.fellow_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				fellow_credit += credit_point
			}
			dd.content[26].table.body.splice(2 + i, 0, fellow);
		}
		dd.content[26].table.body[2 + credit.fellow_name.length][4].text = fellow_credit;
		dd.content[3].table.body[23][2].text = fellow_credit;
		total_credit += fellow_credit;


		//8 ilar
		var tpo_credit = 0;
		for (var i = 0; i < credit.tpo_name.length; i++) {
			//if(credit.research_project_title[i] == '') continue
			var tpo = [{}, {}, {}, {}, {}];
			tpo[0].text = i + 1;
			tpo[1].text = credit.tpo_name[i];
			tpo[2].text = credit.tpo_more[i];
			tpo[3].text = credit.tpo_less[i];
			tpo[4].text = credit.tpo_creditclaimed[i];



			var credit_point = parseFloat(credit.fellow_creditclaimed[i]);
			if (!isNaN(credit_point)) {
				tpo_credit += credit_point
			}
			dd.content[27].table.body.splice(2 + i, 0, tpo);
		}
		dd.content[27].table.body[2 + credit.tpo_name.length][4].text = tpo_credit;
		dd.content[3].table.body[24][2].text = tpo_credit;
		total_credit += tpo_credit;
		dd.content[3].table.body[25][2].text = total_credit;
		dd.content[28].table.body[0][1].text = total_credit;

		callback(dd);

	},

	printApplicatoinB(username, no, callback) {
		var dd = { content: [{ table: { body: [[{ margin: [5, 5, 5, 5], width: 40, height: 40, image: "manit" }, { alignment: "center", margin: [75, 5, 80, 5], text: [{ text: "Maulana Azad\n", fontSize: 14, italics: !0 }, { text: "NATIONAL INSTITUTE OF TECHNOLOGY\n", bold: !0, fontSize: 16 }, { text: "BHOPAL 462003 MP INDIA", fontSize: 14 }] }]] } }, { table: { body: [[{ margin: [0, 10, 0, 10], alignment: "center", text: "PART-B: CREDIT POINT VERIFICATION PERFORMA ", bold: !0, fontSize: 14 }], [{ alignment: "justify", text: [{ fontSize: 10, text: "Note : For Assistant Professor (Grade-I) short listing of the candidates to be called for Written Test and / or Technical Presentation and Interview shall be done considering the credit points of  Journals and Conference publications, patents(granted only), Books and Chapters authored. \n" }] }]] } }, { table: { widths: [125, 150, 85, 118], body: [[{ fontSize: 12, text: "Name of Candidate" }, {}, { fontSize: 12, text: "Department" }, {}], [{ fontSize: 12, text: "Post Applied " }, {}, { fontSize: 12, text: "Specialization" }, {}], [{ fontSize: 12, text: "Date of Last Promotion" }, {}, { fontSize: 12, text: "Basic Pay on " }, {}]] } }, { fontSize: 10, bold: !0, margin: [0, 40, 0, 0], table: { widths: [42, 150, 145, 145], body: [[{ alignment: "center", margin: [2, 2, 2, 5], text: "SUMMARY OF CREDIT POINT CLAIMED", colSpan: 4, bold: !0 }, {}, {}, {}], [{ text: "S. No.", bold: !0, alignment: "center" }, { text: "Activity", bold: !0, alignment: "center" }, { text: "Credit Points Claimed by Candidate", bold: !0, alignment: "center" }, { text: "Credit Point Awarded by Scrutiny Committee", bold: !0, alignment: "center" }], [{ text: "1A" }, { text: "Research Projects ", fontSize: 11, bold: !0 }, {}, {}], [{ text: "1B" }, { text: "Patents Granted " }, {}, {}], [{ text: "2" }, { text: "Consultancy  Projects " }, {}, {}], [{ text: "3" }, { text: "Ph.D. Thesis Guided" }, {}, {}], [{ text: "4" }, { text: "Research Papers" }, {}, {}], [{ text: "5" }, { text: "Papers in Conference" }, {}, {}], [{ text: "6" }, { text: "Additional  Responsibilities" }, {}, {}], [{ text: "7" }, { text: "Other Additional  Responsibilities" }, {}, {}], [{ text: "8" }, { text: "Chairman  and  Convener  " }, {}, {}], [{ text: "9" }, { text: "Departmental  Activities" }, {}, {}], [{ text: "10" }, { text: "WS/FDP /STC" }, {}, {}], [{ text: "11" }, { text: "National  Programs" }, {}, {}], [{ text: "12" }, { text: "Conference Organized" }, {}, {}], [{ text: "13" }, { text: "Length  of  Service" }, {}, {}], [{ text: "14" }, { text: "Establishment of Lab" }, {}, {}], [{ text: "15" }, { text: "Above  6   Credit Teaching" }, {}, {}], [{ text: "16" }, { text: "PG Dissertations Guided " }, {}, {}], [{ text: "17" }, { text: "UG Projects Guided" }, {}, {}], [{ text: "18" }, { text: "Books Authored (International)" }, {}, {}], [{ text: "19" }, { text: "Books Authored (National) \nBook  Chapters (International)" }, {}, {}], [{ text: "20" }, { text: "Outreach Activities" }, {}, {}], [{ text: "21" }, { text: "Fellow " }, {}, {}], [{ text: "22" }, { text: "Training & Placement" }, {}, {}], [{ text: "TOTAL CREDIT POINTS", colSpan: 2 }, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 80, 40, 80, 70, 70, 70, 30], body: [[{ text: "1A", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "External sponsored Research Projects Undertaken (Please provide proof (award letter) for each project)", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "8 Credit points per project (in case of more than one person in a Project, the Principal Investigator gets 5 credit points and the rest to be divided equally among other members)." }], colSpan: 7 }, {}, {}, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Project Title", bold: !0, alignment: "center" }, { rowSpan: 2, text: "PI & CO-PI", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Name of Sponsoring Agency", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Amount Sanctioned", bold: !0, alignment: "center" }, { text: "Period of Project", bold: !0, alignment: "center", colSpan: 2 }, {}, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, {}, {}, {}, { text: "From", bold: !0, alignment: "center" }, { text: "To", bold: !0, alignment: "center" }, {}], [{ text: "Total Credit Points", colSpan: 7, alignment: "right" }, {}, {}, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 120, 50, 110, 120, 40], body: [[{ text: "1B", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Patents Granted (Only granted patents are considered)\nPlease provide proof for grant of patent issued by competent authority.", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "8 Credit points per patent as inventor(in case of more than one person in a Project, the Principal Investigator gets 5 credit points and the rest to be divided equally among other members). " }], colSpan: 5 }, {}, {}, {}, {}], [{ text: "S. No.", bold: !0, alignment: "center" }, { text: "Title of Patent", bold: !0, alignment: "center" }, { text: "PI & CO-PI", bold: !0, alignment: "center" }, { text: "File Number/ Patent Award Number", bold: !0, alignment: "center" }, { text: "Patent Granting Authority", bold: !0, alignment: "center" }, { text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{ text: "Total Credit Points", colSpan: 5, alignment: "right" }, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 80, 40, 80, 70, 70, 70, 30], body: [[{ text: "2", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Consultancy  Projects Undertaken  (Please provide proof (award letter) for each consultancy)", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "2 Credit points @ Rs.5 lakhs of consultancy, subject to maximum of 10 Credit points. " }], colSpan: 7 }, {}, {}, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Consultancy Project Title", bold: !0, alignment: "center" }, { rowSpan: 2, text: "PI & CO-PI", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Name of Sponsoring Agency", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Amount Sanctioned", bold: !0, alignment: "center" }, { text: "Period of Project", bold: !0, alignment: "center", colSpan: 2 }, {}, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, {}, {}, {}, { text: "From", bold: !0, alignment: "center" }, { text: "To", bold: !0, alignment: "center" }, {}], [{ text: "Total Credit Points", colSpan: 7, alignment: "right" }, {}, {}, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 100, 80, 100, 70, 70, 30], body: [[{ text: "3", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Ph.D. Thesis Guided (Including Thesis submitted cases.) ", bold: !0 }, { text: "\n As a Proof Notification of Concerned University/Institute must be attached for each candidate", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "8 Credit points per Ph.D. student (in case there are more than one supervisor, then the Guide (1st Supervisor) gets 5 credit points per student and the rest to be divided equally among other supervisor(s). " }], colSpan: 6 }, {}, {}, {}, {}, {}], [{ text: "S. No.", bold: !0, alignment: "center" }, { text: "Name of Candidate", bold: !0, alignment: "center" }, { text: "Supervisor and Co-supervisor", bold: !0, alignment: "center" }, { text: "Title of Thesis ", bold: !0, alignment: "center" }, { text: "Status Submitted/ Awarded", bold: !0, alignment: "center" }, { text: "Year", bold: !0, alignment: "center" }, { text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{ text: "Total Credit Points", colSpan: 6, alignment: "right" }, {}, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 100, 80, 100, 35, 35, 70, 30], body: [[{ text: "4A", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Published Research Papers in Science Citation Index (SCI) (Paid Journals not allowed).", bold: !0 }, { text: "\n As a proof please provide \na.\tPage containing title, author(s) name, affiliation & name of the journal \nb.\tThat the concerned journal is in the list of SCI \nc.\tEnclose your Scopus indexed journal list with relevant proof", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "4 Credit points per paper since last promotion. First Author or Main Supervisor will get 2 points and rest will be divided among others." }], colSpan: 7 }, {}, {}, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Title of Paper", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Name of Journal", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Volume, Page Number & Year ", bold: !0, alignment: "center" }, { colSpan: 2, text: "Paper  published in SCI indexed journal (as cited in paper)", bold: !0, alignment: "center" }, {}, { rowSpan: 2, text: "Whether Main Supervisor Yes/No", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, {}, {}, { text: " " }, {}, {}, {}], [{ text: "Total Credit Points", colSpan: 7, alignment: "right" }, {}, {}, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 100, 80, 100, 35, 35, 70, 30], body: [[{ text: "4B", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Published Research Papers in Scopus Journals (Paid Journals not allowed).", bold: !0 }, { text: "\n As a proof please provide \na.\t\tPage containing title, author(s) name, affiliation & name of the journal  \nb.\tThat the concerned journal is in the list of Scopus. \nc.\t Enclose your Scopus indexed journal list with relevant proof", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "4 Credit points per paper since last promotion. First Author or Main Supervisor will get 2 points and rest will be divided among others." }], colSpan: 7 }, {}, {}, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Title of Paper", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Name of Journal", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Volume, Page Number & Year ", bold: !0, alignment: "center" }, { colSpan: 2, text: "Paper published in Scopus indexed journal", bold: !0, alignment: "center" }, {}, { rowSpan: 2, text: "Whether Main Supervisor Yes/No", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, {}, {}, { text: " " }, {}, {}, {}], [{ text: "Total Credit Points", colSpan: 7, alignment: "right" }, {}, {}, {}, {}, {}, {}, {}], [{ text: "Total Credit Points(4A+4B)", colSpan: 7, alignment: "right" }, {}, {}, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 100, 80, 100, 35, 35, 70, 30], body: [[{ text: "5", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Conference paper Indexed in Science Citation Index or Scopus or web of science Conference or any internationally renowned conference. .", bold: !0 }, { text: "\n As a proof please provide \na.\tPage(s) containing title, author(s) name, affiliation & name of the proceeding of the conference \nb.\tThat the concerned conference is in the list of Science Citation  Index  or  Scopus  or  Web  of  science Conference  or  any  internationally  renowned conference", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "1 Credit points per paper up to a maximum of 10 credit points. First author or Main Supervisor will get 0.6 and rest will be divided among others." }], colSpan: 7 }, {}, {}, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Title of Paper", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Detail of Conference", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Volume, Page Number & Year ", bold: !0, alignment: "center" }, { colSpan: 2, text: "Authors Position out of Total Number of Authors", bold: !0, alignment: "center" }, {}, { rowSpan: 2, text: "Whether Main Supervisor Yes/No", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, {}, {}, { text: " " }, {}, {}, {}], [{ text: "Total Credit Points", colSpan: 7, alignment: "right" }, {}, {}, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 180, 70, 70, 60, 60], body: [[{ text: "6", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Institute Level Additional  Responsibilities.\nHead of the Department, Dean, Chief Warden, Professor  In-charge  (Training  and  Placement), Advisor  (Estate),  Chief  Vigilance  Officer,  PI (Exam) & TEQIP (Coordinator) ", bold: !0 }, { text: "\nAs a proof please provide copy of order(s) issued by concerned Head or Chairman and approved by the Director. ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "2 Credit points per semester up to a max of 16 Credit points since last promotion." }], colSpan: 5 }, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Name of Post", bold: !0, alignment: "center" }, { colSpan: 2, text: "Duration", bold: !0, alignment: "center" }, {}, { text: "No. of Semesters", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, { text: "From", alignment: "center" }, { text: "To", alignment: "center" }, { text: "M", alignment: "center" }, {}], [{ text: "Total Credit Points", colSpan: 5, alignment: "right" }, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 180, 70, 70, 60, 60], body: [[{ text: "7", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Other Institute Level Additional  Responsibilities.\nWarden,  Assistant  wardens,  Associate  Dean, Chairman  or  Convener  institute  academic committees,  Faculty  In  charge  Computer Center or Information and Technology Services or  Library  or  Admission  or  student  activities and other Institutional activities ", bold: !0 }, { text: "\nAs a proof please provide copy of order(s) issued by concerned Head or Chairman and approved by the Director.  ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "1 Credit point per semester up to a maximum of 8 credit points since last promotion" }], colSpan: 5 }, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Name of Post", bold: !0, alignment: "center" }, { colSpan: 2, text: "Duration", bold: !0, alignment: "center" }, {}, { text: "No. of Semesters", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, { text: "From", alignment: "center" }, { text: "To", alignment: "center" }, { text: "M", alignment: "center" }, {}], [{ text: "Total Credit Points", colSpan: 5, alignment: "right" }, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 180, 70, 70, 60, 60], body: [[{ text: "8", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Chairman and Convener of different Standing Committees and Special Committees (Ex-officio status will  not be considered). .\nFaculty in-charges (Each for one year duration) of different Units or equivalent.", bold: !0 }, { text: "\nAs a proof please provide copy of order(s) issued by concerned Head or Chairman and approved by the Director.  ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "0.5 Credit point per semester up to a maximum of 3 credit points since last promotion." }], colSpan: 5 }, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Name and Details of Post", bold: !0, alignment: "center" }, { colSpan: 2, text: "Duration", bold: !0, alignment: "center" }, {}, { text: "No. of Semesters", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, { text: "From", alignment: "center" }, { text: "To", alignment: "center" }, { text: "M", alignment: "center" }, {}], [{ text: "Total Credit Points", colSpan: 5, alignment: "right" }, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 180, 70, 70, 60, 60], body: [[{ text: "9", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Departmental  activities  identified  by  Head  of the  Department  like  Lab  in Charges, or Department  Level  Committee for  a  minimum period of one year.", bold: !0 }, { text: "\nAs a proof please provide copy of order(s) issued by concerned Head or Chairman and approved by the Director.  ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "0.5 Credit point per Semesters up to a maximum of 3 credit points since last promotion." }], colSpan: 5 }, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Details of Activity", bold: !0, alignment: "center" }, { colSpan: 2, text: "Duration", bold: !0, alignment: "center" }, {}, { text: "No. of Semesters", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, { text: "From", alignment: "center" }, { text: "To", alignment: "center" }, { text: "M", alignment: "center" }, {}], [{ text: "Total Credit Points", colSpan: 5, alignment: "right" }, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 90, 90, 70, 70, 60, 60], body: [[{ text: "10", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Workshop or Faculty Development Program or Short  Term  Courses  of  min  05  working  days duration offered as Coordinator or Convener", bold: !0 }, { text: "\nPlease provide proof.  ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "2 Credit points per course up to a maximum of 8 Credit points since last promotion" }], colSpan: 6 }, {}, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Post held(coordinator or convener)", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Details of WS/FDP /STC", bold: !0, alignment: "center" }, { colSpan: 2, text: "Duration", bold: !0, alignment: "center" }, {}, { text: "Total No. of Days", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, {}, { text: "From", alignment: "center" }, { text: "To", alignment: "center" }, {}, {}], [{ text: "Total Credit Points", colSpan: 6, alignment: "right" }, {}, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 180, 70, 70, 60, 60], body: [[{ text: "11", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Conducting National  Programs  like  Global Initiative of Academic Networks etc. as Course Coordinator.", bold: !0 }, { text: "\nPlease provide proof. ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "2 Credit  points  per  course  up  to  a  maximum  of  4  credit points since the last promotion for Program of two weeks duration. \n1  credit  point  per  course  up  to  a  maximum  of  2  credit points since last promotion, for program of one week duration.." }], colSpan: 5 }, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Details of National Programs Conducted  ", bold: !0, alignment: "center" }, { colSpan: 2, text: "Duration", bold: !0, alignment: "center" }, {}, { text: "Total No. of Days", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, { text: "From", alignment: "center" }, { text: "To", alignment: "center" }, { text: "D", alignment: "center" }, {}], [{ text: "Total Credit Points", colSpan: 5, alignment: "right" }, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 90, 90, 70, 70, 60, 60], body: [[{ text: "12", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "National or International conference organized as Chairman or Secretary ", bold: !0 }, { text: "\nPlease provide proof.  ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "3  Credit  points  per  program  up  to  a  maximum  of  6 Credit points since last promotion." }], colSpan: 6 }, {}, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Post held Chairman or Secretary", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Details of conference organized", bold: !0, alignment: "center" }, { colSpan: 2, text: "Duration", bold: !0, alignment: "center" }, {}, { text: "Total No. of Days", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, {}, { text: "From", alignment: "center" }, { text: "To", alignment: "center" }, {}, {}], [{ text: "Total Credit Points", colSpan: 6, alignment: "right" }, {}, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 90, 90, 70, 70, 60, 60], body: [[{ text: "13", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Length of service over and above the relevant minimum teaching experience required for a given cadre", bold: !0 }, { text: "\nPlease provide letter of appointment along with joining report/promotion as proof. ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "2 Credit points per semester with maximum of 10 credit points since last promotion" }], colSpan: 6 }, {}, {}, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Designation", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Organization", bold: !0, alignment: "center" }, { colSpan: 2, text: "Duration", bold: !0, alignment: "center" }, {}, { text: "Total No. of Semesters", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, {}, { text: "From", alignment: "center" }, { text: "To", alignment: "center" }, {}, {}], [{ text: "Total Credit Points", colSpan: 6, alignment: "right" }, {}, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 150, 150, 70, 70], body: [[{ text: "14", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Establishment of New Lab(s)", bold: !0 }, { text: "\nPlease provide proof (Up gradation of Existing Lab will not be considered). ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "4 Credit points since last promotion." }], colSpan: 4 }, {}, {}, {}], [{ text: "S. No.", bold: !0, alignment: "center" }, { text: "Name of Laboratory", bold: !0, alignment: "center" }, { text: "Organization", bold: !0, alignment: "center" }, { text: "Year of Establishment of Lab", bold: !0, alignment: "center" }, { text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{ text: "Total Credit Points", colSpan: 4, alignment: "right" }, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 120, 60, 120, 70, 70], body: [[{ text: "15", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Theory Teaching of over and above 6 credit hrs. course .", bold: !0 }, { text: "\nAttach copy of Time Table duly certified by Head of the department as proof. ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "1 Credit point or credit hours up to a maximum of 6 credit points since last promotion." }], colSpan: 5 }, {}, {}, {}, {}], [{ text: "S. No.", bold: !0, alignment: "center" }, { text: "Name of Course", bold: !0, alignment: "center" }, { text: "Number of Credit points", bold: !0, alignment: "center" }, { text: "Name of Department", bold: !0, alignment: "center" }, { text: "Credit of the Course Taught", bold: !0, alignment: "center" }, { text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{ text: "Total Credit Points", colSpan: 5, alignment: "right" }, {}, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 150, 150, 70, 70], body: [[{ text: "16", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Post Graduate Dissertations Guided ", bold: !0 }, { text: "\nFor Proof certificate of the dissertation authenticated by HoD should be submitted ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "0.5  Credit  point  per  project  to  a  maximum  of  10  Credit points since last promotion.." }], colSpan: 4 }, {}, {}, {}], [{ text: "S. No.", bold: !0, alignment: "center" }, { text: "Name of Candidate", bold: !0, alignment: "center" }, { text: "Title of Dissertation", bold: !0, alignment: "center" }, { text: "Year of award", bold: !0, alignment: "center" }, { text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{ text: "Total Credit Points", colSpan: 4, alignment: "right" }, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 150, 150, 70, 70], body: [[{ text: "17", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Under Graduate Projects Guided  ", bold: !0 }, { text: "\nFor Proof certificate of the project authenticated by HoD should be submitted ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "0.25 Credit point per project to a maximum of 4 Credit points since last promotion." }], colSpan: 4 }, {}, {}, {}], [{ text: "S. No.", bold: !0, alignment: "center" }, { text: "Name of Candidate", bold: !0, alignment: "center" }, { text: "Title of Project", bold: !0, alignment: "center" }, { text: "Year of award", bold: !0, alignment: "center" }, { text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{ text: "Total Credit Points", colSpan: 4, alignment: "right" }, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 150, 150, 70, 70], body: [[{ text: "18", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Text or Reference Books published on relevant subjects from reputed international publishers  ", bold: !0 }, { text: "\nFor Proof cover page along with page(s) containing author(s) and publisher’s details of the published book should be submitted", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "6  Credit  points  per  book  up  to  a  maximum  of  18 Credit  points since last promotion." }], colSpan: 4 }, {}, {}, {}], [{ text: "S. No.", bold: !0, alignment: "center" }, { text: "Title of the Book", bold: !0, alignment: "center" }, { text: "Name of Publisher with ISSN/ISBN No. ", bold: !0, alignment: "center" }, { text: "Year of Publication", bold: !0, alignment: "center" }, { text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{ text: "Total Credit Points", colSpan: 4, alignment: "right" }, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 150, 150, 70, 70], body: [[{ text: "19", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "A.\tText  or  Reference  book  published  on  relevant subjects  from  reputed  national  publishers   \nB.\tBook  chapters  in  the  books  published  by reputed international publishers only ", bold: !0 }, { text: "\nFor Proof cover page along with page(s) containing author(s) and publisher’s details of the published book should be submitted", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "2  Credit  points  per  book/chapter  up  to  a  maximum  of  6 Credit  points since last promotion." }], colSpan: 4 }, {}, {}, {}], [{ text: "S. No.", bold: !0, alignment: "center" }, { text: "Title of the Book", bold: !0, alignment: "center" }, { text: "Name of Publisher with ISSN/ISBN No. ", bold: !0, alignment: "center" }, { text: "Year of Publication", bold: !0, alignment: "center" }, { text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{ text: "Total Credit Points", colSpan: 4, alignment: "right" }, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 230, 70, 70, 70], body: [[{ text: "20", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Significant outreach activities", bold: !0 }, { text: "\nPlease provide Proof", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "1 Credit  point  per  activity  up  to  a  maximum  of  4  credit points since last promotion." }], colSpan: 4 }, {}, {}, {}], [{ rowSpan: 2, text: "S. No.", bold: !0, alignment: "center" }, { rowSpan: 2, text: "Name and Details of Outreach Activity", bold: !0, alignment: "center" }, { colSpan: 2, text: "Duration", bold: !0, alignment: "center" }, {}, { rowSpan: 2, text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{}, {}, { text: "From", alignment: "center" }, { text: "To", alignment: "center" }, {}], [{ text: "Total Credit Points", colSpan: 4, alignment: "right" }, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 230, 70, 70, 70], body: [[{ text: "21", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Fellow IEEE, FNA, FNAE, FNASc   ", bold: !0 }, { text: "\nPlease provide Proof", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "10 Credit points" }], colSpan: 4 }, {}, {}, {}], [{ text: "S. No.", bold: !0, alignment: "center" }, { text: "Name and Details of Fellow", bold: !0, alignment: "center" }, { text: "Date of Award", bold: !0, alignment: "center" }, { text: "Total Duration of Award", bold: !0, alignment: "center" }, { text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{ text: "Total Credit Points", colSpan: 4, alignment: "right" }, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 10, table: { widths: [30, 230, 70, 70, 70], body: [[{ text: "22", bold: !0, alignment: "center" }, { text: [{ fontSize: 12, text: "Placement percentage (only for the placement cell officers or Faculty in-charge of Placement)   ", bold: !0 }, { text: "\nPlease provide Proof ", bold: !0 }, { fontSize: 11, text: "\n Credit Point Distribution: ", bold: !0 }, { text: "\n4 credit points/year up to a maximum of 20 points since last promotion for Placement percentage > 85%" }, { text: "\n2 credit points/year up to a maximum of 10 points since last promotion for Placement percentage > 75% to 84 " }, { text: "\n(%  to  be  based  on  total  number  of  students passing out and single job offer)" }], colSpan: 4 }, {}, {}, {}], [{ text: "S. No.", bold: !0, alignment: "center" }, { text: "Name of Company/Organization", bold: !0, alignment: "center" }, { text: "Number of Selections more than 85%", bold: !0, alignment: "center" }, { text: "Number of Selections more than 75% to 84%", bold: !0, alignment: "center" }, { text: "Credit Points Claimed", bold: !0, alignment: "center" }], [{ text: "Total Credit Points", colSpan: 4, alignment: "right" }, {}, {}, {}, {}]] } }, { pageBreak: "before", fontSize: 12, margin: [0, 10, 0, 0], table: { widths: [200, 306], headerRows: 2, body: [[{ text: "Total Credit Points Claimed(From Serial No. 1 to 22)", alignment: "center", bold: !0 }, {}], [{ margin: [2, 2, 2, 5], text: "DECLARATION", bold: !0, fontSize: 14, colSpan: 2 }, {}], [{ margin: [2, 2, 2, 5], text: "I hereby declare that I have read carefully and understood the instructions and particulars supplied to me, and that all entries in this form, as well as, in attached sheets are true to the best of my knowledge and belief. At any stage if any of the information furnished by me is found to be false or incorrect, my candidature will be treated as cancelled. If selected, I promise to abide by the rules and regulations of the Institute.", colSpan: 2, alignment: "justify" }, {}], [{ table: { widths: [60, 125], body: [[{ margin: [2, 2, 2, 5], text: "Date" }, {}], [{ margin: [2, 2, 2, 5], text: "Place" }, {}]] } }, { text: "Signature", alignment: "right" }]] } }], images: { manit: "data:image/png;base64,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" }, footer: function (t, e) { return [{ text: "Sign Above      " + t.toString() + " of " + e, alignment: "right", margin: [0, 10, 50, 0] }] }, header: function (t, e, n) { return 1 == t ? void 0 : [{ fontSize: 12, bold: !0, margin: [20, 25, 0, 0], text: "Application ID : "+no, alignment: "left" }] } };

		Application.findOne({ email: username, no: no }, function (err, application) {
			if (err) { }
			if (application) {
				module.exports.fillPartBApplication(dd, application, function (dd) {
					Application1.findOne({ username: username, no: no }, function (err, application1) {
						if (err) { }
						if (application1) {
							dd.content[2].table.body[0][1].text = application1.applicant_name;
							Credit.findOne({ username: username, no: no }, function (err, credit) {
								if (err) { }
								if (credit) {
									module.exports.fillCreditData(dd, credit, function (dd) {
										callback(dd);
									});
								}
								else {
									callback(dd);
								}
							})

						}
						else {
							callback(dd);
						}
					});
				});
			}
			else {
				callback(dd);
			}
		})

	},

	fillPartBApplication: function (dd, application, callback) {

		dd.content[2].table.body[0][3].text = application.department_full;
		dd.content[2].table.body[1][1].text = application.post_applied;
		dd.content[2].table.body[1][3].text = application.specialization;

		callback(dd);
	},

	createPdfBinary: function (pdfDoc, no, callback) {

		var fontDescriptors = {
			Roboto: {
				normal: path.join(__dirname, 'public', '/fonts/Roboto-Regular.ttf'),
				bold: path.join(__dirname, 'public', '/fonts/Roboto-Medium.ttf'),
				italics: path.join(__dirname, 'public', '/fonts/Roboto-Italic.ttf'),
				bolditalics: path.join(__dirname, 'public', '/fonts/Roboto-MediumItalic.ttf')
			}
		};

		var printer = new pdfMakePrinter(fontDescriptors);

		var doc = printer.createPdfKitDocument(pdfDoc);
		let out = fs.createWriteStream('./public/' + 'pdf/' + no + '.pdf');
		doc.pipe(out);
		doc.end();
		out.on('finish', function () {
			fs.readFile('./public/' + 'pdf/' + no + '.pdf', function (err, data) {
				if (err) throw err;


				// Send base64 pdf to client
				callback(data);
			});

			// callback();
			// var chunks = [];

			// var result;

			// doc.on('data', function (chunk) {
			//   chunks.push(chunk);
			// });
			// doc.on('end', function () {
			//     onsole.log('doc end called');
			//   result = Buffer.concat(chunks);
			//   console.log(result);
			//   callback('data:application/pdf;base64,' + result.toString('base64'));
			// });
			// doc.end();

		})
	}
}