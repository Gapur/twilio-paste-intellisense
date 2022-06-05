import pasteTokens from ".";

export const pasteTokenAttributes: Record<string, keyof typeof pasteTokens> = {
  margin: "spacings",
  marginTop: "spacings",
  marginRight: "spacings",
  marginBottom: "spacings",
  marginLeft: "spacings",
  marginX: "spacings",
  marginY: "spacings",
  padding: "spacings",
  paddingTop: "spacings",
  paddingRight: "spacings",
  paddingBottom: "spacings",
  paddingLeft: "spacings",
  paddingX: "spacings",
  paddingY: "spacings",
  borderRadius: "radii",
  borderTopLeftRadius: "radii",
  borderTopRightRadius: "radii",
  borderBottomRightRadius: "radii",
  borderBottomLeftRadius: "radii",
};
