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
    lat: 48.8780,
    lng: 2.3100,
    phase: "бродяга"
  },
  {
    incidentId: "inc-03",
    label: "Публичное нападение",
    lat: 48.8660,
    lng: 2.2700,
    phase: "бродяга"
  },
  {
    incidentId: "inc-04",
    label: "Ножевой эпизод",
    lat: 48.8580,
    lng: 2.2200,
    phase: "психоз"
  },
  {
    incidentId: "inc-05",
    label: "Проникновение в квартиру",
    lat: 48.8500,
    lng: 2.1600,
    phase: "психоз"
  },
  {
    incidentId: "inc-06",
    label: "Дом пожилой пары",
    lat: 48.8400,
    lng: 2.0800,
    phase: "психоз"
  },
  {
    incidentId: "inc-07",
    label: "Атака у реки",
    lat: 48.8300,
    lng: 1.9800,
    phase: "психоз"
  },
  {
    incidentId: "inc-08",
    label: "Серия поджогов",
    lat: 48.8150,
    lng: 1.8700,
    phase: "психоз"
  },
  {
    incidentId: "inc-09",
    label: "Домашнее вторжение",
    lat: 48.8000,
    lng: 1.7500,
    phase: "психоз"
  }
];
