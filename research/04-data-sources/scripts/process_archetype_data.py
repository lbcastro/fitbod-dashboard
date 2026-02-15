#!/usr/bin/env python3
"""
Process Fitbod workout CSV exports into dashboard JavaScript data format.
Creates workout data for different behavioral archetypes.
"""

import csv
import json
from datetime import datetime, timedelta
from collections import defaultdict

# Exercise to muscle group mapping
EXERCISE_MUSCLE_MAP = {
    'Barbell Back Squat': {'muscle': 'Quadriceps', 'secondary': ['Hamstrings', 'Glutes']},
    'Barbell Front Squat': {'muscle': 'Quadriceps', 'secondary': ['Core']},
    'Bulgarian Split Squat': {'muscle': 'Quadriceps', 'secondary': ['Glutes']},
    'Leg Press': {'muscle': 'Quadriceps', 'secondary': []},
    'Leg Extension': {'muscle': 'Quadriceps', 'secondary': []},
    'Hack Squat': {'muscle': 'Quadriceps', 'secondary': []},

    'Romanian Deadlift': {'muscle': 'Hamstrings', 'secondary': ['Back', 'Glutes']},
    'Barbell Deadlift': {'muscle': 'Hamstrings', 'secondary': ['Back', 'Glutes']},
    'Sumo Deadlift': {'muscle': 'Hamstrings', 'secondary': ['Back', 'Glutes']},
    'Leg Curl': {'muscle': 'Hamstrings', 'secondary': []},
    'Nordic Hamstring Curl': {'muscle': 'Hamstrings', 'secondary': []},
    'Seated Back Extension': {'muscle': 'Hamstrings', 'secondary': ['Back', 'Glutes']},

    'Standing Calf Raise': {'muscle': 'Calves', 'secondary': []},
    'Seated Calf Raise': {'muscle': 'Calves', 'secondary': []},
    'Seated Machine Calf Press': {'muscle': 'Calves', 'secondary': []},
    'Calf Press': {'muscle': 'Calves', 'secondary': []},

    'Machine Hip Adductor': {'muscle': 'Glutes', 'secondary': []},
    'Machine Hip Abductor': {'muscle': 'Glutes', 'secondary': []},
    'Glute Kickback Machine': {'muscle': 'Glutes', 'secondary': []},

    'Barbell Bench Press': {'muscle': 'Chest', 'secondary': ['Triceps', 'Shoulders']},
    'Barbell Incline Bench Press': {'muscle': 'Chest', 'secondary': ['Triceps', 'Shoulders']},
    'Dumbbell Bench Press': {'muscle': 'Chest', 'secondary': ['Triceps', 'Shoulders']},
    'Dumbbell Incline Bench Press': {'muscle': 'Chest', 'secondary': ['Triceps', 'Shoulders']},
    'Incline Dumbbell Bench Press': {'muscle': 'Chest', 'secondary': ['Triceps', 'Shoulders']},
    'Dumbbell Incline Fly': {'muscle': 'Chest', 'secondary': ['Shoulders']},
    'Cable Chest Fly': {'muscle': 'Chest', 'secondary': ['Shoulders']},
    'Pec Deck Machine': {'muscle': 'Chest', 'secondary': []},

    'Bent Over Barbell Row': {'muscle': 'Back', 'secondary': ['Biceps']},
    'Pendlay Row': {'muscle': 'Back', 'secondary': ['Biceps']},
    'T-Bar Row': {'muscle': 'Back', 'secondary': ['Biceps']},
    'Seated Cable Row': {'muscle': 'Back', 'secondary': ['Biceps']},
    'Lat Pulldown': {'muscle': 'Back', 'secondary': ['Biceps']},
    'Pull Up': {'muscle': 'Back', 'secondary': ['Biceps']},
    'Barbell Shrug': {'muscle': 'Back', 'secondary': []},
    'Face Pull': {'muscle': 'Back', 'secondary': ['Shoulders']},

    'Barbell Shoulder Press': {'muscle': 'Shoulders', 'secondary': ['Triceps']},
    'Dumbbell Shoulder Press': {'muscle': 'Shoulders', 'secondary': ['Triceps']},
    'Dumbbell Lateral Raise': {'muscle': 'Shoulders', 'secondary': []},
    'Cable Lateral Raise': {'muscle': 'Shoulders', 'secondary': []},

    'Barbell Curl': {'muscle': 'Biceps', 'secondary': []},
    'Barbell Bicep Drag Curl': {'muscle': 'Biceps', 'secondary': []},
    'Incline Dumbbell Curl': {'muscle': 'Biceps', 'secondary': []},
    'Hammer Curl': {'muscle': 'Biceps', 'secondary': []},
    'Preacher Curl': {'muscle': 'Biceps', 'secondary': []},

    'Cable Rope Overhead Triceps Extension': {'muscle': 'Triceps', 'secondary': []},
    'Overhead Triceps Extension': {'muscle': 'Triceps', 'secondary': []},
    'Cable Triceps Pushdown': {'muscle': 'Triceps', 'secondary': []},
    'Close-Grip Bench Press': {'muscle': 'Triceps', 'secondary': ['Chest']},
    'Dip': {'muscle': 'Triceps', 'secondary': ['Chest']},
}

