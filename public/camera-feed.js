const videoElement = document.getElementById("video");
const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  console.log("WebSocket connection established");
};

socket.onmessage = (event) => {
  videoElement.src = event.data;
};

socket.onerror = (error) => {
  console.error("WebSocket error: ", error);
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};
