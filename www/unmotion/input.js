import * as Controller from "./controller.js";
/**
 * manage user input and communicate with the Controller
 */

let Input_fileInputEl;
let Input_fileDropEl;

/** Always call init first */
export function init(
    {
        fileInputQry = "#fileInput",
        fileDropQry = "#fileDrop",
    } = {},
) {
    Input_fileInputEl = document.querySelector(fileInputQry);
    Input_fileInputEl.addEventListener("change", fileInputChanged);
    Input_fileDropEl = document.querySelector(fileDropQry);
    Input_fileDropEl.addEventListener("dragleave", stopEventAndRemoveStyle);
    Input_fileDropEl.addEventListener("dragenter", stopEventAndApplyStyle);
    Input_fileDropEl.addEventListener("dragover", stopEventPropagation);
    Input_fileDropEl.addEventListener("drop", dragDropped);
}

/**
 * User selected some files
 * @param {Event} _event 
 */
function fileInputChanged(_event) {
    const fileList = Input_fileInputEl.files;
    Controller.onFilesReceived(fileList)
}

function stopEventPropagation(event) {
    event.stopPropagation();
    event.preventDefault();
}

/**
 * Apply style to drag and drop elements
 */
function styleDrag() {
    Input_fileDropEl.classList.add("draggedOver");
}

/**
 * Remove style to drag and drop elements
 */
function unstyleDrag() {
    Input_fileDropEl.classList.remove("draggedOver");
}

function stopEventAndRemoveStyle(event) {
    stopEventPropagation(event);
    unstyleDrag();
}

function stopEventAndApplyStyle(event) {
    stopEventPropagation(event);
    styleDrag();
}

/**
 * User dragged and dropped some files
 * @param {Event} event 
 */
function dragDropped(event) {
    stopEventAndRemoveStyle(event)
    const dataTransfer = event.dataTransfer;
    const fileList = dataTransfer.files;
    Controller.onFilesReceived(fileList)
}