import asyncio
import os
import base64
from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = "/app/frontend/public/images/blog"
os.makedirs(OUT, exist_ok=True)

STYLE = (
    "Cinematic industrial photography, dark charcoal near-black background, dramatic "
    "single spotlight from above, deep copper-orange rim lighting accent, brushed steel "
    "textures, ultra sharp detail, premium editorial B2B manufacturing aesthetic, "
    "photorealistic, high contrast, shallow depth of field, no text, no watermark, no faces."
)

IMAGES = {
    "blog-1": "Close-up of a massive steel excavator boom pin and bushing joint on heavy construction equipment, grease and machined metal detail. " + STYLE,
    "blog-2": "A CNC lathe spindle and chuck machining a rotating steel part with coolant, next to it a conventional manual lathe in a workshop. " + STYLE,
    "blog-3": "Engineering drawings and blueprints on a steel workbench with a digital caliper, micrometer and finished machined components laid on top, gloved hands measuring. " + STYLE,
    "blog-4": "Raw metal bar stock on the left transforming into finished precision machined components on the right, arranged as a journey across a dark steel table. " + STYLE,
}

SEM = asyncio.Semaphore(3)

async def gen(name, prompt):
    async with SEM:
        path = os.path.join(OUT, f"{name}.jpg")
        if os.path.exists(path) and os.path.getsize(path) > 50000:
            print(f"SKIP {name}")
            return
        try:
            api_key = os.getenv("EMERGENT_LLM_KEY")
            chat = LlmChat(api_key=api_key, session_id=f"blog-{name}", system_message="You are an image generation assistant.")
            chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
            text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
            if images:
                data = base64.b64decode(images[0]["data"])
                with open(path, "wb") as f:
                    f.write(data)
                print(f"OK {name} {len(data)} bytes")
            else:
                print(f"FAIL {name}: no images")
        except Exception as e:
            print(f"ERROR {name}: {str(e)[:150]}")

async def main():
    await asyncio.gather(*[gen(n, p) for n, p in IMAGES.items()])
    print("DONE")

asyncio.run(main())
