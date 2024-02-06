var inventory;

(function () {
  inventory = {
    lastId: 0,
    collection: [],
    setDate() {
      let date = new Date();
      document.querySelector("#order_date").textContent = date.toUTCString();
    },
    cacheTemplate() {
      let iTmpl = document.querySelector("#inventory_item");
      this.template = iTmpl.innerHTML;
      iTmpl.remove();
    },
    add() {
      this.lastId++;
      let item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1,
      };
      this.collection.push(item);

      return item;
    },
    remove(idx) {
      this.collection = this.collection.filter(function (item) {
        return item.id !== idx;
      });
    },
    get(id) {
      let found_item;

      this.collection.forEach(function (item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },
    update($item) {
      let id = this.findID($item),
        item = this.get(id);

      item.name = $item.find("[name^=item_name]").val();
      item.stock_number = $item.find("[name^=item_stock_number]").val();
      item.quantity = $item.find("[name^=item_quantity]").val();
    },
    newItem(e) {
      e.preventDefault();
      let item = this.add(),
        itemHTMLString = this.template.replace(/ID/g, item.id);
      itemHTMLString, "text/html";

      document
        .querySelector("#inventory")
        .insertAdjacentHTML("beforeend", itemHTMLString);
    },
    findParent(e) {
      function closest(node, type) {
        if (node.tagName === type.toUpperCase()) {
          return node;
        } else if (node.tagName === "BODY") {
          return;
        } else {
          return closest(node.parentElement, type);
        }
      }

      return closest(e.target, "tr");
    },
    findID($item) {
      function findHiddenInputChild(node) {
        console.log(node);
        let queue = [...node.children];
        while (queue.length > 0) {
          let current = node.shift;
          if (current.tagName === "INPUT" && current.type === "hidden") {
            return current;
          }

          if (current.children.length > 0) queue.push(current.children);
        }

        return null;
      }
      return findHiddenInputChild($item).value;
      // console.log(+$($item).find("input[type=hidden]").val());
      // return +$($item).find("input[type=hidden]").val();
    },
    deleteItem(e) {
      e.preventDefault();
      console.log(this.toString());
      let $item = this.findParent(e).remove();

      this.remove(this.findID($item));
    },
    updateItem(e) {
      let $item = this.findParent(e);

      this.update($item);
    },
    bindEvents() {
      $("#add_item").on("click", $.proxy(this.newItem, this));
      $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
    },
    init() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    },
  };
})();

$($.proxy(inventory.init, inventory));
