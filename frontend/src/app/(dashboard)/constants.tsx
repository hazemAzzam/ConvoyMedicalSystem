import {
  Users,
  UserCheck,
  Calendar,
  FileText,
  Pill,
  Activity,
  Microscope,
  Settings,
  BarChart3,
  UserPlus,
  Clock,
  AlertCircle,
  Shield,
  Heart,
  Droplets,
  Building2,
  Zap,
} from "lucide-react";
import {
  FaUserMd,
  FaHeartbeat,
  FaBrain,
  FaLungs,
  FaTooth,
  FaEye,
  FaChild,
  FaFemale,
  FaMale,
  FaStethoscope,
  FaCross,
  FaDna,
  FaUtensils,
  FaTint,
  FaHeadSideVirus,
  FaBaby,
  FaFlask,
  FaVial,
} from "react-icons/fa";
import { MdBloodtype, MdScience, MdBiotech } from "react-icons/md";
import { GiTestTubes, GiDrop } from "react-icons/gi";
import { RouteGroupType } from "./types";

export const ROUTE_GROUPS: RouteGroupType[] = [
  {
    group: "Patients Management",
    routes: [{ href: "/patients", label: "All Patients", icon: <Users /> }],
  },
  {
    group: "Clinics Management",
    routes: [
      { href: "/clinics", label: "All Clinics", icon: <Building2 /> },
      { href: "/clinics/doctors", label: "Doctors", icon: <FaUserMd /> },
      {
        href: "/clinics/specialties",
        label: "Specialties",
        icon: <FaHeartbeat />,
      },
    ],
  },

  {
    group: "Laboratory Management",
    routes: [
      { href: "/labs", label: "All Labs", icon: <Microscope /> },
      { href: "/labs/tests", label: "Lab Tests", icon: <FaFlask /> },
      { href: "/labs/technicians", label: "Technicians", icon: <MdScience /> },
    ],
  },
  {
    group: "Medical Data",
    routes: [
      { href: "/family-history", label: "Family History", icon: <FaDna /> },
      { href: "/medicals", label: "Medicals", icon: <FaStethoscope /> },
      { href: "/cyanosis", label: "Cyanosis", icon: <Droplets /> },
      { href: "/drugs", label: "Drugs", icon: <Pill /> },
      { href: "/symptoms", label: "Symptoms", icon: <Zap /> },
    ],
  },
  {
    group: "Administration",
    routes: [
      { href: "/dashboard", label: "Dashboard", icon: <BarChart3 /> },
      { href: "/settings", label: "Settings", icon: <Settings /> },
    ],
  },
];
