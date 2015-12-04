/* public/script.js */

// Main Application logic
window.onload = function() {

    // Getting Elements
    var documentName = document.location.pathname;
    var blockly = document.getElementById('blocklyDiv');
    var tarea = document.getElementById('tarea');
    var chatmsg  = document.getElementById('messages');
    var button = document.getElementById('button');
    var chatbox = document.getElementById('input');
    var chatDiv = document.getElementById('chatDiv');
    var generatebutton = document.getElementById('jsgenerate');
    var documentName = document.location.pathname;

    //----------------- Export/Import/Step  ------------------------------- //
    generatebutton.onclick = function(){
        alert(Blockly.JavaScript.workspaceToCode(workspace));
    }

    //----------------- Chat Implementation ------------------------------- //
    setInterval(function() {
          var isManuallyScrolling = (chatDiv.scrollHeight - chatDiv.clientHeight
                                       > chatDiv.scrollTop + 65)
          if(!isManuallyScrolling) {
            chatDiv.scrollTop = chatDiv.scrollHeight - chatDiv.clientHeight;   
          }
    },100)  
  
    var socket = io();
    socket.emit('join room', documentName)

    // Submit chatBox data to server-side socket.io
    button.onclick = function() {
      if(chatbox.value != ""){
        console.log("Chat Box Value: "+ chatbox.value);
        socket.emit('chat message', documentName, chatbox.value);
        chatbox.value = "";
      }
    };

    // Check if enter is pressed in input field, if yes, simulate submission button press
    // Enter is mainaully disabled due to form's default property of refreshing in submission
    // triggerd by enter key.
    chatbox.onkeypress = function(e) {
      if (!e) e = window.event;
      var keyCode = e.keyCode || e.which;
      if (keyCode == '13'){
        button.onclick();
        return false;
      }
    }

    // Receive chat box data when client-side socket.io 
    socket.on('chat message', function(msg) {
      console.log("chat received");
      var node = document.createElement("LI");                 // Create a <li> node
      var textnode = document.createTextNode(msg);         // Create a text node
      node.appendChild(textnode);
      chatmsg.appendChild(node);  
    });

    //------------------------Share JS Implementation ------------------------//

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
    // Also Change delay logic to make user experience better
    // Timer Function to detect text area updates from ShareJS.
    setInterval(function(){
      if (changeOccured()){
        
          console.log("Changed detected, entering recusive delay loop")
          recursive_delay(tarea.value, sync_changes);
      }
      
        // console.log("Exitting Delay");
        // workspace.clear();
        // fromXml();
      
    }, 100);


    function sync_changes(){
            console.log("Syncing Changes");
            workspace.clear();
            fromXml();  
    }

    function recursive_delay(snapshot, callback){
        setTimeout(function(){
            if(tarea.value != snapshot){
              console.log('recursive delay triggered');
              recursive_delay(tarea.value, null);
            }
            else {
              if(callback != null)
                callback();
            }
        }, 300);
    }

      // Blockly Change Listener
    workspace.addChangeListener(function() {
        //console.log("change");
        toXml();
    });


 
    // ShareJS Connection Open
    // Leave home page clear
   if(document.location.pathname.length > 1) {
        // implement share js
        var documentName = document.location.pathname.substring(1);
        sharejs.open(documentName, 'text', function(error, doc) {
            doc.attach_textarea(tarea);
        });        
    }

};