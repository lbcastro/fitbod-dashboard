#!/usr/bin/env python3
"""
Create archetype-specific dashboard HTML files from data JSON files.
"""

import json

# Read the base HTML template (v6.1)
base_html_path = '/Users/mirlca/Library/CloudStorage/OneDrive-Teradyne/Documents/Notes/02-areas/personal/youtube-app-generator/channels/averagetojacked/fitbod-dashboard-mockup-v6.1.html'

with open(base_html_path, 'r') as f:
    base_html = f.read()

# Archetype configurations
archetypes = [
    {
        'data_file': 'data/archetype_01_data.json',
        'output_file': 'fitbod-dashboard-archetype-01-overwhelmed.html',
        'version': 'Archetype 1: Overwhelmed',
        'subtitle': 'Pattern: Constant program switching and exercise experimentation',
        'tagline': 'Data profile: Program hopper who tries new exercises every week based on YouTube advice',
        'year': '2025-2026'
    },
    {
        'data_file': 'data/archetype_02_data.json',
        'output_file': 'fitbod-dashboard-archetype-02-selfdoubt.html',
        'version': 'Archetype 2: Self-Doubt',
        'subtitle': 'Pattern: Excessive volume with constant questioning',
        'tagline': 'Data profile: Always adding "one more set" because unsure if doing enough',
        'year': '2025'
    },
    {
        'data_file': 'data/archetype_03_data.json',
        'output_file': 'fitbod-dashboard-archetype-03-timeconstrained.html',
        'version': 'Archetype 3: Time-Constrained',
        'subtitle': 'Pattern: Efficient, minimal, consistent training',
        'tagline': 'Data profile: Gets in, does the work, gets out — no time wasted',
        'year': '2025-2026'
    }
]

for archetype in archetypes:
    print(f"\nCreating {archetype['version']}...")

    # Load workout data
    with open(archetype['data_file'], 'r') as f:
        workout_data = json.load(f)

    # Convert to JavaScript format
    js_data = json.dumps(workout_data, indent=4)

    # Prepare HTML replacements
    html = base_html

    # Replace title
    html = html.replace(
        '<title>Fitbod Intelligence Dashboard v6.1 - User Language</title>',
        f'<title>Fitbod Intelligence Dashboard - {archetype["version"]}</title>'
    )

    # Replace header
    html = html.replace(
        '''      <h1>
        Fitbod Intelligence Dashboard
        <span class="version-badge">v6.1 - User Language</span>
      </h1>''',
        f'''      <h1>
        Fitbod Intelligence Dashboard
        <span class="version-badge">{archetype["version"]}</span>
      </h1>'''
    )

    # Replace subtitle
    html = html.replace(
        '<div class="subtitle">See what Fitbod doesn\'t show you</div>',
        f'<div class="subtitle">{archetype["subtitle"]}</div>'
    )

    # Replace tagline
    html = html.replace(
        '<div class="tagline">Now using language you actually say — "getting stronger" not "progressing"</div>',
        f'<div class="tagline">{archetype["tagline"]}</div>'
    )

    # Replace workout data
    html = html.replace(
        'const WORKOUT_DATA = ' + base_html.split('const WORKOUT_DATA = ')[1].split(';\n')[0] + ';',
        f'const WORKOUT_DATA = {js_data};'
    )

    # Replace footer
    html = html.replace(
        '2025 workout data (Jan 6 → Dec 29) • v6.1: Simplified status names using natural user language',
        f'{archetype["year"]} archetype data • {archetype["version"]}: {archetype["subtitle"]}'
    )

    # Write output file
    output_path = f'/Users/mirlca/Library/CloudStorage/OneDrive-Teradyne/Documents/Notes/02-areas/personal/youtube-app-generator/channels/averagetojacked/{archetype["output_file"]}'
    with open(output_path, 'w') as f:
        f.write(html)

    print(f"  ✓ Created {archetype['output_file']}")
    print(f"  - {len(workout_data)} exercises in dataset")

print("\n✓ All archetype dashboards created successfully!")
