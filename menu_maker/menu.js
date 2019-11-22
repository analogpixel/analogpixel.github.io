var cols = ['protein_col', 'spice_col', 'starch_col', 'vegetable_col', 'cooking_method_col'];

var cols_data = {'protein_col': {'color': '#e74c3c'},
                 'spice_col':   {'color': '#70d6ff'},
                 'starch_col':  {'color': '#5b5b5b'},
                 'vegetable_col': {'color': '#8cb369'},
                 'cooking_method_col': {'color': '#f4e285'}}

// https://www.thekitchn.com/spice-mixes-189368
var data = {
 protein_col: ['chicken', 'beef', 'pork', 'fish', 'tofu','egg','lamb'],
 cooking_method_col: ['grill', 'slow cooker', 'bake', 'broil', 'pressure cooker','roasted','boiling','stewing','fry','saute'],
 spice_col: ['mexican', 'italian', 'indian', 'american', 'greek', 'bbq', 'teriyaki','mongolian','Berbere','Dukkah','Harissa','Ras El Hanout','Chinese Five Spice','Gomasio','Togarashi',
 'Herbes de Provence','Khmeli Suneli','Quatre Epices','Chaat Masala','Curry Powder','Garam Masala','Panch Phoron','Adobo','Chili Powder','Jerk Spice','Advieh','Baharat','Zaatar'],
 starch_col:  ['pasta', 'rice', 'bread', 'tortilla', 'potatoes', 'pizza dough', 'pie dough', 'puff pastry', 'rice paper','quinoa','polenta'],
 vegetable_col:  ['carrot','brussle sprouts','beans','asparagus','mushrooms','bell peppers','onions','squash','broccoli','greens','corn','zucchini','tomatoes']
}

var current = {};

var locks = [];

$(window).keypress( (e) => {

  // console.log(e.charCode);
  if (e.charCode == 103) {
    window.open("http://www.google.com/search?q=" + Object.values(current).join(" "));   
  }

  if (e.charCode == 32 ) {
    shuffle();
  }
});

function randomValue(a) {
   return a[Math.floor(Math.random() * a.length)];
}

jQuery(document).ready(  () => {
  
  var w = window.innerWidth / cols.length;
  cols.forEach( (c) => {
    var section =  
    ['<div class=col-item style="width:' + w + 'px; background-color: ' + cols_data[c]['color'] + '" onclick="lock(\'' + c + '\')">',
      '<div class="content_wrapper">',
      '<div id=' + c + ' class=col_content></div>',
      '<div id=' + c + '_lock class=lock></div>',
      '</div>',
      '</div>'].join("\n");
    $("#content-section").append(section);
  });

  shuffle();
} )

function lock(e) {
  if ( locks.includes(e) ) {
    locks = locks.filter(item => item !== e);
    $("#" + e + "_lock").html("");
  } else {
    locks.push(e);
    $("#" + e + "_lock").html("Locked");
  }

}

function shuffle() {
  cols.forEach( (c) => { 
    if (! locks.includes(c)) { 
      var v = randomValue(data[c]);
      $("#" + c).html( v ); 
      current[c] = v;
    }
  
  });
}

