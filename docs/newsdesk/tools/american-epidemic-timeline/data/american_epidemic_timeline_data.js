window.AMERICAN_EPIDEMIC_TIMELINE_DATA = {
  "schema_version": "2.0.0",
  "generated_at": "2026-05-18",
  "title": "American Epidemic Timeline",
  "description": "A curated timeline of major epidemics, outbreaks, and public-health turning points in what is now the United States and its colonial/pre-state antecedents.",
  "scope_note": "Primary scope is present-day United States, U.S. territories where appropriate, and colonial or pre-state antecedents. The dataset is intentionally selective rather than exhaustive.",
  "interpretation_rules": [
    "Separate outbreak description from claimed historical consequence.",
    "Do not overdiagnose premodern or early colonial syndromes.",
    "Use ranges or qualitative burden language when the source base does not support exact counts.",
    "Mark uncertain, contested, retrospective, and interpretive claims visibly.",
    "Omit famous events when the available source base is too thin for the claim being displayed."
  ],
  "confidence_scale": {
    "high": "Multiple strong sources, or one definitive primary/technical source for the displayed claim.",
    "moderate": "Supported but limited, indirect, source-type dependent, or interpretive.",
    "low": "Plausible but thin evidence; should remain visibly caveated.",
    "contested": "Serious scholarly disagreement or disputed retrospective diagnosis.",
    "speculative": "Teaching model or hypothesis only; display only with explicit caveat."
  },
  "periods": [
    "Indigenous",
    "colonial",
    "early republic",
    "19th century",
    "Progressive Era",
    "20th century",
    "modern"
  ],
  "transmission_categories": [
    "respiratory",
    "fecal-oral/waterborne",
    "vector-borne",
    "foodborne",
    "sexually transmitted",
    "bloodborne",
    "zoonotic/environmental",
    "toxin/poisoning",
    "unknown/contested"
  ],
  "eras": [
    {
      "id": "contact-colonial",
      "label": "Contact And Colonial Worlds",
      "range": "1520-1774"
    },
    {
      "id": "republic-frontier",
      "label": "Republic, Ports, And Frontiers",
      "range": "1775-1899"
    },
    {
      "id": "germ-state",
      "label": "The Germ-State Century",
      "range": "1900-1979"
    },
    {
      "id": "molecular-global",
      "label": "Molecular Surveillance And Globalization",
      "range": "1980-2009"
    },
    {
      "id": "networked-risk",
      "label": "Networked Risk",
      "range": "2010-2026"
    }
  ],
  "disease_groups": [
    {
      "id": "smallpox",
      "label": "Smallpox And Orthopox"
    },
    {
      "id": "yellow-fever",
      "label": "Yellow Fever And Mosquito-Borne Disease"
    },
    {
      "id": "cholera-enteric",
      "label": "Cholera, Typhoid, And Water"
    },
    {
      "id": "respiratory",
      "label": "Respiratory And Airborne Disease"
    },
    {
      "id": "vaccine-preventable",
      "label": "Vaccine-Preventable Disease"
    },
    {
      "id": "zoonotic-vector",
      "label": "Zoonotic And Vector-Borne"
    },
    {
      "id": "blood-sex-injection",
      "label": "Blood, Sex, And Injection Networks"
    },
    {
      "id": "foodborne",
      "label": "Foodborne And Product-Linked"
    },
    {
      "id": "healthcare",
      "label": "Healthcare-Associated And Built Environment"
    },
    {
      "id": "uncertain",
      "label": "Uncertain Or Retrospective Diagnosis"
    }
  ],
  "sources": [
    {
      "id": "cdc-new-england-1616",
      "title": "Emerging Infectious Diseases: New Hypothesis for Cause of Epidemic among Native Americans, New England, 1616-1619",
      "url": "https://wwwnc.cdc.gov/eid/article/16/2/09-0276_article",
      "source_type": "peer-reviewed historical epidemiology"
    },
    {
      "id": "cdc-smallpox-history",
      "title": "CDC: History of Smallpox",
      "url": "https://www.cdc.gov/smallpox/about/history.html",
      "source_type": "official public-health history"
    },
    {
      "id": "who-smallpox-eradication",
      "title": "WHO: Smallpox and Its Eradication",
      "url": "https://iris.who.int/handle/10665/39485",
      "source_type": "official eradication monograph"
    },
    {
      "id": "cdc-mosquito-history",
      "title": "Emerging Infectious Diseases: History of Mosquitoborne Diseases in the United States",
      "url": "https://wwwnc.cdc.gov/eid/article/24/5/17-1609_article",
      "source_type": "peer-reviewed public-health history"
    },
    {
      "id": "nlm-yellow-fever-primary",
      "title": "NLM Digital Collections: 1793 Philadelphia Yellow Fever Primary Account",
      "url": "https://collections.nlm.nih.gov/catalog/nlm:nlmuid-2551045R-bk",
      "source_type": "primary source"
    },
    {
      "id": "nlm-politics-yellow-fever",
      "title": "NLM Exhibition: Politics of Yellow Fever",
      "url": "https://www.nlm.nih.gov/exhibition/politicsofyellowfever/resources.html",
      "source_type": "curated historical collection"
    },
    {
      "id": "cdc-cholera-us",
      "title": "CDC: Cholera in the United States",
      "url": "https://www.cdc.gov/cholera/about/about-cholera-in-the-united-states.html",
      "source_type": "official public-health background"
    },
    {
      "id": "cdc-drinking-water",
      "title": "CDC: History of Drinking Water Treatment",
      "url": "https://archive.cdc.gov/www_cdc_gov/healthywater/drinking/history.html",
      "source_type": "official public-health history"
    },
    {
      "id": "pbs-yellow-fever",
      "title": "PBS American Experience: Major American Epidemics of Yellow Fever",
      "url": "https://www.pbs.org/wgbh/americanexperience/features/fever-major-american-epidemics-of-yellow-fever/",
      "source_type": "public history"
    },
    {
      "id": "nps-civil-war-medicine",
      "title": "National Park Service: Wounded Soldiers Contend with Crude Treatments",
      "url": "https://www.nps.gov/articles/military-medicine.htm",
      "source_type": "official public-history summary"
    },
    {
      "id": "nlm-mshwr",
      "title": "NLM Digital Collections: The Medical and Surgical History of the War of the Rebellion",
      "url": "https://collections.nlm.nih.gov/catalog/nlm:nlmuid-14121350R-mvset",
      "source_type": "primary medical record collection"
    },
    {
      "id": "downs-sick-from-freedom-smallpox",
      "title": "Jim Downs: Reconstructing an Epidemic: Smallpox among Former Slaves, 1862-1868",
      "url": "https://academic.oup.com/book/36000/chapter/313211329",
      "source_type": "academic book chapter"
    },
    {
      "id": "nara-freedmens-bureau",
      "title": "National Archives: The Freedmen's Bureau",
      "url": "https://www.archives.gov/research/african-americans/freedmens-bureau",
      "source_type": "archival records guide"
    },
    {
      "id": "cdc-safer-foods",
      "title": "MMWR: Achievements in Public Health, 1900-1999: Safer and Healthier Foods",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm4840a1.htm",
      "source_type": "official public-health review"
    },
    {
      "id": "cdc-plague-us",
      "title": "Emerging Infectious Diseases: Epidemiology of Human Plague in the United States, 1900-2012",
      "url": "https://wwwnc.cdc.gov/eid/article/21/1/14-0564_article",
      "source_type": "peer-reviewed surveillance history"
    },
    {
      "id": "niaid-sf-plague",
      "title": "NIAID: Plague in San Francisco, 1900",
      "url": "https://www.niaid.nih.gov/about/joseph-kinyoun-indispensable-man-plague-san-francisco",
      "source_type": "official public-history account"
    },
    {
      "id": "cdc-tb-history",
      "title": "CDC: History of World TB Day",
      "url": "https://www.cdc.gov/world-tb-day/history/index.html",
      "source_type": "official public-health history"
    },
    {
      "id": "nlm-tb-ephemera",
      "title": "NLM Exhibition: Here Today, Here Tomorrow - Tuberculosis",
      "url": "https://www.nlm.nih.gov/exhibition/ephemera/tb.html",
      "source_type": "curated historical collection"
    },
    {
      "id": "cdc-polio-museum",
      "title": "CDC Museum: Polio and the Epidemic Intelligence Service",
      "url": "https://www.cdc.gov/museum/online/story-of-cdc/polio/index.html",
      "source_type": "official public-health history"
    },
    {
      "id": "cdc-polio-pinkbook",
      "title": "CDC Pink Book: Poliomyelitis",
      "url": "https://www.cdc.gov/pinkbook/hcp/table-of-contents/chapter-18-poliomyelitis.html",
      "source_type": "official vaccine-preventable disease reference"
    },
    {
      "id": "cdc-1918-eid",
      "title": "Emerging Infectious Diseases: 1918 Influenza, the Mother of All Pandemics",
      "url": "https://wwwnc.cdc.gov/eid/article/12/1/05-0979_article",
      "source_type": "peer-reviewed review"
    },
    {
      "id": "cdc-1918-timeline",
      "title": "CDC: 1918 Pandemic Timeline",
      "url": "https://archive.cdc.gov/www_cdc_gov/flu/pandemic-resources/1918-commemoration/pandemic-timeline-1918.htm",
      "source_type": "official timeline"
    },
    {
      "id": "cdc-rubella-impact",
      "title": "CDC: Impact of U.S. MMR Vaccination Program on Rubella",
      "url": "https://www.cdc.gov/rubella/vaccine-impact/index.html",
      "source_type": "official public-health history"
    },
    {
      "id": "cdc-rubella-elimination",
      "title": "MMWR: Elimination of Rubella and Congenital Rubella Syndrome, United States, 1969-2004",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm54e321a1.htm",
      "source_type": "official public-health review"
    },
    {
      "id": "cdc-lyme-connecticut",
      "title": "MMWR: Lyme Disease -- Connecticut",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/00001024.htm",
      "source_type": "official outbreak and surveillance report"
    },
    {
      "id": "ct-lyme-history",
      "title": "Connecticut DPH: A Brief History of Lyme Disease in Connecticut",
      "url": "https://portal.ct.gov/dss/sitecore/content/dph/home/epidemiology-and-emerging-infections/a-brief-history-of-lyme-disease-in-connecticut",
      "source_type": "state public-health history"
    },
    {
      "id": "cdc-fort-dix-swine-flu",
      "title": "EID: Swine Influenza A Outbreak, Fort Dix, New Jersey, 1976",
      "url": "https://wwwnc.cdc.gov/eid/article/12/1/05-0965_article",
      "source_type": "peer-reviewed outbreak analysis"
    },
    {
      "id": "cdc-swine-flu-1976-program",
      "title": "CDC Museum: 1976 Swine Flu Vaccination Program",
      "url": "https://www.cdc.gov/museum/online/story-of-cdc/h1n1/index.html",
      "source_type": "official public-health history"
    },
    {
      "id": "cdc-legionnaires-museum",
      "title": "CDC Museum: Legionnaires' Disease",
      "url": "https://www.cdc.gov/museum/online/story-of-cdc/legionnaires/index.html",
      "source_type": "official public-health history"
    },
    {
      "id": "cdc-legionnaires-lab",
      "title": "MMWR Supplement: Laboratory Contributions to Public Health",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/su6004a6.htm",
      "source_type": "official laboratory history"
    },
    {
      "id": "cdc-hiv-first-report",
      "title": "MMWR: First Report of AIDS",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5021a1.htm",
      "source_type": "official retrospective"
    },
    {
      "id": "hiv-gov-timeline",
      "title": "HIV.gov: A Timeline of HIV and AIDS",
      "url": "https://www.hiv.gov/hiv-basics/overview/history/hiv-and-aids-timeline",
      "source_type": "official federal timeline"
    },
    {
      "id": "cdc-hiv-25-years",
      "title": "MMWR: Twenty-Five Years of HIV/AIDS, United States, 1981-2006",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5521a1.htm",
      "source_type": "official public-health review"
    },
    {
      "id": "cdc-listeria-1985",
      "title": "MMWR: Listeriosis Outbreak Associated with Mexican-Style Cheese, California",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/00000562.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-listeria-vitalsigns",
      "title": "MMWR: Vital Signs: Listeria Illnesses, Deaths, and Outbreaks, United States, 2009-2011",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm6222a4.htm",
      "source_type": "official public-health review"
    },
    {
      "id": "cdc-measles-surveillance",
      "title": "CDC Manual for Surveillance: Measles",
      "url": "https://www.cdc.gov/surv-manual/php/table-of-contents/chapter-7-measles.html",
      "source_type": "official surveillance manual"
    },
    {
      "id": "cdc-measles-history",
      "title": "CDC: History of Measles",
      "url": "https://www.cdc.gov/measles/about/history.html",
      "source_type": "official public-health history"
    },
    {
      "id": "cdc-ecoli-o157-hamburgers-1993",
      "title": "MMWR: Multistate E. coli O157:H7 Infections from Hamburgers, 1992-1993",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/00020219.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-crypto-surveillance",
      "title": "MMWR: Surveillance for Waterborne-Disease Outbreaks, United States, 1993-1994",
      "url": "https://www.cdc.gov/mmwr/Preview/Mmwrhtml/00040818.htm",
      "source_type": "official surveillance review"
    },
    {
      "id": "cdc-crypto-mmwr",
      "title": "MMWR: Cryptosporidium Infections Associated with Swimming Pools, Dane County, Wisconsin, 1993",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/00032242.htm",
      "source_type": "official outbreak context"
    },
    {
      "id": "cdc-hantavirus-1993",
      "title": "MMWR: Hantavirus Pulmonary Syndrome, United States, 1993",
      "url": "https://www.cdc.gov/Mmwr/preview/mmwrhtml/00025007.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-hantavirus-1993-2009",
      "title": "EID: Hantavirus Pulmonary Syndrome, United States, 1993-2009",
      "url": "https://wwwnc.cdc.gov/eid/article/17/7/10-1306_article.htm",
      "source_type": "peer-reviewed surveillance review"
    },
    {
      "id": "cdc-west-nile-1999",
      "title": "MMWR: Outbreak of West Nile-Like Viral Encephalitis, New York, 1999",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm4838a1.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-west-nile-historic",
      "title": "CDC: West Nile Virus Historic Data, 1999-2024",
      "url": "https://www.cdc.gov/west-nile-virus/data-maps/historic-data.html",
      "source_type": "official surveillance data"
    },
    {
      "id": "cdc-anthrax-2001",
      "title": "MMWR: Update: Investigation of Bioterrorism-related Anthrax, 2001",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5045a2.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-anthrax-eid",
      "title": "Emerging Infectious Diseases: Investigation of Bioterrorism-Related Anthrax, United States, 2001",
      "url": "https://wwwnc.cdc.gov/eid/article/8/10/02-0353_article",
      "source_type": "peer-reviewed outbreak investigation"
    },
    {
      "id": "cdc-sars-2003",
      "title": "MMWR: Update: Severe Acute Respiratory Syndrome, United States, 2003",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5218a2.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-sars-response",
      "title": "CDC: Severe Acute Respiratory Syndrome Response",
      "url": "https://www.cdc.gov/orr/responses/sars.html",
      "source_type": "official response history"
    },
    {
      "id": "cdc-h1n1-2009",
      "title": "CDC Archive: 2009 H1N1 Pandemic",
      "url": "https://archive.cdc.gov/www_cdc_gov/flu/pandemic-resources/2009-h1n1-pandemic.html",
      "source_type": "official pandemic summary"
    },
    {
      "id": "cdc-h1n1-response",
      "title": "CDC: H1N1 Influenza Pandemic Response",
      "url": "https://www.cdc.gov/orr/responses/h1n1-influenza-pandemic.html",
      "source_type": "official response history"
    },
    {
      "id": "cdc-fungal-meningitis-2012",
      "title": "MMWR: Multistate Fungal Infection Linked to Contaminated Methylprednisolone, 2012",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm6141a4.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-fungal-meningitis-archive",
      "title": "CDC Archive: Multistate Outbreak of Fungal Meningitis and Other Infections",
      "url": "https://archive.cdc.gov/www_cdc_gov/hai/outbreaks/meningitis.html",
      "source_type": "official outbreak archive"
    },
    {
      "id": "cdc-ebola-2014",
      "title": "CDC Online Newsroom: First Ebola Case Diagnosed in the United States",
      "url": "https://archive.cdc.gov/www_cdc_gov/media/releases/2014/t0930-ebola-confirmed-case.html",
      "source_type": "official outbreak notice"
    },
    {
      "id": "cdc-ebola-history",
      "title": "CDC: Ebola Outbreak History",
      "url": "https://www.cdc.gov/ebola/outbreaks/index.html",
      "source_type": "official outbreak history"
    },
    {
      "id": "cdc-hiv-indiana-2015",
      "title": "MMWR: Community Outbreak of HIV Infection Linked to Injection Drug Use of Oxymorphone, Indiana, 2015",
      "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm6416a4.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-amd-indiana-hiv",
      "title": "CDC AMD: Tracing Connections in an HIV-1 Outbreak in Indiana",
      "url": "https://archive.cdc.gov/www_cdc_gov/amd/whats-new/tracing-connections-hiv.html",
      "source_type": "official genomic epidemiology account"
    },
    {
      "id": "cdc-zika-puerto-rico",
      "title": "MMWR: Local Transmission of Zika Virus, Puerto Rico, 2015-2016",
      "url": "https://www.cdc.gov/mmwr/volumes/65/wr/mm6506e2.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-zika-us-cases",
      "title": "MMWR: Zika Virus Disease Cases, 50 States and DC, 2016",
      "url": "https://www.cdc.gov/mmwr/volumes/65/wr/mm6536e5.htm",
      "source_type": "official surveillance report"
    },
    {
      "id": "cdc-measles-2019",
      "title": "MMWR: National Update on Measles Cases and Outbreaks, United States, 2019",
      "url": "https://www.cdc.gov/mmwr/volumes/68/wr/mm6840e2.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-covid-timeline",
      "title": "CDC Museum COVID-19 Timeline",
      "url": "https://www.cdc.gov/museum/timeline/covid19.html",
      "source_type": "official timeline"
    },
    {
      "id": "cdc-covid-early-response-2020",
      "title": "MMWR: Public Health Response to the Initiation and Spread of Pandemic COVID-19 in the United States, 2020",
      "url": "https://www.cdc.gov/mmwr/volumes/69/wr/mm6918e2.htm",
      "source_type": "official response review"
    },
    {
      "id": "cdc-covid-ltc-king-county",
      "title": "MMWR: COVID-19 in a Long-Term Care Facility, King County, Washington, 2020",
      "url": "https://www.cdc.gov/mmwr/volumes/69/wr/mm6912e1.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-covid-ltc-nursing-homes-2020",
      "title": "MMWR: Rates of COVID-19 Among Nursing Home Residents and Staff Members, 2020",
      "url": "https://www.cdc.gov/mmwr/volumes/70/wr/mm7002e2.htm",
      "source_type": "official surveillance report"
    },
    {
      "id": "cdc-mpox-2022",
      "title": "MMWR: Epidemiologic Features of the Monkeypox Outbreak and Public Health Response, United States, 2022",
      "url": "https://www.cdc.gov/mmwr/volumes/71/wr/mm7145a4.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-mpox-response",
      "title": "MMWR: The CDC Domestic Mpox Response, United States, 2022-2023",
      "url": "https://www.cdc.gov/mmwr/volumes/72/wr/mm7220a2.htm",
      "source_type": "official response review"
    },
    {
      "id": "cdc-polio-ny-2022",
      "title": "MMWR: Public Health Response to Paralytic Poliomyelitis and Wastewater Detection, New York, 2022",
      "url": "https://www.cdc.gov/mmwr/volumes/71/wr/mm7133e2.htm",
      "source_type": "official outbreak report"
    },
    {
      "id": "cdc-polio-wastewater-2022",
      "title": "MMWR: Wastewater Testing and Poliovirus Type 2 Detection, New York, 2022",
      "url": "https://www.cdc.gov/mmwr/volumes/71/wr/mm7144e2.htm",
      "source_type": "official surveillance report"
    }
  ],
  "assets": [
    {
      "id": "new-england-smith-1616",
      "local_path": "../../assets/visuals/new-england-smith-1616.png",
      "source_url": "https://commons.wikimedia.org/wiki/File:Description_of_New_England_-_Smith_(1616)_-_map.png",
      "rights": "public domain",
      "credit": "John Smith, A Description of New England map, 1616",
      "alt": "John Smith's 1616 map of New England.",
      "usage_start_year": 1616,
      "usage_end_year": 1747,
      "temporal_note": "Contemporary 1616 New England map used for early colonial New England geography."
    },
    {
      "id": "boylston-smallpox-inoculation-title",
      "local_path": "../../assets/visuals/boylston-smallpox-inoculation-title.png",
      "source_url": "https://commons.wikimedia.org/wiki/File:Boylston_-_An_Historical_Account_of_the_Small-pox_Inoculated_in_New_England_(title).png",
      "rights": "public domain",
      "credit": "Zabdiel Boylston, An Historical Account of the Small-pox Inoculated in New England, title page",
      "alt": "Title page of Boylston's historical account of smallpox inoculation in New England.",
      "usage_start_year": 1721,
      "usage_end_year": 1730,
      "temporal_note": "Near-contemporary title page for Boylston's account of the 1721 Boston inoculation campaign."
    },
    {
      "id": "washington-crossing",
      "local_path": "../../assets/visuals/washington-crossing-delaware.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:Washington_Crossing_the_Delaware_MET_DP245003.jpg",
      "rights": "public domain",
      "credit": "Emanuel Leutze, Washington Crossing the Delaware",
      "alt": "Painting of Washington crossing the Delaware.",
      "usage_start_year": 1775,
      "usage_end_year": 1783,
      "temporal_note": "Revolutionary War symbolic image; not used outside Revolutionary-era records."
    },
    {
      "id": "yellow-fever-1793-title-page",
      "local_path": "../../assets/visuals/yellow-fever-1793-title-page.gif",
      "source_url": "https://commons.wikimedia.org/wiki/File:Yellow_Fever_1793.gif",
      "rights": "public domain",
      "credit": "Matthew Carey, Short Account of the Malignant Fever, title page, Philadelphia, 1793",
      "alt": "Title page of a 1793 account of the Philadelphia yellow fever epidemic.",
      "usage_start_year": 1793,
      "usage_end_year": 1800,
      "temporal_note": "Contemporary 1790s yellow fever publication."
    },
    {
      "id": "john-lea-cholera",
      "local_path": "../../assets/visuals/john-lea-cholera-map-1850.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:John_Lea_cholera_map_1850.jpg",
      "rights": "public domain",
      "credit": "John Lea cholera outbreak map, 1850",
      "alt": "Nineteenth-century cholera map.",
      "usage_start_year": 1830,
      "usage_end_year": 1866,
      "temporal_note": "Mid-nineteenth-century U.S. cholera geography context."
    },
    {
      "id": "new-orleans-sanitary-map-1853",
      "local_path": "../../assets/visuals/new-orleans-sanitary-map-1853.png",
      "source_url": "https://commons.wikimedia.org/wiki/File:65030340R_page_261_1853_Sanitary_map_of_New_Orleans.png",
      "rights": "public domain",
      "credit": "U.S. National Library of Medicine, Sanitary map of New Orleans, 1853",
      "alt": "Sanitary map of New Orleans from an 1853 yellow fever report.",
      "usage_start_year": 1853,
      "usage_end_year": 1855,
      "temporal_note": "Contemporary New Orleans yellow fever and sanitation map."
    },
    {
      "id": "civil-war-field-hospital-1862",
      "local_path": "../../assets/visuals/civil-war-field-hospital-1862.png",
      "source_url": "https://commons.wikimedia.org/wiki/File:After_Battle_of_Savage%27s_Station.png",
      "rights": "public domain",
      "credit": "James F. Gibson, Savage Station field hospital after the battle of June 27, Library of Congress, 1862",
      "alt": "Civil War field hospital at Savage Station, Virginia, in 1862.",
      "usage_start_year": 1861,
      "usage_end_year": 1865,
      "temporal_note": "Civil War field-hospital context."
    },
    {
      "id": "quarantine-notice-1878",
      "local_path": "../../assets/visuals/quarantine-notice-1878.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:Quarantine_notice_and_city_ordinance_restricting_landings_of_steamboats_or_other_water_craft_at_or_near_Cape_Girardeau,_October_8,_1878.jpg",
      "rights": "public domain scan",
      "credit": "Missouri History Museum quarantine notice and city ordinance, 1878",
      "alt": "Printed nineteenth-century quarantine notice restricting steamboat landings.",
      "usage_start_year": 1870,
      "usage_end_year": 1885,
      "temporal_note": "Period quarantine document for the 1870s Mississippi Valley yellow fever era."
    },
    {
      "id": "camp-alger-1898",
      "local_path": "../../assets/visuals/camp-alger-1898.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:8th_Ohio_Infantry_at_Camp_Alger.jpg",
      "rights": "public domain",
      "credit": "8th Ohio Infantry at Camp Alger, circa 1898",
      "alt": "Soldiers of the 8th Ohio Infantry at Camp Alger during the Spanish-American War period.",
      "usage_start_year": 1898,
      "usage_end_year": 1898,
      "temporal_note": "Spanish-American War camp context."
    },
    {
      "id": "plague-ship-hoffman",
      "local_path": "../../assets/visuals/plague-ship-hoffman-island.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:%22Plague_ship%22_which_carries_suspects_to_Hoffman_Island_quarantine,_N.Y.C._LCCN2016647963.jpg",
      "rights": "Library of Congress no known restrictions",
      "credit": "Library of Congress plague ship to Hoffman Island quarantine",
      "alt": "A quarantine vessel associated with plague suspects near New York.",
      "usage_start_year": 1890,
      "usage_end_year": 1930,
      "temporal_note": "Turn-of-the-century quarantine and plague-control context."
    },
    {
      "id": "yersinia-pestis",
      "local_path": "../../assets/visuals/yersinia-pestis-bacteria.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:Yersinia_pestis_Bacteria.jpg",
      "rights": "public domain",
      "credit": "NIAID/NIH Yersinia pestis bacteria",
      "alt": "Microscopic image of Yersinia pestis bacteria.",
      "usage_start_year": 1900,
      "usage_end_year": 2026,
      "temporal_note": "Pathogen-context image for plague records after laboratory bacteriology is central."
    },
    {
      "id": "microscope-wellcome",
      "local_path": "../../assets/visuals/wellcome-microscope-m0010657.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:Microscope_Wellcome_M0010657.jpg",
      "rights": "CC BY 4.0",
      "credit": "Wellcome Collection microscope image",
      "alt": "Historical microscope used as a symbol of laboratory investigation.",
      "usage_start_year": 1900,
      "usage_end_year": 2026,
      "temporal_note": "Laboratory and surveillance context for twentieth- and twenty-first-century records without event-specific public-domain imagery."
    },
    {
      "id": "typhoid-mary-hospital",
      "local_path": "../../assets/visuals/typhoid-mary-hospital.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:Mary_Mallon_in_hospital.jpg",
      "rights": "public domain",
      "credit": "Mary Mallon in hospital isolation",
      "alt": "Mary Mallon lying in a hospital bed during her typhoid-carrier isolation.",
      "usage_start_year": 1906,
      "usage_end_year": 1938,
      "temporal_note": "Typhoid Mary and early twentieth-century carrier-control context."
    },
    {
      "id": "typhoid-carrier-poster",
      "local_path": "../../assets/visuals/typhoid-carrier-poster.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:Typhoid_carrier_polluting_food_-_a_poster.jpg",
      "rights": "CC BY 2.0",
      "credit": "Otis Historical Archives, National Museum of Health and Medicine typhoid-carrier poster",
      "alt": "Public-health poster showing a typhoid carrier contaminating food.",
      "usage_start_year": 1906,
      "usage_end_year": 1938,
      "temporal_note": "Early twentieth-century typhoid-carrier public-health education context."
    },
    {
      "id": "poliovirus-cdc-tem",
      "local_path": "../../assets/visuals/poliovirus-cdc-tem.jpg",
      "source_url": "https://phil.cdc.gov/Details.aspx?pid=235",
      "rights": "CDC public domain",
      "credit": "CDC/Dr. Joseph J. Esposito and F. A. Murphy poliovirus type-1 TEM",
      "alt": "Transmission electron micrograph showing numerous round poliovirus type 1 virions.",
      "usage_start_year": 1916,
      "usage_end_year": 2026,
      "temporal_note": "Pathogen-context image for poliomyelitis records; laboratory image postdates the early polio epidemics."
    },
    {
      "id": "influenza-1918-seattle-masks",
      "local_path": "../../assets/visuals/influenza-1918-seattle-masks.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:Spanish_flu_in_1918,_Police_officers_in_masks,_Seattle_Police_Department_detail,_from-_165-WW-269B-25-police-l_(cropped).jpg",
      "rights": "public domain",
      "credit": "Seattle police officers wearing masks during the 1918 influenza epidemic",
      "alt": "Seattle police officers wearing masks during the 1918 influenza pandemic.",
      "usage_start_year": 1918,
      "usage_end_year": 1919,
      "temporal_note": "Contemporary 1918 influenza public-health masking image."
    },
    {
      "id": "variola-virus-cdc-tem",
      "local_path": "../../assets/visuals/variola-virus-cdc-tem.jpg",
      "source_url": "https://phil.cdc.gov/details.aspx?pid=1849",
      "rights": "CDC public domain",
      "credit": "CDC/Dr. Fred Murphy and Sylvia Whitfield smallpox virus TEM",
      "alt": "Transmission electron micrograph showing smallpox virus virions.",
      "usage_start_year": 1947,
      "usage_end_year": 2026,
      "temporal_note": "Pathogen-context image for twentieth-century smallpox records; laboratory image postdates the 1947 New York event."
    },
    {
      "id": "iron-lung-ward",
      "local_path": "../../assets/visuals/iron-lung-ward.gif",
      "source_url": "https://commons.wikimedia.org/wiki/File:Iron_Lung_ward-Rancho_Los_Amigos_Hospital.gif",
      "rights": "public domain",
      "credit": "Rancho Los Amigos Hospital iron lung ward",
      "alt": "Hospital ward lined with iron lungs during the polio era.",
      "usage_start_year": 1950,
      "usage_end_year": 1955,
      "temporal_note": "Early 1950s polio epidemic respiratory-care context."
    },
    {
      "id": "rubella-lab-cdc",
      "local_path": "../../assets/visuals/rubella-lab-cdc.jpg",
      "source_url": "https://wwwn.cdc.gov/phil/Details.aspx?pid=29417",
      "rights": "CDC public domain",
      "credit": "CDC/Paul White Jr. historic rubella laboratory image",
      "alt": "Laboratory technician seated at a microscope in a rubella laboratory.",
      "usage_start_year": 1964,
      "usage_end_year": 1970,
      "temporal_note": "Historic rubella laboratory context for the 1964-1965 rubella epidemic."
    },
    {
      "id": "borrelia-burgdorferi-cdc",
      "local_path": "../../assets/visuals/borrelia-burgdorferi-cdc.jpg",
      "source_url": "https://wwwn.cdc.gov/phil/Details.aspx?pid=2417",
      "rights": "CDC public domain",
      "credit": "CDC Public Health Image Library, Borrelia burgdorferi photomicrograph",
      "alt": "Close photomicrograph of Borrelia burgdorferi bacteria.",
      "usage_start_year": 1975,
      "usage_end_year": 2026,
      "temporal_note": "Pathogen-context image for Lyme disease recognition and later surveillance records."
    },
    {
      "id": "generic-influenza-cdc",
      "local_path": "../../assets/visuals/generic-influenza-cdc.jpg",
      "source_url": "https://phil.cdc.gov/Details.aspx?pid=10073",
      "rights": "CDC public domain",
      "credit": "CDC/Erskine influenza virion micrograph",
      "alt": "Colorized transmission electron micrograph of an influenza virion.",
      "usage_start_year": 1957,
      "usage_end_year": 1981,
      "temporal_note": "Non-specific influenza virion context for twentieth-century influenza records; not an archival period scene."
    },
    {
      "id": "legionella-sem",
      "local_path": "../../assets/visuals/legionella-sem.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:Legionella_pneumophila_(SEM).jpg",
      "rights": "public domain",
      "credit": "CDC scanning electron micrograph of Legionella pneumophila",
      "alt": "Scanning electron micrograph of Legionella pneumophila bacteria.",
      "usage_start_year": 1976,
      "usage_end_year": 2026,
      "temporal_note": "Pathogen-context image for Legionnaires' disease after the organism became central to outbreak investigation."
    },
    {
      "id": "hiv-budding-color",
      "local_path": "../../assets/visuals/hiv-budding-color.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:HIV-budding-Color_cropped.jpg",
      "rights": "public domain",
      "credit": "CDC/C. Goldsmith colorized HIV budding micrograph",
      "alt": "Colorized electron micrograph of HIV budding from a lymphocyte.",
      "usage_start_year": 1981,
      "usage_end_year": 2026,
      "temporal_note": "Laboratory HIV visual for AIDS-era and later HIV outbreak records."
    },
    {
      "id": "listeria-monocytogenes-cdc",
      "local_path": "../../assets/visuals/listeria-monocytogenes-cdc.jpg",
      "source_url": "https://phil.cdc.gov/Details.aspx?pid=2287",
      "rights": "CDC public domain",
      "credit": "CDC/Dr. Balasubr Swaminathan and Peggy Hayes Listeria monocytogenes TEM",
      "alt": "Transmission electron micrograph of a flagellated Listeria monocytogenes bacterium.",
      "usage_start_year": 1985,
      "usage_end_year": 2026,
      "temporal_note": "Pathogen-context image for listeriosis outbreak records; not a period food-production photograph."
    },
    {
      "id": "measlesvirus",
      "local_path": "../../assets/visuals/measlesvirus.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:Measlesvirus.jpg",
      "rights": "public domain",
      "credit": "CDC/Brian W. J. Mahy measles virus micrograph",
      "alt": "Electron micrograph of measles virus.",
      "usage_start_year": 1980,
      "usage_end_year": 2026,
      "temporal_note": "Laboratory measles visual for post-elimination and vaccine-era measles records."
    },
    {
      "id": "e-coli-cdc",
      "local_path": "../../assets/visuals/e-coli-cdc.jpg",
      "source_url": "https://www.cdc.gov/ecoli/about/index.html",
      "rights": "CDC public domain",
      "credit": "CDC Escherichia coli medical illustration",
      "alt": "Medical illustration of E. coli with flagella.",
      "usage_start_year": 1992,
      "usage_end_year": 2026,
      "temporal_note": "Pathogen-context image for foodborne E. coli outbreak records; not an archival outbreak photograph."
    },
    {
      "id": "cryptosporidium-parvum-cdc",
      "local_path": "../../assets/visuals/cryptosporidium-parvum-cdc.jpg",
      "source_url": "https://wwwn.cdc.gov/phil/Details.aspx?pid=4384",
      "rights": "CDC public domain",
      "credit": "CDC/Dr. Peter Drotman Cryptosporidium parvum photomicrograph",
      "alt": "Photomicrograph showing Cryptosporidium parvum organisms.",
      "usage_start_year": 1993,
      "usage_end_year": 2026,
      "temporal_note": "Pathogen-context image for post-1980s cryptosporidiosis outbreak records."
    },
    {
      "id": "deer-mouse-hantavirus",
      "local_path": "../../assets/visuals/deer-mouse-hantavirus.jpg",
      "source_url": "https://wwwn.cdc.gov/phil/Details.aspx?pid=1138",
      "rights": "CDC public domain",
      "credit": "CDC Public Health Image Library, North American deer mouse",
      "alt": "North American deer mouse, the reservoir for Sin Nombre hantavirus.",
      "usage_start_year": 1993,
      "usage_end_year": 2026,
      "temporal_note": "Rodent-reservoir ecology visual for U.S. hantavirus records; not a period scene."
    },
    {
      "id": "west-nile-culex-mosquito",
      "local_path": "../../assets/visuals/west-nile-culex-mosquito.jpg",
      "source_url": "https://www.cdc.gov/west-nile-virus/about/index.html",
      "rights": "CDC public domain",
      "credit": "CDC West Nile Virus, Culex mosquito image",
      "alt": "Culex mosquito feeding on a human arm.",
      "usage_start_year": 1999,
      "usage_end_year": 2026,
      "temporal_note": "Vector-context image for West Nile virus outbreaks; not a period scene."
    },
    {
      "id": "anthrax-bacillus",
      "local_path": "../../assets/visuals/anthrax-bacillus.jpg",
      "source_url": "https://wwwn.cdc.gov/phil/Details.aspx?pid=9826",
      "rights": "CDC public domain",
      "credit": "CDC Public Health Image Library, Bacillus anthracis photomicrograph",
      "alt": "Photomicrograph of Bacillus anthracis bacteria.",
      "usage_start_year": 2001,
      "usage_end_year": 2026,
      "temporal_note": "Pathogen-context image for anthrax investigation records; not a mail-attack scene."
    },
    {
      "id": "sars-cov",
      "local_path": "../../assets/visuals/sars-cov.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:SARS_CoV.jpg",
      "rights": "public domain",
      "credit": "CDC/Mary Ng Mah Lee SARS-associated coronavirus micrograph",
      "alt": "Electron micrograph of SARS-associated coronavirus.",
      "usage_start_year": 2003,
      "usage_end_year": 2006,
      "temporal_note": "SARS coronavirus laboratory visual from the first SARS era."
    },
    {
      "id": "h1n1-2009-cdc",
      "local_path": "../../assets/visuals/h1n1-2009-cdc.jpg",
      "source_url": "https://phil.cdc.gov/details.aspx?pid=11214",
      "rights": "CDC public domain",
      "credit": "CDC/C. S. Goldsmith and A. Balish 2009 H1N1 micrograph",
      "alt": "Colorized transmission electron micrograph of 2009 pandemic H1N1 virions.",
      "usage_start_year": 2009,
      "usage_end_year": 2010,
      "temporal_note": "Contemporary 2009 pandemic H1N1 laboratory visual."
    },
    {
      "id": "exserohilum-rostratum-cdc",
      "local_path": "../../assets/visuals/exserohilum-rostratum-cdc.jpg",
      "source_url": "https://phil.cdc.gov/Details.aspx?pid=15148",
      "rights": "CDC public domain",
      "credit": "CDC/James Gathany 2012 Exserohilum rostratum outbreak investigation image",
      "alt": "CDC scientist examining microscopic slides of Exserohilum rostratum during the 2012 fungal meningitis outbreak investigation.",
      "usage_start_year": 2012,
      "usage_end_year": 2012,
      "temporal_note": "Outbreak-specific 2012 fungal meningitis investigation image."
    },
    {
      "id": "ebola-virus-cdc",
      "local_path": "../../assets/visuals/ebola-virus-cdc.jpg",
      "source_url": "https://www.cdc.gov/ebola/about/index.html",
      "rights": "CDC public domain",
      "credit": "CDC/Cynthia Goldsmith Ebola virus micrograph",
      "alt": "Colorized microscopic image of Ebola virus.",
      "usage_start_year": 2014,
      "usage_end_year": 2026,
      "temporal_note": "Pathogen-context image for Ebola preparedness and travel-linked response records."
    },
    {
      "id": "zika-tem",
      "local_path": "../../assets/visuals/zika-tem.png",
      "source_url": "https://commons.wikimedia.org/wiki/File:Zika_EM_CDC_20541.png",
      "rights": "public domain",
      "credit": "CDC/Cynthia Goldsmith Zika virus electron micrograph",
      "alt": "Transmission electron micrograph of Zika virus particles.",
      "usage_start_year": 2015,
      "usage_end_year": 2017,
      "temporal_note": "Zika-era laboratory visual for the 2015-2017 Americas outbreak period."
    },
    {
      "id": "aedes-aegypti-cdc",
      "local_path": "../../assets/visuals/aedes-aegypti-cdc.jpg",
      "source_url": "https://commons.wikimedia.org/wiki/File:Aedes_aegypti_CDC-Gathany.jpg",
      "rights": "public domain",
      "credit": "CDC/James Gathany Aedes aegypti mosquito",
      "alt": "Aedes aegypti mosquito photographed by CDC.",
      "usage_start_year": 2015,
      "usage_end_year": 2017,
      "temporal_note": "Aedes vector context for U.S.-linked Zika transmission."
    },
    {
      "id": "sars-cov-2-cdc",
      "local_path": "../../assets/visuals/sars-cov-2-cdc.png",
      "source_url": "https://commons.wikimedia.org/wiki/File:SARS-CoV-2_(CDC-23311).png",
      "rights": "public domain",
      "credit": "CDC/Alissa Eckert and Dan Higgins SARS-CoV-2 illustration",
      "alt": "CDC illustration of a SARS-CoV-2 particle.",
      "usage_start_year": 2020,
      "usage_end_year": 2026,
      "temporal_note": "COVID-19 era SARS-CoV-2 visual."
    },
    {
      "id": "mpox-virus-2003-cdc",
      "local_path": "../../assets/visuals/mpox-virus-2003-cdc.jpg",
      "source_url": "https://phil.cdc.gov/Details.aspx?pid=22664",
      "rights": "CDC public domain",
      "credit": "CDC/Cynthia S. Goldsmith mpox virus particles from the 2003 prairie dog outbreak",
      "alt": "Electron micrograph of mpox virus particles from the 2003 prairie dog outbreak.",
      "usage_start_year": 2003,
      "usage_end_year": 2026,
      "temporal_note": "2003 outbreak-linked mpox laboratory visual, also valid as pathogen context for later mpox records."
    }
  ],
  "events": [
    {
      "id": "new-england-epidemic-1616",
      "title": "The great dying along the New England coast",
      "start_date": "1616-01-01",
      "end_date": "1619-12-31",
      "date_precision": "range",
      "era_id": "contact-colonial",
      "polity_scope": "Pre-U.S. North America",
      "geography": "Coastal New England Indigenous communities",
      "pathogen_or_syndrome": "Uncertain epidemic mortality event",
      "disease_group": "uncertain",
      "transmission_ecology": "Coastal ecology, trade contact, animal reservoirs, and social disruption under a disputed retrospective diagnosis.",
      "significance_tier": "hero",
      "case_estimate": "Unknown",
      "death_estimate": "Very high in affected communities; precise counts are not recoverable.",
      "uncertainty_note": "The diagnosis is disputed. This entry should be read as a mortality event, not a confirmed pathogen claim.",
      "historical_thesis": "English settlement entered a landscape already altered by epidemic death, which later colonial writers converted into providential narrative.",
      "public_health_response": "No formal response; the source problem is itself part of the historical lesson.",
      "source_ids": [
        "cdc-new-england-1616",
        "cdc-smallpox-history"
      ],
      "asset_ids": [
        "new-england-smith-1616"
      ],
      "related_posts": [
        "disease-in-the-early-colonies-pre"
      ],
      "tags": [
        "indigenous",
        "retrospective-diagnosis",
        "uncertain",
        "unknown/contested",
        "Indigenous",
        "colonial",
        "Indigenous community",
        "coastal community",
        "trade/contact zone"
      ],
      "confidence": "contested",
      "start_year": 1616,
      "end_year": 1619,
      "date_display": "1616-1619",
      "century": "17th century",
      "period_tags": [
        "Indigenous",
        "colonial"
      ],
      "disease_or_condition": "Uncertain epidemic mortality event",
      "pathogen_or_agent": "unknown/contested",
      "transmission_category": "unknown/contested",
      "setting_tags": [
        "Indigenous community",
        "coastal community",
        "trade/contact zone"
      ],
      "modern_location_tags": [
        "Massachusetts",
        "Maine",
        "New Hampshire",
        "New England"
      ],
      "summary_1_sentence": "English settlement entered a landscape already altered by epidemic death, which later colonial writers converted into providential narrative.",
      "historical_context": "English settlement entered a landscape already altered by epidemic death, which later colonial writers converted into providential narrative.",
      "public_health_significance": "No formal response; the source problem is itself part of the historical lesson.",
      "mortality_or_burden_note": "Cases/burden: Unknown Deaths/mortality: Very high in affected communities; precise counts are not recoverable.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "English settlement entered a landscape already altered by epidemic death, which later colonial writers converted into providential narrative.",
          "source_ids": [
            "cdc-new-england-1616",
            "cdc-smallpox-history"
          ],
          "confidence": "contested",
          "claim_type": "timeline teaching summary",
          "notes": "The diagnosis is disputed. This entry should be read as a mortality event, not a confirmed pathogen claim."
        },
        {
          "claim": "No formal response; the source problem is itself part of the historical lesson.",
          "source_ids": [
            "cdc-new-england-1616",
            "cdc-smallpox-history"
          ],
          "confidence": "contested",
          "claim_type": "public-health interpretation",
          "notes": "The diagnosis is disputed. This entry should be read as a mortality event, not a confirmed pathogen claim. Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "new-england-smallpox-1633",
      "title": "Confirmed smallpox in early New England",
      "start_date": "1633-01-01",
      "end_date": "1634-12-31",
      "date_precision": "range",
      "era_id": "contact-colonial",
      "polity_scope": "British North America",
      "geography": "Massachusetts Bay and neighboring Indigenous communities",
      "pathogen_or_syndrome": "Variola virus",
      "disease_group": "smallpox",
      "transmission_ecology": "Respiratory/contact spread in colonial and Indigenous contact zones.",
      "significance_tier": "major",
      "case_estimate": "Unknown",
      "death_estimate": "Severe local mortality, especially among Indigenous communities.",
      "uncertainty_note": "Precise denominators are weak, but smallpox identification is much firmer than for the 1616-1619 epidemic.",
      "historical_thesis": "Smallpox became one of the recurring biological facts of colonial expansion.",
      "public_health_response": "Isolation and avoidance existed, but systematic vaccination was still more than a century away.",
      "source_ids": [
        "cdc-smallpox-history",
        "who-smallpox-eradication"
      ],
      "asset_ids": [
        "new-england-smith-1616"
      ],
      "related_posts": [
        "disease-in-the-early-colonies-pre"
      ],
      "tags": [
        "colonial",
        "indigenous",
        "respiratory",
        "Indigenous",
        "Indigenous community",
        "colonial settlement",
        "household"
      ],
      "confidence": "moderate",
      "start_year": 1633,
      "end_year": 1634,
      "date_display": "1633-1634",
      "century": "17th century",
      "period_tags": [
        "Indigenous",
        "colonial"
      ],
      "disease_or_condition": "Smallpox",
      "pathogen_or_agent": "Variola virus",
      "transmission_category": "respiratory",
      "setting_tags": [
        "Indigenous community",
        "colonial settlement",
        "household"
      ],
      "modern_location_tags": [
        "Massachusetts",
        "New England"
      ],
      "summary_1_sentence": "Smallpox became one of the recurring biological facts of colonial expansion.",
      "historical_context": "Smallpox became one of the recurring biological facts of colonial expansion.",
      "public_health_significance": "Isolation and avoidance existed, but systematic vaccination was still more than a century away.",
      "mortality_or_burden_note": "Cases/burden: Unknown Deaths/mortality: Severe local mortality, especially among Indigenous communities.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Smallpox became one of the recurring biological facts of colonial expansion.",
          "source_ids": [
            "cdc-smallpox-history",
            "who-smallpox-eradication"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Precise denominators are weak, but smallpox identification is much firmer than for the 1616-1619 epidemic."
        },
        {
          "claim": "Isolation and avoidance existed, but systematic vaccination was still more than a century away.",
          "source_ids": [
            "cdc-smallpox-history",
            "who-smallpox-eradication"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "boston-smallpox-1721",
      "title": "Boston's smallpox inoculation fight",
      "start_date": "1721-04-01",
      "end_date": "1722-02-01",
      "date_precision": "month",
      "era_id": "contact-colonial",
      "polity_scope": "British North America",
      "geography": "Boston, Massachusetts",
      "pathogen_or_syndrome": "Variola virus",
      "disease_group": "smallpox",
      "transmission_ecology": "Urban respiratory/contact spread in a port city with a contested preventive intervention.",
      "significance_tier": "hero",
      "case_estimate": "Thousands of infections reported in contemporary accounts",
      "death_estimate": "Hundreds of deaths; exact counts vary by source.",
      "uncertainty_note": "Use as a public-health controversy more than as a clean burden estimate.",
      "historical_thesis": "The inoculation fight is an early American case study in evidence, fear, clergy, medicine, newspapers, and risk tradeoffs.",
      "public_health_response": "Variolation was promoted by Cotton Mather and Zabdiel Boylston and fiercely contested.",
      "source_ids": [
        "cdc-smallpox-history",
        "who-smallpox-eradication"
      ],
      "asset_ids": [
        "boylston-smallpox-inoculation-title"
      ],
      "related_posts": [],
      "tags": [
        "inoculation",
        "public-health-turning-point",
        "risk-communication",
        "respiratory",
        "colonial",
        "port city",
        "urban center",
        "household"
      ],
      "confidence": "moderate",
      "start_year": 1721,
      "end_year": 1722,
      "date_display": "1721-1722",
      "century": "18th century",
      "period_tags": [
        "colonial"
      ],
      "disease_or_condition": "Smallpox",
      "pathogen_or_agent": "Variola virus",
      "transmission_category": "respiratory",
      "setting_tags": [
        "port city",
        "urban center",
        "household"
      ],
      "modern_location_tags": [
        "Massachusetts",
        "Boston"
      ],
      "summary_1_sentence": "The inoculation fight is an early American case study in evidence, fear, clergy, medicine, newspapers, and risk tradeoffs.",
      "historical_context": "The inoculation fight is an early American case study in evidence, fear, clergy, medicine, newspapers, and risk tradeoffs.",
      "public_health_significance": "Variolation was promoted by Cotton Mather and Zabdiel Boylston and fiercely contested.",
      "mortality_or_burden_note": "Cases/burden: Thousands of infections reported in contemporary accounts Deaths/mortality: Hundreds of deaths; exact counts vary by source.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The inoculation fight is an early American case study in evidence, fear, clergy, medicine, newspapers, and risk tradeoffs.",
          "source_ids": [
            "cdc-smallpox-history",
            "who-smallpox-eradication"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Use as a public-health controversy more than as a clean burden estimate."
        },
        {
          "claim": "Variolation was promoted by Cotton Mather and Zabdiel Boylston and fiercely contested.",
          "source_ids": [
            "cdc-smallpox-history",
            "who-smallpox-eradication"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "revolutionary-war-smallpox-1775",
      "title": "Smallpox in the Revolutionary War",
      "start_date": "1775-01-01",
      "end_date": "1782-12-31",
      "date_precision": "range",
      "era_id": "republic-frontier",
      "polity_scope": "Revolutionary-era North America",
      "geography": "Continental Army, Canada campaign, colonies, prisons, and civilian communities",
      "pathogen_or_syndrome": "Variola virus",
      "disease_group": "smallpox",
      "transmission_ecology": "Military crowding, recruit mixing, prisons, refugee movement, and inoculation logistics.",
      "significance_tier": "hero",
      "case_estimate": "Unknown",
      "death_estimate": "Substantial military and civilian mortality; not reducible to a single clean count.",
      "uncertainty_note": "Military and civilian denominators differ; do not merge them casually.",
      "historical_thesis": "The Revolution was fought inside an immunologic battlefield, and Washington's inoculation policy was a strategic public-health intervention.",
      "public_health_response": "Continental Army inoculation became a turning point in military disease control.",
      "source_ids": [
        "cdc-smallpox-history",
        "who-smallpox-eradication"
      ],
      "asset_ids": [
        "washington-crossing"
      ],
      "related_posts": [
        "who-died-of-what-in-the-american",
        "the-american-revolution-was-nearly"
      ],
      "tags": [
        "war",
        "public-health-turning-point",
        "military",
        "respiratory",
        "colonial",
        "early republic",
        "army camp",
        "prison",
        "migration route",
        "urban center"
      ],
      "confidence": "moderate",
      "start_year": 1775,
      "end_year": 1782,
      "date_display": "1775-1782",
      "century": "18th century",
      "period_tags": [
        "colonial",
        "early republic"
      ],
      "disease_or_condition": "Smallpox",
      "pathogen_or_agent": "Variola virus",
      "transmission_category": "respiratory",
      "setting_tags": [
        "army camp",
        "prison",
        "migration route",
        "urban center"
      ],
      "modern_location_tags": [
        "Massachusetts",
        "New York",
        "Pennsylvania",
        "Canada campaign",
        "Continental Army"
      ],
      "summary_1_sentence": "The Revolution was fought inside an immunologic battlefield, and Washington's inoculation policy was a strategic public-health intervention.",
      "historical_context": "The Revolution was fought inside an immunologic battlefield, and Washington's inoculation policy was a strategic public-health intervention.",
      "public_health_significance": "Continental Army inoculation became a turning point in military disease control.",
      "mortality_or_burden_note": "Cases/burden: Unknown Deaths/mortality: Substantial military and civilian mortality; not reducible to a single clean count.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The Revolution was fought inside an immunologic battlefield, and Washington's inoculation policy was a strategic public-health intervention.",
          "source_ids": [
            "cdc-smallpox-history",
            "who-smallpox-eradication"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Military and civilian denominators differ; do not merge them casually."
        },
        {
          "claim": "Continental Army inoculation became a turning point in military disease control.",
          "source_ids": [
            "cdc-smallpox-history",
            "who-smallpox-eradication"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "philadelphia-yellow-fever-1793",
      "title": "Philadelphia yellow fever exposes the early republic",
      "start_date": "1793-08-01",
      "end_date": "1793-11-30",
      "date_precision": "month",
      "era_id": "republic-frontier",
      "polity_scope": "United States",
      "geography": "Philadelphia, Pennsylvania",
      "pathogen_or_syndrome": "Yellow fever virus",
      "disease_group": "yellow-fever",
      "transmission_ecology": "Aedes mosquitoes, summer heat, port traffic, refugees, water storage, and urban political fracture.",
      "significance_tier": "hero",
      "case_estimate": "Tens of thousands affected or displaced",
      "death_estimate": "About 5,000 deaths is the common historical estimate.",
      "uncertainty_note": "Death estimates are far stronger than case estimates.",
      "historical_thesis": "The first capital of the United States was biologically vulnerable because it was also a port, a city, and a political theater.",
      "public_health_response": "Flight, fever hospitals, volunteer nursing, quarantine argument, and competing medical theories.",
      "source_ids": [
        "cdc-mosquito-history",
        "nlm-yellow-fever-primary",
        "nlm-politics-yellow-fever"
      ],
      "asset_ids": [
        "yellow-fever-1793-title-page"
      ],
      "related_posts": [
        "the-first-american-epidemic-how-yellow"
      ],
      "tags": [
        "ports",
        "mosquitoes",
        "public-health-turning-point",
        "vector-borne",
        "early republic",
        "port city",
        "urban center",
        "household"
      ],
      "confidence": "high",
      "start_year": 1793,
      "end_year": 1793,
      "date_display": "1793",
      "century": "18th century",
      "period_tags": [
        "early republic"
      ],
      "disease_or_condition": "Yellow fever",
      "pathogen_or_agent": "Yellow fever virus",
      "transmission_category": "vector-borne",
      "setting_tags": [
        "port city",
        "urban center",
        "household"
      ],
      "modern_location_tags": [
        "Pennsylvania",
        "Philadelphia"
      ],
      "summary_1_sentence": "The first capital of the United States was biologically vulnerable because it was also a port, a city, and a political theater.",
      "historical_context": "The first capital of the United States was biologically vulnerable because it was also a port, a city, and a political theater.",
      "public_health_significance": "Flight, fever hospitals, volunteer nursing, quarantine argument, and competing medical theories.",
      "mortality_or_burden_note": "Cases/burden: Tens of thousands affected or displaced Deaths/mortality: About 5,000 deaths is the common historical estimate.",
      "related_tool_links": [
        {
          "label": "Pathogen Atlas: Yellow fever",
          "href": "../../atlases/pathogen/?q=yellow%20fever"
        }
      ],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The first capital of the United States was biologically vulnerable because it was also a port, a city, and a political theater.",
          "source_ids": [
            "cdc-mosquito-history",
            "nlm-yellow-fever-primary",
            "nlm-politics-yellow-fever"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Death estimates are far stronger than case estimates."
        },
        {
          "claim": "Flight, fever hospitals, volunteer nursing, quarantine argument, and competing medical theories.",
          "source_ids": [
            "cdc-mosquito-history",
            "nlm-yellow-fever-primary",
            "nlm-politics-yellow-fever"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "new-york-cholera-1832",
      "title": "Cholera reaches New York and the United States",
      "start_date": "1832-06-01",
      "end_date": "1832-12-31",
      "date_precision": "month",
      "era_id": "republic-frontier",
      "polity_scope": "United States",
      "geography": "New York City and connected transport routes",
      "pathogen_or_syndrome": "Vibrio cholerae",
      "disease_group": "cholera-enteric",
      "transmission_ecology": "Water, waste, ships, canals, roads, fear, and city growth before modern sanitation.",
      "significance_tier": "hero",
      "case_estimate": "Unknown nationally",
      "death_estimate": "Thousands across affected U.S. cities and routes.",
      "uncertainty_note": "Local counts vary; use event as a system marker unless city-specific records are attached.",
      "historical_thesis": "Cholera made the American city legible as a water-and-waste machine.",
      "public_health_response": "Quarantine, flight, sanitary reform agitation, and competing theories of contagion and miasma.",
      "source_ids": [
        "cdc-cholera-us",
        "cdc-drinking-water"
      ],
      "asset_ids": [
        "john-lea-cholera"
      ],
      "related_posts": [
        "invisible-killers-of-the-oregon-trail"
      ],
      "tags": [
        "water",
        "urban",
        "public-health-turning-point",
        "fecal-oral/waterborne",
        "19th century",
        "port city",
        "urban center",
        "migration route"
      ],
      "confidence": "moderate",
      "start_year": 1832,
      "end_year": 1832,
      "date_display": "1832",
      "century": "19th century",
      "period_tags": [
        "19th century"
      ],
      "disease_or_condition": "Cholera",
      "pathogen_or_agent": "Vibrio cholerae",
      "transmission_category": "fecal-oral/waterborne",
      "setting_tags": [
        "port city",
        "urban center",
        "migration route"
      ],
      "modern_location_tags": [
        "New York",
        "New York City"
      ],
      "summary_1_sentence": "Cholera made the American city legible as a water-and-waste machine.",
      "historical_context": "Cholera made the American city legible as a water-and-waste machine.",
      "public_health_significance": "Quarantine, flight, sanitary reform agitation, and competing theories of contagion and miasma.",
      "mortality_or_burden_note": "Cases/burden: Unknown nationally Deaths/mortality: Thousands across affected U.S. cities and routes.",
      "related_tool_links": [
        {
          "label": "Pathogen Atlas: Cholera",
          "href": "../../atlases/pathogen/?q=cholera"
        }
      ],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Cholera made the American city legible as a water-and-waste machine.",
          "source_ids": [
            "cdc-cholera-us",
            "cdc-drinking-water"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Local counts vary; use event as a system marker unless city-specific records are attached."
        },
        {
          "claim": "Quarantine, flight, sanitary reform agitation, and competing theories of contagion and miasma.",
          "source_ids": [
            "cdc-cholera-us",
            "cdc-drinking-water"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "cholera-second-wave-1849",
      "title": "The 1848-1849 cholera wave follows migration and commerce",
      "start_date": "1848-12-01",
      "end_date": "1849-12-31",
      "date_precision": "range",
      "era_id": "republic-frontier",
      "polity_scope": "United States",
      "geography": "Mississippi Valley, New York, St. Louis, New Orleans, and overland routes",
      "pathogen_or_syndrome": "Vibrio cholerae",
      "disease_group": "cholera-enteric",
      "transmission_ecology": "Riverboats, migration, camps, contaminated water, and explosive urban growth.",
      "significance_tier": "hero",
      "case_estimate": "Unknown",
      "death_estimate": "Thousands; city and route counts differ.",
      "uncertainty_note": "This entry groups a broad wave; city-level child entries can be added later.",
      "historical_thesis": "The disease moved on the same infrastructure Americans celebrated as expansion.",
      "public_health_response": "Municipal sanitation, quarantine, and emergency burials, with little effective water treatment.",
      "source_ids": [
        "cdc-cholera-us",
        "cdc-drinking-water"
      ],
      "asset_ids": [
        "john-lea-cholera"
      ],
      "related_posts": [
        "invisible-killers-of-the-oregon-trail"
      ],
      "tags": [
        "migration",
        "water",
        "frontier",
        "fecal-oral/waterborne",
        "19th century",
        "migration route",
        "river corridor",
        "frontier/settlement",
        "urban center"
      ],
      "confidence": "moderate",
      "start_year": 1848,
      "end_year": 1849,
      "date_display": "1848-1849",
      "century": "19th century",
      "period_tags": [
        "19th century"
      ],
      "disease_or_condition": "Cholera",
      "pathogen_or_agent": "Vibrio cholerae",
      "transmission_category": "fecal-oral/waterborne",
      "setting_tags": [
        "migration route",
        "river corridor",
        "frontier/settlement",
        "urban center"
      ],
      "modern_location_tags": [
        "New York",
        "Missouri",
        "Louisiana",
        "California",
        "Oregon Trail",
        "Mississippi Valley"
      ],
      "summary_1_sentence": "The disease moved on the same infrastructure Americans celebrated as expansion.",
      "historical_context": "The disease moved on the same infrastructure Americans celebrated as expansion.",
      "public_health_significance": "Municipal sanitation, quarantine, and emergency burials, with little effective water treatment.",
      "mortality_or_burden_note": "Cases/burden: Unknown Deaths/mortality: Thousands; city and route counts differ.",
      "related_tool_links": [
        {
          "label": "Pathogen Atlas: Cholera",
          "href": "../../atlases/pathogen/?q=cholera"
        }
      ],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The disease moved on the same infrastructure Americans celebrated as expansion.",
          "source_ids": [
            "cdc-cholera-us",
            "cdc-drinking-water"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "This entry groups a broad wave; city-level child entries can be added later."
        },
        {
          "claim": "Municipal sanitation, quarantine, and emergency burials, with little effective water treatment.",
          "source_ids": [
            "cdc-cholera-us",
            "cdc-drinking-water"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "new-orleans-yellow-fever-1853",
      "title": "New Orleans yellow fever at epidemic scale",
      "start_date": "1853-05-01",
      "end_date": "1853-11-30",
      "date_precision": "month",
      "era_id": "republic-frontier",
      "polity_scope": "United States",
      "geography": "New Orleans, Louisiana",
      "pathogen_or_syndrome": "Yellow fever virus",
      "disease_group": "yellow-fever",
      "transmission_ecology": "Aedes mosquitoes, water storage, port traffic, slavery, immigrant vulnerability, and summer heat.",
      "significance_tier": "hero",
      "case_estimate": "Tens of thousands sick in common historical accounts",
      "death_estimate": "Often summarized around 8,000 deaths.",
      "uncertainty_note": "Burden estimates should be kept source-attached.",
      "historical_thesis": "New Orleans shows yellow fever as urban ecology, labor regime, immigration hazard, and port capitalism at once.",
      "public_health_response": "Quarantine, sanitation arguments, charity hospitals, acclimation myths, and later vector-control lessons.",
      "source_ids": [
        "cdc-mosquito-history",
        "pbs-yellow-fever"
      ],
      "asset_ids": [
        "new-orleans-sanitary-map-1853"
      ],
      "related_posts": [
        "how-mosquitos-killed-napoleons-north"
      ],
      "tags": [
        "ports",
        "slavery",
        "mosquitoes",
        "vector-borne",
        "19th century",
        "port city",
        "urban center",
        "plantation economy"
      ],
      "confidence": "moderate",
      "start_year": 1853,
      "end_year": 1853,
      "date_display": "1853",
      "century": "19th century",
      "period_tags": [
        "19th century"
      ],
      "disease_or_condition": "Yellow fever",
      "pathogen_or_agent": "Yellow fever virus",
      "transmission_category": "vector-borne",
      "setting_tags": [
        "port city",
        "urban center",
        "plantation economy"
      ],
      "modern_location_tags": [
        "Louisiana",
        "New Orleans"
      ],
      "summary_1_sentence": "New Orleans shows yellow fever as urban ecology, labor regime, immigration hazard, and port capitalism at once.",
      "historical_context": "New Orleans shows yellow fever as urban ecology, labor regime, immigration hazard, and port capitalism at once.",
      "public_health_significance": "Quarantine, sanitation arguments, charity hospitals, acclimation myths, and later vector-control lessons.",
      "mortality_or_burden_note": "Cases/burden: Tens of thousands sick in common historical accounts Deaths/mortality: Often summarized around 8,000 deaths.",
      "related_tool_links": [
        {
          "label": "Pathogen Atlas: Yellow fever",
          "href": "../../atlases/pathogen/?q=yellow%20fever"
        }
      ],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "New Orleans shows yellow fever as urban ecology, labor regime, immigration hazard, and port capitalism at once.",
          "source_ids": [
            "cdc-mosquito-history",
            "pbs-yellow-fever"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Burden estimates should be kept source-attached."
        },
        {
          "claim": "Quarantine, sanitation arguments, charity hospitals, acclimation myths, and later vector-control lessons.",
          "source_ids": [
            "cdc-mosquito-history",
            "pbs-yellow-fever"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "civil-war-camp-disease-1861",
      "title": "Civil War camps become disease amplifiers",
      "start_date": "1861-01-01",
      "end_date": "1865-12-31",
      "date_precision": "range",
      "era_id": "republic-frontier",
      "polity_scope": "United States",
      "geography": "Union and Confederate camps, hospitals, prisons, and transport routes",
      "pathogen_or_syndrome": "Camp diseases and wound infections",
      "disease_group": "vaccine-preventable",
      "transmission_ecology": "Recruit mixing, crowding, poor latrines, contaminated water, exposure, malnutrition, and military logistics.",
      "significance_tier": "hero",
      "case_estimate": "Very large military disease burden; diagnosis categories vary by army returns.",
      "death_estimate": "Disease killed more soldiers than battle, but exact pathogen-specific counts vary.",
      "uncertainty_note": "The exact modern diagnoses are uncertain: nineteenth-century categories such as camp fever, diarrhea, dysentery, and pneumonia do not map cleanly onto present-day pathogen labels.",
      "historical_thesis": "The Civil War was an epidemiologic infrastructure crisis wearing a military uniform.",
      "public_health_response": "Sanitary commissions, camp hygiene, hospital reform, vaccination, and military medical reporting.",
      "source_ids": [
        "nps-civil-war-medicine",
        "nlm-mshwr"
      ],
      "asset_ids": [
        "civil-war-field-hospital-1862"
      ],
      "related_posts": [
        "who-died-of-what-in-the-american"
      ],
      "tags": [
        "war",
        "military",
        "public-health-turning-point",
        "unknown/contested",
        "19th century",
        "army camp",
        "hospital",
        "prison",
        "migration route"
      ],
      "confidence": "moderate",
      "start_year": 1861,
      "end_year": 1865,
      "date_display": "1861-1865",
      "century": "19th century",
      "period_tags": [
        "19th century"
      ],
      "disease_or_condition": "Camp diseases and wound infections",
      "pathogen_or_agent": "mixed/partly unknown",
      "transmission_category": "unknown/contested",
      "setting_tags": [
        "army camp",
        "hospital",
        "prison",
        "migration route"
      ],
      "modern_location_tags": [
        "United States",
        "Confederacy",
        "Union Army",
        "Confederate Army"
      ],
      "summary_1_sentence": "Civil War camps turned crowding, bad water, poor waste disposal, and recruit mixing into a military disease machine.",
      "historical_context": "The Civil War was an epidemiologic infrastructure crisis wearing a military uniform.",
      "public_health_significance": "Sanitary commissions, camp hygiene, hospital reform, vaccination, and military medical reporting.",
      "mortality_or_burden_note": "Cases/burden: Very large military disease burden; diagnosis categories vary by army returns. Deaths/mortality: Disease killed more soldiers than battle, but exact pathogen-specific counts vary.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Civil War camps turned crowding, bad water, poor waste disposal, and recruit mixing into a military disease machine.",
          "source_ids": [
            "nps-civil-war-medicine",
            "nlm-mshwr"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "The exact modern diagnoses are uncertain: nineteenth-century categories such as camp fever, diarrhea, dysentery, and pneumonia do not map cleanly onto present-day pathogen labels."
        },
        {
          "claim": "Sanitary commissions, camp hygiene, hospital reform, vaccination, and military medical reporting.",
          "source_ids": [
            "nps-civil-war-medicine",
            "nlm-mshwr"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "civil-war-contraband-smallpox-1862",
      "title": "Smallpox and emancipation's refugee crisis",
      "start_date": "1862-01-01",
      "end_date": "1865-12-31",
      "date_precision": "range",
      "era_id": "republic-frontier",
      "polity_scope": "United States",
      "geography": "Contraband camps, Union lines, Washington region, Mississippi Valley, and Gulf South",
      "pathogen_or_syndrome": "Variola virus",
      "disease_group": "smallpox",
      "transmission_ecology": "Refugee crowding, disrupted care, poverty, military movement, and uneven vaccination.",
      "significance_tier": "major",
      "case_estimate": "Unknown",
      "death_estimate": "Substantial but not captured in one stable national denominator.",
      "uncertainty_note": "Use freedpeople-specific scholarship before publishing exact totals.",
      "historical_thesis": "Emancipation was also a public-health emergency created by war, displacement, and state neglect.",
      "public_health_response": "Vaccination, camp hospitals, Freedmen's Bureau medical work, and uneven relief.",
      "source_ids": [
        "downs-sick-from-freedom-smallpox",
        "nara-freedmens-bureau",
        "cdc-smallpox-history"
      ],
      "asset_ids": [
        "civil-war-field-hospital-1862"
      ],
      "related_posts": [
        "who-died-of-what-in-the-american"
      ],
      "tags": [
        "war",
        "refugees",
        "slavery",
        "respiratory",
        "19th century",
        "refugee camp",
        "army camp",
        "hospital",
        "plantation"
      ],
      "confidence": "moderate",
      "start_year": 1862,
      "end_year": 1865,
      "date_display": "1862-1868",
      "century": "19th century",
      "period_tags": [
        "19th century"
      ],
      "disease_or_condition": "Smallpox among displaced freedpeople",
      "pathogen_or_agent": "Variola virus",
      "transmission_category": "respiratory",
      "setting_tags": [
        "refugee camp",
        "army camp",
        "hospital",
        "plantation"
      ],
      "modern_location_tags": [
        "Washington DC",
        "Virginia",
        "Mississippi Valley",
        "Gulf South"
      ],
      "summary_1_sentence": "Smallpox among formerly enslaved people shows emancipation as a medical crisis as well as a political transformation.",
      "historical_context": "Emancipation was also a public-health emergency created by war, displacement, and state neglect.",
      "public_health_significance": "Vaccination, camp hospitals, Freedmen's Bureau medical work, and uneven relief.",
      "mortality_or_burden_note": "Cases/burden: Unknown Deaths/mortality: Substantial but not captured in one stable national denominator.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Smallpox among formerly enslaved people shows emancipation as a medical crisis as well as a political transformation.",
          "source_ids": [
            "downs-sick-from-freedom-smallpox",
            "nara-freedmens-bureau",
            "cdc-smallpox-history"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Use freedpeople-specific scholarship before publishing exact totals."
        },
        {
          "claim": "Vaccination, camp hospitals, Freedmen's Bureau medical work, and uneven relief.",
          "source_ids": [
            "downs-sick-from-freedom-smallpox",
            "nara-freedmens-bureau",
            "cdc-smallpox-history"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "mississippi-valley-yellow-fever-1878",
      "title": "The Mississippi Valley yellow fever catastrophe",
      "start_date": "1878-07-01",
      "end_date": "1878-12-31",
      "date_precision": "month",
      "era_id": "republic-frontier",
      "polity_scope": "United States",
      "geography": "New Orleans, Memphis, Vicksburg, and Mississippi Valley towns",
      "pathogen_or_syndrome": "Yellow fever virus",
      "disease_group": "yellow-fever",
      "transmission_ecology": "River commerce, refugees, mosquitoes, quarantine breakdown, and urban inequality.",
      "significance_tier": "hero",
      "case_estimate": "More than 100,000 cases in broad historical summaries",
      "death_estimate": "Often summarized around 20,000 deaths.",
      "uncertainty_note": "Counts differ by geography and source; keep estimates labeled.",
      "historical_thesis": "The epidemic made the river system visible as disease infrastructure.",
      "public_health_response": "Shotgun quarantines, relief committees, flight, charity, and eventual momentum toward stronger public-health institutions.",
      "source_ids": [
        "cdc-mosquito-history",
        "pbs-yellow-fever"
      ],
      "asset_ids": [
        "quarantine-notice-1878"
      ],
      "related_posts": [],
      "tags": [
        "quarantine",
        "river",
        "public-health-turning-point",
        "vector-borne",
        "19th century",
        "port city",
        "river corridor",
        "urban center",
        "rural community"
      ],
      "confidence": "moderate",
      "start_year": 1878,
      "end_year": 1878,
      "date_display": "1878",
      "century": "19th century",
      "period_tags": [
        "19th century"
      ],
      "disease_or_condition": "Yellow fever",
      "pathogen_or_agent": "Yellow fever virus",
      "transmission_category": "vector-borne",
      "setting_tags": [
        "port city",
        "river corridor",
        "urban center",
        "rural community"
      ],
      "modern_location_tags": [
        "Louisiana",
        "Tennessee",
        "Mississippi",
        "Mississippi Valley"
      ],
      "summary_1_sentence": "The epidemic made the river system visible as disease infrastructure.",
      "historical_context": "The epidemic made the river system visible as disease infrastructure.",
      "public_health_significance": "Shotgun quarantines, relief committees, flight, charity, and eventual momentum toward stronger public-health institutions.",
      "mortality_or_burden_note": "Cases/burden: More than 100,000 cases in broad historical summaries Deaths/mortality: Often summarized around 20,000 deaths.",
      "related_tool_links": [
        {
          "label": "Pathogen Atlas: Yellow fever",
          "href": "../../atlases/pathogen/?q=yellow%20fever"
        }
      ],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The epidemic made the river system visible as disease infrastructure.",
          "source_ids": [
            "cdc-mosquito-history",
            "pbs-yellow-fever"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Counts differ by geography and source; keep estimates labeled."
        },
        {
          "claim": "Shotgun quarantines, relief committees, flight, charity, and eventual momentum toward stronger public-health institutions.",
          "source_ids": [
            "cdc-mosquito-history",
            "pbs-yellow-fever"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "spanish-american-war-typhoid-1898",
      "title": "Typhoid fever in the Spanish-American War camps",
      "start_date": "1898-01-01",
      "end_date": "1898-12-31",
      "date_precision": "year",
      "era_id": "republic-frontier",
      "polity_scope": "United States military",
      "geography": "U.S. Army camps during the Spanish-American War",
      "pathogen_or_syndrome": "Salmonella enterica serovar Typhi",
      "disease_group": "cholera-enteric",
      "transmission_ecology": "Military crowding, contaminated water, poor waste management, flies, and rapid mobilization.",
      "significance_tier": "major",
      "case_estimate": "Large military burden",
      "death_estimate": "Substantial military mortality but source-specific counts vary.",
      "uncertainty_note": "Needs Army commission records for exact publication-grade numbers.",
      "historical_thesis": "The U.S. could project military power faster than it could build sanitary camps.",
      "public_health_response": "Camp sanitation reform, water protection, and later typhoid vaccination became military priorities.",
      "source_ids": [
        "cdc-drinking-water",
        "cdc-safer-foods"
      ],
      "asset_ids": [
        "camp-alger-1898"
      ],
      "related_posts": [],
      "tags": [
        "war",
        "water",
        "public-health-turning-point",
        "fecal-oral/waterborne",
        "19th century",
        "Progressive Era",
        "army camp",
        "hospital"
      ],
      "confidence": "moderate",
      "start_year": 1898,
      "end_year": 1898,
      "date_display": "1898",
      "century": "19th century",
      "period_tags": [
        "19th century",
        "Progressive Era"
      ],
      "disease_or_condition": "Typhoid fever",
      "pathogen_or_agent": "Salmonella enterica serovar Typhi",
      "transmission_category": "fecal-oral/waterborne",
      "setting_tags": [
        "army camp",
        "hospital"
      ],
      "modern_location_tags": [
        "United States Army camps"
      ],
      "summary_1_sentence": "The U.S. could project military power faster than it could build sanitary camps.",
      "historical_context": "The U.S. could project military power faster than it could build sanitary camps.",
      "public_health_significance": "Camp sanitation reform, water protection, and later typhoid vaccination became military priorities.",
      "mortality_or_burden_note": "Cases/burden: Large military burden Deaths/mortality: Substantial military mortality but source-specific counts vary.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The U.S. could project military power faster than it could build sanitary camps.",
          "source_ids": [
            "cdc-drinking-water",
            "cdc-safer-foods"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Needs Army commission records for exact publication-grade numbers."
        },
        {
          "claim": "Camp sanitation reform, water protection, and later typhoid vaccination became military priorities.",
          "source_ids": [
            "cdc-drinking-water",
            "cdc-safer-foods"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "san-francisco-plague-1900",
      "title": "Plague at the Golden Gate",
      "start_date": "1900-03-01",
      "end_date": "1908-12-31",
      "date_precision": "range",
      "era_id": "germ-state",
      "polity_scope": "United States",
      "geography": "San Francisco, California, especially Chinatown and later California rodent ecology",
      "pathogen_or_syndrome": "Yersinia pestis",
      "disease_group": "zoonotic-vector",
      "transmission_ecology": "Steamships, rats, fleas, racism, denial, urban sanitation, and eventual sylvatic reservoir establishment.",
      "significance_tier": "hero",
      "case_estimate": "Over 100 human cases in historical summaries",
      "death_estimate": "More than 100 deaths in the early San Francisco plague era.",
      "uncertainty_note": "Distinguish human urban cases from later wildlife reservoir ecology.",
      "historical_thesis": "The plague did not merely arrive in America; it exposed the politics that decide whether evidence is allowed to exist.",
      "public_health_response": "Federal investigation, quarantine, discriminatory enforcement, sanitation campaigns, rat control, and surveillance.",
      "source_ids": [
        "cdc-plague-us",
        "niaid-sf-plague"
      ],
      "asset_ids": [
        "plague-ship-hoffman",
        "yersinia-pestis"
      ],
      "related_posts": [],
      "tags": [
        "plague",
        "racism",
        "ports",
        "public-health-turning-point",
        "zoonotic/environmental",
        "Progressive Era",
        "port city",
        "urban center",
        "Chinatown",
        "laboratory"
      ],
      "confidence": "high",
      "start_year": 1900,
      "end_year": 1908,
      "date_display": "1900-1908",
      "century": "20th century",
      "period_tags": [
        "Progressive Era"
      ],
      "disease_or_condition": "Plague",
      "pathogen_or_agent": "Yersinia pestis",
      "transmission_category": "zoonotic/environmental",
      "setting_tags": [
        "port city",
        "urban center",
        "Chinatown",
        "laboratory"
      ],
      "modern_location_tags": [
        "California",
        "San Francisco"
      ],
      "summary_1_sentence": "The plague did not merely arrive in America; it exposed the politics that decide whether evidence is allowed to exist.",
      "historical_context": "The plague did not merely arrive in America; it exposed the politics that decide whether evidence is allowed to exist.",
      "public_health_significance": "Federal investigation, quarantine, discriminatory enforcement, sanitation campaigns, rat control, and surveillance.",
      "mortality_or_burden_note": "Cases/burden: Over 100 human cases in historical summaries Deaths/mortality: More than 100 deaths in the early San Francisco plague era.",
      "related_tool_links": [
        {
          "label": "Pathogen Atlas: Plague",
          "href": "../../atlases/pathogen/?q=plague"
        }
      ],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The plague did not merely arrive in America; it exposed the politics that decide whether evidence is allowed to exist.",
          "source_ids": [
            "cdc-plague-us",
            "niaid-sf-plague"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Distinguish human urban cases from later wildlife reservoir ecology."
        },
        {
          "claim": "Federal investigation, quarantine, discriminatory enforcement, sanitation campaigns, rat control, and surveillance.",
          "source_ids": [
            "cdc-plague-us",
            "niaid-sf-plague"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "tuberculosis-movement-1904",
      "title": "The tuberculosis movement makes chronic disease public health work",
      "start_date": "1904-01-01",
      "end_date": "1953-12-31",
      "date_precision": "year",
      "polity_scope": "United States",
      "geography": "U.S. sanatoria, municipal reporting systems, and anti-tuberculosis campaigns",
      "pathogen_or_syndrome": "Mycobacterium tuberculosis",
      "disease_group": "respiratory",
      "transmission_ecology": "Airborne transmission, household exposure, crowded housing, sanatoria, reporting rules, and public education.",
      "significance_tier": "hero",
      "case_estimate": "Chronic national burden rather than a single outbreak; CDC notes first nationwide report counted 84,304 U.S. TB cases in 1953.",
      "death_estimate": "TB was a major U.S. and European cause of death before antibiotics; city- or year-specific mortality requires local vital statistics.",
      "uncertainty_note": "This is a public-health movement entry, not a single outbreak; burden claims need city/year-specific vital-statistics sources.",
      "historical_thesis": "Tuberculosis was not a single explosive outbreak; it was a chronic epidemic that forced public health to build institutions for reporting, isolation, housing reform, sanatoria, and public education.",
      "public_health_response": "The anti-tuberculosis movement helped define public health as long-term maintenance: surveillance, education, built environments, and institutions rather than only emergency quarantine.",
      "source_ids": [
        "cdc-tb-history",
        "nlm-tb-ephemera"
      ],
      "asset_ids": [
        "microscope-wellcome"
      ],
      "related_posts": [],
      "tags": [
        "tuberculosis",
        "sanatoria",
        "public-health-turning-point",
        "chronic-disease",
        "respiratory",
        "Progressive Era",
        "sanatorium",
        "urban center",
        "household",
        "public-health campaign"
      ],
      "start_year": 1904,
      "end_year": 1953,
      "date_display": "1904 and after",
      "century": "20th century",
      "era_id": "germ-state",
      "period_tags": [
        "Progressive Era"
      ],
      "disease_or_condition": "Tuberculosis public-health movement",
      "pathogen_or_agent": "Mycobacterium tuberculosis",
      "transmission_category": "respiratory",
      "setting_tags": [
        "sanatorium",
        "urban center",
        "household",
        "public-health campaign"
      ],
      "modern_location_tags": [
        "New York",
        "North Carolina",
        "United States"
      ],
      "summary_1_sentence": "The Progressive Era tuberculosis movement made chronic airborne disease a problem of reporting, sanatoria, public education, and municipal responsibility.",
      "historical_context": "Tuberculosis was not a single explosive outbreak; it was a chronic epidemic that forced public health to build institutions for reporting, isolation, housing reform, sanatoria, and public education.",
      "public_health_significance": "The anti-tuberculosis movement helped define public health as long-term maintenance: surveillance, education, built environments, and institutions rather than only emergency quarantine.",
      "mortality_or_burden_note": "Cases/burden: Chronic national burden rather than a single outbreak; CDC notes first nationwide report counted 84,304 U.S. TB cases in 1953. Deaths/mortality: TB was a major U.S. and European cause of death before antibiotics; city- or year-specific mortality requires local vital statistics.",
      "confidence": "moderate",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The Progressive Era tuberculosis movement made chronic airborne disease a problem of reporting, sanatoria, public education, and municipal responsibility.",
          "source_ids": [
            "cdc-tb-history",
            "nlm-tb-ephemera"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "This is a public-health movement entry, not a single outbreak; burden claims need city/year-specific vital-statistics sources."
        },
        {
          "claim": "The anti-tuberculosis movement helped define public health as long-term maintenance: surveillance, education, built environments, and institutions rather than only emergency quarantine.",
          "source_ids": [
            "cdc-tb-history",
            "nlm-tb-ephemera"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "typhoid-mary-1906",
      "title": "Typhoid Mary and the carrier problem",
      "start_date": "1906-08-01",
      "end_date": "1915-03-01",
      "date_precision": "range",
      "era_id": "germ-state",
      "polity_scope": "United States",
      "geography": "New York City and Long Island households",
      "pathogen_or_syndrome": "Salmonella enterica serovar Typhi",
      "disease_group": "cholera-enteric",
      "transmission_ecology": "Asymptomatic carriage, domestic labor, food handling, class, and coercive isolation.",
      "significance_tier": "major",
      "case_estimate": "Dozens attributed in historical accounts",
      "death_estimate": "Several deaths attributed in historical accounts",
      "uncertainty_note": "Attribution numbers vary and should be sourced carefully.",
      "historical_thesis": "The carrier problem forced public health to confront the difference between dangerousness, blame, and due process.",
      "public_health_response": "Laboratory investigation, exclusion from food work, and long-term involuntary isolation.",
      "source_ids": [
        "cdc-drinking-water",
        "cdc-safer-foods"
      ],
      "asset_ids": [
        "typhoid-mary-hospital"
      ],
      "related_posts": [],
      "tags": [
        "foodborne",
        "carrier",
        "public-health-turning-point",
        "Progressive Era",
        "household",
        "food work",
        "hospital"
      ],
      "confidence": "moderate",
      "start_year": 1906,
      "end_year": 1915,
      "date_display": "1906-1915",
      "century": "20th century",
      "period_tags": [
        "Progressive Era"
      ],
      "disease_or_condition": "Typhoid fever carrier investigation",
      "pathogen_or_agent": "Salmonella enterica serovar Typhi",
      "transmission_category": "foodborne",
      "setting_tags": [
        "household",
        "food work",
        "hospital"
      ],
      "modern_location_tags": [
        "New York",
        "Long Island",
        "New York City"
      ],
      "summary_1_sentence": "The carrier problem forced public health to confront the difference between dangerousness, blame, and due process.",
      "historical_context": "The carrier problem forced public health to confront the difference between dangerousness, blame, and due process.",
      "public_health_significance": "Laboratory investigation, exclusion from food work, and long-term involuntary isolation.",
      "mortality_or_burden_note": "Cases/burden: Dozens attributed in historical accounts Deaths/mortality: Several deaths attributed in historical accounts",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The carrier problem forced public health to confront the difference between dangerousness, blame, and due process.",
          "source_ids": [
            "cdc-drinking-water",
            "cdc-safer-foods"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Attribution numbers vary and should be sourced carefully."
        },
        {
          "claim": "Laboratory investigation, exclusion from food work, and long-term involuntary isolation.",
          "source_ids": [
            "cdc-drinking-water",
            "cdc-safer-foods"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "water-typhoid-decline-1908",
      "title": "Water treatment begins to break typhoid's urban grip",
      "start_date": "1908-01-01",
      "end_date": "1920-12-31",
      "date_precision": "range",
      "era_id": "germ-state",
      "polity_scope": "United States",
      "geography": "Jersey City and expanding U.S. municipal water systems",
      "pathogen_or_syndrome": "Salmonella enterica serovar Typhi",
      "disease_group": "cholera-enteric",
      "transmission_ecology": "Municipal water, sewage, filtration, chlorination, and urban governance.",
      "significance_tier": "major",
      "case_estimate": "CDC summarizes typhoid incidence decline from about 100 per 100,000 in 1900 to 33.8 per 100,000 in 1920.",
      "death_estimate": "Mortality fell with safer water and sanitation.",
      "uncertainty_note": "This is a turning-point entry rather than a single outbreak.",
      "historical_thesis": "Public health often wins by making future epidemics disappear from the archive.",
      "public_health_response": "Filtration, chlorination, source protection, sewerage, and routine municipal treatment.",
      "source_ids": [
        "cdc-drinking-water",
        "cdc-safer-foods"
      ],
      "asset_ids": [
        "typhoid-carrier-poster"
      ],
      "related_posts": [],
      "tags": [
        "water",
        "public-health-turning-point",
        "infrastructure",
        "fecal-oral/waterborne",
        "Progressive Era",
        "urban center",
        "water system",
        "municipal infrastructure"
      ],
      "confidence": "high",
      "start_year": 1908,
      "end_year": 1920,
      "date_display": "1908-1920",
      "century": "20th century",
      "period_tags": [
        "Progressive Era"
      ],
      "disease_or_condition": "Typhoid fever and urban waterborne disease",
      "pathogen_or_agent": "Salmonella enterica serovar Typhi",
      "transmission_category": "fecal-oral/waterborne",
      "setting_tags": [
        "urban center",
        "water system",
        "municipal infrastructure"
      ],
      "modern_location_tags": [
        "New Jersey",
        "Jersey City",
        "United States"
      ],
      "summary_1_sentence": "Public health often wins by making future epidemics disappear from the archive.",
      "historical_context": "Public health often wins by making future epidemics disappear from the archive.",
      "public_health_significance": "Filtration, chlorination, source protection, sewerage, and routine municipal treatment.",
      "mortality_or_burden_note": "Cases/burden: CDC summarizes typhoid incidence decline from about 100 per 100,000 in 1900 to 33.8 per 100,000 in 1920. Deaths/mortality: Mortality fell with safer water and sanitation.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Public health often wins by making future epidemics disappear from the archive.",
          "source_ids": [
            "cdc-drinking-water",
            "cdc-safer-foods"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "This is a turning-point entry rather than a single outbreak."
        },
        {
          "claim": "Filtration, chlorination, source protection, sewerage, and routine municipal treatment.",
          "source_ids": [
            "cdc-drinking-water",
            "cdc-safer-foods"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "new-york-polio-1916",
      "title": "New York's terrifying 1916 polio epidemic",
      "start_date": "1916-06-01",
      "end_date": "1916-11-30",
      "date_precision": "month",
      "era_id": "germ-state",
      "polity_scope": "United States",
      "geography": "New York City and northeastern spread",
      "pathogen_or_syndrome": "Poliovirus",
      "disease_group": "vaccine-preventable",
      "transmission_ecology": "Fecal-oral transmission, summer seasonality, urban fear, child paralysis, and quarantine.",
      "significance_tier": "major",
      "case_estimate": "Thousands of cases in New York City and beyond",
      "death_estimate": "Thousands nationally in broad historical summaries.",
      "uncertainty_note": "Use city and national counts separately.",
      "historical_thesis": "Polio turned modern childhood into a seasonal terror before vaccination made that fear historically alien.",
      "public_health_response": "Quarantine, case reporting, school and public gathering restrictions, and later vaccine research.",
      "source_ids": [
        "cdc-polio-museum",
        "cdc-polio-pinkbook"
      ],
      "asset_ids": [
        "poliovirus-cdc-tem"
      ],
      "related_posts": [],
      "tags": [
        "children",
        "quarantine",
        "public-health-turning-point",
        "fecal-oral/waterborne",
        "Progressive Era",
        "20th century",
        "urban center",
        "school",
        "household"
      ],
      "confidence": "moderate",
      "start_year": 1916,
      "end_year": 1916,
      "date_display": "1916",
      "century": "20th century",
      "period_tags": [
        "Progressive Era",
        "20th century"
      ],
      "disease_or_condition": "Poliomyelitis",
      "pathogen_or_agent": "Poliovirus",
      "transmission_category": "fecal-oral/waterborne",
      "setting_tags": [
        "urban center",
        "school",
        "household"
      ],
      "modern_location_tags": [
        "New York",
        "New York City",
        "Northeast"
      ],
      "summary_1_sentence": "Polio turned modern childhood into a seasonal terror before vaccination made that fear historically alien.",
      "historical_context": "Polio turned modern childhood into a seasonal terror before vaccination made that fear historically alien.",
      "public_health_significance": "Quarantine, case reporting, school and public gathering restrictions, and later vaccine research.",
      "mortality_or_burden_note": "Cases/burden: Thousands of cases in New York City and beyond Deaths/mortality: Thousands nationally in broad historical summaries.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Polio turned modern childhood into a seasonal terror before vaccination made that fear historically alien.",
          "source_ids": [
            "cdc-polio-museum",
            "cdc-polio-pinkbook"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Use city and national counts separately."
        },
        {
          "claim": "Quarantine, case reporting, school and public gathering restrictions, and later vaccine research.",
          "source_ids": [
            "cdc-polio-museum",
            "cdc-polio-pinkbook"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "influenza-1918",
      "title": "The 1918 influenza pandemic in the United States",
      "start_date": "1918-03-01",
      "end_date": "1919-06-30",
      "date_precision": "month",
      "era_id": "germ-state",
      "polity_scope": "United States",
      "geography": "Nationwide, with military camps, cities, reservations, and rural communities",
      "pathogen_or_syndrome": "Influenza A(H1N1)",
      "disease_group": "respiratory",
      "transmission_ecology": "War mobilization, troop ships, camps, cities, household crowding, and global respiratory spread.",
      "significance_tier": "hero",
      "case_estimate": "Tens of millions infected in the United States",
      "death_estimate": "About 675,000 deaths in the United States is the conventional estimate.",
      "uncertainty_note": "Mortality estimates are modeled from incomplete records.",
      "historical_thesis": "The pandemic was not a single wave of flu; it was war, movement, censorship, pneumonia, and public health improvisation.",
      "public_health_response": "Closures, masks, isolation, bans on gatherings, nursing mobilization, and local health orders.",
      "source_ids": [
        "cdc-1918-eid",
        "cdc-1918-timeline"
      ],
      "asset_ids": [
        "influenza-1918-seattle-masks"
      ],
      "related_posts": [],
      "tags": [
        "pandemic",
        "war",
        "public-health-turning-point",
        "respiratory",
        "20th century",
        "army camp",
        "urban center",
        "reservation",
        "household",
        "rural community"
      ],
      "confidence": "high",
      "start_year": 1918,
      "end_year": 1919,
      "date_display": "1918-1919",
      "century": "20th century",
      "period_tags": [
        "20th century"
      ],
      "disease_or_condition": "Influenza pandemic",
      "pathogen_or_agent": "Influenza A(H1N1)",
      "transmission_category": "respiratory",
      "setting_tags": [
        "army camp",
        "urban center",
        "reservation",
        "household",
        "rural community"
      ],
      "modern_location_tags": [
        "United States",
        "Washington",
        "Kansas",
        "New York",
        "reservations"
      ],
      "summary_1_sentence": "The pandemic was not a single wave of flu; it was war, movement, censorship, pneumonia, and public health improvisation.",
      "historical_context": "The pandemic was not a single wave of flu; it was war, movement, censorship, pneumonia, and public health improvisation.",
      "public_health_significance": "Closures, masks, isolation, bans on gatherings, nursing mobilization, and local health orders.",
      "mortality_or_burden_note": "Cases/burden: Tens of millions infected in the United States Deaths/mortality: About 675,000 deaths in the United States is the conventional estimate.",
      "related_tool_links": [
        {
          "label": "Pathogen Atlas: Influenza",
          "href": "../../atlases/pathogen/?q=influenza"
        }
      ],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The pandemic was not a single wave of flu; it was war, movement, censorship, pneumonia, and public health improvisation.",
          "source_ids": [
            "cdc-1918-eid",
            "cdc-1918-timeline"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Mortality estimates are modeled from incomplete records."
        },
        {
          "claim": "Closures, masks, isolation, bans on gatherings, nursing mobilization, and local health orders.",
          "source_ids": [
            "cdc-1918-eid",
            "cdc-1918-timeline"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "los-angeles-plague-1924",
      "title": "Los Angeles pneumonic plague",
      "start_date": "1924-10-01",
      "end_date": "1924-11-30",
      "date_precision": "month",
      "era_id": "germ-state",
      "polity_scope": "United States",
      "geography": "Los Angeles, California",
      "pathogen_or_syndrome": "Yersinia pestis",
      "disease_group": "zoonotic-vector",
      "transmission_ecology": "Urban rodent ecology, occupational exposure, household spread, and respiratory transmission in pneumonic cases.",
      "significance_tier": "major",
      "case_estimate": "Dozens in historical summaries",
      "death_estimate": "Dozens in historical summaries",
      "uncertainty_note": "CDC plague history gives the long-term frame; local exact counts need city-level sourcing.",
      "historical_thesis": "Plague's American story did not end at San Francisco; it settled into western ecology and could still erupt in cities.",
      "public_health_response": "Case isolation, contact tracing, rat control, quarantine, and neighborhood sanitation.",
      "source_ids": [
        "cdc-plague-us",
        "niaid-sf-plague"
      ],
      "asset_ids": [
        "plague-ship-hoffman",
        "yersinia-pestis"
      ],
      "related_posts": [],
      "tags": [
        "plague",
        "urban",
        "regional",
        "zoonotic/environmental",
        "20th century",
        "urban center",
        "household",
        "laboratory"
      ],
      "confidence": "moderate",
      "start_year": 1924,
      "end_year": 1924,
      "date_display": "1924",
      "century": "20th century",
      "period_tags": [
        "20th century"
      ],
      "disease_or_condition": "Pneumonic plague",
      "pathogen_or_agent": "Yersinia pestis",
      "transmission_category": "zoonotic/environmental",
      "setting_tags": [
        "urban center",
        "household",
        "laboratory"
      ],
      "modern_location_tags": [
        "California",
        "Los Angeles"
      ],
      "summary_1_sentence": "Plague's American story did not end at San Francisco; it settled into western ecology and could still erupt in cities.",
      "historical_context": "Plague's American story did not end at San Francisco; it settled into western ecology and could still erupt in cities.",
      "public_health_significance": "Case isolation, contact tracing, rat control, quarantine, and neighborhood sanitation.",
      "mortality_or_burden_note": "Cases/burden: Dozens in historical summaries Deaths/mortality: Dozens in historical summaries",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Plague's American story did not end at San Francisco; it settled into western ecology and could still erupt in cities.",
          "source_ids": [
            "cdc-plague-us",
            "niaid-sf-plague"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "CDC plague history gives the long-term frame; local exact counts need city-level sourcing."
        },
        {
          "claim": "Case isolation, contact tracing, rat control, quarantine, and neighborhood sanitation.",
          "source_ids": [
            "cdc-plague-us",
            "niaid-sf-plague"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "new-york-smallpox-1947",
      "title": "The 1947 New York City smallpox scare",
      "start_date": "1947-03-01",
      "end_date": "1947-05-31",
      "date_precision": "month",
      "era_id": "germ-state",
      "polity_scope": "United States",
      "geography": "New York City, New York",
      "pathogen_or_syndrome": "Variola virus",
      "disease_group": "smallpox",
      "transmission_ecology": "Imported infection, dense city contact networks, and mass vaccination capacity.",
      "significance_tier": "major",
      "case_estimate": "A small number of confirmed cases",
      "death_estimate": "Two deaths are often cited in public-health histories.",
      "uncertainty_note": "The significance is response scale, not case count.",
      "historical_thesis": "A small outbreak became a demonstration of what a city health department could do at speed.",
      "public_health_response": "Mass vaccination, public communication, surveillance, and rapid containment.",
      "source_ids": [
        "cdc-smallpox-history",
        "who-smallpox-eradication"
      ],
      "asset_ids": [
        "variola-virus-cdc-tem"
      ],
      "related_posts": [],
      "tags": [
        "vaccination",
        "public-health-turning-point",
        "urban",
        "respiratory",
        "20th century",
        "urban center",
        "hospital",
        "vaccination clinic"
      ],
      "confidence": "high",
      "start_year": 1947,
      "end_year": 1947,
      "date_display": "1947",
      "century": "20th century",
      "period_tags": [
        "20th century"
      ],
      "disease_or_condition": "Smallpox scare",
      "pathogen_or_agent": "Variola virus",
      "transmission_category": "respiratory",
      "setting_tags": [
        "urban center",
        "hospital",
        "vaccination clinic"
      ],
      "modern_location_tags": [
        "New York",
        "New York City"
      ],
      "summary_1_sentence": "A small outbreak became a demonstration of what a city health department could do at speed.",
      "historical_context": "A small outbreak became a demonstration of what a city health department could do at speed.",
      "public_health_significance": "Mass vaccination, public communication, surveillance, and rapid containment.",
      "mortality_or_burden_note": "Cases/burden: A small number of confirmed cases Deaths/mortality: Two deaths are often cited in public-health histories.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "A small outbreak became a demonstration of what a city health department could do at speed.",
          "source_ids": [
            "cdc-smallpox-history",
            "who-smallpox-eradication"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "The significance is response scale, not case count."
        },
        {
          "claim": "Mass vaccination, public communication, surveillance, and rapid containment.",
          "source_ids": [
            "cdc-smallpox-history",
            "who-smallpox-eradication"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "polio-1952",
      "title": "The 1952 polio peak",
      "start_date": "1952-01-01",
      "end_date": "1952-12-31",
      "date_precision": "year",
      "era_id": "germ-state",
      "polity_scope": "United States",
      "geography": "Nationwide",
      "pathogen_or_syndrome": "Poliovirus",
      "disease_group": "vaccine-preventable",
      "transmission_ecology": "Summer transmission, fecal-oral spread, children, sanitation paradoxes, and household fear.",
      "significance_tier": "hero",
      "case_estimate": "More than 57,000 reported cases in common CDC histories",
      "death_estimate": "More than 3,000 deaths in common CDC histories",
      "uncertainty_note": "Reported cases understate infection because most poliovirus infections are not paralytic.",
      "historical_thesis": "The polio peak explains why vaccine success became a civic memory as much as a biomedical achievement.",
      "public_health_response": "Surveillance, iron lungs, rehabilitation, March of Dimes mobilization, and vaccine trials.",
      "source_ids": [
        "cdc-polio-museum",
        "cdc-polio-pinkbook"
      ],
      "asset_ids": [
        "iron-lung-ward"
      ],
      "related_posts": [],
      "tags": [
        "vaccination",
        "children",
        "public-health-turning-point",
        "fecal-oral/waterborne",
        "20th century",
        "school",
        "household",
        "hospital",
        "urban center"
      ],
      "confidence": "high",
      "start_year": 1952,
      "end_year": 1952,
      "date_display": "1952",
      "century": "20th century",
      "period_tags": [
        "20th century"
      ],
      "disease_or_condition": "Poliomyelitis",
      "pathogen_or_agent": "Poliovirus",
      "transmission_category": "fecal-oral/waterborne",
      "setting_tags": [
        "school",
        "household",
        "hospital",
        "urban center"
      ],
      "modern_location_tags": [
        "United States"
      ],
      "summary_1_sentence": "The polio peak explains why vaccine success became a civic memory as much as a biomedical achievement.",
      "historical_context": "The polio peak explains why vaccine success became a civic memory as much as a biomedical achievement.",
      "public_health_significance": "Surveillance, iron lungs, rehabilitation, March of Dimes mobilization, and vaccine trials.",
      "mortality_or_burden_note": "Cases/burden: More than 57,000 reported cases in common CDC histories Deaths/mortality: More than 3,000 deaths in common CDC histories",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The polio peak explains why vaccine success became a civic memory as much as a biomedical achievement.",
          "source_ids": [
            "cdc-polio-museum",
            "cdc-polio-pinkbook"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Reported cases understate infection because most poliovirus infections are not paralytic."
        },
        {
          "claim": "Surveillance, iron lungs, rehabilitation, March of Dimes mobilization, and vaccine trials.",
          "source_ids": [
            "cdc-polio-museum",
            "cdc-polio-pinkbook"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "rubella-1964",
      "title": "The 1964-1965 rubella epidemic",
      "start_date": "1964-01-01",
      "end_date": "1965-12-31",
      "date_precision": "range",
      "era_id": "germ-state",
      "polity_scope": "United States",
      "geography": "Nationwide",
      "pathogen_or_syndrome": "Rubella virus",
      "disease_group": "vaccine-preventable",
      "transmission_ecology": "Respiratory spread with fetal risk when infection occurs during pregnancy.",
      "significance_tier": "major",
      "case_estimate": "CDC summarizes an estimated 12.5 million U.S. rubella cases.",
      "death_estimate": "CDC summarizes fetal and neonatal deaths and congenital rubella syndrome burden.",
      "uncertainty_note": "The event's burden is measured through pregnancy outcomes as well as acute infection.",
      "historical_thesis": "Rubella made visible that a mild infection in one body could be catastrophic in another.",
      "public_health_response": "Vaccine development, MMR program, congenital rubella surveillance, and eventual elimination of endemic transmission.",
      "source_ids": [
        "cdc-rubella-impact",
        "cdc-rubella-elimination"
      ],
      "asset_ids": [
        "rubella-lab-cdc"
      ],
      "related_posts": [],
      "tags": [
        "pregnancy",
        "vaccination",
        "public-health-turning-point",
        "respiratory",
        "20th century",
        "school",
        "household",
        "pregnancy care"
      ],
      "confidence": "high",
      "start_year": 1964,
      "end_year": 1965,
      "date_display": "1964-1965",
      "century": "20th century",
      "period_tags": [
        "20th century"
      ],
      "disease_or_condition": "Rubella and congenital rubella syndrome",
      "pathogen_or_agent": "Rubella virus",
      "transmission_category": "respiratory",
      "setting_tags": [
        "school",
        "household",
        "pregnancy care"
      ],
      "modern_location_tags": [
        "United States"
      ],
      "summary_1_sentence": "Rubella made visible that a mild infection in one body could be catastrophic in another.",
      "historical_context": "Rubella made visible that a mild infection in one body could be catastrophic in another.",
      "public_health_significance": "Vaccine development, MMR program, congenital rubella surveillance, and eventual elimination of endemic transmission.",
      "mortality_or_burden_note": "Cases/burden: CDC summarizes an estimated 12.5 million U.S. rubella cases. Deaths/mortality: CDC summarizes fetal and neonatal deaths and congenital rubella syndrome burden.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Rubella made visible that a mild infection in one body could be catastrophic in another.",
          "source_ids": [
            "cdc-rubella-impact",
            "cdc-rubella-elimination"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "The event's burden is measured through pregnancy outcomes as well as acute infection."
        },
        {
          "claim": "Vaccine development, MMR program, congenital rubella surveillance, and eventual elimination of endemic transmission.",
          "source_ids": [
            "cdc-rubella-impact",
            "cdc-rubella-elimination"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "lyme-connecticut-1975",
      "title": "Lyme disease is recognized from a Connecticut cluster",
      "start_date": "1975-01-01",
      "end_date": "1982-12-31",
      "date_precision": "range",
      "era_id": "germ-state",
      "polity_scope": "United States",
      "geography": "Lyme and Old Lyme, Connecticut, and the Northeast",
      "pathogen_or_syndrome": "Borrelia burgdorferi",
      "disease_group": "zoonotic-vector",
      "transmission_ecology": "Ticks, deer, mice, suburban land use, forest edge, and clinical pattern recognition.",
      "significance_tier": "major",
      "case_estimate": "Cluster recognized before modern surveillance burden estimates",
      "death_estimate": "Deaths are not the main measure; morbidity dominates.",
      "uncertainty_note": "This is a recognition event rather than a single explosive epidemic.",
      "historical_thesis": "Lyme disease is what happens when ecology, suburbia, and clinical uncertainty meet.",
      "public_health_response": "Case definition, tick ecology research, clinician awareness, and prevention messaging.",
      "source_ids": [
        "cdc-lyme-connecticut",
        "ct-lyme-history"
      ],
      "asset_ids": [
        "borrelia-burgdorferi-cdc"
      ],
      "related_posts": [],
      "tags": [
        "ticks",
        "suburbia",
        "expandable",
        "vector-borne",
        "20th century",
        "rural community",
        "suburban edge",
        "household"
      ],
      "confidence": "moderate",
      "start_year": 1975,
      "end_year": 1982,
      "date_display": "1975-1982",
      "century": "20th century",
      "period_tags": [
        "20th century"
      ],
      "disease_or_condition": "Lyme disease recognition",
      "pathogen_or_agent": "Borrelia burgdorferi",
      "transmission_category": "vector-borne",
      "setting_tags": [
        "rural community",
        "suburban edge",
        "household"
      ],
      "modern_location_tags": [
        "Connecticut",
        "Lyme",
        "Old Lyme",
        "Northeast"
      ],
      "summary_1_sentence": "Lyme disease is what happens when ecology, suburbia, and clinical uncertainty meet.",
      "historical_context": "Lyme disease is what happens when ecology, suburbia, and clinical uncertainty meet.",
      "public_health_significance": "Case definition, tick ecology research, clinician awareness, and prevention messaging.",
      "mortality_or_burden_note": "Cases/burden: Cluster recognized before modern surveillance burden estimates Deaths/mortality: Deaths are not the main measure; morbidity dominates.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Lyme disease is what happens when ecology, suburbia, and clinical uncertainty meet.",
          "source_ids": [
            "cdc-lyme-connecticut",
            "ct-lyme-history"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "This is a recognition event rather than a single explosive epidemic."
        },
        {
          "claim": "Case definition, tick ecology research, clinician awareness, and prevention messaging.",
          "source_ids": [
            "cdc-lyme-connecticut",
            "ct-lyme-history"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "fort-dix-swine-flu-1976",
      "title": "Fort Dix swine flu and the vaccination gamble",
      "start_date": "1976-01-01",
      "end_date": "1976-12-31",
      "date_precision": "year",
      "era_id": "germ-state",
      "polity_scope": "United States military and civilian public health",
      "geography": "Fort Dix, New Jersey, and national vaccination campaign",
      "pathogen_or_syndrome": "Influenza A(H1N1) swine-origin virus",
      "disease_group": "respiratory",
      "transmission_ecology": "Military recruit crowding, influenza surveillance, and pandemic-risk inference.",
      "significance_tier": "major",
      "case_estimate": "Localized military outbreak",
      "death_estimate": "One soldier died in the recognized Fort Dix outbreak.",
      "uncertainty_note": "The public-health significance lies in response risk, not outbreak size.",
      "historical_thesis": "Fort Dix is the case where being wrong for understandable reasons became a permanent lesson in pandemic decision-making.",
      "public_health_response": "National vaccination campaign, adverse-event controversy, and later pandemic planning caution.",
      "source_ids": [
        "cdc-fort-dix-swine-flu",
        "cdc-swine-flu-1976-program"
      ],
      "asset_ids": [
        "generic-influenza-cdc"
      ],
      "related_posts": [],
      "tags": [
        "influenza",
        "military",
        "risk-communication",
        "respiratory",
        "20th century",
        "army camp",
        "vaccination clinic"
      ],
      "confidence": "moderate",
      "start_year": 1976,
      "end_year": 1976,
      "date_display": "1976",
      "century": "20th century",
      "period_tags": [
        "20th century"
      ],
      "disease_or_condition": "Swine-origin influenza outbreak and vaccination campaign",
      "pathogen_or_agent": "Influenza A(H1N1) swine-origin virus",
      "transmission_category": "respiratory",
      "setting_tags": [
        "army camp",
        "vaccination clinic"
      ],
      "modern_location_tags": [
        "New Jersey",
        "Fort Dix",
        "United States"
      ],
      "summary_1_sentence": "Fort Dix turned one limited military influenza outbreak into a national lesson in pandemic inference, vaccination risk, and public trust.",
      "historical_context": "Fort Dix is the case where being wrong for understandable reasons became a permanent lesson in pandemic decision-making.",
      "public_health_significance": "National vaccination campaign, adverse-event controversy, and later pandemic planning caution.",
      "mortality_or_burden_note": "Cases/burden: Localized military outbreak Deaths/mortality: One soldier died in the recognized Fort Dix outbreak.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Fort Dix turned one limited military influenza outbreak into a national lesson in pandemic inference, vaccination risk, and public trust.",
          "source_ids": [
            "cdc-fort-dix-swine-flu",
            "cdc-swine-flu-1976-program"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "The public-health significance lies in response risk, not outbreak size."
        },
        {
          "claim": "National vaccination campaign, adverse-event controversy, and later pandemic planning caution.",
          "source_ids": [
            "cdc-fort-dix-swine-flu",
            "cdc-swine-flu-1976-program"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "legionnaires-1976",
      "title": "Legionnaires' disease turns a hotel into an epidemiologic machine",
      "start_date": "1976-07-01",
      "end_date": "1977-01-31",
      "date_precision": "month",
      "era_id": "germ-state",
      "polity_scope": "United States",
      "geography": "Philadelphia, Pennsylvania",
      "pathogen_or_syndrome": "Legionella pneumophila",
      "disease_group": "healthcare",
      "transmission_ecology": "Built water systems, aerosols, hotels, cooling towers, and a susceptible convention population.",
      "significance_tier": "hero",
      "case_estimate": "More than 200 illnesses in official histories",
      "death_estimate": "Dozens of deaths in official histories.",
      "uncertainty_note": "Early reports preceded organism identification; retrospective interpretation matters.",
      "historical_thesis": "The outbreak made the built environment a pathogen habitat in public consciousness.",
      "public_health_response": "Field epidemiology, laboratory persistence, environmental investigation, and new disease recognition.",
      "source_ids": [
        "cdc-legionnaires-museum",
        "cdc-legionnaires-lab"
      ],
      "asset_ids": [
        "legionella-sem"
      ],
      "related_posts": [],
      "tags": [
        "built-environment",
        "public-health-turning-point",
        "field-epidemiology",
        "zoonotic/environmental",
        "20th century",
        "hotel",
        "built water system",
        "urban center"
      ],
      "confidence": "high",
      "start_year": 1976,
      "end_year": 1977,
      "date_display": "1976-1977",
      "century": "20th century",
      "period_tags": [
        "20th century"
      ],
      "disease_or_condition": "Legionnaires' disease",
      "pathogen_or_agent": "Legionella pneumophila",
      "transmission_category": "zoonotic/environmental",
      "setting_tags": [
        "hotel",
        "built water system",
        "urban center"
      ],
      "modern_location_tags": [
        "Pennsylvania",
        "Philadelphia"
      ],
      "summary_1_sentence": "The outbreak made the built environment a pathogen habitat in public consciousness.",
      "historical_context": "The outbreak made the built environment a pathogen habitat in public consciousness.",
      "public_health_significance": "Field epidemiology, laboratory persistence, environmental investigation, and new disease recognition.",
      "mortality_or_burden_note": "Cases/burden: More than 200 illnesses in official histories Deaths/mortality: Dozens of deaths in official histories.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The outbreak made the built environment a pathogen habitat in public consciousness.",
          "source_ids": [
            "cdc-legionnaires-museum",
            "cdc-legionnaires-lab"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Early reports preceded organism identification; retrospective interpretation matters."
        },
        {
          "claim": "Field epidemiology, laboratory persistence, environmental investigation, and new disease recognition.",
          "source_ids": [
            "cdc-legionnaires-museum",
            "cdc-legionnaires-lab"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "aids-1981",
      "title": "The first published AIDS signal",
      "start_date": "1981-06-05",
      "end_date": "1981-06-05",
      "date_precision": "day",
      "era_id": "molecular-global",
      "polity_scope": "United States",
      "geography": "Los Angeles, California, then national recognition",
      "pathogen_or_syndrome": "HIV",
      "disease_group": "blood-sex-injection",
      "transmission_ecology": "Sexual networks, blood exposure, stigma, surveillance blind spots, and delayed institutional response.",
      "significance_tier": "hero",
      "case_estimate": "Five PCP cases in the first MMWR report; epidemic burden grew vastly afterward.",
      "death_estimate": "Two of the five initial patients had died by the report; later U.S. AIDS mortality reached hundreds of thousands.",
      "uncertainty_note": "The first report is not the beginning of transmission; it is the beginning of official recognition.",
      "historical_thesis": "AIDS shows how an epidemic can be biologically new to medicine while already socially distributed.",
      "public_health_response": "Case reporting, task forces, route identification, activism, testing, blood safety, treatment, and long political struggle.",
      "source_ids": [
        "cdc-hiv-first-report",
        "hiv-gov-timeline",
        "cdc-hiv-25-years"
      ],
      "asset_ids": [
        "hiv-budding-color"
      ],
      "related_posts": [],
      "tags": [
        "hiv",
        "stigma",
        "public-health-turning-point",
        "sexually transmitted",
        "modern",
        "hospital",
        "sexual network",
        "urban center"
      ],
      "confidence": "high",
      "start_year": 1981,
      "end_year": 1981,
      "date_display": "1981 and after",
      "century": "20th century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "HIV/AIDS recognition",
      "pathogen_or_agent": "HIV",
      "transmission_category": "sexually transmitted",
      "setting_tags": [
        "hospital",
        "sexual network",
        "urban center"
      ],
      "modern_location_tags": [
        "California",
        "Los Angeles",
        "United States"
      ],
      "summary_1_sentence": "AIDS shows how an epidemic can be biologically new to medicine while already socially distributed.",
      "historical_context": "AIDS shows how an epidemic can be biologically new to medicine while already socially distributed.",
      "public_health_significance": "Case reporting, task forces, route identification, activism, testing, blood safety, treatment, and long political struggle.",
      "mortality_or_burden_note": "Cases/burden: Five PCP cases in the first MMWR report; epidemic burden grew vastly afterward. Deaths/mortality: Two of the five initial patients had died by the report; later U.S. AIDS mortality reached hundreds of thousands.",
      "related_tool_links": [
        {
          "label": "Pathogen Atlas: HIV",
          "href": "../../atlases/pathogen/?q=hiv"
        }
      ],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "AIDS shows how an epidemic can be biologically new to medicine while already socially distributed.",
          "source_ids": [
            "cdc-hiv-first-report",
            "hiv-gov-timeline",
            "cdc-hiv-25-years"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "The first report is not the beginning of transmission; it is the beginning of official recognition."
        },
        {
          "claim": "Case reporting, task forces, route identification, activism, testing, blood safety, treatment, and long political struggle.",
          "source_ids": [
            "cdc-hiv-first-report",
            "hiv-gov-timeline",
            "cdc-hiv-25-years"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "listeria-cheese-1985",
      "title": "Mexican-style cheese listeriosis in California",
      "start_date": "1985-01-01",
      "end_date": "1985-06-30",
      "date_precision": "month",
      "era_id": "molecular-global",
      "polity_scope": "United States",
      "geography": "Los Angeles and Orange Counties, California",
      "pathogen_or_syndrome": "Listeria monocytogenes",
      "disease_group": "foodborne",
      "transmission_ecology": "Soft cheese production, pregnancy risk, food distribution, and vulnerable newborns.",
      "significance_tier": "major",
      "case_estimate": "CDC reported 86 identified cases in the early investigation.",
      "death_estimate": "High mortality including fetal and neonatal deaths in outbreak summaries.",
      "uncertainty_note": "Pregnancy-associated outcomes make simple case-fatality summaries inadequate.",
      "historical_thesis": "The outbreak made listeriosis a food-safety and pregnancy-risk problem in the public-health imagination.",
      "public_health_response": "Product testing, recall, food-safety controls, and later Listeria surveillance improvements.",
      "source_ids": [
        "cdc-listeria-1985",
        "cdc-listeria-vitalsigns"
      ],
      "asset_ids": [
        "listeria-monocytogenes-cdc"
      ],
      "related_posts": [],
      "tags": [
        "foodborne",
        "pregnancy",
        "public-health-turning-point",
        "modern",
        "food production",
        "household",
        "hospital",
        "pregnancy care"
      ],
      "confidence": "moderate",
      "start_year": 1985,
      "end_year": 1985,
      "date_display": "1985",
      "century": "20th century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Listeriosis",
      "pathogen_or_agent": "Listeria monocytogenes",
      "transmission_category": "foodborne",
      "setting_tags": [
        "food production",
        "household",
        "hospital",
        "pregnancy care"
      ],
      "modern_location_tags": [
        "California",
        "Los Angeles County",
        "Orange County"
      ],
      "summary_1_sentence": "The outbreak made listeriosis a food-safety and pregnancy-risk problem in the public-health imagination.",
      "historical_context": "The outbreak made listeriosis a food-safety and pregnancy-risk problem in the public-health imagination.",
      "public_health_significance": "Product testing, recall, food-safety controls, and later Listeria surveillance improvements.",
      "mortality_or_burden_note": "Cases/burden: CDC reported 86 identified cases in the early investigation. Deaths/mortality: High mortality including fetal and neonatal deaths in outbreak summaries.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The outbreak made listeriosis a food-safety and pregnancy-risk problem in the public-health imagination.",
          "source_ids": [
            "cdc-listeria-1985",
            "cdc-listeria-vitalsigns"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Pregnancy-associated outcomes make simple case-fatality summaries inadequate."
        },
        {
          "claim": "Product testing, recall, food-safety controls, and later Listeria surveillance improvements.",
          "source_ids": [
            "cdc-listeria-1985",
            "cdc-listeria-vitalsigns"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "hiv-blood-supply-1985",
      "title": "HIV blood screening transforms transfusion safety",
      "start_date": "1985-03-01",
      "end_date": "1985-12-31",
      "date_precision": "month",
      "era_id": "molecular-global",
      "polity_scope": "United States",
      "geography": "National blood supply",
      "pathogen_or_syndrome": "HIV",
      "disease_group": "blood-sex-injection",
      "transmission_ecology": "Blood products, transfusion medicine, hemophilia care, surveillance, and laboratory testing.",
      "significance_tier": "major",
      "case_estimate": "Not a single outbreak event",
      "death_estimate": "Prior transfusion-associated infections produced severe morbidity and mortality.",
      "uncertainty_note": "This is a public-health turning point rather than one outbreak.",
      "historical_thesis": "The blood supply became a laboratory-governed public trust.",
      "public_health_response": "Donor deferral, antibody screening, blood-bank regulation, and later nucleic-acid testing.",
      "source_ids": [
        "hiv-gov-timeline",
        "cdc-hiv-25-years"
      ],
      "asset_ids": [
        "hiv-budding-color"
      ],
      "related_posts": [],
      "tags": [
        "blood",
        "public-health-turning-point",
        "laboratory",
        "bloodborne",
        "modern",
        "hospital",
        "blood bank"
      ],
      "confidence": "high",
      "start_year": 1985,
      "end_year": 1985,
      "date_display": "1985",
      "century": "20th century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "HIV blood-safety turning point",
      "pathogen_or_agent": "HIV",
      "transmission_category": "bloodborne",
      "setting_tags": [
        "hospital",
        "blood bank",
        "laboratory"
      ],
      "modern_location_tags": [
        "United States"
      ],
      "summary_1_sentence": "The blood supply became a laboratory-governed public trust.",
      "historical_context": "The blood supply became a laboratory-governed public trust.",
      "public_health_significance": "Donor deferral, antibody screening, blood-bank regulation, and later nucleic-acid testing.",
      "mortality_or_burden_note": "Cases/burden: Not a single outbreak event Deaths/mortality: Prior transfusion-associated infections produced severe morbidity and mortality.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The blood supply became a laboratory-governed public trust.",
          "source_ids": [
            "hiv-gov-timeline",
            "cdc-hiv-25-years"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "This is a public-health turning point rather than one outbreak."
        },
        {
          "claim": "Donor deferral, antibody screening, blood-bank regulation, and later nucleic-acid testing.",
          "source_ids": [
            "hiv-gov-timeline",
            "cdc-hiv-25-years"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "measles-resurgence-1989",
      "title": "The 1989-1991 measles resurgence",
      "start_date": "1989-01-01",
      "end_date": "1991-12-31",
      "date_precision": "range",
      "era_id": "molecular-global",
      "polity_scope": "United States",
      "geography": "Nationwide, with severe urban outbreaks",
      "pathogen_or_syndrome": "Measles virus",
      "disease_group": "vaccine-preventable",
      "transmission_ecology": "Undervaccination, urban poverty, school and preschool transmission, and one-dose policy limits.",
      "significance_tier": "hero",
      "case_estimate": "Tens of thousands of reported cases across the resurgence",
      "death_estimate": "More than 100 deaths in common CDC summaries.",
      "uncertainty_note": "Counts depend on surveillance year and outbreak definitions.",
      "historical_thesis": "Measles elimination was not won by having a vaccine; it was won by building delivery systems that reached children.",
      "public_health_response": "Two-dose MMR policy, improved preschool vaccination, outbreak control, and elimination strategy.",
      "source_ids": [
        "cdc-measles-surveillance",
        "cdc-measles-history"
      ],
      "asset_ids": [
        "measlesvirus"
      ],
      "related_posts": [
        "measles-resurgence-the-hidden-toll"
      ],
      "tags": [
        "vaccination",
        "public-health-turning-point",
        "children",
        "respiratory",
        "modern",
        "urban center",
        "school",
        "household"
      ],
      "confidence": "moderate",
      "start_year": 1989,
      "end_year": 1991,
      "date_display": "1989-1991",
      "century": "20th century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Measles resurgence",
      "pathogen_or_agent": "Measles virus",
      "transmission_category": "respiratory",
      "setting_tags": [
        "urban center",
        "school",
        "household"
      ],
      "modern_location_tags": [
        "United States"
      ],
      "summary_1_sentence": "Measles elimination was not won by having a vaccine; it was won by building delivery systems that reached children.",
      "historical_context": "Measles elimination was not won by having a vaccine; it was won by building delivery systems that reached children.",
      "public_health_significance": "Two-dose MMR policy, improved preschool vaccination, outbreak control, and elimination strategy.",
      "mortality_or_burden_note": "Cases/burden: Tens of thousands of reported cases across the resurgence Deaths/mortality: More than 100 deaths in common CDC summaries.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Measles elimination was not won by having a vaccine; it was won by building delivery systems that reached children.",
          "source_ids": [
            "cdc-measles-surveillance",
            "cdc-measles-history"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Counts depend on surveillance year and outbreak definitions."
        },
        {
          "claim": "Two-dose MMR policy, improved preschool vaccination, outbreak control, and elimination strategy.",
          "source_ids": [
            "cdc-measles-surveillance",
            "cdc-measles-history"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "jack-in-the-box-ecoli-1993",
      "title": "Jack in the Box and the hamburger safety shock",
      "start_date": "1992-12-01",
      "end_date": "1993-02-28",
      "date_precision": "month",
      "era_id": "molecular-global",
      "polity_scope": "United States",
      "geography": "Washington, Idaho, California, Nevada, and national food safety policy",
      "pathogen_or_syndrome": "Escherichia coli O157:H7",
      "disease_group": "foodborne",
      "transmission_ecology": "Industrial beef production, undercooked hamburgers, restaurant chains, and pediatric severe disease.",
      "significance_tier": "major",
      "case_estimate": "More than 700 illnesses in common outbreak summaries",
      "death_estimate": "Four deaths in common outbreak summaries",
      "uncertainty_note": "Use curated outbreak-museum and regulatory sources; CDC-specific case summary should be added if surfaced.",
      "historical_thesis": "A fast-food outbreak changed what Americans expected the meat system to prove.",
      "public_health_response": "Outbreak investigation, cooking-temperature policy, HACCP momentum, and stronger E. coli surveillance.",
      "source_ids": [
        "cdc-ecoli-o157-hamburgers-1993",
        "cdc-safer-foods"
      ],
      "asset_ids": [
        "e-coli-cdc"
      ],
      "related_posts": [],
      "tags": [
        "foodborne",
        "children",
        "public-health-turning-point",
        "modern",
        "restaurant",
        "food production",
        "household"
      ],
      "confidence": "moderate",
      "start_year": 1992,
      "end_year": 1993,
      "date_display": "1992-1993",
      "century": "20th century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "E. coli O157:H7 foodborne outbreak",
      "pathogen_or_agent": "Escherichia coli O157:H7",
      "transmission_category": "foodborne",
      "setting_tags": [
        "restaurant",
        "food production",
        "household"
      ],
      "modern_location_tags": [
        "Washington",
        "Idaho",
        "California",
        "Nevada"
      ],
      "summary_1_sentence": "A fast-food outbreak changed what Americans expected the meat system to prove.",
      "historical_context": "A fast-food outbreak changed what Americans expected the meat system to prove.",
      "public_health_significance": "Outbreak investigation, cooking-temperature policy, HACCP momentum, and stronger E. coli surveillance.",
      "mortality_or_burden_note": "Cases/burden: More than 700 illnesses in common outbreak summaries Deaths/mortality: Four deaths in common outbreak summaries",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "A fast-food outbreak changed what Americans expected the meat system to prove.",
          "source_ids": [
            "cdc-ecoli-o157-hamburgers-1993",
            "cdc-safer-foods"
          ],
          "confidence": "moderate",
          "claim_type": "timeline teaching summary",
          "notes": "Use curated outbreak-museum and regulatory sources; CDC-specific case summary should be added if surfaced."
        },
        {
          "claim": "Outbreak investigation, cooking-temperature policy, HACCP momentum, and stronger E. coli surveillance.",
          "source_ids": [
            "cdc-ecoli-o157-hamburgers-1993",
            "cdc-safer-foods"
          ],
          "confidence": "moderate",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "milwaukee-cryptosporidium-1993",
      "title": "Milwaukee cryptosporidiosis breaks the water-safety illusion",
      "start_date": "1993-03-01",
      "end_date": "1993-04-30",
      "date_precision": "month",
      "era_id": "molecular-global",
      "polity_scope": "United States",
      "geography": "Milwaukee, Wisconsin",
      "pathogen_or_syndrome": "Cryptosporidium",
      "disease_group": "cholera-enteric",
      "transmission_ecology": "Municipal drinking water, protozoan oocysts, filtration failure, and vulnerability among immunocompromised people.",
      "significance_tier": "major",
      "case_estimate": "About 403,000 illnesses in CDC outbreak summaries",
      "death_estimate": "Deaths concentrated among vulnerable people; estimates vary by source.",
      "uncertainty_note": "Mortality attribution is more complex than illness counts.",
      "historical_thesis": "Modern water systems can fail at massive scale without looking primitive.",
      "public_health_response": "Boil-water advisory, water-treatment reform, surveillance, and drinking-water regulation debates.",
      "source_ids": [
        "cdc-crypto-surveillance",
        "cdc-crypto-mmwr"
      ],
      "asset_ids": [
        "cryptosporidium-parvum-cdc"
      ],
      "related_posts": [],
      "tags": [
        "water",
        "public-health-turning-point",
        "infrastructure",
        "fecal-oral/waterborne",
        "modern",
        "water system",
        "urban center",
        "household"
      ],
      "confidence": "high",
      "start_year": 1993,
      "end_year": 1993,
      "date_display": "1993",
      "century": "20th century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Cryptosporidiosis",
      "pathogen_or_agent": "Cryptosporidium",
      "transmission_category": "fecal-oral/waterborne",
      "setting_tags": [
        "water system",
        "urban center",
        "household"
      ],
      "modern_location_tags": [
        "Wisconsin",
        "Milwaukee"
      ],
      "summary_1_sentence": "Modern water systems can fail at massive scale without looking primitive.",
      "historical_context": "Modern water systems can fail at massive scale without looking primitive.",
      "public_health_significance": "Boil-water advisory, water-treatment reform, surveillance, and drinking-water regulation debates.",
      "mortality_or_burden_note": "Cases/burden: About 403,000 illnesses in CDC outbreak summaries Deaths/mortality: Deaths concentrated among vulnerable people; estimates vary by source.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Modern water systems can fail at massive scale without looking primitive.",
          "source_ids": [
            "cdc-crypto-surveillance",
            "cdc-crypto-mmwr"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Mortality attribution is more complex than illness counts."
        },
        {
          "claim": "Boil-water advisory, water-treatment reform, surveillance, and drinking-water regulation debates.",
          "source_ids": [
            "cdc-crypto-surveillance",
            "cdc-crypto-mmwr"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "hantavirus-1993",
      "title": "Four Corners hantavirus pulmonary syndrome",
      "start_date": "1993-05-01",
      "end_date": "1993-12-31",
      "date_precision": "month",
      "era_id": "molecular-global",
      "polity_scope": "United States",
      "geography": "Four Corners region, especially Navajo Nation and surrounding states",
      "pathogen_or_syndrome": "Sin Nombre virus",
      "disease_group": "zoonotic-vector",
      "transmission_ecology": "Rodent ecology, weather, household exposure, Indigenous communities, and rapid viral discovery.",
      "significance_tier": "major",
      "case_estimate": "Dozens of early recognized cases",
      "death_estimate": "High case fatality in early recognized cases.",
      "uncertainty_note": "Early surveillance captured severe recognized illness, not all infection.",
      "historical_thesis": "The outbreak was a field lesson in ecology, laboratory speed, and why naming matters.",
      "public_health_response": "CDC/state/tribal investigation, rodent studies, risk communication, and new syndrome recognition.",
      "source_ids": [
        "cdc-hantavirus-1993",
        "cdc-hantavirus-1993-2009"
      ],
      "asset_ids": [
        "deer-mouse-hantavirus"
      ],
      "related_posts": [
        "hantavirus-at-sea-what-we-know-about"
      ],
      "tags": [
        "zoonotic",
        "indigenous",
        "field-epidemiology",
        "zoonotic/environmental",
        "modern",
        "reservation",
        "rural community",
        "household",
        "field investigation"
      ],
      "confidence": "high",
      "start_year": 1993,
      "end_year": 1993,
      "date_display": "1993",
      "century": "20th century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Hantavirus pulmonary syndrome",
      "pathogen_or_agent": "Sin Nombre virus",
      "transmission_category": "zoonotic/environmental",
      "setting_tags": [
        "reservation",
        "rural community",
        "household",
        "field investigation"
      ],
      "modern_location_tags": [
        "Arizona",
        "New Mexico",
        "Colorado",
        "Utah",
        "Navajo Nation",
        "Four Corners"
      ],
      "summary_1_sentence": "The outbreak was a field lesson in ecology, laboratory speed, and why naming matters.",
      "historical_context": "The outbreak was a field lesson in ecology, laboratory speed, and why naming matters.",
      "public_health_significance": "CDC/state/tribal investigation, rodent studies, risk communication, and new syndrome recognition.",
      "mortality_or_burden_note": "Cases/burden: Dozens of early recognized cases Deaths/mortality: High case fatality in early recognized cases.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The outbreak was a field lesson in ecology, laboratory speed, and why naming matters.",
          "source_ids": [
            "cdc-hantavirus-1993",
            "cdc-hantavirus-1993-2009"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Early surveillance captured severe recognized illness, not all infection."
        },
        {
          "claim": "CDC/state/tribal investigation, rodent studies, risk communication, and new syndrome recognition.",
          "source_ids": [
            "cdc-hantavirus-1993",
            "cdc-hantavirus-1993-2009"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "west-nile-1999",
      "title": "West Nile virus arrives in New York",
      "start_date": "1999-08-01",
      "end_date": "1999-12-31",
      "date_precision": "month",
      "era_id": "molecular-global",
      "polity_scope": "United States",
      "geography": "New York City area, then continental spread",
      "pathogen_or_syndrome": "West Nile virus",
      "disease_group": "zoonotic-vector",
      "transmission_ecology": "Birds, Culex mosquitoes, urban ecology, dead-bird surveillance, and continental spread.",
      "significance_tier": "hero",
      "case_estimate": "Initial cluster grew into national endemic surveillance over subsequent years.",
      "death_estimate": "Initial deaths were limited, but later national mortality accumulated.",
      "uncertainty_note": "Separate initial outbreak from later endemic burden.",
      "historical_thesis": "West Nile made the city, the crow, the mosquito, and the surveillance lab part of one disease system.",
      "public_health_response": "Arboviral surveillance, mosquito control, dead-bird reporting, blood-supply screening, and public advisories.",
      "source_ids": [
        "cdc-west-nile-1999",
        "cdc-west-nile-historic"
      ],
      "asset_ids": [
        "west-nile-culex-mosquito"
      ],
      "related_posts": [],
      "tags": [
        "mosquitoes",
        "zoonotic",
        "public-health-turning-point",
        "vector-borne",
        "modern",
        "urban center",
        "park/ecology",
        "laboratory"
      ],
      "confidence": "high",
      "start_year": 1999,
      "end_year": 1999,
      "date_display": "1999",
      "century": "20th century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "West Nile virus disease",
      "pathogen_or_agent": "West Nile virus",
      "transmission_category": "vector-borne",
      "setting_tags": [
        "urban center",
        "park/ecology",
        "laboratory"
      ],
      "modern_location_tags": [
        "New York",
        "New York City",
        "United States"
      ],
      "summary_1_sentence": "West Nile made the city, the crow, the mosquito, and the surveillance lab part of one disease system.",
      "historical_context": "West Nile made the city, the crow, the mosquito, and the surveillance lab part of one disease system.",
      "public_health_significance": "Arboviral surveillance, mosquito control, dead-bird reporting, blood-supply screening, and public advisories.",
      "mortality_or_burden_note": "Cases/burden: Initial cluster grew into national endemic surveillance over subsequent years. Deaths/mortality: Initial deaths were limited, but later national mortality accumulated.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "West Nile made the city, the crow, the mosquito, and the surveillance lab part of one disease system.",
          "source_ids": [
            "cdc-west-nile-1999",
            "cdc-west-nile-historic"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Separate initial outbreak from later endemic burden."
        },
        {
          "claim": "Arboviral surveillance, mosquito control, dead-bird reporting, blood-supply screening, and public advisories.",
          "source_ids": [
            "cdc-west-nile-1999",
            "cdc-west-nile-historic"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "anthrax-2001",
      "title": "The anthrax letters make bioterrorism public health's problem",
      "start_date": "2001-09-18",
      "end_date": "2001-11-30",
      "date_precision": "day",
      "era_id": "molecular-global",
      "polity_scope": "United States",
      "geography": "Florida, New York, New Jersey, Washington, DC, Connecticut, and postal routes",
      "pathogen_or_syndrome": "Bacillus anthracis",
      "disease_group": "zoonotic-vector",
      "transmission_ecology": "Intentional spore dissemination through mail, workplaces, postal facilities, and media/government targets.",
      "significance_tier": "hero",
      "case_estimate": "22 confirmed or suspected cases in CDC summaries",
      "death_estimate": "Five deaths in CDC summaries",
      "uncertainty_note": "Bioterrorism outbreak: transmission ecology is intentional exposure, not natural spread.",
      "historical_thesis": "The episode moved public health into the center of national security and forensic microbiology.",
      "public_health_response": "Environmental sampling, prophylaxis, postal decontamination, risk communication, and microbial forensics.",
      "source_ids": [
        "cdc-anthrax-2001",
        "cdc-anthrax-eid"
      ],
      "asset_ids": [
        "anthrax-bacillus"
      ],
      "related_posts": [],
      "tags": [
        "bioterrorism",
        "public-health-turning-point",
        "laboratory",
        "zoonotic/environmental",
        "modern",
        "postal route",
        "workplace",
        "urban center"
      ],
      "confidence": "high",
      "start_year": 2001,
      "end_year": 2001,
      "date_display": "2001",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Anthrax bioterrorism",
      "pathogen_or_agent": "Bacillus anthracis",
      "transmission_category": "zoonotic/environmental",
      "setting_tags": [
        "postal route",
        "workplace",
        "laboratory",
        "urban center"
      ],
      "modern_location_tags": [
        "Florida",
        "New York",
        "New Jersey",
        "Washington DC",
        "Connecticut"
      ],
      "summary_1_sentence": "The episode moved public health into the center of national security and forensic microbiology.",
      "historical_context": "The episode moved public health into the center of national security and forensic microbiology.",
      "public_health_significance": "Environmental sampling, prophylaxis, postal decontamination, risk communication, and microbial forensics.",
      "mortality_or_burden_note": "Cases/burden: 22 confirmed or suspected cases in CDC summaries Deaths/mortality: Five deaths in CDC summaries",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The episode moved public health into the center of national security and forensic microbiology.",
          "source_ids": [
            "cdc-anthrax-2001",
            "cdc-anthrax-eid"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Bioterrorism outbreak: transmission ecology is intentional exposure, not natural spread."
        },
        {
          "claim": "Environmental sampling, prophylaxis, postal decontamination, risk communication, and microbial forensics.",
          "source_ids": [
            "cdc-anthrax-2001",
            "cdc-anthrax-eid"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "sars-2003",
      "title": "SARS tests U.S. travel-linked containment",
      "start_date": "2003-03-01",
      "end_date": "2003-07-31",
      "date_precision": "month",
      "era_id": "molecular-global",
      "polity_scope": "United States",
      "geography": "Travel-linked U.S. cases during a global outbreak",
      "pathogen_or_syndrome": "SARS-associated coronavirus",
      "disease_group": "respiratory",
      "transmission_ecology": "International travel, hospitals, contact tracing, and respiratory spread.",
      "significance_tier": "major",
      "case_estimate": "Limited probable U.S. cases compared with global burden",
      "death_estimate": "No large U.S. mortality burden.",
      "uncertainty_note": "The U.S. importance is preparedness and surveillance, not a large domestic epidemic.",
      "historical_thesis": "SARS was the warning shot for a coronavirus century.",
      "public_health_response": "Emergency operations, travel alerts, isolation, contact tracing, laboratory testing, and hospital precautions.",
      "source_ids": [
        "cdc-sars-2003",
        "cdc-sars-response"
      ],
      "asset_ids": [
        "sars-cov"
      ],
      "related_posts": [],
      "tags": [
        "coronavirus",
        "travel",
        "public-health-turning-point",
        "respiratory",
        "modern",
        "hospital",
        "airport/travel",
        "household"
      ],
      "confidence": "high",
      "start_year": 2003,
      "end_year": 2003,
      "date_display": "2003",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "SARS",
      "pathogen_or_agent": "SARS-associated coronavirus",
      "transmission_category": "respiratory",
      "setting_tags": [
        "hospital",
        "airport/travel",
        "household"
      ],
      "modern_location_tags": [
        "United States",
        "travel-linked cases"
      ],
      "summary_1_sentence": "SARS was the warning shot for a coronavirus century.",
      "historical_context": "SARS was the warning shot for a coronavirus century.",
      "public_health_significance": "Emergency operations, travel alerts, isolation, contact tracing, laboratory testing, and hospital precautions.",
      "mortality_or_burden_note": "Cases/burden: Limited probable U.S. cases compared with global burden Deaths/mortality: No large U.S. mortality burden.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "SARS was the warning shot for a coronavirus century.",
          "source_ids": [
            "cdc-sars-2003",
            "cdc-sars-response"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "The U.S. importance is preparedness and surveillance, not a large domestic epidemic."
        },
        {
          "claim": "Emergency operations, travel alerts, isolation, contact tracing, laboratory testing, and hospital precautions.",
          "source_ids": [
            "cdc-sars-2003",
            "cdc-sars-response"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "h1n1-2009",
      "title": "The 2009 H1N1 influenza pandemic",
      "start_date": "2009-04-01",
      "end_date": "2010-04-30",
      "date_precision": "month",
      "era_id": "molecular-global",
      "polity_scope": "United States",
      "geography": "Nationwide",
      "pathogen_or_syndrome": "Influenza A(H1N1)pdm09",
      "disease_group": "respiratory",
      "transmission_ecology": "Schools, households, travel, age-shifted risk, and pandemic influenza surveillance.",
      "significance_tier": "hero",
      "case_estimate": "CDC estimated about 60.8 million U.S. cases from April 2009 to April 2010.",
      "death_estimate": "CDC estimated about 12,469 U.S. deaths in that period.",
      "uncertainty_note": "CDC estimates are ranges; display uncertainty if numeric ranges are added.",
      "historical_thesis": "H1N1 was a pandemic that was serious without matching the apocalyptic template Americans expected.",
      "public_health_response": "Emergency response, vaccine development, school guidance, antiviral guidance, and surveillance.",
      "source_ids": [
        "cdc-h1n1-2009",
        "cdc-h1n1-response"
      ],
      "asset_ids": [
        "h1n1-2009-cdc"
      ],
      "related_posts": [],
      "tags": [
        "pandemic",
        "influenza",
        "public-health-turning-point",
        "respiratory",
        "modern",
        "school",
        "household",
        "hospital",
        "urban center"
      ],
      "confidence": "high",
      "start_year": 2009,
      "end_year": 2010,
      "date_display": "2009-2010",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Influenza pandemic",
      "pathogen_or_agent": "Influenza A(H1N1)pdm09",
      "transmission_category": "respiratory",
      "setting_tags": [
        "school",
        "household",
        "hospital",
        "urban center"
      ],
      "modern_location_tags": [
        "United States"
      ],
      "summary_1_sentence": "H1N1 was a pandemic that was serious without matching the apocalyptic template Americans expected.",
      "historical_context": "H1N1 was a pandemic that was serious without matching the apocalyptic template Americans expected.",
      "public_health_significance": "Emergency response, vaccine development, school guidance, antiviral guidance, and surveillance.",
      "mortality_or_burden_note": "Cases/burden: CDC estimated about 60.8 million U.S. cases from April 2009 to April 2010. Deaths/mortality: CDC estimated about 12,469 U.S. deaths in that period.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "H1N1 was a pandemic that was serious without matching the apocalyptic template Americans expected.",
          "source_ids": [
            "cdc-h1n1-2009",
            "cdc-h1n1-response"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "CDC estimates are ranges; display uncertainty if numeric ranges are added."
        },
        {
          "claim": "Emergency response, vaccine development, school guidance, antiviral guidance, and surveillance.",
          "source_ids": [
            "cdc-h1n1-2009",
            "cdc-h1n1-response"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "fungal-meningitis-2012",
      "title": "The compounding-pharmacy fungal meningitis outbreak",
      "start_date": "2012-09-01",
      "end_date": "2013-12-31",
      "date_precision": "range",
      "era_id": "networked-risk",
      "polity_scope": "United States",
      "geography": "Multistate exposures tied to New England Compounding Center products",
      "pathogen_or_syndrome": "Exserohilum rostratum and other fungi",
      "disease_group": "healthcare",
      "transmission_ecology": "Contaminated injectable medication, specialty compounding, spine injections, and national distribution.",
      "significance_tier": "hero",
      "case_estimate": "Hundreds of cases in CDC outbreak summaries",
      "death_estimate": "Dozens of deaths in CDC outbreak summaries.",
      "uncertainty_note": "Case definitions evolved as spinal/paraspinal infections were recognized.",
      "historical_thesis": "A sterile vial became a national exposure network.",
      "public_health_response": "Recall, patient notification, clinical guidance, FDA and state investigations, and compounding oversight reform.",
      "source_ids": [
        "cdc-fungal-meningitis-2012",
        "cdc-fungal-meningitis-archive"
      ],
      "asset_ids": [
        "exserohilum-rostratum-cdc"
      ],
      "related_posts": [],
      "tags": [
        "healthcare",
        "product",
        "public-health-turning-point",
        "zoonotic/environmental",
        "modern",
        "clinic",
        "hospital",
        "pharmacy/product chain"
      ],
      "confidence": "high",
      "start_year": 2012,
      "end_year": 2013,
      "date_display": "2012-2013",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Fungal meningitis and related infections",
      "pathogen_or_agent": "Exserohilum rostratum and other fungi",
      "transmission_category": "zoonotic/environmental",
      "setting_tags": [
        "clinic",
        "hospital",
        "pharmacy/product chain"
      ],
      "modern_location_tags": [
        "Massachusetts",
        "Michigan",
        "Tennessee",
        "multistate"
      ],
      "summary_1_sentence": "A sterile vial became a national exposure network.",
      "historical_context": "A sterile vial became a national exposure network.",
      "public_health_significance": "Recall, patient notification, clinical guidance, FDA and state investigations, and compounding oversight reform.",
      "mortality_or_burden_note": "Cases/burden: Hundreds of cases in CDC outbreak summaries Deaths/mortality: Dozens of deaths in CDC outbreak summaries.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "A sterile vial became a national exposure network.",
          "source_ids": [
            "cdc-fungal-meningitis-2012",
            "cdc-fungal-meningitis-archive"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Case definitions evolved as spinal/paraspinal infections were recognized."
        },
        {
          "claim": "Recall, patient notification, clinical guidance, FDA and state investigations, and compounding oversight reform.",
          "source_ids": [
            "cdc-fungal-meningitis-2012",
            "cdc-fungal-meningitis-archive"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "ebola-dallas-2014",
      "title": "Ebola diagnosed in Dallas",
      "start_date": "2014-09-30",
      "end_date": "2014-11-30",
      "date_precision": "day",
      "era_id": "networked-risk",
      "polity_scope": "United States",
      "geography": "Dallas, Texas",
      "pathogen_or_syndrome": "Ebola virus",
      "disease_group": "zoonotic-vector",
      "transmission_ecology": "Travel-associated importation, hospital infection control, contact monitoring, and risk communication.",
      "significance_tier": "major",
      "case_estimate": "Four U.S. laboratory-confirmed cases in the broader 2014 context",
      "death_estimate": "One death in the Dallas imported case.",
      "uncertainty_note": "The U.S. event is small numerically but large institutionally.",
      "historical_thesis": "Ebola in Dallas exposed the gap between global outbreak solidarity and domestic fear.",
      "public_health_response": "Contact tracing, monitoring, hospital PPE protocols, travel screening, and designated treatment centers.",
      "source_ids": [
        "cdc-ebola-2014",
        "cdc-ebola-history"
      ],
      "asset_ids": [
        "ebola-virus-cdc"
      ],
      "related_posts": [],
      "tags": [
        "travel",
        "hospital",
        "risk-communication",
        "bloodborne",
        "modern",
        "airport/travel",
        "household"
      ],
      "confidence": "high",
      "start_year": 2014,
      "end_year": 2014,
      "date_display": "2014",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Ebola virus disease importation",
      "pathogen_or_agent": "Ebola virus",
      "transmission_category": "bloodborne",
      "setting_tags": [
        "hospital",
        "airport/travel",
        "household"
      ],
      "modern_location_tags": [
        "Texas",
        "Dallas"
      ],
      "summary_1_sentence": "Ebola in Dallas exposed the gap between global outbreak solidarity and domestic fear.",
      "historical_context": "Ebola in Dallas exposed the gap between global outbreak solidarity and domestic fear.",
      "public_health_significance": "Contact tracing, monitoring, hospital PPE protocols, travel screening, and designated treatment centers.",
      "mortality_or_burden_note": "Cases/burden: Four U.S. laboratory-confirmed cases in the broader 2014 context Deaths/mortality: One death in the Dallas imported case.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Ebola in Dallas exposed the gap between global outbreak solidarity and domestic fear.",
          "source_ids": [
            "cdc-ebola-2014",
            "cdc-ebola-history"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "The U.S. event is small numerically but large institutionally."
        },
        {
          "claim": "Contact tracing, monitoring, hospital PPE protocols, travel screening, and designated treatment centers.",
          "source_ids": [
            "cdc-ebola-2014",
            "cdc-ebola-history"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "indiana-hiv-2015",
      "title": "Scott County HIV outbreak",
      "start_date": "2015-01-01",
      "end_date": "2015-12-31",
      "date_precision": "year",
      "era_id": "networked-risk",
      "polity_scope": "United States",
      "geography": "Southeastern Indiana",
      "pathogen_or_syndrome": "HIV",
      "disease_group": "blood-sex-injection",
      "transmission_ecology": "Injection drug use, syringe sharing, opioid supply, poverty, rural health access, and network density.",
      "significance_tier": "hero",
      "case_estimate": "CDC reported 135 diagnosed infections by April 2015 in the early investigation.",
      "death_estimate": "HIV mortality is long-term and treatment-dependent, not an acute outbreak death count.",
      "uncertainty_note": "The visible outbreak was produced by surveillance and diagnosis as much as transmission.",
      "historical_thesis": "The opioid epidemic created an infectious-disease ecology before many officials were willing to name it.",
      "public_health_response": "Emergency declaration, contact tracing, HIV testing, care linkage, syringe services authorization, and molecular epidemiology.",
      "source_ids": [
        "cdc-hiv-indiana-2015",
        "cdc-amd-indiana-hiv"
      ],
      "asset_ids": [
        "hiv-budding-color"
      ],
      "related_posts": [],
      "tags": [
        "injection",
        "rural",
        "public-health-turning-point",
        "bloodborne",
        "modern",
        "rural community",
        "injection network",
        "clinic"
      ],
      "confidence": "high",
      "start_year": 2015,
      "end_year": 2015,
      "date_display": "2015",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "HIV outbreak linked to injection networks",
      "pathogen_or_agent": "HIV",
      "transmission_category": "bloodborne",
      "setting_tags": [
        "rural community",
        "injection network",
        "clinic"
      ],
      "modern_location_tags": [
        "Indiana",
        "Scott County"
      ],
      "summary_1_sentence": "The opioid epidemic created an infectious-disease ecology before many officials were willing to name it.",
      "historical_context": "The opioid epidemic created an infectious-disease ecology before many officials were willing to name it.",
      "public_health_significance": "Emergency declaration, contact tracing, HIV testing, care linkage, syringe services authorization, and molecular epidemiology.",
      "mortality_or_burden_note": "Cases/burden: CDC reported 135 diagnosed infections by April 2015 in the early investigation. Deaths/mortality: HIV mortality is long-term and treatment-dependent, not an acute outbreak death count.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The opioid epidemic created an infectious-disease ecology before many officials were willing to name it.",
          "source_ids": [
            "cdc-hiv-indiana-2015",
            "cdc-amd-indiana-hiv"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "The visible outbreak was produced by surveillance and diagnosis as much as transmission."
        },
        {
          "claim": "Emergency declaration, contact tracing, HIV testing, care linkage, syringe services authorization, and molecular epidemiology.",
          "source_ids": [
            "cdc-hiv-indiana-2015",
            "cdc-amd-indiana-hiv"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "zika-puerto-rico-2016",
      "title": "Zika transmission in Puerto Rico",
      "start_date": "2015-11-01",
      "end_date": "2016-12-31",
      "date_precision": "range",
      "era_id": "networked-risk",
      "polity_scope": "U.S. jurisdiction",
      "geography": "Puerto Rico",
      "pathogen_or_syndrome": "Zika virus",
      "disease_group": "zoonotic-vector",
      "transmission_ecology": "Aedes mosquitoes, pregnancy risk, sexual transmission, blood safety, and territorial inequality.",
      "significance_tier": "hero",
      "case_estimate": "Thousands of confirmed and presumptive cases in CDC Puerto Rico reporting.",
      "death_estimate": "Deaths were not the primary burden; congenital outcomes were central.",
      "uncertainty_note": "Puerto Rico must not be treated as a footnote to continental U.S. Zika.",
      "historical_thesis": "The Zika crisis showed that geography, pregnancy, and political status all shape what counts as an American epidemic.",
      "public_health_response": "Vector control, pregnancy surveillance, travel guidance, blood collection changes, testing, and birth-defects monitoring.",
      "source_ids": [
        "cdc-zika-puerto-rico",
        "cdc-zika-us-cases"
      ],
      "asset_ids": [
        "zika-tem",
        "aedes-aegypti-cdc"
      ],
      "related_posts": [],
      "tags": [
        "mosquitoes",
        "pregnancy",
        "territories",
        "vector-borne",
        "modern",
        "territory",
        "household",
        "pregnancy care",
        "urban center"
      ],
      "confidence": "high",
      "start_year": 2015,
      "end_year": 2016,
      "date_display": "2015-2016",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Zika virus disease and congenital Zika syndrome risk",
      "pathogen_or_agent": "Zika virus",
      "transmission_category": "vector-borne",
      "setting_tags": [
        "territory",
        "household",
        "pregnancy care",
        "urban center"
      ],
      "modern_location_tags": [
        "Puerto Rico"
      ],
      "summary_1_sentence": "The Zika crisis showed that geography, pregnancy, and political status all shape what counts as an American epidemic.",
      "historical_context": "The Zika crisis showed that geography, pregnancy, and political status all shape what counts as an American epidemic.",
      "public_health_significance": "Vector control, pregnancy surveillance, travel guidance, blood collection changes, testing, and birth-defects monitoring.",
      "mortality_or_burden_note": "Cases/burden: Thousands of confirmed and presumptive cases in CDC Puerto Rico reporting. Deaths/mortality: Deaths were not the primary burden; congenital outcomes were central.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "The Zika crisis showed that geography, pregnancy, and political status all shape what counts as an American epidemic.",
          "source_ids": [
            "cdc-zika-puerto-rico",
            "cdc-zika-us-cases"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Puerto Rico must not be treated as a footnote to continental U.S. Zika."
        },
        {
          "claim": "Vector control, pregnancy surveillance, travel guidance, blood collection changes, testing, and birth-defects monitoring.",
          "source_ids": [
            "cdc-zika-puerto-rico",
            "cdc-zika-us-cases"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "measles-2019",
      "title": "The 2019 measles resurgence nearly costs elimination status",
      "start_date": "2019-01-01",
      "end_date": "2019-10-01",
      "date_precision": "range",
      "era_id": "networked-risk",
      "polity_scope": "United States",
      "geography": "New York, Washington, and other outbreak-linked states",
      "pathogen_or_syndrome": "Measles virus",
      "disease_group": "vaccine-preventable",
      "transmission_ecology": "International importations, undervaccinated close-knit communities, misinformation, and school/community exposure.",
      "significance_tier": "hero",
      "case_estimate": "CDC reported 1,249 cases during January 1-October 1, 2019 in the MMWR update.",
      "death_estimate": "No deaths reported to CDC in that update.",
      "uncertainty_note": "Most cases were outbreak-associated; national population immunity still prevented wider spread.",
      "historical_thesis": "Measles elimination is a public-health verb, not a past-tense fact.",
      "public_health_response": "Emergency orders, vaccination campaigns, exclusion policies, contact tracing, and communication work.",
      "source_ids": [
        "cdc-measles-2019",
        "cdc-measles-surveillance"
      ],
      "asset_ids": [
        "measlesvirus"
      ],
      "related_posts": [
        "measles-resurgence-the-hidden-toll"
      ],
      "tags": [
        "vaccination",
        "misinformation",
        "public-health-turning-point",
        "respiratory",
        "modern",
        "urban center",
        "school",
        "household",
        "close-knit community"
      ],
      "confidence": "high",
      "start_year": 2019,
      "end_year": 2019,
      "date_display": "2019",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Measles resurgence",
      "pathogen_or_agent": "Measles virus",
      "transmission_category": "respiratory",
      "setting_tags": [
        "urban center",
        "school",
        "household",
        "close-knit community"
      ],
      "modern_location_tags": [
        "New York",
        "Washington",
        "United States"
      ],
      "summary_1_sentence": "Measles elimination is a public-health verb, not a past-tense fact.",
      "historical_context": "Measles elimination is a public-health verb, not a past-tense fact.",
      "public_health_significance": "Emergency orders, vaccination campaigns, exclusion policies, contact tracing, and communication work.",
      "mortality_or_burden_note": "Cases/burden: CDC reported 1,249 cases during January 1-October 1, 2019 in the MMWR update. Deaths/mortality: No deaths reported to CDC in that update.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Measles elimination is a public-health verb, not a past-tense fact.",
          "source_ids": [
            "cdc-measles-2019",
            "cdc-measles-surveillance"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Most cases were outbreak-associated; national population immunity still prevented wider spread."
        },
        {
          "claim": "Emergency orders, vaccination campaigns, exclusion policies, contact tracing, and communication work.",
          "source_ids": [
            "cdc-measles-2019",
            "cdc-measles-surveillance"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "covid-19-2020",
      "title": "COVID-19 becomes the American pandemic",
      "start_date": "2020-01-20",
      "end_date": "2021-12-31",
      "date_precision": "day",
      "era_id": "networked-risk",
      "polity_scope": "United States",
      "geography": "Nationwide, with early signals in Washington, California, New York, and other states",
      "pathogen_or_syndrome": "SARS-CoV-2",
      "disease_group": "respiratory",
      "transmission_ecology": "Respiratory transmission, travel, workplaces, households, long-term care, prisons, schools, inequality, and politicized risk.",
      "significance_tier": "hero",
      "case_estimate": "Tens of millions of documented U.S. cases by the end of 2021, with many infections undiagnosed.",
      "death_estimate": "Hundreds of thousands of U.S. deaths by the end of 2021.",
      "uncertainty_note": "Case counts are testing-dependent; death counts, certified COVID-19 deaths, and excess mortality are related but not identical measures.",
      "historical_thesis": "COVID-19 made every hidden public-health dependency suddenly visible: air, labor, trust, care homes, data, and state capacity.",
      "public_health_response": "Emergency operations, testing, distancing, masking, vaccination, therapeutics, ventilation arguments, and massive surveillance expansion.",
      "source_ids": [
        "cdc-covid-timeline",
        "cdc-covid-early-response-2020"
      ],
      "asset_ids": [
        "sars-cov-2-cdc"
      ],
      "related_posts": [
        "big-epidemiology-disease-at-the-scale"
      ],
      "tags": [
        "pandemic",
        "respiratory",
        "public-health-turning-point",
        "modern",
        "urban center",
        "household",
        "workplace",
        "school",
        "hospital",
        "prison"
      ],
      "confidence": "high",
      "start_year": 2020,
      "end_year": 2021,
      "date_display": "2020-2021",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "COVID-19 pandemic",
      "pathogen_or_agent": "SARS-CoV-2",
      "transmission_category": "respiratory",
      "setting_tags": [
        "urban center",
        "household",
        "workplace",
        "school",
        "hospital",
        "prison"
      ],
      "modern_location_tags": [
        "Washington",
        "California",
        "New York",
        "United States"
      ],
      "summary_1_sentence": "COVID-19 made every hidden public-health dependency suddenly visible: air, labor, trust, care homes, data, and state capacity.",
      "historical_context": "COVID-19 made every hidden public-health dependency suddenly visible: air, labor, trust, care homes, data, and state capacity.",
      "public_health_significance": "Emergency operations, testing, distancing, masking, vaccination, therapeutics, ventilation arguments, and massive surveillance expansion.",
      "mortality_or_burden_note": "Cases/burden: Tens of millions of documented U.S. cases by the end of 2021, with many infections undiagnosed. Deaths/mortality: Hundreds of thousands of U.S. deaths by the end of 2021.",
      "related_tool_links": [
        {
          "label": "Pathogen Atlas: COVID-19",
          "href": "../../atlases/pathogen/?q=covid"
        }
      ],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "COVID-19 made every hidden public-health dependency suddenly visible: air, labor, trust, care homes, data, and state capacity.",
          "source_ids": [
            "cdc-covid-timeline",
            "cdc-covid-early-response-2020"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Case counts are testing-dependent; death counts, certified COVID-19 deaths, and excess mortality are related but not identical measures."
        },
        {
          "claim": "Emergency operations, testing, distancing, masking, vaccination, therapeutics, ventilation arguments, and massive surveillance expansion.",
          "source_ids": [
            "cdc-covid-timeline",
            "cdc-covid-early-response-2020"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "covid-long-term-care-2020",
      "title": "Long-term care becomes COVID-19's moral ledger",
      "start_date": "2020-02-01",
      "end_date": "2021-12-31",
      "date_precision": "range",
      "era_id": "networked-risk",
      "polity_scope": "United States",
      "geography": "Nursing homes and long-term care facilities nationwide",
      "pathogen_or_syndrome": "SARS-CoV-2",
      "disease_group": "respiratory",
      "transmission_ecology": "Congregate care, staff movement, age, disability, ventilation, PPE scarcity, and fragmented oversight.",
      "significance_tier": "major",
      "case_estimate": "Large facility-associated burden",
      "death_estimate": "A major share of early U.S. COVID-19 deaths occurred among long-term care residents.",
      "uncertainty_note": "Facility reporting systems changed during 2020; exact national burden depends on definitions and data source.",
      "historical_thesis": "The pandemic found the places where society had warehoused vulnerability.",
      "public_health_response": "Visitor restrictions, PPE, testing, vaccination prioritization, infection-control teams, and reporting requirements.",
      "source_ids": [
        "cdc-covid-ltc-king-county",
        "cdc-covid-ltc-nursing-homes-2020"
      ],
      "asset_ids": [
        "sars-cov-2-cdc"
      ],
      "related_posts": [],
      "tags": [
        "congregate-care",
        "inequality",
        "public-health-turning-point",
        "respiratory",
        "modern",
        "long-term care",
        "hospital",
        "workplace"
      ],
      "confidence": "high",
      "start_year": 2020,
      "end_year": 2021,
      "date_display": "2020-2021",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "COVID-19 in long-term care",
      "pathogen_or_agent": "SARS-CoV-2",
      "transmission_category": "respiratory",
      "setting_tags": [
        "long-term care",
        "hospital",
        "workplace"
      ],
      "modern_location_tags": [
        "Washington",
        "United States"
      ],
      "summary_1_sentence": "COVID-19 in long-term care showed how congregate care, staffing, age, disability, and infection control could concentrate pandemic mortality.",
      "historical_context": "Long-term care facilities entered the pandemic with residents at high risk of severe disease and with staffing, PPE, testing, and oversight systems that were easy for SARS-CoV-2 to exploit.",
      "public_health_significance": "The event made facility-level surveillance, infection prevention, staffing policy, vaccine prioritization, and transparent reporting central to pandemic public health.",
      "mortality_or_burden_note": "Cases/burden: Large facility-associated burden Deaths/mortality: A major share of early U.S. COVID-19 deaths occurred among long-term care residents.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "COVID-19 in long-term care showed how congregate care, staffing, age, disability, and infection control could concentrate pandemic mortality.",
          "source_ids": [
            "cdc-covid-ltc-king-county",
            "cdc-covid-ltc-nursing-homes-2020"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Facility reporting systems changed during 2020; exact national burden depends on definitions and data source."
        },
        {
          "claim": "The event made facility-level surveillance, infection prevention, staffing policy, vaccine prioritization, and transparent reporting central to pandemic public health.",
          "source_ids": [
            "cdc-covid-ltc-king-county",
            "cdc-covid-ltc-nursing-homes-2020"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "mpox-2022",
      "title": "Mpox exposes networked risk and vaccine scarcity",
      "start_date": "2022-05-10",
      "end_date": "2023-04-30",
      "date_precision": "day",
      "era_id": "networked-risk",
      "polity_scope": "United States",
      "geography": "Urban sexual networks and national response",
      "pathogen_or_syndrome": "Mpox virus, clade IIb",
      "disease_group": "smallpox",
      "transmission_ecology": "Close physical and sexual contact networks, HIV comorbidity, stigma, testing access, and vaccine allocation.",
      "significance_tier": "hero",
      "case_estimate": "About 30,000 U.S. cases in CDC 2022 reporting windows.",
      "death_estimate": "Deaths were uncommon but concentrated among severely immunocompromised people.",
      "uncertainty_note": "Case ascertainment followed testing access, stigma, and clinical recognition.",
      "historical_thesis": "Mpox showed that a disease can be both biologically old and socially new in a specific transmission network.",
      "public_health_response": "Testing expansion, isolation guidance, contact tracing, JYNNEOS vaccination, community partnership, and treatment access.",
      "source_ids": [
        "cdc-mpox-2022",
        "cdc-mpox-response"
      ],
      "asset_ids": [
        "mpox-virus-2003-cdc"
      ],
      "related_posts": [],
      "tags": [
        "orthopox",
        "sexual-networks",
        "public-health-turning-point",
        "sexually transmitted",
        "modern",
        "sexual network",
        "urban center",
        "clinic"
      ],
      "confidence": "high",
      "start_year": 2022,
      "end_year": 2023,
      "date_display": "2022-2023",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Mpox outbreak",
      "pathogen_or_agent": "Mpox virus, clade IIb",
      "transmission_category": "sexually transmitted",
      "setting_tags": [
        "sexual network",
        "urban center",
        "clinic"
      ],
      "modern_location_tags": [
        "United States",
        "urban centers"
      ],
      "summary_1_sentence": "Mpox showed that a disease can be both biologically old and socially new in a specific transmission network.",
      "historical_context": "Mpox showed that a disease can be both biologically old and socially new in a specific transmission network.",
      "public_health_significance": "Testing expansion, isolation guidance, contact tracing, JYNNEOS vaccination, community partnership, and treatment access.",
      "mortality_or_burden_note": "Cases/burden: About 30,000 U.S. cases in CDC 2022 reporting windows. Deaths/mortality: Deaths were uncommon but concentrated among severely immunocompromised people.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Mpox showed that a disease can be both biologically old and socially new in a specific transmission network.",
          "source_ids": [
            "cdc-mpox-2022",
            "cdc-mpox-response"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "Case ascertainment followed testing access, stigma, and clinical recognition."
        },
        {
          "claim": "Testing expansion, isolation guidance, contact tracing, JYNNEOS vaccination, community partnership, and treatment access.",
          "source_ids": [
            "cdc-mpox-2022",
            "cdc-mpox-response"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    },
    {
      "id": "polio-new-york-2022",
      "title": "Polio returns through wastewater and undervaccination",
      "start_date": "2022-06-01",
      "end_date": "2022-10-31",
      "date_precision": "month",
      "era_id": "networked-risk",
      "polity_scope": "United States",
      "geography": "Rockland County, New York, New York City region, and wastewater catchments",
      "pathogen_or_syndrome": "Vaccine-derived poliovirus type 2",
      "disease_group": "vaccine-preventable",
      "transmission_ecology": "Undervaccinated communities, fecal-oral spread, wastewater surveillance, and global vaccine-derived poliovirus links.",
      "significance_tier": "hero",
      "case_estimate": "One paralytic case plus wastewater evidence of broader transmission.",
      "death_estimate": "No large mortality signal.",
      "uncertainty_note": "A single paralytic case implies many infections can be invisible.",
      "historical_thesis": "Polio's return was less a surprise than a reminder that elimination depends on coverage and surveillance.",
      "public_health_response": "Vaccination campaigns, provider alerts, wastewater testing, emergency communication, and genomic linkage.",
      "source_ids": [
        "cdc-polio-ny-2022",
        "cdc-polio-wastewater-2022"
      ],
      "asset_ids": [
        "poliovirus-cdc-tem"
      ],
      "related_posts": [],
      "tags": [
        "vaccination",
        "wastewater",
        "public-health-turning-point",
        "fecal-oral/waterborne",
        "modern",
        "wastewater system",
        "household",
        "community",
        "laboratory"
      ],
      "confidence": "high",
      "start_year": 2022,
      "end_year": 2022,
      "date_display": "2022",
      "century": "21st century",
      "period_tags": [
        "modern"
      ],
      "disease_or_condition": "Vaccine-derived poliovirus detection",
      "pathogen_or_agent": "Vaccine-derived poliovirus type 2",
      "transmission_category": "fecal-oral/waterborne",
      "setting_tags": [
        "wastewater system",
        "household",
        "community",
        "laboratory"
      ],
      "modern_location_tags": [
        "New York",
        "Rockland County",
        "New York City region"
      ],
      "summary_1_sentence": "Polio's return was less a surprise than a reminder that elimination depends on coverage and surveillance.",
      "historical_context": "Polio's return was less a surprise than a reminder that elimination depends on coverage and surveillance.",
      "public_health_significance": "Vaccination campaigns, provider alerts, wastewater testing, emergency communication, and genomic linkage.",
      "mortality_or_burden_note": "Cases/burden: One paralytic case plus wastewater evidence of broader transmission. Deaths/mortality: No large mortality signal.",
      "related_tool_links": [],
      "related_blog_links": [],
      "claims": [
        {
          "claim": "Polio's return was less a surprise than a reminder that elimination depends on coverage and surveillance.",
          "source_ids": [
            "cdc-polio-ny-2022",
            "cdc-polio-wastewater-2022"
          ],
          "confidence": "high",
          "claim_type": "timeline teaching summary",
          "notes": "A single paralytic case implies many infections can be invisible."
        },
        {
          "claim": "Vaccination campaigns, provider alerts, wastewater testing, emergency communication, and genomic linkage.",
          "source_ids": [
            "cdc-polio-ny-2022",
            "cdc-polio-wastewater-2022"
          ],
          "confidence": "high",
          "claim_type": "public-health interpretation",
          "notes": "Interpretive synthesis; do not convert into monocausal historical explanation."
        }
      ]
    }
  ],
  "excluded_candidates": [
    {
      "title": "1520s smallpox in Mexico and the Caribbean",
      "reason": "Important for hemispheric epidemic history, but outside the primary present-day U.S./colonial North America scope for this first flagship cut."
    },
    {
      "title": "Pontiac War smallpox allegations",
      "reason": "Historically important but needs a tighter specialist source packet before public display because biological-warfare claims are often flattened into certainty."
    },
    {
      "title": "Flint water crisis and Legionella",
      "reason": "Potentially strong public-health infrastructure case, but it needs careful separation of lead exposure, Legionella, governance failure, and attributable mortality."
    },
    {
      "title": "Opioid overdose epidemic",
      "reason": "Outside this infectious-disease-first timeline unless a future noninfectious epidemic layer is intentionally added."
    },
    {
      "title": "2024-2026 H5N1 dairy cattle outbreak",
      "reason": "Too current for this historical teaching cut without a live-source refresh immediately before publication."
    },
    {
      "title": "Very recent measles activity after 2019",
      "reason": "Can be added later with current CDC/state data; this pass avoids unstable current-event counts."
    }
  ],
  "future_human_review_claims": [
    "Civil War disease entries should be checked against the specific volumes/tables of The Medical and Surgical History of the War of the Rebellion before adding numeric disease-specific mortality.",
    "Smallpox among formerly enslaved people is important enough to keep, but exact regional counts should be reviewed against Jim Downs and Freedmen's Bureau records before being displayed.",
    "Tuberculosis public-health movement needs a future city-level vital-statistics layer if the tool starts showing mortality curves.",
    "COVID-19 and long-term-care entries should be refreshed against finalized federal datasets before adding precise cumulative burden numbers.",
    "Indigenous epidemic entries need human review before expanding beyond the 1616-1619 and 1633 New England cases."
  ]
};
