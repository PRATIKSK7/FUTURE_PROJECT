export function parseSections(markdown: string) {
  if (!markdown) return [];
  const lines = markdown.split("\n");
  const sections = [];
  let currentTitle = "General";
  let currentContent = "";

  for (const line of lines) {
    if (line.startsWith("# ") || line.startsWith("## ") || line.startsWith("### ")) {
      if (currentContent.trim() !== "") {
        sections.push({ title: currentTitle, content: currentContent.trim() });
      }
      currentTitle = line.replace(/^#+\s/, "");
      currentContent = "";
    } else {
      currentContent += line + "\n";
    }
  }
  
  if (currentContent.trim() !== "") {
    sections.push({ title: currentTitle, content: currentContent.trim() });
  }

  if (sections.length === 0) {
    sections.push({ title: "Generated Content", content: markdown });
  }
  
  return sections;
}

export function getMockQualityScores(content: string) {
  const words = content.split(/\s+/).length;
  // Mock logic based on length
  const seo = Math.min(100, 60 + (words / 10));
  const readability = Math.min(100, 70 + (words / 20));
  const cta = Math.min(100, 50 + (words / 15));
  const overall = Math.floor((seo + readability + cta) / 3);

  return {
    seoScore: Math.floor(seo),
    readabilityScore: Math.floor(readability),
    ctaStrength: Math.floor(cta),
    grammarStatus: "Excellent",
    brandConsistency: "High",
    keywordDensity: "2.4%",
    estimatedTokens: Math.floor(words * 1.3),
    overallScore: overall
  };
}

export function getDocumentStats(content: string) {
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;
  const readingTime = Math.ceil(words / 200); // 200 wpm
  
  return { words, chars, readingTime };
}
