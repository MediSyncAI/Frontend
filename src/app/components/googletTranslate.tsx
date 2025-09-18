"use client";
import { useEffect, useState } from "react";

type GoogleTranslateElementConstructor = new (
  options: {
    pageLanguage: string;
    includedLanguages?: string;
    layout?: number;
  },
  elementId: string
) => void;

interface GoogleTranslateInlineLayout {
  SIMPLE: number;
}

interface GoogleTranslateNamespace {
  translate: {
    TranslateElement: GoogleTranslateElementConstructor;
    InlineLayout: GoogleTranslateInlineLayout;
  };
}

declare global {
  interface Window {
    google: GoogleTranslateNamespace;
    googleTranslateElementInit: () => void;
  }
}

export default function GoogleTranslate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Load the Google Translate script dynamically
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Define the init function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,pa",
        },
        "google_translate_element"
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md text-sm font-medium transition"
      >
        🌐 Translate
      </button>

      {/* Dropdown (always in DOM, but hidden when closed) */}
      <div
        className={`mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700 transition-all duration-200 ${
          open ? "block" : "hidden"
        }`}
      >
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Language:
        </p>
        <div id="google_translate_element" className="text-sm" />
      </div>
    </div>
  );
}
