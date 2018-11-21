var options = {
  valueNames: [ 'title', 'description' ],
  item: '<li><div class="vajehitem">' +
        '<div class="vajehmain"><h3 class="title"></h3><h4 class="description"></h4></div> ' +
        '<div><h5>واژه های مربوط</h5><p class="related"></p></div>' +
        '<div><h5>توضیح/ مثال</h5><p class="details"></p></div>' +
        '</div></li>'
  };

var vajehList;

function startVajeh() {
  const lists =[
    {type: 'alef', list:alefList},
    {type: 'beh', list: behList},
    {type: 'fe', list: feList}];
  let all =[]
  lists.forEach(function (item) {
      const newList = item.list.map(m => {m.type=item.type; return m})
      all = all.concat(newList)
  })
  var vajehList = new List('vajeh-list', options, all);
}
function getAlphaList(alpha) {
  vajehList.search(alpha, ['type'])
}
