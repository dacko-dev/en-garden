import { daysOffWork, services } from "@/db/schema";

export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

// time when the working day starts
export const WORKING_DAY_START = 8;
// time when the working day ends
export const WORKING_DAY_END = 18;

export const headerLinks = [
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Our Team",
    href: "/team",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export const servicesData: (typeof services.$inferInsert)[] = [
  {
    name: "Mowing",
    quick_info: "Mow the lawn",
    description:
      "Keep your lawn in pristine condition with professional mowing. This service includes precision cutting, edge trimming, and debris collection, using top-quality equipment tailored to your lawn's needs. Enjoy a healthy, evenly cut lawn that enhances your property's curb appeal.",
    price: "45",
    duration: 30,
    duration_unit: "minutes",
    duration_per: "acre",
    price_per: "acre",
    allow_recurrence: true,
  },
  {
    name: "Fertilizing",
    quick_info: "Apply fertilizer to improve soil quality and plant growth",
    description:
      "Boost plant growth and soil fertility with eco-friendly, slow-release fertilizers. This service involves soil assessment, careful application of nutrients, and guidance on maintaining long-term soil health. The result is lush, vibrant plants and enriched soil ready to sustain future growth.",
    price: "60",
    duration: 1,
    duration_unit: "hours",
    duration_per: "acre",
    price_per: "acre",
    allow_recurrence: true,
  },
  {
    name: "Weeding",
    quick_info: "Remove weeds to maintain a clean and healthy garden",
    description:
      "Eliminate weeds and restore balance to your garden. Weeding is done manually for sensitive areas, supplemented with eco-friendly treatments to inhibit regrowth. This service ensures your plants have access to nutrients without competition from invasive species.",
    price: "35",
    duration: 1,
    duration_unit: "hours",
    duration_per: "acre",
    price_per: "acre",
    allow_recurrence: true,
  },
  {
    name: "Hedge Trimming",
    quick_info: "Shape and trim hedges and bushes",
    description:
      "Achieve perfectly shaped hedges and shrubs with precision trimming. This service includes pruning for healthy growth, creating clean lines, and removing debris afterward. High-quality tools are used to ensure sharp cuts and promote lush, tidy growth.",
    price: "50",
    duration: 90,
    duration_unit: "minutes",
    duration_per: "hedgerow",
    price_per: "hedgerow",
    allow_recurrence: false,
  },
  {
    name: "Seasonal Cleanup",
    quick_info: "Remove leaves, debris, and prepare your garden for the season",
    description:
      "Prepare your garden for seasonal transitions with a thorough cleanup. This service includes clearing fallen leaves, pruning overgrowth, and removing debris. Your garden is left clean and ready for planting or dormancy, depending on the time of year.",
    price: "100",
    duration: 2,
    duration_unit: "hours",
    duration_per: "acre",
    price_per: "acre",
    allow_recurrence: false,
  },
  {
    name: "Pest Control",
    quick_info: "Protect your garden from pests with eco-friendly treatments",
    description:
      "Defend your garden from pests with targeted, eco-friendly solutions. This service identifies problem areas, applies pet-safe treatments, and offers tips to prevent infestations. Expect a healthier, pest-free environment for your plants to thrive.",
    price: "75",
    duration: 90,
    duration_unit: "minutes",
    duration_per: "acre",
    price_per: "acre",
    allow_recurrence: false,
  },
  {
    name: "Irrigation Installation",
    quick_info: "Install an efficient irrigation system for your garden",
    description:
      "Simplify garden watering with a custom irrigation system designed to fit your landscape. Installation includes sprinklers or drip systems, tailored to your garden's layout, and operational testing to ensure efficiency. This service saves water while keeping plants consistently hydrated.",
    price: "300",
    duration: 4,
    duration_unit: "hours",
    duration_per: "acre",

    price_per: "acre",
    allow_recurrence: false,
  },
  {
    name: "Lawn Aeration",
    quick_info: "Improve soil health by aerating your lawn",
    description:
      "Encourage robust grass growth by aerating compacted soil. This service uses specialized equipment to create small perforations, enhancing the flow of water, oxygen, and nutrients to roots. A healthier, more resilient lawn is the outcome.",
    price: "100",
    duration: 120,
    duration_unit: "minutes",
    duration_per: "acre",
    price_per: "acre",
    allow_recurrence: true,
  },
  {
    name: "Garden Design",
    quick_info: "Create a custom design for your garden layout",
    description:
      "Design the perfect garden tailored to your space and style preferences. This service includes site analysis, layout planning, and a detailed design featuring plant placements, pathways, and focal points. Your garden is transformed into a functional and beautiful outdoor space.",
    price: "500",
    duration: 2,
    duration_unit: "weeks",
    duration_per: "project",
    single_unit: true,
    price_per: "project",
    allow_recurrence: false,
  },
  {
    name: "Tree Pruning",
    quick_info: "Trim and prune trees for health and aesthetics",
    description:
      "Maintain healthy and attractive trees with expert pruning. Services include removing dead branches, shaping for structural integrity, and ensuring proper clearance. The work promotes growth and safety while leaving trees looking their best.",
    price: "100",
    duration: 2,
    duration_unit: "hours",
    duration_per: "tree",
    price_per: "tree",
    allow_recurrence: true,
  },
  {
    name: "Mulching",
    quick_info: "Apply mulch to retain soil moisture and reduce weeds",
    description:
      "Enhance your garden with a layer of nutrient-rich mulch. Mulching retains soil moisture, suppresses weeds, and improves the overall look of your garden. Choose from organic or decorative options to suit your aesthetic and functional needs.",
    price: "80",
    duration: 60,
    duration_unit: "minutes",
    duration_per: "acre",
    price_per: "acre",
    allow_recurrence: true,
  },
  {
    name: "Planting",
    quick_info: "Plant new flowers, shrubs, or trees in your garden",
    description:
      "Add beauty and life to your garden with carefully selected plants. This service includes soil preparation, planting, and advice on care and placement. New additions are positioned to thrive, enhancing your garden’s aesthetic appeal.",
    price: "100",
    duration: 120,
    duration_unit: "minutes",
    duration_per: "project",
    price_per: "project",
    allow_recurrence: false,
  },
];

// For seeding the database
export const holidays: (typeof daysOffWork.$inferInsert)[] = [
  {
    date_from: new Date("2024-01-31").toISOString(),
    date_to: new Date("2025-01-02").toISOString(),
    name: "New Year",
  },
  {
    date_from: new Date("2022-01-17").toISOString(),
    name: "Martin Luther King Jr. Day",
  },
  {
    date_from: new Date("2022-02-21").toISOString(),
    name: "Presidents' Day",
  },
  {
    date_from: new Date("2022-05-30").toISOString(),
    name: "Memorial Day",
  },
  {
    date_from: new Date("2022-07-04").toISOString(),
    name: "Independence Day",
  },
  {
    date_from: new Date("2022-09-05").toISOString(),
    name: "Labor Day",
  },
  {
    date_from: new Date("2022-10-10").toISOString(),
    name: "Columbus Day",
  },

  {
    date_from: new Date("2022-11-24").toISOString(),
    name: "Thanksgiving Day",
  },
  {
    date_from: new Date("2022-12-24").toISOString(),
    date_to: new Date("2022-12-26").toISOString(),
    name: "Christmas",
  },
];

export const blackouts: (typeof daysOffWork.$inferInsert)[] = [
  {
    date_from: new Date("2022-06-10").toISOString(),
    date_to: new Date("2022-06-12").toISOString(),
    name: "Blackout 1",
  },
];

/**
 * Returns the number of no work days in a month.
 */
// export function getNoWorkDays():  boolean | ((date: Date) => boolean) | Date | Date[] {

// }
