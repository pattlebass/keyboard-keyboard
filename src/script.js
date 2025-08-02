import * as audioManager from "./audioManager.js";
import { songs } from "./songs.js";
import * as numpad from "./numpad.js";
import * as utils from "./utils.js";

const songSelect = document.getElementById("song-select");
const songLabel = document.getElementById("song-label");
const songCreationField = document.getElementById("song-field");
const playButton = document.getElementById("play-button");
const submitButton = document.getElementById("submit-button");
const volumeButton = document.getElementById("volume-button");

// Initialization
loadSongList();
numpad.loadButtons();
addNumpadEventListeners();
addSubmissionEventListeners();
audioManager.loadPlayers();
numpad.refreshOctave(audioManager.octaveBase, audioManager.octaveUp - audioManager.octaveDown);
if (songCreationField.value.trim() === "") {
	submitButton.disabled = true;
}

// Events
document.addEventListener("keydown", (event) => {
	if (!event.repeat && (event.key === "+" || event.key === "=")) {
		audioManager.setOctaveUp(true);
		numpad.refreshOctave(audioManager.octaveBase, audioManager.octaveUp - audioManager.octaveDown);
	}
	if (!event.repeat && event.key === "-") {
		audioManager.setOctaveDown(true);
		numpad.refreshOctave(audioManager.octaveBase, audioManager.octaveUp - audioManager.octaveDown);
	}

	if (!event.repeat && utils.isNumeric(event.key)) {
		audioManager.playKey(Number(event.key));
		numpad.pressKey(event.key);
	}
});

document.addEventListener("keyup", (event) => {
	if (!event.repeat && (event.key === "+" || event.key === "=")) {
		audioManager.setOctaveUp(false);
		numpad.refreshOctave(audioManager.octaveBase, audioManager.octaveUp - audioManager.octaveDown);
	}
	if (!event.repeat && event.key === "-") {
		audioManager.setOctaveDown(false);
		numpad.refreshOctave(audioManager.octaveBase, audioManager.octaveUp - audioManager.octaveDown);
	}

	if (utils.isNumeric(event.key)) {
		numpad.unpressKey(event.key);
	}
});

songSelect.addEventListener("change", (event) => {
	songLabel.innerText = songs[songSelect.value].song;
});

volumeButton.addEventListener("click", (event) => {
	if (volumePercentage === 100) {
		volumePercentage = 33;

		// HACK
		document.getElementById("volume-icon-line1").style.visibility = "visible";
		document.getElementById("volume-icon-line2").style.visibility = "hidden";
		document.getElementById("volume-icon-line3").style.visibility = "hidden";
	} else if (volumePercentage === 33) {
		volumePercentage = 66;

		document.getElementById("volume-icon-line1").style.visibility = "visible";
		document.getElementById("volume-icon-line2").style.visibility = "visible";
		document.getElementById("volume-icon-line3").style.visibility = "hidden";
	} else if (volumePercentage === 66) {
		volumePercentage = 100;

		document.getElementById("volume-icon-line1").style.visibility = "visible";
		document.getElementById("volume-icon-line2").style.visibility = "visible";
		document.getElementById("volume-icon-line3").style.visibility = "visible";
	}

	for (const notePlayers of players) {
		if (notePlayers != null) {
			for (const player of notePlayers) {
				player.volume = volumePercentage / 100.0;
			}
		}
	}
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
		button.addEventListener("click", audioManager.playKey.bind(null, i));
	}
}

function addSubmissionEventListeners() {
	playButton.addEventListener("click", playSong);
	submitButton.addEventListener("click", submitSong);
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
