#!/bin/bash

LOCK_TIME=180
SUSPEND_TIME=300
GRACE_PERIOD_AUDIO=60 ## so that it does not suspend right after audio stops
LAST_AUDIO_TIME=0

while true; do
  CURR_TIME=$(date +%s)
  ## dont lock when sound is playing
  if [[ $(pacmd list-sink-inputs | head -c 1) -ne 0 ]]; then
    LAST_AUDIO_TIME=$CURR_TIME
    continue
  fi

  ## wait for at least 1 min before suspending
  TIME_SINCE_AUDIO=$((CURR_TIME - LAST_AUDIO_TIME))
  if [[ $TIME_SINCE_AUDIO -lt $GRACE_PERIOD_AUDIO ]]; then
    continue
  fi

  ## if not a number dont progress(e.g. without xserver it shows 'cant open display')
  if [[ ! "$(xprintidle)" =~ ^[0-9]+$ ]]; then
    continue
  fi

  IDLE_TIME=$(($(xprintidle) / 1000))
  ## no need to exec i3lock multiple times
  if [[ $IDLE_TIME -gt $LOCK_TIME ]]; then
    pidof i3lock || bash -c i3lock
  fi

  if [[ $IDLE_TIME -gt $SUSPEND_TIME ]]; then
    systemctl suspend

    ## after suspend
    sleep 15
  fi

  # check every 10 seconds
  sleep 10
done
