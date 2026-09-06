// =========================================================
// ClipCraft - Video Editor Workspace
// Owner: Nutan Dhepe
// =========================================================
import {
  editorStates,
  setEditorState,
} from "./states.js";

let currentVideoObjectUrl = null;

function getCurrentProjectId() {
  const projects = JSON.parse(
    localStorage.getItem("clipcraft_projects") || "[]"
  );

  const project = projects.find(
    (item) => item.videoName === window.clipcraftSelectedFile?.name
  );

  return project?.id || null;
}

function saveProjectEditorState(state) {
  const projectId = getCurrentProjectId();

  if (!projectId || !state) {
    return;
  }

  const key = `clipcraft_editor_state_${projectId}`;

  localStorage.setItem(
    key,
    JSON.stringify(state)
  );

  console.log(
    "ClipCraft: Project editor state saved."
  );
}

function loadProjectEditorState() {
  const projectId = getCurrentProjectId();

  if (!projectId) {
    return null;
  }

  const key = `clipcraft_editor_state_${projectId}`;

  const savedState = localStorage.getItem(key);

  if (!savedState) {
    return null;
  }

  try {
    return JSON.parse(savedState);
  } catch (error) {
    console.error(
      "ClipCraft: Unable to load saved editor state.",
      error
    );

    return null;
  }
}

const editorHistory = [];
let historyIndex = -1;

function saveEditorHistory(state) {
  if (!state) {
    return;
  }

  editorHistory.splice(historyIndex + 1);

  editorHistory.push({
    ...state,
  });

  historyIndex = editorHistory.length - 1;

  console.log(
    "ClipCraft: Editor state saved to history."
  );
}

function getEditorHistorySnapshot() {
  const video = document.getElementById("editor-video");

  if (!video) {
    return null;
  }

  return {
    speed: video.playbackRate,
    volume: video.volume,
    muted: video.muted,

    trimStart: video.dataset.trimStart
      ? Number(video.dataset.trimStart)
      : null,

    trimEnd: video.dataset.trimEnd
      ? Number(video.dataset.trimEnd)
      : null,

    currentTime: video.currentTime,
    splitTime: video.dataset.splitTime
      ? Number(video.dataset.splitTime)
      : null,

    rotation: video.dataset.rotation
      ? Number(video.dataset.rotation)
      : 0,

    flipX: video.dataset.flipX
      ? Number(video.dataset.flipX)
      : 1,

    flipY: video.dataset.flipY
      ? Number(video.dataset.flipY)
      : 1,

    cropAspectRatio: video.dataset.cropAspectRatio || "original",
    textOverlay: document.getElementById(
      "editor-text-overlay"
    )?.textContent || "",

    textPosition:
      document.getElementById(
        "editor-text-overlay"
      )?.classList.contains("text-position-top")
        ? "top"
        : document.getElementById(
            "editor-text-overlay"
          )?.classList.contains("text-position-bottom")
          ? "bottom"
          : "center",
  };
}

function updateHistoryButtons() {
  const undoButton = document.getElementById(
    "editor-undo-button"
  );

  const redoButton = document.getElementById(
    "editor-redo-button"
  );

  if (undoButton) {
    undoButton.disabled = historyIndex <= 0;
  }

  if (redoButton) {
    redoButton.disabled =
      historyIndex >= editorHistory.length - 1;
  }
}

function restoreEditorHistoryState(state) {
  if (!state) {
    return;
  }

  const video = document.getElementById("editor-video");

  if (!video) {
    return;
  }

  video.playbackRate = state.speed ?? 1;
  video.volume = state.volume ?? 1;
  video.muted = state.muted ?? false;

  if (state.trimStart !== null && state.trimStart !== undefined) {
    video.dataset.trimStart = state.trimStart;
  } else {
    delete video.dataset.trimStart;
  }

  if (state.trimEnd !== null && state.trimEnd !== undefined) {
    video.dataset.trimEnd = state.trimEnd;
  } else {
    delete video.dataset.trimEnd;
  }

  if (Number.isFinite(state.currentTime)) {
    video.currentTime = Math.min(
      state.currentTime,
      video.duration || state.currentTime
    );
  }

  const rotation = state.rotation ?? 0;
  const flipX = state.flipX ?? 1;
  const flipY = state.flipY ?? 1;

  video.style.transform =
    `rotate(${rotation}deg) scale(${flipX}, ${flipY})`;

  video.dataset.rotation = rotation;
  video.dataset.flipX = flipX;
  video.dataset.flipY = flipY;
  video.dataset.cropAspectRatio = state.cropAspectRatio || "original";
  const textOverlay = document.getElementById(
    "editor-text-overlay"
  );

  if (textOverlay) {
    textOverlay.textContent = state.textOverlay || "";

    textOverlay.classList.remove(
      "text-position-center",
      "text-position-top",
      "text-position-bottom"
    );

    textOverlay.classList.add(
      `text-position-${state.textPosition || "center"}`
    );

    textOverlay.setAttribute(
      "aria-hidden",
      state.textOverlay ? "false" : "true"
    );
  }


  updateHistoryButtons();

  console.log(
    "ClipCraft: Editor state restored from history."
  );
}

