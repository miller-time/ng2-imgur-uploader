import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable, Subject } from 'rxjs';

import { FileReaderUtils } from './util';

export type ImgurUploadOptions = {
    clientId: string,
    imageData: Blob,
    title?: string
};

@Injectable()
export class Ng2ImgurUploader {
    constructor(
        private http: Http
    ) { }

    upload(uploadOptions: ImgurUploadOptions) {
        let result = new Subject<string>();

        FileReaderUtils.imageDataToBase64(uploadOptions.imageData)
            .subscribe(
                (imageBase64: string) => {
                    this.sendImgurRequest(imageBase64, uploadOptions, result);
                },
                (error: string) => {
                    result.error(error);
                }
            );

        return result;
    }

    private sendImgurRequest(
        imageBase64: string,
        uploadOptions: ImgurUploadOptions,
        result: Subject<string>
    ): Observable<string> {
        let headers = new Headers({
            Authorization: 'Client-ID ' + uploadOptions.clientId,
            Accept: 'application/json'
        });
        let options = new RequestOptions({headers: headers});
        let body = {
            image: imageBase64,
            title: uploadOptions.title,
            type: 'base64'
        };

        this.http.post('https://api.imgur.com/3/image', body, options)
            .subscribe(
                (res: Response) => {
                    result.next('uploaded successfully');
                    result.complete();
                },
                (err: Response) => {
                    result.error('error uploading image: ' + err.text);
                }
            );

        return result;
    }
}
