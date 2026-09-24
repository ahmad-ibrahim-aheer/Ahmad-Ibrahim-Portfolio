import { useEffect } from "react";
import { SITE } from "../data/site";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
}
export function useSEO({ title, description, keywords, path = "/" }: SEOProps) {
  useEffect(() => {
    document.title = title;
    const updateMeta = (key: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let element = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      );
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
    };
    updateMeta("description", description);
    if (keywords) updateMeta("keywords", keywords);
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:url", SITE.url + path, true);
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = SITE.url + path;
  }, [title, description, keywords, path]);
}
