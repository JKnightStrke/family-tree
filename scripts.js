let database={}
function uploadFile(file){
	const reader=new FileReader()
	reader.onload=e=>{
		database=JSON.parse(e.target.result)
		renderPeople()}
	reader.readAsText(event.target.files[0])
}
function downloadFile(){
	const file=new Blob(
		[JSON.stringify(database)],
		{type:`application/json`})
	const link=Object.assign(document.createElement(`a`),{
		href:URL.createObjectURL(file),
		download:`Family Tree.json`})
	link.click()
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
