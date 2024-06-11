#! /usr/bin/env python3 -u

# from asyncio.windows_events import NULL
import json
import os
import sys
import time
import base64

from websocket import create_connection
# import websocket
import RPi.GPIO as GPIO

from capture_image import take_photo

green_led_pin = 18
red_led_pin = 17
button_pin = 15
GPIO.setmode(GPIO.BCM)
GPIO.setup(green_led_pin, GPIO.OUT)
GPIO.setup(red_led_pin, GPIO.OUT)
GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# DATA_SAVE_DIR = "/home/pi/picture"
SERVER_IP = "192.168.0.49"
SERVER_PORT = 8082
Url = f"ws://{SERVER_IP}:{SERVER_PORT}"

def parse_server_data(message):
    try:
        message = json.loads(message)
        result = message["result"]
        print(f"[From Server] Result: {result}")
        return result
    except:
        print("Invalid json format:")
        print(message)
        
if __name__ == "__main__":

    while(True):

        # press button
        # if GPIO.input(10) == GPIO.HIGH:

        take_photo() # will be saved as face.jpg

        ws = create_connection(Url)  # open socket

        with open("face.jpg", "rb") as f:
            encoded_string = base64.b64encode(f.read())
        message = json.dumps(
            {
                "from": "RPi",
                "photo": encoded_string.decode(),
            }
        )
        ws.send(message)  # send to socket

        received = ""
        ws.recv(received)  # receive from socket

        result = parse_server_data(received)
        if(result == "match"):
            GPIO.output(green_led_pin, GPIO.HIGH)
            time.sleep(5)
            GPIO.output(green_led_pin, GPIO.LOW)
        else:
            GPIO.output(red_led_pin, GPIO.HIGH)
            time.sleep(5)
            GPIO.output(red_led_pin, GPIO.LOW)

        ws.close()  # close socket
