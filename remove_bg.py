#!/usr/bin/env python3
"""
Remove background from user photo
"""

from rembg import remove
from PIL import Image
import os

def remove_background(input_path, output_path):
    """Remove background from image"""
    try:
        # Open the input image
        print(f"Opening image: {input_path}")
        input_image = Image.open(input_path)
        
        # Remove background
        print("Removing background...")
        output_image = remove(input_image)
        
        # Save the output image
        print(f"Saving image: {output_path}")
        output_image.save(output_path)
        
        print("✓ Background removed successfully!")
        return True
        
    except FileNotFoundError:
        print(f"✗ Error: File not found - {input_path}")
        return False
    except Exception as e:
        print(f"✗ Error: {str(e)}")
        return False

if __name__ == "__main__":
    input_path = "public/photo_user.jpg"
    output_path = "public/photo_user_no_bg.png"
    
    # Check if input file exists
    if not os.path.exists(input_path):
        print(f"✗ Error: Input file does not exist - {input_path}")
        print("Please make sure the file exists at the specified path.")
        exit(1)
    
    # Remove background
    success = remove_background(input_path, output_path)
    
    if success:
        print(f"\n✓ Output saved to: {output_path}")
    else:
        print("\n✗ Failed to remove background")
        exit(1)
