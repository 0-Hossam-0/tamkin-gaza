"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import AppButton from "../buttons/AppButton";
import { Button } from "../ui/button";

const ReelCreator = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<{
    title: string;
    description: string;
    video: File | null;
  }>({
    title: "",
    description: "",
    video: null,
  });

  const canSend = form.title.trim() && form.description.trim() && form.video;

  async function handleSubmit() {
    try {
      setIsLoading(true);

      // simulate API
      await new Promise((res) => setTimeout(res, 1000));

      console.log("Created Reel:", form);

      // reset
      setForm({ title: "", description: "", video: null });
      setOpen(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button className="inline-flex w-fit items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-indigo-600 transition">
          <Plus className="w-4 h-4" />
          Add Reel
        </Button>
      </DialogTrigger>

      {/* Content */}
      <DialogContent className="sm:max-w-[420px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Create Reel
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <div className="flex flex-col gap-4 mt-2">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Title</Label>
            <Input
              placeholder="Reel title..."
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="focus:ring-2 focus:ring-primary-200"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Description</Label>
            <Input
              placeholder="Short description..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="focus:ring-2 focus:ring-primary-200"
            />
          </div>

          {/* URL */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Video</Label>
            <Input
              type="file"
              accept="video/*"
              placeholder="Upload video..."
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setForm({ ...form, video: file });
                }
              }}
              className="focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="mt-4 flex gap-2">
          <Button variant={"outline"} onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <AppButton
            onClick={handleSubmit}
            isLoading={isLoading}
            canSend={!!canSend}
            className="bg-primary-600 hover:bg-primary-700 text-white"
          >
            Create
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReelCreator;
