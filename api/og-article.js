export default function handler(req, res) {
  const slug = req.query.slug || "";

  const articleUrl = `https://nogomax-sportski-portal.lovable.app/clanak/${slug}`;

  const title = "NOGOMAX vijest";
  const description = "Najnovije nogometne vijesti";
  const image = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2";

  res.setHeader("Content-Type", "text/html; charset=UTF-8");

  res.send(`<!DOCTYPE html>
<html lang="hr">
<head>
<meta charset="UTF-8" />
<title>${title}</title>

<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${image}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:url" content="${articleUrl}" />
<meta property="og:type" content="article" />
</head>

<body>
<p>Preusmjeravanje...</p>
<a href="${articleUrl}">Otvori članak</a>
</body>
</html>`);
}