export function initEditor(
  container = document.getElementById("mainView"),
  initialVideoFile = null
) {
  const app = container;
  
  if (!app) {
    console.error("ClipCraft: #app element was not found.");
    return;
  }

  const editorWorkspace = document.createElement("section");

  editorWorkspace.className = "editor-workspace";

  editorWorkspace.innerHTML = `
    <!-- ================================================
         Editor Toolbar
         ================================================ -->

    <header class="editor-toolbar">

      <div class="editor-project-info">
        <div>
          <h1 class="editor-project-title">ClipCraft Editor</h1>
          <span class="editor-project-status">
            Ready to edit
          </span>
        </div>
      </div>

      <div class="editor-toolbar-actions">
        <button
          type="button"
          class="btn"
          id="editor-undo-button"
        >
          Undo
        </button>

        <button
          type="button"
          class="btn"
          id="editor-redo-button"
        >
          Redo
        </button>

        <button
          type="button"
          class="btn btn-primary"
          id="editor-export-button"
        >
          Export
        </button>
      </div>

    </header>


    <!-- ================================================
         Main Editor Area
         ================================================ -->

    <div class="editor-main">

      <!-- ============================================
           Tool Panel
           ============================================ -->

      <aside class="editor-tools">

        <h2 class="editor-panel-title">
          Tools
        </h2>

        <div class="editor-tool-list">

          <button
            type="button"
            class="editor-tool-button active"
            data-tool="media"
          >
            Media
          </button>

          <div class="editor-media-upload">
            <input
              type="file"
              id="media-video-input"
              accept="video/*"
              hidden
            />

            <button
              type="button"
              class="btn btn-primary"
              id="editor-upload-button"
            >
              Upload Video
            </button>
          </div>

          <button
            type="button"
            class="editor-tool-button"
            data-tool="trim"
          >
            Trim
          </button>

          <button
            type="button"
            class="editor-tool-button"
            data-tool="split"
          >
            Split
          </button>

          <button
            type="button"
            class="editor-tool-button"
            data-tool="speed"
          >
            Speed
          </button>

          <button
            type="button"
            class="editor-tool-button"
            data-tool="volume"
          >
            Volume
          </button>

          <button
            type="button"
            class="editor-tool-button"
            data-tool="transform"
          >
            Transform
          </button>

          <button
            type="button"
            class="editor-tool-button"
            data-tool="crop"
          >
            Crop
          </button>

          <button
            type="button"
            class="editor-tool-button"
            data-tool="text"
          >
            Text
          </button>

        </div>

      </aside>


      <!-- ============================================
           Video Preview
           ============================================ -->

      <section class="editor-preview">

        <div class="editor-preview-header">

          <span class="editor-preview-title">
            Preview
          </span>

          <span
            class="editor-project-status"
            id="preview-status"
          >
            No video loaded
          </span>

        </div>

        <div
          class="editor-preview-content"
          id="editor-preview-content"
        >

          <div class="editor-empty-preview">

            <h3>
              No video selected
            </h3>

            <p>
              Upload a video to begin editing.
            </p>

          </div>

        </div>

      </section>


      <!-- ============================================
           Properties Panel
           ============================================ -->

      <aside class="editor-properties">

        <h2 class="editor-panel-title">
          Properties
        </h2>

        <div
          class="editor-property-placeholder"
          id="editor-properties-content"
        >
          Select a tool or video clip to view
          editing properties.
        </div>

      </aside>

    </div>


    <!-- ================================================
         Playback Controls
         ================================================ -->

    <section class="editor-playback">

      <button
        type="button"
        class="editor-playback-button"
        id="editor-play-button"
        aria-label="Play video"
      >
        ▶
      </button>

      <div
        class="editor-time-display"
        id="editor-time-display"
      >
        00:00 / 00:00
      </div>

      <button
        type="button"
        class="editor-playback-button"
        id="editor-mute-button"
        aria-label="Mute video"
      >
        🔊
      </button>

    </section>


    <!-- ================================================
         Timeline
         ================================================ -->

    <section class="editor-timeline">

      <div class="timeline-header">

        <h2 class="timeline-title">
          Timeline
        </h2>

        <span
          class="editor-project-status"
          id="timeline-status"
        >
          No media
        </span>

      </div>

      <div class="timeline-ruler">

        <span>00:00</span>
        <span>00:05</span>
        <span>00:10</span>
        <span>00:15</span>
        <span>00:20</span>

      </div>

      <div class="timeline-track">

        <div class="timeline-clip">
          No video loaded
        </div>

      </div>

    </section>
  `;

  app.appendChild(editorWorkspace);

  initializeToolSelection();
  initializeVideoUpload();
  initializeVideoPlayback();
  initializeTimelineSeeking();

  if (initialVideoFile) {
    const videoInput = app.querySelector('input[type="file"]');

    if (videoInput) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(initialVideoFile);

      videoInput.files = dataTransfer.files;
      videoInput.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
}


function initializeToolSelection() {
  const undoButton = document.getElementById(
    "editor-undo-button"
  );

  const redoButton = document.getElementById(
    "editor-redo-button"
  );

  if (undoButton) {
    undoButton.disabled = true;
  }

  if (redoButton) {
    redoButton.disabled = true;
  }

  if (undoButton) {
    undoButton.addEventListener("click", () => {
      if (historyIndex <= 0) {
        return;
      }

      historyIndex -= 1;

      restoreEditorHistoryState(
        editorHistory[historyIndex]
      );    
         
      console.log(
        "ClipCraft: Undo action triggered."
      );

      updateHistoryButtons();
    });
  }

  if (redoButton) {
    redoButton.addEventListener("click", () => {
      if (
        historyIndex >=
        editorHistory.length - 1
      ) {
        return;
      }

      historyIndex += 1;

      restoreEditorHistoryState(
        editorHistory[historyIndex]
      );

      console.log(
        "ClipCraft: Redo action triggered."
      );

      updateHistoryButtons();
    });
  }

  const exportButton = document.getElementById(
    "editor-export-button"
  );

  if (exportButton) {
    exportButton.addEventListener("click", () => {
      console.log(
        "ClipCraft: Export button clicked."
      );
      renderExportProperties();
    });
  }

  const toolButtons = document.querySelectorAll(
    ".editor-tool-button"
  );

  toolButtons.forEach((button) => {
    button.addEventListener("click", () => {

      toolButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      const selectedTool = button.dataset.tool;

      console.log(
        `ClipCraft editor tool selected: ${selectedTool}`
      );

      handleToolSelection(selectedTool);

      if (
        selectedTool !== "trim" &&
        selectedTool !== "split" &&
        selectedTool !== "speed" &&
        selectedTool !== "volume" &&
        selectedTool !== "transform"
      ) {
        resetPropertiesPanel();
      }
      
    });
  });
}

function handleToolSelection(tool) {
  const propertiesPanel = document.querySelector(
    ".editor-properties"
  );

  if (!propertiesPanel) {
    console.error(
      "ClipCraft: Properties panel was not found."
    );
    return;
  }

  if (tool === "split") {
    renderSplitProperties();
    return;
  }

  if (tool === "speed") {
    renderSpeedProperties();
    return;
  }

  if (tool === "volume") {
    renderVolumeProperties();
    return;
  }

  if (tool === "transform") {
    renderTransformProperties();
    return;
  }

  if (tool === "crop") {
    renderCropProperties();
    initializeCropControls();
    return;
  }

  if (tool === "text") {
    renderTextProperties();
    initializeTextControls();
    return;
  }

  if (tool === "trim") {
    showTrimProperties();
    return;
  }

  if (tool === "media") {
    propertiesPanel.innerHTML = `
      <h2 class="editor-panel-title">
        Properties
      </h2>

      <div class="editor-property-placeholder">
        Select a tool or video clip to view
        editing properties.
      </div>
    `;

    return;
  }
}

function renderExportProperties() {
  const propertiesPanel = document.querySelector(
    ".editor-properties"
  );

  if (!propertiesPanel) {
    console.error(
      "ClipCraft: Properties panel was not found."
    );
    return;
  }

  propertiesPanel.innerHTML = `
    <h2 class="editor-panel-title">
      Export
    </h2>

    <div class="editor-property-placeholder">

      <p>
        Export your edited video.
      </p>

      <label for="export-format-select">
        Format
      </label>

      <select
        id="export-format-select"
        class="editor-speed-select"
      >
        <option value="mp4" selected>
          MP4
        </option>
      </select>

      <label for="export-quality-select">
        Quality
      </label>

      <select
        id="export-quality-select"
        class="editor-speed-select"
      >
        <option value="720p">
          720p
        </option>

        <option value="1080p" selected>
          1080p
        </option>
      </select>

      <button
        type="button"
        class="btn btn-primary"
        id="editor-start-export-button"
      >
        Start Export
      </button>

      <div
        id="export-status"
        class="editor-property-placeholder"
      >
        Ready to export.
      </div>

    </div>
  `;

  const startExportButton = document.getElementById(
    "editor-start-export-button"
  );

  if (startExportButton) {
    startExportButton.addEventListener("click", () => {
      const exportStatus = document.getElementById(
        "export-status"
      );

      if (!exportStatus) {
        console.error(
          "ClipCraft: Export status element was not found."
        );
        return;
      }

      setEditorState(editorStates.processing);
      startExportButton.disabled = true;
      startExportButton.textContent = "Exporting...";

      exportStatus.textContent =
        "Exporting video. Please wait...";

      console.log(
        "ClipCraft: Export process started."
      );
    });
  }

  console.log(
    "ClipCraft: Export properties rendered."
  );
}

function renderTransformProperties() {
  const propertiesPanel = document.querySelector(
    ".editor-properties"
  );

  if (!propertiesPanel) {
    console.error(
      "ClipCraft: Editor properties panel was not found."
    );
    return;
  }

  propertiesPanel.innerHTML = `
    <h2 class="editor-panel-title">
      Transform
    </h2>

    <div class="editor-property-placeholder">

      <p>
        Rotate or flip the video preview.
      </p>

      <div class="editor-property-group">

        <button
          type="button"
          class="btn"
          id="editor-rotate-left-button"
        >
          Rotate Left
        </button>

        <button
          type="button"
          class="btn"
          id="editor-rotate-right-button"
        >
          Rotate Right
        </button>

      </div>

      <div class="editor-property-group">

        <button
          type="button"
          class="btn"
          id="editor-flip-horizontal-button"
        >
          Flip Horizontal
        </button>

        <button
          type="button"
          class="btn"
          id="editor-flip-vertical-button"
        >
          Flip Vertical
        </button>

      </div>

      <button
        type="button"
        class="btn btn-primary"
        id="editor-reset-transform-button"
      >
        Reset Transform
      </button>

      <div
        id="transform-status"
        class="editor-property-placeholder"
      >
        Rotation: 0° | Flip: None
      </div>

    </div>
  `;

  initializeTransformControls();
}

function renderCropProperties() {
  const propertiesPanel = document.querySelector(
    ".editor-properties"
  );

  if (!propertiesPanel) {
    console.error(
      "ClipCraft: Editor properties panel was not found."
    );
    return;
  }

  propertiesPanel.innerHTML = `
    <div class="editor-crop-properties">

      <div class="editor-property-group">

        <label for="crop-aspect-ratio">
          Aspect Ratio
        </label>

        <select
          id="crop-aspect-ratio"
          class="editor-property-input"
        >
          <option value="original">Original</option>
          <option value="16:9">16:9</option>
          <option value="9:16">9:16</option>
          <option value="1:1">1:1</option>
          <option value="4:3">4:3</option>
        </select>

      </div>

      <div class="editor-property-group">

        <span class="editor-property-label">
          Crop
        </span>

        <p class="editor-property-description">
          Choose an aspect ratio for your video.
        </p>

      </div>

      <button
        type="button"
        class="btn btn-primary"
        id="apply-crop-button"
      >
        Apply Crop
      </button>

      <button
        type="button"
        class="btn"
        id="reset-crop-button"
      >
        Reset Crop
      </button>

      <div
        class="editor-transform-status"
        id="crop-status"
      >
        Original aspect ratio selected
      </div>

    </div>
  `;
}

function renderTextProperties() {
  const propertiesPanel = document.querySelector(
    ".editor-properties"
  );

  if (!propertiesPanel) {
    console.error(
      "ClipCraft: Editor properties panel was not found."
    );
    return;
  }

  propertiesPanel.innerHTML = `
    <div class="editor-text-properties">

      <div class="editor-property-group">

        <label for="text-overlay-input">
          Text
        </label>

        <input
          type="text"
          id="text-overlay-input"
          class="editor-property-input"
          placeholder="Enter text"
          maxlength="200"
        />

      </div>

      <button
        type="button"
        class="btn btn-primary"
        id="add-text-button"
      >
        Add Text
      </button>

      <div class="editor-property-group">

        <label for="text-position-select">
          Position
        </label>

        <select
          id="text-position-select"
          class="editor-property-input"
        >
          <option value="center">Center</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>

      </div>

      <button
        type="button"
        class="btn"
        id="clear-text-button"
      >
        Clear Text
      </button>

      <div
        class="editor-transform-status"
        id="text-status"
      >
        Enter text and click Add Text
      </div>

    </div>
  `;
}

function initializeTextControls() {
  const textInput = document.getElementById(
    "text-overlay-input"
  );

  const addTextButton = document.getElementById(
    "add-text-button"
  );

  const clearTextButton = document.getElementById(
    "clear-text-button"
  );

  const textStatus = document.getElementById(
    "text-status"
  );

  const textPositionSelect = document.getElementById(
    "text-position-select"
  );

  const textOverlay = document.getElementById(
    "editor-text-overlay"
  );

  if (textOverlay && textOverlay.textContent) {
    textInput.value = textOverlay.textContent;
  }

  if (
    !textInput ||
    !addTextButton ||
    !clearTextButton ||
    !textStatus ||
    !textPositionSelect
  ) {
    console.error(
      "ClipCraft: Text controls could not be initialized."
    );
    return;
  }

  addTextButton.addEventListener("click", () => {
    const text = textInput.value.trim();

    if (!text) {
      textStatus.textContent =
        "Please enter some text first.";
      return;
    }

    const textOverlay = document.getElementById(
      "editor-text-overlay"
    );

    if (!textOverlay) {
      textStatus.textContent =
        "Text overlay could not be found.";
      console.error(
        "ClipCraft: Text overlay element was not found."
      );
      return;
    }

    textOverlay.textContent = text;
    textOverlay.setAttribute("aria-hidden", "false");

    const selectedPosition =
      textPositionSelect.value;

    textOverlay.classList.remove(
      "text-position-center",
      "text-position-top",
      "text-position-bottom"
    );

    textOverlay.classList.add(
      `text-position-${selectedPosition}`
    );

    textStatus.textContent =
      `Text added: "${text}"`;
    
    const historyState = getEditorHistorySnapshot();

    if (historyState) {
      saveEditorHistory(historyState);
      saveProjectEditorState(historyState);
      updateHistoryButtons();
    }
  });

  clearTextButton.addEventListener("click", () => {
    textInput.value = "";

    const textOverlay = document.getElementById(
      "editor-text-overlay"
    );

    if (textOverlay) {
      textOverlay.textContent = "";
      textOverlay.setAttribute("aria-hidden", "true");
    }

    textStatus.textContent =
      "Enter text and click Add Text";

    const historyState = getEditorHistorySnapshot();

    if (historyState) {
      saveEditorHistory(historyState);
      saveProjectEditorState(historyState);
      updateHistoryButtons();
    }

    console.log(
      "ClipCraft: Text overlay cleared."
    );
  });
}

function initializeCropControls() {
  const video = document.getElementById("editor-video");
  const aspectRatioSelect = document.getElementById("crop-aspect-ratio");
  const applyCropButton = document.getElementById("apply-crop-button");
  const resetCropButton = document.getElementById("reset-crop-button");
  const cropStatus = document.getElementById("crop-status");
  const previewContent = document.getElementById(
    "editor-preview-content"
  );

  function updateCropPreview(ratio) {
    if (!previewContent) {
      return;
    }

    previewContent.classList.remove(
      "crop-16-9",
      "crop-9-16",
      "crop-1-1",
      "crop-4-3"
    );

    if (ratio !== "original") {
      previewContent.classList.add(
        `crop-${ratio.replace(":", "-")}`
      );
    }
  }

  updateCropPreview(
    video.dataset.cropAspectRatio || "original"
  );

  if (
    !video ||
    !aspectRatioSelect ||
    !applyCropButton ||
    !resetCropButton ||
    !cropStatus
  ) {
    console.error(
      "ClipCraft: Crop controls could not be initialized."
    );
    return;
  }

  const currentCrop =
    video.dataset.cropAspectRatio || "original";

  aspectRatioSelect.value = currentCrop;

  cropStatus.textContent =
    currentCrop === "original"
      ? "Original aspect ratio selected"
      : `Crop ratio: ${currentCrop}`;

  applyCropButton.addEventListener("click", () => {
    const selectedRatio = aspectRatioSelect.value;

    video.dataset.cropAspectRatio = selectedRatio;
    updateCropPreview(selectedRatio);

    cropStatus.textContent =
      selectedRatio === "original"
        ? "Original aspect ratio selected"
        : `Crop ratio: ${selectedRatio}`;

    const historyState = getEditorHistorySnapshot();

    if (historyState) {
      saveEditorHistory(historyState);
      saveProjectEditorState(historyState);
      updateHistoryButtons();
    }
  });

  resetCropButton.addEventListener("click", () => {
    aspectRatioSelect.value = "original";

    video.dataset.cropAspectRatio = "original";

    updateCropPreview("original");

    cropStatus.textContent =
      "Original aspect ratio selected";

    const historyState = getEditorHistorySnapshot();

    if (historyState) {
      saveEditorHistory(historyState);
      saveProjectEditorState(historyState);
      updateHistoryButtons();
    }
  });
}

function initializeTransformControls() {
  const video = document.getElementById(
    "editor-video"
  );

  const rotateLeftButton = document.getElementById(
    "editor-rotate-left-button"
  );

  const rotateRightButton = document.getElementById(
    "editor-rotate-right-button"
  );

  const flipHorizontalButton = document.getElementById(
    "editor-flip-horizontal-button"
  );

  const flipVerticalButton = document.getElementById(
    "editor-flip-vertical-button"
  );

  const resetButton = document.getElementById(
    "editor-reset-transform-button"
  );

  if (
    !video ||
    !rotateLeftButton ||
    !rotateRightButton ||
    !flipHorizontalButton ||
    !flipVerticalButton ||
    !resetButton
  ) {
    console.warn(
      "ClipCraft: Transform controls require a loaded video."
    );
    return;
  }

  let rotation = Number(
    video.dataset.rotation || 0
  );

  let flipX = Number(
    video.dataset.flipX || 1
  );

  let flipY = Number(
    video.dataset.flipY || 1
  );

  function applyTransform() {
    video.style.transform =
      `rotate(${rotation}deg) scale(${flipX}, ${flipY})`;

    video.dataset.rotation = rotation;
    video.dataset.flipX = flipX;
    video.dataset.flipY = flipY;

    const transformStatus =
      document.getElementById(
        "transform-status"
      );

    if (transformStatus) {
      let flipText = "None";

      if (flipX === -1 && flipY === -1) {
        flipText = "Horizontal + Vertical";
      } else if (flipX === -1) {
        flipText = "Horizontal";
      } else if (flipY === -1) {
        flipText = "Vertical";
      }

      transformStatus.textContent =
        `Rotation: ${rotation}° | Flip: ${flipText}`;
    }

    const transformState =
      getEditorHistorySnapshot();

    if (transformState) {
      saveEditorHistory(transformState);
      saveProjectEditorState(transformState);
      updateHistoryButtons();
    }
  }

  rotateLeftButton.addEventListener(
    "click",
    () => {
      rotation = (rotation - 90 + 360) % 360;

      applyTransform();

      console.log(
        `ClipCraft: Video rotated left to ${rotation}°`
      );
    }
  );

  rotateRightButton.addEventListener(
    "click",
    () => {
      rotation = (rotation + 90) % 360;

      applyTransform();

      console.log(
        `ClipCraft: Video rotated right to ${rotation}°`
      );
    }
  );

  flipHorizontalButton.addEventListener(
    "click",
    () => {
      flipX *= -1;

      applyTransform();

      console.log(
        "ClipCraft: Horizontal flip applied."
      );
    }
  );

  flipVerticalButton.addEventListener(
    "click",
    () => {
      flipY *= -1;

      applyTransform();

      console.log(
        "ClipCraft: Vertical flip applied."
      );
    }
  );

  resetButton.addEventListener(
    "click",
    () => {
      rotation = 0;
      flipX = 1;
      flipY = 1;

      applyTransform();

      console.log(
        "ClipCraft: Transform reset."
      );
    }
  );

  applyTransform();
}

function renderVolumeProperties() {
  const propertiesPanel = document.querySelector(
    ".editor-properties"
  );

  if (!propertiesPanel) {
    return;
  }

  propertiesPanel.innerHTML = `
    <h2 class="editor-panel-title">
      Volume
    </h2>

    <div class="editor-property-placeholder">

      <p>
        Adjust the audio volume of the video.
      </p>

      <label for="video-volume-range">
        Volume
      </label>

      <input
        type="range"
        id="video-volume-range"
        min="0"
        max="100"
        value="0"
        step="1"
      />

      <div
        id="volume-status"
        class="editor-volume-status"
      >
        Volume: 100%
      </div>

      <button
        type="button"
        class="btn"
        id="editor-mute-property-button"
      >
        Mute
      </button>

      <button
        type="button"
        class="btn"
        id="editor-reset-volume-button"
      >
        Reset Volume
      </button>

    </div>
  `;

  initializeVolumeControls();
}

function initializeVolumeControls() {
  const volumeRange = document.getElementById(
    "video-volume-range"
  );

  const volumeStatus = document.getElementById(
    "volume-status"
  );

  const muteButton = document.getElementById(
    "editor-mute-property-button"
  );

  const resetButton = document.getElementById(
    "editor-reset-volume-button"
  );

  if (
    !volumeRange ||
    !volumeStatus ||
    !muteButton ||
    !resetButton
  ) {
    console.error(
      "ClipCraft: Volume controls were not found."
    );
    return;
  }

  const video = document.getElementById(
    "editor-video"
  );

  if (video) {
    volumeRange.value = Math.round(
      video.volume * 100
    );

    updateVolumeStatus(video);

    muteButton.textContent =
      video.muted ? "Unmute" : "Mute";
  }

  volumeRange.addEventListener("input", () => {
    const volume =
      Number(volumeRange.value) / 100;

    applyVideoVolume(volume);
  });

  muteButton.addEventListener("click", () => {
    const video = document.getElementById(
      "editor-video"
    );

    if (!video) {
      console.warn(
        "ClipCraft: No video is loaded."
      );
      return;
    }

    video.muted = !video.muted;

    if (video.muted) {
      muteButton.textContent = "Unmute";
    } else {
      muteButton.textContent = "Mute";
    }

    updateVolumeStatus(video);
  });

  resetButton.addEventListener("click", () => {
    volumeRange.value = "100";

    const video = document.getElementById(
      "editor-video"
    );

    if (video) {
      video.muted = false;
    }

    applyVideoVolume(1);

    muteButton.textContent = "Mute";
  });
}

function applyVideoVolume(volume) {
  const video = document.getElementById(
    "editor-video"
  );

  const volumeStatus = document.getElementById(
    "volume-status"
  );

  if (!video) {
    console.warn(
      "ClipCraft: No video is loaded."
    );
    return;
  }

  if (
    !Number.isFinite(volume) ||
    volume < 0 ||
    volume > 1
  ) {
    console.error(
      "ClipCraft: Invalid volume value."
    );
    return;
  }

  video.volume = volume;

  const volumeState = getEditorHistorySnapshot();

  if (volumeState) {
    saveEditorHistory(volumeState);
    saveProjectEditorState(volumeState);
    updateHistoryButtons();
  }


  if (volumeStatus) {
    volumeStatus.textContent =
      `Volume: ${Math.round(volume * 100)}%`;
  }

  console.log(
    `ClipCraft: Video volume set to ${Math.round(volume * 100)}%`
  );
}


function updateVolumeStatus(video) {
  const volumeStatus = document.getElementById(
    "volume-status"
  );

  if (!volumeStatus || !video) {
    return;
  }

  volumeStatus.textContent =
    `Volume: ${Math.round(video.volume * 100)}%`;
}

function renderSpeedProperties() {
  const propertiesPanel = document.querySelector(
    ".editor-properties"
  );

  if (!propertiesPanel) {
    return;
  }

  propertiesPanel.innerHTML = `
    <h2 class="editor-panel-title">
      Speed
    </h2>

    <div class="editor-property-placeholder">

      <p>
        Adjust the playback speed of the video.
      </p>

      <label for="video-speed-select">
        Playback Speed
      </label>

      <select
        id="video-speed-select"
        class="editor-speed-select"
      >
        <option value="0.25">0.25x</option>
        <option value="0.5">0.5x</option>
        <option value="1" selected>1x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>

      <button
        type="button"
        class="btn btn-primary"
        id="editor-apply-speed-button"
      >
        Apply Speed
      </button>

      <button
        type="button"
        class="btn"
        id="editor-reset-speed-button"
      >
        Reset Speed
      </button>

      <div
        id="speed-status"
        class="editor-speed-status"
      >
        Current speed: 
        <strong id="current-speed-value">1x</strong>
      </div>

    </div>
  `;

  initializeSpeedControls();
}

function initializeSpeedControls() {
  const speedSelect = document.getElementById(
    "video-speed-select"
  );

  const applyButton = document.getElementById(
    "editor-apply-speed-button"
  );

  const resetButton = document.getElementById(
    "editor-reset-speed-button"
  );

  if (
    !speedSelect ||
    !applyButton ||
    !resetButton
  ) {
    console.error(
      "ClipCraft: Speed controls were not found."
    );
    return;
  }

  const video = document.getElementById("editor-video");

  if (video) {
    speedSelect.value = String(video.playbackRate);
  }

  const currentSpeedValue = document.getElementById(
    "current-speed-value"
  );

  if (currentSpeedValue && video) {
    currentSpeedValue.textContent =
      `${video.playbackRate}x`;
  }

  applyButton.addEventListener("click", () => {
    applyVideoSpeed(
      Number(speedSelect.value)
    );
  });

  resetButton.addEventListener("click", () => {
    speedSelect.value = "1";

    applyVideoSpeed(1);
  });
}

function applyVideoSpeed(speed) {
  const video = document.getElementById(
    "editor-video"
  );

  const speedStatus = document.getElementById(
    "speed-status"
  );

  if (!video) {
    console.warn(
      "ClipCraft: No video is loaded."
    );
    return;
  }

  if (
    !Number.isFinite(speed) ||
    speed <= 0
  ) {
    console.error(
      "ClipCraft: Invalid playback speed."
    );
    return;
  }

  video.playbackRate = speed;

  const speedState = getEditorHistorySnapshot();

  if (speedState) {
    saveEditorHistory(speedState);
    saveProjectEditorState(speedState);
    updateHistoryButtons();
  }

  if (speedStatus) {
    speedStatus.textContent =
      `Current speed: ${speed}x`;
  }

  console.log(
    `ClipCraft: Video playback speed set to ${speed}x`
  );
}

function renderSplitProperties() {
  const propertiesPanel = document.querySelector(
    ".editor-properties"
  );

  if (!propertiesPanel) {
    return;
  }

  propertiesPanel.innerHTML = `
    <h2 class="editor-panel-title">
      Split
    </h2>

    <div class="editor-property-placeholder">

      <p>
        Split the video at the current playback position.
      </p>

      <div class="split-time-display">
        Split Point:
        <strong id="split-time-value">
          00:00
        </strong>
      </div>

      <button
        type="button"
        class="btn btn-primary"
        id="editor-split-button"
      >
        Split Clip
      </button>

    </div>
  `;

  updateSplitTime();

  const splitButton = document.getElementById(
    "editor-split-button"
  );

  if (splitButton) {
    splitButton.addEventListener(
      "click",
      applySplit
    );
  }
}

function updateSplitTime() {
  const video = document.getElementById(
    "editor-video"
  );

  const splitTimeValue = document.getElementById(
    "split-time-value"
  );

  if (!video || !splitTimeValue) {
    return;
  }

  splitTimeValue.textContent = formatTime(
    video.currentTime
  );
}

function applySplit() {
  const video = document.getElementById(
    "editor-video"
  );

  if (!video) {
    console.warn(
      "ClipCraft: No video is loaded."
    );
    return;
  }

  if (
    !Number.isFinite(video.duration) ||
    video.duration <= 0
  ) {
    return;
  }

  const splitTime = video.currentTime;
  video.dataset.splitTime = splitTime;

  if (
    splitTime <= 0 ||
    splitTime >= video.duration
  ) {
    alert(
      "Move the playhead to a position inside the video before splitting."
    );

    return;
  }

  renderSplitTimeline(splitTime);

  const splitState = getEditorHistorySnapshot();

  if (splitState) {
    splitState.splitTime = splitTime;
    saveEditorHistory(splitState);
    saveProjectEditorState(splitState);
    updateHistoryButtons();
  }

  console.log(
    `ClipCraft: Video split at ${formatTime(splitTime)}`
  );
}

function renderSplitTimeline(splitTime) {
  const timelineTrack = document.querySelector(
    ".timeline-track"
  );

  if (!timelineTrack) {
    console.error(
      "ClipCraft: Timeline track was not found."
    );
    return;
  }

  const video = document.getElementById(
    "editor-video"
  );

  if (!video) {
    return;
  }

  const duration = video.duration;

  const splitPercentage =
    (splitTime / duration) * 100;

  timelineTrack.innerHTML = `
    <div
      class="timeline-clip split-clip"
      style="width: ${splitPercentage}%"
    >
      Part 1
    </div>

    <div
      class="timeline-clip split-clip"
      style="width: ${100 - splitPercentage}%"
    >
      Part 2
    </div>
  `;

  timelineTrack.classList.add(
    "timeline-split-active"
  );
}

function resetPropertiesPanel() {
  const propertiesContent = document.getElementById(
    "editor-properties-content"
  );

  if (!propertiesContent) {
    return;
  }

  propertiesContent.innerHTML = `
    <div class="editor-property-placeholder">
      Select a tool or video clip to view
      editing properties.
    </div>
  `;
}

function initializeVideoUpload() {
  const uploadButton = document.getElementById(
    "editor-upload-button"
  );

  const videoInput = document.getElementById(
    "media-video-input"
  );

  if (!uploadButton || !videoInput) {
    console.error(
      "ClipCraft: Video upload elements were not found."
    );
    return;
  }

  uploadButton.addEventListener("click", () => {
    videoInput.click();
  });

  videoInput.addEventListener("change", () => {
    const selectedFile = videoInput.files[0];

    if (!selectedFile) {
      return;
    }

    if (
      !selectedFile.type ||
      !selectedFile.type.startsWith("video/")
    ) {
      console.error(
        "ClipCraft: Selected file is not a valid video."
      );

      const previewStatus = document.getElementById(
        "preview-status"
      );

      if (previewStatus) {
        previewStatus.textContent =
          "Please select a valid video file.";
      }

      videoInput.value = "";
      return;
    }

    if (selectedFile.size <= 0) {
      console.error(
        "ClipCraft: Selected video file is empty."
      );  

      const previewStatus = document.getElementById(
        "preview-status"
      );

      if (previewStatus) {
        previewStatus.textContent =
          "The selected video file is empty.";
      }

      videoInput.value = "";
      return;
    }

    const maxFileSize = 500 * 1024 * 1024;

    if (selectedFile.size > maxFileSize) {
      console.error(
        "ClipCraft: Selected video file exceeds the 500 MB limit."
      );

      const previewStatus = document.getElementById(
        "preview-status"
      );

      if (previewStatus) {
        previewStatus.textContent =
          "Video file is too large. Maximum size is 500 MB.";
      }

      videoInput.value = "";
      return;
    }

    console.log(
      `ClipCraft: Valid video selected: ${selectedFile.name}`
    );

    loadVideoPreview(selectedFile);
  });
}

function loadVideoPreview(file) {

  const previewStatus = document.getElementById(
    "preview-status"
  );

  if (previewStatus) {
    setEditorState(editorStates.loading);
    previewStatus.textContent = "Loading video...";
  }  

  const previewContent = document.getElementById(
    "editor-preview-content"
  );

  const timelineStatus = document.getElementById(
    "timeline-status"
  );

  const timelineClip = document.querySelector(
    ".timeline-clip"
  );

  if (
    !previewContent ||
    !previewStatus ||
    !timelineStatus ||
    !timelineClip
  ) {
    console.error(
      "ClipCraft: Video preview elements were not found."
    );
    return;
  }

  if (currentVideoObjectUrl) {
    URL.revokeObjectURL(currentVideoObjectUrl);
    currentVideoObjectUrl = null;
  }

  currentVideoObjectUrl = URL.createObjectURL(file);

  const videoUrl = currentVideoObjectUrl;

  previewContent.innerHTML = `
    <div class="editor-video-stage">

      <video
        id="editor-video"
        controls
        preload="metadata"
      >
        <source
          src="${videoUrl}"
          type="${file.type}"
        />
        Your browser does not support video playback.
      </video>

      <div
        id="editor-text-overlay"
        class="editor-text-overlay"
        aria-hidden="true"
      ></div>

    </div>
  `;

  const videoElement = document.getElementById(
    "editor-video"
  );

  if (!videoElement) {
    console.error(
      "ClipCraft: Video element could not be created."
    );
    return;
  }

  videoElement.addEventListener("loadedmetadata", () => {
    updateTimelineDuration(videoElement.duration);
    updatePlaybackTime(videoElement);

    const savedEditorState = loadProjectEditorState();

    if (!savedEditorState) {
      return;
    }

    if (
      savedEditorState.trimStart !== null &&
      savedEditorState.trimStart !== undefined &&
      savedEditorState.trimEnd !== null &&
      savedEditorState.trimEnd !== undefined
    ) {
      updateTrimTimeline(
        savedEditorState.trimStart,
        savedEditorState.trimEnd
      );
    }

    if (
      savedEditorState.splitTime !== null &&
      savedEditorState.splitTime !== undefined
    ) {
      renderSplitTimeline(
        savedEditorState.splitTime
      );
    }
  });

  videoElement.addEventListener("error", () => {
    setEditorState(editorStates.error);

    previewStatus.textContent =
      "Unable to load this video. Please try another file.";

    timelineStatus.textContent =
      "Media load failed";

    console.error(
      "ClipCraft: Video failed to load."
    );
  });

  videoElement.addEventListener("timeupdate", () => {
    updatePlaybackTime(videoElement);
  });

  videoElement.addEventListener("ended", () => {
    const playButton = document.getElementById(
      "editor-play-button"
    );

    if (playButton) {
      playButton.textContent = "▶";
      playButton.setAttribute(
        "aria-label",
        "Play video"
      );
    }

    console.log(
      "ClipCraft: Video playback ended."
    );
  });

  videoElement.style.width = "100%";
  videoElement.style.height = "100%";
  videoElement.style.maxHeight = "100%";
  videoElement.style.objectFit = "contain";

  previewStatus.textContent = file.name;

  timelineStatus.textContent = "Media loaded";

  timelineClip.textContent = file.name;

  console.log(
    `ClipCraft: Video loaded successfully: ${file.name}`
  );

  setEditorState(editorStates.success);

  editorHistory.length = 0;
  historyIndex = -1;

  const savedEditorState = loadProjectEditorState();

  if (savedEditorState) {
    restoreEditorHistoryState(savedEditorState);

    if (
      savedEditorState.splitTime !== null &&
      savedEditorState.splitTime !== undefined
    ) {
      renderSplitTimeline(
        savedEditorState.splitTime
      );
    }
    console.log(
      "ClipCraft: Saved project editing state restored."
    );
  } else {
    const initialEditorState = getEditorHistorySnapshot();

    if (initialEditorState) {
      saveEditorHistory(initialEditorState);
      updateHistoryButtons();
    }
  }
}

function initializeVideoPlayback() {
  const playButton = document.getElementById(
    "editor-play-button"
  );

  const timeDisplay = document.getElementById(
    "editor-time-display"
  );

  const muteButton = document.getElementById(
    "editor-mute-button"
  );

  if (!playButton || !timeDisplay || !muteButton) {
    console.error(
      "ClipCraft: Playback elements were not found."
    );
    return;
  }

  playButton.addEventListener("click", () => {
    const video = document.getElementById(
      "editor-video"
    );

    if (!video) {
      console.warn(
        "ClipCraft: No video is loaded."
      );
      return;
    }

    if (video.paused) {
      video.play();
      playButton.textContent = "⏸";
      playButton.setAttribute(
        "aria-label",
        "Pause video"
      );
    } else {
      video.pause();
      playButton.textContent = "▶";
      playButton.setAttribute(
        "aria-label",
        "Play video"
      );
    }
  });

  muteButton.addEventListener("click", () => {
    const video = document.getElementById(
      "editor-video"
    );

    if (!video) {
      console.warn(
        "ClipCraft: No video is loaded."
      );
      return;
    }

    video.muted = !video.muted;

    if (video.muted) {
      muteButton.textContent = "🔇";
      muteButton.setAttribute(
        "aria-label",
        "Unmute video"
      );
    } else {
      muteButton.textContent = "🔊";
      muteButton.setAttribute(
        "aria-label",
        "Mute video"
      );
    }
  });
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(
    seconds % 60
  );

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0")
  );
}

