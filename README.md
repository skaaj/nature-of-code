# noc-gallery
Gallery of p5 sketches I created while reading the book "The Nature of Code".

The project re-uses the same `index.html` to render each sketches so you have to start a little node server to be able to serve them:
```
$ node server.js
```
Then open a sketch by GETting its identifier. It is made from the path where underscores (`_`) are replaced with hypens (`-`).

So, for example if you want to take a look at the file:

```
sketches/01_random/some_walker.js
```

You just have to open in your browser:
```
http://localhost:3000/01-random/some-walker
```
Where the first part refers to the chapter while the second is for the sketch within.