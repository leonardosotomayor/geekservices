"""Educational solar-noon equinox alignment; not an energy production model.
Assumes a south-facing panel, northern latitude, and solar declination of zero.
Ignores weather, shading, diffuse radiation, seasonal changes, and system losses.
Background: https://gml.noaa.gov/grad/solcalc/
Run: python3 orientation_model.py
"""
from math import cos, radians


def alignment(latitude: float, tilt: float) -> float:
    if not 0 <= latitude <= 65 or not 0 <= tilt <= 90:
        raise ValueError('Demo supports latitudes 0–65 N and tilts 0–90 degrees.')
    return max(0.0, cos(radians(latitude - tilt)))


if __name__ == '__main__':
    print('tilt_degrees,relative_direct_beam_alignment_at_latitude_43N')
    for tilt in range(91):
        print(f'{tilt},{alignment(43, tilt):.6f}')
