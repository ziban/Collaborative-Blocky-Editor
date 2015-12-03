/* public/script.js */

// Main Application logic
window.onload = function() {
    // Getting Elements
    var blockly = document.getElementById('blocklyDiv');
    var tarea = document.getElementById('tarea');

    // Used to fake a keyboard input to trigger ShareJS to update clients on text area (Compatible with Gecko and Chrome)
    var keyboardEvent = document.createEvent("KeyboardEvent");
    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
    keyboardEvent[initMethod](
                       "keydown", // event type : keydown, keyup, keypress
                        true, // bubbles
                        true, // cancelable
                        window, // viewArg: should be window
                        false, // ctrlKeyArg
                        false, // altKeyArg
                        false, // shiftKeyArg
                        false, // metaKeyArg
                        40, // keyCodeArg : unsigned long the virtual key code, else 0
                        0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );

    // Text to Xml to Workspace Translation
    function toXml() {
      var xml = Blockly.Xml.workspaceToDom(workspace);
      tarea.value = Blockly.Xml.domToPrettyText(xml);
      tarea.dispatchEvent(keyboardEvent); //Simulate Keypress
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
    }, 100);

    // Blockly Change Listener
    workspace.addChangeListener(function() {
        console.log("change");
        toXml();
    });

    // ShareJS Connection Open

   if(document.location.pathname.length > 1){
        // implement share js
        var documentName = document.location.pathname.substring(1);
        sharejs.open(documentName, 'text', function(error, doc) {
            doc.attach_textarea(tarea);
        });        
    }

};

