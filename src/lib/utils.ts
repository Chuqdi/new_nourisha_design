import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomToken(length = 10) {
  const generateRandomCharacter = () => Math.random().toString(36)[2];

  return Array.from({ length }, generateRandomCharacter).join("");
}

export const cities = {
  England: [
    "Bath",
    "Birmingham",
    "Bradford",
    "Brighton and Hove",
    "Bristol",
    "Cambridge",
    "Canterbury",
    "Carlisle",
    "Chelmsford",
    "Chester",
    "Chichester",
    "Coventry",
    "Derby",
    "Durham",
    "Ely",
    "Exeter",
    "Gloucester",
    "Hereford",
    "Kingston upon Hull (Hull)",
    "Lancaster",
    "Leeds",
    "Leicester",
    "Lichfield",
    "Lincoln",
    "Liverpool",
    "London",
    "Manchester",
    "Newcastle upon Tyne",
    "Norwich",
    "Nottingham",
    "Oxford",
    "Peterborough",
    "Plymouth",
    "Portsmouth",
    "Preston",
    "Ripon",
    "Salford",
    "Salisbury",
    "Sheffield",
    "Southampton",
    "Southend-on-Sea",
    "St Albans",
    "Stoke-on-Trent",
    "Sunderland",
    "Truro",
    "Wakefield",
    "Wells",
    "Westminster",
    "Winchester",
    "Wolverhampton",
    "Worcester",
    "York",
  ],
  Scotland: [
    "Aberdeen",
    "Dundee",
    "Edinburgh",
    "Glasgow",
    "Inverness",
    "Perth",
    "Stirling",
  ],
  Wales: [
    "Bangor",
    "Cardiff",
    "Newport",
    "St Asaph",
    "St Davids",
    "Swansea",
    "Wrexham",
  ],
  "Northern Ireland": [
    "Armagh",
    "Belfast",
    "Derry (Londonderry)",
    "Lisburn",
    "Newry",
  ],
};
