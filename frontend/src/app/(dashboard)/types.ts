export type RouteGroupType = {
  group: string;
  routes: RouteType[];
};

export type RouteType = {
  href: string;
  label: string;
  icon: React.ReactNode;
};
