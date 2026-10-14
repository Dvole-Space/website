# Dvole

A static research website, written in plain HTML, CSS, and JavaScript.

- `index.html`: introduction, six programme links, and the latest blog entry.
- `philosophy.html`: research philosophy essay.
- `programmes.html`: six research programmes with stable section anchors.
- `blogs.html`: chronological article index.
- `blog/`: individual articles; each has its own HTML permalink.
- `styles.css` and `app.js`: shared layout, theme control, and programme index highlighting.

## Preview locally

From this directory, run `python3 -m http.server 8000 --bind 127.0.0.1` and open
`http://127.0.0.1:8000/`. There is no build or dependency installation step.

## Add a blog post

Copy the existing HTML article in `blog/` to a new descriptive filename.
Update its title, description, heading, author, date (including the
`datetime` attribute), and article paragraphs. Keep the relative
`../styles.css`, `../app.js`, and navigation paths.

Add an entry at the top of `blogs.html`, linking to the new file. Update
the homepage's “From the blog” entry if the new post should be featured.
Check the article and return links in the local preview.

Core content is present in HTML and remains readable without JavaScript.
The theme follows the system preference until the reader saves an override.
Keep `.nojekyll` and any domain configuration intact.
