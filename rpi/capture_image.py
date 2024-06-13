import cv2

def take_photo():
    video = cv2.VideoCapture(0)
    print(video)
    capture = True

    while capture:

        check, frame = video.read()
        cv2.imwrite('face.jpg', frame)
        capture = False

    video.release()
    cv2.destroyAllWindows()
