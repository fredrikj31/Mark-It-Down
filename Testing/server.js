const http = require("http").createServer();
const io = require("socket.io")(http);
const port = 3000;

http.listen(port, () => {
	console.log(`Server is Listening on port: ${port}`);
});

io.on("connection", (socket) => {
	console.log(`Socket Id: (${socket.id}) joined`);
	
	// Insert Event
	socket.on("insert", (event) => {
		//console.log(`${socket.id} typed: ${event.char}. At ${event.position}`);
		socket.broadcast.emit("insert", event);
	});

	// Delete Event
	socket.on("delete", (event) => {
		//console.log(`${socket.id} deleted at ${event.position}`);
		socket.broadcast.emit("delete", event);
	});


	// Disconnect Event
	socket.on("disconnect", () => {
		console.log(`Socket Id: (${socket.id}) left`);
	})
});
