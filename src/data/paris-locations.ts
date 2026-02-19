export interface IncidentLocation {
  incidentId: string;
  label: string;
  lat: number;
  lng: number;
  phase: "турист" | "бродяга" | "психоз";
}

export const parisLocations: IncidentLocation[] = [
  {
    incidentId: "inc-01",
    label: "Фаза адаптации",
    lat: 48.8606,
    lng: 2.3376,
    phase: "турист"
  },
  {
    incidentId: "inc-02",
    label: "Избиение",
    lat: 48.8830,
    lng: 2.3450,
    phase: "бродяга"
  },
  {
    incidentId: "inc-03",
    label: "Публичное нападение",
    lat: 48.8710,
    lng: 2.3580,
    phase: "бродяга"
  },
  {
    incidentId: "inc-04",
    label: "Ножевой эпизод",
    lat: 48.8650,
    lng: 2.3200,
    phase: "психоз"
  },
  {
    incidentId: "inc-05",
    label: "Проникновение в квартиру",
    lat: 48.8580,
    lng: 2.2950,
    phase: "психоз"
  },
  {
    incidentId: "inc-06",
    label: "Дом пожилой пары",
    lat: 48.8450,
    lng: 2.2300,
    phase: "психоз"
  },
  {
    incidentId: "inc-07",
    label: "Атака у реки",
    lat: 48.8350,
    lng: 2.1900,
    phase: "психоз"
  },
  {
    incidentId: "inc-08",
    label: "Серия поджогов",
    lat: 48.8200,
    lng: 2.1500,
    phase: "психоз"
  },
  {
    incidentId: "inc-09",
    label: "Домашнее вторжение",
    lat: 48.8050,
    lng: 2.1100,
    phase: "психоз"
  }
];
