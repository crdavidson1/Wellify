## bug
Set up blazepose with mediapipe to take advantage of mediapipes drawing tools for annotating pose landmarks.

The data object from blazepose has two keys, keypoints and keypoints3d. Keypoints contains the required data for the overlay of landmarks and lines. They do not appear. Attempts to resolve it has included drawing static objects (to ensure canvas is working), drawiing keypoints3d (to ensure drawing tools are working), and drawing individual landmarks from the keypoints (to ensure the data can be understood).

 ## resolution
 switching over to the camera functionality provided by mediapipe as well as the mediapipe pose model (powered by blazepose but with more up to date docs) rather than using the Webcam React component with blazepose (mediapipe runtime versions) has resolved the issue. 