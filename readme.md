Pila - tool for removing CSS code.

Example:

```css
a {
    background: red;
}
.baron {
    color: red;
    background: white;
}
.baron {
    background: pila;
}
```

goes to

```css
a {
    background: red;
}
.baron {
    color: red;
}
```

and a.baron will have box-shadow: red.