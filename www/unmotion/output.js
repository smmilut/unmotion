/**
 * manage how to display output
 */

/** HTML element to display results */
let Output_resultboxEl;

/** Always call init first */
export function init(
    {
        resultboxQry = "#resultbox",
    } = {},
) {
    Output_resultboxEl = document.querySelector(resultboxQry);
}

/**
 * Display info about the file
 * @param {File} fileInfo 
 */
export function showFileInfo(fileInfo) {
    const article = getOrCreateArticle(fileInfo.name);

    const infoDiv = document.createElement("div");
    if (fileInfo.size) {
        const sizeInfo = document.createElement("p");
        sizeInfo.textContent = bytesUnit(fileInfo.size).sizeString;
        infoDiv.appendChild(sizeInfo);
    }
    if (fileInfo.lastModifiedDate) {
        const dateInfo = document.createElement("p");
        dateInfo.textContent = `last modified ${fileInfo.lastModifiedDate}`;
        infoDiv.appendChild(dateInfo);
    }
    article.appendChild(infoDiv);

    Output_resultboxEl.appendChild(article);
}

/**
 * Display the image preview and a download button
 * @param {string} imageBinary binary string of the image
 * @param {string} baseFileName 
 */
export function showImage(imageBinary, baseFileName) {
    const imgSection = document.createElement("section");

    const imgURL = binaryToImgURL(imageBinary);
    const img = imagePreview(imgURL)

    const fileName = baseFileName + ".extractedImage.jpg";
    const downloadBtn = newDownloadButton(imgURL, fileName, "⤓ image");

    imgSection.appendChild(img);
    imgSection.appendChild(downloadBtn);

    const article = getOrCreateArticle(baseFileName);
    article.appendChild(imgSection);

}

/**
 * Display the video preview and a download button
 * @param {string} videoBinary binary string of the video
 * @param {string} baseFileName 
 */
export function showVideo(videoBinary, baseFileName) {
    const vidSection = document.createElement("section");

    const vidURL = binaryToVideoURL(videoBinary)
    const vid = videoPreview(vidURL);

    const fileName = baseFileName + ".extractedVideo.mp4";
    const downloadBtn = newDownloadButton(vidURL, fileName, "⤓ video");

    vidSection.appendChild(vid);
    vidSection.appendChild(downloadBtn);

    const article = getOrCreateArticle(baseFileName);
    article.appendChild(vidSection);
}

/**
 * @param {string} msg error message
 * @param {string} baseFileName 
 */
export function showError(msg, baseFileName) {
    const article = document.getElementById(fileNameToId(baseFileName));
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("errMsg");
    errorDiv.textContent = msg;
    article.appendChild(errorDiv);
}

/**
 * Get the existing article/section for this file name,
 *  or create it if needed.
 * @param {string} fileName 
 * @returns {HTMLElement} <article> for the file name
 */
function getOrCreateArticle(fileName) {
    const idArticle = fileNameToId(fileName);
    const existingArticle = document.getElementById(idArticle);
    if (existingArticle) {
        return existingArticle;
    } else {  // null
        const newArticle = document.createElement("article");
        newArticle.setAttribute("id", idArticle);
        newArticle.classList.add("fileArticle");
        const titleText = document.createElement("h3");
        titleText.textContent = `${fileName}`;
        newArticle.appendChild(titleText);
        return newArticle;
    }
}

/**
 * @param {string} imgURL 
 * @returns {HTMLElement} <img>
 */
function imagePreview(imgURL) {
    const img = document.createElement("img");
    img.classList.add("imgPreview");
    img.src = imgURL;
    return img;
}

/**
 * @param {string} vidURL 
 * @returns {HTMLElement} <video>
 */
function videoPreview(vidURL) {
    const vid = document.createElement("video");
    vid.classList.add("vidPreview");
    vid.setAttribute("controls", true);
    vid.setAttribute("loop", true);
    vid.src = vidURL;
    return vid;
}

/**
 * Sanitize and standardize the HTML id
 * @param {string} fileName 
 * @returns {string} ID usable for HTML
 */
function fileNameToId(fileName) {
    return `unmotionFile-${fileName.replace(/[^a-zA-Z0-9-]+/g, "_")}`;
}

/**
 * @param {string} binary jpg image
 * @returns {string} data URL
 */
function binaryToImgURL(binary) {
    return "data:image/jpeg;base64," + btoa(binary);
}

/**
 * @param {string} binary mp4 video
 * @returns {string} data URL
 */
function binaryToVideoURL(binary) {
    return "data:video/mp4;base64," + btoa(binary);
}

/**
 * @param {string} url data url
 * @param {string} fileName default file name when downloading
 * @param {string} label button label
 * @returns {HTMLElement} <a> that can be clicked like a button to download from url
 */
function newDownloadButton(url, fileName, label) {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", url);
    anchor.setAttribute('download', fileName);
    const button = document.createElement("button");
    button.textContent = label;
    anchor.appendChild(button);
    return anchor;
}

/**
 * stolen from https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications
 * @param {integer} numberOfBytes 
 * @returns {object} {
        numberOfBytes,
        approxUnitValue,
        exponent,
        unit,
        sizeString,
    }
 */
function bytesUnit(numberOfBytes) {
    const kib = 1024;
    const units = [
        "B",
        "KiB",
        "MiB",
        "GiB",
        "TiB",
        "PiB",
        "EiB",
        "ZiB",
        "YiB",
    ];
    const exponent = Math.max(
        Math.min(
            Math.floor(
                Math.log(numberOfBytes) / Math.log(kib)
            ),
            units.length - 1
        ),
        0
    );
    const unit = units[exponent];
    const approxUnitValue = numberOfBytes / kib ** exponent;
    return {
        numberOfBytes,
        approxUnitValue,
        exponent,
        unit,
        sizeString: `${approxUnitValue.toFixed(1)} ${unit} (${numberOfBytes} bytes)`,
    }
}