def get_week_start(date_str):
    """Convert date string to Monday of that week in YYYY-MM-DD format."""
    dt = datetime.strptime(date_str.split()[0], '%Y-%m-%d')
    # Get Monday of the week
    monday = dt - timedelta(days=dt.weekday())
    return monday.strftime('%Y-%m-%d')

def process_csv(csv_path):
    """Process CSV file into workout data structure."""
    workout_data = defaultdict(lambda: {
        'muscle': '',
        'secondary': [],
        'weeks': defaultdict(lambda: {
            'max': 0,
            'sets': 0,
            'maxReps': 0,
            'load': 0
        })
    })

    with open(csv_path, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Skip warmup sets
            if row['isWarmup'].lower() == 'true':
                continue

            exercise = row['Exercise'].strip()
            weight = float(row['Weight(kg)'])
            reps = int(row['Reps'])
            multiplier = float(row['multiplier'])

            # Get week start date
            week_start = get_week_start(row['Date'])

            # Get muscle mapping
            if exercise not in EXERCISE_MUSCLE_MAP:
                print(f"Warning: Unknown exercise '{exercise}' - skipping")
                continue

            muscle_info = EXERCISE_MUSCLE_MAP[exercise]

            # Initialize exercise if first time
            if not workout_data[exercise]['muscle']:
                workout_data[exercise]['muscle'] = muscle_info['muscle']
                workout_data[exercise]['secondary'] = muscle_info['secondary']

            # Calculate load for this set
            set_load = weight * reps * multiplier

            # Update week data
            week_data = workout_data[exercise]['weeks'][week_start]
            week_data['max'] = max(week_data['max'], weight)
            week_data['sets'] += 1
            week_data['maxReps'] = max(week_data['maxReps'], reps)
            week_data['load'] += set_load

    # Convert defaultdicts to regular dicts for JSON serialization
    output = {}
    for exercise, data in workout_data.items():
        output[exercise] = {
            'muscle': data['muscle'],
            'secondary': data['secondary'],
            'weeks': {
                week: {
                    'max': week_data['max'],
                    'sets': week_data['sets'],
                    'maxReps': week_data['maxReps'],
                    'load': round(week_data['load'], 1)
                }
                for week, week_data in sorted(data['weeks'].items())
            }
        }

    return output

if __name__ == '__main__':
    import sys

    archetypes = [
        ('archetype_01_overwhelmed_workout_export.csv',
         'archetype_01_data.json',
         'Overwhelmed - Program Hopper'),
        ('archetype_02_selfdoubt_workout_export.csv',
         'archetype_02_data.json',
         'Self-Doubt - Volume Addict'),
        ('archetype_03_timeconstrained_workout_export.csv',
         'archetype_03_data.json',
         'Time-Constrained - Efficient Trainer'),
    ]

    base_path = '/Users/mirlca/Library/CloudStorage/OneDrive-Teradyne/Documents/Notes/00-inbox/'
    output_path = '/Users/mirlca/Library/CloudStorage/OneDrive-Teradyne/Documents/Notes/02-areas/personal/youtube-app-generator/channels/averagetojacked/data/'

    for csv_file, json_file, archetype_name in archetypes:
        print(f"\nProcessing {archetype_name}...")
        csv_path = base_path + csv_file
        json_path = output_path + json_file

        try:
            data = process_csv(csv_path)

            # Write JSON file
            with open(json_path, 'w') as f:
                json.dump(data, f, indent=2)

            print(f"  ✓ Created {json_file}")
            print(f"  - {len(data)} exercises")
            print(f"  - {sum(len(ex['weeks']) for ex in data.values())} total week entries")

        except Exception as e:
            print(f"  ✗ Error: {e}")
