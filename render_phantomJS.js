//script to render html files of average travel time (include traffic) for diff days and hours
//need PhantomJS!!!

var page = require('webpage').create();
var fs = require('fs');

const baseUrl = 'https://www.google.pl/maps/dir/49.9635763,20.5998749/49.6404161,20.6929602/@49.7983342,20.5582678,11z/data=!4m5!4m4!2m2!7e2!8j';

/*sample of URL (base + Unix Time + ends) 
https://www.google.pl/maps/dir/49.9635763,20.5998749/49.6404161,20.6929602/@49.7983342,20.5582678,11z/data=!4m6!4m5!2m3!6e0!7e2!8j1451606400!3e0?hl=pl
eg:
https://www.google.pl/maps/dir/49.9635763,20.5998749/49.6404161,20.6929602/@49.7983342,20.5582678,11z/data=!4m6!4m5!2m3!6e0!7e2!8j
1451606400
!3e0?hl=pl */



//check Unixt time in google maps 
var start_time = 1451602800;
const end_time = 1452211200;

// 3600 1 hour
//604800 1 week
const step_time = 3600;


const delay = 1000; // delay in ms 

time = start_time.toString()

var arr = [];
var current;

//loop for save time for array
for (start_time; start_time <= end_time; start_time = start_time + step_time) {
    arr.push(start_time.toString());
};

//render a page
function callback(status) {
    var fileName = start_time.toString() + ".html";
    if (status === "success") {
        console.log("Sucess");
        setTimeout(function(){
            fs.write(current + ".txt", page.plainText, 'w');  //page.plainText is essentail
        },1000);
    }
    else {
        console.log("Fail, status:" + status);
        
    }
    setTimeout(load, delay);
}

//load a page
function load() {
    var url = arr.shift();
    if (!!url) {
        console.log("Downloading:" + url);
        current = url;
        setTimeout(function(){
            page.open(baseUrl + url + '!3e0?hl=pl', callback);
        },1000);       
    }
    else {
        console.log("Finished");
        phantom.exit();
    }
}

load();