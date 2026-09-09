export const THEMES = {
  light: {
    bg: "#FFFFFF",
    sidebarBg: "#F7F7F5",
    surface: "#FFFFFF",
    ink: "#1C1E1B",
    inkSoft: "#6E7268",
    inkFaint: "#A3A79C",
    border: "#E4E5DF",
    accent: "#1E6F5C",
    accentSoft: "#E3EFEA",
    danger: "#B3453D",
    dangerSoft: "#F6E8E6",
    hoverBg: "#F1F2EE",
    overlay: "rgba(28,30,27,0.42)",
    shadow: "0 10px 30px rgba(20,22,18,0.14)",
  },
  dark: {
    bg: "#131513",
    sidebarBg: "#0E100E",
    surface: "#131513",
    ink: "#ECEEEA",
    inkSoft: "#95998F",
    inkFaint: "#5C605A",
    border: "#25281F",
    accent: "#52C29E",
    accentSoft: "rgba(82,194,158,0.14)",
    danger: "#E28A82",
    dangerSoft: "rgba(179,69,61,0.18)",
    hoverBg: "#1B1D19",
    overlay: "rgba(0,0,0,0.6)",
    shadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
};

export const STATUS_COLOR = {
  light: { scheduled: "#3D6FA8", completed: "#3F7D58", cancelled: "#B3453D" },
  dark: { scheduled: "#7FADE0", completed: "#7FCB98", cancelled: "#E28A82" },
};

export const STATUS_LABEL = {
  scheduled: "Scheduled",
  completed: "Completed",
  cancelled: "Cancelled",
};
