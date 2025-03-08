import json
import sys
import pandas as pd
from datetime import datetime

def Cumulated(gpsPointList):
    # Convert to DataFrame
    if(len(gpsPointList) == 0):
        return {}
    
    df = pd.DataFrame(gpsPointList)
    df["Data"] = pd.to_datetime(df["Data"], format="%d %b %Y %H:%M:%S")

    # Function to clean location names
    def clean_location(location):
        if "BUCURESTI SECTOR 1," in location:
            return location.replace("BUCURESTI SECTOR 1, ", "")
        elif "BUCURESTI," in location:
            return location.replace("BUCURESTI, ", "")
        return location

    # Initialize variables
    location_times = {}
    current_location = None
    start_time = None

    # Iterate through records
    for _, row in df.iterrows():
        location = clean_location(row["Pozitia"])
        timestamp = row["Data"]
        
        if location != current_location:
            if current_location is not None:
                total_time = (timestamp - start_time).total_seconds()
                location_times[current_location] = location_times.get(current_location, 0) + total_time
            
            # Update to new location
            current_location = location
            start_time = timestamp

    # Final entry calculation
    if current_location is not None:
        total_time = (df["Data"].iloc[-1] - start_time).total_seconds()
        location_times[current_location] = location_times.get(current_location, 0) + total_time

    # Aggregate times for trimmed locations
    aggregated_times = {}
    for location, time in location_times.items():
        aggregated_times[location] = aggregated_times.get(location, 0) + time

    '''
    # Save to JSON
    output_json = "B-139-CEF-Time-Spent-OK.json"
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(aggregated_times, f, ensure_ascii=False, indent=4)
    '''

    return aggregated_times
