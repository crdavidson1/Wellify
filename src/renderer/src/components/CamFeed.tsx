import Webcam from "react-webcam";

export default function CamFeed() {
  return (
    <Webcam
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 9,
        width: 1200,
        height: 800,
      }}
    />
  )


}