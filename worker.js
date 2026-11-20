// Serves the bonus pages from static assets. Only videos go through this code, to answer
// Range requests with 206 (copied from d:/Saas/sale-pages/worker.js).

const MEDIA_PATH = /\.(mp4|m4v|webm|mov)$/i;

/**
 * Static assets ignore the Range header and always send the whole file. Safari
 * (iPhone, iPad, Mac) won't play a <video> unless the server answers byte ranges
 * with 206, and seeking needs them everywhere. So for video files, cut the asked
 * range out of the full file here.
 */
async function serveMedia(request, response) {
  if (response.status !== 200) return response;
  const range = request.headers.get("Range");
  const match = range && range.match(/^bytes=(\d*)-(\d*)$/);
  if (request.method !== "GET" || !match || (match[1] === "" && match[2] === "")) {
    const full = new Response(response.body, response);
    full.headers.set("Accept-Ranges", "bytes");
    return full;
  }

  const body = await response.arrayBuffer();
  const size = body.byteLength;
  let start;
  let end;
  if (match[1] === "") {
    // "bytes=-500": the last 500 bytes
    start = Math.max(0, size - Number(match[2]));
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === "" ? size - 1 : Math.min(Number(match[2]), size - 1);
  }
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  }

  const headers = new Headers(response.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(body.slice(start, end + 1), { status: 206, headers });
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (MEDIA_PATH.test(path)) {
      return serveMedia(request, await env.ASSETS.fetch(request));
    }
    return env.ASSETS.fetch(request);
  },
};
