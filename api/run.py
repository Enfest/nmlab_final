# API for face recognition

# Reference: 10程式中
# from https://ithelp.ithome.com.tw/articles/10280422

import numpy as np
from face_rec import create_database, detect_faces
import base64

from flask import Flask, request, jsonify
# from flask_cors import CORS

app = Flask(__name__)
# CORS(app)

@app.route('/')
def index():
    return 'This is the API for face recognition'

@app.route('/predict', methods=['POST'])
def postInput():
    # 取得前端傳過來的數值
    insertValues = request.get_json()
    image1 = base64.b64decode(insertValues['picture1'])
    test_image = base64.b64decode(insertValues['picture2'])

    filenames = []
    filenames.append("image1")
    standard_image = []
    standard_image.append(image1)

    faces = create_database(filenames, standard_image)

    result = detect_faces(test_image, faces, threshold=0.4)

    return jsonify({'result': str(result)})