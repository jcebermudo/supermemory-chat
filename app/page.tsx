"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addMemory, getMemories } from "@/actions/supermemory";

export default function Home() {
  const [memory, setMemory] = useState("");
  const [query, setQuery] = useState("");
  const [fetchedMemory, setFetchedMemory] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleAddMemory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await addMemory(memory);
    console.log(response);
    setMemory("");
  };

  const handleFetchMemory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await getMemories(query);
    console.log(response);
    setFetchedMemory(response?.results[0].chunks[0].content || "");
    setIsLoading(false);
  };

  return (
    <div className="font-sans flex flex-row justify-center items-start h-screen">
      <div className="flex flex-col gap-[50px] py-[150px]">
        <div className="flex flex-col items-center justify-center gap-[20px]">
          <h2 className="text-4xl font-bold">Add memory</h2>
          <form className="flex flex-col gap-[10px]" onSubmit={handleAddMemory}>
            <Textarea
              className="w-[500px]"
              placeholder="Enter your memory"
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
            />
            <Button type="submit" className="cursor-pointer">
              Add
            </Button>
          </form>
        </div>
        <div className="flex flex-col items-center justify-center gap-[20px]">
          <h2 className="text-4xl font-bold">Search memory</h2>
          <form
            className="flex flex-col gap-[10px]"
            onSubmit={handleFetchMemory}
          >
            <Textarea
              className="w-[500px]"
              placeholder="Enter your query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" className="cursor-pointer">
              Search
            </Button>
          </form>
          {isLoading ? (
            <div className="w-[500px] h-[500px] bg-gray-200 rounded-md">
              Loading...
            </div>
          ) : (
            <div className="w-[500px] p-[30px] text-black bg-gray-200 rounded-md overflow-y-auto">
              {fetchedMemory}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
