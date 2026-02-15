#!/usr/bin/env python3
import csv
from datetime import datetime, timedelta
import random

def generate_archetype_1_overwhelmed():
    """
    Archetype 1: Overwhelmed by conflicting information
    - Inconsistent schedule (2-3x/week average)
    - Frequent program switching
    - Exercise variations constantly changing
    - Notes expressing confusion
    - Gaps when paralyzed by too many options
    """
    workouts = []
    start_date = datetime(2025, 1, 1, 18, 30)

    # Different program phases with varying exercises
    programs = [
        {
            "name": "StrongLifts 5x5",
            "weeks": 4,
            "exercises": [
                ("Barbell Back Squat", 5, 60.0, "5x5 program"),
                ("Barbell Bench Press", 5, 45.0, ""),
                ("Bent Over Barbell Row", 5, 40.0, ""),
            ]
        },
        {
            "name": "PPL",
            "weeks": 5,
            "exercises": [
                ("Barbell Bench Press", 10, 50.0, "Switched to PPL"),
                ("Dumbbell Incline Bench Press", 12, 20.0, ""),
                ("Cable Chest Fly", 12, 30.0, ""),
                ("Dumbbell Lateral Raise", 15, 8.0, ""),
            ]
        },
        {
            "name": "Upper/Lower",
            "weeks": 6,
            "exercises": [
                ("Barbell Bench Press", 10, 52.5, "Back to basics?"),
                ("Bent Over Barbell Row", 10, 45.0, ""),
                ("Dumbbell Shoulder Press", 12, 18.0, ""),
                ("Dip", 12, 0.0, ""),
            ]
        },
        {
            "name": "Full Body",
            "weeks": 4,
            "exercises": [
                ("Barbell Back Squat", 8, 70.0, "Trying full body 3x"),
                ("Barbell Bench Press", 8, 55.0, ""),
                ("Barbell Deadlift", 5, 90.0, ""),
                ("Pull Up", 8, 0.0, ""),
            ]
        },
    ]

    current_date = start_date
    program_idx = 0

    while current_date.year == 2025:
        program = programs[program_idx % len(programs)]
        weeks_in_program = program["weeks"]

        # Inconsistent frequency: 2-3 workouts per week, sometimes gaps
        for week in range(weeks_in_program):
            workouts_this_week = random.choice([2, 2, 3, 3, 3, 1])  # Weighted toward 2-3

            for _ in range(workouts_this_week):
                if current_date.year > 2025:
                    break

                # Add exercises for this workout
                for exercise, reps, weight, note in program["exercises"]:
                    # Warmup set
                    workouts.append({
                        "Date": current_date.strftime("%Y-%m-%d %I:%M:%S %p +0000"),
                        "Exercise": exercise,
                        "Reps": 8,
                        "Weight(kg)": weight * 0.6,
                        "isWarmup": "true",
                        "Note": note if note else ""
                    })
                    # Working sets (variable 2-3)
                    num_sets = random.choice([2, 3])
                    for s in range(num_sets):
                        workouts.append({
                            "Date": current_date.strftime("%Y-%m-%d %I:%M:%S %p +0000"),
                            "Exercise": exercise,
                            "Reps": reps + random.choice([-1, 0, 1]),
                            "Weight(kg)": weight + (s * 2.5),
                            "isWarmup": "false",
                            "Note": random.choice(["", "", "", "Should I do more sets?", "Is this enough?"])
                        })

                # Next workout: 2-4 days later
                current_date += timedelta(days=random.choice([2, 3, 3, 4]))

            # Occasional gaps (analysis paralysis)
            if random.random() < 0.15:  # 15% chance of gap week
                current_date += timedelta(days=7)

        program_idx += 1

    return workouts


