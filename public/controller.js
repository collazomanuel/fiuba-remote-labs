function sendData(value) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/send?value=${value}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Data sent successfully");
    } else {
      console.error("Error sending data");
    }
  };
  xhr.send();
}

document.addEventListener("keydown", (event) => {
  if (event.key === 'ArrowDown')
    sendData(0);
  else if (event.key === 'ArrowUp')
    sendData(1);
});
