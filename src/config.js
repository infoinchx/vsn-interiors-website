export const business = {
  name: "VSN Interiors",
  email: "vsninterior55686@gmail.com",
  phone: "+919703955686",
  phoneDisplay: "+91 97039 55686",
  whatsapp: "919703955686",
  address:
    "PJR Residency, Ayya Koneru, Dasannapeta, beside Gayathri Hospital, Vizianagaram, Andhra Pradesh 535002",
  addressLines: [
    "PJR Residency, Ayya Koneru",
    "Dasannapeta, beside Gayathri Hospital",
    "Vizianagaram, Andhra Pradesh 535002",
  ],
  maps: "https://maps.app.goo.gl/wkB9M8cWYB8uzYCL8",
  instagram: "https://www.instagram.com/v_s_n_interiors/",
  facebook: "https://www.facebook.com/share/1De4CWwbMb/",
  areas: ["Andhra Pradesh", "Telangana", "Odisha"],
  founder: {
    name: "Mahesh K",
    role: "Founder",
    image: "brand/founder-mahesh.webp",
  },
  coFounder: { name: "", role: "Co-founder", image: "" },
  inquiryEndpoint: "",
};
export const whatsappUrl =
  "https://wa.me/" +
  business.whatsapp +
  "?text=" +
  encodeURIComponent(
    "Hello VSN Interiors, I would like to discuss an interior design project.",
  );
