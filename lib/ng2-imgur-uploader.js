"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var rxjs_1 = require('rxjs');
var util_1 = require('./util');
var Ng2ImgurUploader = (function () {
    function Ng2ImgurUploader(http) {
        this.http = http;
    }
    Ng2ImgurUploader.prototype.upload = function (uploadOptions) {
        var _this = this;
        var result = new rxjs_1.Subject();
        util_1.FileReaderUtils.imageDataToBase64(uploadOptions.imageData)
            .subscribe(function (imageBase64) {
            _this.sendImgurRequest(imageBase64, uploadOptions, result);
        }, function (error) {
            result.error(error);
        });
        return result;
    };
    Ng2ImgurUploader.prototype.delete = function (clientId, deleteHash) {
        var options = this.buildRequestOptions(clientId);
        return this.http.delete("https://api.imgur.com/3/image/" + deleteHash, options)
            .map(function (res) { return res.text(); });
    };
    Ng2ImgurUploader.prototype.buildRequestOptions = function (clientId) {
        var headers = new http_1.Headers({
            Authorization: 'Client-ID ' + clientId,
            Accept: 'application/json'
        });
        return new http_1.RequestOptions({ headers: headers });
    };
    Ng2ImgurUploader.prototype.sendImgurRequest = function (imageBase64, uploadOptions, result) {
        var options = this.buildRequestOptions(uploadOptions.clientId);
        var body = {
            image: imageBase64,
            title: uploadOptions.title,
            type: 'base64'
        };
        this.http.post('https://api.imgur.com/3/image', body, options)
            .subscribe(function (res) {
            var responseData = res.json().data;
            result.next({
                data: {
                    link: responseData.link,
                    deleteHash: responseData.deletehash
                },
                success: true
            });
            result.complete();
        }, function (err) {
            result.error('error uploading image: ' + err.text());
        });
        return result;
    };
    Ng2ImgurUploader.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Ng2ImgurUploader.ctorParameters = [
        { type: http_1.Http, },
    ];
    return Ng2ImgurUploader;
}());
exports.Ng2ImgurUploader = Ng2ImgurUploader;
//# sourceMappingURL=ng2-imgur-uploader.js.map