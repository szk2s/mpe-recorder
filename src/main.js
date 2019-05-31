// @ts-nocheck
import mpeInstrument from "mpe";

const addHandler = handler => {
  // Request MIDI device access from the Web MIDI API
  /* eslint-disable no-undef */
  window.navigator.requestMIDIAccess().then(access => {
    // Iterate over the list of inputs returned
    access.inputs.forEach(midiInput => {
      // Send 'midimessage' events to the mpe.js `instrument` instance
      midiInput.addEventListener("midimessage", handler);
    });
  });
};

const main = () => {
  // Define `instrument` as an instance of `mpeInstrument`
  const instrument = mpeInstrument({});
  const onMidiMessage = event => {
    console.log(event.timeStamp);
    instrument.processMidiMessage(event.data);
    console.log(instrument.activeNotes());
  };
  addHandler(onMidiMessage);
};

main();
