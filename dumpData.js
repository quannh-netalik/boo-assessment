const { MBTI, ZODIAC } = require("./constant");

const defaultProfiles = Object.freeze([
  {
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
  },
  {
    _id: "6603cf5af37977088f4b4d02",
    name: "B QuanNguyen",
    description: "Adolph Larrue Martinez IV.",
    mbti: MBTI.ESFJ,
    enneagram: "7w8",
    variant: "sp/so",
    tritype: 325,
    socionics: "SEE2",
    sloan: "RCOEN2",
    psyche: "FEVL2",
    temperaments: "TEMP2",
  },
  {
    _id: "6603d26f783bd6ebb767bab8",
    name: "C Chervez",
    description: "Adolph Larrue Martinez V.",
    mbti: MBTI.INFP,
    enneagram: "3w2",
    variant: "sp/so",
    tritype: 655,
    socionics: "SEE3",
    sloan: "RCOEN3",
    psyche: "FEVL3",
    temperaments: "TEMP3",
  },
]);

const defaultUsers = Object.freeze([
  { _id: "6603d3efcf18a1912ad8b1bb", name: "user1" },
  { _id: "6603d3efcf18a1912ad8b1bc", name: "user2" },
  { _id: "6603d3efcf18a1912ad8b1bd", name: "user3" },
]);

const defaultComments = Object.freeze([
  {
    content: "asdasdasdas",
    profileId: "507f191e810c19729de860ea",
    mbti: MBTI.ENTJ,
    enneagram: "3w4",
    zodiac: ZODIAC.Leo,
    userId: "6603d3efcf18a1912ad8b1bb",
  },
  {
    content: "asdasdas1231231 123123 12asdasd",
    profileId: "6603cf5af37977088f4b4d02",
    mbti: MBTI.ESTP,
    enneagram: "2w3",
    zodiac: ZODIAC.Aries,
    userId: "6603d3efcf18a1912ad8b1bc",
  },
  {
    content: "opoipo 123 1po231opi 1op13op1",
    profileId: "6603d26f783bd6ebb767bab8",
    mbti: MBTI.ISTJ,
    enneagram: "8w9",
    zodiac: ZODIAC.Taurus,
    userId: "6603d3efcf18a1912ad8b1bd",
  },
]);

module.exports = {
  defaultProfiles,
  defaultUsers,
  defaultComments,
};
