var addNoteButton = document.getElementById("addNote");
var svg = d3.select("svg");
var curContent = [];
var curTitles = [];
var curIDs = [];
var noteTexts = [];
var noteIDs = [];
var xcors = [];
var ycors = [0];
var svgHeight = 100;
var noteHeight = 200;
var noteWidth = 150;
var noteGapHoriz = 200;
var noteGapVert = 250;
var curNoteText = "nice";
var curNoteID = -1;
var allNotes = svg.append("notes")

//create array of notes from html
var getNotes = function(){
    noteContent = document.getElementById("notes").innerHTML;
    noteContent = noteContent.replace('[','');
    noteContent = noteContent.replace(']','');
    noteContent = noteContent.replace(/u'/g,'"');
    noteContent = noteContent.replace(/'/g,'"');
    noteContent = noteContent.replace(/None/g,'"None"');
    noteContent = noteContent.replace(/True/g,'"True"');
    noteContent = noteContent.replace(/False/g,'"False"');
    //console.log(noteContent);
    notes = JSON.parse(noteContent);
    //console.log(notes);
    for (note in notes){
	noteContent = notes[note]['content'];
	noteTitle = notes[note]['note_title'];
	noteID = notes[note]['note_id'];
	//console.log(noteID);
	curContent.push(noteContent);
	curTitles.push(noteTitle);
	curIDs.push(noteID);
	//console.log(curIDs);
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
	.attr("id", function(b, d){return "note" + d})
	.attr("class", "note");
}

//display the archive buttons
var displayButtons = function(){
    var buts = svg.selectAll("ellipse").data(noteIDs).enter();
    buts.append("ellipse")
	.attr("cx", function(b, d){return xcors[d%5] + 100})
	.attr("cy", function(){return ycors[ycors.length-1] + 180})
	.attr("rx", 40)
	.attr("ry", 10)
	.attr("fill", "pink")
	.attr("id", function(b){return b})
	.attr("class", "but");
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
var displayTexts = function(){
    var texts = svg.selectAll("title").data(curTitles).enter();
    texts.append("text")
	.attr("x", function(b, d){return xcors[d%5] + 1})
	.attr("y", function(){return ycors[ycors.length-1] + 15})
	.text(function(b) {return b})
	.attr("fill", "black")
	.attr("class", "title")}

//add a new note
var newNote = function(text,id){
    noteTexts.push(text);
    noteIDs.push(id);
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
    newNote(curNoteText,curNoteID);
    displayNotes();
    displayButtons();
    displayTexts();
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
	curNoteID = curIDs[text];
	addNote();
    }
    //getNotes();
}

var setColor = function(){
    d3.selectAll('rect').style('fill', function(b, d){return notes[d]["color"]});
}

var swapYellow = function(){
    d3.select(this).style("fill", "yellow");
}

var archive = function(){
    console.log(this);
    var id = this.getAttribute("id");
    console.log(id);
    $.post("/archiveNote", {
	javascript_data: id 
    }).done(function() {
        window.location.replace(window.location.href);});
}

getNotes();
initNotes();
setColor();

d3.selectAll("ellipse").on("click", archive);
