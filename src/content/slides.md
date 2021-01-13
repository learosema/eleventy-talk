# Eleventy in 11 minutes

I haven't managed to do it in 11 slides

---

# Hi! I'm Lea Rosema

- Junior Frontend Developer at S2
- Digital artist, addicted to [Codepen](https://codepen.io)
- [https://lea.codes/](https://lea.codes/)
- [https://codepen.io/terabaud/](https://codepen.io/terabaud/)
- [https://twitter.com/terabaud](https://twitter.com/terabaud)
- [https://terabaud.github.io/eleventy-talk/](https://terabaud.github.io/eleventy-talk/)

---

# What is Eleventy?

- it's a static site generator 
- creates a website from your content :D

---

# The minimal example

```sh
echo "# Hello World!" > index.md
npx @11ty/eleventy
```

but let's do something more exciting :)

---
# Create a new project

```sh
mkdir my-awesome-site
cd my-awesome-site
git config --global init.defaultBranch main
git init
npm init -y
npm i @11ty/eleventy -D
```
---
# `.gitignore`

```sh
node_modules
.DS_Store
Thumbs.db

# Eleventy output folder
public
```
---

# `.eleventy.js` Config

```sh
module.exports = (config) => {
  // specify folders to be copied to the output folder
  config.addPassthroughCopy('./src/js/');
  config.addPassthroughCopy('./src/css/');

  return {
    dir: {
      input: 'src',    // default: '.'
      output: 'public' // default: '_site'
    }
  }
};
```

---
# `package.json`

```js
{
  "scripts": {
    "start": "eleventy --serve",
    "build": "eleventy"
  }
}
```
---
# Content: `src/index.md`

```md
---
title: "Hello world"
---
# Hello World

Welcome to my awesome {{title}} site! 
```

---
# Run and Build

- `npm start` -> Development server
- `npm run build` -> build it

---
# From markdown to paths

For each markdown content file, eleventy creates a folder with an `index.html` for nice urls:

```md
index.md            --> /
about.md            --> /about/
faq.md              --> /faq/
blog/hello-world.md --> /blog/hello-world/
```

---
# Layout templates 

`src/_includes/base.njk`

```html
<!DOCTYPE html>
<html lang="en">
  <head><title>{{ title }}</title></head>
  <body>
    <main>
      {% block content %}
        {{ content | safe }}
      {% endblock %}
    </main>
  </body>
</html>
```

---
# Extending layouts

```html
{% extends "base.njk" %}

{% block content %}
  <article class="article">
    {{ content | safe }}
  </article>
{% endblock %}
```
---
# Includes

You can include partial layouts anywhere(*) 
in your njk or markdown files:

```html
{% include 'header.njk' %}
```

*to make includes work from inside markdown
files, add `templateEngineOverride: njk,md` to the front matter

---
# Everything about Nunjucks

- [https://mozilla.github.io/nunjucks/](https://mozilla.github.io/nunjucks/)

## Other supported formats: 

`.html`, `.liquid`, `.hbs`, `.ejs`, `.haml`, `.pug`


---
# Providing data for your site

- file specific: in the markdown's front matter 
- folder specific: add a json file to a content folder
- globally `_data` directory: globally available
- `_data` supports `.js`, `.yaml`, `.json` files

--- 
# `_data` example

`src/_data/nav.json`
```js
[
  {"title": "Home", "url": "/"},
  {"title": "Blog", "url": "/blog/"}
]
```

---
# `_data` example part 2

`src/_includes/nav.njk`

```html
<nav>
  <ul>
    {% for link in nav %}
      <li>
        <a href="{{ link.url }}">{{ link.title }}</a>
      </li>
    {% endfor %}
  </ul>
</nav>
```

---
# `_data` javascript example

`_data/site.js`

```js
module.exports = {
  name: 'My awesome site',
  url: 'https://awesome.site/'
};
```

Can be used like this in the content: 
`{{ site.name }}`

---
# Collections

You can tag your content with a keyword and then iterate 
through these via collections.

This is useful for auto-generating table of contents or
listing articles that are related to each other

---
# Collections example

In your src folder, add a `blog` folder with a bunch of markdown files.
Tag them as `posts`:

```md
---
tags: posts
---
```
---
# Collections example part 2

`index.md`
```md
# Blog

<ul>{% for post in collections.posts %}<li>
  <a href="{{ post.url }}">
    {{ post.date | date: '%Y-%m-%d' }}: {{ post.data.title }}
  </a>
</li>{% endfor %}</ul>
```
---
# Personal example projects

- [https://github.com/terabaud/terabaud-website](https://github.com/terabaud/terabaud-website)
- [httpd://github.com/terabaud/lea-codes](https://github.com/terabaud/lea-codes)

---
# Thank you 👩‍💻

## Resources

- [https://11ty.dev/](https://11ty.dev/) - Official site
- [https://11ty.rocks/](https://11ty.rocks/) - Eleventy rocks
- [https://piccalil.li/course/learn-eleventy-from-scratch](https://piccalil.li/course/learn-eleventy-from-scratch) - in-depth course
