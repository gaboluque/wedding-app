#!/bin/bash

# Check if a folder path is provided as a command-line argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <folder_path>"
    exit 1
fi

# Extract the folder path from the command-line argument
folder_path="$1"

# Verify that the provided path exists and is a directory
if [ ! -d "$folder_path" ]; then
    echo "Error: '$folder_path' is not a valid directory."
    exit 1
fi

# List all files in the folder
files=$(ls "$folder_path")

# Loop through the files
for filename in $files; do
    if [[ $filename == *.png ]]; then  # Adjust the file extension as needed
        # Extract the filename without extension
        name_without_extension="${filename%.*}"

        # Create a directory with the same name as the image (if it doesn't exist)
        image_directory="$folder_path/$name_without_extension"
        if [ ! -d "$image_directory" ]; then
            mkdir -p "$image_directory"
        fi

        # Get filename extension
        extension="${filename##*.}"

        # Move the image to its respective directory
        mv "$folder_path/$filename" "$image_directory/icon.$extension"
        echo "Moved $filename to $image_directory"
    fi
done
