import React, { useState, useEffect, useContext, useRef } from "react";
// import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import { FileContext } from "../contexts/fileContext.jsx";
import wavesurfer from "wavesurfer.js";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying, setVolume } from "../features/audioSlice.js";
import { WaveSurferContext } from "../contexts/waveSurferContext.jsx";
import { bufferToWave } from "./bufferToWave.jsx";
import { colors } from "@mui/material";
import { setAudioArray } from "../features/soundTabReducers.js";

const AudioWaveform = (props) => {
  const wavesurferRef = useRef(null);
  // const timelineRef = useRef(null);
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.soundTab.activeTab);
  // const audioState = useSelector((state) => state.soundTab.audioState);
  // const { showAudioWaveform, fileName } = audioState;
  const audioArray = useSelector((state) => state.soundTab.audioArray);
  const activeWaveform = useSelector((state) => state.soundTab.activeWaveform);
  const { id, fileName, audioUrl } = activeWaveform;

  // fetch file url from the context
  const { fileURL, setFileURL } = useContext(FileContext);

  // crate an instance of the wavesurfer
  // const [wavesurferObj, setWavesurferObj] = useState();
  const { wavesurferObj, setWavesurferObj } = useContext(WaveSurferContext);

  // const [playing, setPlaying] = useState(true); // to keep track whether audio is currently playing or not
  const [volume, setVolume] = useState(1); // to control volume level of the audio. 0-mute, 1-max
  const isPlaying = useSelector((state) => state.audio.isPlaying);
  // const volume = useSelector(state => state.audio.volume);

  const [zoom, setZoom] = useState(1); // to control the zoom level of the waveform
  const [duration, setDuration] = useState(0); // duration is used to set the default region of selection for trimming the audio
  const [indexCopy, setIndexCopy] = useState({
    firstIndexCopy: null,
    secondIndexCopy: null,
    secondListMemAlloc: null,
  });

  useEffect(() => {
    return async () => {
      // Cleanup function when component is unmounted
      if (wavesurferObj) {
        // Stop and destroy the wavesurfer instance
        wavesurferObj.stop();
        wavesurferObj.clearRegions();
        // wavesurferObj.destroy();
        // await setWavesurferObj(null);
      }
    };
  }, [wavesurferObj]); // Empty dependency array ensures this runs only on unmount

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // create the waveform inside the correct component
  useEffect(() => {
    if (wavesurferRef.current) {
      setWavesurferObj(
        wavesurfer.create({
          container: "#waveform",
          scrollParent: true,
          autoCenter: true,
          cursorColor: "blue",
          barGap: 2,
          barRadius: 3,
          barWidth: 3,
          loopSelection: true,
          waveColor: "#1976d2",
          progressColor: "#04315e",
          responsive: true,
          plugins: [
            // TimelinePlugin.create({
            //   container: "#wave-timeline",
            // }),
            RegionsPlugin.create({}),
          ],
        })
      );
    }
  }, [wavesurferRef]);

  // once the file URL is ready, load the file to produce the waveform
  useEffect(() => {
    if (audioUrl && wavesurferObj) {
      wavesurferObj.load(audioUrl);
      wavesurferRef.current.style.width = "100%";
    }
  }, [audioUrl, wavesurferObj]);

  useEffect(() => {
    if (wavesurferObj) {
      // once the waveform is ready, play the audio
      wavesurferObj.on("ready", () => {
        // wavesurferObj.play();
        wavesurferObj.enableDragSelection({}); // to select the region to be trimmed
        setDuration(Math.floor(wavesurferObj.getDuration())); // set the duration in local state
      });

      // once audio starts playing, set the state variable to true
      wavesurferObj.on("play", () => {
        // setPlaying(true);
        // dispatch(setIsPlaying(true));
      });

      // once audio starts playing, set the state variable to false
      wavesurferObj.on("finish", () => {
        // setPlaying(false);
        dispatch(setIsPlaying(false));
      });

      // if multiple regions are created, then remove all the previous regions so that only 1 is present at any given time
      wavesurferObj.on("region-updated", (region) => {
        const regions = region.wavesurfer.regions.list;
        const keys = Object.keys(regions);
        if (keys.length > 1) {
          regions[keys[0]].remove();
        }
      });
    }
  }, [wavesurferObj]);

  // set volume of the wavesurfer object, whenever volume variable in state is changed
  useEffect(() => {
    if (wavesurferObj) wavesurferObj.setVolume(volume);
  }, [volume, wavesurferObj]);

  // set zoom level of the wavesurfer object, whenever the zoom variable in state is changed
  useEffect(() => {
    if (wavesurferObj) wavesurferObj.zoom(zoom);
  }, [zoom, wavesurferObj]);

  // when the duration of the audio is available, set the length of the region depending on it, so as to not exceed the total lenght of the audio
  useEffect(() => {
    if (duration && wavesurferObj) {
      // Check if there are no regions already present
      if (Object.keys(wavesurferObj.regions.list).length === 0) {
      // add a region with default length
      wavesurferObj.addRegion({
        start: Math.floor(duration / 2) - Math.floor(duration) / 5, // time in seconds
        end: Math.floor(duration / 2), // time in seconds
        color: "hsla(265, 100%, 86%, 0.4)", // color of the selected region, light hue of purple
      });
    }
  }
  }, [duration, wavesurferObj]);

  const handlePlayPause = (e) => {
    wavesurferObj.playPause();
    // setPlaying(!playing);
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleReload = (e) => {
    // stop will return the audio to 0s, then play it again
    wavesurferObj.stop();
    wavesurferObj.play();
    // setPlaying(true); // to toggle the play/pause button icon
    dispatch(setIsPlaying(true));
  };

  const handleVolumeSlider = (e) => {
    setVolume(e.target.value);
  };

  const handleZoomSlider = (e) => {
    setZoom(e.target.value);
  };

  const handleCopy = (e) => {
    console.log("copied");
    if (wavesurferObj) {
      // get start and end points of the selected region
      const region =
        wavesurferObj.regions.list[Object.keys(wavesurferObj.regions.list)[0]];

      if (region) {
        const start = region.start;
        const end = region.end;

        // obtain the original array of the audio
        const original_buffer = wavesurferObj.backend.buffer;

        // create 2 indices:
        // left & right to the part to be copied
        setIndexCopy((prevIndex) => {
          return {
            ...prevIndex,
            firstIndexCopy: start * original_buffer.sampleRate,
            secondIndexCopy: end * original_buffer.sampleRate,
            secondListMemAlloc: (end - start) * original_buffer.sampleRate,
          };
        });
      }
    }
  };

  const handlePaste = (e) => {
    console.log("pasted");
    if (wavesurferObj) {
      // get start and end points of the selected region
      const region =
        wavesurferObj.regions.list[Object.keys(wavesurferObj.regions.list)[0]];

      if (region) {
        const start = region.start;
        const end = region.end;

        // obtain the original array of the audio
        const original_buffer = wavesurferObj.backend.buffer;

        // create 2 indices:
        // left & right to the part to be trimmed
        const trimmedstart = start * original_buffer.sampleRate;
        const trimmedend = end * original_buffer.sampleRate;

        // create a temporary new buffer array with the new length, sample rate and no of channels as the original audio
        const new_buffer = wavesurferObj.backend.ac.createBuffer(
          original_buffer.numberOfChannels,
          original_buffer.length +
            indexCopy.secondListMemAlloc -
            (trimmedend - trimmedstart),
          original_buffer.sampleRate
        );

        // create a new array upto the region to be trimmed
        const leftcopied = new Float32Array(parseInt(trimmedstart));

        // create a new array of region for the copied region
        const copied = new Float32Array(
          original_buffer
            .getChannelData(0)
            .subarray(indexCopy.firstIndexCopy, indexCopy.secondIndexCopy)
        );

        const rightcopied = new Float32Array(
          parseInt(original_buffer.length - trimmedend)
        );

        // create an array to combine the 2 parts
        const combined = new Float32Array(
          original_buffer.length + indexCopy.secondListMemAlloc
        );

        // 2 channels: 1-right, 0-left
        // copy the buffer values for the 2 regions from the original buffer

        // for the region to the left of the trimmed section
        original_buffer.copyFromChannel(leftcopied, 1);
        original_buffer.copyFromChannel(leftcopied, 0);

        // for the region to the right of the trimmed section
        original_buffer.copyFromChannel(rightcopied, 1, trimmedend);
        original_buffer.copyFromChannel(rightcopied, 0, trimmedend);

        // create the combined buffer for the trimmed audio
        combined.set(leftcopied);
        combined.set(copied, trimmedstart);
        combined.set(rightcopied, trimmedstart + indexCopy.secondListMemAlloc);

        // copy the combined array to the new_buffer
        new_buffer.copyToChannel(combined, 1);
        new_buffer.copyToChannel(combined, 0);

        // load the new_buffer, to restart the wavesurfer's waveform display
        wavesurferObj.loadDecodedBuffer(new_buffer);

        var abuffer = wavesurferObj.backend.buffer;
        var length = abuffer.length;
        const newAudioUrl = bufferToWave(abuffer, 0, length);
        // setFileURL(audioUrl);
        const updateArray = audioArray.map((audioItem) => {
          if (audioItem.id === id) {
            return { ...audioItem, audioUrl: newAudioUrl };
          }
          return audioItem;
        });
        dispatch(setAudioArray(updateArray));
      }
    }
  };

  const handleTrim = (e) => {
    if (wavesurferObj) {
      // get start and end points of the selected region
      const region =
        wavesurferObj.regions.list[Object.keys(wavesurferObj.regions.list)[0]];

      if (region) {
        const start = region.start;
        const end = region.end;

        // obtain the original array of the audio
        const original_buffer = wavesurferObj.backend.buffer;

        // create a temporary new buffer array with the same length, sample rate and no of channels as the original audio
        const new_buffer = wavesurferObj.backend.ac.createBuffer(
          original_buffer.numberOfChannels,
          original_buffer.length,
          original_buffer.sampleRate
        );

        // create 2 indices:
        // left & right to the part to be trimmed
        const first_list_index = start * original_buffer.sampleRate;
        const second_list_index = end * original_buffer.sampleRate;
        const second_list_mem_alloc =
          original_buffer.length - end * original_buffer.sampleRate;

        // create a new array upto the region to be trimmed
        const new_list = new Float32Array(parseInt(first_list_index));

        // create a new array of region after the trimmed region
        const second_list = new Float32Array(parseInt(second_list_mem_alloc));

        // create an array to combine the 2 parts
        const combined = new Float32Array(original_buffer.length);

        // 2 channels: 1-right, 0-left
        // copy the buffer values for the 2 regions from the original buffer

        // for the region to the left of the trimmed section
        original_buffer.copyFromChannel(new_list, 1);
        original_buffer.copyFromChannel(new_list, 0);

        // for the region to the right of the trimmed section
        original_buffer.copyFromChannel(second_list, 1, second_list_index);
        original_buffer.copyFromChannel(second_list, 0, second_list_index);

        // create the combined buffer for the trimmed audio
        combined.set(new_list);
        combined.set(second_list, first_list_index);

        // copy the combined array to the new_buffer
        new_buffer.copyToChannel(combined, 1);
        new_buffer.copyToChannel(combined, 0);

        // load the new_buffer, to restart the wavesurfer's waveform display
        wavesurferObj.loadDecodedBuffer(new_buffer);

        var abuffer = wavesurferObj.backend.buffer;
        var length = abuffer.length;
        const newAudioUrl = bufferToWave(abuffer, 0, length);
        // setFileURL(audioUrl);
        const updateArray = audioArray.map((audioItem) => {
          if (audioItem.id === id) {
            return { ...audioItem, audioUrl: newAudioUrl };
          }
          return audioItem;
        });
        dispatch(setAudioArray(updateArray));
      }
    }
  };

  const handleForward = () => {
    if (wavesurferObj) {
      const currentPosition = wavesurferObj.getCurrentTime();
      const newPosition = currentPosition + 10; // Move forward by 10 seconds
      wavesurferObj.seekTo(newPosition / wavesurferObj.getDuration());
    }
  };

  const handleBackward = () => {
    if (wavesurferObj) {
      const currentPosition = wavesurferObj.getCurrentTime();
      const newPosition = currentPosition - 10; // Move backward by 10 seconds
      wavesurferObj.seekTo(newPosition / wavesurferObj.getDuration());
    }
  };

  const handleDelete = () => {
    // Stop playback
    if (wavesurferObj.play()) {
      wavesurferObj.pause();
    }

    // Remove all regions
    if (wavesurferObj) {
      wavesurferObj.clearRegions();
    }

    // Set file URL to null and hide the AudioWaveform
    setFileURL(null);
    setShowAudioWaveform(false);
  };

  const handleFadeIn = () => {
    if (wavesurferObj) {
      const fadeInDuration = 5; // Adjust the fade-in duration (in seconds) as needed
      const initialVolume = wavesurferObj.getVolume();
      const targetVolume = 1;

      // Gradually increase the volume to create a fade-in effect
      wavesurferObj.setVolume(0);
      wavesurferObj.play(); // Start playback if not already playing

      const intervalId = setInterval(() => {
        const currentVolume = wavesurferObj.getVolume();
        const newVolume = currentVolume + 0.01;

        if (newVolume >= targetVolume) {
          wavesurferObj.setVolume(targetVolume);
          clearInterval(intervalId);
        } else {
          wavesurferObj.setVolume(newVolume);
        }
      }, fadeInDuration * 10); // Adjust the interval for smoother effect
    }
  };

  const handleFadeOut = () => {
    if (wavesurferObj) {
      const fadeOutDuration = 5; // Adjust the fade-out duration (in seconds) as needed
      const targetVolume = 0;

      // Gradually decrease the volume to create a fade-out effect
      const intervalId = setInterval(() => {
        const currentVolume = wavesurferObj.getVolume();
        const newVolume = currentVolume - 0.01;

        if (newVolume <= targetVolume) {
          wavesurferObj.setVolume(targetVolume);
          clearInterval(intervalId);
          wavesurferObj.pause(); // Pause playback after fade-out
        } else {
          wavesurferObj.setVolume(newVolume);
        }
      }, fadeOutDuration * 10); // Adjust the interval for smoother effect
    }
  };

  return (
    <section className="waveform-container">
      <div className="wrapper">
        {fileName !== "" ? (
          <h1 className="effect-shine" style={{ marginBottom: "-4.5em" }}>
            Sound - {fileName}
          </h1>
        ) : (
          <h1 className="effect-shine" style={{ marginBottom: "-4.5em" }}>
            Sound - Default_music
          </h1>
        )}
      </div>
      <div ref={wavesurferRef} id="waveform" style={{ width: "100%" }} />
      {/* <div ref={timelineRef} id="wave-timeline" /> */}
      <div className="all-controls">
        <div className="left-container">
          <button
            title="play/pause"
            className="controls"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <i class="fa-solid fa-circle-pause  fa-2xl custom-icon-color"></i>
            ) : (
              <i class="fa-solid fa-circle-play fa-2xl custom-icon-color"></i>
            )}
          </button>
          <button title="reload" className="controls" onClick={handleReload}>
            <i className="material-icons">replay</i>
            <span>Replay</span>
          </button>
          <button className="controls" onClick={handleTrim}>
            <i className="material-icons">content_cut</i>
            <span>Cut</span>
          </button>

          <button className="controls" onClick={handleCopy}>
            <i className="material-icons">content_copy</i>
            <span>Copy</span>
          </button>
          <button className="controls" onClick={handlePaste}>
            <i className="material-icons">content_paste</i>
            <span>Paste</span>
          </button>

          <button className="controls" onClick={handleBackward}>
            <i className="material-icons">fast_rewind</i>
            <span>Backward</span>
          </button>
          <button className="controls" onClick={handleForward}>
            <i className="material-icons">fast_forward</i>
            <span>Forward</span>
          </button>
        </div>
        <div className="right-container">
          <button className="controls fade-in" onClick={handleFadeIn}>
            {/* <i
							// style={{
							// 	fontSize: '1.2em',
							// 	color: 'white',
							// }}
							className='material-icons'>
							content_cut
						</i>        
            FadeIn */}
            <i class="fa-solid fa-signal"></i>
            <span>Fade In</span>
          </button>
          <button className="controls fade-out" onClick={handleFadeOut}>
            <i class="fa-solid fa-signal fa-flip-horizontal"></i>
            <span>Fade Out</span>
          </button>
          <div className="volume-slide-container">
            {volume > 0 ? (
              <i className="material-icons">volume_up</i>
            ) : (
              <i className="material-icons">volume_off</i>
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeSlider}
              className="slider volume-slider"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioWaveform;
