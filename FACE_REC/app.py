# API for face recognition

# Reference: 10程式中
# from https://ithelp.ithome.com.tw/articles/10280422

import cv2
import numpy as np
from face_rec import create_database, detect_faces, load_image
import base64
import json
from flask import Flask, request
import websocket
# from flask_cors import CORS

app = Flask(__name__)
# CORS(app)

@app.route('/')
def index():
    return 'This is the API for face recognition'

@app.route('/send', methods=['PUT'])
def getdata():
    print("in getdata")
    insertValues = request.get_json()
    # import websocket
    ws = websocket.WebSocket()
    ws.connect("ws://172.20.10.2:8082")
    ws.send(insertValues)
    


@app.route('/predict', methods=['POST'])
def postInput():
    # 取得前端傳過來的數值
    insertValues = request.get_json()
    print(insertValues)
    image1 = base64.b64decode(insertValues['picture1'])
    test_image = base64.b64decode(insertValues['picture2'])

    filenames = []
    filenames.append("image1.jpg")
    with open('image1.jpg', 'wb') as f:
        f.write(image1)
    standard_image = []
    standard = load_image("image1.jpg")
    standard_image.append(standard)
    with open('image2.jpg', 'wb') as f:
        f.write(test_image)
    test = load_image("image2.jpg")

    faces = create_database(filenames, standard_image)

    result = detect_faces(test, faces, threshold=0.4)
    # # print(f'reault: {result}\n')
    # # print(json.dumps({'result': result}))
    return json.dumps({'result': result})
    # return "true"

if __name__ == '__main__':
    app.run(port=5000, debug=True)