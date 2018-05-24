var addNoteButton = document.getElementById("addNote");
var svg = document.getElementById("svg");
var curTexts = ["nice", "note", "bye"];
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


//take array of notes and display on screen
var displayNotes = function(){
    var notes = d3.select("svg").selectAll("rect").data(noteTexts).enter();
    notes.append("rect")
	.attr("x", function(b, d){return xcors[d%5]})
	.attr("y", function(){return ycors[ycors.length-1]})
	.attr("height", noteHeight)
	.attr("width", noteWidth)
	.attr("fill", "yellow")
}

//take array of texts and display on screen
var displayTexts = function(){
    var texts = d3.select("svg").selectAll("text").data(noteTexts).enter();
    texts.append("text")
	.attr("x", function(b, d){return xcors[d%5] + 1})
	.attr("y", function(){return ycors[ycors.length-1] + 15})
	.text(function(b) {return b})
	.attr("fill", "black")
}

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

var changeNoteColor = function(color){

}

var changeCurNoteText = function(newText){
    curNoteText = newText
}

var initNotes = function(){
    for (text in curTexts){
	curNoteText = curTexts[text];
	addNote();
    }
}

initNotes();

addNoteButton.addEventListener("click", addNote);
