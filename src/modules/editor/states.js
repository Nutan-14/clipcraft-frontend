// Nutan Dhepe: loading, processing, success and error UI states

export const editorStates = {
  idle: "idle",
  loading: "loading",
  processing: "processing",
  success: "success",
  error: "error",
};

let currentEditorState = editorStates.idle;

export function getEditorState() {
  return currentEditorState;
}

export function setEditorState(state) {
  const validStates = Object.values(editorStates);

  if (!validStates.includes(state)) {
    console.error(
      `ClipCraft: Invalid editor state "${state}".`
    );
    return false;
  }

  currentEditorState = state;

  document.body.dataset.editorState = state;

  console.log(
    `ClipCraft: Editor state changed to "${state}".`
  );

  return true;
}