function updateTimelineDuration(duration) {
  const timelineRuler = document.querySelector(
    ".timeline-ruler"
  );

  if (!timelineRuler) {
    console.error(
      "ClipCraft: Timeline ruler was not found."
    );
    return;
  }

  if (!Number.isFinite(duration) || duration <= 0) {
    return;
  }

  const totalSeconds = Math.round(duration);

  const rulerPoints = [];

  const numberOfPoints = 5;

  for (let i = 0; i < numberOfPoints; i++) {
    const point =
      Math.round(
        (totalSeconds * i) /
          (numberOfPoints - 1)
      );

    rulerPoints.push(formatTime(point));
  }

  timelineRuler.innerHTML = rulerPoints
    .map((time) => `<span>${time}</span>`)
    .join("");

  console.log(
    `ClipCraft: Timeline duration updated: ${formatTime(totalSeconds)}`
  );
}

function updatePlaybackTime(video) {
  const timeDisplay = document.getElementById(
    "editor-time-display"
  );

  if (!timeDisplay) {
    return;
  }

  const currentTime = formatTime(
    video.currentTime
  );

  const duration = formatTime(
    Math.round(video.duration)
  );

  timeDisplay.textContent =
    `${currentTime} / ${duration}`;
}

function initializeTimelineSeeking() {
  const timelineTrack = document.querySelector(
    ".timeline-track"
  );

  if (!timelineTrack) {
    console.error(
      "ClipCraft: Timeline track was not found."
    );
    return;
  }

  timelineTrack.addEventListener("click", (event) => {
    const video = document.getElementById(
      "editor-video"
    );

    if (!video) {
      console.warn(
        "ClipCraft: No video is loaded."
      );
      return;
    }

    if (
      !Number.isFinite(video.duration) ||
      video.duration <= 0
    ) {
      return;
    }

    const trackRect =
      timelineTrack.getBoundingClientRect();

    const trackWidth = trackRect.width;

    if (!Number.isFinite(trackWidth) || trackWidth <= 0) {
      return;
    }

    const clickPosition =
      event.clientX - trackRect.left;

    const percentage = Math.max(
      0,
      Math.min(
        clickPosition / trackWidth,
        1
      )
    );

    const newTime =
      percentage * video.duration;

    video.currentTime = Math.max(
      0,
      Math.min(newTime, video.duration)
    );

    updatePlaybackTime(video);

    console.log(
      `ClipCraft: Timeline seeked to ${formatTime(video.currentTime)}`
    );
  });
}

