export default function handler(req, res) {
  const { slug = "" } = req.query;

  const articleUrl = `https://nogomax-sportski-portal.lovable.app/clanak/${slug}`;

  const title = "Trener Reala bijesan nakon ispadanja: Ovakve odluke ne smiju odlučivati utakmicu";
const description = "Burne reakcije nakon ispadanja Reala iz Lige prvaka. Trener Madriđana žestoko je kritizirao sporne odluke koje su, po njegovom mišljenju, usmjerile utakmicu.";
const image = "OVDJE_STAVI_PRAVI_LINK_SLIKE";

  res.setHeader("Content-Type", "text/html; charset=UTF-8");

  res.status(200).send(`<!DOCTYPE html>
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

<meta http-equiv="refresh" content="0; url=${articleUrl}" />
</head>

<body>
<p>Preusmjeravanje...</p>
<a href="${articleUrl}">Otvori članak</a>
</body>
</html>`);
}
