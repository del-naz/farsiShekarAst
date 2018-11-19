var options = {
  valueNames: [ 'title', 'description' ],
  item: '<li><h3 class="title"></h3><p class="description"></p></li>'
  };

var vajehList;

function startVajeh() {
  const lists =[{type: 'alef', list:alefList}, {type: 'beh', behList}];
  const all =[]
  lists.forEach(function (item) {
      const newList = item.map(m => {m.type=item.type; return m})
      all.concat(newList)
  })
  var vajehList = new List('vajeh-list', options, all);
}
function getAlphaList(alpha) {
  vajehList.search(alpha, ['type'])
}
