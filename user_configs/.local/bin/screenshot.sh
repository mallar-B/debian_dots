#!/bin/bash

mkdir -p ~/Pictures/Screenshots

TIMESTAMP=$(date +"%d-%m-%Y_%H-%M-%S")

FILENAME="Screenshot_${TIMESTAMP}.png"

FILEPATH="/home/$(whoami)/Pictures/Screenshots"

scrot -s "$FILEPATH/$FILENAME"
