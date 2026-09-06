import { initShell } from "../modules/shell/shell.js";
import { initEditor } from "../modules/editor/editor.js";
import { initResponsive } from "../modules/responsive/responsive.js";

document.addEventListener("DOMContentLoaded", () => {
  initShell();
  initEditor();
  initResponsive();
});
