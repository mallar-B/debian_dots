#!/bin/bash

show_media_name() {
  title=$(playerctl metadata --format " {{ title }} - {{ artist }}")
  max_length=37
  if [[ ${#title} -gt $max_length ]]; then
    echo "${title:0:max_length-3}..."
  else
    echo "$title"
  fi
}

case "$BLOCK_BUTTON" in
1)
  playerctl play-pause
  ;;
2)
  playerctl previous
  ;;
3)
  playerctl next
  ;;
esac

show_media_name
