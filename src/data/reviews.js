export const reviewSource = {
  url: "https://maps.app.goo.gl/wkB9M8cWYB8uzYCL8",
  checked: "23 September 2026",
  rating: "5.0",
  count: 61,
};
export const reviews = [
  [
    "Srinu Nadipalli",
    "Careful workmanship, with helpful guidance on maintenance and styling.",
  ],
  [
    "Saraswati Nadipalli",
    "A smooth home-design experience with thoughtful finishing details.",
  ],
  [
    "Adinarayana Kenguva",
    "Coordinated design, services, finishes and carpentry for the project.",
  ],
  ["Ayyappa Laxman", "Impressed by how the finished home matched the design."],
  [
    "Harsha Avinash",
    "Appreciated the team’s dedicated, meticulous approach to home interiors.",
  ],
  [
    "Jyoti Pochiraju",
    "A new home made welcoming through considered decorating.",
  ],
  [
    "M Laya Yadav Muchu",
    "Renovation gave the home a completely refreshed appearance.",
  ],
  [
    "Pavan Kumar",
    "Satisfied with jewellery-showroom workmanship and a reasonable quotation.",
  ],
  [
    "Shanmukh Sai Majji",
    "A striking transformation with attentive, professional service throughout.",
  ],
  [
    "Pativada Chinna",
    "Happy with the ideas and finished jewellery-showroom design.",
  ],
  [
    "Narayanamurty majji",
    "Thoughtful choices from consultation through the final details.",
  ],
  ["Kandula Murthy", "Praised the designer’s experience and practical skill."],
  [
    "Kalkinadh Gudla",
    "Creative design ideas and responsive communication throughout.",
  ],
  [
    "Kiranmai Sai",
    "A carefully detailed transformation and a professional experience.",
  ],
  [
    "Mallika Gampa",
    "Good-quality design work completed within the expected time.",
  ],
].map(([name, summary], i) => ({
  id: i + 1,
  name,
  summary,
  rating: 5,
  source: reviewSource.url,
}));
