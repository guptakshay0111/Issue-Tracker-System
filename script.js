document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

/* save issue to local storage */
function saveIssue(e){
	var issueId = chance.guid();
	var issueStatus = 'Open';
	var issueDescription = document.getElementById('issueDescriptionInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;

	var issue = {
		id: issueId,
		description: issueDescription,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issueStatus
	}

	if(localStorage.getItem('issues') == null){
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}else{
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}

	document.getElementById('issueInputForm').reset();

	displayIssues();

	e.preventDefault();
}

/* changing the status of issue */
function setStatusClosed(id){
	var issues = JSON.parse(localStorage.getItem('issues'));

	for(var i = 0; i < issues.length; i++){
		if(issues[i].id === id){
			issues[i].status = 'Closed';
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	displayIssues();
}

/* deleting the issue */
function deleteIssue(id){
	var issues = JSON.parse(localStorage.getItem('issues'));

	for(var i = 0; i < issues.length; i++){
		if(issues[i].id === id){
			issues.splice(i, 1);
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	displayIssues();
}

/* display issue */
function displayIssues() {
	var issues = JSON.parse(localStorage.getItem('issues'));
	var issueList = document.getElementById('issueList');

	issueList.innerHTML = '';

	for(var i = 0; i < issues.length; i++){

		var id = issues[i].id;
		var description = issues[i].description;
		var severity = issues[i].severity;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;

		issueList.innerHTML += '<div class="well">' +
							   '<h6>Issue ID: '+ id +'</h6>' +
							   '<p> <span class="label label-info"> '+ status +' </span> </p>' +
							   '<h3> '+ description +' </h3>' +
							   '<p> <span class="glyphicon glyphicon-time"> '+ severity +' </span> </p>' +
							   '<p> <span class="glyphicon glyphicon-user"> '+ assignedTo +' </span> </p>' +
							   '<a href="#" onClick="setStatusClosed(\''+ id +'\')" class="btn btn-warning"> Close </a> ' +
							   '<a href="#" onClick="deleteIssue(\''+ id +'\')" class="btn btn-danger"> Delete </a>' +
							   '</div>'
	}
}