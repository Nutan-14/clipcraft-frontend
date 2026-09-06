// =========================================================
// CLIPCRAFT - ENTRY / UPLOAD FLOW
// Rushikesh
// =========================================================


// =========================================================
// RENDER ENTRY SCREEN
// =========================================================

export function renderEntry() {

  return `

    <section class="entry-page">

      <div class="entry-container">


        <!-- =============================================
             ENTRY HEADER
             ============================================= -->

        <div class="entry-header">

          <span class="entry-eyebrow">
            NEW PROJECT
          </span>

          <h1>
            Start your next video
          </h1>

          <p>
            Upload a video and start editing with ClipCraft.
          </p>

        </div>


        <!-- =============================================
             UPLOAD CARD
             ============================================= -->

        <div
          class="upload-card"
          id="uploadCard"
        >

          <div class="upload-icon">
            ↑
          </div>


          <h2>
            Upload your video
          </h2>


          <p>
            Drag and drop your video here, or select a file
            from your computer.
          </p>


          <!-- Hidden File Input -->

          <input
            type="file"
            id="videoInput"
            accept="video/*"
            hidden
          />


          <!-- Select Video Button -->

          <button
            type="button"
            class="upload-select-button"
            id="selectVideoButton"
          >
            Select Video
          </button>


          <span class="upload-hint">
            MP4, WebM, MOV and other supported video formats
          </span>

        </div>


        <!-- =============================================
             VIDEO PREVIEW
             ============================================= -->

        <div
          class="video-preview-card"
          id="videoPreviewCard"
          hidden
        >

          <div class="video-preview-header">

            <div>

              <span class="preview-eyebrow">
                VIDEO PREVIEW
              </span>

              <h2>
                Your selected video
              </h2>

            </div>

          </div>


          <div class="video-preview-wrapper">

            <video
              id="videoPreview"
              class="video-preview"
              controls
              playsinline
            >
            </video>

          </div>

        </div>


        <!-- =============================================
             SELECTED FILE DETAILS
             ============================================= -->

        <div
          class="selected-file-card"
          id="selectedFileCard"
          hidden
        >

          <div class="selected-file-icon">
            ▶
          </div>


          <div class="selected-file-info">

            <strong id="selectedFileName">
              Video file
            </strong>

            <span id="selectedFileSize">
              0 MB
            </span>

          </div>


          <button
            type="button"
            class="remove-file-button"
            id="removeFileButton"
            aria-label="Remove selected video"
          >
            ×
          </button>

        </div>


        <!-- =============================================
             ERROR
             ============================================= -->

        <p
          class="upload-error"
          id="uploadError"
        ></p>


        <!-- =============================================
             CONTINUE
             ============================================= -->

        <button
          type="button"
          class="continue-editor-button"
          id="continueEditorButton"
          disabled
        >
          Continue to Editor
        </button>

      </div>

    </section>

  `;
}



// =========================================================
// INITIALIZE ENTRY / UPLOAD INTERACTION
// =========================================================

