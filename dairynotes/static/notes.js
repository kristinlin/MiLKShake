var addNoteButton = document.getElementById("addNote");
var svg = d3.select("svg");
var curTexts = [];
var curTitles = [];
var noteTexts = [];
var xcors = [];
var ycors = [0];
var svgHeight = 100;
var noteHeight = 200;
var noteWidth = 150;
var noteGapHoriz = 200;
var noteGapVert = 250;
var curNoteText = "nice";
var notes = d3.select("svg").selectAll("rect").data(noteTexts).enter();
var texts = d3.select("svg").selectAll("text").data(noteTexts).enter();
var svgContainer = d3.select("svg")

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
	//console.log(notes[note]);
	//console.log(notes[note]['content']);
	noteContent = notes[note]['content'];
	noteTitle = notes[note]['title'];
	curTexts.push(noteContent);
	curTitles.push(noteTitle);
	console.log(curTitles);
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


//take array of texts and display on screen
var displayTexts = function(){
    var texts = svg.selectAll("text").data(noteTexts).enter();
    texts.append("text")
	.attr("x", function(b, d){return xcors[d%5] + 1})
	.attr("y", function(){return ycors[ycors.length-1] + 15})
	.text(function(b) {return b})
	.attr("fill", "black")
	.attr("class", "body")}

//add a new note
var newNote = function(text){
    noteTexts.push(text);
    if(xcors.length < 5){
	xcors.push(noteGapHoriz*xcors.length);
    }
    else{
	xcors = [0]
	ycors.push(noteGapVert*ycors.length);
	svgHeight += 500;
	svgContainer.style("height", svgHeight); 
    }
}

var addNote = function(){
    newNote(curNoteText);
    displayNotes();
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

var initNotes = function(){
    for (text in curTexts){
	curNoteText = curTexts[text];
	addNote();
    }
    getNotes();
}

var setColor = function(){
    d3.selectAll('rect').style('fill', function(b, d){return notes[d]["color"]});
}

var swapYellow = function(){
    d3.select(this).style("fill", "blue");
}

getNotes();
initNotes();

setColor();

//d3.selectAll("rect").on("mouseover", swapYellow);
