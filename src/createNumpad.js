import fs from "fs";

const octaveDownIcon = fs.readFileSync("./public/icons/octave-down.svg", "utf8");
const octaveMiddleIcon = fs.readFileSync("./public/icons/octave-middle.svg", "utf8");
const octaveUpIcon = fs.readFileSync("./public/icons/octave-up.svg", "utf8");

export function createNumpad() {
	return `
    <div
      class="octave-controls"
      aria-label="Press - and + to change the octave"
      title="Press - and + to change the octave"
    >
      Octave
      <div class="octave-controls-container">
        ${octaveDownIcon}
        ${octaveMiddleIcon}
        ${octaveUpIcon}
      </div>
    </div>
    <div class="numpad-key-grid">
      <div
        class="numpad-key button"
        id="key7"
        aria-hidden="true"
      >
        7 <span class="numpad-key-note">B4</span>
      </div>
      <div
        class="numpad-key button"
        id="key8"
        aria-hidden="true"
      >
        8 <span class="numpad-key-note">C5</span>
      </div>
      <div
        class="numpad-key button"
        id="key9"
        aria-hidden="true"
      >
        9 <span class="numpad-key-note">D5</span>
      </div>
      <div
        class="numpad-key button"
        id="key4"
        aria-hidden="true"
      >
        4 <span class="numpad-key-note">F4</span>
      </div>
      <div
        class="numpad-key button"
        id="key5"
        aria-hidden="true"
      >
        5 <span class="numpad-key-note">G4</span>
      </div>
      <div
        class="numpad-key button"
        id="key6"
        aria-hidden="true"
      >
        6 <span class="numpad-key-note">A4</span>
      </div>
      <div
        class="numpad-key button"
        id="key1"
        aria-hidden="true"
      >
        1 <span class="numpad-key-note">C4</span>
      </div>
      <div
        class="numpad-key button"
        id="key2"
        aria-hidden="true"
      >
        2 <span class="numpad-key-note">D4</span>
      </div>
      <div
        class="numpad-key button"
        id="key3"
        aria-hidden="true"
      >
        3 <span class="numpad-key-note">E4</span>
      </div>
      <div
        class="numpad-key button"
        id="key0"
        aria-hidden="true"
      >
        0 <span class="numpad-key-note">E5</span>
      </div>
      <button
        id="volume-button"
        type="button"
        role="button"
        aria-label="Volume"
        tabindex="0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          viewBox="0 0 75 75"
          aria-hidden="true"
        >
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
    </div>
  `;
}
