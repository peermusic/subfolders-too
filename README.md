# Subfolders Too

Helper for taking the `dataTransfer` of a drop event and returning all files (including out of subfolders).

## Install

```sh
npm install https://github.com/peermusic/subfolders-too
```

For reference see the [Browserify Handbook](https://github.com/substack/browserify-handbook#how-node_modules-works).

## Usage

```js
var subfoldersToo = require('subfolders-too')

// Bind the event and call the helper with the event
document.querySelector('#file-button').onDrop = function (event) {
  subfoldersToo(event, function (files) {
    // Files is now an array of files that were included in the drop event
    console.log(files)
  })
}
```
