jQuery.expr[':'].Contains = function(a,i,m){
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

$.fn.search = function(searchElements) {
  $(this).keyup(function(e){
    var searchString = $(this).val();
    if (searchString.length > 0){
      $(searchElements).hide();
      $(searchElements).filter(':Contains(' +searchString+ ')').show();
    } else {
      $(searchElements).show();
    }
  });
};