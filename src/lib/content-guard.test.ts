import {
  findUnsupportedContent,
  unsupportedPhrases,
} from "./content-guard";

describe("unsupported public-content guard", () => {
  it("finds every canonical unsupported phrase case-insensitively", () => {
    for (const phrase of unsupportedPhrases) {
      expect(findUnsupportedContent(`Prefix ${phrase.toUpperCase()} suffix`)).toContain(
        phrase,
      );
    }
  });

  it("finds visible bracketed placeholders", () => {
    expect(findUnsupportedContent("Call [PHONE NUMBER] today")).toContain(
      "[PHONE NUMBER]",
    );
  });

  it("matches single words as words and not inside safe words", () => {
    expect(findUnsupportedContent("Our business serves Harrison.")).not.toContain(
      "best",
    );
    expect(findUnsupportedContent("We are the best choice.")).toContain("best");
  });

  it("accepts approved call-availability wording", () => {
    expect(findUnsupportedContent("Open 24 hours for calls")).toEqual([]);
  });
});
