#!/bin/bash

mem_info=$(free -m)

total_mem=$(echo "$mem_info" | awk '/^Mem:/ {print $2}')
available_mem=$(echo "$mem_info" | awk '/^Mem:/ {print $7}')

free_percentage=$(awk "BEGIN {printf \"%.2f\", ($available_mem / $total_mem) * 100}")
used_percentage=$(awk "BEGIN {printf \"%.2f\", 100 - $free_percentage}")

echo "$used_percentage%"
