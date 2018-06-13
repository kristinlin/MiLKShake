var newText = "";
var selection;


d3.selectAll('rect')
    .on('click', function(d, i) {
	var modal_title = document.getElementById("modalTitle");
	var modal_body = document.getElementById("modal-body");
	var modal_id = document.getElementById("selection-id");
	//edit the modal
	var text = this.nextSibling.nextSibling.nextSibling;
	modal_title.innerHTML = text.childNodes[0].textContent;
	modal_body.value = text.childNodes[1].textContent;
	modal_id.value = this.getAttribute("noteID");
	console.log(modal_id.value);
    });


/*
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
*/
