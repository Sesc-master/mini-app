import { Http, HttpOptions } from '@capacitor-community/http';

export default async function request(options: HttpOptions){
    return Http.request(options)
}