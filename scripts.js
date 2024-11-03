let database={}
let focus=0
function uploadFile(file){
	const reader=new FileReader()
	reader.onload=e=>{
		database=JSON.parse(e.target.result)
		focus=0
		renderMenu()
		// renderPerson()
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
	let BPlace=prompt(`Place of birth`)
	let dod=prompt(`Date of death (if applicable)\ndd/mm/yyyy`)
	let DPlace=prompt(`Place of death or burryed/resting place`)
	let sex=prompt(`Gender`)
	let father=prompt(`Father`)
	let mother=prompt(`Mother`)
	let sibling=prompt(`siblings`)
	let child=prompt(`children`)
	let home=prompt(`Lives at`)
	let job=prompt(`Occupation`)
	const index=`${fName} ${dob}`
	database[index]={
		fName,
		mName,
		lName,
		dob,
		BPlace,
		dod,
		DPlace,
		sex,
		father,
		mother,
		sibling,
		child,
		home,
		job,
	}
	renderPerson(index)
}

function renderMenu() {
	let contentQueue= '';
	for (const[key,value]of Object.entries(database)){
		contentQueue+= `<p class="menu-person" onclick="setFocus(this.id)" id="${key}">${value.fName} <span id="mName">${value.mName}</span> ${value.lName}</p><br>`;
	}
	document.getElementById("content").innerHTML=contentQueue
}
function setFocus(index) {
	focus=index
	renderPerson()

}

function renderPerson(focusArg=focus) {
    let contentQueue = '';
    let pointer = database[focusArg];  // Get the currently focused person

    // Check if the pointer exists (meaning a person is selected)
    if (pointer) {
        let name = `<span id="fName">${pointer.fName}</span> <span id="mName">${pointer.mName}</span> <span id="lName">${pointer.lName}</span>`;

        const age = calculateAge(pointer.dob, pointer.dod);
        
        contentQueue += `
            <div class="person">
                <div id="person-name">${name}</div>
                <div id="person-details">
                    Date of Birth: <span id="dob">${pointer.dob}</span><br>
                    ${pointer.BPlace ? `Place of Birth: <span id="BPlace">${pointer.BPlace}</span><br>` : ''}
                    ${pointer.dod ? `Date of Death: <span id="dod">${pointer.dod}</span><br>` : ''}
                    ${pointer.DPlace ? `Place of Death: <span id="DPlace">${pointer.DPlace}</span><br>` : ''}
                    Age: <span id="age">${age}</span><br>
                    Gender: <span id="sex">${pointer.sex}</span><br>
                    Father: <span id="father">${pointer.father}</span><br>
                    Mother: <span id="mother">${pointer.mother}</span><br>
                    siblings: <span id="siblings">${pointer.siblings}</span><br>
                    children: <span id="children">${pointer.children}</span><br>
                    home: <span id="home">${pointer.home}</span><br>
                    Occupation: <span id="job">${pointer.job}</span><br>
                    <div id="person-controls">
                    	<button class="edit-button" onclick="editPerson('${focusArg}')">Edit</button>
                		<button class="delete-button" onclick="deletePerson('${focusArg}')">Delete</button>
                	</div>
                </div>
            </div>`;
    } else {
        // If no person is focused, you can show a message or simply do nothing
        contentQueue += '<div>No person selected.</div>';
    }

    document.getElementById('content').innerHTML = contentQueue;
}

function editPerson(index) {
	let personName=document.getElementById('person-name').getElementsByTagName('span')
	for(let i=0;i<personName.length;++i){
		let elementID=personName[i].id
		let element=document.getElementById(elementID)
		element.setAttribute('contenteditable','true')
		element.addEventListener('input',function(){
			database[index][elementID]=element.innerText
		})
	}
	let personDetails=document.getElementById('person-details').getElementsByTagName('span')
	for(let i=0;i<personDetails.length;++i){
		let elementID=personDetails[i].id
		if(elementID==='age'){
			continue
		}
		let element=document.getElementById(elementID)
		element.setAttribute('contenteditable','true')
		element.addEventListener('input',function(){
			database[index][elementID]=element.innerText
			document.getElementById('age').innerHTML=calculateAge(database[index].dob,database[index].dod)
		})
	}
}
function deletePerson(index) {
	if (prompt(`Insert first name to delete person`)==database[index].fName) {
		delete database[index]
		renderMenu()
	}

}

		// Tools
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