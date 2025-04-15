import InfoAlert from "../../../common/components/InfoAlert";

export const Functions_En = () => {
  return (
    <div className="col-md-10">
      <h1 className="bold mb-3">Functions</h1>
      <InfoAlert text="More content for English help pages will follow soon." />

      <h5 className="mt-5 mb-3" id="expert-mode">
        What is Expert Mode?
      </h5>
      <p className="regular text-justify">
        Expert Mode is an advanced search feature in Daseen that enhances your
        search experience by providing autocomplete suggestions for writing
        natural language queries in Elasticsearch. This allows you to construct
        complex queries more efficiently and retrieve precise results based on
        structured search logic.
      </p>

      <h5 className="mt-5" id="how-to-use-expert-mode">
        How to Use Expert Mode
      </h5>
      <ul className="regular">
        <li>
          You can enable or disable Expert Mode in the <strong>Settings</strong>{" "}
          page.
        </li>
        <li>
          When <strong>Expert Mode is ON</strong>, the search bar will provide
          autocomplete suggestions to help you write more refined Elasticsearch
          queries.
        </li>
        <li>
          When <strong>Expert Mode is OFF</strong>, the search bar will only
          suggest basic asset names, making it easier for general users to find
          data assets without needing advanced query syntax.
        </li>
      </ul>

      <h5 className="mb-3 mt-5">What Happens If You Use the Wrong Syntax?</h5>
      <ul className="regular">
        <li>
          If your query is incorrectly formatted, Elasticsearch may return an
          error or unexpected results.
        </li>
        <li>
          Autocomplete suggestions aim to guide you toward valid queries, but
          it's still important to check your syntax before running a search.
        </li>
        <li>
          If you're unsure how to structure your query, you can refer to our{" "}
          <strong>Elasticsearch Query Guide</strong> or disable Expert Mode for
          a simpler search experience.
        </li>
      </ul>

      <h5 className="mb-3 mt-5">When Should You Use Expert Mode?</h5>
      <ul className="regular">
        <li>
          If you are familiar with Elasticsearch query syntax and want more
          control over your search results.
        </li>
        <li>
          When performing advanced searches that require filtering,
          aggregations, or custom queries.
        </li>
        <li>
          If you need more precise and powerful search capabilities beyond
          simple asset name lookups.
        </li>
      </ul>
    </div>
  );
};
