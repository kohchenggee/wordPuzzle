export const TOPICS = [
  { name: "Cities", key: "city" },
  { name: "Foods", key: "food" },
  { name: "Animals", key: "animal" },
];

export const QUESTIONS = {
  city: [
    { ans: "SINGAPORE", qn: "Capital of Singapore" },
    { ans: "KUALA LUMPUR", qn: "Capital of Malaysia" },
    { ans: "JAKARTA", qn: "Capital of Indonesia" },
    { ans: "BANGKOK", qn: "Capital of Thailand" },
    { ans: "HANOI", qn: "Capital of Vietnam" },
    { ans: "MANILA", qn: "Capital of The Phillipines" },
  ],
  food: [
    { ans: "SATAY", img: require("./assets/satay.jpg") },
    { ans: "MOHINGA", img: require("./assets/mohinga.jpg") },
    { ans: "NASI LEMAK", img: require("./assets/nasi_lemak.jpg") },
    { ans: "TOM YUM", img: require("./assets/tom_yum.jpg") },
  ],
  animal: [
    { ans: "LION", img: require("./assets/lion.jpg") },
    { ans: "RHINOCEROS", img: require("./assets/rhinocerus.jpg") },
    { ans: "ORANGUTAN", img: require("./assets/orangutan.jpg") },
    { ans: "GAZELLE", img: require("./assets/gazelle.jpg") },
  ],
};
