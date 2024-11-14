import Link from "next/link";
import { FileText, type LucideIcon, ArrowRight } from "lucide-react";

interface Tool {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tags?: string[];
}

export default function Home() {
  const tools: Tool[] = [
    {
      name: "Markdown to Doc",
      description:
        "Convert Markdown files to Word documents with formatting preserved",
      href: "/md-to-doc",
      icon: FileText,
      tags: ["markdown", "docx", "converter"],
    },
  ];

  return (
    <main className="min-h-screen p-8 md:p-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4 p-6 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200/50">
          <h1
            className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent 
            bg-gradient-to-r from-gray-900 to-gray-600 animate-fade-in"
          >
            Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up">
            A small collection of tools for various purposes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <Link key={tool.name} href={tool.href} className="group relative">
              <div
                className="p-6 rounded-lg border bg-white/50 backdrop-blur-sm 
                border-gray-200/50 hover:border-gray-300 transition-all duration-300 
                hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="text-gray-600 group-hover:text-blue-600 
                    transition-colors p-2 bg-gray-50 rounded-lg 
                    group-hover:bg-blue-50"
                  >
                    <tool.icon size={24} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h2
                        className="text-xl font-semibold group-hover:text-blue-600 
                        transition-colors"
                      >
                        {tool.name}
                      </h2>
                      <ArrowRight
                        className="w-4 h-4 opacity-0 -translate-x-2 
                        group-hover:opacity-100 group-hover:translate-x-0 
                        transition-all duration-300"
                      />
                    </div>
                    <p className="text-gray-600">{tool.description}</p>
                    {tool.tags && (
                      <div className="flex gap-2 flex-wrap">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-100/50 
                            backdrop-blur-sm text-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