def generate_archetype_2_selfdoubt():
    """
    Archetype 2: Self-doubt about training sufficiency
    - Very consistent 4x/week (upper/lower split)
    - Excessive volume (5-7 sets per exercise)
    - Multiple warmup sets
    - Notes expressing uncertainty
    """
    workouts = []
    start_date = datetime(2025, 1, 2, 6, 0)  # 6 AM consistent

    # Upper/Lower split - very consistent
    upper_exercises = [
        ("Barbell Bench Press", 10, 50.0),
        ("Incline Dumbbell Bench Press", 12, 18.0),
        ("Cable Chest Fly", 15, 25.0),
        ("Dumbbell Shoulder Press", 12, 16.0),
        ("Dumbbell Lateral Raise", 15, 8.0),
        ("Cable Triceps Pushdown", 15, 25.0),
    ]

    lower_exercises = [
        ("Barbell Back Squat", 10, 70.0),
        ("Leg Press", 15, 120.0),
        ("Romanian Deadlift", 12, 40.0),
        ("Leg Curl", 15, 35.0),
        ("Leg Extension", 15, 40.0),
        ("Standing Calf Raise", 15, 70.0),
    ]

    back_exercises = [
        ("Barbell Deadlift", 8, 80.0),
        ("Bent Over Barbell Row", 12, 40.0),
        ("Lat Pulldown", 15, 40.0),
        ("Seated Cable Row", 15, 35.0),
        ("Barbell Curl", 12, 15.0),
        ("Hammer Curl", 12, 12.0),
    ]

    current_date = start_date
    workout_cycle = 0

    while current_date.year == 2025:
        # 4x per week: U L U L
        workout_types = [upper_exercises, lower_exercises, back_exercises, lower_exercises]
        exercises = workout_types[workout_cycle % 4]

        for exercise, base_reps, base_weight in exercises:
            # Multiple warmup sets
            workouts.append({
                "Date": current_date.strftime("%Y-%m-%d %I:%M:%S %p +0000"),
                "Exercise": exercise,
                "Reps": 12,
                "Weight(kg)": base_weight * 0.5,
                "isWarmup": "true",
                "Note": ""
            })
            workouts.append({
                "Date": current_date.strftime("%Y-%m-%d %I:%M:%S %p +0000"),
                "Exercise": exercise,
                "Reps": 10,
                "Weight(kg)": base_weight * 0.7,
                "isWarmup": "true",
                "Note": ""
            })

            # Excessive working sets: 5-6 sets
            doubt_notes = ["Should I do one more set?", "Is 5 sets enough?", "Better safe than sorry",
                          "Did I do enough volume?", "Extra set to be sure", ""]
            num_sets = random.choice([5, 5, 6, 6])
            for s in range(num_sets):
                workouts.append({
                    "Date": current_date.strftime("%Y-%m-%d %I:%M:%S %p +0000"),
                    "Exercise": exercise,
                    "Reps": base_reps - s,
                    "Weight(kg)": base_weight + (s * 2.5),
                    "isWarmup": "false",
                    "Note": random.choice(doubt_notes) if s >= 3 else ""
                })

        workout_cycle += 1

        # Very consistent: every 2 days (approx)
        if workout_cycle % 4 == 0:  # After 4 workouts
            current_date += timedelta(days=2)  # Mini rest after completing cycle
        else:
            current_date += timedelta(days=2)

    return workouts


