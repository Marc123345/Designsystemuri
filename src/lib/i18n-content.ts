import type { Locale } from "@/i18n/routing";
import { products as productsEN, type Product } from "./products";
import { applications as applicationsEN, type Application } from "./applications";

/* =========================================================================
   Locale-aware content with EN fallback-merge.
   EN (lib/products.ts, lib/applications.ts) is the source of truth. Per-locale
   override tables below supply machine-translated strings (reviewed later);
   any field not present in an override falls back to the EN value, so partial
   translations render cleanly. The visible layer (names, card descriptions,
   nav/footer chrome, home hero, CTAs) is translated first; long-form body
   prose currently falls back to EN and is filled in a later batch.
   ========================================================================= */

type Overrides<T> = Partial<Record<Locale, Record<string, Partial<T>>>>;

const mergeBySlug = <T extends { slug: string }>(
  base: T[],
  overrides: Overrides<T>,
  locale: Locale,
): T[] => {
  const table = overrides[locale];
  if (!table) return base;
  return base.map((item) => (table[item.slug] ? { ...item, ...table[item.slug] } : item));
};

/* ------------------------------- PRODUCTS -------------------------------- */
// Only the visible-layer fields are overridden per locale (name, cardDesc, cta,
// eyebrow). Deep prose fields fall back to EN.
const productOverrides: Overrides<Product> = {
  de: {
    "natural-grit-powder": { name: "Naturdiamant-Körnung & -Pulver", cardDesc: "Mesh-Körnung, Mikronpulver und Rotationsdiamanten. Im eigenen Werk gebrochen, sortiert und klassiert." },
    "metal-bond": { name: "Metallbindung-Diamant", cardDesc: "Säge- und Scheibenqualitäten für gesinterte und gelötete Werkzeuge, mit hauseigener Beschichtung." },
    "resin-bond": { name: "Kunstharzbindung-Diamant", cardDesc: "Splitternde, mehrkristalline Qualitäten für Feinschliff und Politur, mit hauseigener Beschichtung." },
    "cbn": { name: "CBN", cardDesc: "Das Superschleifmittel für gehärtete und eisenhaltige Stähle, plus PCBN für fertige Schneidformen." },
    "single-crystal": { name: "Einkristalldiamant (CVD & MCD)", cardDesc: "CVD-Einkristall und MCD, maßgefertigt für Präzisionswerkzeuge, Thermik, Optik und Hightech-Anwendungen." },
    "polycrystalline-diamond": { name: "Polykristalliner Diamant (CVD & PCD)", cardDesc: "PCD-Rohlinge für Schneideinsätze und CVD-Abrichtlogs zum Abrichten von Scheiben." },
    "tool-stones": { name: "Natürliche Werkzeugsteine", cardDesc: "Roher und geformter Naturdiamant für Einpunkt-Abrichten und Setzwerkzeuge." },
    "polycrystalline-powder": { name: "Polykristallines Diamantpulver", cardDesc: "Technische polykristalline Pulver für Präzisionspolitur, Läppen und Feinstbearbeitung." },
  },
  es: {
    "natural-grit-powder": { name: "Grano y polvo de diamante natural", cardDesc: "Grano de malla, polvo de micras y diamantes rotativos. Triturado, clasificado y graduado en fábrica propia." },
    "metal-bond": { name: "Diamante de enlace metálico", cardDesc: "Grados de sierra y muela para herramientas sinterizadas y soldadas, con recubrimiento propio." },
    "resin-bond": { name: "Diamante de enlace resinoso", cardDesc: "Grados friables y multicristalinos para rectificado fino y pulido, con recubrimiento propio." },
    "cbn": { name: "CBN", cardDesc: "El superabrasivo para aceros endurecidos y ferrosos, más PCBN para formas de corte acabadas." },
    "single-crystal": { name: "Diamante monocristalino (CVD y MCD)", cardDesc: "CVD monocristalino y MCD, hechos a medida para herramientas de precisión, térmicas, ópticas y avanzadas." },
    "polycrystalline-diamond": { name: "Diamante policristalino (CVD y PCD)", cardDesc: "Preformas de PCD para insertos de corte y barras CVD para diamantar muelas." },
    "tool-stones": { name: "Piedras naturales para herramientas", cardDesc: "Diamante natural en bruto y conformado para diamantado de un punto y herramientas montadas." },
    "polycrystalline-powder": { name: "Polvo de diamante policristalino", cardDesc: "Polvos policristalinos para pulido de precisión, lapeado y acabado de materiales avanzados." },
  },
  it: {
    "natural-grit-powder": { name: "Grana e polvere di diamante naturale", cardDesc: "Grana mesh, polvere micron e diamanti rotativi. Frantumato, selezionato e classificato in stabilimento proprio." },
    "metal-bond": { name: "Diamante a legante metallico", cardDesc: "Qualità da sega e da mola per utensili sinterizzati e brasati, con rivestimento interno." },
    "resin-bond": { name: "Diamante a legante resinoide", cardDesc: "Qualità friabili e multicristalline per rettifica fine e lucidatura, con rivestimento interno." },
    "cbn": { name: "CBN", cardDesc: "Il superabrasivo per acciai temprati e ferrosi, più PCBN per forme da taglio finite." },
    "single-crystal": { name: "Diamante monocristallino (CVD e MCD)", cardDesc: "CVD monocristallino e MCD, realizzati su specifica per utensili di precisione, termici, ottici e avanzati." },
    "polycrystalline-diamond": { name: "Diamante policristallino (CVD e PCD)", cardDesc: "Billette PCD per inserti da taglio e barrette CVD per la ravvivatura delle mole." },
    "tool-stones": { name: "Pietre naturali per utensili", cardDesc: "Diamante naturale grezzo e sagomato per ravvivatura monopunta e utensili montati." },
    "polycrystalline-powder": { name: "Polvere di diamante policristallino", cardDesc: "Polveri policristalline per lucidatura di precisione, lappatura e finitura di materiali avanzati." },
  },
  ja: {
    "natural-grit-powder": { name: "天然ダイヤモンドグリット＆パウダー", cardDesc: "メッシュグリット、ミクロンパウダー、ロータリーダイヤモンド。自社工場で破砕・選別・分級。" },
    "metal-bond": { name: "メタルボンドダイヤモンド", cardDesc: "焼結・ろう付け工具向けのソー／ホイールグレード。自社コーティング対応。" },
    "resin-bond": { name: "レジンボンドダイヤモンド", cardDesc: "精密研削・研磨向けのフライアブルな多結晶グレード。自社コーティング対応。" },
    "cbn": { name: "CBN", cardDesc: "焼入鋼・鉄系材料向けの超砥粒。仕上げ切削形態のPCBNも。" },
    "single-crystal": { name: "単結晶ダイヤモンド（CVD＆MCD）", cardDesc: "精密工具・熱・光学・先端用途向けに仕様対応するCVD単結晶とMCD。" },
    "polycrystalline-diamond": { name: "多結晶ダイヤモンド（CVD＆PCD）", cardDesc: "切削インサート向けPCDブランクと、砥石ツルーイング用CVDドレッシングログ。" },
    "tool-stones": { name: "天然ツールストーン", cardDesc: "単一点ドレッシング・セット工具向けの原石および成形天然ダイヤモンド。" },
    "polycrystalline-powder": { name: "多結晶ダイヤモンドパウダー", cardDesc: "精密研磨・ラッピング・先端材料仕上げ向けの多結晶パウダー。" },
  },
};

