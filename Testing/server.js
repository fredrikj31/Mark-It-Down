const http = require("http").createServer();
const io = require("socket.io")(http);
const port = 3000;

http.listen(port, () => {
	console.log(`Server is Listening on port: ${port}`);
});

io.on("connection", (socket) => {
	console.log("A user connected.");
	socket.on("message", (event) => {
		console.log(`${socket.id} said: ${event.char}`);
		socket.broadcast.emit("message", event);
	});
});

io.on("disconnect", (socket) => {
	console.log("A user disconnected.");
})