import axios from "axios";
import jsdom from "jsdom";

export async function getFavicon({
  url,
}: {
  url: string;
}): Promise<string | null> {
  if (!url) {
    return "please enter url";
  }

  const copyUrl = url.charAt(url.length - 1) === "/" ? url.slice(0, -1) : url;
  const { JSDOM } = jsdom;

  try {
    const { data } = await axios(url);
    const dom = new JSDOM(data);
    const document = dom.window.document;
    const linkTags = document.querySelectorAll("link");

    let faviconPath: string | null = null;

    for (let link of linkTags) {
      if (link.href.includes("icon") || link.rel.includes("icon")) {
        faviconPath = link.href.includes("http")
          ? link.href
          : copyUrl + link.href;

        break;
      }
    }

    return faviconPath;
  } catch (error) {
    return null;
  }
}
