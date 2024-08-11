const notes = [
    'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1',
    'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
    'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
    'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
    'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
    'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6',
    'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7', 'C8'
]

const defaultShorcut = {
    'C4' : 'A', 'C#4' : 'W', //도
    'D4' : 'S', 'D#4' : 'E', //레
    'E4' : 'D', //미
    'F4' : 'F', 'F#4' : 'T', //파
    'G4' : 'G', 'G#4' : 'Y', //솔 
    'A4' : 'H', 'A#4' : 'U', //라
    'B4' : 'J', //시
    'C5' : 'K', 'C#5' : 'O', //도
    'D5' : 'L', 'D#5' : 'P' //레
}

const scoreTitles = [
    '네가있어행복해', 
    '달팽이의하루-01', '달팽이의하루-02',
    '나무의노래'
]

const allInstruments = [
    "accordion", "acoustic_bass", "acoustic_grand_piano", "acoustic_guitar_nylon", "acoustic_guitar_steel",
    "agogo", "alto_sax", "applause", "bagpipe", "banjo",
    "baritone_sax", "bassoon", "bird_tweet", "blown_bottle", "brass_section",
    "breath_noise", "bright_acoustic_piano", "celesta", "cello", "choir_aahs",
    "church_organ", "clarinet", "clavinet", "contrabass", "distortion_guitar", 
    "drawbar_organ", "dulcimer", "electric_bass_finger", "electric_bass_pick", "electric_grand_piano", 
    "electric_guitar_clean", "electric_guitar_jazz", "electric_guitar_muted", "electric_piano_1", "electric_piano_2", 
    "english_horn", "fiddle", "flute", "french_horn", "fretless_bass", "fx_1_rain", 
    "fx_2_soundtrack", "fx_3_crystal", "fx_4_atmosphere", "fx_5_brightness", "fx_6_goblins", 
    "fx_7_echoes", "fx_8_scifi", "glockenspiel", "guitar_fret_noise", "guitar_harmonics", 
    "gunshot", "harmonica", "harpsichord", "helicopter", "honkytonk_piano", "kalimba", 
    "koto", "lead_1_square", "lead_2_sawtooth", "lead_3_calliope", "lead_4_chiff", 
    "lead_5_charang", "lead_6_voice", "lead_7_fifths", "lead_8_bass__lead", "marimba", 
    "melodic_tom", "music_box", "muted_trumpet", "oboe", "ocarina", "orchestra_hit", "orchestral_harp", "overdriven_guitar", 
    "pad_1_new_age", "pad_2_warm", "pad_3_polysynth", "pad_4_choir", "pad_5_bowed", "pad_6_metallic", "pad_7_halo", "pad_8_sweep", 
    "pan_flute", "percussive_organ", "piccolo", "pizzicato_strings", "recorder", "reed_organ", "reverse_cymbal", "rock_organ", "seashore", "shakuhachi", "shamisen", "shanai", "sitar", 
    "slap_bass_1", "slap_bass_2", "soprano_sax", "steel_drums", 
    "string_ensemble_1", "string_ensemble_2", "synth_bass_1", "synth_bass_2", "synth_brass_1", "synth_brass_2", 
    "synth_choir", "synth_drum", "synth_strings_1", "synth_strings_2", "taiko_drum", 
    "tango_accordion", "telephone_ring", "tenor_sax", "timpani", "tinkle_bell", "tremolo_strings", 
    "trombone", "trumpet", "tuba", "tubular_bells", "vibraphone", "viola", 
    "violin", "voice_oohs", "whistle", "woodblock", "xylophone"
]

