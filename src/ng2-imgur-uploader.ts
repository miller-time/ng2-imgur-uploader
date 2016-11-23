import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable, Subject } from 'rxjs';

import { FileReaderUtils } from './util';

export type ImgurUploadOptions = {
    clientId: string,
    imageData: Blob,
    title?: string
};

export type ImgurUploadResponse = {
    data?: {
        link: string,
        deleteHash: string
    },
    success: boolean
};

@Injectable()
export class Ng2ImgurUploader {
    constructor(
        private http: Http
    ) { }

    upload(uploadOptions: ImgurUploadOptions) {
        let result = new Subject<ImgurUploadResponse>();

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
        result: Subject<ImgurUploadResponse>
    ): Observable<ImgurUploadResponse> {
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
                    let responseData = res.json().data;
                    result.next({
                        data: {
                            link: responseData.link,
                            deleteHash: responseData.deletehash
                        },
                        success: true
                    });
                    result.complete();
                },
                (err: Response) => {
                    result.error('error uploading image: ' + err.text());
                }
            );

        return result;
    }
}
