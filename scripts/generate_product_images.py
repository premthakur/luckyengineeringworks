import asyncio
import os
import base64
from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = "/app/frontend/public/images/products"
os.makedirs(OUT, exist_ok=True)

STYLE = (
    "Product photography of precision machined metal components arranged on a dark "
    "brushed-steel surface, dark charcoal near-black background, dramatic single "
    "spotlight from above, deep copper-orange rim lighting accent, ultra sharp macro "
    "detail, visible fine machining marks, premium editorial industrial aesthetic, "
    "photorealistic, high contrast, shallow depth of field, no text, no watermark, no people."
)

PRODUCTS = {
    "shafts": "A group of precision turned steel shafts of varying diameters and lengths, smooth ground finishes, neatly laid in a row. " + STYLE,
    "threaded": "CNC turned threaded components and studs with crisp external threads, some with hex heads, small batch arranged in a cluster. " + STYLE,
    "bushings": "Steel and bronze bushings and coupling sleeves, ring-shaped turned components, a few standing upright, some stacked. " + STYLE,
    "spacers": "Hollow cylindrical metal spacers and sleeves with smooth bores, arranged in a tidy grid. " + STYLE,
    "pins": "Dowel pins and turned studs, short solid cylindrical steel pins lined up diagonally. " + STYLE,
    "engine": "Machined automotive engine components — pistons, valve lifters and small turned parts. " + STYLE,
    "transmission": "Long splined automotive transmission shafts with machined gear teeth sections. " + STYLE,
    "gearbox": "Automotive gearbox components — machined gears, synchro hubs and shafts. " + STYLE,
    "steering": "Automotive steering components — tie rod ends, ball pins and machined linkages. " + STYLE,
    "suspension": "Automotive suspension parts — turned pins, bushings and machined linkage components. " + STYLE,
    "hydraulic-fittings": "Hydraulic hose fittings with hex nuts and precision threads, small assortment standing upright. " + STYLE,
    "valve": "Precision valve components — valve stems, seats and small turned internals. " + STYLE,
    "cylinder": "Hydraulic cylinder parts — a polished piston, piston rod and gland components. " + STYLE,
    "adapters": "Hydraulic adapter fittings of various sizes and thread types, neatly arranged. " + STYLE,
    "connectors": "Metal connector components for hoses and pipes, elbow and straight connectors with threads. " + STYLE,
    "machine-shafts": "Large industrial machine shafts with stepped diameters and keyways. " + STYLE,
    "rollers": "Precision ground steel rollers for industrial machinery, mirror-finished cylinders. " + STYLE,
    "bearing-housings": "Machined bearing housings — round metal casings with bolt holes and precision bores. " + STYLE,
    "coupling-hubs": "Machined coupling hubs with keyways and set screw holes, flange-style hubs. " + STYLE,
    "flanges": "Circular mounting flanges with bolt hole patterns, flat machined faces, a small stack. " + STYLE,
}

SEM = asyncio.Semaphore(5)

async def gen(name, prompt):
    async with SEM:
        path = os.path.join(OUT, f"{name}.jpg")
        if os.path.exists(path) and os.path.getsize(path) > 50000:
            print(f"SKIP {name}")
            return
        try:
            api_key = os.getenv("EMERGENT_LLM_KEY")
            chat = LlmChat(api_key=api_key, session_id=f"prod-{name}", system_message="You are an image generation assistant.")
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
    await asyncio.gather(*[gen(n, p) for n, p in PRODUCTS.items()])
    print("DONE")

asyncio.run(main())
