export default function handler(req, res) {
  const slug = req.query.slug || "";
  const articleUrl = `https://nogomax-sportski-portal.lovable.app/clanak/${slug}`;

  res.setHeader("Content-Type", "text/html; charset=UTF-8");

  res.send(`<!DOCTYPE html>
<html lang="hr">
<head>
  <meta charset="UTF-8" />
  <meta property="og:title" content="NOGOMAX vijest" />
  <meta property="og:description" content="Najnovije nogometne vijesti" />
  <meta property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/8/8c/Kylian_Mbapp%C3%A9_2022.jpg" />
  <meta property="og:url" content="${articleUrl}" />
  <meta property="og:type" content="article" />
</head>
<body>
  <a href="${articleUrl}">Otvori članak</a>
</body>
</html>`);
}
