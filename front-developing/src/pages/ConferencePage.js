import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import { useParams } from "react-router-dom";

import './ConferencePage.css';
import UserVideoComponent from '../components/conference/UserVideoComponent';
import UserModel from '../components/conference//user-model';
import Paint from '../components/conference/Paint';
import ChatComponent from '../components/conference//ChatComponent';
import PaintComponent from '../components/conference//PaintComponent';

//MUI 
import IconButton from '@material-ui/core/IconButton';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import VideocamOffRoundedIcon from '@mui/icons-material/VideocamOffRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import MicOffRoundedIcon from '@mui/icons-material/MicOffRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//set 상어 Theme Color
const theme = createTheme({
    palette: {
        primary: {
            main: '#62AAFF',
        },
    },
});

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

var localUser = new UserModel();

const OPENVIDU_SERVER_URL = 'https://i7e207.p.ssafy.io:8443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

class ConferencePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mySessionId: 'Session' + this.props.id,
            myUserName: undefined,
            session: undefined,
            mainStreamManager: undefined,
            publisher: undefined,
            subscribers: [],
            localUser: undefined,
            chatDisplay: 'none',

            // //펜 굵기 용 (수정)
            // lineWidth: 5
        };

        axios.get(process.env.REACT_APP_DB_HOST + "/users/me")
            .then(({ data }) => {
                console.log("then", data.name);
                this.setState({
                    myUserName: data.name,
                });
            }
            ).catch((err) => {
                alert('로그인 하세요');
                window.location.href = '/';
            })

        this.joinSession = this.joinSession.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
        this.onbeforeunload = this.onbeforeunload.bind(this);
        this.toggleCamera = this.toggleCamera.bind(this);
        this.toggleMic = this.toggleMic.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
        this.checkNotification = this.checkNotification.bind(this);
        this.checkSize = this.checkSize.bind(this);
        // this.onLineWidthChange = this.onLineWidthChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
        this.joinSession();
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload(event) {
        this.leaveSession();
    }

    handleChangeSessionId(e) {
        this.setState({
            mySessionId: e.target.value,
        });
    }

    handleChangeUserName(e) {
        this.setState({
            myUserName: e.target.value,
        });
    }

    setSessionId(id) {
        this.setState({
            mySessionId: id,
        });
    }

    setUserName(name) {
        this.setState({
            myUserName: name,
        });
    }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

    joinSession() {

        this.OV = new OpenVidu();

        // --- 2) Init a session ---

        this.setState(
            {
                session: this.OV.initSession(),
            },
            () => {
                var mySession = this.state.session;

                // --- 3) Specify the actions when events take place in the session ---

                // On every new Stream received...
                mySession.on('streamCreated', (event) => {
                    // Subscribe to the Stream to receive it. Second parameter is undefined
                    // so OpenVidu doesn't create an HTML video by its own
                    var subscriber = mySession.subscribe(event.stream, undefined);
                    var subscribers = this.state.subscribers;
                    subscribers.push(subscriber);

                    // Update the state with the new subscribers
                    this.setState({
                        subscribers: subscribers,
                    });
                });

                // On every Stream destroyed...
                mySession.on('streamDestroyed', (event) => {

                    // Remove the stream from 'subscribers' array
                    this.deleteSubscriber(event.stream.streamManager);
                });

                // On every asynchronous exception...
                mySession.on('exception', (exception) => {
                    console.warn(exception);
                });

                // --- 4) Connect to the session with a valid user token ---

                // 'getToken' method is simulating what your server-side should do.
                // 'token' parameter should be retrieved and returned by your own backend
                this.getToken().then((token) => {
                    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    mySession
                        .connect(
                            token,
                            { clientData: this.state.myUserName },
                        )
                        .then(async () => {
                            var devices = await this.OV.getDevices();
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');

                            // --- 5) Get your own camera stream ---

                            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                            // element: we will manage it on our own) and with the desired properties
                            let publisher = this.OV.initPublisher(undefined, {
                                audioSource: undefined, // The source of audio. If undefined default microphone
                                videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                                publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
                                publishVideo: false, // Whether you want to start publishing with your video enabled or not
                                resolution: '640x480', // The resolution of your video
                                frameRate: 30, // The frame rate of your video
                                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                                mirror: false, // Whether to mirror your local video or not
                            });

                            // --- 6) Publish your stream ---

                            mySession.publish(publisher);

                            localUser.setConnectionId(publisher.session.connection.connectionId);
                            localUser.setStreamManager(publisher);
                            localUser.setNickname(this.state.myUserName);
                            // Set the main video in the page to display our webcam and store our Publisher
                            this.setState({
                                currentVideoDevice: videoDevices[0],
                                mainStreamManager: publisher,
                                publisher: publisher,
                                localUser: localUser
                            });
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
            },
        );
    }

    toggleCamera() {
        var publisher = this.state.publisher;
        publisher.publishVideo(!this.state.publisher.stream.videoActive);
        this.setState({ publisher: publisher });
    }
    toggleMic() {
        var publisher = this.state.publisher;
        publisher.publishAudio(!this.state.publisher.stream.audioActive);
        this.setState({ publisher: publisher });
    }

    toggleChat() {
        let display = this.state.chatDisplay;
        if (display === 'block') {
            display = 'none';
            this.setState({ chatDisplay: display });
        } else {
            display = 'block';
            console.log('chat', display);
            this.setState({ chatDisplay: display, messageReceived: false });
        }
        //this.updateLayout();
    }

    checkNotification(event) {
        this.setState({
            messageReceived: this.state.chatDisplay === 'none',
        });
    }
    checkSize() {
        if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
            this.toggleChat('none');
            this.hasBeenUpdated = true;
        }
        if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
            this.hasBeenUpdated = false;
        }
    }

    leaveSession() {

        // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

        const mySession = this.state.session;

        if (mySession) {
            mySession.disconnect();
        }

        // Empty all properties...
        this.OV = null;
        this.setState({
            session: undefined,
            subscribers: [],
            mySessionId: 'SessionA',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            mainStreamManager: undefined,
            publisher: undefined
        });
    }

    async switchCamera() {
        try {
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.mainStreamManager)

                    await this.state.session.publish(newPublisher)
                    this.setState({
                        currentVideoDevice: newVideoDevice,
                        mainStreamManager: newPublisher,
                        publisher: newPublisher,
                        localUser: localUser,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    // onLineWidthChange(event) {
    //     this.setState({ lineWidth: event.target.value });
    //     console.log(this.state.lineWidth);
    // }

    render() {
        const localUser = this.state.localUser;
        var chatDisplay = { display: this.state.chatDisplay };
        return (
            <div className="container">
                {this.state.session !== undefined ? (
                    <div id="session">
                        <div id="session-header">
                            <img src={process.env.PUBLIC_URL + "/sangeo_log.png"} alt="상어 로고" />
                            <div id="session-tools">
                                {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                                    <div>
                                        <div className="OT_root OT_publisher custom-class row chatbox" style={chatDisplay}>
                                            <ChatComponent
                                                user={localUser}
                                                chatDisplay={this.state.chatDisplay}
                                                close={this.toggleChat}
                                                messageReceived={this.checkNotification}
                                            />
                                        </div>
                                        <ThemeProvider theme={theme}>
                                            <IconButton id="buttonToggleChat" onClick={this.toggleChat}>
                                                <ChatRoundedIcon color="primary" size="large" />
                                            </IconButton>
                                        </ThemeProvider>
                                    </div>
                                )}
                                {this.state.publisher !== undefined && this.state.publisher.stream.videoActive ? (
                                    <IconButton id="buttonToggleCamera" onClick={this.toggleCamera}>
                                        <VideocamRoundedIcon />
                                    </IconButton>
                                ) : <IconButton id="buttonToggleCamera" onClick={this.toggleCamera}>
                                    <VideocamOffRoundedIcon />
                                </IconButton>}
                                {this.state.publisher !== undefined && this.state.publisher.stream.audioActive ? (
                                    <IconButton id="buttonToggleMic" onClick={this.toggleMic}>
                                        <MicRoundedIcon />
                                    </IconButton>
                                ) : <IconButton id="buttonToggleMic" onClick={this.toggleMic}>
                                    <MicOffRoundedIcon />
                                </IconButton>}
                                <IconButton id="buttonLeaveSession" onClick={this.leaveSession}>
                                    <LogoutRoundedIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='session-body'>
                            <div id="video-container" className='col-md-3 col-xs-3'>
                                <div className="row">
                                    {this.state.subscribers.map((sub, i) => (
                                        <div key={i} className="stream-container">
                                            <UserVideoComponent streamManager={sub} />
                                        </div>
                                    ))}
                                </div>
                                <div className="row">
                                    {this.state.publisher !== undefined ? (
                                        <div className="stream-container">
                                            <UserVideoComponent
                                                streamManager={this.state.publisher} />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-md-9 col-xs-9 paint-container'>
                                <div id="canvas-container" >
                                    {localUser !== undefined && localUser.getStreamManager() !== undefined && (
                                        <div>
                                            <Paint user={localUser}/>
                                            {/* <input id="line-width" type="range" min="1" max="10" value={this.state.lineWidth} onChange={this.onLineWidthChange} step="0.5" /> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
                }
            </div>
        );
    }

    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
     *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
     *   3) The Connection.token must be consumed in Session.connect() method
     */

    getToken() {
        return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
    }

    createSession(sessionId) {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('CREATE SESION', response);
                    resolve(response.data.id);
                })
                .catch((response) => {
                    var error = Object.assign({}, response);
                    if (error?.response?.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' +
                            OPENVIDU_SERVER_URL,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                OPENVIDU_SERVER_URL +
                                '"',
                            )
                        ) {
                            window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    createToken(sessionId) {
        return new Promise((resolve, reject) => {
            var data = {};
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
}

export default withParams(ConferencePage);