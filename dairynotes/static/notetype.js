

//TOGGLING THE DIFF NOTE OPTIONS
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var NOTE = 0;
var CHECKBOX = 1;
var IMAGE = 2;

var tog1 = document.getElementById("tog1");
var tog2 = document.getElementById("tog2");

var reg = document.getElementById("typenote");
var checkbox = document.getElementById("checkbox_note");
var image = document.getElementById("image_note");

var opt_name = ["Checklist", "Image", "Note"];
var opt_val = [checkbox, image, reg];
var but_opt = [tog1, tog2];

var swap = function(arr, val1, val2) {
    var temp = arr[val1];
    arr[val1] = arr[val2];
    arr[val2] = temp;
};

var toggle = function(val) {
    console.log(val);
    //switch the hidden vals
    opt_val[val].hidden = false;
    opt_val[2].hidden = true;
    //set the button triggered to that option
    but_opt[val].textContent = opt_name[2];
    //swap
    swap(opt_name, val, 2);
    swap(opt_val, val, 2);
};

tog1.addEventListener("click", function(e) {toggle(0);});
tog2.addEventListener("click", function(e) {toggle(1);});




//ADDING MORE CHECKBOX ITEMS
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var items = document.getElementById("items");
var item = document.getElementById("item");
var add_item = document.getElementById("add_item");

var add = function() {
    var new_item = item.cloneNode(true);
    items.appendChild(new_item);
    new_item.children[0].checked = false;
    new_item.children[0].value = "unchecked";
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
    if (e.target.checked) {
	e.target.value = "checked";
    } else {
	e.target.value = "unchecked";
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
    item.children[0].value = "checked";
} else {
    item.children[0].value = "unchecked";
}
item.children[0].addEventListener("click", chval);
				  



//SELECTING NOTE COLOR
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var color_opt = {"Blue": "#274060",
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
