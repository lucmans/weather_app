// "use strict";

// window.onerror = function(message, source, lineno, colno, error) {
//     // alert(message + ' - ' + lineno);
//     //console.log(message, source, lineno, colno, error);
//     try {
//         document.write("test");
//     }
//     catch(err) {}

//     try{
//         document.body.style.background = "#FFFFFF";
//         document.body.innerHTML = message + ' - ' + lineno;
//     }
//     catch(err) {}

//     return true;
// };


var canvas;
var context;

var ISFIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

var URL = 'https://api.buienradar.nl/data/public/2.0/jsonfeed';
var REQUEST_FREQUENCY = 30;  // seconds

var MOONICON = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyOC4xMzUgMzI4LjEzNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzI4LjEzNSAzMjguMTM1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMwMHB4IiBoZWlnaHQ9IjMwMHB4Ij48Zz48cGF0aCBkPSJNMzA0LjQxOCwyNDAuNzNjLTExLjExOCwyLjgxNS0yMi41MzMsNC4yMzUtMzMuOTA4LDQuMjM1Yy02Mi4yNDQsMC0xMTcuMTAzLTQxLjk5OS0xMzMuNDA4LTEwMi4xNDIgICBjLTEyLjY5OS00Ni44NzEtMC4zNDctOTUuOTU5LDMzLjA1My0xMzEuMzA3TDE4MS4wMzUsMGwtMTUuODI5LDAuNjgxYy0xMi4xOTIsMC41MjEtMjQuMjgxLDIuMzkxLTM1LjkyLDUuNTQgICBDNDIuMTI2LDI5Ljg2NS05LjU2NSwxMjAuMDAyLDE0LjA2LDIwNy4xNzVjMTkuMzA2LDcxLjIyMiw4NC4yNjksMTIwLjk1OSwxNTcuOTg0LDEyMC45NTljMTQuNDM1LDAsMjguODgyLTEuOTM0LDQyLjk0NC01Ljc0NiAgIGM0MC4yNjQtMTAuOTE5LDc0LjUyNi0zNi41MTEsOTYuNDczLTcyLjA1MWw4LjMzNi0xMy40OUwzMDQuNDE4LDI0MC43M3ogTTIxMS42MjEsMzA5Ljk5MiAgIGMtMTIuOTYzLDMuNTA5LTI2LjI3OSw1LjI4OS0zOS41NzYsNS4yODljLTY3LjkyNSwwLTEyNy43ODUtNDUuODM2LTE0NS41ODEtMTExLjQ3M0M0LjY5LDEyMy40NzksNTIuMzE5LDQwLjQxMiwxMzIuNjQ4LDE4LjY0NCAgIGM1Ljc5Ny0xLjU2OCwxMS43MTYtMi43OTYsMTcuNzA2LTMuNjYzYy0yOC41MTYsMzcuMjc2LTM4LjEyNCw4NS4yMi0yNS42NTYsMTMxLjIxN2MxNy44MTUsNjUuNzI3LDc3Ljc4NCwxMTEuNjI4LDE0NS44MTIsMTExLjYyOCAgIGM3LjA5NSwwLDE0LjE5Ny0wLjUwOCwyMS4yNDctMS41MUMyNzEuNjkyLDI4Mi40NTMsMjQzLjcyMywzMDEuMjc3LDIxMS42MjEsMzA5Ljk5MnogTTE3OC43OCw4My4wNDFsMzEuNTE3LTguOTUzbDkuNjQtMzEuMjk5ICAgbDguOTU5LDMxLjUwNGwzMS4zMTIsOS42NDdMMjI4LjY4NCw5Mi45bC05LjY0LDMxLjMwNWwtOC45NTMtMzEuNTA0TDE3OC43OCw4My4wNDF6IE0yNDcuMzIyLDEzNi45ODhsMjEuOTA5LTcuMTcybDUuOS0yMi4yNzUgICBsNy4xNzIsMjEuODk2bDIyLjI4Miw1LjkyNmwtMjEuOTAzLDcuMTZsLTUuOTE5LDIyLjI3NWwtNy4xNTktMjEuODk2TDI0Ny4zMjIsMTM2Ljk4OHoiIGZpbGw9IiNiM2IzYjMiLz48L2c+PC9zdmc+';
// var HELPICON = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBjbGFzcz0iIj48Zz48c2NyaXB0IHhtbG5zPSIiIGNsYXNzPSJhY3RpdmUtcGF0aCI+PC9zY3JpcHQ+PGc+Cgk8Zz4KCQk8Zz4KCQkJPGNpcmNsZSBjeD0iMjU2IiBjeT0iMzc4LjUiIHI9IjI1IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiPjwvY2lyY2xlPgoJCQk8cGF0aCBkPSJNMjU2LDBDMTE0LjUxNiwwLDAsMTE0LjQ5NywwLDI1NmMwLDE0MS40ODQsMTE0LjQ5NywyNTYsMjU2LDI1NmMxNDEuNDg0LDAsMjU2LTExNC40OTcsMjU2LTI1NiAgICAgQzUxMiwxMTQuNTE2LDM5Ny41MDMsMCwyNTYsMHogTTI1Niw0NzJjLTExOS4zNzcsMC0yMTYtOTYuNjA3LTIxNi0yMTZjMC0xMTkuMzc3LDk2LjYwNy0yMTYsMjE2LTIxNiAgICAgYzExOS4zNzcsMCwyMTYsOTYuNjA3LDIxNiwyMTZDNDcyLDM3NS4zNzcsMzc1LjM5Myw0NzIsMjU2LDQ3MnoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCI+PC9wYXRoPgoJCQk8cGF0aCBkPSJNMjU2LDEyOC41Yy00NC4xMTIsMC04MCwzNS44ODgtODAsODBjMCwxMS4wNDYsOC45NTQsMjAsMjAsMjBzMjAtOC45NTQsMjAtMjBjMC0yMi4wNTYsMTcuOTQ0LTQwLDQwLTQwICAgICBjMjIuMDU2LDAsNDAsMTcuOTQ0LDQwLDQwYzAsMjIuMDU2LTE3Ljk0NCw0MC00MCw0MGMtMTEuMDQ2LDAtMjAsOC45NTQtMjAsMjB2NTBjMCwxMS4wNDYsOC45NTQsMjAsMjAsMjAgICAgIGMxMS4wNDYsMCwyMC04Ljk1NCwyMC0yMHYtMzIuNTMxYzM0LjQ2Ni04LjkwMyw2MC00MC4yNiw2MC03Ny40NjlDMzM2LDE2NC4zODgsMzAwLjExMiwxMjguNSwyNTYsMTI4LjV6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiPjwvcGF0aD4KCQk8L2c+Cgk8L2c+CjwvZz48L2c+IDwvc3ZnPg==';
var HELPICON = 'data:image/svg+xml;base64,';

