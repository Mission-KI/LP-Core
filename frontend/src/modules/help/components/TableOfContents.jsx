export const TableOfContents = ({ content }) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  const headings = Array.from(
    doc.body.querySelectorAll("h1, h2, h3, h4, h5, h6")
  ).map((el) => ({
    id: el.id || el.textContent.trim().toLowerCase().replace(/\s+/g, "-"),
    text: el.textContent,
    level: parseInt(el.tagName[1]),
  }));

  // Optionally inject IDs for anchor linking
  headings.forEach((h) => {
    const el = doc.getElementById(h.id);
    if (!el) {
      const match = Array.from(doc.body.querySelectorAll(`h${h.level}`)).find(
        (e) => e.textContent === h.text
      );
      if (match) match.setAttribute("id", h.id);
    }
  });

  const filteredHeadings = headings.filter((h) => h.level !== 1);
  const firstLevel =
    filteredHeadings.length > 0 ? filteredHeadings[0].level : 1;

  const tocItems = filteredHeadings.map((h, index) => (
    <li
      key={index}
      style={{ marginLeft: `${(h.level - firstLevel) * 13}px` }}
      className="mb-2"
    >
      <a href={`#${h.id}`}>{h.text}</a>
    </li>
  ));

  const splitIndex = Math.ceil(tocItems.length / 2);
  const leftColumn =
    tocItems.length > 7 ? tocItems.slice(0, splitIndex) : tocItems;
  const rightColumn = tocItems.length > 7 ? tocItems.slice(splitIndex) : [];

  return (
    <div className="mb-5">
      <h5 className="bold mt-3 mb-3">Content</h5>
      <div className="row">
        <div className="col-md-6">
          <ul className="toc">{leftColumn}</ul>
        </div>
        {rightColumn.length > 0 && (
          <div className="col-md-6">
            <ul className="toc">{rightColumn}</ul>
          </div>
        )}
      </div>
    </div>
  );
};
