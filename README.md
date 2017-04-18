# dyricks

Guitar-chord-augmented song lyrics on a fancy webpage

## Setup

```
    npm install
    # Serve html and watch stylus files
    npm start
```

## Build only CSS

```
    npm run build_css
```

## Usage

### API

```
    curl http://localhost:3000/api?q=bad+religion+los+angeles+is+burning
    curl http://localhost:3000/api.html?q=bad+religion+los+angeles+is+burning # preserve original markup
```

### Web

```
firefox http://localhost:3000
```
