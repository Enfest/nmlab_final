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

green_led_pin = 23
red_led_pin = 24
button_pin = 18
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(green_led_pin, GPIO.OUT)
GPIO.setup(red_led_pin, GPIO.OUT)
GPIO.setup(button_pin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

# DATA_SAVE_DIR = "/home/pi/picture"
SERVER_IP = "127.0.0.1"
SERVER_PORT = 8082
Url = f"ws://{SERVER_IP}:{SERVER_PORT}"
        
if __name__ == "__main__":

    while(True):

        # press button

        while True: # Run forever
            if GPIO.input(button_pin) == GPIO.HIGH:
                print("Button was pushed!")
                break

        take_photo() # will be saved as face.jpg

        ws = create_connection(Url)  # open socket

        with open("face.jpg", "rb") as f:
            encoded_string = base64.b64encode(f.read())
        message = json.dumps(
            ["picture", encoded_string.decode()]
        )
        ws.send(message)  # send to socket

        result = ws.recv()  # receive from socket

        print(f"Received: {result}")
        if(result == "true"):
            GPIO.output(green_led_pin, GPIO.HIGH)
            time.sleep(5)
            GPIO.output(green_led_pin, GPIO.LOW)
        else:
            GPIO.output(red_led_pin, GPIO.HIGH)
            time.sleep(5)
            GPIO.output(red_led_pin, GPIO.LOW)

        ws.close()  # close socket
        print("Connection closed")
        # break