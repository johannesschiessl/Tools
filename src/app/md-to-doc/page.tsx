"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings2, FileText, ArrowRight, ChevronLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import useMarkdownConverter from "@/hooks/use-markdown-converter";
import { toast } from "sonner";
import Link from "next/link";

export default function Page() {
  const [markdown, setMarkdown] = useState("");
  const [options, setOptions] = useState({
    h1Size: 24,
    h2Size: 20,
    h3Size: 16,
    h4Size: 14,
    lineHeight: 1.5,
    baseFontSize: 11,
    breaks: true,
    gfm: true,
  });

  const { convertToWord, isConverting } = useMarkdownConverter();

  const handleConvert = async () => {
    if (!markdown.trim()) {
      toast.error("Please enter some markdown text");
      return;
    }

    try {
      const result = await convertToWord(markdown, options);
      if (!result.success) {
        toast.error(result.error || "Failed to convert document");
        return;
      }
      toast.success("Document converted successfully");
    } catch {
      toast.error("An unexpected error occurred");
    }
  };

  const handleOptionChange = (option: string, value: number | boolean) => {
    setOptions((prev) => ({ ...prev, [option]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 p-4 relative">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 
          transition-colors mb-6 group absolute top-4 left-4 md:left-8"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Tools
      </Link>

      <div className="max-w-4xl mx-auto pt-16">
        <Card
          className="w-full backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 
          border-gray-200/50 shadow-xl animate-fade-in"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                Markdown to Word Converter
              </CardTitle>
              <p className="text-gray-500 dark:text-gray-400">
                Convert your Markdown to formatted Word documents
              </p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium leading-none mb-3 flex items-center gap-2">
                    <Settings2 className="h-4 w-4" />
                    Document Settings
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(options).map(([key, value]) => {
                      if (typeof value === "boolean") {
                        return (
                          <div
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <Label htmlFor={key} className="capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </Label>
                            <Switch
                              id={key}
                              checked={value}
                              onCheckedChange={(checked) =>
                                handleOptionChange(key, checked)
                              }
                            />
                          </div>
                        );
                      }
                      return (
                        <div key={key} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </Label>
                            <span className="text-sm text-muted-foreground">
                              {value}
                              {key.includes("Size") ? "pt" : ""}
                            </span>
                          </div>
                          <Slider
                            className="cursor-pointer"
                            min={key.includes("Size") ? 8 : 1}
                            max={key.includes("Size") ? 36 : 2}
                            step={key.includes("Size") ? 1 : 0.1}
                            value={[value as number]}
                            onValueChange={(values) =>
                              handleOptionChange(key, values[0])
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter your Markdown here..."
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="min-h-[400px] resize-y bg-white/50 dark:bg-gray-950/50 
                backdrop-blur-sm focus:bg-white dark:focus:bg-gray-950 
                transition-colors"
            />
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleConvert}
              disabled={isConverting}
              className="relative group overflow-hidden px-6"
              size="lg"
            >
              <span className="flex items-center gap-2">
                {isConverting ? (
                  <>
                    <div
                      className="h-4 w-4 animate-spin rounded-full border-2 
                      border-gray-300 border-t-white"
                    />
                    Converting...
                  </>
                ) : (
                  <>
                    Convert to Word
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 
                      transition-transform"
                    />
                  </>
                )}
              </span>
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up hidden md:block">
          {[
            {
              title: "Paste or Type",
              description: "Enter your Markdown text in the editor above",
            },
            {
              title: "Customize",
              description: "Adjust formatting settings to match your needs",
            },
            {
              title: "Convert",
              description: "Click convert and download your Word document",
            },
          ].map((tip, index) => (
            <div
              key={tip.title}
              className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm 
                p-4 rounded-lg border border-gray-200/50"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