function showTrimProperties() {
  const propertiesPanel = document.querySelector(
    ".editor-properties"
  );

  if (!propertiesPanel) {
    console.error(
      "ClipCraft: Editor properties panel was not found."
    );
    return;
  }

  propertiesPanel.innerHTML = `
    <h2 class="editor-panel-title">
      Trim
    </h2>

    <div class="editor-trim-properties">

      <div class="editor-property-group">

        <label for="trim-start-input">
          Start Time (seconds)
        </label>

        <input
          type="number"
          id="trim-start-input"
          min="0"
          step="0.1"
          value="0"
        />

      </div>

      <div class="editor-property-group">

        <label for="trim-end-input">
          End Time (seconds)
        </label>

        <input
          type="number"
          id="trim-end-input"
          min="0"
          step="0.1"
          value="0"
        />

      </div>

      <button
        type="button"
        class="btn btn-primary"
        id="trim-preview-button"
      >
        Preview Trim
      </button>

      <button
        type="button"
        class="btn"
        id="trim-reset-button"
      >
        Reset Trim
      </button>

      <div
        id="trim-validation-message"
        class="editor-property-placeholder"
      ></div>

    </div>
  `;

  initializeTrimControls();
}

function initializeTrimControls() {
  const startInput = document.getElementById(
    "trim-start-input"
  );

  const endInput = document.getElementById(
    "trim-end-input"
  );

  const previewButton = document.getElementById(
    "trim-preview-button"
  );

  const resetButton = document.getElementById(
    "trim-reset-button"
  );

  if (
    !startInput ||
    !endInput ||
    !previewButton ||
    !resetButton
  ) {
    console.error(
      "ClipCraft: Trim controls were not found."
    );
    return;
  }

  const video = document.getElementById(
    "editor-video"
  );

  const savedState = loadProjectEditorState();

  if (savedState?.trimStart !== null &&
      savedState?.trimStart !== undefined) {
    startInput.value = savedState.trimStart;
  } else {
    startInput.value = 0;
  }

  if (savedState?.trimEnd !== null &&
      savedState?.trimEnd !== undefined) {
    endInput.value = savedState.trimEnd;
  } else if (
    video &&
    Number.isFinite(video.duration)
  ) {
    endInput.value = video.duration.toFixed(1);
  }

  previewButton.addEventListener("click", () => {
    applyTrimPreview(
      startInput,
      endInput
    );
  });

  resetButton.addEventListener("click", () => {
    resetTrimPreview(
      startInput,
      endInput
    );
  });
}

