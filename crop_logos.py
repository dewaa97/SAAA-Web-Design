from PIL import Image
import os

# Partners from slide-07 (1027x71) - 6 logos: IMDA, CAAS, IATA, ESG, IMDA-text, MINDEF
# Partners from slide-08 (1027x71) - 6 logos: WSG, SATS, dnata, RP, TP, CCN

output_dir = "/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/images/partners"
members_dir = "/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/images/members"

# Crop slide-07 (partners) - approximate positions based on visual inspection
img7 = Image.open(f"{members_dir}/clients-slide-07.jpg")
w7, h7 = img7.size
print(f"slide-07: {w7}x{h7}")

# Partners: IMDA(crest), CAAS, IATA, EnterpriseSG, IMDA(text), MINDEF
partner_crops_7 = [
    ("imda-crest", 0, 170),
    ("caas-partner", 170, 170),
    ("iata-partner", 340, 170),
    ("esg-partner", 510, 170),
    ("imda-text", 680, 170),
    ("mindef-partner", 850, 170),
]

for name, x, width in partner_crops_7:
    crop = img7.crop((x, 0, x + width, h7))
    crop.save(f"{output_dir}/{name}.png", "PNG")
    print(f"Saved {name}.png ({width}x{h7})")

# Crop slide-08 (partners) - WSG, SATS, dnata, RP, TP, CCN
img8 = Image.open(f"{members_dir}/clients-slide-08.jpg")
w8, h8 = img8.size
print(f"slide-08: {w8}x{h8}")

partner_crops_8 = [
    ("wsg-partner", 0, 170),
    ("sats-partner", 170, 170),
    ("dnata-partner", 340, 170),
    ("rp-partner", 510, 170),
    ("tp-partner", 680, 170),
    ("ccn-partner", 850, 170),
]

for name, x, width in partner_crops_8:
    crop = img8.crop((x, 0, x + width, h8))
    crop.save(f"{output_dir}/{name}.png", "PNG")
    print(f"Saved {name}.png ({width}x{h8})")

print("Done cropping partner logos!")
