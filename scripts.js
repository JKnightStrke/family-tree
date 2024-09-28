const BR=`<br>`
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
	database[fName,Object.keys(database).length]={
		fName:fName,
		mName:mName,
		lName:lName,
	}
	renderPeople()
}
function renderPeople(){
	document.getElementById(`content`).innerHTML=``
	for(let i1=0;i1<Object.keys(database).length;i1++){
		document.getElementById(`content`).innerHTML+=`${Object.values(Object.values(database)[i1]).join(` `)}<br>`
	}
}
