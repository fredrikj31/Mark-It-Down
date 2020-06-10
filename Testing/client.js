var socket = io("http://localhost:3000");

const editor = document.getElementById("editor");

editor.addEventListener("keypress", (event) => {
	
	var typedChar = event.which || event.keyCode;

	socket.send({ char: typedChar });
});

socket.on("message", (data) => {
	character = String.fromCharCode(data.char)

	editor.value = editor.value + character
})