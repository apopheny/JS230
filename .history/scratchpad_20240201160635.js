// . The solution to the previous problem (listed below) does everything in one function. It works, but if we need to perform a similar operation later, we must write most of the same code again. We can do better by rethinking the problem.
// ```js
// // previous solution
// function addClassToParagraphs(node) {
//   if (node instanceof HTMLParagraphElement) {
//     node.classList.add("article-text");
//   }

//   let nodes = node.childNodes;
//   for (let index = 0; index < nodes.length; index += 1) {
//     addClassToParagraphs(nodes[index]);
//   }
// }

// addClassToParagraphs(document.body);
// ```

// You can think of the problem as having two primary operations: find all the `p` elements, and then add a class to each of them. We can structure our code similarly; this makes the code's intent clearer to other developers and increases the reusability of the components.

// Using this task breakdown, rewrite the solution to the first problem. The core of your solution should be a function named `getElementsByTagName` that returns an array of all elements with a given tag name. You should then add the CSS class `article-text` to each paragraph in the array.

function getElementsByTagName(parentNode, tag) {
  let result = [];
  let queue = [parentNode];
  while (queue.length > 0) {
    let currentNode = queue.shift();
    if (currentNode.nodeName === tag.toUpperCase()) {
      result.push(currentNode);
    }
    queue.push(currentNode.children);
  }

  return result;
}

getElementsByTagName(document, "P").forEach((paragraph) => paragraph.classList.add("article-text"));
