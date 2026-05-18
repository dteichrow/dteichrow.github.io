window.MARITIME_DISEASE_ATLAS_GEOJSON = {
  "type": "FeatureCollection",
  "name": "maritime_disease_ecology_atlas",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "west_africa",
        "feature_type": "site",
        "group": "Fevers and Vectors",
        "name": "West African Coast",
        "scenario": "yellow_fever",
        "caption": "Yellow fever is a mosquito-borne viral disease with African roots; Atlantic shipping carried infected people and vector conditions toward the Americas.",
        "mechanism": "Warm ports, stored water, Aedes mosquitoes, people, and non-human primate cycles made this a vector ecology shaped by maritime movement."
      },
      "geometry": { "type": "Point", "coordinates": [-0.20, 5.55] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "west_africa_malaria",
        "feature_type": "site",
        "group": "Malaria and Mosquitoes",
        "name": "West Africa / Malarial Fevers",
        "scenario": "malaria",
        "caption": "Malaria is a parasitic disease; this route follows tropical mosquito ecology before reaching Caribbean waters.",
        "mechanism": "Malaria is caused by Plasmodium parasites transmitted by infected Anopheles mosquitoes. Warm climates, water storage, and uneven immunity shape risk."
      },
      "geometry": { "type": "Point", "coordinates": [-4.5, 6.2] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "smallpox_origin_camel",
        "feature_type": "site",
        "group": "Respiratory Viruses",
        "name": "East African / camel-linked orthopox hypothesis",
        "scenario": "smallpox",
        "caption": "One molecular-origin model places variola emergence in eastern Africa 3,000 to 4,000 years ago and treats camel movement as a possible trigger within a debated source ecology.",
        "mechanism": "Smallpox was caused by variola virus, an Orthopoxvirus. Camel-linked origin remains a hypothesis in the literature, so this point marks a debated source ecology."
      },
      "geometry": { "type": "Point", "coordinates": [36.0, 15.5] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "measles_origin_rinderpest",
        "feature_type": "site",
        "group": "Respiratory Viruses",
        "name": "Cattle / rinderpest ancestry",
        "scenario": "measles",
        "caption": "Measles is generally treated as a human morbillivirus related to rinderpest, with emergence tied to dense human-cattle settlement.",
        "mechanism": "The closest known relative of measles virus was rinderpest virus. A 2020 molecular-clock study supports possible divergence as early as the 6th century BCE."
      },
      "geometry": { "type": "Point", "coordinates": [35.5, 32.0] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "saint_domingue",
        "feature_type": "site",
        "group": "Fevers and Vectors",
        "name": "Saint-Domingue / Caribbean Fever Ecology",
        "scenario": "yellow_fever",
        "caption": "The Caribbean shows yellow fever as port-and-plantation ecology: mosquitoes, stored water, dense movement, and non-immune arrivals.",
        "mechanism": "Ships carried infected people, Aedes mosquitoes, water containers, and port conditions into places where yellow fever transmission could restart."
      },
      "geometry": { "type": "Point", "coordinates": [-72.30, 18.95] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "philadelphia_1793",
        "feature_type": "site",
        "group": "Fevers and Vectors",
        "name": "Philadelphia, 1793",
        "scenario": "yellow_fever",
        "caption": "A port-city endpoint where ship movement, refugees, summer heat, urban density, and mosquito habitat converged.",
        "mechanism": "Maritime disease ecology reached beyond the dock."
      },
      "geometry": { "type": "Point", "coordinates": [-75.1652, 39.9526] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "hms_salisbury",
        "feature_type": "site",
        "group": "Scurvy and Provisions",
        "name": "HMS Salisbury",
        "scenario": "scurvy",
        "caption": "James Lind's 1747 scurvy trial gives the scurvy route a concrete shipboard case.",
        "mechanism": "Scurvy is a logistics disease: time at sea, preserved food, and missing vitamin C."
      },
      "geometry": { "type": "Point", "coordinates": [-5.5, 49.8] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "north_atlantic_crossing",
        "feature_type": "site",
        "group": "Scurvy and Provisions",
        "name": "North Atlantic Crossing",
        "scenario": "scurvy",
        "caption": "The open ocean turns provisioning into a clock. The longer the crossing, the more the ship's diet becomes a biological trap.",
        "mechanism": "A route between fresh-food departure and deficiency arrival."
      },
      "geometry": { "type": "Point", "coordinates": [-38.0, 43.5] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "nassau",
        "feature_type": "site",
        "group": "Pirate Network",
        "name": "Nassau, New Providence",
        "scenario": "pirate_network",
        "alwaysShow": true,
        "caption": "The pirate republic sits inside a wider port network where epidemiological risk accumulates.",
        "mechanism": "Pirate crews moved through places where food, water, mosquito vectors, infected people, injuries, and provisions mixed."
      },
      "geometry": { "type": "Point", "coordinates": [-77.3504, 25.0443] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "port_royal",
        "feature_type": "site",
        "group": "Pirate Network",
        "name": "Port Royal, Jamaica",
        "scenario": "pirate_network",
        "alwaysShow": true,
        "caption": "A tropical port is an ecological exchange point with pirate history around it.",
        "mechanism": "Sailors, merchants, enslaved people, stored water, mosquitoes, wounds, alcohol, and provisions overlapped."
      },
      "geometry": { "type": "Point", "coordinates": [-76.8411, 17.9376] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "tortuga",
        "feature_type": "site",
        "group": "Pirate Network",
        "name": "Tortuga",
        "scenario": "pirate_network",
        "alwaysShow": true,
        "caption": "Island bases let crews reprovision, recruit, recover, and carry risk into the next voyage.",
        "mechanism": "Pirate geography matters because ports reset the ship ecology."
      },
      "geometry": { "type": "Point", "coordinates": [-72.7925, 20.0420] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "london_naval",
        "feature_type": "site",
        "group": "Crowding and Flux",
        "name": "London / Naval Hospitals",
        "scenario": "ship_fever",
        "caption": "A practical hygiene point: bathing, clean clothes, delousing, ventilation, and bedding.",
        "mechanism": "Epidemic typhus is caused by Rickettsia prowazekii and spread by infected body lice, especially where people cannot bathe or change clothes regularly."
      },
      "geometry": { "type": "Point", "coordinates": [-0.1276, 51.5072] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "below_deck",
        "feature_type": "site",
        "group": "Ship Interior",
        "name": "Below Deck",
        "scenario": "ship_fever",
        "caption": "This is the shipboard disease machine: bunks, bedding, clothing, lice, bad air, dirty water, and no escape from exposure.",
        "mechanism": "Typhus, flux, and other shipboard illnesses shared this confined environment, but they moved through different mechanisms: lice, contaminated food or water, wounds, and respiratory spread."
      },
      "geometry": { "type": "Point", "coordinates": [-50.0, 32.0] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "port_arrival",
        "feature_type": "site",
        "group": "Respiratory Viruses",
        "name": "Port Arrival / Quarantine",
        "caption": "Smallpox and measles move through close quarters aboard ship, then into susceptible populations ashore.",
        "mechanism": "Voyage length, isolation, bedding, clothes, and port quarantine shaped whether measles virus or variola virus cases burned out aboard ship or spread after arrival."
      },
      "geometry": { "type": "Point", "coordinates": [-69.5, 41.8] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "smallpox_hulks",
        "feature_type": "site",
        "group": "Respiratory Viruses",
        "name": "Smallpox Hospital Ships",
        "scenario": "smallpox",
        "caption": "Hospital hulks make the port-health problem visible: ships could isolate disease as well as transport it.",
        "mechanism": "Smallpox quarantine and isolation were maritime infrastructures as much as medical decisions."
      },
      "geometry": { "type": "Point", "coordinates": [0.035, 51.49] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "ship_surgery",
        "feature_type": "site",
        "group": "Wounds and Sepsis",
        "name": "Ship Surgery / Wound Care",
        "scenario": "wounds_sepsis",
        "caption": "Injury became infectious inside the ship environment.",
        "mechanism": "Cuts, fractures, stab wounds, burns, unwashed tools, dirty bandages, bedding, and delayed care created infection risk. Sepsis is the dangerous systemic response to severe infection."
      },
      "geometry": { "type": "Point", "coordinates": [-42.0, 28.0] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "water_cask",
        "feature_type": "site",
        "group": "Flux and Enteric Disease",
        "name": "Water Cask / Latrine Boundary",
        "scenario": "flux",
        "caption": "Contaminated food and water formed the route of exposure.",
        "mechanism": "Flux and dysentery are syndromic labels. Bacteria such as Shigella, and sometimes protozoal parasites, spread through fecally contaminated water, food, hands, and surfaces."
      },
      "geometry": { "type": "Point", "coordinates": [-46.0, 21.0] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "food_water_typhi",
        "feature_type": "site",
        "group": "Food and Water",
        "name": "Food and Water Contamination",
        "scenario": "typhoid",
        "caption": "Typhoid fever sits beside flux: contaminated food and water, overlapping symptoms, and hygiene interventions before germ theory.",
        "mechanism": "Typhoid fever is caused by Salmonella Typhi. Water casks, hands, food, and fecal contamination define this food-water ecology."
      },
      "geometry": { "type": "Point", "coordinates": [-43.0, 24.5] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "grosse_ile_quarantine",
        "feature_type": "site",
        "group": "Crowding and Flux",
        "name": "Grosse Île Quarantine Station",
        "scenario": "ship_fever",
        "caption": "A later but concrete North Atlantic quarantine endpoint for fever ships, crowding, and body-louse risk.",
        "mechanism": "Ship fever was epidemic typhus: Rickettsia prowazekii transmitted by infected body lice in conditions of crowding and poor hygiene."
      },
      "geometry": { "type": "Point", "coordinates": [-70.67, 47.02] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "brookes_middle_passage",
        "feature_type": "site",
        "group": "Extreme Burden",
        "name": "Brookes / Middle Passage",
        "scenario": "middle_passage",
        "caption": "Maritime disease ecology under coercion, violence, dehydration, malnutrition, crowding, and no meaningful agency.",
        "mechanism": "The Middle Passage is the catastrophic extreme case."
      },
      "geometry": { "type": "Point", "coordinates": [-35.0, 12.0] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "cape_fear",
        "feature_type": "site",
        "group": "Pirate Network",
        "name": "Cape Fear / Carolina Coast",
        "scenario": "pirate_network",
        "alwaysShow": true,
        "caption": "A Blackbeard-adjacent coastal endpoint for pirate movement along Atlantic ports.",
        "mechanism": "Pirates make the geography visible, but the route is the epidemiological unit."
      },
      "geometry": { "type": "Point", "coordinates": [-78.02, 33.90] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "route_yellow_fever",
        "feature_type": "route",
        "group": "Fevers and Vectors",
        "name": "Yellow Fever Atlantic Route",
        "scenario": "yellow_fever",
        "caption": "Africa to Caribbean to North American port city: ecology, movement, and port conditions."
      },
      "geometry": { "type": "LineString", "coordinates": [[-0.20, 5.55], [-25.0, 9.0], [-52.0, 15.0], [-72.30, 18.95], [-75.1652, 39.9526]] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "route_malaria",
        "feature_type": "route",
        "group": "Malaria and Mosquitoes",
        "name": "Malaria Tropical Route",
        "scenario": "malaria",
        "caption": "A tropical route for mosquito breeding, water storage, and exposure in West Africa and the Caribbean."
      },
      "geometry": { "type": "LineString", "coordinates": [[-4.5, 6.2], [-30.0, 9.0], [-61.0, 14.5], [-76.8411, 17.9376]] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "route_scurvy",
        "feature_type": "route",
        "group": "Scurvy and Provisions",
        "name": "Scurvy Provisioning Clock",
        "scenario": "scurvy",
        "caption": "The route is a timer: as fresh foods disappear, deficiency risk rises."
      },
      "geometry": { "type": "LineString", "coordinates": [[-5.5, 49.8], [-38.0, 43.5], [-77.3504, 25.0443]] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "route_ship_fever",
        "feature_type": "route",
        "group": "Crowding and Flux",
        "name": "Ship Fever Crowding Route",
        "scenario": "ship_fever",
        "caption": "The route matters less than the interior ecology: lice, clothes, bedding, and ventilation travel with the crew."
      },
      "geometry": { "type": "LineString", "coordinates": [[-0.1276, 51.5072], [-34.0, 48.0], [-70.67, 47.02]] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "route_flux",
        "feature_type": "route",
        "group": "Flux and Enteric Disease",
        "name": "Flux Ship-Interior Route",
        "scenario": "flux",
        "caption": "A schematic below-deck route between bodies, water storage, latrine boundaries, food, and waste."
      },
      "geometry": { "type": "LineString", "coordinates": [[-50.0, 32.0], [-48.4, 27.6], [-46.0, 21.0]] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "route_typhoid",
        "feature_type": "route",
        "group": "Food and Water",
        "name": "Typhoid Food-Water Route",
        "scenario": "typhoid",
        "caption": "A food-and-water route for Salmonella Typhi exposure, ship hygiene, and contaminated provisions."
      },
      "geometry": { "type": "LineString", "coordinates": [[-0.1276, 51.5072], [-43.0, 24.5], [-76.8411, 17.9376]] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "route_smallpox",
        "feature_type": "route",
        "group": "Respiratory Viruses",
        "name": "Smallpox Maritime Route",
        "scenario": "smallpox",
        "caption": "A cautious deep-origin route from camel-linked orthopox hypothesis to shipboard transmission, isolation hulks, and port quarantine."
      },
      "geometry": { "type": "LineString", "coordinates": [[36.0, 15.5], [20.0, 26.0], [-8.0, 42.0], [-50.0, 32.0], [0.035, 51.49], [-69.5, 41.8]] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "route_measles",
        "feature_type": "route",
        "group": "Respiratory Viruses",
        "name": "Measles Maritime Route",
        "scenario": "measles",
        "caption": "A rinderpest-linked ancestry route that becomes a shipboard air, crowding, and port-arrival problem."
      },
      "geometry": { "type": "LineString", "coordinates": [[35.5, 32.0], [10.0, 41.0], [-8.0, 42.0], [-50.0, 32.0], [-69.5, 41.8]] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "route_wounds_sepsis",
        "feature_type": "route",
        "group": "Wounds and Sepsis",
        "name": "Wound Infection Route",
        "scenario": "wounds_sepsis",
        "caption": "A ship-interior route for injury, wound care, gangrene, amputation, and sepsis."
      },
      "geometry": { "type": "LineString", "coordinates": [[-50.0, 32.0], [-42.0, 28.0], [-76.8411, 17.9376]] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "route_middle_passage",
        "feature_type": "route",
        "group": "Extreme Burden",
        "name": "Middle Passage Burden Route",
        "scenario": "middle_passage",
        "caption": "A forced route where confinement, malnutrition, dehydration, violence, and infection compounded."
      },
      "geometry": { "type": "LineString", "coordinates": [[-0.20, 5.55], [-35.0, 12.0], [-72.30, 18.95]] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "route_pirate_network",
        "feature_type": "route",
        "group": "Pirate Network",
        "name": "Pirate Caribbean Network",
        "scenario": "pirate_network",
        "alwaysShow": true,
        "caption": "The pirate route sits beneath the disease routes as geographic context."
      },
      "geometry": { "type": "LineString", "coordinates": [[-77.3504, 25.0443], [-76.8411, 17.9376], [-72.7925, 20.0420], [-78.02, 33.90], [-77.3504, 25.0443]] }
    }
  ]
};

