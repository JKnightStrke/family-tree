let database={}
let focus=0
function uploadFile(file){
	const reader=new FileReader()
	reader.onload=e=>{
		database=JSON.parse(e.target.result)
		focus=0
		renderPeople()
	}
	reader.readAsText(event.target.files[0])
}
function downloadFile(){
	const file=new Blob(
		[JSON.stringify(database)],
		{type:`application/json`}
	)
	const link=Object.assign(document.createElement(`a`),{
		href:URL.createObjectURL(file),
		download:`Family Tree.json`}
	)
	link.click()
	URL.revokeObjectURL(link.href)
}
function newPerson(){
	let fName=prompt(`First name`)
	let mName=prompt(`Middle name`)
	let lName=prompt(`Last name`)
	let dob=prompt(`Date of birth\ndd/mm/yyyy`)
	let dod=prompt(`Date of death (if applicable)\ndd/mm/yyyy`)
	let job=prompt(`Occupation`)
	database[fName,Object.keys(database).length]={
		fName,
		mName,
		lName,
		dob,
		dod,
		job,
	}
	renderPeople()
}
function renderPeople() {
    let contentQueue = '';
    let pointer = database[focus];  // Get the currently focused person

    // Check if the pointer exists (meaning a person is selected)
    if (pointer) {
        let name = `${pointer.fName} <span class="person-name-middle">${pointer.mName}</span> ${pointer.lName}`;
        
        // Calculate age
        const age = calculateAge(pointer.dob, pointer.dod);
        
        contentQueue += `
            <div class="person">
                <div class="person-name">${name}</div>
                <div class="person-details">
                    Date of Birth: ${pointer.dob}<br>
                    Date of Death: ${pointer.dod ? pointer.dod : 'N/A'}<br>
                    Age: ${pointer.dod ? age : age + ' (currently alive)'}<br>
                    Occupation: ${pointer.job}
                </div>
            </div>
            <button class="edit-button" onclick="editPerson(${focus})">Edit</button>
        `;
    } else {
        // If no person is focused, you can show a message or simply do nothing
        contentQueue += '<div>No person selected.</div>';
    }

    document.getElementById('focus-details').innerHTML = contentQueue;
}
function editPerson(index) {
    let person = database[index];
    // Prompt the user to edit each field
    let fName = prompt('Edit First Name', person.fName);
    let mName = prompt('Edit Middle Name', person.mName);
    let lName = prompt('Edit Last Name', person.lName);
    let dob = prompt('Edit Date of Birth \ndd/mm/yyyy', person.dob);
    let dod = prompt('Edit Date of Death \ndd/mm/yyyy', person.dod);
    let job = prompt('Edit Occupation', person.job);

    // Update the database with new values
    database[index] = {
        fName: fName || person.fName,
        mName: mName || person.mName,
        lName: lName || person.lName,
        dob: dob || person.dob,
        dod: dod || person.dod,
        job: job || person.job
    };

    // Re-render the updated person
    renderPeople();
}
function calculateAge(dob, dod) {
    const dobDate = new Date(dob.split('/').reverse().join('-')); // Convert dd/mm/yyyy to yyyy-mm-dd format
    const dodDate = dod ? new Date(dod.split('/').reverse().join('-')) : new Date(); // If DOD is provided, convert it; otherwise, use today's date
    let age = dodDate.getFullYear() - dobDate.getFullYear(); // Calculate age based on year difference

    // Adjust age if the current date hasn't reached the birthday yet this year
    const monthDifference = dodDate.getMonth() - dobDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && dodDate.getDate() < dobDate.getDate())) {
        age--;
    }

    return age;
}