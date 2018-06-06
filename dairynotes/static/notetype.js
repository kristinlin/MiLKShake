var NOTE = 0;
var CHECKBOX = 1;
var IMAGE = 2;

var tog1 = document.getElementById("tog1");
var tog2 = document.getElementById("tog2");

var reg = document.getElementById("typenote");
var checkbox = document.getElementById("checkbox_note");
var image = null;

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


var items = document.getElementById("items");
var item = document.getElementById("item");
var add_item = document.getElementById("add_item");

var add = function(e) {
    var new_item = item;
    items.appendChild(new_item);
}

add_item.addEventListener("click", add);


var color_opt = ["#274060", "#CC4933", "#F86624", "#E89005", "#5A9367", "#824C71"];
var color_select = document.getElementById("color");
var blueopt = document.getElementById("blueopt");
var redopt = document.getElementById("redopt");
var orgopt = document.getElementById("orgopt");
var greopt = document.getElementById("greopt");
var purpopt = document.getElementById("purpopt");
var yelopt = document.getElementById("yelopt");
var colors = [blueopt, redopt, orgopt, yelopt, greopt, purpopt];


var ch_color = function(val) {
    console.log(color_select);
    console.log(color_select.style.backgroundColor);
    color_select.style.backgroundColor = color_opt[val];
    console.log(color_select.style.backgroundColor);
};

colors[0].addEventListener("click",
			   function(e) {
			       console.log(0);
			       ch_color(0);
			   });
colors[1].addEventListener("click",
			   function(e) {
			       ch_color(1);
			   });
colors[2].addEventListener("click",
			   function(e) {
			       ch_color(2);
			   });
colors[3].addEventListener("click",
			   function(e) {
			       ch_color(3);
			   });
colors[4].addEventListener("click",
			   function(e) {
			       ch_color(4);
			   });
colors[5].addEventListener("click",
			   function(e) {
			       ch_color(5);
			   });
