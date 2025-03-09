import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Get title from query params or use default
    const title = searchParams.get("title") || "Hardy Technology"

    // Get subtitle from query params or use default
    const subtitle = searchParams.get("subtitle") || "Web Development & Training Services"

    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#f8fafc",
          padding: "40px",
          backgroundImage: "linear-gradient(to bottom right, #3b82f6, #1e40af)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "40px",
            width: "90%",
            height: "80%",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: "bold",
              color: "#1e3a8a",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#64748b",
              textAlign: "center",
              maxWidth: "80%",
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: "#3b82f6",
                fontWeight: "bold",
              }}
            >
              hardytechnology.xyz
            </div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error("Error generating OG image:", e)
    return new Response("Failed to generate image", { status: 500 })
  }
}

