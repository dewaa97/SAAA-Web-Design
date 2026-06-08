from PIL import Image
import os

members_dir = "/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/images/members"
output_dir = "/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/images/members"

# Each slide has 4-5 logos side by side
# We'll crop them individually based on visual inspection

# slide-04: 1123x91 - Nankai, Nissin, Nippon Express, Mitsubishi (4 logos)
img = Image.open(f"{members_dir}/clients-slide-04.jpg")
logos_04 = [
    ("nankai", 0, 280),
    ("nissin", 280, 280),
    ("nippon-express", 560, 280),
    ("mitsubishi", 840, 283),
]

for name, x, w in logos_04:
    crop = img.crop((x, 0, x+w, 91))
    crop.save(f"{output_dir}/{name}.jpg", "JPEG", quality=95)
    print(f"Saved {name}.jpg")

# slide-03: 1124x102 - MOL, M+R SPEDAG, Mitsui-Soko, Merstar, NNR (5 logos)
img = Image.open(f"{members_dir}/clients-slide-03.jpg")
logos_03 = [
    ("mol", 0, 224),
    ("mr-spedag", 224, 225),
    ("mitsui-soko", 449, 225),
    ("merstar", 674, 225),
    ("nnr", 899, 225),
]

for name, x, w in logos_03:
    crop = img.crop((x, 0, x+w, 102))
    crop.save(f"{output_dir}/{name}.jpg", "JPEG", quality=95)
    print(f"Saved {name}.jpg")

# slide-01: 1124x65 - LX Pantos, Leschaco, Logisteed, Logwin (4 logos)
img = Image.open(f"{members_dir}/clients-slide-01.jpg")
logos_01 = [
    ("lx-pantos", 0, 281),
    ("leschaco", 281, 281),
    ("logisteed", 562, 281),
    ("logwin", 843, 281),
]

for name, x, w in logos_01:
    crop = img.crop((x, 0, x+w, 65))
    crop.save(f"{output_dir}/{name}.jpg", "JPEG", quality=95)
    print(f"Saved {name}.jpg")

# slide-05: 1124x101 - Ninjavan, OCS, On Time, PIL, Quickflo (5 logos)
img = Image.open(f"{members_dir}/clients-slide-05.jpg")
logos_05 = [
    ("ninjavan", 0, 224),
    ("ocs", 224, 225),
    ("on-time", 449, 225),
    ("pil", 674, 225),
    ("quickflo", 899, 225),
]

for name, x, w in logos_05:
    crop = img.crop((x, 0, x+w, 101))
    crop.save(f"{output_dir}/{name}.jpg", "JPEG", quality=95)
    print(f"Saved {name}.jpg")

# slide-06: 1125x123 - RCS, Sankyu, Satsaco, SC Fulfill, SF (5 logos)
img = Image.open(f"{members_dir}/clients-slide-06.jpg")
logos_06 = [
    ("rcs-logistics", 0, 225),
    ("sankyu", 225, 225),
    ("satsaco", 450, 225),
    ("sc-fulfill", 675, 225),
    ("sf-international", 900, 225),
]

for name, x, w in logos_06:
    crop = img.crop((x, 0, x+w, 123))
    crop.save(f"{output_dir}/{name}.jpg", "JPEG", quality=95)
    print(f"Saved {name}.jpg")

# slide-02: 1124x93 - Logico, Mega-Air, Morrison Express (3 logos + extras)
img = Image.open(f"{members_dir}/clients-slide-02.jpg")
logos_02 = [
    ("logico", 0, 374),
    ("mega-air", 374, 374),
    ("morrison-express", 748, 376),
]

for name, x, w in logos_02:
    crop = img.crop((x, 0, x+w, 93))
    crop.save(f"{output_dir}/{name}.jpg", "JPEG", quality=95)
    print(f"Saved {name}.jpg")

print("All member logos cropped!")
