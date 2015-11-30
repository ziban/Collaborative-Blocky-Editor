/* public/script.js */

window.onload = function() {
    var blockly = document.getElementById('blocklyDiv');
    console.log('outside');
    var tarea = document.getElementById('hack');

    var logoutput = function () {
        alert("DOPPPPPPPPE");
    }

    tarea.addEventListener('input', logoutput);

   // sharejs.open('home', 'text', function(error, doc) {
   //          doc.attach_textarea(blockly);
   //  });
};