from PIL import Image

# Load SAAA logo
logo = Image.open("/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/images/saaa-logo.png").convert("RGBA")

# Create favicon with red background
favicon_size = 64
favicon = Image.new("RGBA", (favicon_size, favicon_size), (196, 30, 58, 255))

# Resize logo to fit
logo_resized = logo.resize((48, 48), Image.LANCZOS)

# Calculate position to center
x = (favicon_size - logo_resized.width) // 2
y = (favicon_size - logo_resized.height) // 2

# Paste logo onto red background
favicon.paste(logo_resized, (x, y), logo_resized)

# Save as favicon
favicon.save("/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/images/favicon.png", "PNG")
print("Favicon created!")

# Also create a larger version for high-res displays
favicon_32 = favicon.resize((32, 32), Image.LANCZOS)
favicon_32.save("/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/images/favicon-32.png", "PNG")
print("Favicon 32x32 created!")
