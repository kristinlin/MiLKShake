

//TOGGLING THE DIFF NOTE OPTIONS
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var NOTE = 0;
var CHECKBOX = 1;
var IMAGE = 2;

var tog1 = document.getElementById("tog1");

var reg = document.getElementById("typenote");
var checkbox = document.getElementById("checkbox_note");

var note = true;

var toggle = function() {
    //switch the hidden vals
    reg.hidden= !reg.hidden;
    checkbox.hidden = !checkbox.hidden;
    //set the button triggered to that option
    if (note) {
	tog1.textContent = "checkbox";
    } else {
	tog1.textContent ="note";
    }
    note = !note;
};

tog1.addEventListener("click", toggle);




//ADDING MORE CHECKBOX ITEMS
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var items = document.getElementById("items");
var item = document.getElementById("item");
var add_item = document.getElementById("add_item");

var add = function() {
    var new_item = item.cloneNode(true);
    items.appendChild(new_item);
    new_item.children[0].checked = false;
    new_item.children[0].addEventListener("click", chval);
    new_item.children[1].value = "";
    new_item.children[1].addEventListener("keydown",
			      function(e) {
				  var code = e.keyCode;
				  if (code == '9') {
				      add();
				  }
			      });
};

var chval = function(e) {
    console.log(e.target.nextElementSibling.value);
    if (e.target.checked) {
	e.target.value = e.target.nextElementSibling.value;
    }
}

add_item.addEventListener("click", add);
item.children[1].addEventListener("keydown",
		      function(e) {
			  var code = e.keyCode || e.which;
			  if (code == '9') {
			      add();
			  }
		      });
if (item.children[0].checked) {
    item.children[0].value = item.children[1].value;
}
item.children[0].addEventListener("click", chval);
				  



//SELECTING NOTE COLOR
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var color_opt = {"Blue": "#3e76d1",
		 "Red": "#CC4933",
		 "Orange": "#F86624",
		 "Yellow": "#E89005",
		 "Green" : "#5A9367",
		 "Purple" : "#824C71"};
var color_select = document.getElementById("color");
var blueopt = document.getElementById("blueopt");
var redopt = document.getElementById("redopt");
var orgopt = document.getElementById("orgopt");
var greopt = document.getElementById("greopt");
var purpopt = document.getElementById("purpopt");
var yelopt = document.getElementById("yelopt");
var colors = [blueopt, redopt, orgopt, yelopt, greopt, purpopt];


var ch_color = function(thing) {
    color_select.style.backgroundColor = color_opt[String(thing.value)];
};