export function initEntry() {

  const uploadCard =
    document.getElementById("uploadCard");


  const videoInput =
    document.getElementById("videoInput");


  const selectVideoButton =
    document.getElementById("selectVideoButton");


  const videoPreviewCard =
    document.getElementById("videoPreviewCard");


  const videoPreview =
    document.getElementById("videoPreview");


  const selectedFileCard =
    document.getElementById("selectedFileCard");


  const selectedFileName =
    document.getElementById("selectedFileName");


  const selectedFileSize =
    document.getElementById("selectedFileSize");


  const removeFileButton =
    document.getElementById("removeFileButton");


  const continueEditorButton =
    document.getElementById("continueEditorButton");


  const uploadError =
    document.getElementById("uploadError");


  if (
    !uploadCard ||
    !videoInput ||
    !selectVideoButton ||
    !videoPreviewCard ||
    !videoPreview ||
    !selectedFileCard ||
    !selectedFileName ||
    !selectedFileSize ||
    !removeFileButton ||
    !continueEditorButton ||
    !uploadError
  ) {
    console.error(
      "ClipCraft: Entry elements are missing."
    );

    return;
  }


  let selectedFile = null;

  let selectedVideoUrl = null;



  // =======================================================
  // OPEN FILE PICKER
  // =======================================================

  selectVideoButton.addEventListener(
    "click",
    () => {

      videoInput.click();

    }
  );



  // =======================================================
  // FORMAT FILE SIZE
  // =======================================================

  function formatFileSize(bytes) {

    if (bytes === 0) {
      return "0 Bytes";
    }


    const units = [
      "Bytes",
      "KB",
      "MB",
      "GB"
    ];


    const index =
      Math.floor(
        Math.log(bytes) /
        Math.log(1024)
      );


    const size =
      bytes /
      Math.pow(1024, index);


    return `${size.toFixed(2)} ${units[index]}`;

  }



  // =======================================================
  // HANDLE SELECTED FILE
  // =======================================================

  function handleFile(file) {

    uploadError.textContent = "";


    if (!file) {
      return;
    }


    // -----------------------------------------------------
    // Validate video file
    // -----------------------------------------------------

    if (!file.type.startsWith("video/")) {

      uploadError.textContent =
        "Please select a valid video file.";

      return;
    }


    // -----------------------------------------------------
    // Store selected file
    // -----------------------------------------------------

    selectedFile = file;
    // Store selected video in the current ClipCraft project
    window.clipcraftSelectedFile = file;


    // -----------------------------------------------------
    // Remove old object URL
    // -----------------------------------------------------

    if (selectedVideoUrl) {

      URL.revokeObjectURL(
        selectedVideoUrl
      );

    }


    // -----------------------------------------------------
    // Create temporary browser URL
    // -----------------------------------------------------

    selectedVideoUrl =
      URL.createObjectURL(file);


    // -----------------------------------------------------
    // Set video preview
    // -----------------------------------------------------

    videoPreview.src =
      selectedVideoUrl;


    videoPreviewCard.hidden =
      false;


    // -----------------------------------------------------
    // Show file name
    // -----------------------------------------------------

    selectedFileName.textContent =
      file.name;


    // -----------------------------------------------------
    // Show file size
    // -----------------------------------------------------

    selectedFileSize.textContent =
      formatFileSize(file.size);


    selectedFileCard.hidden =
      false;


    // -----------------------------------------------------
    // Enable continue button
    // -----------------------------------------------------

    continueEditorButton.disabled =
      false;


    // -----------------------------------------------------
    // Load video
    // -----------------------------------------------------

    videoPreview.load();

  }



  // =======================================================
  // FILE INPUT CHANGE
  // =======================================================

  videoInput.addEventListener(
    "change",
    () => {

      const file =
        videoInput.files[0];


      handleFile(file);

    }
  );



  // =======================================================
  // REMOVE VIDEO
  // =======================================================

  removeFileButton.addEventListener(
    "click",
    () => {

      selectedFile = null;


      videoInput.value = "";


      // Remove temporary URL

      if (selectedVideoUrl) {

        URL.revokeObjectURL(
          selectedVideoUrl
        );

        selectedVideoUrl = null;

      }


      // Remove video source

      videoPreview.removeAttribute(
        "src"
      );


      videoPreview.load();


      // Hide preview

      videoPreviewCard.hidden =
        true;


      // Hide file information

      selectedFileCard.hidden =
        true;


      // Disable continue

      continueEditorButton.disabled =
        true;


      // Clear error

      uploadError.textContent =
        "";

    }
  );



  // =======================================================
  // DRAG ENTER
  // =======================================================

  uploadCard.addEventListener(
    "dragenter",
    (event) => {

      event.preventDefault();

      uploadCard.classList.add(
        "is-dragging"
      );

    }
  );



  // =======================================================
  // DRAG OVER
  // =======================================================

  uploadCard.addEventListener(
    "dragover",
    (event) => {

      event.preventDefault();

      uploadCard.classList.add(
        "is-dragging"
      );

    }
  );



  // =======================================================
  // DRAG LEAVE
  // =======================================================

  uploadCard.addEventListener(
    "dragleave",
    () => {

      uploadCard.classList.remove(
        "is-dragging"
      );

    }
  );



  // =======================================================
  // DROP
  // =======================================================

  uploadCard.addEventListener(
    "drop",
    (event) => {

      event.preventDefault();


      uploadCard.classList.remove(
        "is-dragging"
      );


      const file =
        event.dataTransfer.files[0];


      handleFile(file);

    }
  );



  // =======================================================
  // CONTINUE TO EDITOR
  // =======================================================

  continueEditorButton.addEventListener(
    "click",
    () => {

      if (!selectedFile) {
        return;
      }


      console.log(
        "Ready to open editor:",
        selectedFile.name
      );


      // Send selected file to shell.js

      window.dispatchEvent(
        new CustomEvent(
          "clipcraft:open-editor",
          {
            detail: {
              file: selectedFile
            }
          }
        )
      );

    }
  );

}