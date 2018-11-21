var options = {
  valueNames: [ 'title', 'description' ],
  item: '<li>' +
        '<div><h3 class="title"></h3><p class="description"></p><div> ' +
        '<div><h4>واژه های مربوط</h4><p class="related"></p></div>' +
        '<div><h4>توضیح/ مثال</h4><p class="details"></p></div>' +
        '</li>'
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
      all.concat(newList)
  })
  var vajehList = new List('vajeh-list', options, all);
}
function getAlphaList(alpha) {
  vajehList.search(alpha, ['type'])
}
