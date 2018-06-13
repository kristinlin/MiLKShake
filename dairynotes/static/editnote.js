d3.selectAll('rect')
    .on('click', function(d, i) {
	selection = this;
	var modal_title = document.getElementById("modalTitle");
	var modal_body = document.getElementById("modal-body"); 
	//edit the modal
	var text = this.nextSibling.nextSibling.nextSibling;
	selected_thing = text;
	modal_title.innerText = text.childNodes[0].textContent;
	modal_body.innerText = text.childNodes[1].textContent;
	/*
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
	}*/
    }
    );

d3.select("#editText").on("input", function() {
    newText = this.value;
});

d3.select("#editConfirm").on("click", function(){
    d3.select("." + selection.getAttribute("class") + "-text")
	.text(newText)
    var note_id = selection.getAttribute("id")

    $.post("/editNote", {
	js_id: note_id, js_content: newText
    }).done(function() {
        window.location.replace(window.location.href);});
})
