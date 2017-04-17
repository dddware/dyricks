# dyricks

Guitar-chord-augmented song lyrics on a fancy webpage

## Setup

```
npm install
npm start
```

## Build CSS

> Need SASS installed with `gem install sass`

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