function applyTrimPreview(startInput, endInput) {
  const video = document.getElementById(
    "editor-video"
  );

  const validationMessage =
    document.getElementById(
      "trim-validation-message"
    );

  if (!video) {
    validationMessage.textContent =
      "Please upload a video before applying trim.";

    return;
  }

  const startTime = Number(
    startInput.value
  );

  const endTime = Number(
    endInput.value
  );

  if (
    !Number.isFinite(startTime) ||
    !Number.isFinite(endTime)
  ) {
    validationMessage.textContent =
      "Please enter valid start and end times.";

    return;
  }

  if (startTime < 0) {
    validationMessage.textContent =
      "Start time cannot be negative.";

    return;
  }

  if (endTime > video.duration) {
    validationMessage.textContent =
      "End time cannot exceed video duration.";

    return;
  }

  if (startTime >= endTime) {
    validationMessage.textContent =
      "Start time must be smaller than end time.";

    return;
  }

  video.currentTime = startTime;

  video.dataset.trimStart = startTime;
  video.dataset.trimEnd = endTime;

  const trimState = getEditorHistorySnapshot();

  if (trimState) {
    saveEditorHistory(trimState);
    saveProjectEditorState(trimState);
    updateHistoryButtons();
  }

  updateTrimTimeline(
    startTime,
    endTime
  );

  validationMessage.textContent =
    `Trim preview: ${formatTime(startTime)} → ${formatTime(endTime)}`;

  video.play();

  console.log(
    `ClipCraft: Trim preview started: ${formatTime(startTime)} → ${formatTime(endTime)}`
  );

  video.ontimeupdate = () => {
    if (
      video.currentTime >= endTime
    ) {
      video.pause();
      video.currentTime = endTime;

      console.log(
        `ClipCraft: Trim preview ended at ${formatTime(endTime)}`
      );
    }
  };
}

