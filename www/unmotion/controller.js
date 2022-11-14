import * as Output from "./output.js";
import * as MotionPhoto from "./motionPhoto.js";

/** Always call init first */
export function init() {
    // pass
}

export async function onFilesReceived(fileList) {
    for (const file of fileList) {
        Output.showFileInfo(file);
        try {
            const {
                imageData,
                videoData,
            } = await MotionPhoto.split(file);
            Output.showImage(imageData, file.name);
            Output.showVideo(videoData, file.name);
        } catch (e) {
            const errMsg = `${e.name} : ${e.message}`
            Output.showError(errMsg, file.name)
        }
    }
}
