import { useCallback, useEffect, useRef, useState } from 'react';
import Peer, { Instance as SimplePeer } from 'simple-peer';

// fuvtion Chat(){
function chat() : React.FC{
  const [peer, setPeer] = useState<SimplePeer | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      } catch (err) {
        setError('Error accessing media devices.');
        console.error(err);
      }
    };
    getUserMedia();
  }, []);

  const initiateCall = useCallback(() => {
    if (!stream) return;
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data: any) => {
      console.log('SIGNAL', data);
    });

    peer.on('stream', (stream: MediaStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.on('error', (err: Error) => {
      setError(`Error in peer connection: ${err.message}`);
      console.error(err);
    });

    setPeer(peer);
  }, [stream]);

  const answerCall = useCallback((signalData: any) => {
    if (!stream) return;
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data: any) => {
      console.log('ANSWER SIGNAL', data);
    });

    peer.on('stream', (stream: MediaStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.on('error', (err: Error) => {
      setError(`Error in peer connection: ${err.message}`);
      console.error(err);
    });

    peer.signal(signalData);
    setPeer(peer);
  }, [stream]);

  const endCall = useCallback(() => {
    peer?.destroy();
    setPeer(null);
  }, [peer]);

  return (
    <div>
      <h2>Live Video Chat</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <video ref={myVideo} autoPlay muted playsInline />
        <video ref={userVideo} autoPlay playsInline />
      </div>
      <button onClick={initiateCall}>Start Call</button>
      <button onClick={endCall}>End Call</button>
    </div>
  );
};

export default Chat;