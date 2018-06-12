var addNoteButton = document.getElementById("addNote");
var svg = d3.select("svg");
var curContent = [];
var curTitles = [];
var curIDs = [];
var curTypes = [];
var curChecks = [];
var noteTexts = [];
var noteTitles = [];
var noteIDs = [];
var noteTypes = [];
var noteChecks = [];
var xcors = [];
var ycors = [0];
var svgHeight = 100;
var noteHeight = 200;
var noteWidth = 150;
var noteGapHoriz = 200;
var noteGapVert = 250;
var curNoteText = "nice";
var curNoteID = -1;
var curCheck = 0;
var newText = "";
var allNotes = svg.append("notes")

//create array of notes from html
var getNotes = function(){
    noteContent = document.getElementById("notes").innerHTML;
    //noteContent = noteContent.replace('[','');
    //noteContent = noteContent.replace(']','');
    //noteContent = noteContent.replace('(','[');
    //noteContent = noteContent.replace('),',']');
    noteContent = noteContent.replace(/u'/g,'"');
    noteContent = noteContent.replace(/'/g,'"');
    noteContent = noteContent.replace(/None/g,'"None"');
    noteContent = noteContent.replace(/True/g,'"True"');
    noteContent = noteContent.replace(/False/g,'"False"');
    notes = JSON.parse(noteContent);
    //console.log(notes);
    for (note in notes){
	noteContent = notes[note]['content'];
	noteTitle = notes[note]['note_title'];
	noteID = notes[note]['note_id'];
	noteType = notes[note]['note_type'];
	//if its a list, make a check X list
	if (noteType == "list"){
	    checks = notes[note]['checked'];
	    checkmarks = [];
	    for (c in checks){
		if(checks[c] == "True")
		    checkmarks.push('✓');
		else
		    checkmarks.push('X');
	    }
	    curChecks.push(checkmarks);
	}
	else
	    curChecks.push(0);
	//console.log(noteID);
	curContent.push(noteContent);
	curTitles.push(noteTitle);
	curIDs.push(noteID);
	curTypes.push(noteType);
    }
}


//take array of notes and display on screen
var displayNotes = function(){
    var notes = svg.selectAll("rect").data(noteTexts).enter();
    notes.append("rect")
	.attr("x", function(b, d){return xcors[d%5]})
	.attr("y", function(){return ycors[ycors.length-1]})
	.attr("height", noteHeight)
	.attr("width", noteWidth)
	.attr("fill", "yellow")
	.attr("class", function(b, d){return "note" + d})
}

//display the archive buttons
var displayButtons = function(){
    var arcBut = svg.selectAll("ellipse").data(noteIDs).enter();
    arcBut.append("ellipse")
	.attr("cx", function(b, d){return xcors[d%5] + 100})
	.attr("cy", function(){return ycors[ycors.length-1] + 180})
	.attr("rx", 10)
	.attr("ry", 10)
	.attr("fill", "pink")
	.attr("id", function(b){return b})
	.attr("class", "arch");
    var delBut = svg.selectAll("circle").data(noteIDs).enter();
    delBut.append("circle")
	.attr("cx", function(b, d){return xcors[d%5] + 50})
	.attr("cy", function(){return ycors[ycors.length-1] + 180})
	.attr("r", 10)
	.attr("fill", "gray")
	.attr("id", function(b){return b})
	.attr("class", "arch");
    //having the word archive makes the button unclickable
    /*var texts = svg.selectAll("text").data(noteIDs).enter();
      texts.append("text")
      .attr("x", function(b, d){return xcors[d%5] + 65})
      .attr("y", function(){return ycors[ycors.length-1] + 185})
      .attr("textLength","65")
      .text(function(b) {return "ARCHIVE"})
      .attr("fill", "black")
      .attr("class", "but");*/
}

//take array of texts and display on screen
var displayTitles = function(){
    var texts = svg.selectAll("text").data(noteTitles).enter();
    texts.append("text")
	.attr("x", function(b, d){return xcors[d%5] + 5})
	.attr("y", function(){return  ycors[ycors.length-1] + 15})
	.text(function(b, d) {return b})
	.attr("fill", "black")
    	.attr("class", "titl")
	.attr("font-weight", "bold")
	.append('tspan')
	.attr('x', function(b, d){return xcors[d%5] + 5})
	.attr('dy', 35)
	.text(function(b, d){return noteTexts[d]})
	.attr("font-weight", "normal")
	.attr("class", function(b, d){return "note" + d + "-text"})
	.append('tspan')
	.attr('x', function(b, d){return xcors[d%5] + 5})
	.attr('dy', 40)
	.text(function(b, d) {if (noteChecks[d] == 0){return ''}
			      else return noteChecks[d]})
	.attr("font-weight", "normal")
}

//add a new note
var newNote = function(text,title,id,checkbox){
    noteTexts.push(text);
    noteTitles.push(title);
    noteIDs.push(id);
    noteChecks.push(checkbox);
    if(xcors.length < 5){
	xcors.push(noteGapHoriz*xcors.length);
    }
    else{
	xcors = [0]
	ycors.push(noteGapVert*ycors.length);
	svgHeight += 500;
	svg.style("height", svgHeight); 
    }
}

var addNote = function(){
    newNote(curNoteText,curNoteTitle,curNoteID,curCheck);
    displayNotes();
    displayButtons();
    displayTitles();
}

var changeNoteColor = function(d, i){
    d3.select(this).attr({
        fill: "orange",
    });
}

var changeCurNoteText = function(newText){
    curNoteText = newText
}

//takes array of notes and initializes js notes
var initNotes = function(){
    for (text in curContent){
	curNoteText = curContent[text];
	curNoteTitle = curTitles[text];
	curNoteID = curIDs[text];
	curCheck = curChecks[text]; 
	addNote();
    }
}

var setColor = function(){
    d3.selectAll('rect').attr('fill', function(b, d){return notes[d]["color"]});
}

var swapYellow = function(){
    d3.select(this).style("fill", "yellow");
}

//archive a note
// send the note id to flask app
var archive = function(){
    console.log(this);
    var id = this.getAttribute("id");
    console.log(id);
    $.post("/archiveNote", {
	javascript_data: id 
    }).done(function() {
        window.location.replace(window.location.href);});
}

//delete a note
// send the note id to flask app
var del = function(){
    console.log("delete");
    var id = this.getAttribute("id");
    console.log(id);
    $.post("/deleteNote", {
	javascript_data: id 
    }).done(function() {
        window.location.replace(window.location.href);});
}

var selection = "";

getNotes();
initNotes();
setColor();
d3.selectAll("ellipse").on("click", archive);
d3.selectAll("circle").on("click",del);

d3.selectAll('rect')
    .on('click', function(d, i) {
	if(this.getAttribute("style") == "stroke:black;stroke-width:5"){
	    d3.select(this).attr("style", "");
	    selection = ""
	}
	else{
	    if(selection != ""){
		d3.select(selection).attr("style", "");
	    }
	    selection = this;
	    d3.select(this).attr("style", "stroke:black;stroke-width:5");
	}
    }
       )
	
	

d3.select("#editText").on("input", function() {
    newText = this.value;
});

console.log(d3.select('#editConfirm'));
d3.select("#editConfirm").on("click", function(){
    d3.select("." + selection.getAttribute("class") + "-text")
	.text(newText)})
