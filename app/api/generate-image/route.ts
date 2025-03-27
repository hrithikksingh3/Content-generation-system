import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse JSON from the incoming request
    const { prompt, aspect_ratio, negative_prompt, seed, output_format, style_preset } =
      await req.json();

    // Build a FormData object for Stability's endpoint
    const formData = new FormData();
    formData.append("prompt", prompt || "");
    formData.append("aspect_ratio", aspect_ratio || "16:9");
    formData.append("negative_prompt", negative_prompt || "");
    formData.append("seed", seed ?? "0");
    formData.append("output_format", output_format || "png");
    formData.append("style_preset", style_preset || "cinematic");

    // Send the request as multipart/form-data to Stability AI
    const response = await fetch("https://api.stability.ai/v2beta/stable-image/generate/core", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
        "Accept": "application/json"
      },
      body: formData,
    });

    // If the response is not OK, return the error text
    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `Stability API error: ${err}` },
        { status: response.status }
      );
    }

    // Parse the JSON response from Stability
    const data = await response.json();
    console.log("Stability API Response Data:", data);

    // Check for the 'image' field in the response
    if (!data.image) {
      return NextResponse.json(
        { error: "No image found in response", data },
        { status: 500 }
      );
    }

    // Convert the base64 string into a data URL
    const imageUrl = `data:image/png;base64,${data.image}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
