function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

(function() {
  const paragraphList = [];
  
  const returnPs = function(node) {
    if (node.nodeName === 'P') {
      paragraphList.push(node);
    }
  }

  walk(document, returnPs);
  // console.log(paragraphList)
  return paragraphList;
})();
sdas