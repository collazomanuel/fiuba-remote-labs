const express = require("express");
const { SerialPort } = require("serialport");

const NodeWebcam = require("node-webcam");
const WebSocket = require("ws");

const app = express();
const port = new SerialPort({ path: "/dev/ttyACM0", baudRate: 9600 });

const webcamOptions = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: false,
  output: "jpeg",
  callbackReturn: "base64"
};

const Webcam = NodeWebcam.create(webcamOptions);

app.use(express.static("public"));

app.get("/send", (req, res) => {
  const { value } = req.query;
  port.write(value, (error) => {
    if (error) {
      console.error("Error sending data: ", error);
      res.status(500).send("Error sending data");
    } else {
      console.log("Data sent successfully: ", value);
      res.send("Data sent successfully");
    }
  });
});

const server = app.listen(3000, () => {
  console.log("Server started on port 3000");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  const captureInterval = setInterval(() => {
    Webcam.capture("webcam", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        ws.send(data); // Send the base64 image string to the client
      }
    });
  }, 100); // Frame rate

  ws.on("close", () => {
    clearInterval(captureInterval); // Stop capturing frames when client disconnects
  });
});
