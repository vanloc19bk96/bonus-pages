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

## Deploy (Cloudflare Workers, https://bonuspage.fastaifactory.com)

The repo root is the site: `bonuspage.fastaifactory.com/<product>/` serves `<product>/index.html`.

| File | What it does |
| --- | --- |
| `wrangler.jsonc` | Worker `bonus-pages`, custom domain `bonuspage.fastaifactory.com`, 404 page, trailing-slash URLs |
| `worker.js` | Only videos run through it: answers Range requests with 206 so Safari/iPhone can play them |
| `.assetsignore` | Keeps repo files (README, worker, config, `.git`) off the site |
| `404.html` | Shown for unknown paths and the bare domain |
| `.github/workflows/deploy.yml` | Deploys on every push to `main` |

**Automatic:** every push to `main` deploys, once the repo has two secrets (GitHub → Settings → Secrets and
variables → Actions): `CLOUDFLARE_API_TOKEN` (template "Edit Cloudflare Workers", zone `fastaifactory.com`) and
`CLOUDFLARE_ACCOUNT_ID`. The same values as the `sale-pages` repo work.

**Manual, from this computer:**

```sh
cd d:/Affiliate/bonus-page
npx wrangler deploy        # wrangler 4.x; `npx wrangler login` once
```

Each file must stay under Cloudflare's 25 MiB limit (the NAZO BOX video is about 11 MB).

## Sources

- NAZO BOX video: `d:/Affiliate/NAZO BOX/bonus-video` (its README has the rebuild steps; output goes to `bonus-page/nazo-box/video/`).
