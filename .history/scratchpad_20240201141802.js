// without useing querySelector or querySelectorAll
(function () {
  let count = 0;

  function traverseNodes(node, callback) {
    callback(node);

    for (let i = 0; i < node.childNodes.length; i += 1) {
      traverseNodes(node.childNodes[i], callback);
    }
  }

  function countNodeWords(node) {
    if (node.nodeName === "P") {
      wordCount = node.textContent.replace(/\s+/g, " ").split(" ").length;
      count += wordCount;
    }
  }

  console.log(traverseNodes(document.body, countNodeWords));
})();