function resetTrimPreview(startInput, endInput) {
  const video = document.getElementById(
    "editor-video"
  );

  const validationMessage =
    document.getElementById(
      "trim-validation-message"
    );

  if (video) {
    video.ontimeupdate = null;
    delete video.dataset.trimStart;
    delete video.dataset.trimEnd;
    video.currentTime = 0;
    video.pause();

    resetTimelineDisplay();
  }

  startInput.value = 0;

  if (
    video &&
    Number.isFinite(video.duration)
  ) {
    endInput.value =
      video.duration.toFixed(1);
  } else {
    endInput.value = 0;
  }

  validationMessage.textContent =
    "Trim selection reset.";

  console.log(
    "ClipCraft: Trim selection reset."
  );
}

function resetTimelineDisplay() {
  const timelineTrack = document.querySelector(
    ".timeline-track"
  );

  const video = document.getElementById(
    "editor-video"
  );

  if (!timelineTrack || !video) {
    return;
  }

  const videoName =
    document.getElementById(
      "preview-status"
    )?.textContent || "Video";

  timelineTrack.innerHTML = `
    <div class="timeline-clip">
      ${videoName}
    </div>
  `;

  timelineTrack.classList.remove(
    "timeline-split-active"
  );

  console.log(
    "ClipCraft: Timeline restored to full video."
  );
}

