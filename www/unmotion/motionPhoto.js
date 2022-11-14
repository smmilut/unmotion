/**
 * @param {File} file Motion Photo file
 * @returns {Promise} resolves to a binary string of the file
 */
function loadAsBinaryString(file) {
    return new Promise(function promiseLoadedFile(resolve, _reject) {
        const reader = new FileReader();
        reader.addEventListener("load", function fileLoaded(e) {
            resolve(e.target.result);
        })
        reader.readAsBinaryString(file);
    });
}

/**
 * @param {string} fileData binary string of Motion Photo file
 * @returns {integer} videoStartIndex position of the start of the image
 */
function searchVideoStart(fileData) {
    const videoStartMarker = fileData.search(/ftypmp42/);
    if (videoStartMarker < 0) {
        throw new Error("File is not a Motion Photo, couldn't find the video start.");
    } else {
        return videoStartMarker - 4;
    }
}

/**
 * @param {string} fileData binary string of Motion Photo file
 * @param {integer} videoStartIndex position of the start of the video
 * @returns {string} binary string of the video
 */
function getVideoData(fileData, videoStartIndex) {
    return fileData.slice(videoStartIndex);
}

/**
 * @param {string} fileData binary string of Motion Photo file
 * @returns {integer} imageEndIndex position of the end of the image
 */
function searchImageEnd(fileData) {
    const imageEndMarker = fileData.search("\xff\xd9\x00");  // (ÿÙ) FF D9 and maybe 00 00 01 ?
    if (imageEndMarker < 0) {
        throw new Error("File is not a Motion Photo, couldn't find the image end.");
    } else {
        return imageEndMarker + 2;
    }
}

/**
 * @param {string} fileData binary string of Motion Photo file
 * @param {integer} imageEndIndex position of the end of the image
 * @returns {string} binary string of the image
 */
function getImageData(fileData, imageEndIndex) {
    return fileData.slice(0, imageEndIndex)
}

/**
 * Split a Motion Photo into its "image" and "video" parts
 * @param {File} file Motion Photo file
 * @returns {object} {
        imageData : only the image as binary string
        videoData : only the video as binary string
    }
 */
export async function split(file) {
    const fileData = await loadAsBinaryString(file);
    const videoStartIndex = searchVideoStart(fileData);
    const imageEndIndex = searchImageEnd(fileData);
    const videoData = getVideoData(fileData, videoStartIndex);
    const imageData = getImageData(fileData, imageEndIndex);
    return {
        imageData,
        videoData,
    }
}