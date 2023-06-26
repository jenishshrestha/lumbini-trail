// Options type
export type OptionTypes = {
  boundary: boolean;
  place: boolean;
  points: boolean;
  ringroad: boolean;
  road: boolean;
  roadIntersection: boolean;
  river: boolean;
  water: boolean;
  trekkingRoutes: boolean;
};

export type assetIconsTypes = {
  'Natural Landmarks': {
    type: string;
    icon: string;
  }[];
  'Cultural/Religious Heritage': {
    type: string;
    icon: string;
  }[];
  'Public/Tourist Utilities': {
    type: string;
    icon: string;
  }[];
  Businesses: {
    type: string;
    icon: string;
  }[];
};
