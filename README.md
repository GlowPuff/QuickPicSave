# Quick Pic Save
This is a Firefox WebExtension that allows you to quickly save a picture on any web page. A popup button appears when you hover the mouse over the image you want to save. A setting allows you to specify a folder to save to, as well as an option for button placement over the image.

## Getting Started

To get started, clone the project to your machine. See Deployment below for notes on how to load Quick Pic Save into Firefox.

## Deployment

In the Firefox URL bar, type "about:debugging", without the quotes, and hit the Enter key. Click the "Load Temporary Add-On" button in the upper right. In the dialog box that appears, navigate inside the project folder and click on any file, then click the "Open" button. This will temporarily load the add-on for testing in the current browser session.

## Notes
Because of Firefox's updated security model, you can only save images to the default Download folder that is already used by Firefox, or to a subfolder within that folder. You cannot save to an arbitrary folder that is outside the default Download folder that Firefox uses.

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - The code editor used
* [jQuery](https://jquery.com/) - The web framework used

## Author

* **GlowPuff** - [GitHub](https://github.com/GlowPuff), [Website](https://glowpuff.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* This Firefox Add-On was inspired by an old extension I used to use before it was broken by Firefox switching to WebExtensions for its Add-On architecture. That extension was never updated to use WebExtensions, prompting me to create my own.
