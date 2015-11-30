/* public/script.js */

window.onload = function() {
    var blockly = document.getElementById('blocklyDiv');
    console.log('outside');

    var logoutput = function () {
        console.log('DOPPPPPPPPE');
    }

    blockly.addEventListener('onclick', logoutput);


    sharejs.open('home', 'text', function(error, doc) {
            doc.attach_textarea(blockly);
    });
};