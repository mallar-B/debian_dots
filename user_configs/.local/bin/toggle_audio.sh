#!/bin/bash

SINKS=($(pactl list sinks short | awk '{print $2}'))
CURRENT_SINK=$(pactl get-default-sink)
SINK_SIZE=${#SINKS[@]}

for ((i = 0; i < $SINK_SIZE; i++)); do
  if [[ "${SINKS[i]}" == "$CURRENT_SINK" ]]; then
    NEW_SINK=${SINKS[i + 1]:-${SINKS[0]}} ## this is called default value operator
    pactl set-default-sink $NEW_SINK
  fi
  pkill -RTMIN+10 i3blocks ## so i3blocks updates
done
