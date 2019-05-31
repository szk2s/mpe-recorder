import mpeInstrument from 'mpe';

const sequencer = {
  mpeInstrument: mpeInstrument({}),
  isPlaying: false,
  isRecording: false,
  noteSequence: [],
  startTimeStamp: 0
};

const startRecording = () => {
  sequencer.isRecording = true;
  /* eslint-disable no-undef */
  sequencer.startTimeStamp = window.performance.now();
};

const stopPlayingAndRecording = () => {
  sequencer.isPlaying = false;
  sequencer.isRecording = false;
};

const onMidi = (event) => {
  // @ts-ignore
  sequencer.mpeInstrument.processMidiMessage(event.data);
  console.log(event.data);
  if (sequencer.isRecording) {
    // @ts-ignore
    const activeNotes = sequencer.mpeInstrument.activeNotes();
    const elapsedMs = event.timeStamp - sequencer.startTimeStamp;
    sequencer.noteSequence.push({ elapsedMs, activeNotes });
  }
};
/* eslint-disable no-undef */
window.onload = () => {
  /* eslint-disable no-undef */
  document.getElementById('play').addEventListener('click', console.log);
  document.getElementById('record').addEventListener('click', startRecording);
  document
    .getElementById('stop')
    .addEventListener('click', stopPlayingAndRecording);
  /* eslint-disable no-undef */
  //@ts-ignore
  window.navigator.requestMIDIAccess().then((access) => {
    access.inputs.forEach((midiInput) => {
      midiInput.addEventListener('midimessage', onMidi);
    });
  });
};
