"use strict";
var rxjs_1 = require('rxjs');
var FileReaderUtils = (function () {
    function FileReaderUtils() {
    }
    FileReaderUtils.imageDataToBase64 = function (imageData) {
        var result = new rxjs_1.Subject();
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            var buffer = reader.result;
            var imageBase64 = FileReaderUtils.arrayBufferToBase64(buffer);
            result.next(imageBase64);
        });
        reader.addEventListener('error', function () {
            result.error('error reading image data');
        });
        reader.readAsArrayBuffer(imageData);
        return result;
    };
    FileReaderUtils.arrayBufferToBase64 = function (buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        for (var i = 0; i < bytes.byteLength; ++i) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };
    return FileReaderUtils;
}());
exports.FileReaderUtils = FileReaderUtils;
//# sourceMappingURL=util.js.map