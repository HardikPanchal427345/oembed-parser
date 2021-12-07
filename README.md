# oembed-parser

Extract eEmbed content from given URL.

[![NPM](https://badge.fury.io/js/oembed-parser.svg)](https://badge.fury.io/js/oembed-parser)
[![CI test](https://github.com/ndaidong/oembed-parser/workflows/ci-test/badge.svg)](https://github.com/ndaidong/oembed-parser/actions)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/oembed-parser/badge.svg?branch=main)](https://coveralls.io/github/ndaidong/oembed-parser?branch=main)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ndaidong_oembed-parser&metric=alert_status)](https://sonarcloud.io/dashboard?id=ndaidong_oembed-parser)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Demo

- [Give it a try!](https://ndaidong.github.io/oembed-parser-demo)
- [Example FaaS](https://us-central1-technews-251304.cloudfunctions.net/oembed-parser?url=https://www.youtube.com/watch?v=8jPQjjsBbIc)


### Installation

```bash
npm install oembed-parser
```

### Usage

```js
import {
  extract
} from 'oembed-parser'

const url = 'https://www.youtube.com/watch?v=8jPQjjsBbIc'

extract(url).then((oembed) => {
  console.log(oembed)
}).catch((err) => {
  console.trace(err)
})
```

### APIs

#### .extract(String url [, Object params])

Extract oEmbed data from specified url.
Return: a Promise

Optional argument `params` is an object with it we can set `maxwidth` and/or `maxheight` those are used to scale embed size to fit your container size. Please refer [oEmbed/Full Spec/Consumer Request](https://oembed.com/#section2) for more info.

Here is how we can use `oembed-parser` in async/await style:

```js
import {
  extract
} from 'oembed-parser'

const getOembed = async (url) => {
  try {
    const oembed = await extract(url)
    return oembed
  } catch (err) {
    console.trace(err)
  }
}

const data = getOembed('your url')
console.log(data)
```


#### .hasProvider(String URL)

Return boolean. True if the URL matches with any provider in the list.

#### .findProvider(String URL)

Return provider which is relevant to given URL.

For example:

```js
import {
  findProvider
} from 'oembed-parser'

findProvider('https://www.facebook.com/video.php?v=999999999')

// get something like below:

// {
//   fetchEndpoint: 'https://graph.facebook.com/v10.0/oembed_video',
//   providerName: 'Facebook',
//   providerUrl: 'https://www.facebook.com/'
// }
```


#### .setProviderList(Array of provider definitions)

Sets the list of providers to use, overriding the defaults.

This can be useful for whitelisting only certain providers, or for adding
custom providers.

For the expected format, see the
[default list](https://raw.githubusercontent.com/ndaidong/oembed-parser/master/src/utils/providers.json).


### Provider list

List of resource providers is a clone of [oembed.com](http://oembed.com/providers.json) and available [here](https://raw.githubusercontent.com/ndaidong/oembed-parser/master/src/utils/providers.json).


## Facebook and Instagram

Since October 24 2020, Facebook have deprecated their legacy urls and applied a new Facebook oEmbed endpoints.
Please update your `oembed-parser` version to v1.4.2 or later to be able to extract oembed data from Instagram and Facebook.

Technically, now we have to use Facebook Graph API, with the access token from a valid and live Facebook app.


```bash
export FACEBOOK_APP_ID=your_app_id
export FACEBOOK_CLIENT_TOKEN=your_client_token
```

For more info, please refer:

- [Facebook oEmbed](https://developers.facebook.com/docs/plugins/oembed)


## Test

```bash
git clone https://github.com/ndaidong/oembed-parser.git
cd oembed-parser
npm install
npm test

# quick evaluation
npm run eval {URL_TO_PARSE_OEMBED}
```

# License

The MIT License (MIT)