var LOCATIONS;
var CURRENTSTATION = 'Voorschoten';
// Ruud
//LOCATIONS = new Array('Arnhem', 'Den Helder', 'Groningen', 'Hoek van Holland', 'Maastricht', 'Rotterdam', 'Schiphol', 'Vlissingen', 'Voorschoten');
// Danielle
//LOCATIONS = new Array('Voorschoten', 'Rotterdam', 'Hoogeveen', 'Leeuwarden');
// Luc
LOCATIONS = new Array('Arnhem', 'Den Helder', 'Groningen', 'Hoek van Holland', 'Maastricht', 'Rotterdam', 'Schiphol', 'Voorschoten');

var PREVMEASUREMENT = null;

var WEEKDAYS = new Array('zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag');
var MONTHS = new Array('januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december');
var DIRECTIONS = new Array('N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW');

var PAGEWIDTH;
var PAGEHEIGHT;

var NIGHTMODE = true;
var COLORDAYTEXT = '#000000';
var COLORDAYBG = '#FFFFFF';
var COLORDAYGREY = '#999999';
var COLORNIGHTTEXT = '#999999';
var COLORNIGHTBG = '#0D0D0D';
var COLORNIGHTGREY = '#505050';

var COLOR = COLORNIGHTTEXT;

var BLINKALPHA = 0.3;
var BLINKON = 1500;  // milliseconds
var BLINKOFF = 500;  // milliseconds

