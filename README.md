# on-line [![Build Status](https://travis-ci.org/zce/on-line.svg?branch=master)](https://travis-ci.org/zce/on-line)

Check if the internet connection is up

Works in Node.js.

In the browser you have [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine.onLine), but it's useless as it only tells you if there's a local connection, and not whether the internet is accessible.


## Install

```
$ npm install --save on-line
```


## Usage

The basic use

```js
var isOnline = require('on-line');

isOnline(function(err, online) {
  console.log(online);
  // => true
});
```

Custom options

```js
var isOnline = require('on-line');
isOnline({ timeout: 1000, server: '199.7.83.42' }, function(err, online) {
  console.log(online);
  // => true
});
```


## Node API

### isOnline([options,]callback)

#### options

*Optional*  
Type: `object`

##### timeout

Type: `number`

Milliseconds to wait for a server to send response.

##### server

Type: `string`

Testing server.

#### callback(error, online)

*Required*  
Type: `function`

`error` is there only by Node.js convention and is always `null`.


## How it works

In node, we first contact one of the thirteen [root servers](https://www.iana.org/domains/root/servers) and ask them to direct us to the servers which host the `<root>` zone (Which they are themselves). If the server answers, we return an online status.

If no satisfying answer is given within one second, we return an offline status. In the rare case where an firewall intercepts the packet and answers it on its behalf, a second check is run which tries to connect to a series of popular web sites on port 80. If one of these connects, we return online, otherwise offline status.

In the browser, a sophisticated check like in node is not possible because DNS and sockets are abstracted away. We use a check which requests an uncached `favicon.ico` on a series of popular websites. If one of this checks succeeds, we return online status. If all the requests fail, we return offline status.


## Thanks

- [is-online](https://github.com/sindresorhus/is-online)


## License

MIT
