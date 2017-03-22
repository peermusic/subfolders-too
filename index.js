var async = require('async')

// Helper for taking the dataTransfer of a drop event and returning all files (including out of subfolders).
function dropEventHelper (event, callback) {
  // Get all entries from the event
  var items = event.dataTransfer.items
  var entries = []
  for (var i = 0; i < items.length; i++) {
    var entry = items[i].webkitGetAsEntry()
    if (entry) {
      entries.push(entry)
    }
  }

  // Get all files from the entries, even if they are deep in directories
  getFilesFromEntries(entries, callback)
}

// Get the files of the webkit entries
function getFilesFromEntries (entries, callback) {
  async.map(entries, function (entry, callback) {
    traverseEntryTree(entry, function (files) { callback(null, files) })
  }, function (error, results) {
    if (error) throw error

    if (results.length === 0) {
      callback([])
      return
    }

    var files = results.concat().reduce(function (x, y) { return x.concat(y) })
    callback(files)
  })
}

// Go through tree of entries and return a list of files
function traverseEntryTree (entry, callback) {
  // This entry is a file, so we are done here
  if (entry.isFile) {
    entry.file(function (file) { callback([file]) })
  }

  // This entry is a directory, we have to go deeper
  if (entry.isDirectory) {
    var dirReader = entry.createReader()
    dirReader.readEntries(function (entries) { getFilesFromEntries(entries, callback) })
  }
}

module.exports = dropEventHelper