var CURVESTRENTH = 0.1;
var LINEWIDTH = 0.0045;

var STATICTEXTSIZE = 0.0275;
var MOSTTEXTSIZE = 0.15;
var TEMPTEXTSIZE = 0.2;
var TIMETEXTSIZE = 0.13;
var DATETEXTSIZE = 0.06;
var TEXTFIX = (ISFIREFOX ? 0.0155 : 0.0);
//var TEXTFIX = 0.0;

//var ENABLEBLINK = (ISFIREFOX ? false : true);
var ENABLEBLINK = true;
var TIMEREFRESH = 500;  // Is time refresh speed (milliseconds)

var MAXMEASUREAGE = 40;  // Text becomes grey after MAXMEASUREAGE minutes

// Percentage definitions
// Box = {x1, y1, x2, y2, fontsize}
var TEMPBOX = new Array(0.05, 0.075, 0.32, 0.35, TEMPTEXTSIZE);  // Temperature
var TIMEBOX = new Array(0.675, 0.075, 0.9, 0.225, TIMETEXTSIZE);
var DATEBOX = new Array(0.41, 0.238, 0.9, 0.298, DATETEXTSIZE);
var HUMIDBOX = new Array(0.05, 0.43, 0.183, 0.62, MOSTTEXTSIZE);
var RAIN1BOX = new Array(0.705, 0.43, 0.9, 0.62, MOSTTEXTSIZE);
var RAIN24BOX = new Array(0.47, 0.43, 0.665, 0.62, MOSTTEXTSIZE);
var PRESBOX = new Array(0.05, 0.71, 0.278, 0.9, MOSTTEXTSIZE);
var WINDBBOX = new Array(0.38, 0.71, 0.515, 0.9, MOSTTEXTSIZE);  // Wind in Beaufort
var WINDDBOX = new Array(0.555, 0.71, 0.725, 0.9, MOSTTEXTSIZE);  // Wind direction
var WINDVBOX = new Array(0.765, 0.71, 0.9, 0.9, MOSTTEXTSIZE);  // Wind velocity
var BOXES = new Array(TIMEBOX, DATEBOX, TEMPBOX, HUMIDBOX, RAIN1BOX, RAIN24BOX, PRESBOX, WINDBBOX, WINDDBOX, WINDVBOX);

// Text = {text, x ,y}
var TEMPTEXT = new Array('out °C', TEMPBOX[2] + 0.005, TEMPBOX[1] + ((TEMPBOX[3] - TEMPBOX[1]) * 0.8));
var HUMIDTEXT = new Array('%', HUMIDBOX[2] + 0.005, HUMIDBOX[1] + ((HUMIDBOX[3] - HUMIDBOX[1]) * 0.8));
var PRESTEXT = new Array('mbar', PRESBOX[2] + 0.005, PRESBOX[1] + ((PRESBOX[3] - PRESBOX[1]) * 0.8));
var RAIN1TEXT = new Array('1h', RAIN1BOX[2] + 0.005, RAIN1BOX[1] + ((RAIN1BOX[3] - RAIN1BOX[1]) * 0.8));
var RAIN24TEXT = new Array('24h', RAIN24BOX[2] + 0.005, RAIN24BOX[1] + ((RAIN24BOX[3] - RAIN24BOX[1]) * 0.8));
var WINDBTEXT = new Array('bft', WINDBBOX[2] + 0.005, WINDBBOX[1] + ((WINDBBOX[3] - WINDBBOX[1]) * 0.8));
var WINDVTEXT = new Array('km/h', WINDVBOX[2] + 0.005, WINDVBOX[1] + ((WINDVBOX[3] - WINDVBOX[1]) * 0.8));
var TEXTS = new Array(TEMPTEXT, HUMIDTEXT, PRESTEXT, RAIN1TEXT, RAIN24TEXT, WINDBTEXT, WINDVTEXT);

var RAINTEXT = new Array('mm', RAIN24BOX[0] - 0.005, RAIN24BOX[1] + ((RAIN24BOX[3] - RAIN24BOX[1]) * 0.8));
var UPDATEDTEXT = new Array('', TEMPBOX[0] + ((TEMPBOX[2] - TEMPBOX[0]) * 0.95), TEMPBOX[3] + 0.02);
var LOCATIONTEXT = new Array('', TEMPBOX[0] + 0.01, TEMPBOX[3] + 0.02);

