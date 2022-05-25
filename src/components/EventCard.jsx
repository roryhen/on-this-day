import reactStringReplace from "react-string-replace";
import ExternalLinkIcon from "./ExternalLinkIcon";

function EventCard({ year, desc, terms }) {
  let newDesc = desc;
  const newTerms = [];
  terms.forEach(({ title, wikipedia }) => {
    let regexp = new RegExp(`(${title}s?)`, "gi");
    newDesc = reactStringReplace(newDesc, regexp, (match, i) => (
      <a href={wikipedia} className="text-blue-700">
        {match}
      </a>
    ));
    if (!regexp.test(desc)) {
      newTerms.push({ title, wikipedia });
    }
  });

  return (
    <article className="px-8 py-10 -mt-0.5 border-b-2 last:border-b-0 border-stone-200 animate-fade-in">
      <h2 className="text-2xl font-bold">Year {year}</h2>
      <p className="mt-3 mb-1">{newDesc}</p>
      <ul>
        {newTerms.map(({ title, wikipedia }, i) => (
          <li key={i} className="text-base first:mt-5">
            <a href={wikipedia} className="text-blue-700">
              {title} <ExternalLinkIcon />
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default EventCard;
