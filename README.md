# Bonus pages

Affiliate bonus pages, served at **https://bonuspage.fastaifactory.com/&lt;product&gt;/** by a Cloudflare Worker.
Same layout as `d:/Saas/sale-pages`: static files in `public/`, a small `worker.js`, `wrangler.jsonc`. No CI/CD:
deploy by hand from this folder.

```
bonus-page/
├── public/                 the site
│   ├── 404.html            unknown paths and the bare domain
│   ├── nazo-box/           → bonuspage.fastaifactory.com/nazo-box/
│   │   ├── index.html      page + inline script (affiliate link and launch dates in CONFIG at the bottom)
│   │   ├── style.css
│   │   ├── img/
│   │   └── video/
│   └── <next-product>/     → bonuspage.fastaifactory.com/<next-product>/
├── worker.js               only videos run through it: answers Range requests with 206 (Safari/iPhone)
└── wrangler.jsonc          Worker "bonus-pages", custom domain bonuspage.fastaifactory.com
```

## Add a product

1. Create `public/<product-name>/` (lowercase, words joined with `-`). The folder name becomes the URL.
2. Put `index.html`, `style.css`, `img/` (and `video/` if there is one) inside. Copy `public/nazo-box/` as a starting point.
3. Keep links to the page's own files relative (`img/...`, `style.css`).
4. Point `og:image` at `https://bonuspage.fastaifactory.com/<product-name>/img/...`.
5. Deploy, then commit and push.

## Deploy

```sh
cd d:/Affiliate/bonus-page
npx wrangler deploy        # wrangler 4.x; run `npx wrangler login` once on a new computer
```

Each file must stay under Cloudflare's 25 MiB limit (the NAZO BOX video is about 11 MB).

## Sources

- NAZO BOX video: `d:/Affiliate/NAZO BOX/bonus-video` (its README has the rebuild steps; output goes to `public/nazo-box/video/`).
