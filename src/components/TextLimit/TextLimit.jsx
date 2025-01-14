export function TextLimit({ text, limit }) {
  const textLimited =
    typeof text === "string" && text?.length > limit
      ? `${text.substring(0, limit)}...`
      : text || "";

  return <p>{textLimited}</p>;
}
