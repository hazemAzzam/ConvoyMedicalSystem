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
      { href: "/patients/adult", label: "Adult Patients", icon: <Users /> },
      { href: "/patients/child", label: "Child Patients", icon: <FaBaby /> },
    ],
  },
  {
    group: "Clinics Services",
    routes: [
      { href: "/clinics/im", label: "Internal Medicine", icon: <FaUserMd /> },
      {
        href: "/clinics/gynecology",
        label: "Gynecology Clinic",
        icon: <FaFemale />,
      },
      {
        href: "/clinics/orthopedics",
        label: "Orthopedics Clinic",
        icon: <FaTooth />,
      },
      {
        href: "/clinics/dermatology",
        label: "Dermatology Clinic",
        icon: <FaEye />,
      },
      {
        href: "/clinics/neurology",
        label: "Neurology Clinic",
        icon: <FaBrain />,
      },
      {
        href: "/clinics/oncology",
        label: "Oncology Clinic",
        icon: <FaCross />,
      },
      {
        href: "/clinics/endocrinology",
        label: "Endocrinology Clinic",
        icon: <FaDna />,
      },
      {
        href: "/clinics/gastroenterology",
        label: "Gastroenterology Clinic",
        icon: <FaUtensils />,
      },
      {
        href: "/clinics/nephrology",
        label: "Nephrology Clinic",
        icon: <FaTint />,
      },
      {
        href: "/clinics/psychiatry",
        label: "Psychiatry Clinic",
        icon: <FaHeadSideVirus />,
      },
      {
        href: "/clinics/cardiology",
        label: "Cardiology Clinic",
        icon: <FaHeartbeat />,
      },
      {
        href: "/clinics/pediatrics",
        label: "Pediatrics Clinic",
        icon: <FaChild />,
      },
      {
        href: "/clinics/pulmonology",
        label: "Pulmonology Clinic",
        icon: <FaLungs />,
      },
      {
        href: "/clinics/urology",
        label: "Urology Clinic",
        icon: <FaMale />,
      },
    ],
  },
  {
    group: "Laboratory Services",
    routes: [
      {
        href: "/labs/blood",
        label: "Blood Lab",
        icon: <MdBloodtype />,
      },
      {
        href: "/labs/stool",
        label: "Stool Lab",
        icon: <GiTestTubes />,
      },
      {
        href: "/labs/urine",
        label: "Urine Lab",
        icon: <GiDrop />,
      },
      {
        href: "/labs/albumin-creatinine",
        label: "Albumin Creatinine Lab",
        icon: <MdBiotech />,
      },
      {
        href: "/labs/microbiology",
        label: "Microbiology Lab",
        icon: <MdScience />,
      },
      {
        href: "/labs/chemistry",
        label: "Chemistry Lab",
        icon: <FaFlask />,
      },
      {
        href: "/labs/hematology",
        label: "Hematology Lab",
        icon: <FaVial />,
      },
    ],
  },
  {
    group: "Health Records",
    routes: [
      {
        href: "/medical-history",
        label: "Medical History",
        icon: <FileText />,
      },
      { href: "/vital-signs", label: "Vital Signs", icon: <Activity /> },
      { href: "/heart-monitor", label: "Heart Monitor", icon: <FaHeartbeat /> },
      { href: "/emergency", label: "Emergency Cases", icon: <AlertCircle /> },
      { href: "/lab-results", label: "Lab Results", icon: <Microscope /> },
      { href: "/prescriptions", label: "Prescriptions", icon: <Pill /> },
    ],
  },
  {
    group: "Appointments & Scheduling",
    routes: [
      { href: "/appointments", label: "Appointments", icon: <Calendar /> },
      { href: "/schedule", label: "Doctor Schedule", icon: <Clock /> },
      { href: "/waiting-list", label: "Waiting List", icon: <AlertCircle /> },
    ],
  },
  {
    group: "Administration",
    routes: [
      { href: "/dashboard", label: "Dashboard", icon: <BarChart3 /> },
      { href: "/staff", label: "Staff Management", icon: <UserCheck /> },
      { href: "/security", label: "Security", icon: <Shield /> },
      { href: "/settings", label: "Settings", icon: <Settings /> },
    ],
  },
];
