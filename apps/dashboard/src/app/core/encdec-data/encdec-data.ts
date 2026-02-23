
import * as CryptoJS from 'crypto-js';
import {CommonConstants} from "../constants/common-constants";

/**
 * Summary: This method encrypts input data and returns result.
 * @param input
 * @returns
 */
export function encryptData(input: any): string | undefined {
    try {
        return CryptoJS.AES.encrypt(JSON.stringify(input), CommonConstants.encryptSecretKey).toString();
    } catch (e) {
      // Return undefined on encryption failure
      return undefined;
    }
}

/**
 * Summary: This method decrypt input data and returns result.
 * @param input
 * @returns
 */
export function decryptData(input: any): any {
    try {
        const bytes = CryptoJS.AES.decrypt(input, CommonConstants.encryptSecretKey);
        if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return input;
    } catch (e) {
      // Return input as-is on decryption failure
        return input;
    }
}
