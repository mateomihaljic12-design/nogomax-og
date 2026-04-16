export default async function handler(req, res) {
  const { slug = "" } = req.query;

  const cleanSlug = String(slug).trim();
  const articleUrl = `https://nogomax-sportski-portal.lovable.app/clanak/${cleanSlug}`;

  let title = "NOGOMAX vijest";
  let description = "Najnovije nogometne vijesti";
  let image = "https://placehold.co/1200x630.jpg";

  try {
    const response = await fetch(articleUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NOGOMAX-OG/1.0)"
      }
    });

    const html = await response.text();

    const decodeHtml = (str = "") =>
      str
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .trim();

    const stripTags = (str = "") =>
      str.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

    const escapeAttr = (str = "") =>
      String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const getMetaContent = (property) => {
      const regex = new RegExp(
        `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["'][^>]*>`,
        "i"
      );
      return html.match(regex)?.[1] || "";
    };

    const getTitleFromH1 = () => {
      const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      return match ? stripTags(match[1]) : "";
    };

    const getFirstImage = () => {
      const match = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
      return match ? match[1] : "";
    };

    const ogTitle = getMetaContent("og:title");
    const ogDescription = getMetaContent("og:description");
    const ogImage = getMetaContent("og:image");
    const metaDescription = getMetaContent("description");
    const h1Title = getTitleFromH1();
    const firstImage = getFirstImage();

    if (ogTitle) {
      title = decodeHtml(ogTitle);
    } else if (h1Title) {
      title = decodeHtml(h1Title);
    } else if (cleanSlug) {
      title = decodeHtml(
        cleanSlug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      );
    }

    if (ogDescription) {
      description = decodeHtml(ogDescription);
    } else if (metaDescription) {
      description = decodeHtml(metaDescription);
    }

    if (ogImage) {
      image = ogImage;
    } else if (firstImage) {
      image = firstImage.startsWith("http")
        ? firstImage
        : `https://nogomax-sportski-portal.lovable.app${firstImage}`;
    }

    res.setHeader("Content-Type", "text/html; charset=UTF-8");

    return res.status(200).send(`<!DOCTYPE html>
<html lang="hr">
<head>
<meta charset="UTF-8" />
<title>${escapeAttr(title)}</title>

<meta property="og:title" content="${escapeAttr(title)}" />
<meta property="og:description" content="${escapeAttr(description)}" />
<meta property="og:image" content="${escapeAttr(image)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${escapeAttr(articleUrl)}" />
<meta property="og:type" content="article" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeAttr(title)}" />
<meta name="twitter:description" content="${escapeAttr(description)}" />
<meta name="twitter:image" content="${escapeAttr(image)}" />

<meta http-equiv="refresh" content="0; url=${escapeAttr(articleUrl)}" />
</head>
<body>
<p>Preusmjeravanje...</p>
<a href="${escapeAttr(articleUrl)}">Otvori članak</a>
</body>
</html>`);
  } catch (error) {
    res.setHeader("Content-Type", "text/html; charset=UTF-8");

    return res.status(200).send(`<!DOCTYPE html>
<html lang="hr">
<head>
<meta charset="UTF-8" />
<title>NOGOMAX vijest</title>

<meta property="og:title" content="NOGOMAX vijest" />
<meta property="og:description" content="Najnovije nogometne vijesti" />
<meta property="og:image" content="https://placehold.co/1200x630.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
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
}
