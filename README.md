# Soundboard

A simple soundboard desktop app (like EXP Soundboard). <br>
It allows two sources: you can add your local sounds or play sounds from [MyInstants](https://www.myinstants.com/)  

![soundboard-demo](https://user-images.githubusercontent.com/7093472/130357908-b1ecddfb-73a7-45d4-90d1-9c97760f644b.gif)

### Features
* Play sounds
* Play a random sound via "Ctrl + F1"
* Add or remove sounds
* Search sounds (minimum 3 characters to get from MyInstants)
* Modify audio output
* Modify the path of the json conf file (you can use your EXP Soundboard json conf file if you have one, it's compatible)

#### Missing features
* Use hotkeys to play sounds
* Mac compatibility

## How to install
* Download the binary from the [latest release](https://github.com/Glecun/soundboard/releases/latest) 
  * For windows: `soundboard-Setup-0.0.x.exe` 
  * For Linux: `soundboard-0.0.x.AppImage`

### To redirect the audio to a communication app (like Discord)
You need to install & setup [Voicemeeter Banana](https://vb-audio.com/Voicemeeter/banana.htm) and [Virtual Audio Cable](https://vb-audio.com/Cable/index.htm) <br>
I personally followed two excellent videos from a youtuber to setup everything up, it is in French but you can watch it with subtitles or follow another video.
* Configure Voicemeeter Banana (you can skip parts for "external audio card" and "streaming") : https://www.youtube.com/watch?v=5jG3OGJ68cs 
* Configure Virtual Audio Cable (replace EXP Soundboard by this app) : https://www.youtube.com/watch?v=8aNrYkZnhFM

## Development

### Stack
<a href="https://electron.atom.io/">Electron</a><br>
<a href="https://facebook.github.io/react/">React</a><br>
<a href="https://github.com/reactjs/react-router">React Router</a><br>
<a href="https://webpack.github.io/docs/">Webpack</a><br>
<a href="https://www.npmjs.com/package/react-refresh">React Fast Refresh</a><br>

### Starting Development

Start the app in the `dev` environment:

```bash
yarn start
```

### Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

### electron-react-boilerplate docs

See our [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)
