import asyncio
import os
import base64
import sys
from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = "/app/frontend/public/images"
os.makedirs(OUT, exist_ok=True)

STYLE = "Cinematic industrial photography, dark charcoal near-black background, dramatic single spotlight from above, deep copper-orange rim lighting accent, brushed steel textures, ultra sharp macro detail, premium editorial B2B manufacturing aesthetic, photorealistic, high contrast, shallow depth of field, no text, no watermark, no people faces."

IMAGES = {
    "hero.jpg": "Extreme close-up macro photograph of a precision CNC-machined steel gear and cylindrical turned component with visible fine machining marks, resting on a dark brushed-steel surface. " + STYLE,
    "about.jpg": "Wide cinematic shot inside an Indian precision engineering workshop, a machinist in workwear operating a large industrial lathe, warm practical lights, machine tools in background, authentic factory atmosphere, dark moody tones with copper highlights, photorealistic, no text.",
    "components.jpg": "Overhead flat-lay arrangement of precision machined metal parts on a dark steel table: shafts, bushes, dowel pins, flanges, hex bolts and a machined housing, neatly spaced in a grid. " + STYLE,
    "quality.jpg": "Close-up of gloved hands measuring a precision turned steel shaft with a digital micrometer over an inspection bench with engineering drawings. " + STYLE,
    "cnc.jpg": "A modern CNC milling machine mid-cut with metal chips and coolant mist, spindle and end mill in sharp focus, dark workshop. " + STYLE,
    "rail.jpg": "Heavy railway engineering components, large machined steel wheel-set axle and bogie parts in a workshop. " + STYLE,
}

async def gen(name, prompt):
    api_key = os.getenv("EMERGENT_LLM_KEY")
    chat = LlmChat(api_key=api_key, session_id=f"img-{name}", system_message="You are an image generation assistant.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=prompt)
    text, images = await chat.send_message_multimodal_response(msg)
    if images:
        image_bytes = base64.b64decode(images[0]["data"])
        path = os.path.join(OUT, name)
        with open(path, "wb") as f:
            f.write(image_bytes)
        print(f"OK {name} {len(image_bytes)} bytes")
    else:
        print(f"FAIL {name}: no images, text={str(text)[:120]}")

async def main():
    names = sys.argv[1:] or list(IMAGES.keys())
    for n in names:
        try:
            await gen(n, IMAGES[n])
        except Exception as e:
            print(f"ERROR {n}: {e}")

asyncio.run(main())
