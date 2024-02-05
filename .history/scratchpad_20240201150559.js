// You can think of the scientific classification of an animal as a series of key-value pairs. Here, the keys are taxonomic ranks (_Domain_, _Kingdom_, _Phylum_, etc.). The values are the specific groups to which the animal belongs.

// 	Write JavaScript code that extracts the classification of animals from the web page and logs an Object that uses the ranks as keys and the groups as values. You may assume the taxonomic ranks to use as keys is provided for you as an array.

const kingPhillip = ["Kingdom", "Phylum", "Class", "Order", "Family", "Genus", "Species"];

const classificationRows = [...document.querySelectorAll(".infobox.biota tr")].filter((row) =>
  kingPhillip.includes(row.innerText.split(":")[0])
);

let result = {};

for (let key of kingPhillip) {
  let matchingRow = classificationRows.filter((row) => row.innerText.split(":")[0].toLowerCase() === key.toLowerCase());
  let text = matchingRow.innerText.split(/\s/)[1];
  debugger;
  result[key] = text;
}

console.log(result);
