var socket = io("http://localhost:3000");

const editor = document.getElementById("editor");

editor.addEventListener("keypress", (event) => {
	var typedChar = event.which || event.keyCode;
	var positionChar = getCaretCharOffset();

	socket.send({ char: typedChar, position: positionChar });
});

function getCaretCharacterOffsetWithin() {
	var element = document.getElementById("editor");

    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ( (sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

socket.on("message", (data) => {
	let character = String.fromCharCode(data.char);

	editor.value = [editor.value.slice(0, data.position), character, editor.value.slice(data.position)].join('')
});

// TODO
/*
* 1. Function to detect the position where the user typed the character.
* 2. Send the position with the character.
* 3. Insert the character into the correct position of the string.
*/
