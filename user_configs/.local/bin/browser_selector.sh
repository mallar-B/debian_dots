#!/bin/bash

# Check if a URL is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <URL>"
  exit 1
fi

URL="$1"

# Find .desktop files with Category containing WebBrowser
browsers=$(grep -rl "Categories=.*WebBrowser" /usr/share/applications/*.desktop | xargs -n 1 basename | sed 's/\\.desktop$//')

if [ -z "$browsers" ]; then
  echo "No web browsers found."
  exit 1
fi

# Use rofi to select a browser
selected_browser=$(echo "$browsers" | rofi -dmenu -p "Select a browser")

# Check if a selection was made
if [ -z "$selected_browser" ]; then
  echo "No browser selected. Exiting."
  exit 0
fi

# Open the URL with the selected browser
desktop_file="/usr/share/applications/$selected_browser.desktop"

# Extract the Exec command from the .desktop file
exec_command=$(grep -m 1 '^Exec=' "$desktop_file" | sed 's/^Exec=//;s/ %.*//')

if [ -n "$exec_command" ]; then
  # Execute the browser with the URL
  $exec_command "$URL" &
else
  echo "Failed to retrieve Exec command from $desktop_file."
  exit 1
fi
