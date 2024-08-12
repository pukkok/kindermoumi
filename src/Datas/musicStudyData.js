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
    {
        title : '네가있어행복해',
        key : 'A',
        time : '4/4',
        clef : 'treble',
        blocks : [
            {
                isFirst : true,
                width : 250,
                lyrics : ['구', '름', '은'],
                notes: ['C4/h', 'D4/q', 'E4/q']
            },
            {
                width : 200,
                tieIndexes : [{start: 2, end: 3}],
                lyrics : ['마', '음', '껏', '–', ''],
                notes: [ 'C4/q', 'F4/8.', 'E4/16', 'E4/q', 'B4/rq']
            },
            {
                width : 200,
                tieIndexes : [{start: 2, end: 3}], 
                lyrics: ['두', '둥', '실', '–', '두', '둥'],
                notes: [ 'F4/q', 'Gn4/8.', 'F4/16', 'F4/8.', 'E4/16', 'C4/q']
            },
            {
                width : 100, 
                lyrics : ['실'],
                notes: [ 'D4/1' ]
            },
            {
                width : 200,
                tieIndexes : [{start: 1, end: 2}],
                lyrics : ['', '자', '–', '유', '롭', '게'],
                notes: [ 'B4/8/r.', 'd4/16', 'd4/8.', 'e4/16', 'fn4/q', 'd4/q']
            },
            {
                width : 250,
                tieIndexes : [{start: 3, end: 4}],
                lyrics : ['날', '수', '있', '는', '–', ''],
                notes: [ 'C4/8.', 'D4/16', 'E4/8.', 'A4/16', 'A4/q', 'B4/q/r' ]
            },
            { // 2번째 줄
                isFirst : true,
                width : 350,
                lyrics : ['하','늘','운','동','장','이','있','어'],
                notes: [ 'B4/8.', 'A4/16', 'G4/8.', 'A4/16', 'B4/8.', 'A4/16', 'G4/8.', 'F4/16']
            },
            {
                width: 200,
                tieIndexes:[{start: 2, end: 3}],
                lyrics : ['행', '복', '해', '–', ''],
                notes: [ 'E4/q', 'D#4/8.', 'E4/16', 'E4/q', 'B4/q/r' ]
            },
            {
                width: 150,
                lyrics : ['풀', '밭', '속'],
                notes: [ 'C4/h', 'D4/q', 'E4/q' ]
            },
            {
                width: 200,
                tieIndexes:[{start: 2, end: 3}],
                lyrics : ['한', '켠', '에', '–'],
                notes: [ 'C4/q', 'F4/8.', 'E4/16','E4/q', 'B4/q/r']
            },
            {
                width: 200,
                tieIndexes:[{start: 2, end: 3}],
                lyrics : ['피', '어', '난', '–', '꽃', '송'],
                notes: [ 'F4/q', 'Gn4/8.', 'F4/16', 'F4/8.', 'E4/16', 'C4/q']
            },
            {
                width: 100,
                lyrics : ['이'],
                notes: [ 'D4/1' ]
            },
            { // 3번째 줄
                isFirst : true,
                width : 350,
                tieIndexes:[{start: 1, end: 2}],
                lyrics: ['', '매', '–', '일', '매', '일'],
                notes: [ 'B4/8/r.', 'D4/16', 'D4/8.', 'E4/16', 'Fn4/q', 'D4/q' ]
            },
            {
                width : 350,
                tieIndexes:[{start: 3, end: 4}],
                lyrics : ['놀','러','오','는','–','개','미'],
                notes: [ 'C4/8.', 'D4/16', 'E4/8.', 'A4/16', 'A4/q', 'F4/8.', 'G4/16' ]
            },
            {
                width : 350,
                lyrics : ['친','구','있','어','행','복'],
                notes: [ 'A4/8.', 'B4/16', 'F4/8.',' G4/16', 'A4/q', 'G4/q' ]
            },
            {
                width : 150,
                lyrics : ['해', ''],
                notes: [ 'A4/2.', 'B4/q/r']
            },
            { // 4번째 줄
                isFirst : true,
                width : 300,
                lyrics : ['쑥', '쑥'],
                notes: [ 'F4/2.', 'A4/q' ],

                lowTieIndexes: [{start: 1, end: 2}],
                lowLyrics : ['', '쑥', '–', '쑥', '쑥', '–'],
                lowNotes : [ 'B4/q/r', 'F4/q', 'F4/8.', 'D4/16', 'F4/8.', 'A4/16' ],
            },
            {
                width : 200,
                tieIndexes: [{start: 2, end: 3}],
                lyrics : ['자','라','고','–','싶','은'],
                notes: [ 'G4/q', 'A4/8.', 'G4/16', 'G4/q', 'G4/8.', 'F4/16' ],
                lowTieIndexes: [{start: 2, end: 3}],
                lowLyrics : ['자','라','고','–','싶','은'],
                lowNotes: [ 'G4/q', 'A4/8.', 'G4/16', 'G4/q', 'G4/8.', 'F4/16' ],
            },
            {
                width : 200,
                tieIndexes: [{start: 4, end: 'next'}],
                lyrics : ['나', '무', '잎','사','귀'],
                notes : ['E4/q', 'C4/q', 'E4/q', 'g4/8.', 'F4/16'],
                lowLyrics : ['나', '무', '잎','사','귀'],
                lowNotes : ['E4/q', 'C4/q', 'E4/q', 'g4/8.', 'F4/16']
            },
            {
                width : 130,
                tieIndexes: [{start: 'prev', end: 0}],
                lyrics : ['–'],
                notes: [ 'F4/2.', 'B4/q/r' ],
                lowLyrics : ['', '잎','사','귀'],
                lowNotes: [ 'B4/q/r', 'B4/q', 'G4/q', 'E4/q' ]
            },
            {
                width : 200,
                tieIndexes: [{start: 0, end: 1}],
                lyrics : ['햇','–','살','가','득'],
                notes : ['D4/2', 'D4/8.', 'C4/16', 'D4/8.', 'F4/16'],
                lowTieIndexes: [{start: 0, end: 1}],
                lowLyrics : ['햇','–','살','가','득'],
                lowNotes : ['D4/2', 'D4/8.', 'C4/16', 'D4/8.', 'F4/16'],
            },
            {
                width : 170,
                lyrics : ['선','물','한','해','님'],
                notes : ['E4/q', 'B4/q', 'A4/q', 'B4/8.', 'C5/16'],
                lowLyrics : ['선','물','한','해','님'],
                lowNotes: [ 'E4/q', 'G4/q', 'A4/q', 'B4/8.', 'C5/16']
            },
            { // 5번째 줄
                isFirst: true,
                width : 300,
                tieIndexes: [{start: 4, end: 'next'}],
                lyrics: ['있','어','행','복','해'],
                staccatoIndexes : [0],
                notes: ['D5/q', 'F4/q', 'A4/q', 'C5/8.', 'B4/16'],

                lowTieIndexes: [{start: 4, end: 'next'}],
                lowStaccatoIndexes : [0],
                lowLyrics : ['있','어','행','복','해'],
                lowNotes: [ 'D5/q', 'D4/q', 'F4/q', 'A4/8.', 'G4/16']
            },
            { 
                width : 150,
                tieIndexes: [{start: 'prev', end: 0}],
                lyrics : ['–'],
                notes : ['B4/2.', 'B4/q/r'],
                lowTieIndexes: [{start: 'prev', end: 0}],
                lowLyrics : ['–'],
                lowNotes : ['G4/2.', 'B4/q/r']
            },
            { 
                width : 250,
                lyrics : ['나','는','네','가','있','어'],
                notes: ['E4/q',' A4/q', 'G4/8.', 'A4/16', 'G4/8.', 'E4/16'],
                lowLyrics : ['나','는','네','가','있','어'],
                lowNotes: ['E4/q',' A4/q', 'G4/8.', 'A4/16', 'G4/8.', 'E4/16'],
            },
            { 
                width : 250,
                tieIndexes: [{start: 2, end: 3}],
                lyrics : ['참','좋','아','–'],
                notes: ['F4/q', 'G4/8.', 'F4/16', 'F4/q', 'B4/q/r'],
                lowTieIndexes: [{start: 2, end: 3}],
                lowLyrics : ['참','좋','아','–'],
                lowNotes: ['F4/q', 'G4/8.', 'F4/16', 'F4/q', 'B4/q/r'],
            },
            { 
                width : 250,
                lyrics : ['함','께','있','어','정','말'],
                notes: [ 'F4/q', 'D5/q', 'C5/8.', 'D5/16', 'C5/8.', 'A4/16' ],
                lowLyrics : ['함','께','있','어'],
                lowNotes : ['D4/q', 'B4/q', 'A4/q', 'A4/q']
            },
            {
                isFirst : true, 
                width : 250,
                tieIndexes : [{start: 2, end: 3}],
                lyrics : ['행', '복', '해', '–'],
                notes: ['B4/q', 'C5/8.', 'B4/16', 'B4/h'],
                lowTieIndexes : [{start: 2, end: 3}],
                lowLyrics : ['행', '복', '해', '–'],
                lowNotes : ['G4/q', 'A4/8.', 'G4/16', 'G4/h'],
            },
            {
                width : 300,
                lyrics : ['서','로','서','로','어','울','려','서'],
                notes : ['C5/8.', 'C5/16', 'D5/8.', 'C5/16', 'B4/8.', 'B4/16', 'C5/8.', 'B4/16'],
                lowLyrics : ['서','로'],
                lowNotes : ['A4/h', 'G4/h']
            },
            {
                width : 250,
                tieIndexes : [{start: 2, end: 3}],
                lyrics : ['좋','–','아','–','네','가'],
                breathMarkIndexes : [3],
                notes: [ 'A4/q', 'B4/8.', 'C5/16', 'C5/q', 'B4/8.', 'C5/16' ],
                
                lowTieIndexes : [{start: 2, end: 3}],
                lowLyrics : ['좋','–','아','–','네','가'],
                lowBreathMarkIndexes : [3],
                lowNotes: [ 'F4/q', 'E4/8.', 'D#4/16', 'D4/q', 'F4/8.', 'F4/16' ],
            },
            {
                width : 250,
                lyrics : ['있','어','정','말','행','복'],
                staccatoIndexes : [0],
                notes: [ 'D5/q', 'F4/q', 'A4/8.', 'G4/16', 'F4/8.', 'G4/16' ],

                lowLyrics : ['있','어','행','복'],
                lowStaccatoIndexes: [0],
                lowNotes: [ 'F4/q', 'F4/q', 'E4/q', 'D4/q'],
            },
            {
                width : 150,
                isRepeatEnd : true,
                turnNum: 1,
                lyrics : ['해'],
                notes: [ 'A4/2.', 'B4/q/r' ],

                lowLyrics : ['해'],
                lowNotes: [ 'C4/2.', 'B4/q/r' ],
            },
            
        ],
    }
]

export {
    notes, defaultShorcut, scoreTitles, allInstruments, songScores
}