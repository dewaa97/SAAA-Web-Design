from PIL import Image

# Load SAAA logo
logo = Image.open("/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/images/saaa-logo.png").convert("RGBA")

# Create favicon with BLACK background
favicon_size = 64
favicon = Image.new("RGBA", (favicon_size, favicon_size), (0, 0, 0, 255))

# Resize logo to fit
logo_resized = logo.resize((48, 48), Image.LANCZOS)

# Calculate position to center
x = (favicon_size - logo_resized.width) // 2
y = (favicon_size - logo_resized.height) // 2

# Paste logo onto black background
favicon.paste(logo_resized, (x, y), logo_resized)

# Save as favicon
favicon.save("/Users/dewaa97/Documents/FlyingCape/Projects/SAAA/images/favicon.png", "PNG")
print("Favicon created with black background!")
