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

    delete(clientId: string, deleteHash: string): Observable<string> {
        let options = this.buildRequestOptions(clientId);
        return this.http.delete(`https://api.imgur.com/3/image/${deleteHash}`)
            .map((res: Response) => res.text());
    }

    private buildRequestOptions(clientId) {
        let headers = new Headers({
            Authorization: 'Client-ID ' + clientId,
            Accept: 'application/json'
        });
        return new RequestOptions({headers: headers});
    }

    private sendImgurRequest(
        imageBase64: string,
        uploadOptions: ImgurUploadOptions,
        result: Subject<ImgurUploadResponse>
    ): Observable<ImgurUploadResponse> {
        let options = this.buildRequestOptions(uploadOptions.clientId);
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