def generate_archetype_3_timeconstrained():
    """
    Archetype 3: Time-constrained efficiency seekers
    - Consistent 3x/week (M/W/F)
    - Efficient compound-focused routine
    - Minimal warmup
    - 2 sets per exercise
    - Progressive overload
    """
    workouts = []
    start_date = datetime(2025, 1, 6, 6, 30)  # Monday

    # Upper/Lower split alternating
    upper_exercises = [
        ("Barbell Bench Press", 10, 50.0),
        ("Bent Over Barbell Row", 10, 40.0),
        ("Dumbbell Shoulder Press", 12, 16.0),
        ("Dip", 12, 0.0),
    ]

    lower_exercises = [
        ("Barbell Back Squat", 8, 65.0),
        ("Romanian Deadlift", 10, 45.0),
        ("Leg Press", 12, 130.0),
        ("Standing Calf Raise", 15, 70.0),
    ]

    back_exercises = [
        ("Barbell Deadlift", 8, 85.0),
        ("Pull Up", 8, 0.0),
        ("Leg Curl", 12, 40.0),
        ("Barbell Curl", 10, 18.0),
    ]

    current_date = start_date
    workout_cycle = 0
    week_num = 0

    while current_date.year == 2025:
        # 3x per week: U L U (week 1), L U L (week 2) alternating
        if week_num % 2 == 0:
            workout_types = [upper_exercises, lower_exercises, back_exercises]
        else:
            workout_types = [lower_exercises, back_exercises, upper_exercises]

        for day_in_week in range(3):  # Mon, Wed, Fri
            if current_date.year > 2025:
                break

            exercises = workout_types[day_in_week]

            for exercise, base_reps, base_weight in exercises:
                # Minimal warmup: just one set
                workouts.append({
                    "Date": current_date.strftime("%Y-%m-%d %I:%M:%S %p +0000"),
                    "Exercise": exercise,
                    "Reps": 10,
                    "Weight(kg)": base_weight * 0.6,
                    "isWarmup": "true",
                    "Note": ""
                })

                # Efficient: 2 working sets
                for s in range(2):
                    workouts.append({
                        "Date": current_date.strftime("%Y-%m-%d %I:%M:%S %p +0000"),
                        "Exercise": exercise,
                        "Reps": base_reps,
                        "Weight(kg)": base_weight + (week_num * 1.25),  # Progressive overload
                        "isWarmup": "false",
                        "Note": ""
                    })

            # Next workout: 2 days later (M->W->F)
            current_date += timedelta(days=2)
            workout_cycle += 1

        week_num += 1

    return workouts


def write_csv(filename, workouts):
    """Write workouts to CSV file"""
    with open(filename, 'w', newline='') as f:
        fieldnames = ['Date', 'Exercise', 'Reps', 'Weight(kg)', 'Duration(s)', 'Distance(m)',
                     'Incline', 'Resistance', 'isWarmup', 'Note', 'multiplier']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()

        for workout in workouts:
            row = {
                'Date': workout['Date'],
                'Exercise': workout['Exercise'],
                'Reps': workout['Reps'],
                'Weight(kg)': workout['Weight(kg)'],
                'Duration(s)': 0.0,
                'Distance(m)': 0.0,
                'Incline': 0.0,
                'Resistance': 0.0,
                'isWarmup': workout['isWarmup'],
                'Note': workout['Note'],
                'multiplier': 2.0 if 'Dumbbell' in workout['Exercise'] else 1.0
            }
            writer.writerow(row)


if __name__ == "__main__":
    print("Generating Archetype 1 (Overwhelmed)...")
    workouts_1 = generate_archetype_1_overwhelmed()
    write_csv('/Users/mirlca/Library/CloudStorage/OneDrive-Teradyne/Documents/Notes/00-inbox/archetype_01_overwhelmed_workout_export.csv', workouts_1)
    print(f"  Generated {len(workouts_1)} exercise records")

    print("Generating Archetype 2 (Self-doubt)...")
    workouts_2 = generate_archetype_2_selfdoubt()
    write_csv('/Users/mirlca/Library/CloudStorage/OneDrive-Teradyne/Documents/Notes/00-inbox/archetype_02_selfdoubt_workout_export.csv', workouts_2)
    print(f"  Generated {len(workouts_2)} exercise records")

    print("Generating Archetype 3 (Time-constrained)...")
    workouts_3 = generate_archetype_3_timeconstrained()
    write_csv('/Users/mirlca/Library/CloudStorage/OneDrive-Teradyne/Documents/Notes/00-inbox/archetype_03_timeconstrained_workout_export.csv', workouts_3)
    print(f"  Generated {len(workouts_3)} exercise records")

    print("\nDone!")
