var Const = require('./const');
var Application = require('./models/application');
var Application1 = require('./models/application1');
var Application2 = require('./models/application2');
var Application3 = require('./models/application3');
var Application4 = require('./models/application4');
var pdfMakePrinter = require('pdfmake');
var path = require('path');
var fs = require('fs');

module.exports = {

	fillCharacter:function(username,no,annexure,dd,callback){
		Application4.findOne({username:username,no:no},function(err,application4){
			if(err){}
			if(application4){
				dd.content[13].table.body[1][2].text = application4.car1 ;
				dd.content[13].table.body[2][2].text = application4.car2 ;
				dd.content[13].table.body[3][2].text = application4.car3 ;
				dd.content[13].table.body[4][2].text = application4.car4 ;

				dd.content[14].table.body[1][1].text = application4.presenet_emp_org ;
				dd.content[14].table.body[2][1].text = application4.presenet_emp_designation ;
				dd.content[14].table.body[3][1].text = application4.presenet_emp_doa ;
				dd.content[14].table.body[4][1].text = application4.presenet_emp_regular ;
				dd.content[14].table.body[5][1].text = application4.presenet_emp_basic+' , '+application4.presenet_emp_agp ;

				dd.content[15].table.body[2][1].text = application4.expectated_basic ;
				dd.content[15].table.body[2][2].text = application4.justification ;
				callback(dd,annexure);
			}else{
				callback(dd,annexure);
			}
		})
	},

	fillExperience:function(username,no,annexure,dd,callback){
		Application3.findOne({username:username,no:no},function(err,application3){
			if(err){}
			if(application3){
				//teaching exp
				dd.content[9].table.body.length = 3;
				for(var i=0;i<application3.teaching_university.length;i++){
					if(application3.teaching_university[i]=='') continue;
					var d =  [{ text:'RGPV Bhopal'},{text:'Assosiate Professor'},{ 
					    text:'27-02-2002',
					},{ 
					    text:'27-02-2002',
					},{  
					    text:'10',
					},{  
					    text:'12',
					},{text:'20000'},{text:'120000'},{text:'R'},{text:'61-2019'},{text:'2'}];
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
					annexure += 1 ;
					dd.content[9].table.body.push(d);	
				}
				//industry exp
				dd.content[10].table.body.length = 3;
				for(var i=0;i<application3.industry_org.length;i++){
					if(application3.industry_org[i]=='') continue;
					var d =  [{ text:'RGPV RAju Gahandi Bhopal'},{text:'Assosiate Professor'},{ 
					    text:'27-02-2002',
					},{ 
					    text:'27-02-2002',
					},{  
					    text:'10',
					},{  
					    text:'12',
					},{text:'2'}];
					d[0].text = application3.industry_org[i];
					d[1].text = application3.industry_post[i];
					d[2].text = application3.industry_duration_from[i];
					d[3].text = application3.industry_duration_to[i];
					d[4].text = application3.industry_exp_year[i];
					d[5].text = application3.industry_exp_month[i];
					d[6].text = annexure;
					annexure += 1 ;
					dd.content[10].table.body.push(d);	
				}
				dd.content[11].table.body[2][0].text = application3.name_referee1 ;
				dd.content[11].table.body[2][2].text = application3.address_referee1 ;
				dd.content[11].table.body[3][0].text = application3.name_referee1 ;
				dd.content[11].table.body[3][2].text = application3.address_referee2 ;
				dd.content[11].table.body[4][1].text = application3.phone_referee1 ;
				dd.content[11].table.body[4][3].text = application3.phone_referee2 ;
				dd.content[11].table.body[5][1].text = application3.mobile_referee1 ;
				dd.content[11].table.body[5][3].text = application3.mobile_referee2 ;
				dd.content[11].table.body[6][1].text = application3.email_referee1 ;
				dd.content[11].table.body[6][3].text = application3.email_referee2 ;

				dd.content[12].table.body[1][0].text = application3.adi_info ;
				callback(dd,annexure);
			}else{
				callback(dd,annexure);
			}
			
		})

	},

	fillEducationalInfo:function(username,no,annexure,dd,callback){
		Application2.findOne({username:username,no:no},function(err,application2){
			if(err){}
			if(application2){
				//for educational qualification
				dd.content[5].table.body.length = 2;
				for(var i=0;i<application2.degree.length;i++){
					if(application2.degree[i]=='') continue;
					var d = [{  margin:[2,2,2,5],
					    text:'BE',
					},{  margin:[2,2,2,5],
					    text:'Computer Science & Engineering',
					},{  margin:[2,2,2,5],
					    text:'RGPV Bhopal',
					},{  margin:[2,2,2,5],
					    text:'8.02',
					},{  margin:[2,2,2,5],
					    text:'I',
					},{  margin:[2,2,2,5],
					    text:'2017',
					},{  margin:[2,2,2,5],
					    text:'1',
					}];
					d[0].text = application2.degree[i];
					d[1].text = application2.subject[i];
					d[2].text = application2.university[i];
					d[3].text = application2.grade[i];
					d[4].text = application2.divison[i];
					d[5].text = application2.yop[i];
					d[6].text = annexure;
					annexure += 1 ;
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
				if(application2.pdf_area != ''){
					dd.content[7].table.body.length = 3 ;
					//dd.content[7].table.body[4][1].text = application2.pdf_area;
					for(var i=0;i<application2.pdf_university.length;i++){
						if(application2.pdf_university[i]=='') continue;
						var pdf = 	[{  margin:[2,2,2,5],
							text:'1 ',
						},{  margin:[2,2,2,5],
							text:'RGPV Bhopal ',
							},{ margin:[2,2,2,5],
							text:'27-02-2009',
						},{  margin:[2,2,2,5],
							text:'27-02-2009',
						}];
						pdf[0].text = i+1;
						pdf[1].text = application2.pdf_university[i];
						pdf[2].text = application2.pdf_duration_from[i];
						pdf[3].text = application2.pdf_duration_to[i];	
						dd.content[7].table.body.splice(3+i,0,pdf);			
					}
					var pdf_area = 	[{  margin:[2,10,2,5],
					    text:'Area of Research',
					},{  margin:[2,10,2,5],
					    text:application2.pdf_area,
					    colSpan:3
					},{ 
					},{}];
					dd.content[7].table.body.push(pdf_area);
				}
				//for ugc
				if(application2.ugc=='T'){
					dd.content[8].table.body[0][4].text = 'Yes';
					var ugc = [{  margin:[2,2,2,5],
					    text:'UGC',
					   
					},{  margin:[2,2,2,5],
					    text:'Subject ',
					    
					},{  margin:[2,2,2,5],
					    text:'Registration No.',
					   
					    
					},{  margin:[2,2,2,5],
					    text:'Roll Number',
					   
					    
					},{  margin:[2,2,2,5],
					    text:'Year of Passing',
					   
					    
					}];
					dd.content[8].table.body.length = 2;
					if(application2.subject_net!=''){
						ugc[0].text = 'NET';
						ugc[1].text = application2.subject_net;
						ugc[2].text = application2.registration_net;
						ugc[3].text = application2.roll_net;
						ugc[4].text = application2.yop_net;
						dd.content[8].table.body.push(ugc);
					}
					if(application2.subject_net != ''){
						ugc[0].text = 'SLET';
						ugc[1].text = application2.subject_net;
						ugc[2].text = application2.registration_net;
						ugc[3].text = application2.roll_net;
						ugc[4].text = application2.yop_net;
						dd.content[8].table.body.push(ugc);
					}					
					
				}else{
					dd.content[8].table.body[0][4].text = 'No';
					dd.content[8].table.body.length = 1;

				}
				callback(dd,annexure);
								
			}
			else{
				callback(dd,annexure);
			}
		})
	},

	fillPersonalInfo:function(username,no,dd,callback){
		Application1.findOne({username:username,no:no},function(err,application1){
			if(err){}
			if(application1){
				dd.content[4].table.body[1][1].text = application1.applicant_name;
			dd.content[4].table.body[2][1].text = application1.father_name;
			dd.content[4].table.body[3][1].text = application1.mother_name;
			dd.content[4].table.body[4][1].text = application1.spouse_name;
			dd.content[4].table.body[5][1].text = application1.dob;
			dd.content[4].table.body[6][1].text = application1.ageyear+' Y '+application1.agemonth+' M '+application1.ageday+' D ';
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
			}else{
				callback(dd);
			}
		})
	},

    fillApplication:function(application,dd,callback){
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

    printApplicatoin:function(username,no,callback){
		// playground requires you to assign document definition to a variable called dd

	var ldd={content:[{table:{body:[[{margin:[5,5,5,5],width:40,height:40,image:"manit"},{alignment:"center",margin:[75,5,80,5],text:[{text:"Maulana Azad\n",fontSize:14,italics:!0},{text:"NATIONAL INSTITUTE OF TECHNOLOGY\n",bold:!0,fontSize:16},{text:"BHOPAL 462003 MP INDIA",fontSize:14}]}]]}},{table:{body:[[{alignment:"justify",text:[{fontSize:10,text:"Note: Prospective candidates are advised to study the Instructions carefully and then fill up the application precisely in all respects. No column should be left blank. Incomplete application will be rejected. Candidate may attach additional sheets, if required. \n"},{fontSize:12,text:"Note:\n"},{fontSize:10,text:"1.\tThe application form is in two parts: Part-A and Part-B. \n"},{fontSize:10,text:"2.\tPart A of the Form deals with the personal information and Part B deals with the information required for Credit point Calculation as per Schedule “E” of the Statutes of NIT vide Gazette of India No.651 dated July 24, 2017."}]}],[{margin:[0,10,0,10],alignment:"center",text:"PART-A: PERSONAL INFORMATION ",bold:!0,fontSize:14}]]}},{table:{widths:[108,217,162],body:[[{margin:[2,2,2,5],fontSize:14,text:"Advertisement No:"},{},{fontSize:14,rowSpan:7,text:"Affix recent passport size photograph duly signed by candidate",alignment:"center",margin:[0,40,0,0]}],[{margin:[2,2,2,5],fontSize:14,text:"Date:"},{},{}],[{margin:[2,2,2,5],fontSize:14,text:"Last Date of Submission:"},{},{}],[{margin:[2,2,2,5],fontSize:14,text:"Post Applied For"},{},{}],[{margin:[2,2,2,5],fontSize:14,text:"Department"},{},{}],[{margin:[2,2,2,5],fontSize:14,text:"Specialization"},{},{}],[{margin:[2,2,2,5],fontSize:14,text:"Application ID"},{},{}]]}},{fontSize:12,margin:[0,40,0,0],table:{widths:[165,330],body:[[{alignment:"center",margin:[2,2,2,5],text:"FEE REMITTANCE",colSpan:2,bold:!0},{}],[{margin:[2,2,2,5],text:"Bank Details"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Transaction  ID of online payment & Date"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Amount"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"If exempted, reason thereof"},{margin:[2,2,2,5],text:""}]]}},{pageBreak:"before",fontSize:12,margin:[0,40,0,0],table:{widths:[165,330],body:[[{margin:[2,2,2,5],text:"Personal Information",colSpan:2,bold:!0},{}],[{margin:[2,2,2,5],text:"Name of Applicant"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Father's Name"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Mother's Name"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Spouse Name"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Date of Birth   "},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Age "},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Nationality"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Religion "},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Caste Category "},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Person with disability (PWD)"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Gender"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Marital Status"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Identification Document 1",colSpan:2},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"ID Type"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"ID No."},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Identification Document 2",colSpan:2},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"ID Type"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"ID No."},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Complete Postal Address with  Pin Code",colSpan:2},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"For Correspondence"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Permanent"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Phone No with STD Code",colSpan:2},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Residence"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Office"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Mobile 1"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Mobile 2"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Email"},{margin:[2,2,2,5],text:""}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[60,100,177,40,30,50,30],headerRows:2,body:[[{margin:[2,2,2,5],text:"Educational Qualification ( UG Degree onwards) (Enclose Relevant Certificate)",colSpan:7,bold:!0,fontSize:14},{},{},{},{},{},{}],[{margin:[2,2,2,5],text:"Degree(s)",bold:!0},{margin:[2,2,2,5],text:"Subject / Discipline",bold:!0},{margin:[2,2,2,5],text:"University/ Institution",bold:!0},{margin:[2,2,2,5],text:"%  of Marks /Grade",bold:!0},{margin:[2,2,2,5],text:"Division",bold:!0},{margin:[2,2,2,5],text:"Year of Passing",bold:!0},{margin:[2,2,2,5],text:"Annexure #",bold:!0}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[67,60,100,126,67,67],headerRows:2,body:[[{margin:[2,2,2,5],text:"Details of  Ph.D. ",colSpan:6,bold:!0,fontSize:14},{},{},{},{},{}],[{margin:[2,2,2,5],text:"Date of Registration ",bold:!0},{margin:[2,2,2,5],text:"Whether Full Time or Part Time",bold:!0},{margin:[2,2,2,5],text:"Discipline/ Department",bold:!0},{margin:[2,2,2,5],text:"University/ Institution ",bold:!0},{margin:[2,2,2,5],text:"Date of  Thesis Submission ",bold:!0},{margin:[2,2,2,5],text:"Date of Award",bold:!0}],[{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:""}],[{margin:[2,10,2,5],text:"Title of Thesis",colSpan:2},{},{margin:[2,10,2,5],text:"",colSpan:4},{},{},{}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[55,292,70,70],headerRows:2,body:[[{margin:[2,2,2,5],text:"Details of  PDF ",colSpan:4,bold:!0,fontSize:14},{},{},{}],[{margin:[2,2,2,5],text:"Sr.No",bold:!0},{margin:[2,2,2,5],text:"University/ Institution ",bold:!0},{margin:[2,2,2,5],text:"Duration of  PDF",bold:!0,colSpan:2}],[{margin:[2,2,2,5],text:" ",colspan:2},{},{margin:[2,2,2,5],text:"From",bold:!0},{margin:[2,2,2,5],text:"To",bold:!0}],[{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:""}],[{margin:[2,10,2,5],text:"Area of Research"},{margin:[2,10,2,5],text:"",colSpan:3},{},{}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[55,120,100,100,100],headerRows:2,body:[[{margin:[2,2,2,5],text:"Whether  Qualified  UGC- NET/ SLET ",colSpan:4,bold:!0,fontSize:14},{},{},{},{margin:[2,2,2,5],text:"Yes",bold:!0}],[{margin:[2,2,2,5],text:"UGC",bold:!0},{margin:[2,2,2,5],text:"Subject ",bold:!0},{margin:[2,2,2,5],text:"Registration No.",bold:!0},{margin:[2,2,2,5],text:"Roll Number",bold:!0},{margin:[2,2,2,5],text:"Year of Passing",bold:!0}],[{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:" "},{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:""}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[107,80,35,35,20,20,35,35,20,30,20],headerRows:2,body:[[{margin:[2,2,2,5],text:"Teaching Experience ( Starting with the current position)",colSpan:11,bold:!0,fontSize:14},{},{},{},{},{},{},{},{},{},{}],[{margin:[2,2,2,5],text:"Institute/ University",bold:!0},{margin:[2,2,2,5],text:"Post",bold:!0},{margin:[2,2,2,5],text:"Duration",bold:!0,colSpan:2},{},{margin:[2,2,2,5],text:"Experience",bold:!0,colSpan:2},{},{margin:[2,2,2,5],text:"PB & G-Pay",bold:!0},{margin:[2,2,2,5],text:"Gross Salary",bold:!0},{margin:[2,2,2,5],text:"Regular/ Permanent",bold:!0},{margin:[2,2,2,5],text:"NIRF ranking with year",bold:!0},{margin:[2,2,2,5],text:"Annexure #",bold:!0}],[{colSpan:2,text:""},{},{margin:[2,2,2,5],text:"From"},{margin:[2,2,2,5],text:"To"},{margin:[2,2,2,5],text:"Y"},{margin:[2,2,2,5],text:"M"},{colSpan:5,text:""},{},{},{},{}],[{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[130,90,67,67,40,40,30],headerRows:2,body:[[{margin:[2,2,2,5],text:"Research / Industry Experience ",colSpan:7,bold:!0,fontSize:14},{},{},{},{},{},{}],[{margin:[2,2,2,5],text:"Organization ",bold:!0},{margin:[2,2,2,5],text:"Post",bold:!0},{margin:[2,2,2,5],text:"Duration",bold:!0,colSpan:2},{},{margin:[2,2,2,5],text:"Experience",bold:!0,colSpan:2},{},{margin:[2,2,2,5],text:"Annexure #",bold:!0}],[{colSpan:2,text:""},{},{margin:[2,2,2,5],text:"From"},{margin:[2,2,2,5],text:"To"},{margin:[2,2,2,5],text:"Y"},{margin:[2,2,2,5],text:"M"},{}],[{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[90,164,90,164],headerRows:2,body:[[{margin:[2,2,2,5],text:"Name and Address of Minimum Two Referees.",colSpan:4,bold:!0,fontSize:14},{},{},{}],[{margin:[2,2,2,5],text:"Name & Address",bold:!0,colSpan:2},{},{margin:[2,2,2,5],text:"Name & Address",bold:!0,colSpan:2},{}],[{margin:[2,2,2,5],text:" ",colSpan:2},{},{margin:[2,2,2,5],text:"",colSpan:2},{}],[{margin:[2,2,2,5],text:" ",colSpan:2},{},{margin:[2,2,2,5],text:"",colSpan:2},{}],[{margin:[2,2,2,5],text:"Phone No"},{margin:[2,2,2,5],text:" "},{margin:[2,2,2,5],text:"Phone No"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Mobile No"},{margin:[2,2,2,5],text:""},{margin:[2,2,2,5],text:"Mobile No"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Email"},{margin:[2,2,2,5],text:" "},{margin:[2,2,2,5],text:"Email"},{margin:[2,2,2,5],text:""}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[487],headerRows:2,body:[[{margin:[2,2,100,5],text:"Additional  relevant information in support of candidature",bold:!0,fontSize:14}],[{margin:[2,2,2,5],text:""}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[25,250,230],headerRows:2,body:[[{},{margin:[2,2,2,5],text:"Character & Antecedents",bold:!0,fontSize:14},{margin:[2,2,2,5],text:"Comments",bold:!0,fontSize:14}],[{margin:[2,2,2,5],text:"a"},{margin:[2,2,2,5],text:"Have you ever been subject to any disciplinary action, as a student and/or as an employee, If so give full details."},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"b"},{margin:[2,2,2,5],text:"Have you ever been dismissed/suspended from service/employment, if so please give full details "},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"c"},{margin:[2,2,2,5],text:"Were you involved in any criminal case, If yes, give full details (like Crime No, Police Station, Section under which crime was registered, acquittal or conviction/ date of order and Case No)"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"d"},{margin:[2,2,2,5],text:"Is any criminal case pending against you in the court, If yes, give full details "},{margin:[2,2,2,5],text:""}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[170,346],headerRows:2,body:[[{margin:[2,2,2,5],text:"Details of Present Employment and  Employer’s endorsement ",bold:!0,fontSize:14,colSpan:2},{}],[{margin:[2,2,2,5],text:"Name of Organization"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Designation"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Date of Appointment"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Whether   Regular Permanent/ Temporary"},{margin:[2,2,2,5],text:""}],[{margin:[2,2,2,5],text:"Basic pay and AGP (if any)"},{margin:[2,2,2,5],text:""}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[60,140,306],headerRows:2,body:[[{margin:[2,2,2,5],text:"Expected Salary/ Pay Protection with Due Justification for Consideration by Selection Committee. ",bold:!0,fontSize:14,colSpan:3},{},{}],[{margin:[2,2,2,5],text:"Expectation",colSpan:2,alignment:"center"},{},{margin:[2,2,2,5],text:"Justification",alignment:"center"}],[{margin:[2,2,2,5],text:"Basic Pay"},{margin:[2,2,2,5],text:""},{}]]}},{fontSize:12,margin:[0,10,0,0],table:{widths:[200,306],headerRows:2,body:[[{margin:[2,2,2,5],text:"DECLARATION",bold:!0,fontSize:14,colSpan:2},{}],[{margin:[2,2,2,5],text:"I hereby declare that I have read carefully and understood the instructions and particulars supplied to me, and that all entries in this form, as well as, in attached sheets are true to the best of my knowledge and belief. At any stage if any of the information furnished by me is found to be false or incorrect, my candidature will be treated as cancelled. If selected, I promise to abide by the rules and regulations of the Institute.",colSpan:2,alignment:"justify"},{}],[{table:{widths:[60,125],body:[[{margin:[2,2,2,5],text:"Date"},{}],[{margin:[2,2,2,5],text:"Place"},{}]]}},{text:"Signature",alignment:"right"}]]}}],images:{manit:"data:image/png;base64,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"},footer:function(t,e){return[{text:"Sign Above      "+t.toString()+" of "+e,alignment:"right",margin:[0,10,50,0]}]},header:function(t,e,i){return 1==t?void 0:[{fontSize:12,bold:!0,margin:[20,25,0,0],text:"Application ID : "+no,alignment:"left"}]}};

        Application.findOne({email:username,no:no},function(err,application){
             module.exports.fillApplication(application,ldd,function(rdd){
				module.exports.fillPersonalInfo(username,no,rdd,function(rdd){
					var annexure = 1;
					module.exports.fillEducationalInfo(username,no,annexure,rdd,function(rdd,annexure){
						module.exports.fillExperience(username,no,annexure,rdd,function(rdd,annexure){
							module.exports.fillCharacter(username,no,annexure,rdd,function(rdd,annexure){
							
								callback(rdd);
							})
							
						})
						
					})
				});
			 });
        });
    },

    
    createPdfBinary:function(pdfDoc, no,callback) {

        var fontDescriptors = {
          Roboto: {
            normal: path.join(__dirname,  'public', '/fonts/Roboto-Regular.ttf'),
            bold: path.join(__dirname,  'public', '/fonts/Roboto-Medium.ttf'),
            italics: path.join(__dirname,  'public', '/fonts/Roboto-Italic.ttf'),
            bolditalics: path.join(__dirname,  'public', '/fonts/Roboto-MediumItalic.ttf')
          }
        };
        
        var printer = new pdfMakePrinter(fontDescriptors);
        
		var doc = printer.createPdfKitDocument(pdfDoc);
		let out = fs.createWriteStream('./public/'+'pdf/'+no+'.pdf');
        doc.pipe(out);
		doc.end();
		out.on('finish',function(){
			fs.readFile('./public/'+'pdf/'+no+'.pdf', function(err, data) {
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