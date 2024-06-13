# Face recognition function for api

# Reference: Muhammad Ardi
# from https://medium.com/@muhammad_ardi/a-simple-python-code-for-face-recognition-3266e9fad3be
import os
import cv2
import face_recognition
import numpy as np
from tqdm import tqdm

class Face:
    def __init__(self, bounding_box, cropped_face, name, feature_vector):
        self.bounding_box = bounding_box
        self.cropped_face = cropped_face
        self.name = name
        self.feature_vector = feature_vector
        
def load_image(path):
    image = cv2.imread(path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    return image

def create_database(filenames, images):
    faces = []
    for filename, image in tqdm(zip(filenames, images), total=len(filenames)):
        loc = face_recognition.face_locations(image, model='hog')[0]
        vec = face_recognition.face_encodings(image, [loc], num_jitters=20)[0]
        
        top, right, bottom, left = loc
        
        cropped_face = image[top:bottom, left:right]
        
        face = Face(bounding_box=loc, cropped_face=cropped_face, name=filename.split('.')[0], feature_vector=vec)
        faces.append(face)
    
    return faces

def detect_faces(image_test, faces, threshold=0.5):
    locs_test = face_recognition.face_locations(image_test, model='hog')
    vecs_test = face_recognition.face_encodings(image_test, locs_test, num_jitters=1)
    
    match = "false"

    for loc_test, vec_test in zip(locs_test, vecs_test):
        distances = []
        for face in faces:
            distance = face_recognition.face_distance([vec_test], face.feature_vector)
            distances.append(distance)
            
        if np.min(distances) < threshold:
            match = "true"
            return "true"
        else:
            return "false"
            # break
    print(f'match: {match}')
    return match

# filenames = os.listdir('templates')
# images = [load_image(f'templates/{filename}') for filename in filenames]
# faces = create_database(filenames, images)

# # My modification
# tests = os.listdir('tests')
# for test in tests:
#     if(".jpg" not in test and ".png" not in test):
#         continue
#     print(f'test
