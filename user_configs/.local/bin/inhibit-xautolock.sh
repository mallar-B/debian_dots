#!/bin/bash

# Log file
LOGFILE="/home/mallarb/inhibit-xautolock.log"

# Function to log messages
log() {
    echo "$(date) - $1" >> "$LOGFILE"
}

# Log start of script
log "Script started"

# Check if PulseAudio is running
if pgrep -x "pulseaudio" >/dev/null; then
    sleep 1
    log "PulseAudio is running"

    # Get the number of active sink inputs
    ACTIVE_SINK_INPUTS=$(pactl list sink-inputs | grep -c "Sink Input")

    if [ "$ACTIVE_SINK_INPUTS" -eq 0 ]; then
        log "No audio playing"
        xautolock -enable && log "xautolock is enabled"
        echo "not playin"
    else
        log "Audio is playing"
        xautolock -disable && log "xautolock is disabled"
        echo "playingjj"
    fi
else
    log "PulseAudio is not running"
    xautolock -enable&
fi

# Log end of script
log "Script ended"

