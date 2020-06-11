var socket = io("http://localhost:3000");

const editor = document.getElementById("editor");

editor.addEventListener("keydown", (event) => {
	var typedChar = event.key;
	var positionChar = getCaretPosition();
	var bannedKeys = [16,17,18,20,93,33,34,35,36]

	if (bannedKeys.includes(event.keyCode)) {
		return false;
	} else if (event.keyCode == 46 || event.keyCode == 8) {
		socket.emit("delete", { position: positionChar-1 });
	} else {
		socket.emit("insert", { char: typedChar, position: positionChar });
	}
});

socket.on("insert", (data) => {
	let character = data.char;

	editor.textContent = [editor.textContent.slice(0, data.position), character, editor.textContent.slice(data.position)].join('')
});

socket.on("delete", (data) => {
	editor.textContent = editor.textContent.slice(0, (data.position + 1) - 1)  + editor.textContent.slice((data.position + 1), editor.textContent.length);
});

function getCaretPosition() {
	var element = document.getElementById("editor");

	var caretOffset = 0;

	if (window.getSelection) {
		var range = window.getSelection().getRangeAt(0);
		var preCaretRange = range.cloneRange();
		preCaretRange.selectNodeContents(element);
		preCaretRange.setEnd(range.endContainer, range.endOffset);
		caretOffset = preCaretRange.toString().length;
	} 

	else if (document.selection && document.selection.type != "Control") {
		var textRange = document.selection.createRange();
		var preCaretTextRange = document.body.createTextRange();
		preCaretTextRange.moveToElementText(element);
		preCaretTextRange.setEndPoint("EndToEnd", textRange);
		caretOffset = preCaretTextRange.text.length;
	}

    return caretOffset;
}