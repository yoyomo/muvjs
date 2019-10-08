# muvjs
MUV architecture in pure javascript

## How-to use
1. create the root div 
`<div id="root"></div>`
2. copy or link `muv.js` and `virtual-dom.js` 
```
<script src="muv.js"></script>
<script src="virtual-dom.js"></script>
```

3. Call muv 
`muv(init)(update)(view)("root")`

Then you can edit `app.js` to your needs

Have fun!

## Example
```
<!DOCTYPE html>
<html>

<body>
  <div id="root"></div>

  <script src="muv.js"></script>
  <script src="virtual-dom.js"></script>

  <script src="app.js"></script>
  <script>
    muv(init)(update)(view)("root")
  </script>
</body>

</html>
```