function updateTrimTimeline(startTime, endTime) {
  const timelineTrack = document.querySelector(
    ".timeline-track"
  );

  if (!timelineTrack) {
    console.error(
      "ClipCraft: Timeline track was not found."
    );
    return;
  }

  let timelineClip = document.querySelector(
    ".timeline-clip"
  );

  if (
    timelineTrack.classList.contains(
      "timeline-split-active"
    )
  ) {
    timelineTrack.innerHTML = `
      <div class="timeline-clip">
        Video
      </div>
    `;

    timelineTrack.classList.remove(
      "timeline-split-active"
    );

    timelineClip =
      timelineTrack.querySelector(
        ".timeline-clip"
      );
  }

  const video = document.getElementById(
    "editor-video"
  );

  if (
    !timelineTrack ||
    !timelineClip ||
    !video
  ) {
    console.error(
      "ClipCraft: Timeline elements were not found."
    );
    return;
  }

  if (
    !Number.isFinite(video.duration) ||
    video.duration <= 0
  ) {
    return;
  }

  const duration = video.duration;

  const startPercentage =
    (startTime / duration) * 100;

  const selectedPercentage =
    ((endTime - startTime) / duration) * 100;

  const endPercentage =
    100 - startPercentage - selectedPercentage;

  timelineClip.innerHTML = `
    <div
      class="timeline-segment timeline-before"
      style="width: ${startPercentage}%"
    >
      ${
        startTime > 0
          ? formatTime(startTime)
          : ""
      }
    </div>

    <div
      class="timeline-segment timeline-selected"
      style="width: ${selectedPercentage}%"
    >
      ${formatTime(startTime)} → ${formatTime(endTime)}
    </div>

    <div
      class="timeline-segment timeline-after"
      style="width: ${Math.max(
        0,
        endPercentage
      )}%"
    >
      ${
        endTime < duration
          ? formatTime(endTime)
          : ""
      }
    </div>
  `;

  console.log(
    `ClipCraft: Timeline trim region updated: ${formatTime(startTime)} → ${formatTime(endTime)}`
  );
}

window.addEventListener("beforeunload", () => {
  if (currentVideoObjectUrl) {
    URL.revokeObjectURL(currentVideoObjectUrl);
    currentVideoObjectUrl = null;
  }
});