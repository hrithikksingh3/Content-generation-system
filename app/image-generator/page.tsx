"use client";
import { useState } from "react";

export default function ImageGeneratorPage() {
  // Form state
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [seed, setSeed] = useState("0");
  const [outputFormat, setOutputFormat] = useState("png");
  const [stylePreset, setStylePreset] = useState("cinematic");

  // Response state
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          aspect_ratio: aspectRatio,
          negative_prompt: negativePrompt,
          seed,
          output_format: outputFormat,
          style_preset: stylePreset,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to generate image");
      } else {
        // data.imageUrl is a "data:image/png;base64,..." string
        setImageUrl(data.imageUrl);
      }
    } catch (err: any) {
      console.error("Error generating image:", err);
      setError("Something went wrong, check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded-md border p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">AI Image Generator</h1>
        <p className="text-gray-600 mb-6">
          Generate high-quality images using AI based on your given prompt.
        </p>

        {/* Form */}
        <div className="flex flex-col gap-4">
          {/* Prompt */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Prompt:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {/* Aspect Ratio */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Aspect Ratio:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
            />
          </div>

          {/* Negative Prompt */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Negative Prompt:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
            />
          </div>

          {/* Seed */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Seed:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
            />
          </div>

          {/* Output Format */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Output Format:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            />
          </div>

          {/* Style Preset */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Style Preset:
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={stylePreset}
              onChange={(e) => setStylePreset(e.target.value)}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Display Generated Image */}
        {imageUrl && (
          <div className="mt-6 flex justify-center">
            <img
              src={imageUrl}
              alt="Generated"
              className="rounded-md shadow-md max-w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
