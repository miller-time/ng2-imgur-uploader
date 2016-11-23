import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
export declare type ImgurUploadOptions = {
    clientId: string;
    imageData: Blob;
    title?: string;
};
export declare type ImgurUploadResponse = {
    data?: {
        link: string;
        deleteHash: string;
    };
    success: boolean;
};
export declare class Ng2ImgurUploader {
    private http;
    constructor(http: Http);
    upload(uploadOptions: ImgurUploadOptions): Subject<{
        data?: {
            link: string;
            deleteHash: string;
        };
        success: boolean;
    }>;
    delete(clientId: string, deleteHash: string): Observable<string>;
    private buildRequestOptions(clientId);
    private sendImgurRequest(imageBase64, uploadOptions, result);
}
