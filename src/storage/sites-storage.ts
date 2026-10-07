import type site = require("./../models/entities/site")

const sitesStorage: site.Site[] = [
  {
    id: "6a5c8c6e-5d1a-4a8e-9a0d-3c0b6f9e1a01",
    name: "Северная ВЭС",
    code: "SITE-NW-01",
    region: "Мурманская область",
    location: { lat: 68.958, lon: 33.082 }
  },
  {
    id: "7b6d9d7f-6e2b-4b9f-8b1e-4d1c7a0f2b02",
    name: "Южная СЭС",
    code: "SITE-S-02",
    region: "Астраханская область",
    location: { lat: 46.349, lon: 48.035 }
  },
  {
    id: "8c7e0e80-7f3c-4c0a-9c2f-5e2d8b1a3c03",
    name: "Горная ГЭС",
    code: "SITE-M-03",
    region: "Республика Дагестан",
    location: { lat: 42.984, lon: 47.504 }
  },
  {
    id: "9d8f1f91-804d-4d1b-a030-6f3e9c2b4d04",
    name: "Центральная подстанция",
    code: "SITE-C-04",
    region: "Московская область",
    location: { lat: 55.751, lon: 37.618 }
  }
];

module.exports = sitesStorage