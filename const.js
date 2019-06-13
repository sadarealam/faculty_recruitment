module.exports = {
    departments: function () {
        var department = [];
        department['ARC'] = "Architecture and Planning ";
        department['CHE'] = "Chemical Engineering ";
        department['CHY'] = "Chemistry ";
        department['CVE'] = "Civil Engineering ";
        department['CSE'] = "Computer Science & Engineering ";
        department['EEE'] = "Electrical Engineering  ";
        department['ECE'] = "Electronics and Communication Engineering ";
        department['HUM'] = "Humanities and Social Sciences ";
        department['MCS'] = "Mathematics Computer Application & Bio-informatics ";
        department['MLE'] = "Mechanical Engineering ";
        department['MME'] = "Metallurgical and Materials Engineering ";
        department['PHY'] = "Physics ";
        department['MAN'] = "Management Studies ";
        return department;
    },
    specialization: function(depart){
        var spec = [];
        spec['ARC'] = [{id:1,name:'Housing '},{id:2,name:'Construction Management/ Technology '},{id:3,name:'Landscape '},{id:4,name:'Conservation '},{id:5,name:'Urban Planning / Regional Planning '},{id:6,name:'Geoinformatics '},{id:7,name:'GIS / Remote Sensing'}];
        spec['CHE'] = [{id:1,name:'Chemical Engineering Thermodynamics '},{id:2,name:'Process Intensification'},{id:3,name:'Engineering Analysis and Process Modeling '},{id:4,name:'Optimization of Chemical Engineering '},{id:5,name:'Processes and Reaction Engineering '},{id:6,name:'Fluidization Engineering'}];
        spec['CHY'] = [{id:1,name:'Inorganic Chemistery'},{id:2,name:'Analytical Chemistery'},{id:3,name:'Physical Chemistery'},{id:4,name:'Organic Chemistery'}];
        spec['CVE'] = [{id:1,name:'Surveying & Geodesy (Geo-informatics: Remote  Sensing /  GIS and GPS) '},{id:2,name:'Transportation Engineering (Traffic operation and Management / Pavement Management System and Urban Transportation) '},{id:3,name:'Hydraulic & Water Resources'}];
        spec['CSE'] = [{id:1,name:'Artificial Intelligence'},{id:2,name:'Data Science'},{id:3,name:'High Performance Computing'},{id:4,name:'Networking'},{id:5,name:'Information Security'},{id:6,name:'Software Engineering'},{id:7,name:'Programming Languages and Compilers'},{id:8,name:'Theoretical Computer Science'},{id:9,name:'Graphics and Visualizations'}];
        spec['EEE'] = [{id:1,name:'Power System Restructuring '},{id:2,name:'Smart Grids, Electrical Machine'},{id:3,name:'Power Electronics'}];
        spec['ECE'] = [{id:1,name:'Microwave and RF Engineering'},{id:2,name:'VLSI Design '},{id:3,name:'Embedded/Cyber Physical Systems '},{id:4,name:'Artificial Intelligence '},{id:5,name:'Machine Learning '},{id:6,name:'Broadband/Optical Communication '},{id:7,name:'Instrumentation and Control, Communication  Engineering '},{id:8,name:'Networks and Switching '},{id:9,name:'Signal Processing / Computer Engg. / Technology '},{id:9,name:'Internet of Things '},{id:9,name:'Robotics '}];
        spec['HUM'] = [{id:1,name:'Economics '},{id:2,name:'Psychology '},{id:3,name:'Sociology'}];
        spec['MCS'] = [{id:1,name:'Pure Mathematics '},{id:2,name:'Applied Mathematics '},{id:3,name:'Operational Research '},{id:14,name:'Financial Mathematics'},{id:4,name:'Data Science'},{id:5,name:'Machine Learning '},{id:6,name:'Network Administration '},{id:7,name:'Artificial Intelligence'},{id:8,name:'Server Managemen'},{id:9,name:'High End Computing '},{id:10,name:'Internet of Things'},{id:11,name:'Cognitive Science '},{id:12,name:'Computational Neuroscience '},{id:13,name:'Computational Cell Biology '}];
        spec['MLE'] = [{id:1,name:'Machine Design(Design of Machine Elements/ Computer Aided Design (CAD) /Stress and Vibration Analysis'},{id:2,name:'Thermal Engineering  (Internal Combustion Engine)  '}];
        spec['MME'] = [{id:1,name:'Manufacturing process '},{id:2,name:'Powder Metallurgy '},{id:3,name:'Physical Metallurgy (Heat Treatment)'},{id:4,name:'Mechanical metallurgy '},{id:5,name:'Extractive Metallurgy'}];
        spec['PHY'] = [{id:1,name:'Nuclear Physics'},{id:2,name:'Solid State Physics'},{id:3,name:'Thoretical Physics'}];
        spec['MAN'] = [{id:1,name:'Finance'}];

        return spec[depart];
    },

    posts:function(){
        var post = [];
        post['APG1']  = 'Assistant Professor Grade I';
        post['APG2'] = 'Assistant Professor Grade II';
        post['ASOP'] = 'Associate Professor';
        post['PROF'] = 'Profssor';
        return post;
    },

    postby_adv: function (adv_id) {
        var post = [];
        post['Adv/faculty-NITB/1'] = [{id:'APG1',name:'Assistant Professor Grade I'},{id:'APG2',name:'Assistant Professor Grade II'}];
        post['Adv/faculty-NITB/2'] = [{id:'ASOP',name:'Associate Professor'},{id:'PROF',name:'Profssor'}];
        
        return post[adv_id];
    },
    adv: function(){
        var adv = [{id:'Adv/faculty-NITB/1',name:'Adv/faculty-NITB/1'},{id:'Adv/faculty-NITB/2',name:'Adv/faculty-NITB/2'}];        
        return adv;
    },
    depart:function(adv_post_id){
        var depart = [];
        depart['Adv/faculty-NITB/1-APG1'] = [
            {
                id : 'ARC',
                name : 'Architecture and Planning'
            },
            {
                id : 'CHE',
                name : 'Chemical Engineering '
            },
            {
                id : 'CHY',
                name : 'Chemistry '
            },
            {
                id : 'CVE',
                name : 'Civil Engineering'
            },
            {
                id : 'CSE',
                name : 'Computer Science & Engineering '
            },
            {
                id : 'EEE',
                name : 'Electrical Engineering '
            },
            {
                id : 'ECE',
                name : 'Electronics and Communication Engineering'
            },
            {
                id : 'HUM',
                name : 'Humanities and Social Sciences '
            }
            ,
            {
                id : 'MCS',
                name : 'Mathematics Computer Application & Bio-informatics '
            }
            ,
            {
                id : 'MLE',
                name : 'Mechanical Engineering '
            }
            ,
            {
                id : 'MME',
                name : 'Metallurgical and Materials Engineering '
            }
            ,
            {
                id : 'PHY',
                name : 'Physics '
            }
            ,
            {
                id : 'MAN',
                name : 'Management Studies '
            }           

        ];
        depart['Adv/faculty-NITB/1-APG2'] = [
            {
                id : 'ARC',
                name : 'Architecture and Planning'
            },
            {
                id : 'CHE',
                name : 'Chemical Engineering '
            },
            {
                id : 'CHY',
                name : 'Chemistry '
            },
            {
                id : 'CVE',
                name : 'Civil Engineering'
            },
            {
                id : 'CSE',
                name : 'Computer Science & Engineering '
            },
            {
                id : 'EEE',
                name : 'Electrical Engineering '
            },
            {
                id : 'ECE',
                name : 'Electronics and Communication Engineering'
            },
            {
                id : 'HUM',
                name : 'Humanities and Social Sciences '
            }
            ,
            {
                id : 'MCS',
                name : 'Mathematics Computer Application & Bio-informatics '
            }
            ,
            {
                id : 'MLE',
                name : 'Mechanical Engineering '
            }
            ,
            {
                id : 'MME',
                name : 'Metallurgical and Materials Engineering '
            }
            ,
            {
                id : 'PHY',
                name : 'Physics '
            }
            ,
            {
                id : 'MAN',
                name : 'Management Studies '
            }           

        ];
        depart['Adv/faculty-NITB/2-ASOP'] = [
            {
                id : 'ARC',
                name : 'Architecture and Planning'
            },
            {
                id : 'CHE',
                name : 'Chemical Engineering '
            },
            {
                id : 'CHY',
                name : 'Chemistry '
            },
            {
                id : 'CVE',
                name : 'Civil Engineering'
            },
            {
                id : 'CSE',
                name : 'Computer Science & Engineering '
            },
            {
                id : 'EEE',
                name : 'Electrical Engineering '
            },
            {
                id : 'ECE',
                name : 'Electronics and Communication Engineering'
            },
            {
                id : 'HUM',
                name : 'Humanities and Social Sciences '
            }
            ,
            {
                id : 'MCS',
                name : 'Mathematics Computer Application & Bio-informatics '
            }
            ,
            {
                id : 'MLE',
                name : 'Mechanical Engineering '
            }
            ,
            {
                id : 'MME',
                name : 'Metallurgical and Materials Engineering '
            }
            ,
            {
                id : 'PHY',
                name : 'Physics '
            }
            ,
            {
                id : 'MAN',
                name : 'Management Studies '
            }
            

        ];
        depart['Adv/faculty-NITB/2-PROF'] = [
            {
                id : 'ARC',
                name : 'Architecture and Planning'
            },
            {
                id : 'CHE',
                name : 'Chemical Engineering '
            },
            {
                id : 'CHY',
                name : 'Chemistry '
            },
            {
                id : 'CVE',
                name : 'Civil Engineering'
            },
            {
                id : 'CSE',
                name : 'Computer Science & Engineering '
            },
            {
                id : 'EEE',
                name : 'Electrical Engineering '
            },
            {
                id : 'ECE',
                name : 'Electronics and Communication Engineering'
            },
            {
                id : 'HUM',
                name : 'Humanities and Social Sciences '
            }
            ,
            {
                id : 'MCS',
                name : 'Mathematics Computer Application & Bio-informatics '
            }
            ,
            {
                id : 'MLE',
                name : 'Mechanical Engineering '
            }
            ,
            {
                id : 'MME',
                name : 'Metallurgical and Materials Engineering '
            }
            ,
            {
                id : 'PHY',
                name : 'Physics '
            }
            ,
            {
                id : 'MAN',
                name : 'Management Studies '
            }
            

        ];
        return depart[adv_post_id];
    }

    
}