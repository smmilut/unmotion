# unmotion

## Description

Get useable files out of smartphone "Motion Photos"

### What are Motion Photos

Some rare-ish (for me, in 2022) software creates files called "Motion Photos". This is usually an option on some smartphones. A Motion Photo file contains a few frames of MP4 video and a single JPEG image still out of this video. The marketed purpose is to allow taking a photo of a rapidly-changing subject by taking a mini-video of 3s and later be able to pick the best frame as a photo. The file has a `.jpg` extension.

Currently (2022), only the authors of these files and some smarphone users are able to view the full content (video + image). Most image visualization software is only able to view the image.

This has a few downsides :
- users without those devices are missing out on the video content
- the files are heavy (at least 2x the size of only the image)
- most users are unaware of the extra content because it is hidden inside what looks like a simple `.jpg` image
- unaware users may be sharing undesired information (note that the video records the sound during the shot)
- unaware users are carrying the double file weight for nothing

### What this tool does

1. You select files from your computer (most likely, `.jpg` files).
2. Files are *locally* processed. Nothing is sent to any server, it is your computer who does the calculations. Your files stay yours.
3. For each file, this tool tries to detect if your file is a Motion Photo. If not, a message is displayed.
4. If a file is a Motion Photo, this tool extracts the image and the video separately, and makes them available both as a preview and as a download button.

## Privacy

The page contains no trackers or analytics, and uses no cookies. No information is extracted from your usage of the page.

In particular, as you can see in the code, I do nothing with your files. All computing is done locally in your browser. If you download and run the page on a computer with no internet access, it should still work the same.

Code is easy to introspect because it is not minified or obscured (though badly written probably). The scripts are simple and use no external dependencies.

## License

The code in this project is licensed under the MIT license as described in the `LICENSE` file.

The assets of this project are licensed under [Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/) attributed to Pil Smmilut, except if otherwise specified.