// ICON = {x, y, w, h}
var ICON = new Array(0.335, 0.09, 0.065, 0.065);
var MOONSIZE = 0.75;

var HELP = new Array(0.21, 0.455, 0.148, 0.148);
//var HELP2 = new Array(0.415, 0.09, 0.148, 0.148);


//var IMAGECACHE = {'a': null, 'aa': null, 'b': null, 'bb': null, 'c': null, 'cc': null, 'd': null, 'dd': null, 'f': null, 'ff': null, 'g': null, 'gg': null, 'j': null, 'jj': null, 'm': null, 'mm': null, 'n': null, 'nn': null, 'q': null, 'qq': null, 's': null, 'ss': null, 't': null, 'tt': null, 'u': null, 'uu': null, 'v': null, 'vv': null, 'w': null, 'ww': null};


// Calculates the sizes of all elements
function calculateSizes() {
    PAGEWIDTH = document.body.clientWidth;
    PAGEHEIGHT = document.body.clientHeight;

    // Set canvas size
    canvas.width = PAGEWIDTH;
    canvas.height = PAGEHEIGHT;

    // Percentage to pixels
    for(var i = 0; i < BOXES.length; i++) {
        BOXES[i][0] = Math.floor(BOXES[i][0] * PAGEWIDTH);
        BOXES[i][1] = Math.floor(BOXES[i][1] * PAGEHEIGHT);
        BOXES[i][2] = Math.floor(BOXES[i][2] * PAGEWIDTH);
        BOXES[i][3] = Math.floor(BOXES[i][3] * PAGEHEIGHT);
        BOXES[i][4] = Math.floor(BOXES[i][4] * PAGEHEIGHT);
    }

    for(var i = 0; i < TEXTS.length; i++) {
        TEXTS[i][1] = Math.floor(TEXTS[i][1] * PAGEWIDTH);
        TEXTS[i][2] = Math.floor(TEXTS[i][2] * PAGEHEIGHT);
    }

    RAINTEXT[1] = Math.floor(RAINTEXT[1] * PAGEWIDTH);
    RAINTEXT[2] = Math.floor(RAINTEXT[2] * PAGEHEIGHT);

    UPDATEDTEXT[1] = Math.floor(UPDATEDTEXT[1] * PAGEWIDTH);
    UPDATEDTEXT[2] = Math.floor(UPDATEDTEXT[2] * PAGEHEIGHT);

    LOCATIONTEXT[1] = Math.floor(LOCATIONTEXT[1] * PAGEWIDTH);
    LOCATIONTEXT[2] = Math.floor(LOCATIONTEXT[2] * PAGEHEIGHT);

    ICON[0] = Math.floor(ICON[0] * PAGEWIDTH);
    ICON[1] = Math.floor(ICON[1] * PAGEHEIGHT);
    ICON[2] = Math.floor(ICON[2] * PAGEWIDTH);
    ICON[3] = Math.floor(ICON[3] * PAGEWIDTH);

    HELP[0] = Math.floor(HELP[0] * PAGEWIDTH);
    HELP[1] = Math.floor(HELP[1] * PAGEHEIGHT);
    HELP[2] = Math.floor(HELP[2] * PAGEHEIGHT);
    HELP[3] = Math.floor(HELP[3] * PAGEHEIGHT);
//    HELP2[0] = Math.floor(HELP2[0] * PAGEWIDTH);
//    HELP2[1] = Math.floor(HELP2[1] * PAGEHEIGHT);
//    HELP2[2] = Math.floor(HELP2[2] * PAGEHEIGHT);
//    HELP2[3] = Math.floor(HELP2[3] * PAGEHEIGHT);

    STATICTEXTSIZE = Math.floor(STATICTEXTSIZE * PAGEHEIGHT);
    LINEWIDTH = Math.max(Math.floor(LINEWIDTH * PAGEHEIGHT), 1);

    TEXTFIX = Math.floor(TEXTFIX * PAGEHEIGHT);
} //calculateSizes