const songScores = [
    // 1 : 온음표 h : 2분음표, q : 4분음표, 8 : 8분음표, 16 : 16분음표, 
    // d: 점, r: 쉼표[b/4]
    // 가사 : —–
    {
        title : '네가있어행복해',
        key : 'A',
        time : '4/4',
        clef : 'treble',
        blocks : [
            {
                isFirst : true,
                width : 250,
                notes: [
                    {keys: ['c/4'], duration: 'h', lyrics: ['구']},
                    {keys: ['d/4'], duration: 'q', lyrics: ['름']},
                    {keys: ['e/4'], duration: 'q', lyrics: ['은']},
                ]
            },
            {
                width : 200,
                tieIndexes : [{start: 2, end: 3}], 
                notes: [
                    {keys: ['c/4'], duration: 'q', lyrics: ['마']},
                    {keys: ['f/4'], duration: '8d', lyrics: ['음']},
                    {keys: ['e/4'], duration: '16', lyrics: ['껏']},
                    {keys: ['e/4'], duration: 'q' , lyrics: ['–']},
                    {keys: ['b/4'], duration: 'qr'}, 
                ]
            },
            {
                width : 200,
                tieIndexes : [{start: 2, end: 3}], 
                notes: [
                    {keys: ['f/4'], duration: 'q', lyrics: ['두']},
                    {keys: ['g/4'], duration: '8d', lyrics: ['둥'] ,accident : 'n'},
                    {keys: ['f/4'], duration: '16', lyrics: ['실']},
                    {keys: ['f/4'], duration: '8d', lyrics: ['–']},
                    {keys: ['e/4'], duration: '16', lyrics: ['두']},
                    {keys: ['c/4'], duration: 'q', lyrics: ['둥']},
                ]
            },
            {
                width : 100, 
                notes: [
                    {keys: ['d/4'], duration: '1', lyrics: ['실']}
                ]
            },
            {
                width : 200,
                tieIndexes : [{start: 1, end: 2}],
                notes: [
                    {keys: ['b/4'], duration: '8dr'},
                    {keys: ['d/4'], duration: '16', lyrics: ['자']},
                    {keys: ['d/4'], duration: '8d', lyrics: ['–']},
                    {keys: ['e/4'], duration: '16', lyrics: ['유']},
                    {keys: ['f/4'], duration: 'q', lyrics: ['롭'], accident : 'n'},
                    {keys: ['d/4'], duration: 'q', lyrics: ['게']},
                ]
            },
            {
                width : 250,
                tieIndexes : [{start: 3, end: 4}],
                notes: [
                    {keys: ['c/4'], duration: '8d', lyrics: ['날']},
                    {keys: ['d/4'], duration: '16', lyrics: ['수']},
                    {keys: ['e/4'], duration: '8d', lyrics: ['있']},
                    {keys: ['a/4'], duration: '16', lyrics: ['는']},
                    {keys: ['a/4'], duration: 'q', lyrics: ['–']},
                    {keys: ['b/4'], duration: 'qr'},
                ]
            },
            { // 2번째 줄
                isFirst : true,
                width : 350,
                notes: [
                    {keys: ['b/4'], duration: '8d', lyrics: ['하']},
                    {keys: ['a/4'], duration: '16', lyrics: ['늘']},
                    {keys: ['g/4'], duration: '8d', lyrics: ['운']},
                    {keys: ['a/4'], duration: '16', lyrics: ['동']},
                    {keys: ['b/4'], duration: '8d', lyrics: ['장']},
                    {keys: ['a/4'], duration: '16', lyrics: ['이']},
                    {keys: ['g/4'], duration: '8d', lyrics: ['있']},
                    {keys: ['f/4'], duration: '16', lyrics: ['어']},
                ]
            },
            {
                width: 200,
                tieIndexes:[{start: 2, end: 3}],
                notes: [
                    {keys: ['e/4'], duration: 'q', lyrics: ['행']},
                    {keys: ['d/4'], duration: '8d', lyrics: ['복'], accident : '#'},
                    {keys: ['e/4'], duration: '16', lyrics: ['해']},
                    {keys: ['e/4'], duration: 'q', lyrics: ['–']},
                    {keys: ['b/4'], duration: 'qr'}
                ]
            },
            {
                width: 150,
                notes: [
                    {keys: ['c/4'], duration: 'h', lyrics: ['풀']},
                    {keys: ['d/4'], duration: 'q', lyrics: ['밭']},
                    {keys: ['e/4'], duration: 'q', lyrics: ['속']}
                ]
            },
            {
                width: 200,
                tieIndexes:[{start: 2, end: 3}],
                notes: [
                    {keys: ['c/4'], duration: 'q', lyrics: ['한']},
                    {keys: ['f/4'], duration: '8d', lyrics: ['켠']},
                    {keys: ['e/4'], duration: '16', lyrics: ['에']},
                    {keys: ['e/4'], duration: 'q', lyrics: ['–']},
                    {keys: ['b/4'], duration: 'qr'}
                ]
            },
            {
                width: 200,
                tieIndexes:[{start: 2, end: 3}],
                notes: [
                    {keys: ['f/4'], duration: 'q', lyrics: ['피']},
                    {keys: ['g/4'], duration: '8d', lyrics: ['어'], accident : 'n'},
                    {keys: ['f/4'], duration: '16', lyrics: ['난']},
                    {keys: ['f/4'], duration: '8d', lyrics: ['–']},
                    {keys: ['e/4'], duration: '16', lyrics: ['꽃']},
                    {keys: ['c/4'], duration: 'q', lyrics: ['송']}
                ]
            },
            {
                width: 100,
                notes: [
                    {keys: ['d/4'], duration: '1', lyrics: ['이']}
                ]
            },
            { // 3번째 줄
                isFirst : true,
                width : 350,
                tieIndexes:[{start: 1, end: 2}],
                notes: [
                    {keys: ['b/4'], duration: '8dr'},
                    {keys: ['d/4'], duration: '16', lyrics: ['매']},
                    {keys: ['d/4'], duration: '8d', lyrics: ['–']},
                    {keys: ['e/4'], duration: '16', lyrics: ['일']},
                    {keys: ['f/4'], duration: 'q', lyrics: ['매'], accident:'n'},
                    {keys: ['d/4'], duration: 'q', lyrics: ['일']},
                ]
            },
            {
                width : 350,
                tieIndexes:[{start: 3, end: 4}],
                notes: [
                    {keys: ['c/4'], duration: '8d', lyrics: ['놀']},
                    {keys: ['d/4'], duration: '16', lyrics: ['러']},
                    {keys: ['e/4'], duration: '8d', lyrics: ['오']},
                    {keys: ['a/4'], duration: '16', lyrics: ['는']},
                    {keys: ['a/4'], duration: 'q', lyrics: ['–']},
                    {keys: ['f/4'], duration: '8d', lyrics: ['개']},
                    {keys: ['g/4'], duration: '16', lyrics: ['미']},
                ]
            },
            {
                width : 350,
                notes: [
                    {keys: ['a/4'], duration: '8d', lyrics: ['친']},
                    {keys: ['b/4'], duration: '16', lyrics: ['구']},
                    {keys: ['f/4'], duration: '8d', lyrics: ['있']},
                    {keys: ['g/4'], duration: '16', lyrics: ['어']},
                    {keys: ['a/4'], duration: 'q', lyrics: ['행']},
                    {keys: ['g/4'], duration: 'q', lyrics: ['복']}
                ]
            },
            {
                width : 150,
                // isRepeatEnd : true,
                notes: [
                    {keys: ['a/4'], duration: '2d', lyrics: ['해']},
                    {keys: ['b/4'], duration: 'qr'},
                ]
            },
            { // 4번째 줄
                isFirst : true,
                width : 250,
                notes: [
                    {keys: ['f/4'], duration: '2d', lyrics: ['쭉']},
                    {keys: ['a/4'], duration: 'q', lyrics: ['쭉']},
                ],
                lowTieIndexes: [{start: 1, end: 2}],
                lowNotes : [
                    {keys: ['b/4'], duration: 'qr'},
                    {keys: ['f/4'], duration: 'q', lyrics: ['쭉']},
                    {keys: ['f/4'], duration: '8d', lyrics: ['–']},
                    {keys: ['d/4'], duration: '16', lyrics: ['쭉']},
                    {keys: ['f/4'], duration: '8d', lyrics: ['쭉']},
                    {keys: ['a/4'], duration: '16', lyrics: ['–']},
                ]
            },
            {
                width : 200,
                tieIndexes: [{start: 2, end: 3}],
                notes: [
                    {keys: ['g/4'], duration: 'q', lyrics: ['자'] },
                    {keys: ['a/4'], duration: '8d', lyrics: ['라']},
                    {keys: ['g/4'], duration: '16', lyrics: ['고']},
                    {keys: ['g/4'], duration: 'q', lyrics: ['–']},
                    {keys: ['g/4'], duration: '8d', lyrics: ['싶']},
                    {keys: ['f/4'], duration: '16', lyrics: ['은']},
                ],
                lowTieIndexes: [{start: 2, end: 3}],
                lowNotes: [
                    {keys: ['g/4'], duration: 'q', lyrics: ['자'] },
                    {keys: ['a/4'], duration: '8d', lyrics: ['라']},
                    {keys: ['g/4'], duration: '16', lyrics: ['고']},
                    {keys: ['g/4'], duration: 'q', lyrics: ['–']},
                    {keys: ['g/4'], duration: '8d', lyrics: ['싶']},
                    {keys: ['f/4'], duration: '16', lyrics: ['은']},
                ],
            },
            {
                width : 200,
                tieIndexes: [{start: 4, end: 'next'}],
                notes: [
                    {keys: ['e/4'], duration: 'q', lyrics: ['나']},
                    {keys: ['c/4'], duration: 'q', lyrics: ['무']},
                    {keys: ['e/4'], duration: 'q', lyrics: ['잎']},
                    {keys: ['g/4'], duration: '8d', lyrics: ['사']},
                    {keys: ['f/4'], duration: '16', lyrics: ['귀']},
                ],
                lowNotes: [
                    {keys: ['e/4'], duration: 'q', lyrics: ['나']},
                    {keys: ['c/4'], duration: 'q', lyrics: ['무']},
                    {keys: ['e/4'], duration: 'q', lyrics: ['잎']},
                    {keys: ['g/4'], duration: '8d', lyrics: ['사']},
                    {keys: ['f/4'], duration: '16', lyrics: ['귀']},
                ]
            },
            {
                width : 150,
                tieIndexes: [{start: 'prev', end: 0}],
                notes: [
                    {keys: ['f/4'], duration: '2d', lyrics: ['–']},
                    {keys: ['b/4'], duration: 'qr'},
                ],
                lowNotes: [
                    {keys: ['b/4'], duration: 'qr'},
                    {keys: ['b/4'], duration: 'q', lyrics: ['잎']},
                    {keys: ['g/4'], duration: 'q', lyrics: ['사']},
                    {keys: ['e/4'], duration: 'q', lyrics: ['귀']},
                ]
            },
            {
                width : 200,
                tieIndexes: [{start: 0, end: 1}],
                notes: [
                    {keys: ['d/4'], duration: '2', lyrics: ['햇']},
                    {keys: ['d/4'], duration: '8d', lyrics: ['–']},
                    {keys: ['c/4'], duration: '16', lyrics: ['살']},
                    {keys: ['d/4'], duration: '8d', lyrics: ['가']},
                    {keys: ['f/4'], duration: '16', lyrics: ['득']},
                ],
                lowTieIndexes: [{start: 0, end: 1}],
                lowNotes: [
                    {keys: ['d/4'], duration: '2', lyrics: ['햇']},
                    {keys: ['d/4'], duration: '8d', lyrics: ['–']},
                    {keys: ['c/4'], duration: '16', lyrics: ['살']},
                    {keys: ['d/4'], duration: '8d', lyrics: ['가']},
                    {keys: ['f/4'], duration: '16', lyrics: ['득']},
                ]
            },
            {
                width : 200,
                notes: [
                    {keys: ['e/4'], duration: 'q', lyrics: ['선']},
                    {keys: ['b/4'], duration: 'q', lyrics: ['물']},
                    {keys: ['a/4'], duration: 'q', lyrics: ['한']},
                    {keys: ['b/4'], duration: '8d', lyrics: ['해']},
                    {keys: ['c/5'], duration: '16', lyrics: ['님']},
                ],
                lowNotes: [
                    {keys: ['e/4'], duration: 'q', lyrics: ['선']},
                    {keys: ['g/4'], duration: 'q', lyrics: ['물']},
                    {keys: ['a/4'], duration: 'q', lyrics: ['한']},
                    {keys: ['b/4'], duration: '8d', lyrics: ['해']},
                    {keys: ['c/5'], duration: '16', lyrics: ['님']},
                ],
            },
            { // 5번째 줄
                isFirst: true,
                width : 250,
                tieIndexes: [{start: 4, end: 'next'}],
                notes: [
                    {keys: ['d/5'], duration: 'q', lyrics: ['있']},
                    {keys: ['f/4'], duration: 'q', lyrics: ['어']},
                    {keys: ['a/4'], duration: 'q', lyrics: ['행']},
                    {keys: ['c/5'], duration: '8d', lyrics: ['복']},
                    {keys: ['b/4'], duration: '16', lyrics: ['해']},
                ],
                lowTieIndexes: [{start: 4, end: 'next'}],
                lowNotes: [
                    {keys: ['d/5'], duration: 'q', lyrics: ['있']},
                    {keys: ['d/4'], duration: 'q', lyrics: ['어']},
                    {keys: ['f/4'], duration: 'q', lyrics: ['행']},
                    {keys: ['a/5'], duration: '8d', lyrics: ['복']},
                    {keys: ['g/4'], duration: '16', lyrics: ['해']},
                ]
            },
            { 
                width : 150,
                tieIndexes: [{start: 'prev', end: 0}],
                notes: [
                    {keys: ['b/4'], duration: '2d', lyrics: ['–']},
                    {keys: ['b/4'], duration: 'qr'}
                ],
                lowTieIndexes: [{start: 'prev', end: 0}],
                lowNotes: [
                    {keys: ['g/4'], duration: '2d', lyrics: ['–']},
                    {keys: ['b/4'], duration: 'qr'},
                ]
            },
            
        ],
    }
]

export {
    notes, defaultShorcut, scoreTitles, allInstruments, songScores
}