window.MARITIME_DISEASE_SCENARIOS = {
  "pirate_network": {
    "title": "Pirate Ports: the geography underneath",
    "kicker": "Pirate context",
    "summary": "Nassau, Port Royal, Tortuga, Cape Fear, and the port network that made disease ecology mobile.",
    "color": "#c9a84c",
    "featureIds": ["nassau", "port_royal", "tortuga", "cape_fear", "route_pirate_network"],
    "steps": [
      { "kind": "point", "featureId": "nassau", "zoom": 6, "label": "Pirate republic", "kicker": "Step 1 | Pirate base", "title": "Start at Nassau.", "copy": "The pirate republic was a port ecosystem: crews, provisions, injuries, stolen goods, alcohol, water, and disease risk all moved through it.", "hold": 3000 },
      { "kind": "point", "featureId": "port_royal", "zoom": 6, "label": "Tropical exchange point", "kicker": "Step 2 | Port ecology", "title": "Move to Port Royal.", "copy": "A tropical port links maritime labor, mosquito habitat, provisioning, wounds, commerce, and repeated exposure.", "hold": 3000 },
      { "kind": "point", "featureId": "tortuga", "zoom": 6, "label": "Island base", "kicker": "Step 3 | Island base", "title": "Tortuga resets the ship ecology.", "copy": "Island bases let crews recruit, recover, reprovision, and carry their health risks into the next voyage.", "hold": 3000 },
      { "kind": "point", "featureId": "cape_fear", "zoom": 6, "label": "Atlantic endpoint", "kicker": "Step 4 | Coastal endpoint", "title": "The route reaches the Carolina coast.", "copy": "Cape Fear gives the pirate network a North American endpoint without turning it into a disease-origin claim.", "hold": 3000 },
      { "kind": "route", "featureId": "route_pirate_network", "label": "Pirate network", "kicker": "Step 5 | Network", "title": "The ports make the epidemiology mobile.", "copy": "Pirates make the geography legible. The disease story comes from what moves through this network.", "hold": 3400, "art": { "src": "assets/context/nassau_plan_1788.jpg", "title": "Plan of Nassau harbor and town, 1788", "kicker": "Harbor plan", "credit": "Wikimedia Commons, CC0/public domain", "position": "center center", "fit": "contain" } }
    ]
  },
  "yellow_fever": {
    "title": "Yellow Fever: origin, vector, port outbreak",
    "kicker": "Vector route",
    "summary": "African vector ecology, mosquito transmission, Atlantic movement, Caribbean amplification, and a North American port outbreak.",
    "color": "#d86a4f",
    "featureIds": ["west_africa", "saint_domingue", "philadelphia_1793", "route_yellow_fever", "nassau", "port_royal"],
    "steps": [
      {
        "kind": "point",
        "featureId": "west_africa",
        "zoom": 5,
        "label": "Origin ecology: Africa",
        "kicker": "Step 1 | Origin ecology",
        "title": "Start with African yellow-fever ecology.",
        "copy": "Yellow fever is viral. The route links African yellow-fever ecology, infected people, Aedes mosquitoes, stored water, and Atlantic port systems.",
        "hold": 3100
      },
      {
        "kind": "mechanism",
        "visual": "mosquito",
        "label": "Vector: Aedes aegypti",
        "kicker": "Step 2 | Vector",
        "title": "The mosquito carries the virus.",
        "copy": "Yellow fever virus is transmitted by infected mosquitoes, especially Aedes aegypti in urban cycles. Stored water, warm climates, and susceptible people create transmission opportunities.",
        "hold": 4200
      },
      {
        "kind": "route",
        "featureId": "route_yellow_fever",
        "label": "Atlantic movement",
        "kicker": "Step 3 | Route",
        "title": "Now the route becomes ecological.",
        "copy": "The route line shows how Atlantic movement connected vector ecology, forced migration, ports, and non-immune populations.",
        "hold": 3400
      },
      {
        "kind": "point",
        "featureId": "saint_domingue",
        "zoom": 6,
        "label": "Caribbean amplification",
        "kicker": "Step 4 | Where it takes hold",
        "title": "Caribbean ports made the disease legible.",
        "copy": "Warm ports, plantation economies, shipping, water storage, Aedes mosquitoes, and vulnerable newcomers create the conditions for amplification.",
        "hold": 3400
      },
      {
        "kind": "point",
        "featureId": "philadelphia_1793",
        "zoom": 7,
        "label": "Port-city endpoint",
        "kicker": "Step 5 | Port outbreak",
        "title": "Then the ship ecology reaches a city.",
        "copy": "Ports translate ship movement into urban epidemics.",
        "hold": 3600
      }
    ]
  },
  "scurvy": {
    "title": "Scurvy: the provisioning clock",
    "kicker": "Logistics disease",
    "summary": "Scurvy is the cleanest logistics contrast: time at sea and the disappearance of fresh food.",
    "color": "#a8864a",
    "featureIds": ["hms_salisbury", "north_atlantic_crossing", "nassau", "route_scurvy"],
    "steps": [
      { "kind": "point", "featureId": "hms_salisbury", "zoom": 6, "label": "Shipboard case", "kicker": "Step 1 | Shipboard case", "title": "Lind's trial begins aboard ship.", "copy": "HMS Salisbury gives the scurvy route a concrete experiment and a source case.", "hold": 3000 },
      { "kind": "mechanism", "visual": "clock", "label": "Mechanism: deficiency over time", "kicker": "Step 2 | Mechanism", "title": "Scurvy follows a provisioning clock.", "copy": "Fresh food disappears. Vitamin C intake collapses. Connective tissue fails. The route becomes a timer.", "hold": 3900 },
      { "kind": "route", "featureId": "route_scurvy", "label": "Long voyage route", "kicker": "Step 3 | Route", "title": "The longer the route, the louder the clock.", "copy": "The route connects ship time with citrus and scurvy manuscripts.", "hold": 3300 }
    ]
  },
  "malaria": {
    "title": "Malaria: tropical route ecology",
    "kicker": "Mosquito route",
    "summary": "Plasmodium parasites, Anopheles mosquitoes, warm ports, standing water, tropical routes, and uneven immunity.",
    "color": "#9b7bd8",
    "featureIds": ["west_africa_malaria", "port_royal", "route_malaria"],
    "steps": [
      { "kind": "point", "featureId": "west_africa_malaria", "zoom": 5, "label": "Tropical ecology", "kicker": "Step 1 | Tropical ecology", "title": "Begin where parasite and vector can meet.", "copy": "Malaria follows Plasmodium parasites, Anopheles mosquitoes, water, climate, and differential immunity.", "hold": 3100 },
      { "kind": "mechanism", "visual": "mosquito", "label": "Vector: Anopheles mosquito", "kicker": "Step 2 | Vector", "title": "Anopheles mosquitoes transmit the parasite.", "copy": "Water barrels and warm ports can create mosquito habitat, but malaria transmission requires infected Anopheles mosquitoes and infected human reservoirs.", "hold": 3900 },
      { "kind": "route", "featureId": "route_malaria", "label": "Tropical route", "kicker": "Step 3 | Route", "title": "The route tracks climate and exposure.", "copy": "Malaria shares tropical route conditions with yellow fever, but it is a parasitic disease with a different vector ecology.", "hold": 3300 }
    ]
  },
  "ship_fever": {
    "title": "Ship Fever: lice, clothes, crowding",
    "kicker": "Crowding disease",
    "summary": "Rickettsia prowazekii, infected body lice, below-deck crowding, and dirty clothing.",
    "color": "#5d958c",
    "featureIds": ["london_naval", "below_deck", "grosse_ile_quarantine", "route_ship_fever"],
    "steps": [
      { "kind": "point", "featureId": "london_naval", "zoom": 6, "label": "Observation context", "kicker": "Step 1 | Observation", "title": "Start with practical hygiene before germ theory.", "copy": "Bathing, clean linens, delousing, and ventilation could help even when explanations were incomplete.", "hold": 3000 },
      { "kind": "point", "featureId": "below_deck", "zoom": 5, "label": "Below deck", "kicker": "Step 2 | Interior ecology", "title": "Now go below deck.", "copy": "The real map is the ship interior: bedding, clothing, bodies, lice, and stagnant air.", "hold": 3000 },
      { "kind": "mechanism", "visual": "louse", "label": "Vector: body louse", "kicker": "Step 3 | Vector", "title": "The vector lives in the conditions.", "copy": "Epidemic typhus is caused by Rickettsia prowazekii. People are infected through contact with infected body lice or their feces, especially where hygiene breaks down.", "hold": 4100 },
      { "kind": "point", "featureId": "grosse_ile_quarantine", "zoom": 6, "label": "Quarantine endpoint", "kicker": "Step 4 | Fever ships", "title": "A fever ship becomes a port problem.", "copy": "Grosse Île gives ship fever a concrete quarantine landscape: crowded Atlantic movement, lice, illness, and public-health infrastructure.", "hold": 3600 },
      { "kind": "route", "featureId": "route_ship_fever", "label": "North Atlantic fever route", "kicker": "Step 5 | Route", "title": "The route follows people and clothing.", "copy": "Crowding, hygiene, bedding, and clothing carry the fever story across the sea.", "hold": 3400 }
    ]
  },
  "flux": {
    "title": "Flux: water, food, waste, confinement",
    "kicker": "Enteric route",
    "summary": "Fecal-oral exposure, contaminated hands, unsafe water, spoiled food, crowding, and severe dehydration.",
    "color": "#5a9bd4",
    "featureIds": ["below_deck", "water_cask", "route_flux"],
    "steps": [
      { "kind": "point", "featureId": "below_deck", "zoom": 5, "label": "Ship interior", "kicker": "Step 1 | Below deck", "title": "Bodies and waste share space.", "copy": "Close quarters, primitive sanitation, contaminated water, and limited isolation create enteric risk.", "hold": 3000 },
      { "kind": "point", "featureId": "water_cask", "zoom": 6, "label": "Water and latrine boundary", "kicker": "Step 2 | Exposure point", "title": "Now move to the water-waste boundary.", "copy": "Flux belongs where drinking water, food handling, latrines, hands, and sick bodies are too close together.", "hold": 3300 },
      { "kind": "mechanism", "visual": "barrel", "label": "Mechanism: fecal-oral spread", "kicker": "Step 3 | Mechanism", "title": "The barrel is an exposure object.", "copy": "Water storage, spoiled food, dirty hands, and latrine proximity turn the ship into an enteric disease machine.", "hold": 4200 },
      { "kind": "route", "featureId": "route_flux", "label": "Exposure route", "kicker": "Step 4 | Route", "title": "The route is inside the ship.", "copy": "Its map is the daily path between food, water, waste, hands, and bodies.", "hold": 3400 }
    ]
  },
  "typhoid": {
    "title": "Typhoid: food and water fever",
    "kicker": "Enteric fever",
    "summary": "Salmonella Typhi, fecally contaminated food or water, overlapping fever symptoms, and pre-germ-theory hygiene.",
    "color": "#7aa96b",
    "featureIds": ["london_naval", "food_water_typhi", "route_typhoid"],
    "steps": [
      { "kind": "point", "featureId": "london_naval", "zoom": 6, "label": "Hygiene observation", "kicker": "Step 1 | Hygiene", "title": "Start with the shared fever problem.", "copy": "Lind's hygiene logic sits across fever diseases: cleaning, ventilation, linen, clothing, and food-water control.", "hold": 3000 },
      { "kind": "mechanism", "visual": "barrel", "label": "Mechanism: contaminated food and water", "kicker": "Step 2 | Mechanism", "title": "The exposure route runs through provisions.", "copy": "Typhoid fever is caused by Salmonella Typhi, commonly transmitted through food or drinking water contaminated with feces from an ill person or carrier.", "hold": 3900 },
      { "kind": "point", "featureId": "food_water_typhi", "zoom": 6, "label": "Food-water source", "kicker": "Step 3 | Source ecology", "title": "The source is contamination.", "copy": "Typhoid belongs to food-water systems: carriers, fecal contamination, handling, storage, and drinking water.", "hold": 3400 },
      { "kind": "route", "featureId": "route_typhoid", "label": "Food-water route", "kicker": "Step 4 | Route", "title": "Food and water carry fever below deck.", "copy": "Water casks, provisions, and hygiene make the fecal-oral route visible.", "hold": 3300 }
    ]
  },
  "smallpox": {
    "title": "Smallpox: variola, bedding, quarantine",
    "kicker": "Orthopox route",
    "summary": "A cautious route from camel-linked orthopox origin hypotheses to variola virus, close contact, contaminated bedding, isolation ships, and port quarantine.",
    "color": "#e1bf66",
    "featureIds": ["smallpox_origin_camel", "below_deck", "smallpox_hulks", "port_arrival", "route_smallpox"],
    "steps": [
      { "kind": "point", "featureId": "smallpox_origin_camel", "zoom": 5, "label": "Source hypothesis", "kicker": "Step 1 | Deep origin", "title": "Smallpox starts with an unresolved origin story.", "copy": "One origin model places variola emergence in eastern Africa and links camel introduction to a possible orthopox transition. Treat this as a debated hypothesis, not settled fact.", "hold": 4300 },
      { "kind": "point", "featureId": "below_deck", "zoom": 5, "label": "Close contact", "kicker": "Step 2 | Shipboard ecology", "title": "At sea, variola uses contact and materials.", "copy": "Smallpox usually required close face-to-face contact, but contaminated bedding and clothing could also matter aboard ship.", "hold": 3600 },
      { "kind": "mechanism", "visual": "rash", "label": "Mechanism: variola spread", "kicker": "Step 3 | Mechanism", "title": "Isolation becomes part of the route.", "copy": "Voyage length, shared bedding, isolation attempts, and susceptible passengers determine whether cases burn through the ship or arrive with the vessel.", "hold": 3900 },
      { "kind": "plot", "plot": "smallpox_burnout", "label": "Simulated burnout plot", "kicker": "Step 4 | Shipboard model", "title": "A closed ship can burn through susceptibility.", "copy": "This simulated SEIR plot shows why a finite shipboard population could see cases rise, peak, and then collapse before arrival once susceptible people are depleted.", "hold": 5200, "note": "Illustrative closed-ship SEIR simulation using R_eff=4.5, N=120, one index case, a 12-day latent period, and an 18-day infectious period. Tune these values if your cited source gives better voyage-specific assumptions." },
      { "kind": "point", "featureId": "smallpox_hulks", "zoom": 7, "label": "Hospital hulks", "kicker": "Step 5 | Maritime isolation", "title": "Ships also became quarantine infrastructure.", "copy": "Smallpox hospital hulks show the containment side of maritime disease ecology: vessels used to hold disease at the edge of the port.", "hold": 3600 },
      { "kind": "point", "featureId": "port_arrival", "zoom": 6, "label": "Arrival and quarantine", "kicker": "Step 6 | Port arrival", "title": "Arrival changes the outbreak stage.", "copy": "Quarantine and port risk decide whether a shipboard case becomes an urban problem.", "hold": 3400 },
      { "kind": "route", "featureId": "route_smallpox", "label": "Smallpox route", "kicker": "Step 7 | Route", "title": "The route runs from deep origin to port control.", "copy": "Smallpox has a long human disease history that maritime systems helped move, isolate, and amplify.", "hold": 3400 }
    ]
  },
  "measles": {
    "title": "Measles: rinderpest ancestry, shipboard air",
    "kicker": "Morbillivirus route",
    "summary": "A route from rinderpest-linked ancestry to dense human settlement, then close-quarters shipboard transmission and port arrival.",
    "color": "#d6c06a",
    "featureIds": ["measles_origin_rinderpest", "below_deck", "port_arrival", "route_measles"],
    "steps": [
      { "kind": "point", "featureId": "measles_origin_rinderpest", "zoom": 5, "label": "Rinderpest ancestry", "kicker": "Step 1 | Zoonotic ancestry", "title": "Measles points toward cattle and rinderpest.", "copy": "Measles virus is closest to rinderpest virus. Dense human-cattle settlement made a sustained human measles ecology possible.", "hold": 4100 },
      { "kind": "point", "featureId": "below_deck", "zoom": 5, "label": "Air and crowding", "kicker": "Step 2 | Shipboard ecology", "title": "At sea, measles becomes an air problem.", "copy": "Measles virus spreads through the air with extraordinary efficiency. A crowded ship gives it susceptible people, enclosed space, and time.", "hold": 3600 },
      { "kind": "mechanism", "visual": "rash", "label": "Mechanism: airborne spread", "kicker": "Step 3 | Mechanism", "title": "Crowding shapes the outbreak.", "copy": "Voyage length, ventilation, isolation, and immunity determine whether measles burns through the ship or arrives with passengers still infectious.", "hold": 3900 },
      { "kind": "plot", "plot": "measles_burnout", "label": "Simulated burnout plot", "kicker": "Step 4 | Shipboard model", "title": "Measles can burn through the ship fast.", "copy": "The simulated SEIR curve makes the narrative point visible: in a closed, susceptible ship, measles can peak quickly and then crash because the ship runs out of susceptible people.", "hold": 5200, "note": "Illustrative closed-ship SEIR simulation using R_eff=14, N=120, one index case, a 10-day latent period, and an 8-day infectious period. Use as a narration scaffold; measured rates need voyage-specific source data." },
      { "kind": "point", "featureId": "port_arrival", "zoom": 6, "label": "Arrival and quarantine", "kicker": "Step 5 | Port arrival", "title": "Arrival changes the outbreak stage.", "copy": "Once the ship reaches port, measles risk depends on susceptible communities, quarantine practice, and whether infectious people disembark.", "hold": 3400 },
      { "kind": "route", "featureId": "route_measles", "label": "Measles route", "kicker": "Step 6 | Route", "title": "The route links cattle ancestry to human density.", "copy": "Measles becomes maritime when a highly contagious human virus enters crowded, mobile, partly immune populations.", "hold": 3400 }
    ]
  },
  "wounds_sepsis": {
    "title": "Wounds and Sepsis: injury becomes infection",
    "kicker": "Trauma ecology",
    "summary": "Teeth, wounds, gangrene, amputation, infected tissue, sepsis as a syndrome, and the shipboard conditions that turn injury into infection.",
    "color": "#bd7b45",
    "featureIds": ["below_deck", "ship_surgery", "route_wounds_sepsis"],
    "steps": [
      { "kind": "point", "featureId": "below_deck", "zoom": 5, "label": "Dirty environment", "kicker": "Step 1 | Ship environment", "title": "Start where wounds are treated.", "copy": "A wound on land is bad. A wound below deck brings dirty tools, bedding, clothing, salt water, and delay.", "hold": 3200 },
      { "kind": "mechanism", "visual": "wound", "label": "Mechanism: infection risk", "kicker": "Step 2 | Mechanism", "title": "Injury can become infection.", "copy": "Cuts, broken bones, amputations, dental procedures, and gangrene share the same shipboard risk cluster. Sepsis is a systemic response that can follow severe infection.", "hold": 4100 },
      { "kind": "route", "featureId": "route_wounds_sepsis", "label": "Ship-interior route", "kicker": "Step 3 | Route", "title": "The route is treatment and exposure.", "copy": "Everyday damage aboard ship becomes part of the disease ecology.", "hold": 3300 }
    ]
  },
  "middle_passage": {
    "title": "Middle Passage: the extreme burden",
    "kicker": "Coercive ecology",
    "summary": "Maritime disease ecology became catastrophic under forced confinement.",
    "color": "#dd6974",
    "featureIds": ["west_africa", "brookes_middle_passage", "saint_domingue", "route_middle_passage"],
    "steps": [
      { "kind": "point", "featureId": "west_africa", "zoom": 5, "label": "Forced departure", "kicker": "Step 1 | Forced departure", "title": "Start with coercion.", "copy": "This route needs different narration from pirate movement. The agency structure is completely different.", "hold": 3100 },
      { "kind": "route", "featureId": "route_middle_passage", "label": "Forced route", "kicker": "Step 2 | Route", "title": "The route compounds every risk.", "copy": "Crowding, dehydration, malnutrition, violence, dysentery, smallpox, measles, and heat become one brutal ecology.", "hold": 3800, "art": { "src": "assets/context/brookes_slave_ship.jpg", "title": "Diagram of the Brookes slave ship", "kicker": "Confinement visual", "credit": "British Library via Wikimedia Commons, public domain", "position": "center center", "fit": "contain" } },
      { "kind": "point", "featureId": "brookes_middle_passage", "zoom": 5, "label": "Extreme burden", "kicker": "Step 3 | Extreme burden", "title": "The Brookes diagram fixes the scale.", "copy": "Confinement, dehydration, malnutrition, infection, and violence converge in the hold.", "hold": 3900 }
    ]
  }
};
