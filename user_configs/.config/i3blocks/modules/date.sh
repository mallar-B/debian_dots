#!/bin/bash

if [[ ! -f /tmp/time_format ]]; then
  echo "+%H:%M" >/tmp/time_format
fi

TIME_FORMAT=$(cat /tmp/time_format)

toggle_format() {
  if [[ "$TIME_FORMAT" == "+%a, %d/%m, %H:%M:%S" ]]; then
    echo "+%H:%M" >/tmp/time_format
  else
    echo "+%a, %d/%m, %H:%M:%S" >/tmp/time_format
  fi
}

show_time() {
  echo "$(date "$TIME_FORMAT")" # Display the current time in the chosen format
}

show_time

case "$BLOCK_BUTTON" in
1)
  # Left click: Toggle time format
  toggle_format
  ;;

esac
