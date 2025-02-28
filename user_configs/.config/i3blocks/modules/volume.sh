#!/bin/bash

CURR_SINK=$(pactl get-default-sink)
get_icon() {
  if [[ $CURR_SINK == *"hdmi-stereo" ]]; then
    icon=󰕾
  fi
  if [[ $CURR_SINK == *"analog-stereo" ]]; then
    icon=󰋋
  fi

}

get_volume() {
  volume=$(pactl get-sink-volume @DEFAULT_SINK@ | grep -oP '\d+%' | head -n 1)
  get_icon

  mute_status=$(pactl list sinks | grep -A 20 "$CURR_SINK" | grep 'Mute' | awk '{print $2}')

  if [ "$mute_status" == "yes" ]; then
    volume="MUTED"
    if [[ $CURR_SINK == *"hdmi-stereo" ]]; then
      icon=󰖁
    fi
    if [[ $CURR_SINK == *"analog-stereo" ]]; then
      icon=󰟎
    fi
  fi
  echo "$icon $volume"
  pkill -RTMIN+10 i3blocks
}

get_volume

case "$BLOCK_BUTTON" in
1)
  i3-msg 'exec --no-startup-id pavucontrol'
  ;;
2)
  pkill pavucontrol
  ;;
3) ## TODO: mute is glitchy
  pactl set-sink-mute @DEFAULT_SINK@ toggle
  get_volume && pkill -RTMIN+10 i3blocks
  ;;
4)
  pactl set-sink-volume @DEFAULT_SINK@ +3%
  get_volume && pkill -RTMIN+10 i3blocks
  ;;
5)
  pactl set-sink-volume @DEFAULT_SINK@ -3%
  get_volume && pkill -RTMIN+10 i3blocks
  ;;

esac
