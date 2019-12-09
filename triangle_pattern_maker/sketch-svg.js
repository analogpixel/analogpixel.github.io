var grid = new Array();

var theight=20;
var width=1600;
var height=800;
var psize=6;

var C2="#FFFFFF";
var C1="#000000";

var snap = Snap(width,height);
snap.attr({id: "svgout"});



function rotate_point(cx,cy, px,py, angle) 
{
  s = Math.sin(angle);
  c = Math.cos(angle);

  // translate point back to origin:
  px -= cx;
  py -= cy;

  // rotate point
  xnew = px * c - py * s;
  ynew = px * s + py * c;

  // translate point back:
  px = xnew + cx;
  py = ynew + cy;
  return [px,py];
}

function tri(x,y,h,r) {

  // length of one side
  s = (2 / Math.sqrt(3)) * h;
  
  x1 = x;
  y1 = y - (h/2);
  x2 = x - (s/2);
  y2 = y + (h/2);
  x3 = x + (s/2);
  y3 = y + (h/2);

  if (r > 0) {
    [x1,y1] = rotate_point(x,y, x1,y1, r);
    [x2,y2] = rotate_point(x,y, x2,y2, r);
    [x3,y3] = rotate_point(x,y, x3,y3, r);
  } 

  return snap.polygon(x1,y1,x2,y2,x3,y3);
}

function radians(d) {
  return d * (Math.PI / 180);
}

function createGrid() {
  var i = 0;
  var j =0;
  // The length of one side
  var sideL = (2/Math.sqrt(3)) * theight;
  offset=0;
  for (var y=0; y < height; y +=theight) {
    offset++;
    if (i >= psize) { i =0; }
    j = 0;
    for (var x=0; x < width; x += sideL) {
      if (j >=  psize) { j = 0;}
      grid.push( tri( (offset % 2 == 0 ? 0 : sideL /2) + x,y, theight, 0).attr( {gridpos: ".grid" + j + "_" + i + "_0", fill: C2}  ).hover(c1,c2).click(c3).addClass("grid" + j + "_" + i + "_0").addClass("nonselected"));
      grid.push( tri( (offset % 2 == 0 ? 0 : sideL /2) + x + sideL/ 2  ,y, theight, radians(180)).attr( {gridpos: ".grid" + j + "_" + i + "_1", fill: C2}  ).hover(c1,c2).click(c3).addClass("grid" + j + "_" + i + "_1").addClass("nonselected"));
      j++;
    }
    i++;
  }
}

function saveSvgFile(svgEl, linkLabel) {

    // get the xml/svg from the element
    xmlDoc = $.parseXML(  svgEl.outerHTML );
    // convert it to a jquery object
    // $xml = $( xmlDoc );
    $(xmlDoc).find(".nonselected").remove();
    var markup = new XMLSerializer().serializeToString( xmlDoc.lastChild )

    svgEl.setAttribute('version', '1.1');
    svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    // var markup = svgEl.outerHTML;
    var b64 = btoa(markup);
    var aEl = document.createElement('a');
    aEl.setAttribute('download', linkLabel + '.svg');
    aEl.href = 'data:image/svg+xml;base64,\n' + b64;
    document.body.appendChild(aEl);
    aEl.click();
}

function save() {
  saveSvgFile( document.getElementById("svgout"), "download");
}

function c1() {
    this.attr({ fill: "#ff00ff" });
}

function c2() {
    if (this.hasClass("selected")) {
      this.attr({ fill: C1});
    } else {
      this.attr({ fill: C2 });
    }
}


function c3() {
  if (this.hasClass("selected")) {
    this.removeClass("selected");
    this.addClass("nonselected");
    var myClass = snap.selectAll( this.attr().gridpos );
    myClass.forEach( (f) => { f.removeClass("selected");  f.addClass("nonselected"); f.attr({fill: C2}); });
    console.log("Select removed"); 
  } else {
    this.addClass("selected");
    this.removeClass("nonselected");
    var myClass = snap.selectAll( this.attr().gridpos );
    myClass.forEach( (f) => { f.addClass("selected"); f.removeClass("nonselected"); f.attr({fill: C1}); });
    console.log("Select added");
  }

  console.log(this.attr().matt);
}

createGrid();
// var s1 = s.polygon(10,10,10,30,100,100).attr({ matt: "test123", fill: "red", stroke: "blue" });
// s1.hover( c1,c2);
// s1.click( c3);
