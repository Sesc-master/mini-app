import {createClient} from "redis";

const getClient = async () => {
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    return client;
}

export async function set(key : string, obj : string){
    const client = await getClient();
    await client.connect();
    await client.set(key, obj);
    await client.disconnect();
}

export async function get(key: string){
    const client = await getClient();
    await client.connect();
    const result = await client.get(key);
    await client.disconnect();
    return result;
}

export async function setTTL(key: string, ttl: number){
    const client = await getClient();
    await client.connect();
    await client.expire(key, Number(ttl));
    console.log(await client.ttl(key));
    await client.disconnect();
}

export async function getTTL(key: string){
    const client = await getClient();
    await client.connect();
    const ttl = await client.ttl(key);
    await client.disconnect();
    return ttl;
}