// Draw a box
function drawBox(box) {
    var width = box[2] - box[0];
    var height = box[3] - box[1];
    var curve = Math.floor(CURVESTRENTH * Math.min(width, height));

    context.beginPath();
    context.moveTo(box[0] + curve, box[1]);
    context.arcTo(box[2], box[1], box[2], box[3] - curve, curve);
    context.arcTo(box[2], box[3], box[0] + curve, box[3], curve);
    context.arcTo(box[0], box[3], box[0], box[1] + curve, curve);
    context.arcTo(box[0], box[1], box[2] - curve, box[1], curve);
    context.closePath();
    context.stroke();
} //drawBox

// Draws constant elements (boxes and static text)
function drawOverlay() {
    context.fillStyle = COLOR;
    context.strokeStyle = (NIGHTMODE ? COLORNIGHTTEXT : COLORDAYTEXT);
    context.lineWidth = LINEWIDTH;

    // i = 2, so the time and date box are skipped
    for(var i = 2; i < BOXES.length; i++)
        drawBox(BOXES[i]);

    context.font = STATICTEXTSIZE + 'px sans-serif';
    context.textAlign = 'left';
    context.textBaseline = 'middle';

    for(var i = 0; i < TEXTS.length; i++)
        context.fillText(TEXTS[i][0], TEXTS[i][1], TEXTS[i][2]);

    context.textAlign = 'right';
    context.fillText(RAINTEXT[0], RAINTEXT[1], RAINTEXT[2]);

    // TODO: Get better icon
    var image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = function() {
        context.clearRect(HELP[0], HELP[1], HELP[2], HELP[3]);
        context.drawImage(image, HELP[0], HELP[1], HELP[2], HELP[3]);
    }
    image.src = HELPICON;

//    var image2 = new Image();
//    image2.crossOrigin = "Anonymous";
//    image2.onload = function() {
//      context.clearRect(HELP2[0], HELP2[1], HELP2[2], HELP2[3]);
//      context.drawImage(image2, HELP2[0], HELP2[1], HELP2[2], HELP2[3]);
//    }
//    image2.src = HELPICON;
} //drawOverlay


function getWindDirChars(angle) {
    return DIRECTIONS[Math.floor(((angle + 22.5) % 360) / 45)];
}

// Draws the given value in a given box
function drawValueInBox(value, box) {
    context.font = box[4] + 'px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.fillText(value, box[0] + ((box[2] - box[0]) / 2), box[1] + ((box[3] - box[1]) / 2) + TEXTFIX);
} //drawValueInBox

function cropImage(image) {
    // var cv = new OffscreenCanvas(300, 300);
    var cv = document.createElement('canvas');
    var ct = cv.getContext('2d');
    cv.width = 300;
    cv.height = 300;
    ct.drawImage(image, 0, 0);
    var imgData = ct.getImageData(0, 0, 300, 300);
    var data = imgData.data;

    var sx = -1, sy = -1, sw, sh;
    for(var i = 0; i < 300; i++) {
        var columnClear = true;
        var rowClear = true;

        for(var j = 0; j < 300; j++) {
            if(data[(((j * 300) + i) * 4) + 3] != 0)
                columnClear = false;

            if(data[(((i * 300) + j) * 4) + 3] != 0)
                rowClear = false;

            if(!columnClear && !rowClear)
                break;
        }

        if(!columnClear && sx == -1)
            sx = i - 1;

        if(!rowClear && sy == -1)
            sy = i - 1;

        if(!columnClear)
            sw = i + 1;

        if(!rowClear)
            sh = i + 1;
    }

    return [sx, sy, sw - sx, sh - sy];
} //cropImage

function antiAlias(image) {
    
} //antiAlias

