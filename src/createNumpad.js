import fs from "fs";
import { html } from "./build-utils.js";
import { getKeyLabel } from "./numpad.js";
import { octaveBase } from "./audioManager.js";

const indicatorIcon = fs.readFileSync("./public/icons/indicator-icon.svg", "utf8");

export function createNumpad() {
	const indicatorDescription = `S - Toggle Sustain\nO or -/+ - Change Octave\n# - Hold to Activate Sharps`;
	return html`
		<div class="indicators-container" title="${indicatorDescription}">
			<div class="indicator">
				<span class="indicator-text">S</span>
				${indicatorIcon.replace("_id_", `id="sustain-indicator"`)}
			</div>
			<div class="indicator">
				<span class="indicator-text">O</span>
				${indicatorIcon.replace("_id_", `id="octave-indicator"`)}
			</div>
			<div class="indicator">
				<span class="indicator-text">#</span>
				${indicatorIcon.replace("_id_", `id="sharps-indicator"`)}
			</div>
		</div>
		<div class="numpad-key-grid">${getNumpadGridButtons()} ${getVolumeButton()}</div>
	`;
}

function getVolumeButton() {
	return html`
		<button id="volume-button" type="button" role="button" aria-label="Volume" tabindex="0">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 75 75" aria-hidden="true">
				<path
					d="M39.389 13.769 22.235 28.606 6 28.606 6 47.699 21.989 47.699 39.389 62.75 39.389 13.769z"
					style="stroke-width: 5; stroke-linejoin: round"
				/>
				<path
					id="volume-icon-line1"
					d="M48 27.6a19.5 19.5 0 0 1 0 21.4"
					style="fill: none; stroke-width: 5; stroke-linecap: round"
				/>
				<path
					id="volume-icon-line2"
					d="M55.1 20.5a30 30 0 0 1 0 35.6"
					style="fill: none; stroke-width: 5; stroke-linecap: round"
				/>
				<path
					id="volume-icon-line3"
					d="M61.6 14a38.8 38.8 0 0 1 0 48.6"
					style="fill: none; stroke-width: 5; stroke-linecap: round"
				/>
			</svg>
		</button>
	`;
}

function getNumpadGridButtons() {
	let grid = "";
	const keys = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

	for (const key of keys) {
		grid += html`
			<div class="numpad-key button" id="key${key}" aria-hidden="true">
				${key} <span class="numpad-key-note">${getKeyLabel(key, octaveBase, 0, 0)}</span>
			</div>
		`;
	}

	return grid;
}
