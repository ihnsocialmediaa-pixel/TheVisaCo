// ─── DESTINATIONS DATA ────────────────────────────────────────────────────────
// Each destination has: id, name, visaCount, img, tag (visa type), fee,
// originalFee, popularity, region

export const destinations = [
  { id:1,  name:"United Arab Emirates", visaCount:"53K+", img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", tag:"eVisa",   fee:"₹999",   originalFee:"₹1,499", popularity:"Most Visited", region:"Middle East"  },
  { id:2,  name:"Thailand",             visaCount:"32K+", img:"https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80", tag:"eVisa",   fee:"₹699",   originalFee:"₹999",   popularity:"Top Pick",    region:"Asia"         },
  { id:3,  name:"Switzerland",          visaCount:"30K+", img:"https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=600&q=80", tag:"Sticker", fee:"₹3,999", originalFee:"₹4,999", popularity:"Trending",    region:"Europe"       },
  { id:4,  name:"Vietnam",              visaCount:"27K+", img:"https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80", tag:"eVisa",   fee:"₹1,299", originalFee:"₹1,799", popularity:"Best Deal",   region:"Asia"         },
  { id:5,  name:"Indonesia",            visaCount:"16K+", img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", tag:"eVisa",   fee:"₹599",   originalFee:"₹799",   popularity:"Top Pick",    region:"Asia"         },
  { id:6,  name:"Maldives",             visaCount:"17K+", img:"https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80", tag:"Free",    fee:"Free",   originalFee:null,      popularity:"Most Loved",  region:"Asia"         },
  { id:7,  name:"United States",        visaCount:"25K+", img:"https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80", tag:"Sticker", fee:"₹9,999", originalFee:"₹12,999",popularity:"Most Visited",region:"Americas"     },
  { id:8,  name:"Hong Kong",            visaCount:"19K+", img:"https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&q=80", tag:"eVisa",   fee:"₹899",   originalFee:"₹1,299", popularity:"Trending",    region:"Asia"         },
  { id:9,  name:"Egypt",                visaCount:"24K+", img:"https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=600&q=80", tag:"eVisa",   fee:"₹1,999", originalFee:"₹2,499", popularity:"Best Deal",   region:"Africa"       },
  { id:10, name:"Malaysia", visaCount:"37K+", img:"https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&q=80", tag:"eVisa", fee:"₹399", originalFee:"₹599", popularity:"Most Visited", region:"Asia" },
  { id:11, name:"Singapore",            visaCount:"22K+", img:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80", tag:"eVisa",   fee:"₹2,299", originalFee:"₹2,999", popularity:"Top Pick",    region:"Asia"         },
  { id:12, name:"Turkey",               visaCount:"21K+", img:"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80", tag:"eVisa",   fee:"₹1,399", originalFee:"₹1,899", popularity:"Trending",    region:"Middle East"  },
  { id:13, name:"France",               visaCount:"18K+", img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", tag:"Sticker", fee:"₹4,999", originalFee:"₹6,499", popularity:"Most Loved",  region:"Europe"       },
  { id:14, name:"Japan",                visaCount:"29K+", img:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", tag:"Sticker", fee:"₹2,699", originalFee:"₹3,499", popularity:"Most Visited",region:"Asia"         },
  { id:15, name:"Canada",               visaCount:"14K+", img:"https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80", tag:"eTA",     fee:"₹3,199", originalFee:"₹4,199", popularity:"Top Pick",    region:"Americas"     },
  { id:16, name:"Australia",            visaCount:"20K+", img:"https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80", tag:"eVisa",   fee:"₹4,299", originalFee:"₹5,499", popularity:"Trending",    region:"Oceania"      },
  { id:17, name:"New Zealand",          visaCount:"11K+", img:"https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80", tag:"eTA",     fee:"₹2,999", originalFee:"₹3,999", popularity:"Best Deal",   region:"Oceania"      },
  { id:18, name:"Germany",              visaCount:"15K+", img:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80", tag:"Sticker", fee:"₹5,599", originalFee:"₹7,299", popularity:"Most Visited",region:"Europe"       },
  { id:19, name:"Spain",                visaCount:"13K+", img:"https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80", tag:"Sticker", fee:"₹5,299", originalFee:"₹6,799", popularity:"Most Loved",  region:"Europe"       },
  { id:20, name:"Italy",                visaCount:"16K+", img:"https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80", tag:"Sticker", fee:"₹5,499", originalFee:"₹6,999", popularity:"Trending",    region:"Europe"       },
];

// ─── REGION OPTIONS (for dropdown) ───────────────────────────────────────────
export const REGIONS = [
  { value: "All",         label: "🌍 All Regions"  },
  { value: "Asia",        label: "🌏 Asia"          },
  { value: "Europe",      label: "🇪🇺 Europe"       },
  { value: "Middle East", label: "🌙 Middle East"   },
  { value: "Americas",    label: "🌎 Americas"      },
  { value: "Africa",      label: "🌍 Africa"        },
  { value: "Oceania",     label: "🦘 Oceania"       },
];

// ─── VISA TYPE OPTIONS (for dropdown) ────────────────────────────────────────
export const VISA_TYPES = [
  { value: "All",     label: "🗂️ All Types"    },
  { value: "eVisa",   label: "💻 eVisa"        },
  { value: "Sticker", label: "📋 Sticker Visa" },
  { value: "eTA",     label: "✈️ eTA"           },
  { value: "Free",    label: "🎉 Visa Free"    },
];