function drawWeatherIcon(m, alpha) {
    // Check if image is in cache and use it if so
    var spliced = m.iconurl.split('/');
    var imgName = spliced[spliced.length - 1].split('.')[0];
    // if(IMAGECACHE[imgName] == null) {
    //     var image = new Image();
    //     image.crossOrigin = "Anonymous";
    //     image.onload = function() {
    //         var imgDims = cropImage(image);
    //     }

    //     // Put imageData in cache
    // }
    
    var image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = function() {
        var imgDims = cropImage(image);
        context.globalAlpha = alpha;
        context.clearRect(ICON[0], ICON[1], ICON[2], ICON[3]);
        if(imgName == 'aa')// || CURRENTSTATION.localeCompare('Schiphol') == 0)
            context.drawImage(image, ICON[0], ICON[1], ICON[2] * MOONSIZE, ICON[3] * (MOONSIZE + 0.05));
        else
            context.drawImage(image, imgDims[0], imgDims[1], imgDims[2], imgDims[3], ICON[0], ICON[1], ICON[2], ICON[3] * (imgDims[3] / imgDims[2]));
        // antiAlias(image);
        context.globalAlpha = 1;
    }

    // image.src = "https://www.buienradar.nl/resources/images/icons/weather/300x300/aa.png"
    if(imgName == 'aa')// || CURRENTSTATION.localeCompare('Schiphol') == 0)
        image.src = MOONICON;
    else
        image.src = m.iconurl.replace(/30/g, 300);
} //drawWeatherIcon

