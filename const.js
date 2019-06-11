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
    posts: function () {
        var post = [];
        post['APG1'] = "Assistant Professor Grade I";
        post['APG2'] = "Assistant Professor Grade II";
        post["ASOP"] = "Associate Professor";
        post["PROF"] = "Profssor";
        return post;
    }
}