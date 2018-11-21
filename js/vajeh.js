var options = {
  valueNames: [ 'title', 'description' ],
  item: '<li><table><tr><td><h3 class="title"></h3><p class="description"></p></td>' +
        '<td><h4>related</h4><p class="related"></p></td>' +
        '<td><h4>details</h4><p class="details"></p></td></tr></table></li>'
  };

var vajehList;

function startVajeh() {
  const lists =[
    {type: 'alef', list:alefList},
    {type: 'beh', list: behList},
    {type: 'fe', list: feList}];
  const all =[]
  lists.forEach(function (item) {
      const newList = item.list.map(m => {m.type=item.type; return m})
      all.concat(newList)
  })
  var vajehList = new List('vajeh-list', options, all);
}
function getAlphaList(alpha) {
  vajehList.search(alpha, ['type'])
}
