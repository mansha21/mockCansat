const missionconst = [
    {
        'title': 'Stage 1',
        'text': `Carrier: This is the carrier of the main payload which will be loaded in the
            sounding rocket provided by the competition. This carrier has to perform multiple maneuvers:
            The carrier will be released at the altitude of 2000 meters from the ground of the
            launch site.
            The location of the launch site is 12°58'32.2"N 79°09'38.3"E.
            Once the carrier is released the carrier should perform a helical maneuver,
            the diameter of the helix should not exceed 1000 meters.
            The carrier is supposed to perform the helical maneuver for 500 meters from the
            release point.
            Once the carrier starts performing the helical maneuver, the carrier should
            transmit data to the ground station. Data should include mission time, altitude,
            orientation and GPS coordinates of the carrier.
        `,
        'class': ''
    },
    {
        'title': 'Stage 2',
        'text': `Once it attains 1500 meters of altitude the carrier will start a powered flight
        towards East maintaining the altitude at 1500 meters from the ground on the launch
        location, for 300 meters.
        
        `,
        'class': ''
    },
    {
        'title': 'Stage 3',
        'text': `Once it reaches the distance this carrier should drop the science payload which
        should be able to detect the local weather data. Weather data includes air
        temperature, altitude and air speed. The data should be transmitted to the carrier
        which will relay it to the ground station.
        This science payload will consist of a heat shield which will carry the probe with
        all the equipment and a hens egg.
        The need for a heat shield is to reduce the velocity so that the probes sensors
        can record accurate values.
        This heat shield should descend at a rate of 15 ms
        -1and should maintain its
        nadir.
        
        `,
        'class': ''
    },
    {
        'title': 'Stage 4',
        'text': `Once the heatshield attains an altitude of 500 meters from the ground of the launch
        site it should release the probe which also protects the egg.
        The probe will have a controlled descent rate of 5 ms
        -1 using a parachute.
        
        
        `,
        'class': 'offset-lg-2'
    },
    {
        'title': 'Stage 5',
        'text': `The carrier should stop its powered flight and land being in its gliding state. The
        carrier should stop telemetry after landing. A buzzer in the carrier must start
        ringing after landing to identify where it landed.
        The carrier, heat shield, the probe, the egg should be located and retrieved.
        The data received should be plotted in real time and recorded in the ground
        station
        `,
        'class': ''
    }
];

export default missionconst;