"use strict";
var core_1 = require('@angular/core');
var ng2_imgur_uploader_1 = require('./ng2-imgur-uploader');
var Ng2ImgurUploaderModule = (function () {
    function Ng2ImgurUploaderModule() {
    }
    Ng2ImgurUploaderModule.forRoot = function () {
        return {
            ngModule: Ng2ImgurUploaderModule,
            providers: ng2ImgurProvider()
        };
    };
    Ng2ImgurUploaderModule.decorators = [
        { type: core_1.NgModule, args: [{},] },
    ];
    /** @nocollapse */
    Ng2ImgurUploaderModule.ctorParameters = [];
    return Ng2ImgurUploaderModule;
}());
exports.Ng2ImgurUploaderModule = Ng2ImgurUploaderModule;
function ng2ImgurFactory() {
    return new ng2_imgur_uploader_1.Ng2ImgurUploader(null);
}
function ng2ImgurProvider() {
    return [
        { provide: ng2_imgur_uploader_1.Ng2ImgurUploader, useFactory: ng2ImgurFactory },
    ];
}
//# sourceMappingURL=ng2-imgur-uploader.module.js.map