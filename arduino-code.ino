const int ledPin = LED_BUILTIN;  // Pin number for the built-in LED

void setup() {
  Serial.begin(9600);  // Set the baud rate to match the serial communication
  pinMode(ledPin, OUTPUT);  // Set the LED pin as an output
}

void loop() {
  if (Serial.available()) {
    char data = Serial.read();  // Read the incoming character from the serial port

    if (data == '0') {
      digitalWrite(ledPin, LOW);  // Turn off the LED
    } else if (data == '1') {
      digitalWrite(ledPin, HIGH);  // Turn on the LED
    }
  }
}
