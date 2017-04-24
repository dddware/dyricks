# dyricks

UltimateGuitar chords and Genius lyrics on a fancy webpage

## Setup

```
yarn # or npm install
```

Then

```
npm run css    # compiles stylesheets and watches for changes
npm run server # serves the app on port 3000
```

Or

```
npm start
```

## Usage

### API

```
curl http://localhost:3000/(ug|genius)?q=bad+religion+los+angeles+is+burning
curl http://localhost:3000/(ug|genius).html?q=bad+religion+los+angeles+is+burning # preserves original markup
```

### Web

```
firefox http://localhost:3000
```
