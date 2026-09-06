// import { initShell } from "../modules/shell/shell.js";
// import { initEditor } from "../modules/editor/editor.js";
// import { initResponsive } from "../modules/responsive/responsive.js";
import { initAuth } from "../modules/auth/auth.js";
document.addEventListener("DOMContentLoaded", () => {
  initAuth();
  // initShell();
  // initEditor();
  // initResponsive();
});
