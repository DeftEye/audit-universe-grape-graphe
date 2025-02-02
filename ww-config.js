export default {
  editor: {
    label: {
      en: "My Element",
    },
  },
  properties: {
    graphName: {
      label: {
        en: "Graph name (should be instantiated)",
      },
      type: "Text",
      required: true,
      bindable: true,
    },
    data: {
      label: {
        en: "Data",
      },
      type: "Array",
      options: {
        item: {
          type: "Object",
          label: {
            en: "item",
          },
          options: {
            text: {
              type: "Text",
              label: {
                en: "text",
              },
            },
            value: {
              type: "Number",
              label: {
                en: "value",
              },
            },
            score: {
              type: "Number",
              label: {
                en: "score",
              },
            },
            tooltip: {
              type: "Number",
              label: {
                en: "tooltip",
              },
            },
          },
        },
      },
      defaultValue: [],
      bindable: true,
    },
    isScoreGraph: {
      label: {
        en: "Use score for graph hierarchies",
      },
      type: "OnOff",
      defaultValue: false,
      bindable: true,
    },
    highScoreColor: {
      label: {
        en: "Color of the bubble with the highest score",
      },
      type: "Color",
      options: {
        defaultValue: "#4CAF50",
      },
      bindable: true,
    },
    mediumScoreColor: {
      label: {
        en: "Color of the bubble with the medium score",
      },
      type: "Color",
      options: {
        defaultValue: "#FFD700",
      },
      bindable: true,
    },
    lowScoreColor: {
      label: {
        en: "Color of the bubble with the lowest score",
      },
      type: "Color",
      options: {
        defaultValue: "#FF6347",
      },
      bindable: true,
    },
    textColor: {
      label: {
        en: "Color of the text of the bubble",
      },
      type: "Color",
      options: {
        defaultValue: "#000000",
      },
      bindable: true,
    },
    useLogarithmicScale: {
      label: {
        en: "Display value on logarithmic scale",
      },
      type: "OnOff",
      defaultValue: false,
      bindable: true,
    },
    LogarithmicFactor: {
      label: {
        en: "Logarithmic factor",
      },
      type: "Number",
      options: {
        min: 0,
        max: 1,
        step: 0.1,
        defaultValue: 0.5,
      },
      bindable: true,
    },
    minRadius: {
      label: {
        en: "Minimum bubble radius",
      },
      type: "Number",
      options: {
        min: 5,
        max: 100,
        step: 5,
        defaultValue: 0,
      },
      bindable: true,
    },
  },
};
