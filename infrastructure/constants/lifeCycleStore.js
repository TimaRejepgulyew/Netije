import documentType from "~/infrastructure/constants/documentType.js";
export default function(context) {
  return new Map([
    [
      documentType.IncomingLetter,
      [
        { id: 0, name: context.$t("lifeCycle.first") },
        { id: 1, name: context.$t("lifeCycle.second") },
        { id: 2, name: context.$t("lifeCycle.third") },
        { id: 3, name: context.$t("lifeCycle.forth") }
      ]
    ],
    [
      documentType.OutgoingLetter,
      [
        { id: 0, name: context.$t("lifeCycle.first1") },
        { id: 1, name: context.$t("lifeCycle.second1") },
        { id: 2, name: context.$t("lifeCycle.third1") },
        { id: 3, name: context.$t("lifeCycle.forth1") }
      ]
    ]
  ]);
}
