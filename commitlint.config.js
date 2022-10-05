module.exports = {
    extends: ["@commitlint/config-conventional"],
    parserPreset: {
      parserOpts: {
        headerCorrespondence: ["type", "subject", "ticket"],
        headerPattern: /^(\w+):\s(.*)\s(PEN-[1-9]\d*)$/,
      },
    },
    rules: {
      "references-empty": [0, "never"],
    },
  };
  