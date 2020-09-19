import { Component, createRef } from "react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
import io from "socket.io-client";
import {withRouter} from 'next/router';




class Room extends Component {
  constructor(props) {
    super(props)
    this.localVideo = createRef()
    this.remoteVideo = createRef();
    this.roomId = props.router.query.roomId;
    this.peers = {}

  }

  async componentDidMount(){
    const Peer = (await import('peerjs')).default
    this.socket = io('http://localhost:3000');
    this.peer = new Peer()
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    this.addVideoStream(this.localVideo.current, this.stream);

    this.peer.on("call", (call) => {
      call.answer(this.stream);
      
      call.on("stream", (userVideoStream) => {
        this.addVideoStream(this.remoteVideo.current, userVideoStream);
      });
    });

    this.socket.on("user-connected", (userId) => {
      console.log(userId)
      this.connectToUser(userId, this.stream)});
    this.socket.on("user-disconnected", (userId) => {
      if (this.peers[userId]) this.peers[userId].close();
    });

    this.peer.on("open", (id) => this.socket.emit("join-room", this.roomId, id));
  
  }
  

  // Helper methods
  connectToUser = (userId, stream) => {
    const call = this.peer.call(userId, stream);
    call.on("stream", (userVideoStream) =>
      this.addVideoStream(this.remoteVideo.current, userVideoStream)
    );
    call.on("close", () => this.remoteVideo.current.remove());
    this.peers[userId] = call;
  };

  addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => video.play());
  };


  render() {
    return (<div>
      <video ref={this.localVideo} muted width="400" />
      <video ref={this.remoteVideo} width="400" />
    </div>)
  }


}




// const Room = () => {
//   const localRef = useRef(null);
//   const remoteRef = useRef(null);
//   const router = useRouter();
//   const { roomId } = router.query;
  
//   useEffect(() => {
//     const permissions = async () => {
//       const Peer = (await import("peerjs")).default;
//       const socket = (await import('socket.io-client')).default("/")
//             const myPeer = new Peer();
//       const peers = {};

//       const addVideoStream = (video, stream) => {
//         video.srcObject = stream;
//         video.addEventListener("loadedmetadata", () => video.play());
//       };

//       const connectToUser = (userId, stream) => {
//         const call = myPeer.call(userId, stream);

//         call.on("stream", (userVideoStream) =>
//           addVideoStream(remoteRef.current, userVideoStream)
//         );
//         call.on("close", () => remoteRef.current.remove());
//         peers[userId] = call;
//       };

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });
//       addVideoStream(localRef.current, stream);

//       myPeer.on("call", (call) => {
//         call.answer(stream);
//         call.on("stream", (userVideoStream) => {
//           addVideoStream(remoteRef.current, userVideoStream);
//         });
//       });

//       socket.on("user-connected", (userId) => connectToUser(userId, stream));
//       socket.on("user-disconnected", (userId) => {
//         if (peers[userId]) peers[userId].close();
//       });

//       myPeer.on("open", (id) => socket.emit("join-room", roomId, id));
//     };
//     permissions();
//   }, [roomId]);


//   return (
//     <div>
//       <video ref={localRef} muted width="400" />
//       <video ref={remoteRef} width="400" />
//     </div>
//   );
// };

export default withRouter(Room);