/* ----------------------------- APPLICATIONS ------------------------------ */
const applicationOverrides: Overrides<Application> = {
  de: {
    "dental": {
      name: "Dental", cardDesc: "Metallbindung und feine Pulver für gesinterte Bohrer, Rotationsinstrumente und Trennscheiben.",
      h1: "Diamant für Hersteller von Dentalwerkzeugen",
      metaDesc: "Metallbindung-Diamant und feine Pulver für Hersteller von Dentalbohrern, Rotationsinstrumenten und Trennscheiben. Konsistente, sinterfähige Qualitäten von einem Hersteller mit eigener QC.",
      intro: [
        "Diamant für Hersteller von Dentalwerkzeugen.",
        "EID liefert den Diamanten für Dentalbohrer, Rotationsinstrumente, Diamanttrennscheiben und Schleifwerkzeuge. Wir stellen keine Dentalwerkzeuge her, sondern beliefern deren Hersteller mit Metallbindung-Pulver, feinem Mikronpulver und beschichteten Schleifmitteln, die bei jeder Bestellung nach derselben Spezifikation klassiert und QC-geprüft werden.",
        "In einer Dentalinstrumenten-Fertigung muss das Material Charge für Charge identisch sintern und schneiden, denn ein Bohrer, der sich anders verhält als der letzte, fällt bei der Prüfung durch. Diese Chargenkonstanz ist der Grund, warum Dentalhersteller EID qualifizieren und bleiben.",
      ],
      outcome: {
        title: "Was konsistenter Diamant für eine Dentalfertigung bedeutet",
        body: "Ein gesinterter Bohrer ist nur so wiederholbar wie das Pulver, das hineingeht. Wenn Kristallfestigkeit, Größenverteilung und Beschichtungsgewicht zwischen den Chargen schwanken, driften die Sinterergebnisse, die Haltekraft ändert sich, und Bohrer, die identisch sein sollten, sind es nicht. Das zeigt sich als Ausschuss und Gewährleistungsrisiko in der nachgelagerten Kette. EID klassiert und QC-prüft jede Charge genau auf diese Variablen, sodass Ihr Sinterprozess bei jedem Lauf denselben Input erhält. Das Ergebnis: weniger Ausschuss, vorhersehbare Instrumentenlebensdauer und eine Diamantversorgung, die Sie einmal qualifizieren, statt jede Lieferung neu zu prüfen.",
      },
      why: {
        title: "Warum Dentalhersteller EID wählen",
        body: "Konsistenz, Breite und eine echte technische Antwort. Die eigene QC bei jeder Charge liefert die Chargenkonstanz, auf die eine Dentalfertigung angewiesen ist. Die hauseigene Beschichtung bedeutet, dass Sie für die Haltekraft keinen zweiten Lieferanten verwalten. Und wenn Sie eine Qualität für ein neues Instrument spezifizieren müssen, sprechen Sie mit jemandem, der mit dem Material arbeitet, nicht mit einem Katalog. ISO 9001 zertifiziert, mit einem Analysenzertifikat pro Charge.",
      },
    },
    "semiconductor-electronics": {
      name: "Halbleiter & moderne Elektronik", cardDesc: "Feine Mikron- und polykristalline Pulver für Dicing, Läppen und Wafer-Politur.",
      h1: "Diamant für Halbleiter & moderne Elektronik",
      metaDesc: "Feine und polykristalline Diamant-Mikronpulver für Wafer-Dicing, Läppen, Dünnen und Polieren in der Halbleiter- und Elektronikfertigung.",
      intro: [
        "Diamant für die Halbleiter- und Elektronikfertigung.",
        "Halbleiter- und Elektronikprozesse benötigen das feinste und konsistenteste verfügbare Diamantpulver, zum Dicing von Wafern, zum Läppen und Dünnen von Substraten und zum Polieren auf die Oberflächengüten, die die moderne Bauteilfertigung verlangt. EID liefert mono- und polykristalline Mikronpulver sowie MCD-Ritzwerkzeuge und feinen Naturdiamanten, jede Charge klassiert und QC-geprüft auf eine enge, wiederholbare Partikelgrößenverteilung.",
        "In dieser Arbeit ist die Toleranz unerbittlich, und ein einziges Ausreißerpartikel bedeutet einen verworfenen Wafer. Genau die Konsistenz am oberen Ende der Verteilung kontrolliert unsere QC.",
      ],
      outcome: {
        title: "Warum die Kontrolle der Größenverteilung über die Ausbeute entscheidet",
        body: "Auf Wafer-Ebene bemisst sich der Preis eines Defekts in Dies, nicht in Teilen. Ein übergroßes Partikel in einer Läpp- oder Polieraufschlämmung kann ein Substrat verkratzen und in einem einzigen Durchgang Hunderte von Bauelementen zerstören. Die Abwehr ist ein Pulver mit eng kontrolliertem D50 und schmaler Spanne, ohne verirrte Ausreißer, Charge für Charge. EID misst die Partikelgrößenverteilung bei jeder Charge und klassiert auf ein kontrolliertes D50 und eine kontrollierte Spanne, sodass das Pulver, das Sie qualifizieren, auch das Pulver ist, das Sie erhalten. Für einen Prozess, in dem ein einzelnes Partikel den Fehlermodus bestimmt, ist das die entscheidende Spezifikation.",
      },
      why: {
        title: "Warum Elektronikhersteller EID wählen",
        body: "Enge Verteilung, geringes Ausreißerrisiko und Dokumentation für Ihre Qualifizierungsakte. Jede Charge wird auf die Partikelgrößenverteilung mit kontrolliertem D50 und minimalen Ausreißern gemessen, ISO 9001 zertifiziert, mit einem Analysenzertifikat pro Charge. Wenn Ihre Prozessqualifizierung davon abhängt, dass der Input konstant bleibt, sind die eigene Klassierung und QC das, was Ihnen erlaubt, das Material festzuschreiben.",
      },
    },
    "automotive-aerospace": {
      name: "Automobil & Luftfahrt", cardDesc: "CBN und PCBN zum Schleifen und Hartdrehen von gehärtetem Stahl; PCD für Aluminium und Verbundwerkstoffe.",
      h1: "CBN & Diamant für Automobil & Luftfahrt",
      metaDesc: "CBN zum Schleifen von gehärtetem Stahl, PCBN zum Hartdrehen, PCD für Aluminium und Verbundwerkstoffe. Superschleifmittel für Werkzeughersteller in Automobil und Luftfahrt.",
      intro: [
        "Superschleifmittel für Werkzeughersteller in Automobil und Luftfahrt.",
        "Automobil- und Luftfahrtfertigung beruht auf präziser Bearbeitung harter Werkstoffe in großen Stückzahlen: gehärtete Stahlzahnräder und -wellen, Gussblöcke, Aluminiumstrukturen und Kohlefaserverbunde. Die Werkzeuge, die diese Teile schneiden und schleifen, laufen auf CBN und Diamant, und EID liefert das Material dahinter.",
        "CBN-Pulver für keramisch und kunstharzgebundene Schleifscheiben, PCBN-Rohlinge für Hartdreh-Einsätze, PCD-Rohlinge für die Aluminium- und Verbundbearbeitung sowie CVD-Abrichtlogs, um die Scheiben in Form zu halten. Ein Lieferant deckt die eisenhaltige und die nichteisenhaltige Seite derselben Fertigungslinie ab.",
      ],
      outcome: {
        title: "Warum Chargenkonstanz die Linie schützt",
        body: "Beim Schleifen in der Automobilindustrie wird der Ausstoß in Millionen Teilen pro Jahr gemessen, und die Schleiflinie ist auf das durchlaufende Material abgestimmt. Wenn eine CBN-Charge mit abweichender Kristallfestigkeit oder Größenverteilung ankommt, muss die Linie neu eingerichtet werden, und jede Stunde Stillstand ist verlorene Produktion. Dieselbe Logik gilt für PCBN- und PCD-Einsätze, die eine Hartdreh- oder Fräszelle versorgen. EID QC-prüft jede Charge auf die Variablen, die dieses Verhalten bestimmen, sodass das ankommende Material dem entspricht, das Sie qualifiziert haben. Für ein Werk, in dem Konstanz gleich Verfügbarkeit ist, ist das die Spezifikation, die sich selbst bezahlt macht.",
      },
      why: {
        title: "Warum Werkzeughersteller in Automobil und Luftfahrt EID wählen",
        body: "Konstanz bei Volumen, abgesichert durch QC bei jeder Charge. Eine CBN-Charge, die der letzten entspricht, hält eine Schleiflinie ohne Neueinrichtung am Laufen, und die eigene Klassierung und Prüfung sind der Weg, auf dem EID das liefert. Beide Seiten aus einer Hand, die eisenhaltigen Schleif- und die nichteisenhaltigen Schneidwerkstoffe, bedeuten außerdem weniger Lieferanten, die sich in einen Prozess einqualifizieren, der keine Überraschungen verträgt. ISO 9001 zertifiziert, mit einem Analysenzertifikat pro Charge.",
      },
    },
    "tool-and-die": {
      name: "Werkzeug- & Formenbau", cardDesc: "Einkristall, MCD sowie PCD/PCBN-Rohlinge für Schneid-, Abricht- und Präzisionswerkzeuge.",
      h1: "Diamant & CBN für den Werkzeug- & Formenbau",
      metaDesc: "Einkristall, MCD, PCD- und PCBN-Rohlinge sowie natürliche Werkzeugsteine für Hersteller von Schneid-, Einpunkt- und Abrichtwerkzeugen. Maßgefertigte Superschleifmittel.",
      intro: [
        "Diamant und CBN für den Werkzeug- und Formenbau.",
        "Hersteller von Schneid-, Einpunkt- und Abrichtwerkzeugen brauchen Superschleifmittel, die Werkzeug für Werkzeug eine definierte Schneide halten. EID liefert die Einkristall-, Monokristall- und Fertigrohling-Werkstoffe für Präzisionswerkzeuge: CVD-Einkristall nach Ihrer Orientierung gewachsen, HPHT-MCD für reproduzierbare Einpunkt-Schneiden, PCD- und PCBN-Rohlinge für Schneideinsätze und natürliche Werkzeugsteine zum Abrichten.",
        "Ob Sie einen einzelnen Kristall exakt nach Spezifikation oder eine wiederholbare Qualität über eine ganze Werkzeugserie benötigen, das Material kommt aus einer Hand, mit QC bei jeder Charge.",
      ],
      outcome: {
        title: "Reproduzierbare Schneiden oder ein Kristall nach exakter Spezifikation",
        body: "Werkzeug- und Formenbau zieht in zwei Richtungen. Manchmal ist Reproduzierbarkeit gefragt: dieselbe defektarme Schneide über Hunderte identischer Einpunkt- oder Schneidwerkzeuge, damit jedes Teil gleich vom Band läuft. Manchmal ist es Präzision nach einer einzigen Spezifikation: ein CVD-Kristall, der auf eine feste Orientierung für ein Optik- oder Uhrenwerkzeug gewachsen ist, bei dem eine Geometrie exakt stimmen muss. EID bedient beides. MCD liefert die reproduzierbare HPHT-Schneide im Produktionsmaßstab. CVD-Einkristall wird über unsere Wachstumspartnerschaft auf Ihre exakte Orientierung und Fläche gewachsen und dann im Haus veredelt und geprüft. Die richtige Antwort hängt von Ihrem Werkzeug ab, und genau dort beginnt das Gespräch mit unserem technischen Team.",
      },
      why: {
        title: "Warum Werkzeug- und Formenbauer EID wählen",
        body: "Maßfertigung plus ein vollständiges Materialprogramm aus einer Hand. Für die anspruchsvollen Präzisionsaufgaben wird CVD-Einkristall auf Ihre exakte Orientierung gewachsen und hier vor dem Versand geprüft. Für Serienwerkzeuge liefern MCD und Fertigrohlinge eine wiederholbare Qualität von Bestellung zu Bestellung. Und weil EID Einkristall, MCD, PCD, PCBN und Naturstein abdeckt, kann ein Lieferant das Material an das Werkzeug anpassen, statt Sie zu der einen Linie zu drängen, die er führt. ISO 9001 zertifiziert.",
      },
    },
    "grinding-cutting-sawing-drilling": {
      name: "Schleifen, Schneiden, Sägen & Bohren", cardDesc: "Naturkörnung, Metallbindung und CBN für Segmente, Scheiben und Bohrer.",
      h1: "Diamant & CBN für Schleifen, Schneiden, Sägen & Bohren",
      metaDesc: "Naturkörnung, Metallbindung, CBN und Kunstharzbindung-Diamant für Sägesegmente, Schleifscheiben, Bohrer und Schneidwerkzeuge. Konsistente Qualitäten, eigene QC.",
      intro: [
        "Diamant und CBN für Schleifen, Schneiden, Sägen und Bohren.",
        "Sägesegmente, Schleifscheiben, Kernbohrer und Schneidwerkzeuge verbrauchen mehr Diamant als jede andere Anwendung, und ihre Leistung hängt von vorhersehbarer Kristallfestigkeit und Größenverteilung ab. EID liefert die Körnung, das Pulver und die beschichteten Schleifmittel dafür: Naturkörnung und Metallbindung für aggressives Schneiden, CBN für das Schleifen von Eisenwerkstoffen und Kunstharzbindung für feinere Arbeiten.",
        "Ein Lieferant deckt Säge-, Scheiben- und Finish-Qualitäten über Diamant und CBN hinweg ab, was die Beschaffung für einen Hersteller vereinfacht, dessen Programm von Steinbruchsägen bis zu Präzisionsscheiben und von Stein und Glas bis zum Bauwesen reicht.",
      ],
      outcome: {
        title: "Vorhersehbare Werkzeuge und ein Lieferant über das gesamte Programm",
        body: "Ein Sägesegment oder eine Schleifscheibe ist nur so konstant wie der Diamant darin. Wenn Kristallfestigkeit oder Größenverteilung zwischen den Chargen driften, driften Standzeit und Schnittgeschwindigkeit mit, und ein Hersteller mit breitem Programm verwaltet diese Schwankung über jede Produktlinie zugleich. EID klassiert und QC-prüft jede Charge, sodass jede Qualität von Bestellung zu Bestellung gleich arbeitet, und deckt Säge-, Scheiben-, beschichtete Körnung und Finish-Pulver aus einer Beziehung ab. Für einen Hersteller mit breitem Katalog ist diese Kombination aus Konstanz und Breite das, was Kosten und Risiko aus der Beschaffung nimmt.",
      },
      why: {
        title: "Warum Schleif- und Schneidwerkzeughersteller EID wählen",
        body: "Volumen, Konstanz und Programmbreite aus einer Hand. Die Fertigung von Schleifwerkzeugen in großen Stückzahlen hängt von vorhersehbarer Kristallfestigkeit und Größenverteilung ab, und die eigene Klassierung plus QC bei jeder Charge liefern das. Die hauseigene Beschichtung verbessert die Haltekraft in gesinterten Segmenten ohne zweiten Lieferanten. Und Säge-, Scheiben- und Finish-Qualitäten aus einer Beziehung vereinfachen die Beschaffung über ein breites Programm. ISO 9001 zertifiziert, mit einem Analysenzertifikat pro Charge.",
      },
    },
    "polishing-lapping": {
      name: "Polieren & Läppen", cardDesc: "Mikron- und polykristalline Pulver für Fein- und optisches Finish.",
      h1: "Diamant für Polieren & Läppen",
      metaDesc: "Mikron- und polykristalline Diamantpulver für feines und optisches Polieren und Läppen. Enge Größenverteilung, Sub-Nanometer-Finish, eigene QC.",
      intro: [
        "Diamant für Polieren und Läppen.",
        "Wenn die Oberfläche das Ergebnis ist, muss das Pulver bis in den Submikronbereich konstant sein. EID liefert mono- und polykristalline Diamant-Mikronpulver für das Läppen und Polieren von Optik, Präzisionsbauteilen und technischer Keramik, im Haus auf eine enge, wiederholbare Partikelgrößenverteilung klassiert und als Trockenpulver, Suspension oder Paste erhältlich.",
        "Die richtige Qualität hängt vom angestrebten Finish und von der Stufe ab, vom Zwischenläppen bis zur finalen Sub-Nanometer-Politur. Nennen Sie uns Werkstoff und Ra, und wir spezifizieren Pulver und Format.",
      ],
      outcome: {
        title: "Warum Konstanz über das Finish entscheidet",
        body: "In der Feinbearbeitung ist die Oberfläche die Spezifikation, und das Pulver entscheidet, ob Sie sie erreichen. Eine Verteilung, die zwischen den Chargen driftet oder gelegentlich ein übergroßes Partikel enthält, zeigt sich direkt als Kratzer, ungleichmäßiges Ra und Nacharbeit. Am Sub-Nanometer-Ende kann ein einziges verirrtes Partikel das ganze Teil kosten. EID misst die Partikelgrößenverteilung bei jeder Charge und klassiert auf ein kontrolliertes D50 und eine kontrollierte Spanne, sodass das Pulver bei jeder Bestellung gleich poliert. Für einen Prozess, in dem das Finish das Produkt ist, ist diese Wiederholbarkeit das, was Sie von der Nacharbeitsbank fernhält.",
      },
      why: {
        title: "Warum Feinbearbeiter EID wählen",
        body: "Enge Verteilung, eine Qualität für jede Stufe und dokumentierbare QC. Jede Charge wird auf die Partikelgrößenverteilung mit kontrolliertem D50 und kontrollierter Spanne gemessen, ISO 9001 zertifiziert, mit einem Analysenzertifikat pro Charge. Weil EID sowohl die Läpp-Pulver als auch die finale polykristalline Politur im Haus klassiert, deckt ein Lieferant Ihre gesamte Finish-Sequenz ab, und die Empfehlung folgt dem benötigten Finish, nicht der einen Qualität, die ein Anbieter gerade vorrätig hat.",
      },
    },
  },
  es: {
    "dental": {
      name: "Dental", cardDesc: "Enlace metálico y polvos finos para fresas sinterizadas, instrumentos rotatorios y discos.",
      h1: "Diamante para fabricantes de herramientas dentales",
      metaDesc: "Diamante de enlace metálico y polvos finos para fabricantes de fresas dentales, instrumentos rotatorios y discos. Grados consistentes y sinterizables de un fabricante con QC propio.",
      intro: [
        "Diamante para fabricantes de herramientas dentales.",
        "EID suministra el diamante que va en fresas dentales, instrumentos rotatorios, discos de diamante y herramientas de rectificado. No fabricamos herramientas dentales; abastecemos a los fabricantes que sí lo hacen, con polvo de enlace metálico, polvo fino de micras y abrasivos recubiertos, clasificados y verificados por QC según la misma especificación en cada pedido.",
        "En una línea de instrumentos dentales, el material debe sinterizar y cortar de forma idéntica lote tras lote, porque una fresa que rinde distinto a la anterior no pasa la inspección. Esa consistencia entre lotes es la razón por la que los fabricantes dentales homologan a EID y se quedan.",
      ],
      outcome: {
        title: "Lo que aporta el diamante consistente a una línea dental",
        body: "Una fresa sinterizada es tan repetible como el polvo que la compone. Cuando la resistencia del cristal, la distribución de tamaños y el peso del recubrimiento varían entre lotes, los resultados de sinterizado se desvían, la retención cambia y fresas que deberían ser idénticas no lo son. Eso se traduce en producto rechazado y riesgo de garantía aguas abajo. EID clasifica y verifica cada lote precisamente en esas variables, de modo que su proceso de sinterizado recibe el mismo insumo en cada tirada. El resultado: menos rechazos, vida útil predecible del instrumento y un suministro de diamante que se homologa una vez en lugar de revisarse en cada entrega.",
      },
      why: {
        title: "Por qué los fabricantes dentales eligen EID",
        body: "Consistencia, amplitud y una respuesta técnica real. El QC propio en cada lote da la repetibilidad entre lotes de la que depende una línea dental. El recubrimiento interno significa que no gestiona un segundo proveedor para la retención. Y cuando necesita especificar un grado para un instrumento nuevo, habla con alguien que trabaja con el material, no con un catálogo. Certificado ISO 9001, con certificado de análisis por lote.",
      },
    },
    "semiconductor-electronics": {
      name: "Semiconductores y electrónica avanzada", cardDesc: "Polvos finos de micras y policristalinos para corte, lapeado y pulido de obleas.",
      h1: "Diamante para semiconductores y electrónica avanzada",
      metaDesc: "Polvos de micras de diamante finos y policristalinos para corte, lapeado, adelgazado y pulido de obleas en la fabricación de semiconductores y electrónica avanzada.",
      intro: [
        "Diamante para la fabricación de semiconductores y electrónica avanzada.",
        "Los procesos de semiconductores y electrónica requieren el polvo de diamante más fino y consistente disponible, para cortar obleas, lapear y adelgazar sustratos y pulir hasta los acabados que exige la fabricación moderna de dispositivos. EID suministra polvos de micras mono y policristalinos, además de herramientas de trazado MCD y diamante natural fino, cada lote clasificado y verificado por QC para una distribución de tamaños estrecha y repetible.",
        "En este trabajo la tolerancia es implacable, y una sola partícula fuera de rango es una oblea desechada. La consistencia en el extremo superior de la distribución es precisamente lo que controla nuestro QC.",
      ],
      outcome: {
        title: "Por qué el control de la distribución de tamaños decide el rendimiento",
        body: "A escala de oblea, el coste de un defecto se mide en dies, no en piezas. Una partícula de gran tamaño en una suspensión de lapeado o pulido puede rayar un sustrato y eliminar cientos de dispositivos en una sola pasada. La defensa es un polvo con un D50 estrechamente controlado y un span estrecho, sin partículas atípicas, lote tras lote. EID mide la distribución de tamaños en cada lote y clasifica a un D50 y un span controlados, de modo que el polvo que homologa es el polvo que recibe. Para un proceso en el que una sola partícula define el modo de fallo, esa es la especificación que más importa.",
      },
      why: {
        title: "Por qué los fabricantes de electrónica eligen EID",
        body: "Distribución estrecha, bajo riesgo de atípicos y documentación para su expediente de homologación. Cada lote se mide para la distribución de tamaños con D50 controlado y mínimos atípicos, certificado ISO 9001, con certificado de análisis por lote. Cuando su homologación de proceso depende de que el insumo se mantenga constante, la clasificación y el QC internos son lo que le permite fijar el material.",
      },
    },
    "automotive-aerospace": {
      name: "Automoción y aeroespacial", cardDesc: "CBN y PCBN para rectificado y torneado en duro de acero endurecido; PCD para aluminio y compuestos.",
      h1: "CBN y diamante para automoción y aeroespacial",
      metaDesc: "CBN para rectificado de acero endurecido, PCBN para torneado en duro, PCD para aluminio y compuestos. Superabrasivos para fabricantes de herramientas de automoción y aeroespacial.",
      intro: [
        "Superabrasivos para fabricantes de herramientas de automoción y aeroespacial.",
        "La producción de automoción y aeroespacial se basa en el mecanizado preciso y de alto volumen de materiales duros: engranajes y ejes de acero endurecido, bloques de fundición, estructuras de aluminio y compuestos de fibra de carbono. Las herramientas que cortan y rectifican estas piezas funcionan con CBN y diamante, y EID suministra el material que hay detrás.",
        "Polvo de CBN para muelas vitrificadas y de resina, preformas de PCBN para insertos de torneado en duro, preformas de PCD para el mecanizado de aluminio y compuestos, y barras de diamantar CVD para mantener las muelas a punto. Un proveedor cubre el lado ferroso y el no ferroso de la misma línea de producción.",
      ],
      outcome: {
        title: "Por qué la consistencia entre lotes protege la línea",
        body: "En el rectificado de automoción, la producción se mide en millones de piezas al año, y la línea de rectificado está ajustada al material que la atraviesa. Cuando llega un lote de CBN con distinta resistencia del cristal o distribución de tamaños, hay que reajustar la línea, y cada hora de parada es producción perdida. La misma lógica se aplica a los insertos de PCBN y PCD que alimentan una celda de torneado en duro o de fresado. EID verifica cada lote para las variables que impulsan ese comportamiento, de modo que el material que llega coincide con el que usted homologó. Para una planta donde consistencia es igual a disponibilidad, esa es la especificación que se paga sola.",
      },
      why: {
        title: "Por qué los fabricantes de automoción y aeroespacial eligen EID",
        body: "Consistencia a volumen, respaldada por QC en cada lote. Un lote de CBN que coincide con el anterior es lo que mantiene una línea de rectificado en marcha sin reajustes, y la clasificación y las pruebas internas son cómo EID lo entrega. Cubrir tanto los materiales de rectificado ferrosos como los de corte no ferrosos desde un proveedor también significa menos proveedores homologándose en un proceso que no tolera sorpresas. Certificado ISO 9001, con certificado de análisis por lote.",
      },
    },
    "tool-and-die": {
      name: "Utillaje y matricería", cardDesc: "Monocristal, MCD y preformas de PCD/PCBN para herramientas de corte, diamantado y precisión.",
      h1: "Diamante y CBN para utillaje y matricería",
      metaDesc: "Monocristal, MCD, preformas de PCD y PCBN y piedras naturales para fabricantes de herramientas de corte, de un punto y de diamantado. Superabrasivos a medida.",
      intro: [
        "Diamante y CBN para fabricantes de utillaje y matricería.",
        "Los fabricantes de herramientas de corte, de un solo punto y de diamantado necesitan superabrasivos que mantengan un filo definido, herramienta tras herramienta. EID suministra los materiales de monocristal, monocristalino y preforma acabada que van en el utillaje de precisión: monocristal CVD crecido según su orientación, MCD HPHT para filos de un punto reproducibles, preformas de PCD y PCBN para insertos de corte y piedras naturales para diamantado.",
        "Tanto si necesita un solo cristal a una especificación exacta como un grado repetible en una serie de herramientas, el material llega de un solo proveedor, con QC en cada lote.",
      ],
      outcome: {
        title: "Filos reproducibles, o un cristal a una especificación exacta",
        body: "El utillaje y la matricería empujan en dos direcciones. A veces el requisito es la reproducibilidad: el mismo filo de defectos controlados en cientos de herramientas idénticas de un punto o de corte, para que cada pieza salga igual. A veces es precisión a una única especificación: un cristal CVD crecido a una orientación fija para una herramienta óptica o de componentes de relojería donde una geometría debe ser exacta. EID atiende ambas. El MCD ofrece el filo HPHT reproducible a escala de producción. El monocristal CVD se crece a su orientación y cara exactas mediante nuestra colaboración de crecimiento, y luego se acaba e inspecciona internamente. La respuesta correcta depende de su herramienta, y ahí empieza la conversación con nuestro equipo técnico.",
      },
      why: {
        title: "Por qué los fabricantes de utillaje y matricería eligen EID",
        body: "Capacidad a medida más un conjunto completo de materiales de un solo proveedor. Para los trabajos de precisión exigentes, el monocristal CVD se crece a su orientación exacta y se inspecciona aquí antes de enviarse. Para el utillaje de serie, el MCD y las preformas acabadas dan un grado repetible de pedido a pedido. Y como EID cubre monocristal, MCD, PCD, PCBN y piedra natural, un solo proveedor puede ajustar el material a la herramienta en lugar de empujarle hacia la única línea que ofrece. Certificado ISO 9001.",
      },
    },
    "grinding-cutting-sawing-drilling": {
      name: "Rectificado, corte, aserrado y perforación", cardDesc: "Grano natural, enlace metálico y CBN para segmentos, muelas y brocas.",
      h1: "Diamante y CBN para rectificado, corte, aserrado y perforación",
      metaDesc: "Grano natural, enlace metálico, CBN y diamante de enlace resinoso para segmentos de sierra, muelas, brocas y herramientas de corte. Grados consistentes, QC propio.",
      intro: [
        "Diamante y CBN para rectificado, corte, aserrado y perforación.",
        "Los segmentos de sierra, las muelas, las brocas de núcleo y las herramientas de corte consumen más diamante que cualquier otra aplicación, y su rendimiento depende de una resistencia del cristal y una distribución de tamaños predecibles. EID suministra el grano, el polvo y los abrasivos recubiertos que llevan dentro: grano natural y enlace metálico para el corte agresivo, CBN para el rectificado ferroso y enlace resinoso para el trabajo más fino.",
        "Un proveedor cubre los grados de sierra, de muela y de acabado a través del diamante y el CBN, lo que simplifica el aprovisionamiento de un fabricante cuya gama abarca desde sierras de cantera hasta muelas de precisión, y desde piedra y vidrio hasta la construcción.",
      ],
      outcome: {
        title: "Herramientas predecibles, y un proveedor para toda la gama",
        body: "Un segmento de sierra o una muela es tan consistente como el diamante que contiene. Cuando la resistencia del cristal o la distribución de tamaños se desvían entre lotes, la vida útil y la velocidad de corte se desvían con ellas, y un fabricante con una gama amplia acaba gestionando esa variación en cada línea de producto a la vez. EID clasifica y verifica cada lote, de modo que cada grado rinde igual de pedido a pedido, y cubre grado de sierra, de muela, grano recubierto y polvo de acabado desde una sola relación. Para un fabricante con un catálogo amplio, esa combinación de consistencia y amplitud es lo que quita coste y riesgo del aprovisionamiento.",
      },
      why: {
        title: "Por qué los fabricantes de herramientas de rectificado y corte eligen EID",
        body: "Volumen, consistencia y amplitud de gama de un solo proveedor. La producción de herramientas abrasivas de alto volumen depende de una resistencia del cristal y una distribución de tamaños predecibles, y la clasificación interna más el QC en cada lote lo entregan. El recubrimiento interno mejora la retención en segmentos sinterizados sin un segundo proveedor. Y cubrir los grados de sierra, de muela y de acabado desde una sola relación simplifica el aprovisionamiento en una gama amplia. Certificado ISO 9001, con certificado de análisis por lote.",
      },
    },
    "polishing-lapping": {
      name: "Pulido y lapeado", cardDesc: "Polvos de micras y policristalinos para acabado fino y óptico.",
      h1: "Diamante para pulido y lapeado",
      metaDesc: "Polvos de micras y policristalinos de diamante para pulido y lapeado fino y óptico. Distribución de tamaños estrecha, acabados sub-nanométricos, QC propio.",
      intro: [
        "Diamante para pulido y lapeado.",
        "Cuando el entregable es la superficie, el polvo tiene que ser consistente hasta el submicrón. EID suministra polvos de micras de diamante mono y policristalinos para el lapeado y pulido de óptica, componentes de precisión y cerámicas técnicas, clasificados internamente a una distribución de tamaños estrecha y repetible y disponibles como polvo seco, suspensión o pasta.",
        "El grado adecuado depende del acabado que persiga y de la etapa en la que esté, desde el lapeado intermedio hasta un pulido final sub-nanométrico. Díganos el material y el Ra y especificaremos el polvo y el formato.",
      ],
      outcome: {
        title: "Por qué la consistencia decide el acabado",
        body: "En el acabado fino, la superficie es la especificación, y el polvo es lo que determina si la alcanza. Una distribución que se desvía entre lotes, o que arrastra alguna partícula de gran tamaño, se manifiesta directamente como arañazos, Ra desigual y retrabajo. En el extremo sub-nanométrico, una sola partícula perdida puede costar la pieza entera. EID mide la distribución de tamaños en cada lote y clasifica a un D50 y un span controlados, de modo que el polvo pule igual en cada pedido. Para un proceso en el que el acabado es el producto, esa repetibilidad es lo que le mantiene fuera del banco de retrabajo.",
      },
      why: {
        title: "Por qué los acabadores eligen EID",
        body: "Distribución estrecha, un grado para cada etapa y un QC documentable. Cada lote se mide para la distribución de tamaños con D50 y span controlados, certificado ISO 9001, con certificado de análisis por lote. Como EID clasifica internamente tanto los polvos de lapeado como el pulido policristalino final, un solo proveedor cubre toda su secuencia de acabado, y la recomendación sigue el acabado que necesita en lugar del único grado que un proveedor tenga en stock.",
      },
    },
  },
  it: {
    "dental": { name: "Dentale", cardDesc: "Legante metallico e polveri fini per frese sinterizzate, strumenti rotanti e dischi." },
    "semiconductor-electronics": { name: "Semiconduttori ed elettronica avanzata", cardDesc: "Polveri fini micron e policristalline per dicing, lappatura e lucidatura dei wafer." },
    "automotive-aerospace": { name: "Automotive e aerospaziale", cardDesc: "CBN e PCBN per rettifica e tornitura dura dell'acciaio temprato; PCD per alluminio e compositi." },
    "tool-and-die": { name: "Utensili e stampi", cardDesc: "Monocristallo, MCD e billette PCD/PCBN per utensili da taglio, ravvivatura e precisione." },
    "grinding-cutting-sawing-drilling": { name: "Rettifica, taglio, segatura e foratura", cardDesc: "Grana naturale, legante metallico e CBN per segmenti, mole e punte." },
    "polishing-lapping": { name: "Lucidatura e lappatura", cardDesc: "Polveri micron e policristalline per finitura fine e ottica." },
  },
  ja: {
    "dental": { name: "デンタル", cardDesc: "焼結バー、回転器具、ダイヤモンドディスク向けのメタルボンドと微粉。" },
    "semiconductor-electronics": { name: "半導体・先端エレクトロニクス", cardDesc: "ダイシング、ラッピング、ウェーハ研磨向けの微細ミクロン・多結晶パウダー。" },
    "automotive-aerospace": { name: "自動車・航空宇宙", cardDesc: "焼入鋼の研削・硬旋削向けCBN／PCBN、アルミ・複合材向けPCD。" },
    "tool-and-die": { name: "工具・金型", cardDesc: "切削・ドレッシング・精密工具向けの単結晶、MCD、PCD／PCBNブランク。" },
    "grinding-cutting-sawing-drilling": { name: "研削・切断・切削・穴あけ", cardDesc: "セグメント、ホイール、ドリル向けの天然グリット、メタルボンド、CBN。" },
    "polishing-lapping": { name: "研磨・ラッピング", cardDesc: "精密・光学仕上げ向けのミクロン・多結晶パウダー。" },
  },
};

