interface TextColor {
  label: string;
  value: string;
  description: string;
}

export const textColors: Record<string, TextColor> = {
  colorText: {
    label: "color-text",
    value: "rgb(18, 28, 45)",
    description: "Body text color",
  },
  colorTextBrandHighlight: {
    label: "color-text-brand-highlight",
    value: "rgb(242, 47, 70)",
    description: "Twilio brand red, accessible on large text only.",
  },
  colorTextBrandInverse: {
    label: "color-text-brand-inverse",
    value: "rgb(255, 255, 255)",
    description: "Text color used on any brand color",
  },
  colorTextDecorative10: {
    label: "color-text-decorative-10",
    value: "rgb(96, 107, 133)",
    description:
      "Text color with no semantic meaning, used for decorative purposes only. Should generally be used with matching decorative background and/or border tokens.",
  },
  colorTextDecorative20: {
    label: "color-text-decorative-20",
    value: "rgb(0, 20, 137)",
    description:
      "Text color with no semantic meaning, used for decorative purposes only. Should generally be used with matching decorative background and/or border tokens.",
  },
  colorTextDecorative30: {
    label: "color-text-decorative-30",
    value: "rgb(14, 124, 58)",
    description:
      "Text color with no semantic meaning, used for decorative purposes only. Should generally be used with matching decorative background and/or border tokens.",
  },
  colorTextDecorative40: {
    label: "color-text-decorative-40",
    value: "rgb(109, 46, 209)",
    description: "Text color with no semantic meaning, used for decorative purposes only. Should generally be used with matching decorative background and/or border tokens.",
  },
  colorTextError: {
    label: "color-text-error",
    value: "rgb(214, 31, 31)",
    description: "Error text for inputs and error misc",
  },
  colorTextErrorStrong: {
    label: "color-text-error-strong",
    value: "rgb(173, 17, 17)",
    description: "Strong error text for inputs and error misc",
  },
  colorTextErrorWeak: {
    label: "color-text-error-weak",
    value: "rgb(235, 86, 86)",
    description: "Weak error text for inputs and error misc",
  },
  colorTextIcon: {
    label: "color-text-icon",
    value: "rgb(96, 107, 133)",
    description: "Default icon color.",
  },
  colorTextIconAvailable: {
    label: "color-text-icon-available",
    value: "rgb(14, 124, 58)",
    description: "Icon color for indicating a available status",
  },
  colorTextIconBrandHighlight: {
    label: "color-text-icon-brand-highlight",
    value: "rgb(242, 47, 70)",
    description: "Twilio brand red icon color used for the Twilio logo.",
  },
  colorTextIconBrandInverse: {
    label: "color-text-icon-brand-inverse",
    value: "rgb(255, 255, 255)",
    description: "Twilio brand icon color used for the Twilio logo on inverse backgrounds.",
  },
  colorTextIconBusy: {
    label: "color-text-icon-busy",
    value: "rgb(227, 106, 25)",
    description: "Icon color for indicating a busy status",
  },
  colorTextIconError: {
    label: "color-text-icon-busy",
    value: "rgb(242, 47, 70)",
    description: "Twilio brand red, accessible on large text only.",
  },
  colorTextIconInverse: {
    label: "color-text-brand-highlight",
    value: "rgb(242, 47, 70)",
    description: "Twilio brand red, accessible on large text only.",
  },
  colorTextIconNeutral: {
    label: "color-text-brand-highlight",
    value: "rgb(242, 47, 70)",
    description: "Twilio brand red, accessible on large text only.",
  },
  colorTextIconOffline: {
    label: "color-text-brand-highlight",
    value: "rgb(242, 47, 70)",
    description: "Twilio brand red, accessible on large text only.",
  },
  colorTextIconSuccess: {
    label: "color-text-brand-highlight",
    value: "rgb(242, 47, 70)",
    description: "Twilio brand red, accessible on large text only.",
  },
};
