#!/bin/bash

# Ensure the script is called with exactly one argument
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <file.txt>"
  exit 1
fi

# Define the input file
input_file="$1"

# Temporary files to store package names
temp_file1=$(mktemp)
temp_file2=$(mktemp)

# Process the input file
while IFS= read -r line; do
  # Skip empty lines
  [ -z "$line" ] && continue
  
  # Ignore lines that start with ##
  if [[ "$line" =~ ^## ]]; then
    continue
  fi
  
  # Check if line starts with --
  if [[ "$line" =~ ^-- ]]; then
    echo "${line:2}" >> "$temp_file1"
  else
    echo "$line" >> "$temp_file2"
  fi
done < "$input_file"

# Function to install packages
install_packages() {
  local packages="$1"
  if [ -n "$packages" ]; then
    echo "Installing packages: $packages"
    sudo nala install $packages
  fi
}

# Install packages starting with --
packages1=$(tr '\n' ' ' < "$temp_file1")
install_packages "$packages1"

# Install remaining packages (not starting with -- and not commented)
packages2=$(tr '\n' ' ' < "$temp_file2")
install_packages "$packages2"

# Clean up temporary files
rm "$temp_file1" "$temp_file2"

