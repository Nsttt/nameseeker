"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Terminal } from "lucide-react";

export default function Home() {
  const [name, setName] = useState<string | undefined>(undefined);

  return (
    <>
      <h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl">
        Name Seeker
      </h1>
      <p className="mt-2 text-center text-lg text-gray-500">
        Search if the name if your next idea is available everywhere
      </p>
      <div className="my-4 flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(newName) => setName(newName.target.value)}
        />
        <Button type="submit" variant="default">
          Seek
        </Button>
      </div>
      {/* <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert> */}
    </>
  );
}
