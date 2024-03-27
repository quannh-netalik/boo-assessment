const MBTI = Object.freeze({
  ENTJ: "ENTJ",
  ENFJ: "ENFJ",
  ESFJ: "ESFJ",
  ESTJ: "ESTJ",
  ENTP: "ENTP",
  ENFP: "ENFP",
  ESFP: "ESFP",
  ESTP: "ESTP",
  INTJ: "INTJ",
  INFJ: "INFJ",
  ISFJ: "ISFJ",
  ISTJ: "ISTJ",
  INTP: "INTP",
  INFP: "INFP",
  ISFP: "ISFP",
  ISTP: "ISTP",
});

const MBTIValues = [
  MBTI.ENTJ,
  MBTI.ENFJ,
  MBTI.ESFJ,
  MBTI.ESTJ,
  MBTI.ENTP,
  MBTI.ENFP,
  MBTI.ESFP,
  MBTI.ESTP,
  MBTI.INTJ,
  MBTI.INFJ,
  MBTI.ISFJ,
  MBTI.ISTJ,
  MBTI.INTP,
  MBTI.INFP,
  MBTI.ISFP,
  MBTI.ISTP,
];

const ENNEAGRAM = [
  "1w2",
  "2w3",
  "3w2",
  "3w4",
  "4w3",
  "4w5",
  "5w4",
  "5w6",
  "6w5",
  "6w7",
  "7w6",
  "7w8",
  "8w7",
  "8w9",
  "9w8",
  "9w1",
  "9w3",
];

const ZODIAC = Object.freeze({
  Aries: "Aries",
  Taurus: "Taurus",
  Gemini: "Gemini",
  Cancer: "Cancer",
  Leo: "Leo",
  Virgo: "Virgo",
  Libra: "Libra",
  Scorpio: "Scorpio",
  Sagittarius: "Sagittarius",
  Capricorn: "Capricorn",
  Aquarius: "Aquarius",
  Pisces: "Pisces",
});

const defaultProfile = Object.freeze({
  _id: "507f191e810c19729de860ea",
  name: "A Martinez",
  description: "Adolph Larrue Martinez III.",
  mbti: MBTI.ISFJ,
  enneagram: "9w3",
  variant: "sp/so",
  tritype: 725,
  socionics: "SEE",
  sloan: "RCOEN",
  psyche: "FEVL",
  temperaments: "TEMP",
});

module.exports = {
  MBTI,
  MBTIValues,
  ENNEAGRAM,
  ZODIAC,
  defaultProfile,
};