// Draws variable elements (values in boxes)
function drawValues(m) {
    if(m.temperature != null)
        drawValueInBox(m.temperature.toFixed(1), TEMPBOX);
    if(m.humidity != null)
        drawValueInBox(m.humidity, HUMIDBOX);
    if(m.rainFallLastHour != null)
        drawValueInBox(m.rainFallLastHour.toFixed(1), RAIN1BOX);
    if(m.rainFallLast24Hour != null)
        drawValueInBox(m.rainFallLast24Hour.toFixed(1), RAIN24BOX);
    if(m.airpressure != null)
        drawValueInBox(m.airpressure.toFixed(0), PRESBOX);
    if(m.windspeedBft != null)
        drawValueInBox(m.windspeedBft, WINDBBOX);
    if(m.winddirection != null)
        drawValueInBox(getWindDirChars(m.winddirectiondegrees), WINDDBOX);
    if(m.windspeed != null)
        drawValueInBox((m.windspeed * 3.6).toFixed(0), WINDVBOX);

    // Weater icon
    drawWeatherIcon(m, 1);

    // Weather location
    LOCATIONTEXT[0] = m.stationname.split('Meetstation ')[1];
    context.textAlign = 'left';
    context.font = 'bold ' + STATICTEXTSIZE + 'px sans-serif';
    context.fillText(LOCATIONTEXT[0], LOCATIONTEXT[1], LOCATIONTEXT[2]);

    // updated xx:xx
    var dateTime = new Date(m.timestamp)
    UPDATEDTEXT[0] = 'updated ' + (dateTime.getHours() < 10 ? '0' : '') + dateTime.getHours() + ':' + (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes();
    context.textAlign = 'right';
    context.font = STATICTEXTSIZE + 'px sans-serif';
    context.fillText(UPDATEDTEXT[0], UPDATEDTEXT[1], UPDATEDTEXT[2]);
} //drawValues


function nextStation() {
    if(PREVMEASUREMENT == null)
        return;

    for(var i = 0; i < PREVMEASUREMENT.actual.stationmeasurements.length; i++) {
        if(CURRENTSTATION == PREVMEASUREMENT.actual.stationmeasurements[i].stationname.split('Meetstation ')[1]) {
            var j = (LOCATIONS.indexOf(PREVMEASUREMENT.actual.stationmeasurements[i].stationname.split('Meetstation ')[1]) + 1) % LOCATIONS.length;
            CURRENTSTATION = LOCATIONS[j];
            return;
        }
    }
} //nextStation

function prevStation() {
    if(PREVMEASUREMENT == null)
        return;

    for(var i = 0; i < PREVMEASUREMENT.actual.stationmeasurements.length; i++) {
        if(CURRENTSTATION == PREVMEASUREMENT.actual.stationmeasurements[i].stationname.split('Meetstation ')[1]) {
            var j = (LOCATIONS.indexOf(PREVMEASUREMENT.actual.stationmeasurements[i].stationname.split('Meetstation ')[1]) - 1);
            if(j < 0)
                j = LOCATIONS.length - 1;

            CURRENTSTATION = LOCATIONS[j];
            return;
        }
    }
} //prevStation

function findStationNr(stations) {
    for(var i = 0; i < stations.length; i++)
        if(CURRENTSTATION == stations[i].stationname.split('Meetstation ')[1])
            return i;
} //findStationNr


var BLINKID = -1;
function handleMeasurement(measurement) {
    // Happens at midnight
    if(measurement.actual.stationmeasurements.length < 3)
        return;

    PREVMEASUREMENT = measurement;

    // context.clearRect(0, 0, PAGEWIDTH, PAGEHEIGHT);
    context.clearRect(0, 0, ICON[0] + ICON[2], PAGEHEIGHT);
    context.clearRect(0, RAIN1BOX[1] - 5, PAGEWIDTH, PAGEHEIGHT);
    // updateDateTime(false);

    drawOverlay();
    drawValues(measurement.actual.stationmeasurements[findStationNr(measurement.actual.stationmeasurements)]);


    var measureDate = new Date(measurement.actual.stationmeasurements[findStationNr(measurement.actual.stationmeasurements)].timestamp);  // new Date("2018-06-29T11:10:00");
    var now = new Date();
    if((now.getTime() - measureDate.getTime()) / 1000 / 60 >= MAXMEASUREAGE) {
        if(BLINKID == -1) {
            blinkIcon();
            BLINKID = setInterval(blinkIcon, BLINKON + BLINKOFF);
        }
    }
    else {
        clearInterval(BLINKID);
        BLINKID = -1;
    }
} //handleMeasurement


function blinkIcon() {
    context.clearRect(ICON[0], ICON[1], ICON[2], ICON[3]);
    drawWeatherIcon(PREVMEASUREMENT.actual.stationmeasurements[findStationNr(PREVMEASUREMENT.actual.stationmeasurements)], BLINKALPHA);

    setTimeout(drawWeatherIcon, BLINKOFF, PREVMEASUREMENT.actual.stationmeasurements[findStationNr(PREVMEASUREMENT.actual.stationmeasurements)], 1);
} //blinkIcon

// Requests current weather from URL as JSON
function getMeasurements() {
    // If last measurement is old
    if(PREVMEASUREMENT != null) {
        var prevDate = new Date(PREVMEASUREMENT.actual.stationmeasurements[findStationNr(PREVMEASUREMENT.actual.stationmeasurements)].timestamp);  // new Date("2018-06-29T11:10:00");

        var now = new Date();
        if((now.getTime() - prevDate.getTime()) / 1000 / 60 >= MAXMEASUREAGE) {
            if(BLINKID == -1) {
                blinkIcon();
                BLINKID = setInterval(blinkIcon, BLINKON + BLINKOFF);
            }
        }
        else {
            clearInterval(BLINKID);
            BLINKID = -1;
        }
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
            handleMeasurement(JSON.parse(this.responseText));
    };

    request.open('GET', URL);
    request.send();
} //getMeasurements


function updateDateTime() {
    context.clearRect(TIMEBOX[0], TIMEBOX[1], TIMEBOX[2] - TIMEBOX[0], TIMEBOX[3] - TIMEBOX[1]);
    context.clearRect(DATEBOX[0], DATEBOX[1], DATEBOX[2] - DATEBOX[0], DATEBOX[3] - DATEBOX[1] + 10);

    var colon = ':';
    if(ENABLEBLINK) {
        // if(blink)
            this.BLINK = !this.BLINK;

        if(this.BLINK)
            colon = ' ';

        // var milli = new Date().getMilliseconds();
        // if(milli % 1000 < 500)
        //     colon = ':';
        // else
        //     colon = ' ';
    }

    context.fillStyle = (NIGHTMODE ? COLORNIGHTTEXT : COLORDAYTEXT);
    // var dateTime = new Date("2018-09-19T23:40:00");  // TEST: Remove this test string
    var dateTime = new Date();
    var time1 = '' + (dateTime.getHours() < 10 ? '0' : '') + dateTime.getHours();// + colon + (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes();
    var time2 = '' + colon + (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes();
    var date = '' + WEEKDAYS[dateTime.getDay()] + ' ' + dateTime.getDate() + ' ' + MONTHS[dateTime.getMonth()] + ' ' + dateTime.getFullYear();

    context.textBaseline = 'middle';
    context.textAlign = 'right';
    context.font = TIMEBOX[4] + 'px sans-serif';
    context.fillText(time1, TIMEBOX[2] - context.measureText(':' + (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes()).width, TIMEBOX[1] + ((TIMEBOX[3] - TIMEBOX[1]) / 2) + TEXTFIX);
                                 //  - 0.015 * PAGEWIDTH for offset to left
    context.fillText(time2, TIMEBOX[2], TIMEBOX[1] + ((TIMEBOX[3] - TIMEBOX[1]) / 2) + TEXTFIX);

    context.font = DATEBOX[4] + 'px sans-serif';
    context.fillText(date, DATEBOX[2], DATEBOX[1] + ((DATEBOX[3] - DATEBOX[1]) / 2) + TEXTFIX);

    context.fillStyle = COLOR;
} //updateDateTime
updateDateTime.BLINK = true;


function toggleDayNightMode() {
    if(NIGHTMODE) {
        NIGHTMODE = false;
        COLOR = COLORDAYTEXT;
        document.body.style.background = COLORDAYBG;
    }
    else {
        NIGHTMODE = true;
        COLOR = COLORNIGHTTEXT;
        document.body.style.background = COLORNIGHTBG;
    }
} //toggleDayNightMode

function touchedIn(x, y, box) {
    return x > box[0] && x < box[2] && y > box[1] && y < box[3];
} //touchedIn

function touchListener(e) {
    handleInput(e.touches[0].clientX, e.touches[0].clientY);
} //touchListener

function mouseListener(e) {
    handleInput(e.clientX, e.clientY);
} //mouseListener


function clickGraph() {
    document.getElementById('graph').innerHTML = '';
    document.body.removeEventListener('click', clickGraph, true);
}

function showGraph() {
    document.getElementById('graph').innerHTML = '<IFRAME SRC="https://gadgets.buienradar.nl/gadget/forecastandstation/' + PREVMEASUREMENT.actual.stationmeasurements[findStationNr(PREVMEASUREMENT.actual.stationmeasurements)].stationid + '" NORESIZE SCROLLING=NO HSPACE=0 VSPACE=0 FRAMEBORDER=0 MARGINHEIGHT=0 MARGINWIDTH=0 WIDTH=300 HEIGHT=190 style="pointer-events: none; position: absolute; left:50%; top:50%; text-align:center; width:300px; height:190px; margin-left:-150px; margin-top:-95px"></IFRAME> <br style="content: \' \';display: block;margin: 100vh 0;">';
    document.body.addEventListener('click', clickGraph, true);
}


function handleInput(x, y) {
    if(touchedIn(x, y, WINDBBOX) || touchedIn(x, y, PRESBOX))
        prevStation();
    else if(touchedIn(x, y, WINDVBOX))
        nextStation();
    else if(touchedIn(x, y, RAIN24BOX))
        toggleDayNightMode();
    else if(touchedIn(x, y, RAIN1BOX))
        showGraph();
    else if(touchedIn(x, y, TEMPBOX)) {
        getMeasurements();
        return;
    }
    else if(x > HELP[0] && x < HELP[0] + HELP[2] && y > HELP[1] && y < HELP[1] + HELP[3]) {
        console.log("Werkt!");
    }

    handleMeasurement(PREVMEASUREMENT);
} //handleInput


// Automatic resize
//window.onresize = function(e) {
function resize() {
//    window.location.reload(true);
    window.location.replace(window.location.pathname);
}


// Main
window.onload = function() {
    document.body.style.background = COLORNIGHTBG;
    window.addEventListener('resize', resize, true);

    // Set main canvas
    canvas = document.getElementById('screen');
    context = canvas.getContext('2d');
    canvas.addEventListener('click', mouseListener);
    calculateSizes();

    updateDateTime();
    drawOverlay();
    getMeasurements();

    setInterval(getMeasurements, 1000 * REQUEST_FREQUENCY);
    setInterval(updateDateTime, TIMEREFRESH);
} //main