/* ------------------------------- GETTERS --------------------------------- */
export const getProducts = (locale: Locale): Product[] =>
  mergeBySlug(productsEN, productOverrides, locale);
export const getProduct = (locale: Locale, slug: string): Product | undefined =>
  getProducts(locale).find((p) => p.slug === slug);
export const getApplications = (locale: Locale): Application[] =>
  mergeBySlug(applicationsEN, applicationOverrides, locale);
export const getApplication = (locale: Locale, slug: string): Application | undefined =>
  getApplications(locale).find((a) => a.slug === slug);

/* --------------------- PRODUCT GROUP (FAMILY) LABELS --------------------- */
// Partial on purpose: a locale with no table falls back to the EN label, which
// is what lets FR, KO and ZH render before their translation batch lands.
const familyLabels: Partial<Record<Locale, Record<string, string>>> = {
  en: {},
  de: {
    "Natural Diamond Grit & Powder": "Naturdiamant-Körnung & -Pulver",
    "Metal Bond Diamond": "Metallbindung-Diamant",
    "Resin Bond Diamond": "Kunstharzbindung-Diamant",
    "CBN": "CBN",
    "Single Crystal Diamond (CVD & MCD)": "Einkristalldiamant (CVD & MCD)",
    "Polycrystalline Diamond (CVD & PCD)": "Polykristalliner Diamant (CVD & PCD)",
    "Natural Tool Stones": "Natürliche Werkzeugsteine",
    "Polycrystalline Diamond Powder": "Polykristallines Diamantpulver",
  },
  es: {
    "Natural Diamond Grit & Powder": "Grano y polvo de diamante natural",
    "Metal Bond Diamond": "Diamante de enlace metálico",
    "Resin Bond Diamond": "Diamante de enlace resinoso",
    "CBN": "CBN",
    "Single Crystal Diamond (CVD & MCD)": "Diamante monocristalino (CVD y MCD)",
    "Polycrystalline Diamond (CVD & PCD)": "Diamante policristalino (CVD y PCD)",
    "Natural Tool Stones": "Piedras naturales para herramientas",
    "Polycrystalline Diamond Powder": "Polvo de diamante policristalino",
  },
  it: {
    "Natural Diamond Grit & Powder": "Grana e polvere di diamante naturale",
    "Metal Bond Diamond": "Diamante a legante metallico",
    "Resin Bond Diamond": "Diamante a legante resinoide",
    "CBN": "CBN",
    "Single Crystal Diamond (CVD & MCD)": "Diamante monocristallino (CVD e MCD)",
    "Polycrystalline Diamond (CVD & PCD)": "Diamante policristallino (CVD e PCD)",
    "Natural Tool Stones": "Pietre naturali per utensili",
    "Polycrystalline Diamond Powder": "Polvere di diamante policristallino",
  },
  ja: {
    "Natural Diamond Grit & Powder": "天然ダイヤモンドグリット＆パウダー",
    "Metal Bond Diamond": "メタルボンドダイヤモンド",
    "Resin Bond Diamond": "レジンボンドダイヤモンド",
    "CBN": "CBN",
    "Single Crystal Diamond (CVD & MCD)": "単結晶ダイヤモンド（CVD・MCD）",
    "Polycrystalline Diamond (CVD & PCD)": "多結晶ダイヤモンド（CVD・PCD）",
    "Natural Tool Stones": "天然ツールストーン",
    "Polycrystalline Diamond Powder": "多結晶ダイヤモンドパウダー",
  },
};
export const getFamilyLabel = (locale: Locale, family: string): string =>
  familyLabels[locale]?.[family] ?? family;

