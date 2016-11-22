import { NgModule, ModuleWithProviders, Provider } from '@angular/core';

import { Ng2ImgurUploader } from './ng2-imgur-uploader';

@NgModule({})
export class Ng2ImgurUploaderModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: Ng2ImgurUploaderModule,
            providers: ng2ImgurProvider()
        };
    }
}

function ng2ImgurFactory() {
    return new Ng2ImgurUploader();
}

function ng2ImgurProvider(): Provider[] {
    return [
        { provide: Ng2ImgurUploader, useFactory: ng2ImgurFactory },
    ];
}
