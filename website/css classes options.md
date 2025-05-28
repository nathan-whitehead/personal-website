# Multi-line Tailwind/CSS Classes in Astro

Yes, you can split long class strings across multiple lines in Astro components. There are a few approaches:

## 1. Template String with Line Breaks

```astro
---
// Custom blockquote component
---

<blockquote
  class={`
    my-6 pl-6 border-l-4 
    border-primary-500 
    [&>blockquote]:border-primary-700 
    dark:[&>blockquote]:border-primary-400 
    bg-paper-200 
    [&>blockquote]:bg-paper-300 
    dark:bg-zinc-800 
    dark:[&>blockquote]:bg-zinc-700 
    py-4 px-2 rounded-r
  `}
>
  <slot />
</blockquote>
```

## 2. Join Array of Classes

```astro
---
// Custom blockquote component
const blockquoteClasses = [
  "my-6 pl-6 border-l-4",
  "border-primary-500",
  "[&>blockquote]:border-primary-700",
  "dark:[&>blockquote]:border-primary-400",
  "bg-paper-200",
  "[&>blockquote]:bg-paper-300",
  "dark:bg-zinc-800",
  "dark:[&>blockquote]:bg-zinc-700",
  "py-4 px-2 rounded-r"
].join(" ");
---

<blockquote class={blockquoteClasses}>
  <slot />
</blockquote>
```

## 3. Use clsx/classnames Library

For more complex conditional classes:

```astro
---
// Custom blockquote component
import clsx from 'clsx';

const blockquoteClasses = clsx(
  "my-6 pl-6 border-l-4",
  "border-primary-500",
  "[&>blockquote]:border-primary-700",
  "dark:[&>blockquote]:border-primary-400",
  "bg-paper-200",
  "[&>blockquote]:bg-paper-300",
  "dark:bg-zinc-800",
  "dark:[&>blockquote]:bg-zinc-700",
  "py-4 px-2 rounded-r"
);
---

<blockquote class={blockquoteClasses}>
  <slot />
</blockquote>
```

## 4. Group Related Classes

You can make it more maintainable by grouping related classes:

```astro
---
// Custom blockquote component
const layout = "my-6 py-4 px-2 pl-6 rounded-r";
const borders = "border-l-4 border-primary-500";
const backgrounds = "bg-paper-200 dark:bg-zinc-800";
const nestedStyles = "[&>blockquote]:border-primary-700 [&>blockquote]:bg-paper-300 dark:[&>blockquote]:border-primary-400 dark:[&>blockquote]:bg-zinc-700";

const blockquoteClasses = `${layout} ${borders} ${backgrounds} ${nestedStyles}`;
---

<blockquote class={blockquoteClasses}>
  <slot />
</blockquote>
```

All of these approaches produce identical HTML output but make your code more readable and maintainable.