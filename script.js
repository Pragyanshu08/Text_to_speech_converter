const voiceSelect = document.getElementById("voiceSelect");
    const rate = document.getElementById("rate");
    const pitch = document.getElementById("pitch");
    const volume = document.getElementById("volume");

    const rateVal = document.getElementById("rateValue");
    const pitchVal = document.getElementById("pitchValue");
    const volumeVal = document.getElementById("volumeValue");

    rate.oninput = () => rateVal.textContent = rate.value;
    pitch.oninput = () => pitchVal.textContent = pitch.value;
    volume.oninput = () => volumeVal.textContent = volume.value;

    let voices = [];

    function loadVoices() {
      voices = speechSynthesis.getVoices();
      voiceSelect.innerHTML = "";
      voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})${voice.default ? " — Default" : ""}`;
        voiceSelect.appendChild(option);
      });
    }

    speechSynthesis.onvoiceschanged = loadVoices;
    window.onload = loadVoices;

    function speakText() {
      const text = document.getElementById("text").value.trim();
      if (!text) {
        Toastify({
          text: "❌ Please enter some text!",
          backgroundColor: "#ff4d4d",
          duration: 3000,
        }).showToast();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices[voiceSelect.value];
      utterance.rate = parseFloat(rate.value);
      utterance.pitch = parseFloat(pitch.value);
      utterance.volume = parseFloat(volume.value);

      speechSynthesis.cancel(); // Stop any existing speech
      speechSynthesis.speak(utterance);

      Toastify({
        text: "✅ Speaking...",
        backgroundColor: "#00cc66",
        duration: 3000,
      }).showToast();
    }