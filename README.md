# Link in bio template

A bold, playful "link in bio" page for creators, in plain HTML and CSS with a little vanilla JavaScript. It has a newsletter signup and a "work with me" form that both work on any static host. No build step, no framework, no tracking.

**[Live demo](https://formtango.github.io/link-in-bio-template/)**

- Three ready-made themes with a switcher that remembers the choice: Sunset (warm retro), Arcade (neon dark) and Sorbet (soft pastel)
- Avatar badge with initials, bio, social icons, big tactile link buttons and a featured card, all drawn in CSS and inline SVG (no image files)
- A newsletter signup form and a "work with me" form in a native dialog, both handled by [FormTango](https://formtango.com): submissions arrive in an inbox and by email, with spam filtered out
- Animated backgrounds made with CSS only, switched off for visitors who prefer reduced motion
- Mobile first, accessible, under 40 KB before fonts

## Use it

1. Click **Use this template** (or download the files).
2. Edit `index.html`: your name, handle, bio, links and the featured card.
3. Pick a default theme with `data-theme` on the `<html>` tag: `sunset`, `arcade` or `sorbet`.
4. Host it anywhere: GitHub Pages, Netlify, Vercel, Cloudflare Pages.

## Make the forms work

The page has two forms, and each one needs its own form id, so that signups and business inquiries stay separate.

1. Get two form ids. Sign up free at https://formtango.com (1,000 submissions a month), or create them with no account, one request per form:

   ```bash
   curl -X POST https://formtango.com/api/v1/claims \
     -H "Content-Type: application/json" -d '{"name":"Newsletter signup"}'

   curl -X POST https://formtango.com/api/v1/claims \
     -H "Content-Type: application/json" -d '{"name":"Work with me"}'
   ```

2. In `index.html`, replace `YOUR_NEWSLETTER_FORM_ID` with the first and `YOUR_CONTACT_FORM_ID` with the second.

That's all. Until you do, each form runs in demo mode and tells visitors so.

## Customize

- **Themes:** each theme is one block of custom properties at the top of `style.css`. Change the values, or copy a block to make your own (then add its name to the small script in the `<head>` of `index.html` and a button to the switcher). To offer one theme only, delete the `.switcher` element.
- **Links:** each link is one `<li>` in the `.links` list. Copy, delete and reorder them freely. The classes `c1` to `c4` pick the color.
- **Icons:** the social and link icons are inline SVG. Swap in any 24 by 24 icon and keep `aria-hidden="true"` on it. Each social link needs an `aria-label`.
- **Avatar:** change the initials and the turning text inside the `.avatar` element, or replace the whole element with an `<img>`.
- **More form fields:** add inputs with a `name`; they are sent automatically.

## License

MIT. No attribution needed, though the footer link is appreciated.
