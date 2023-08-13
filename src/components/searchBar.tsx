"use client";

import { useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SearchBar() {
  const [name, setName] = useState<string | undefined>(undefined);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);

  return (
    <div className="my-4 flex w-full items-center space-x-2">
      <Input
        type="text"
        placeholder="Name"
        onChange={(newName) => setName(newName.target.value)}
      />
      <Button
        type="submit"
        variant="default"
        onClick={() => {
          if (name !== searchName) {
            setSearchName(name);
          }
        }}
      >
        Seek
      </Button>
    </div>
  );
}
