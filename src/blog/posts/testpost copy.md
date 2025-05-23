---
title: My Second Blog Post
date: 2025-05-22
category: Technology
description: The first blog post on this website, for testing capabilities.
tags: [tech, test, blogpost]
image: /assets/img/photos/desert-arch.jpg
layout: layouts/article.njk
---


# Second Blog Post

Welcome to this comprehensive markdown test post!

## Shai is a GOAT :goat

Regular text with **bold text**, *italic text*, ***bold and italic***, and ~~strikethrough~~.

## Lists

### Unordered Lists
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered Lists
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

### Task Lists
- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

## Code

Inline `code` example. Example of a fira code ligature: `==>`.

```javascript
// A simple JavaScript function
function greeting(name) {
  return `Hello, ${name}!`;
}

// Using an arrow function
const add = (a, b) => a + b;

// Object with methods
const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b !== 0 ? a / b : "Cannot divide by zero")
};

console.log(greeting("World"));
console.log(calculator.add(5, 3));
```

## Blockquotes

> This is a blockquote
> 
> > Nested blockquote
>
> Still in the first blockquote

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|:--------:|---------:|
| Left     | Center   | Right    |
| Cell     | Cell     | Cell     |
| Cell     | Cell     | Cell     |

## Horizontal Rules

---

## Links and Images

[Link to example website](https://example.com)

![Alt text for image](/assets/img/photos/output-cason.gif "Cason Dunking")

Here's a great gif of Cason Wallace dunking on Nikola Jokic.

![Alt text for image](/assets/img/photos/output-cason.gif "Cason Dunking")
![Alt text for image](/assets/img/photos/output-shai.gif "Shai and-one")

Here's an example of what I may do with two images next to one another.

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

## Definition Lists

Term 1
: Definition 1

Term 2
: Definition 2a
: Definition 2b

## Math (if supported)

Inline math: $E=mc^2$

Block math:

$$
\frac{d}{dx}(e^x) = e^x
$$

## Emojis (if supported)

:smile: :heart: :thumbsup:

## Abbreviations

*[HTML]: Hyper Text Markup Language
*[CSS]: Cascading Style Sheets

The HTML and CSS are web standards.

## Highlight (if supported)

==This text is highlighted==

## Subscript and Superscript

H~2~O is a liquid. 2^10^ equals 1024.
