#!/bin/bash

# Set your lock screen background image (optional)
BACKGROUND_IMAGE="$HOME/.config/i3lock/background.png"

# Colors for lock screen (use hex without `#`)
BLUR="000000"             # Background color (black)
RING_COLOR="ffffff"       # Ring color (white)
RING_VER_COLOR="00ff00"   # Verification color (green)
RING_WRONG_COLOR="ff0000" # Wrong input color (red)
TEXT_COLOR="ffffff"       # Text color (white)
KEY_HL_COLOR="00ff00"     # Key highlight color (green)
BS_HL_COLOR="ff0000"      # Backspace highlight color (red)

# Take a screenshot and blur it (optional)
TEMP_BG="/tmp/i3lock_bg.png"
scrot "$TEMP_BG"
convert "$TEMP_BG" -blur 0x20 "$TEMP_BG"

# Run i3lock with the specified options
i3lock \
  --image="$TEMP_BG" \
  --color=$BLUR

# Optionally, remove the temporary blurred background
rm "$TEMP_BG"
