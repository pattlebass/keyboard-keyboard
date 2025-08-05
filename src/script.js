import * as audioManager from "./audioManager.js";
import { songs } from "./songs.js";
import * as numpad from "./numpad.js";
import * as utils from "./utils.js";

const MIN_OCTAVE = 3;
const MAX_OCTAVE = 5;

const songSelect = document.getElementById("song-select");
const songLabel = document.getElementById("song-label");
const songCreationField = document.getElementById("song-field");
const playButton = document.getElementById("play-button");
const submitButton = document.getElementById("submit-button");
const volumeButton = document.getElementById("volume-button");

const volumeSteps = 3;
let volumeStep = 2;

// Initialization
loadSongList();
numpad.loadButtons();
addNumpadEventListeners();
addSubmissionEventListeners();
audioManager.loadPlayers();
numpad.refreshOctave(audioManager.octaveBase, audioManager.semitoneUp);
numpad.setSustain(audioManager.sustain);
numpad.setSemitoneUp(audioManager.semitoneUp);
if (songCreationField.value.trim() === "") {
	submitButton.disabled = true;
}

// Events
document.addEventListener("keydown", (event) => {
	if (!event.repeat && (event.key === "+" || event.key === "=")) {
		audioManager.setOctaveBase(Math.min(audioManager.octaveBase + 1, MAX_OCTAVE));
		numpad.refreshOctave(audioManager.octaveBase, audioManager.semitoneUp);
	}

	if (!event.repeat && event.key === "-") {
		audioManager.setOctaveBase(Math.max(audioManager.octaveBase - 1, MIN_OCTAVE));
		numpad.refreshOctave(audioManager.octaveBase, audioManager.semitoneUp);
	}

	if (!event.repeat && event.key === "o") {
		let octave = audioManager.octaveBase;
		if (octave < MAX_OCTAVE) {
			audioManager.setOctaveBase(Math.min(octave + 1, MAX_OCTAVE));
		} else {
			audioManager.setOctaveBase(MIN_OCTAVE);
		}
		numpad.refreshOctave(audioManager.octaveBase, audioManager.semitoneUp);
	}

	if (!event.repeat && event.key === " ") {
		audioManager.setSemitoneUp(true);
		numpad.setSemitoneUp(audioManager.semitoneUp);
		numpad.refreshOctave(audioManager.octaveBase, audioManager.semitoneUp);
		event.preventDefault();
	}

	if (!event.repeat && event.key === "s") {
		audioManager.setSustain(!audioManager.sustain);
		numpad.setSustain(audioManager.sustain);
	}

	if (!event.repeat && utils.isNumeric(event.key)) {
		playKey(Number(event.key));
		numpad.pressKey(event.key);
	}
});

document.addEventListener("keyup", (event) => {
	if (!event.repeat && event.key === " ") {
		audioManager.setSemitoneUp(false);
		numpad.setSemitoneUp(audioManager.semitoneUp);
		numpad.refreshOctave(audioManager.octaveBase, audioManager.semitoneUp);
	}

	if (utils.isNumeric(event.key)) {
		numpad.unpressKey(event.key);
		if (!audioManager.sustain) {
			audioManager.stopKey(event.key);
		}
	}
});

songSelect.addEventListener("change", (event) => {
	songLabel.innerText = songs[songSelect.value].song;
});

volumeButton.addEventListener("click", (event) => {
	volumeStep = (volumeStep + 1) % volumeSteps;
	numpad.setVolume(volumeStep);
	audioManager.setVolume((volumeStep + 1) / volumeSteps);
});

songCreationField.addEventListener("change", (event) => {
	submitButton.disabled = songCreationField.value.trim() === "";
});

function loadSongList() {
	for (const [i, song] of songs.entries()) {
		const option = document.createElement("option");
		option.value = i;
		option.innerText = songs[i].title;
		songSelect.appendChild(option);
	}
	songLabel.innerText = songs[songSelect.value].song;
}

function addNumpadEventListeners() {
	for (const [i, button] of numpad.buttons.entries()) {
		button.addEventListener("click", playKey.bind(null, i));
	}
}

function addSubmissionEventListeners() {
	playButton.addEventListener("click", playSong);
	submitButton.addEventListener("click", submitSong);
}

function playKey(key) {
	audioManager.playNote(
		audioManager.getNoteFromKey(key, audioManager.octaveBase, audioManager.semitoneUp)
	);
}

async function playSong() {
	playButton.disabled = true;
	audioManager.playSong(songCreationField.value);
	playButton.disabled = false;
}

function submitSong() {
	let link =
		deobvs("fZbemh3") +
		deobvs("XI\\\\TMJI[[\u0016LM^(OUIQT\u0016KWU") +
		"?subject=[KBKB] Song Suggestion" +
		`&body=TITLE:<insert song title here>%0D%0ASONG:%0D%0A${encodeURI(songCreationField.value)}`;
	location.href = link;
}

function deobvs(text) {
	let new_text = "";
	for (let i = 0; i < text.length; i++) {
		new_text += String.fromCharCode(text.charCodeAt(i) + text.length);
	}
	return new_text;
}

function obvs(text) {
	let new_text = "";
	for (let i = 0; i < text.length; i++) {
		new_text += String.fromCharCode(text.charCodeAt(i) - text.length);
	}
	return new_text;
}
