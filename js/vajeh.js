var options = {
  valueNames: [ 'title', 'description' ],
  item: '<li><h3 class="title"></h3><p class="description"></p></li>'
  };
  
  var vajehList;

function startVajeh() {
  var vajehList = new List('vajeh-list', options, behList);
}
function searchList(str) {
  vajehList.search(str, ['title'])
}
