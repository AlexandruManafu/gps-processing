import json
import pandas as pd
from fuzzywuzzy import fuzz
import sys
from Functions import Cumulated

'''
# File paths
planned_json_path = "/Users/cristianpogan/Desktop/No-Pollution/GPS-Inefficiency-Sector-1/JSON-Planificare-3-Maturat-Mecanizat.json"
executed_json_path = "/Users/cristianpogan/Desktop/No-Pollution/GPS-Inefficiency-Sector-1/B-139-CEF-Time-Spent-OK.json"

# Load planned data
with open(planned_json_path, "r", encoding="utf-8") as f:
    planned_data = json.load(f)

# Load executed data
with open(executed_json_path, "r", encoding="utf-8") as f:
    executed_data = json.load(f)'
'''
'''
with open("./input.json", "r", encoding="utf-8") as f:
    data = json.load(f)'
'''

data = json.load(sys.stdin)

gps_points = data['points']
planned_data = data["plan"]
executed_data = Cumulated(gps_points);

# Extract planned addresses where 'luni' is True
planned_addresses = [entry["strada"].strip() for entry in planned_data if entry.get("luni", False)]

# Create comparison dataframe
comparison_results = []
for planned_address in planned_addresses:
    best_match = None
    highest_score = 0
    for executed_address in executed_data.keys():
        score = fuzz.ratio(planned_address.lower(), executed_address.lower())
        if score > highest_score:
            highest_score = score
            best_match = executed_address
    
    execution_time = executed_data.get(best_match, 0) if highest_score > 85 else 0
    comparison_results.append({
        "Planned Address": planned_address,
        "Matched Executed Address": best_match if highest_score > 85 else "Not Found",
        "Execution Time (seconds)": execution_time
    })

# Convert to DataFrame and save to Excel
comparison_df = pd.DataFrame(comparison_results)
comparison_df.to_json(sys.stdout, index=False)
