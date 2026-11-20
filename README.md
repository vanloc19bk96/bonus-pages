# Bonus pages

Affiliate bonus pages, one folder per product. Each folder is a static page (HTML, CSS and JS only), so the whole
`bonus-page` folder can be deployed to Cloudflare as it is.

```
bonus-page/
├── nazo-box/          → <domain>/nazo-box/
│   ├── index.html     page + inline script (affiliate link and launch dates in CONFIG at the bottom)
│   ├── style.css
│   ├── img/
│   └── video/
└── <next-product>/    → <domain>/<next-product>/
```

## Add a product

1. Create `bonus-page/<product-name>/` (lowercase, words joined with `-`). The folder name becomes the URL.
2. Put `index.html`, `style.css`, `img/` (and `video/` if there is one) inside. Copy `nazo-box/` as a starting point.
3. Keep every link to the page's own files relative (`img/...`, `style.css`), so the folder works anywhere.
4. Set the absolute `og:image` URL once the domain is known.

## Deploy (Cloudflare Pages)

```sh
cd d:/Affiliate
npx wrangler pages deploy bonus-page --project-name <project-name>
```

Each file must stay under Cloudflare's 25 MiB limit (the NAZO BOX video is about 11 MB).

## Sources

- NAZO BOX video: `d:/Affiliate/NAZO BOX/bonus-video` (its README has the rebuild steps; output goes to `bonus-page/nazo-box/video/`).
