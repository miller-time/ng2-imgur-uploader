import { Observable } from 'rxjs';
export declare class FileReaderUtils {
    static imageDataToBase64(imageData: Blob): Observable<string>;
    static arrayBufferToBase64(buffer: ArrayBuffer): string;
}
