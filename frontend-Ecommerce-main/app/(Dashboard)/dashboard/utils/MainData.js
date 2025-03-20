import {
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  UserCircleIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";

export const mainData = [
  {
    id: 1,
    bgColor: "bg-red-400",
    title: "Totla User",
    detials: "30 Users",
    icons: <UserCircleIcon className="w-8 h-8 text-black" />,
  },
  {
    id: 2,
    bgColor: "bg-blue-400",
    title: "Totla Products",
    detials: "40 Products",
    icons: <ShoppingBagIcon className="w-8 h-8 text-black" />,
  },
  {
    id: 3,
    bgColor: "bg-green-400",
    title: "Totla Orders",
    detials: "80 Orders",
    icons: <EyeSlashIcon className="w-8 h-8 text-black" />,
  },
  {
    id: 4,
    bgColor: "bg-orange-400",
    title: "Totla Categories",
    detials: "60 Users",
    icons: <BuildingStorefrontIcon className="w-8 h-8 text-black" />,
  },
];
