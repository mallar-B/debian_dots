#!/bin/bash

if pgrep -x "i3lock" > /dev/null; then
    exit 1
fi

rm /tmp/screenshot.png

scrot /tmp/screenshot.png
convert /tmp/screenshot.png -blur 0x12 /tmp/screenshot_blurred.png

i3lock -i /tmp/screenshot_blurred.png
