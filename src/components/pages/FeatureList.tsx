interface FeatureListProps {
  /** The section's heading, already localised. */
  title: string;
  /** The heading's id, so the section can name itself by it (aria-labelledby). */
  headingId: string;
  /** The project's key features, already localised; one sentence each. */
  features: readonly string[];
}

/**
 * A project's key features (owner's choice): the heading at the left, held while the list passes
 * (CSS position: sticky, no script), and the features at the right as a numbered list parted by
 * hairlines. A Server Component: nothing here needs the browser. Under 1024px the two stack.
 * An empty list renders nothing (the page also leaves the section out).
 */
export function FeatureList({ title, headingId, features }: FeatureListProps) {
  if (features.length === 0) return null;

  return (
    <div className="pd-feat">
      <h2 id={headingId} className="pd-feat__title">
        {title}
      </h2>
      {/* a real ordered list: assistive tech announces the count and each item's place */}
      <ol className="pd-feat__list">
        {features.map((feature, i) => (
          // the list is static content in a fixed order, so the index is a stable key
          <li key={i} className="pd-feat__item">
            <span className="pd-feat__n" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="pd-feat__text">{feature}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
