import re

def extract_information(text):
    # Define the regular expression patterns
    people_pattern = r'(\d+)\s*(?:mates|gang|friends|group|candidates|people|buddies|comrades|pals|associates|allies|colleagues|chums|fellows|boys|girls|team|crew|partners)'
    room_pattern = r'(\d+)\s*(?:BHK|bedroom|room)'
    date_pattern = r'(\d+\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\s*to\s*(\d+\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*\d*)'


    # Match each pattern in the input text with case sensitivity
    people_match = re.search(people_pattern, text, re.IGNORECASE)
    room_match = re.search(room_pattern, text, re.IGNORECASE)
    date_match = re.search(date_pattern, text, re.IGNORECASE)

    # Extract information from the matched groups
    num_people = int(people_match.group(1)) if people_match else "-"
    room_type = room_match.group(1) if room_match else "-"
    check_in_date = date_match.group(1) if date_match else "-"
    check_out_date = date_match.group(2) if date_match else "-"

    # Print the extracted information
    print("Number of people:", num_people)
    print("Room type:", room_type, "BHK")
    print("Check-in date:", check_in_date)
    print("Check-out date:", check_out_date)

# Test the function with your example
input_text = "i want 3bhk for 6 people and i will stay from 12 jan to 7 feb"
extract_information(input_text)
