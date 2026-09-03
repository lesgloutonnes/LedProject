/**
 * Calendrier hémisphère nord (FR / BE) — Les Gloutonnes
 * Photopériodes de tente sous Cosmorrow, pas un calendrier de jardin de pleine terre.
 */
window.LG_CALENDAR = {
  hemisphere: "north",
  region: "FR/BE",
  note: "Les tropicales ignorent ce rythme : 12–14 h toute l’année, tente à part. Les dates bougent d’un mois selon que ta pièce est déjà froide en octobre.",
  months: [
    {
      id: 1,
      name: "Janvier",
      photoperiod: "Dormantes : 8–10 h. Tropicales : 12–14 h.",
      gestures: [
        "Contrôle hebdomadaire des pots en dormance : poids, pourriture, jamais de bac d’eau.",
        "Cosmorrow loin (30–50 cm) ou simple COP2065 sur les hibernacles.",
        "Commander graines de l’année et sphaigne ; préparer les lots à stratifier si ce n’est pas fait.",
        "Zéro foliar, zéro rempotage de tempérée (sauf urgence pourriture).",
        "Tropicales : rythme normal, foliar Maxsea ¼ si c’est leur créneau mensuel.",
      ],
      notes: "Les pièges noirs de dionée sont en poste, pas à la poubelle. Un garage à 5–10 °C + 9 h de Growing vaut mieux qu’un salon à 20 °C.",
    },
    {
      id: 2,
      name: "Février",
      photoperiod: "Dormantes : encore 8–10 h en début de mois, palier 10–12 h en toute fin si les bourgeons bougent. Tropicales : 12–14 h.",
      gestures: [
        "Semis d’hiver : sortir les graines stratifiées depuis décembre–janvier, semer en surface, 14 h, 15–20 cm, 150–250 µmol.",
        "Nettoyer les restes d’urnes vraiment mortes sans blesser le rhizome.",
        "Vérifier le stock d’eau RO / le TDS des cartouches ZeroWater.",
        "Planifier les rempotages de mars : pots, tourbe, perlite rincée.",
      ],
      notes: "Germoir et chambre froide cohabitent mal dans 1 m³ : germoir à 20 °C, dormantes ailleurs.",
    },
    {
      id: 3,
      name: "Mars",
      photoperiod: "Débourrement : 12 h puis 14 h sur 2–3 semaines. Tropicales : 13–14 h.",
      gestures: [
        "Rempotage des tempérées au débourrement (Sarracenia, Dionaea, Drosera).",
        "Division de rhizomes, boutures de tige Nepenthes (printemps = bon taux).",
        "Bac d’eau qui revient progressivement pour les tourbières.",
        "Premier foliar seulement après 3–4 semaines de vraie pousse, Maxsea ¼.",
        "Gemmae de pygmées : surveiller, semer en surface si le cycle le dit.",
      ],
      notes: "Les premiers pièges / urnes sont petits : normal. On ne « rattrape » pas à 16 h et 10 cm de barre dès J+1.",
    },
    {
      id: 4,
      name: "Avril",
      photoperiod: "14 h pour tout ce qui est en croissance. Tropicales : 13–14 h.",
      gestures: [
        "Installer / réhausser les COP4065 à 15–25 cm des têtes.",
        "Leaf pullings Dionaea / Drosera / Pinguicula mexicaine : fenêtre idéale.",
        "Éclaircir les semis de février, premier repiquage si 4–6 feuilles.",
        "Sortir éventuellement Sarracenia outdoor si tu as un bac, mais la tente tient toute seule.",
        "Sciarides : la chaleur revient, pièges jaunes, surface qui ressuye.",
      ],
      notes: "Colorisation : on photographie les clones maintenant, avant de pousser le DLI en mai–juin.",
    },
    {
      id: 5,
      name: "Mai",
      photoperiod: "14 h (16 h possible sur un étage colorisation, 2 semaines d’essai).",
      gestures: [
        "Production : foliar 1–2×/mois, proies 1–2×/mois.",
        "Tente mixte : vérifier que l’étage bas (Nepenthes) n’a pas trop chaud sous la tablette.",
        "Heliamphora / highland : nuits encore fraîches, en profiter avant l’été.",
        "Rempoter les Nepenthes dont la sphaigne s’est affaissée pendant l’hiver de salon.",
      ],
      notes: "Orages = bonne pluie à collecter. Premier jet écarté, TDS mesuré.",
    },
    {
      id: 6,
      name: "Juin",
      photoperiod: "14 h. Été : attention à la T° de tente, pas aux heures.",
      gestures: [
        "Extracteur : priorité. Cosmorrow chauffe peu, la tente fermée au soleil chauffe beaucoup.",
        "Cephalotus et highland : ombre et air, ne pas les coller au plafond 30 °C.",
        "Colorisation dressées : DLI haut, nuits les plus fraîches que tu peux.",
        "Couper les hampes de capensis si tu ne veux pas d’invasion.",
      ],
      notes: "Un thermomètre min/max vaut plus qu’une barre FS achetée « pour l’été ».",
    },
    {
      id: 7,
      name: "Juillet",
      photoperiod: "13–14 h. On ne monte pas à 18 h pour compenser la chaleur.",
      gestures: [
        "Arrosage : bacs qui évaporent, on surveille le TDS si l’eau stagne.",
        "Drosophyllum / pygmées : plus sec, jamais de lac.",
        "Boutures Nepenthes lowland : bon mois (chaleur), highland : seulement si tu as le drop nocturne.",
        "Pause rempotage des tempérées (stress de chaleur) sauf urgence.",
      ],
      notes: "Canicule : ouvrir la tente, extraire, plutôt que d’ajouter une barre. Les plantules grillent avant les adultes.",
    },
    {
      id: 8,
      name: "Août",
      photoperiod: "14 h encore, mais on arrête de pousser la colorisation à outrance.",
      gestures: [
        "Dernier foliar généreux des tempérées en fin de mois, puis on ralentit.",
        "Contrôle des alims 24 V et des connecteurs IP65 (condensation d’été).",
        "Commander pots / tourbe pour les rempotages de mars prochain — pas en urgence de février.",
        "Utricularia subulata : arracher si elle a colonisé les semis.",
      ],
      notes: "Les urnes de Sarracenia sont à leur pic. On photographie, on ne rempote pas « pour plus bel Instagram ».",
    },
    {
      id: 9,
      name: "Septembre",
      photoperiod: "14 h → 12 h sur les tempérées en 2–3 semaines. Tropicales : on ne touche à rien (13–14 h).",
      gestures: [
        "Stop foliar des dormantes à venir.",
        "Séparer visuellement tropicales et tempérées : deux tentes, ou tropicales qui restent, tempérées qui iront au frais.",
        "Nettoyer, jeter les mixes collés d’algues, rincer les bacs.",
        "Graines de Sarracenia / Dionaea : récolter mûres, lancer la strat au frigo.",
      ],
      notes: "C’est le mois où l’on décide la dormance. Reporter à novembre dans le salon chaud, c’est déjà trop tard pour un bon palier.",
    },
    {
      id: 10,
      name: "Octobre",
      photoperiod: "Tempérées : 10–12 h puis 8–10 h. Tropicales : 12–14 h.",
      gestures: [
        "Rampe de dormance : T° vers 10–15 °C, barre relevée, bac retiré.",
        "Sortir les dionées / sarracènes / drosera tempérées de la tente mixte chaude.",
        "Dernières divisions seulement si la plante est encore en pousse (souvent trop tard : reporter à mars).",
        "Calibrer le germoir d’hiver (strat en cours) : 14 h, 20 °C, ailleurs que la chambre froide.",
      ],
      notes: "Mois charnière FR/BE. Un garage hors gel + Cosmorrow 9 h = protocole dormance. Un radiateur + 14 h = faux été.",
    },
    {
      id: 11,
      name: "Novembre",
      photoperiod: "Dormantes : 8–10 h. Tropicales : 12–14 h.",
      gestures: [
        "Dormance installée : 5–10 °C, mix juste humide, contrôle pourriture.",
        "Tente tropicale : on assume chauffage d’appoint doux si la pièce tombe à 12 °C (lowland).",
        "Highland / Heliamphora : les nuits froides de novembre sont un cadeau.",
        "Inventaire LED : poussière sur les COP, câbles, programmateur.",
      ],
      notes: "Ne pas « réveiller » une dionée parce qu’elle est triste sur la photo. Elle dort.",
    },
    {
      id: 12,
      name: "Décembre",
      photoperiod: "Dormantes : 8–10 h. Tropicales : 12–14 h. Germoir de strat : 14 h s’il est déjà semé.",
      gestures: [
        "Cadeaux de plantes : acclimater (sac, HR, lumière douce), ne pas les coller sous 300 µmol le soir de Noël.",
        "Recharger l’eau distillée / vérifier l’osmoseur avant les soldes d’eau calcaire de janvier.",
        "Relire les étiquettes de strat au frigo (dates).",
        "Rien d’heroïque : on maintient, on ne lance pas un étage colorisation.",
      ],
      notes: "Photopériode naturelle ~8 h en FR/BE : la tente dormante est alignée. La tente tropicale, elle, ignore le solstice.",
    },
  ],
};
