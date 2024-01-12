import React, { useState, Component } from "react";
import AudioAnalyser from "react-audio-analyser";
import RecordButton from "./RecordButton.jsx";
import WaveSurfer from "wavesurfer.js";

export default class AudioRecorder extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      audioType: "audio/mp3",
      audioSrc: null, // Initialize audioSrc to null
      saveAudio: false
    };

    this.waveSurfer = null;
  }

  handleSaveAudioClick = () => {
    this.setState(
      (prevState) => ({
        saveAudio: !prevState.saveAudio,
      }),
      () => {
        if (this.state.saveAudio) {
          this.props.onSaveAudio(this.state.audioSrc);
        }
      }
    );    
  };


  controlAudio(status) {
    this.setState({
      status
    });
  }


  // stopCallback = (e) => {
  //   const audioSrc = window.URL.createObjectURL(e);
  //   this.setState({ audioSrc }, () => {
  //     this.initWaveSurfer();
  //   });
  //   console.log("succ stop", e);
  // };
  

  componentDidMount() {
    // this.setState({
    //   audioType: "audio/wav"
    // });
  }

  toggleRecording() {
    this.state.status === "recording"
      ? this.controlAudio("inactive")
      : this.controlAudio("recording");
  }

  render() {
    const { status, audioSrc, audioType } = this.state;
    const audioProps = {
      audioType,
      // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
      status,
      audioSrc,
      timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
      startCallback: e => {
        console.log("succ start", e);
      },
      pauseCallback: e => {
        console.log("succ pause", e);
      },
      stopCallback: e => {
        this.setState({
          audioSrc: window.URL.createObjectURL(e)
        });
        console.log("succ stop", e);
      },
      onRecordCallback: e => {
        console.log("recording", e);
      },
      errorCallback: err => {
        console.log("error", err);
      }
    };
    return (
      <div>
        <AudioAnalyser {...audioProps}>
          <div className="btn-box">
            <RecordButton
              id="recordButton"
              onClick={() => {
                this.toggleRecording();
                // toggleIsRecording();
              }}
            />
          </div>
        </AudioAnalyser>
        {audioSrc && <button onClick={this.handleSaveAudioClick}>Save Audio</button>}
        
        
        {/* <select
          name=""
          id=""
          onChange={e => this.changeScheme(e)}
          value={audioType}
        >
          <option value="audio/webm">audio/webm（default）</option>
          <option value="audio/wav">audio/wav</option>
          <option value="audio/mp3">audio/mp3</option>
        </select> */}
      </div>
    );
  }
}
