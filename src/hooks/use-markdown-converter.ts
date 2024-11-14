"use client";

import { useState } from "react";
import { marked } from "marked";
import { saveAs } from "file-saver";

interface ConversionOptions {
  h1Size: number;
  h2Size: number;
  h3Size: number;
  h4Size: number;
  lineHeight: number;
  baseFontSize: number;
  breaks: boolean;
  gfm: boolean;
}

type ConversionResult = {
  success: boolean;
  error?: string;
};

export default function useMarkdownConverter() {
  const [isConverting, setIsConverting] = useState(false);

  const convertToWord = async (
    markdown: string,
    options: ConversionOptions,
  ): Promise<ConversionResult> => {
    setIsConverting(true);

    try {
      if (!markdown) {
        throw new Error("Markdown content is required");
      }

      // Configure marked options
      marked.setOptions({
        breaks: options.breaks,
        gfm: options.gfm,
        silent: false, // Throw errors instead of logging
      });

      const html = marked(markdown);

      const wordHtml = `
        <html xmlns:w="urn:schemas-microsoft-com:office:word" 
              xmlns="http://www.w3.org/TR/REC-html40">
          <head>
            <meta charset="utf-8">
            <style>
              @page Section1 {
                margin: 1.0in;
                size: 8.5in 11.0in;
                mso-page-orientation: portrait;
              }
              div.Section1 { page: Section1; }
              body {
                font-family: Calibri, sans-serif;
                font-size: ${options.baseFontSize}pt;
                line-height: ${options.lineHeight};
              }
              h1 { font-size: ${options.h1Size}pt; margin: 24pt 0 12pt 0; }
              h2 { font-size: ${options.h2Size}pt; margin: 20pt 0 10pt 0; }
              h3 { font-size: ${options.h3Size}pt; margin: 16pt 0 8pt 0; }
              h4 { font-size: ${options.h4Size}pt; margin: 14pt 0 6pt 0; }
              p { margin: 0 0 10pt 0; }
              ul, ol { margin: 0 0 10pt 2em; }
              li { margin: 0 0 5pt 0; }
              code {
                font-family: 'Courier New', monospace;
                background-color: #f5f5f5;
                padding: 2pt;
                mso-highlight: #f5f5f5;
              }
              pre {
                background-color: #f5f5f5;
                padding: 10pt;
                margin: 0 0 10pt 0;
                white-space: pre-wrap;
                word-wrap: break-word;
                mso-highlight: #f5f5f5;
              }
            </style>
          </head>
          <body>
            <div class="Section1">
              ${html}
            </div>
          </body>
        </html>
      `;

      const blob = new Blob([wordHtml], {
        type: "application/msword;charset=utf-8",
      });

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `converted-document-${timestamp}.doc`;

      await saveAs(blob, filename);

      return { success: true };
    } catch (error) {
      console.error("Error converting to Word:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    } finally {
      setIsConverting(false);
    }
  };

  return {
    convertToWord,
    isConverting,
  } as const;
}
