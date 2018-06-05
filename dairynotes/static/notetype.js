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
