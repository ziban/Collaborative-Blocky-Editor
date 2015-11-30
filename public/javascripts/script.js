/* public/script.js */

window.onload = function() {
    var blockly = document.getElementById('blocklyDiv');
    console.log('outside');
    var tarea = document.getElementById('hack');

    // Text to Xml to Workspace Translation
    function toXml() {
      var xml = Blockly.Xml.workspaceToDom(workspace);
      tarea.value = Blockly.Xml.domToPrettyText(xml);
    }

    function fromXml() {
      var xml = Blockly.Xml.textToDom(tarea.value);
      Blockly.Xml.domToWorkspace(workspace,xml);
    }

    //Monitors for change in the textarea 
    var oldVal = tarea.value; 
    var changeOccured = function() {
      if (tarea.value != oldVal)
      {
        oldVal = tarea.value;
        return true;
      }
        return false;
    };

    // Timer Function to detect text area updates from ShareJS.
    setInterval(function(){
      if (changeOccured())
      {
        workspace.clear();
        fromXml();
      }
    }, 2000);


   // Open Sharejs connection
   sharejs.open('home', 'text', function(error, doc) {
            doc.attach_textarea(tarea);
    });

    // Blockly Change Listener
    workspace.addChangeListener(function() {
        console.log("change");
        toXml();
    });


   var connection = sharejs.open('home', 'text', function(error, doc) {
            doc.attach_textarea(tarea);
    });
};

