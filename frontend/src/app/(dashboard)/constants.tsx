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
    routes: [
      { href: "/patients", label: "All Patients", icon: <Users /> },
      { href: "/patients/adult", label: "Adult Patients", icon: <FaUserMd /> },
      { href: "/patients/child", label: "Child Patients", icon: <FaBaby /> },
    ],
  },
  {
    group: "Clinics Management",
    routes: [
      { href: "/clinics", label: "All Clinics", icon: <FaStethoscope /> },
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
    group: "Administration",
    routes: [
      { href: "/dashboard", label: "Dashboard", icon: <BarChart3 /> },
      { href: "/settings", label: "Settings", icon: <Settings /> },
    ],
  },
];
