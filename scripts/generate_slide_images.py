import asyncio
import os
import base64
from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = "/app/frontend/public/images"

STYLE = (
    "Cinematic industrial photography, dramatic low light, deep charcoal and steel grey "
    "tones with warm copper-orange highlight accents, premium editorial B2B manufacturing "
    "aesthetic, photorealistic, high detail, shallow depth of field, no text, no watermark."
)

IMAGES = {
    "slide-excavator": (
        "A heavy yellow-earth-toned hydraulic excavator working on a construction site at dusk, "
        "boom raised, machined steel pins and bushings visible at the arm joints, dust in the air. " + STYLE
    ),
    "slide-railway": (
        "A powerful railway locomotive moving along tracks at dawn, steel wheels and bogie "
        "assemblies in sharp detail, motion in the atmosphere. " + STYLE
    ),
    "slide-pharma": (
        "A polished stainless-steel pharmaceutical processing machine with turned fittings, "
        "valves and flanges, in a clean industrial plant environment. " + STYLE
    ),
}

async def gen(name, prompt):
    path = os.path.join(OUT, f"{name}.jpg")
    if os.path.exists(path) and os.path.getsize(path) > 50000:
        print(f"SKIP {name}")
        return
    try:
        chat = LlmChat(api_key=os.getenv("EMERGENT_LLM_KEY"), session_id=f"slide-{name}", system_message="You are an image generation assistant.")
        chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
        text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
        if images:
            data = base64.b64decode(images[0]["data"])
            with open(path, "wb") as f:
                f.write(data)
            print(f"OK {name} {len(data)} bytes")
        else:
            print(f"FAIL {name}")
    except Exception as e:
        print(f"ERROR {name}: {str(e)[:150]}")

async def main():
    for n, p in IMAGES.items():
        await gen(n, p)
    print("DONE")

asyncio.run(main())
