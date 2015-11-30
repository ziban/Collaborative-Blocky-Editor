/* public/script.js */

window.onload = function() {
    var blockly = document.getElementById('blocklyDiv');
    console.log('outside');
    var tarea = document.getElementById('hack');

    var logoutput = function () {
        alert("Text Area Change");
    }

    function toXml() {
      //var output = document.getElementById('importExport');
      var xml = Blockly.Xml.workspaceToDom(workspace);
      tarea.value = Blockly.Xml.domToPrettyText(xml);
    }

   sharejs.open('home', 'text', function(error, doc) {
            doc.attach_textarea(tarea);
    });

    workspace.addChangeListener(function() {
        console.log("change");
        toXml();
    });

    tarea.addEventListener('input', logoutput);

   var connection = sharejs.open('home', 'text', function(error, doc) {
            doc.attach_textarea(tarea);
    });
};



// function toXml() {
//   //var output = document.getElementById('importExport');
//   var xml = Blockly.Xml.workspaceToDom(workspace);
//   tarea.value = Blockly.Xml.domToPrettyText(xml);
//   tarea.focus();
//   tarea.select();
// }

// function fromXml() {
//   var input = document.getElementById('importExport');
//   var xml = Blockly.Xml.textToDom(input.value);