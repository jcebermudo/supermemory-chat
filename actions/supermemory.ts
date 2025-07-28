"use server";

import Supermemory from 'supermemory';

const client = new Supermemory({
  apiKey: process.env.SUPERMEMORY_API_KEY,
});

export async function addMemory(memory: string) {
    try {
        const response = await client.memories.add({
            content: memory,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    } 
}

export async function getMemories (q: string) {
    try {
        const response = await client.search.execute({
            q: q,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}