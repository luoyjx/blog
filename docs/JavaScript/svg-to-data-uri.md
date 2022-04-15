---
id: svg-to-data-uri
title: svg 转成 dataURI 在 CSS 中使用
---

## Examples

### HTML

```html
<img src="data:image/svg+xml,%3Csvg width='247' height='34' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFF' fill-rule='non.zero'%3E%3Cpath d='M13.918 ... 4.022-2.888 4.57V26h-4.46V7.975z' fill='%23D7DCE1'/%3E%3C/g%3E%3C/svg%3E"/>
```

### CSS
```css
.logo {
  background: url("data:image/svg+xml,%3Csvg ... /svg%3E");
}
```

### encodeSvg

```js
// this function is from the work of Taylor Hunt found at https://codepen.io/tigt/post/optimizing-svgs-in-data-uris

function encodeSvg(svgString) {
  return svgString.replace('<svg',(~svgString.indexOf('xmlns')?'<svg':'<svg xmlns="http://www.w3.org/2000/svg"'))

      //
      //   Encode (may need a few extra replacements)
      //
      .replace(/"/g, '\'')
      .replace(/%/g, '%25')
      .replace(/#/g, '%23')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/</g, '%3C')
      .replace(/>/g, '%3E')

      .replace(/\s+/g,' ')
      //
      //    The maybe list (add on documented fail)
      //
      //  .replace(/&/g, '%26')
      //  .replace('|', '%7C')
      //  .replace('[', '%5B')
      //  .replace(']', '%5D')
      //  .replace('^', '%5E')
      //  .replace('`', '%60')
      //  .replace(';', '%3B')
      //  .replace('?', '%3F')
      //  .replace(':', '%3A')
      //  .replace('@', '%40')
      //  .replace('=', '%3D')
  ;}
```