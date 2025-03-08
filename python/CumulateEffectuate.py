import json
import sys
from Functions import Cumulated;

# Load JSON data
data = json.load(sys.stdin)
'''
json_file = "./input_test.json"
with open(json_file, "r", encoding="utf-8") as f:
    data = json.load(f)
'''

aggregated_times = Cumulated(data)
json.dump(aggregated_times, sys.stdout)
