import asyncio
import os
import base64
from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = "/app/frontend/public/images"
PROMPT = (
    "Ultra-wide cinematic photograph of a precision engineering factory floor: a long "
    "row of CNC machines and lathes receding into the distance, warm industrial pendant "
    "lights, polished concrete floor with subtle reflections, one or two machinists at "
    "work far in the background, dark moody charcoal tones with deep copper-orange rim "
    "lighting accents, premium editorial B2B manufacturing aesthetic, photorealistic, "
    "high detail, no text, no watermark, no faces close up."
)

async def main():
    chat = LlmChat(api_key=os.getenv("EMERGENT_LLM_KEY"), session_id="hero-factory", system_message="You are an image generation assistant.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=PROMPT))
    if images:
        data = base64.b64decode(images[0]["data"])
        with open(os.path.join(OUT, "hero-factory.jpg"), "wb") as f:
            f.write(data)
        print(f"OK hero-factory.jpg {len(data)} bytes")
    else:
        print("FAIL: no image")

asyncio.run(main())
