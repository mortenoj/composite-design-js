// Files can be both files and directories
var File = function (name) {
    this.name = name;
    this.children = [];
}

// Prototype functions for adding, removing and getting child nodes
File.prototype = {
    add: function(file) { this.children.push(file); },
    remove: function(file) { 
        this.children = this.children.filter(function(el){return el != file;});
    },
    getChild: function(index) { return this.children[index]; }
}

// Recursively traverses the child nodes and adds their name to a logger method
function traverse(indent, file) {
    log.add(Array(indent++).join("   ") + file.name);
    for (var i = 0; i < file.children.length; i++)
        traverse(indent, file.getChild(i));
}

// Logger methods for printing out a file with all its children
var log = (function () {
    var logger = "";
    return {
        add:  function (fileName) {  logger += fileName + "\n"; },
        show: function () { console.log(logger); logger = ""; }
    }
})();

// Create directories and append files
let root = new File("Root"), dir1 = new File("Directory1"), dir2 = new File("Directory2");

let files = [];
for (var i = 1; i <= 4; i++)
    files.push(new File("File " + i));

files.map((file, index) => {
    if (index < 2) dir1.add(file);
    else           dir2.add(file);
})

root.add(dir1);     root.add(dir2);
// Traverse from the root element and display all the elements
traverse(1, root);  log.show();