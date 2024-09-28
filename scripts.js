let database={}
function uploadFile(file){
	let files=event.target.files
	let fileReader=new FileReader()
	fileReader.readAsText(files[0])
	fileReader.onload=function(e){
		database=JSON.parse(e.target.result)
		renderPeople()
	}
}
function downloadFile(){
	const fileName=`Family Tree`
	const content=JSON.stringify(database)
	const file=new Blob([content],{type:`application/json`})
	const link=document.createElement(`a`)
	link.href=URL.createObjectURL(file)
	link.download=fileName
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(link.href)
}
function newPerson(){
	let fName=prompt(`first name`)
	let mName=prompt(`middle name`)
	let lName=prompt(`last name`)
	let dob=prompt(`date of birth\ndd/mm/yyyy`)
	database[fName,Object.keys(database).length]={
		fName:fName,
		mName:mName,
		lName:lName,
		dob:dob,
	}
	renderPeople()
}
function renderPeople(){
	let contentQueue=``
	for(let i1=0;i1<Object.keys(database).length;i1++){
		let pointer=database[i1]
		let name=`${pointer.fName} <span class="person-name-middle">${pointer.mName}</span> ${pointer.lName}`
		contentQueue+=`
			<div class="person">
				<div class="person-name">
					${name}
				</div>
				<div class="person-details">
					${pointer.dob}
				</div>
			</div>`
	}
	document.getElementById(`content`).innerHTML=contentQueue
}