/* ------------------------------- UI CHROME ------------------------------- */
type Dict = Record<string, string>;
// Partial on purpose, same reason as familyLabels: t() falls back to the key,
// which is the English string.
const ui: Partial<Record<Locale, Dict>> = {
  // EN is the source language, so keys pass through unchanged. The only entries
  // here are strings that have no sensible key-as-fallback.
  en: {
    footerAbout:
      "Manufacturer and finisher of the complete range of industrial diamond and superabrasive materials, supplying tool makers worldwide from London.",
  },
  de: {
    "Home": "Startseite", "Products": "Produkte", "Applications": "Anwendungen",
    "Quality": "Qualität", "Resources": "Ressourcen", "About": "Über uns", "Blog": "Blog",
    "Contact": "Kontakt", "Request A Quote": "Angebot anfordern", "Request a Quote": "Angebot anfordern",
    "View all products": "Alle Produkte ansehen", "Call Us:": "Anruf:", "Email Us:": "E-Mail:", "Based In:": "Sitz:",
    "Products Overview": "Produktübersicht", "Quality, QC & ISO 9001": "Qualität, QC & ISO 9001",
    "Resources & Guides": "Ressourcen & Leitfäden", "Datasheets": "Datenblätter", "MSDS": "Sicherheitsdatenblätter",
    "ISO 9001 Certified": "ISO 9001 zertifiziert", "In-House QC Laboratory": "Eigenes QC-Labor",
    "Complete Superabrasive Range": "Komplettes Superschleifmittel-Programm", "Sections": "Abschnitte",
    "50+ Years' Experience": "50+ Jahre Erfahrung",
    "London, UK": "London, UK", "Company & Resources": "Unternehmen & Ressourcen",
    footerAbout: "Hersteller und Veredler des kompletten Programms industrieller Diamant- und Superschleifmaterialien, weltweit für Werkzeughersteller.",
  },
  es: {
    "Home": "Inicio", "Products": "Productos", "Applications": "Aplicaciones",
    "Quality": "Calidad", "Resources": "Recursos", "About": "Nosotros", "Blog": "Blog",
    "Contact": "Contacto", "Request A Quote": "Solicitar presupuesto", "Request a Quote": "Solicitar presupuesto",
    "View all products": "Ver todos los productos", "Call Us:": "Llámenos:", "Email Us:": "Correo:", "Based In:": "Sede:",
    "Products Overview": "Resumen de productos", "Quality, QC & ISO 9001": "Calidad, QC e ISO 9001",
    "Resources & Guides": "Recursos y guías", "Datasheets": "Fichas técnicas", "MSDS": "Hojas de seguridad",
    "ISO 9001 Certified": "Certificado ISO 9001", "In-House QC Laboratory": "Laboratorio de QC propio",
    "Complete Superabrasive Range": "Gama completa de superabrasivos", "Sections": "Secciones", "50+ Years' Experience": "Más de 50 años de experiencia",
    "London, UK": "Londres, Reino Unido", "Company & Resources": "Empresa y recursos",
    footerAbout: "Fabricante y acabador de la gama completa de materiales de diamante industrial y superabrasivos, suministrando a fabricantes de herramientas de todo el mundo.",
  },
  it: {
    "Home": "Home", "Products": "Prodotti", "Applications": "Applicazioni",
    "Quality": "Qualità", "Resources": "Risorse", "About": "Chi siamo", "Blog": "Blog",
    "Contact": "Contatti", "Request A Quote": "Richiedi un preventivo", "Request a Quote": "Richiedi un preventivo",
    "View all products": "Vedi tutti i prodotti", "Call Us:": "Chiamaci:", "Email Us:": "Email:", "Based In:": "Sede:",
    "Products Overview": "Panoramica prodotti", "Quality, QC & ISO 9001": "Qualità, QC e ISO 9001",
    "Resources & Guides": "Risorse e guide", "Datasheets": "Schede tecniche", "MSDS": "Schede di sicurezza",
    "ISO 9001 Certified": "Certificato ISO 9001", "In-House QC Laboratory": "Laboratorio QC interno",
    "Complete Superabrasive Range": "Gamma completa di superabrasivi", "Sections": "Sezioni", "50+ Years' Experience": "Oltre 50 anni di esperienza",
    "London, UK": "Londra, Regno Unito", "Company & Resources": "Azienda e risorse",
    footerAbout: "Produttore e finitore della gamma completa di diamante industriale e materiali superabrasivi, al servizio dei produttori di utensili in tutto il mondo.",
  },
  ja: {
    "Home": "ホーム", "Products": "製品", "Applications": "用途",
    "Quality": "品質", "Resources": "リソース", "About": "会社概要", "Blog": "ブログ",
    "Contact": "お問い合わせ", "Request A Quote": "見積もり依頼", "Request a Quote": "見積もり依頼",
    "View all products": "すべての製品を見る", "Call Us:": "電話:", "Email Us:": "メール:", "Based In:": "所在地:",
    "Products Overview": "製品一覧", "Quality, QC & ISO 9001": "品質・QC・ISO 9001",
    "Resources & Guides": "リソース＆ガイド", "Datasheets": "データシート", "MSDS": "安全データシート",
    "ISO 9001 Certified": "ISO 9001 認証", "In-House QC Laboratory": "自社QCラボ",
    "Complete Superabrasive Range": "超砥粒フルレンジ", "Sections": "セクション", "50+ Years' Experience": "50年以上の実績",
    "London, UK": "英国ロンドン", "Company & Resources": "会社・リソース",
    footerAbout: "工業用ダイヤモンドおよび超砥粒材料のフルレンジを製造・仕上げし、世界中の工具メーカーに供給しています。",
  },
};
export const t = (locale: Locale, key: string): string => ui[locale]?.[key] ?? key;
