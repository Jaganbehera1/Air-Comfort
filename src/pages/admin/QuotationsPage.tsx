import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PencilLine, 
  Printer, 
  Download, 
  Plus, 
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Save,
  X,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Package,
  Zap,
  Shield,
  Star,
  Award,
  BarChart3,
  Grid,
  List,
  RefreshCw,
  Phone,
  MapPin,
  PenTool,
  Battery
} from 'lucide-react';
import { deleteQuotation, getQuotation, listQuotations, saveQuotation, Quotation } from '../../lib/quotations';

// ============================================
// PRICE MASTER DATA - Derived from Excel
// ============================================
interface PriceEntry {
  id: string;
  capacity: string;
  panelBrand: string;
  inverterType: string;
  battery: string;
  price: number;
}

// Complete price data from Excel
const PRICE_MASTER: PriceEntry[] = [
  // ===== 1 KW Single Phase =====
  { id: '1kw_sp_tata_ongrid_nobat', capacity: '1 KW', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 119000 },
  { id: '1kw_sp_adani_ongrid_nobat', capacity: '1 KW', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 109000 },
  { id: '1kw_sp_waaree_ongrid_nobat', capacity: '1 KW', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 109000 },
  { id: '1kw_sp_luminous_ongrid_nobat', capacity: '1 KW', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 105000 },
  { id: '1kw_sp_surya_ongrid_nobat', capacity: '1 KW', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 99000 },
  { id: '1kw_sp_jackson_ongrid_nobat', capacity: '1 KW', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 99000 },
  { id: '1kw_sp_goutam_ongrid_nobat', capacity: '1 KW', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 99000 },
  { id: '1kw_sp_utl_ongrid_nobat', capacity: '1 KW', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 99000 },

  // ===== 2 KW Single Phase =====
  { id: '2kw_sp_tata_ongrid_nobat', capacity: '2 KW', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 159000 },
  { id: '2kw_sp_adani_ongrid_nobat', capacity: '2 KW', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 149000 },
  { id: '2kw_sp_waaree_ongrid_nobat', capacity: '2 KW', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 149000 },
  { id: '2kw_sp_luminous_ongrid_nobat', capacity: '2 KW', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 139000 },
  { id: '2kw_sp_surya_ongrid_nobat', capacity: '2 KW', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 129000 },
  { id: '2kw_sp_jackson_ongrid_nobat', capacity: '2 KW', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 129000 },
  { id: '2kw_sp_goutam_ongrid_nobat', capacity: '2 KW', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 129000 },
  { id: '2kw_sp_utl_ongrid_nobat', capacity: '2 KW', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 129000 },

  // ===== 3 KW Single Phase =====
  // Ongrid
  { id: '3kw_sp_tata_ongrid_nobat', capacity: '3 KW', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 225000 },
  { id: '3kw_sp_adani_ongrid_nobat', capacity: '3 KW', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 219000 },
  { id: '3kw_sp_waaree_ongrid_nobat', capacity: '3 KW', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 219000 },
  { id: '3kw_sp_luminous_ongrid_nobat', capacity: '3 KW', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 209000 },
  { id: '3kw_sp_surya_ongrid_nobat', capacity: '3 KW', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 199000 },
  { id: '3kw_sp_jackson_ongrid_nobat', capacity: '3 KW', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 199000 },
  { id: '3kw_sp_goutam_ongrid_nobat', capacity: '3 KW', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 199000 },
  { id: '3kw_sp_utl_ongrid_nobat', capacity: '3 KW', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 199000 },
  // Hybrid Without Battery
  { id: '3kw_sp_tata_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 269000 },
  { id: '3kw_sp_adani_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 259000 },
  { id: '3kw_sp_waaree_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 259000 },
  { id: '3kw_sp_luminous_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 249000 },
  { id: '3kw_sp_surya_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 239000 },
  { id: '3kw_sp_jackson_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 239000 },
  { id: '3kw_sp_goutam_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 239000 },
  { id: '3kw_sp_utl_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 239000 },
  // Hybrid 2 Nos
  { id: '3kw_sp_tata_hybrid_2nos', capacity: '3 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '2 Nos', price: 309000 },
  { id: '3kw_sp_adani_hybrid_2nos', capacity: '3 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: '2 Nos', price: 299000 },
  { id: '3kw_sp_waaree_hybrid_2nos', capacity: '3 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '2 Nos', price: 299000 },
  { id: '3kw_sp_luminous_hybrid_2nos', capacity: '3 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '2 Nos', price: 289000 },
  { id: '3kw_sp_surya_hybrid_2nos', capacity: '3 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '2 Nos', price: 279000 },
  { id: '3kw_sp_jackson_hybrid_2nos', capacity: '3 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '2 Nos', price: 279000 },
  { id: '3kw_sp_goutam_hybrid_2nos', capacity: '3 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '2 Nos', price: 279000 },
  { id: '3kw_sp_utl_hybrid_2nos', capacity: '3 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '2 Nos', price: 279000 },

  // ===== 5 KW Single Phase =====
  // Ongrid
  { id: '5kw_sp_tata_ongrid_nobat', capacity: '5 KW', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 319000 },
  { id: '5kw_sp_adani_ongrid_nobat', capacity: '5 KW', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 279000 },
  { id: '5kw_sp_waaree_ongrid_nobat', capacity: '5 KW', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 279000 },
  { id: '5kw_sp_luminous_ongrid_nobat', capacity: '5 KW', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 269000 },
  { id: '5kw_sp_surya_ongrid_nobat', capacity: '5 KW', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 249000 },
  { id: '5kw_sp_jackson_ongrid_nobat', capacity: '5 KW', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 249000 },
  { id: '5kw_sp_goutam_ongrid_nobat', capacity: '5 KW', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 249000 },
  { id: '5kw_sp_utl_ongrid_nobat', capacity: '5 KW', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 249000 },
  // Hybrid Without Battery
  { id: '5kw_sp_tata_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 369000 },
  { id: '5kw_sp_adani_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 329000 },
  { id: '5kw_sp_waaree_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 329000 },
  { id: '5kw_sp_luminous_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 319000 },
  { id: '5kw_sp_surya_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '5kw_sp_jackson_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '5kw_sp_goutam_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '5kw_sp_utl_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  // Hybrid 2 Nos
  { id: '5kw_sp_tata_hybrid_2nos', capacity: '5 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '2 Nos', price: 409000 },
  { id: '5kw_sp_adani_hybrid_2nos', capacity: '5 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: '2 Nos', price: 369000 },
  { id: '5kw_sp_waaree_hybrid_2nos', capacity: '5 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '2 Nos', price: 369000 },
  { id: '5kw_sp_luminous_hybrid_2nos', capacity: '5 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '2 Nos', price: 359000 },
  { id: '5kw_sp_surya_hybrid_2nos', capacity: '5 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '2 Nos', price: 339000 },
  { id: '5kw_sp_jackson_hybrid_2nos', capacity: '5 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '2 Nos', price: 339000 },
  { id: '5kw_sp_goutam_hybrid_2nos', capacity: '5 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '2 Nos', price: 339000 },
  { id: '5kw_sp_utl_hybrid_2nos', capacity: '5 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '2 Nos', price: 339000 },

  // ===== 10 KW Single Phase =====
  // Ongrid
  { id: '10kw_sp_tata_ongrid_nobat', capacity: '10 KW', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 519000 },
  { id: '10kw_sp_adani_ongrid_nobat', capacity: '10 KW', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 479000 },
  { id: '10kw_sp_waaree_ongrid_nobat', capacity: '10 KW', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 479000 },
  { id: '10kw_sp_luminous_ongrid_nobat', capacity: '10 KW', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 469000 },
  { id: '10kw_sp_surya_ongrid_nobat', capacity: '10 KW', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 449000 },
  { id: '10kw_sp_jackson_ongrid_nobat', capacity: '10 KW', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 449000 },
  { id: '10kw_sp_goutam_ongrid_nobat', capacity: '10 KW', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 449000 },
  { id: '10kw_sp_utl_ongrid_nobat', capacity: '10 KW', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 449000 },
  // Hybrid Without Battery
  { id: '10kw_sp_tata_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 669000 },
  { id: '10kw_sp_adani_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 629000 },
  { id: '10kw_sp_waaree_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 629000 },
  { id: '10kw_sp_luminous_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 619000 },
  { id: '10kw_sp_surya_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 599000 },
  { id: '10kw_sp_jackson_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 599000 },
  { id: '10kw_sp_goutam_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 599000 },
  { id: '10kw_sp_utl_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 599000 },
  // Hybrid 4 Nos
  { id: '10kw_sp_tata_hybrid_4nos', capacity: '10 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '4 Nos', price: 749000 },
  { id: '10kw_sp_adani_hybrid_4nos', capacity: '10 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: '4 Nos', price: 709000 },
  { id: '10kw_sp_waaree_hybrid_4nos', capacity: '10 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '4 Nos', price: 709000 },
  { id: '10kw_sp_luminous_hybrid_4nos', capacity: '10 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '4 Nos', price: 699000 },
  { id: '10kw_sp_surya_hybrid_4nos', capacity: '10 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '4 Nos', price: 679000 },
  { id: '10kw_sp_jackson_hybrid_4nos', capacity: '10 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '4 Nos', price: 679000 },
  { id: '10kw_sp_goutam_hybrid_4nos', capacity: '10 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '4 Nos', price: 679000 },
  { id: '10kw_sp_utl_hybrid_4nos', capacity: '10 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '4 Nos', price: 679000 },

  // ===== 3 KW Three Phase =====
  // Ongrid
  { id: '3kw_tp_tata_ongrid_nobat', capacity: '3 KW', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 280000 },
  { id: '3kw_tp_adani_ongrid_nobat', capacity: '3 KW', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 275000 },
  { id: '3kw_tp_waaree_ongrid_nobat', capacity: '3 KW', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 275000 },
  { id: '3kw_tp_luminous_ongrid_nobat', capacity: '3 KW', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 265000 },
  { id: '3kw_tp_surya_ongrid_nobat', capacity: '3 KW', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 265000 },
  { id: '3kw_tp_jackson_ongrid_nobat', capacity: '3 KW', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 265000 },
  { id: '3kw_tp_goutam_ongrid_nobat', capacity: '3 KW', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 265000 },
  { id: '3kw_tp_utl_ongrid_nobat', capacity: '3 KW', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 265000 },
  // Hybrid Without Battery
  { id: '3kw_tp_tata_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 349000 },
  { id: '3kw_tp_adani_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 329000 },
  { id: '3kw_tp_waaree_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 329000 },
  { id: '3kw_tp_luminous_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 319000 },
  { id: '3kw_tp_surya_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '3kw_tp_jackson_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '3kw_tp_goutam_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  { id: '3kw_tp_utl_hybrid_withoutbat', capacity: '3 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 299000 },
  // Hybrid 4 Nos
  { id: '3kw_tp_tata_hybrid_4nos', capacity: '3 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '4 Nos', price: 429000 },
  { id: '3kw_tp_adani_hybrid_4nos', capacity: '3 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: '4 Nos', price: 409000 },
  { id: '3kw_tp_waaree_hybrid_4nos', capacity: '3 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '4 Nos', price: 409000 },
  { id: '3kw_tp_luminous_hybrid_4nos', capacity: '3 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '4 Nos', price: 399000 },
  { id: '3kw_tp_surya_hybrid_4nos', capacity: '3 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '4 Nos', price: 379000 },
  { id: '3kw_tp_jackson_hybrid_4nos', capacity: '3 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '4 Nos', price: 379000 },
  { id: '3kw_tp_goutam_hybrid_4nos', capacity: '3 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '4 Nos', price: 379000 },
  { id: '3kw_tp_utl_hybrid_4nos', capacity: '3 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '4 Nos', price: 379000 },

  // ===== 5 KW Three Phase =====
  // Ongrid
  { id: '5kw_tp_tata_ongrid_nobat', capacity: '5 KW', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 385000 },
  { id: '5kw_tp_adani_ongrid_nobat', capacity: '5 KW', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 345000 },
  { id: '5kw_tp_waaree_ongrid_nobat', capacity: '5 KW', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 345000 },
  { id: '5kw_tp_luminous_ongrid_nobat', capacity: '5 KW', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 335000 },
  { id: '5kw_tp_surya_ongrid_nobat', capacity: '5 KW', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 315000 },
  { id: '5kw_tp_jackson_ongrid_nobat', capacity: '5 KW', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 315000 },
  { id: '5kw_tp_goutam_ongrid_nobat', capacity: '5 KW', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 315000 },
  { id: '5kw_tp_utl_ongrid_nobat', capacity: '5 KW', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 315000 },
  // Hybrid Without Battery
  { id: '5kw_tp_tata_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 479000 },
  { id: '5kw_tp_adani_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 459000 },
  { id: '5kw_tp_waaree_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 459000 },
  { id: '5kw_tp_luminous_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 439000 },
  { id: '5kw_tp_surya_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 419000 },
  { id: '5kw_tp_jackson_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 419000 },
  { id: '5kw_tp_goutam_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 419000 },
  { id: '5kw_tp_utl_hybrid_withoutbat', capacity: '5 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 419000 },
  // Hybrid 4 Nos
  { id: '5kw_tp_tata_hybrid_4nos', capacity: '5 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '4 Nos', price: 559000 },
  { id: '5kw_tp_adani_hybrid_4nos', capacity: '5 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: '4 Nos', price: 539000 },
  { id: '5kw_tp_waaree_hybrid_4nos', capacity: '5 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '4 Nos', price: 539000 },
  { id: '5kw_tp_luminous_hybrid_4nos', capacity: '5 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '4 Nos', price: 519000 },
  { id: '5kw_tp_surya_hybrid_4nos', capacity: '5 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '4 Nos', price: 499000 },
  { id: '5kw_tp_jackson_hybrid_4nos', capacity: '5 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '4 Nos', price: 499000 },
  { id: '5kw_tp_goutam_hybrid_4nos', capacity: '5 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '4 Nos', price: 499000 },
  { id: '5kw_tp_utl_hybrid_4nos', capacity: '5 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '4 Nos', price: 499000 },

  // ===== 10 KW Three Phase =====
  // Ongrid
  { id: '10kw_tp_tata_ongrid_nobat', capacity: '10 KW', panelBrand: 'TATA', inverterType: 'Ongrid', battery: 'No Battery', price: 599000 },
  { id: '10kw_tp_adani_ongrid_nobat', capacity: '10 KW', panelBrand: 'adani', inverterType: 'Ongrid', battery: 'No Battery', price: 579000 },
  { id: '10kw_tp_waaree_ongrid_nobat', capacity: '10 KW', panelBrand: 'Waaree', inverterType: 'Ongrid', battery: 'No Battery', price: 579000 },
  { id: '10kw_tp_luminous_ongrid_nobat', capacity: '10 KW', panelBrand: 'Luminous', inverterType: 'Ongrid', battery: 'No Battery', price: 569000 },
  { id: '10kw_tp_surya_ongrid_nobat', capacity: '10 KW', panelBrand: 'Surya', inverterType: 'Ongrid', battery: 'No Battery', price: 549000 },
  { id: '10kw_tp_jackson_ongrid_nobat', capacity: '10 KW', panelBrand: 'Jackson', inverterType: 'Ongrid', battery: 'No Battery', price: 549000 },
  { id: '10kw_tp_goutam_ongrid_nobat', capacity: '10 KW', panelBrand: 'Goutam', inverterType: 'Ongrid', battery: 'No Battery', price: 549000 },
  { id: '10kw_tp_utl_ongrid_nobat', capacity: '10 KW', panelBrand: 'UTL', inverterType: 'Ongrid', battery: 'No Battery', price: 549000 },
  // Hybrid Without Battery
  { id: '10kw_tp_tata_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: 'Without Battery', price: 919000 },
  { id: '10kw_tp_adani_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: 'Without Battery', price: 879000 },
  { id: '10kw_tp_waaree_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: 'Without Battery', price: 879000 },
  { id: '10kw_tp_luminous_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: 'Without Battery', price: 869000 },
  { id: '10kw_tp_surya_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: 'Without Battery', price: 849000 },
  { id: '10kw_tp_jackson_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: 'Without Battery', price: 849000 },
  { id: '10kw_tp_goutam_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: 'Without Battery', price: 849000 },
  { id: '10kw_tp_utl_hybrid_withoutbat', capacity: '10 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: 'Without Battery', price: 849000 },
  // Hybrid 8 Nos
  { id: '10kw_tp_tata_hybrid_8nos', capacity: '10 KW', panelBrand: 'TATA', inverterType: 'Hybrid', battery: '8 Nos', price: 1079000 },
  { id: '10kw_tp_adani_hybrid_8nos', capacity: '10 KW', panelBrand: 'adani', inverterType: 'Hybrid', battery: '8 Nos', price: 1039000 },
  { id: '10kw_tp_waaree_hybrid_8nos', capacity: '10 KW', panelBrand: 'Waaree', inverterType: 'Hybrid', battery: '8 Nos', price: 1039000 },
  { id: '10kw_tp_luminous_hybrid_8nos', capacity: '10 KW', panelBrand: 'Luminous', inverterType: 'Hybrid', battery: '8 Nos', price: 1029000 },
  { id: '10kw_tp_surya_hybrid_8nos', capacity: '10 KW', panelBrand: 'Surya', inverterType: 'Hybrid', battery: '8 Nos', price: 1009000 },
  { id: '10kw_tp_jackson_hybrid_8nos', capacity: '10 KW', panelBrand: 'Jackson', inverterType: 'Hybrid', battery: '8 Nos', price: 1009000 },
  { id: '10kw_tp_goutam_hybrid_8nos', capacity: '10 KW', panelBrand: 'Goutam', inverterType: 'Hybrid', battery: '8 Nos', price: 1009000 },
  { id: '10kw_tp_utl_hybrid_8nos', capacity: '10 KW', panelBrand: 'UTL', inverterType: 'Hybrid', battery: '8 Nos', price: 1009000 },
];

// ============================================
// PRICE LOOKUP FUNCTION
// ============================================
function findPrice(
  capacity: string,
  panelBrand: string,
  inverterType: string,
  battery: string
): { price: number | null; matchType: 'exact' | 'partial' | 'none' } {
  // Clean up inputs
  const cleanCapacity = capacity?.trim() || '';
  const cleanPanelBrand = panelBrand?.trim() || '';
  const cleanInverterType = inverterType?.trim() || '';
  const cleanBattery = battery?.trim() || '';

  // If any required field is empty, return no match
  if (!cleanCapacity || !cleanPanelBrand || !cleanInverterType) {
    return { price: null, matchType: 'none' };
  }

  // Find exact match
  const exactMatch = PRICE_MASTER.find(
    (entry) =>
      entry.capacity.toLowerCase() === cleanCapacity.toLowerCase() &&
      entry.panelBrand.toLowerCase() === cleanPanelBrand.toLowerCase() &&
      entry.inverterType.toLowerCase() === cleanInverterType.toLowerCase() &&
      entry.battery.toLowerCase() === cleanBattery.toLowerCase()
  );

  if (exactMatch) {
    return { price: exactMatch.price, matchType: 'exact' };
  }

  // Try partial match (without battery)
  if (cleanBattery && cleanBattery !== 'No Battery') {
    const partialMatch = PRICE_MASTER.find(
      (entry) =>
        entry.capacity.toLowerCase() === cleanCapacity.toLowerCase() &&
        entry.panelBrand.toLowerCase() === cleanPanelBrand.toLowerCase() &&
        entry.inverterType.toLowerCase() === cleanInverterType.toLowerCase() &&
        entry.battery === 'No Battery'
    );
    if (partialMatch) {
      return { price: partialMatch.price, matchType: 'partial' };
    }
  }

  return { price: null, matchType: 'none' };
}

// ============================================
// COMPONENT
// ============================================
const printStyles = `
  @page { size: A4; margin: 12mm; }
  body { background: white; font-family: 'Segoe UI', Arial, sans-serif; }
  .no-print { display: none !important; }
  .quotation-sheet { 
    font-family: 'Segoe UI', Arial, sans-serif; 
    color: #111827; 
    padding: 32px; 
    border: 1px solid #e5e7eb; 
    border-radius: 16px;
    background: white;
    max-width: 210mm;
    margin: 0 auto;
  }
  .quotation-sheet .header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    border-bottom: 3px solid #166534;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }
  .quotation-sheet h1 { 
    font-size: 28px; 
    font-weight: 800; 
    background: linear-gradient(to right, #15803d, #22c55e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
  .quotation-sheet .sub { 
    color: #6b7280; 
    font-size: 13px; 
    margin-top: 4px;
  }
  .quotation-sheet .badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
  }
  .quotation-sheet .badge-approved { background: #dcfce7; color: #166534; }
  .quotation-sheet .badge-pending { background: #fef3c7; color: #92400e; }
  .quotation-sheet .badge-rejected { background: #fee2e2; color: #991b1b; }
  .quotation-sheet table { 
    width: 100%; 
    border-collapse: collapse; 
    margin-top: 20px; 
    border-radius: 12px;
    overflow: hidden;
  }
  .quotation-sheet th, .quotation-sheet td { 
    border: 1px solid #e5e7eb; 
    padding: 12px 16px; 
    text-align: left; 
    font-size: 14px; 
  }
  .quotation-sheet th { 
    background: #f0fdf4; 
    color: #166534;
    font-weight: 600;
  }
  .quotation-sheet .total-box {
    background: linear-gradient(to right, #f0fdf4, #dcfce7);
    border-radius: 12px;
    padding: 16px 20px;
    margin-top: 20px;
    border: 1px solid #bbf7d0;
  }
  .quotation-sheet .total { 
    font-size: 22px; 
    font-weight: 700; 
    color: #166534; 
  }
  .quotation-sheet .footer {
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #6b7280;
  }
  .quotation-sheet .price-not-found {
    background: #fef3c7;
    border: 1px solid #f59e0b;
    border-radius: 8px;
    padding: 8px 12px;
    color: #92400e;
    font-size: 13px;
    margin-top: 8px;
  }
`;

export function QuotationsPage() {
  const [items, setItems] = useState<Quotation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Quotation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [priceMessage, setPriceMessage] = useState<string>('');
  const [isUpdatingPrice, setIsUpdatingPrice] = useState<boolean>(false);

  // Dropdown options from price master
  const capacityOptions = ['1 KW', '2 KW', '3 KW', '5 KW', '10 KW'];
  const panelBrandOptions = ['TATA', 'adani', 'Waaree', 'Luminous', 'Surya', 'Jackson', 'Goutam', 'UTL'];
  const inverterTypeOptions = ['Ongrid', 'Hybrid'];
  const batteryOptions = ['No Battery', 'Without Battery', '2 Nos', '4 Nos', '8 Nos'];

  // Load quotations
  const loadQuotations = () => {
    setItems(listQuotations());
  };

  useEffect(() => {
    loadQuotations();
  }, []);

  const selected = useMemo(() => {
    // First check if we have a draft that matches the selected ID
    if (draft && selectedId === draft.id) {
      return draft;
    }
    // Otherwise find in items
    return items.find((item) => item.id === selectedId) || null;
  }, [draft, items, selectedId]);

  // When selected ID changes, load the quotation into draft
  useEffect(() => {
    if (selectedId) {
      const item = getQuotation(selectedId);
      if (item) {
        setDraft(item);
      } else {
        // If not found in storage, find in items
        const found = items.find(i => i.id === selectedId);
        if (found) {
          setDraft(found);
        }
      }
    }
  }, [selectedId, items]);

  // Auto-calculate price when selections change
  useEffect(() => {
    if (!draft) return;
    if (isUpdatingPrice) return;

    const capacity = draft.system_capacity || '';
    const panelBrand = draft.panel_brand || '';
    const inverterType = draft.inverter_type || '';
    const battery = draft.battery_requirement || '';

    const { price, matchType } = findPrice(capacity, panelBrand, inverterType, battery);

    if (price !== null) {
      const formattedPrice = `₹${price.toLocaleString('en-IN')}`;
      
      // Only update if price changed
      if (draft.estimated_price !== formattedPrice) {
        setIsUpdatingPrice(true);
        
        // Update the draft
        const updatedDraft = { 
          ...draft, 
          estimated_price: formattedPrice,
          updated_at: new Date().toISOString()
        };
        setDraft(updatedDraft);
        
        // Also update the items list
        setItems(prevItems => 
          prevItems.map(item => 
            item.id === updatedDraft.id ? updatedDraft : item
          )
        );
        
        // Save to storage
        saveQuotation(updatedDraft);
        
        setPriceMessage(`✅ Price found: ${formattedPrice}`);
        setIsUpdatingPrice(false);
      } else {
        setPriceMessage(`✅ Price: ${formattedPrice}`);
      }
    } else {
      if (capacity && panelBrand && inverterType) {
        setPriceMessage(`❌ Price not available for this configuration. Please contact admin.`);
        // Clear the price if it was set
        if (draft.estimated_price) {
          const updatedDraft = { ...draft, estimated_price: '', updated_at: new Date().toISOString() };
          setDraft(updatedDraft);
          setItems(prevItems => 
            prevItems.map(item => 
              item.id === updatedDraft.id ? updatedDraft : item
            )
          );
          saveQuotation(updatedDraft);
        }
      } else {
        setPriceMessage('Please select capacity, panel brand, and inverter type to get price.');
      }
    }
  }, [draft?.system_capacity, draft?.panel_brand, draft?.inverter_type, draft?.battery_requirement]);

  const handleFieldChange = (field: keyof Quotation, value: any) => {
    if (!draft) return;
    const updated = { ...draft, [field]: value, updated_at: new Date().toISOString() };
    setDraft(updated);
    // Update items list immediately
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === updated.id ? updated : item
      )
    );
    // Save to storage
    saveQuotation(updated);
  };

  const handleSave = () => {
    if (!draft) return;
    const updated = { ...draft, updated_at: new Date().toISOString() };
    saveQuotation(updated);
    setItems(listQuotations());
    setPriceMessage('✅ Quotation saved successfully!');
    setTimeout(() => setPriceMessage(''), 3000);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this quotation?')) return;
    deleteQuotation(id);
    setItems(listQuotations());
    if (selectedId === id) setSelectedId(items[0]?.id || null);
  };

  const handlePrint = () => {
    if (!draft) return;
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) return;
    
    const priceDisplay = draft.estimated_price || 'Price not available';
    const priceNote = !draft.estimated_price && draft.system_capacity && draft.panel_brand && draft.inverter_type
      ? '<div class="price-not-found">⚠️ Price not available for this configuration. Please contact admin.</div>'
      : '';

    printWindow.document.write(`
      <html>
        <head>
          <title>Quotation - ${draft.customer_name || 'Air Comfort'}</title>
          <style>${printStyles}</style>
        </head>
        <body>
          <div class="quotation-sheet">
            <div class="header">
              <div>
                <h1>☀️ Air Comfort</h1>
                <p class="sub">Professional Solar Quotation</p>
              </div>
              <div style="text-align: right;">
                <span class="badge badge-${draft.status === 'approved' ? 'approved' : draft.status === 'rejected' ? 'rejected' : 'pending'}">
                  ${draft.status.toUpperCase()}
                </span>
                <p style="font-size: 12px; color: #6b7280; margin-top: 4px;">#${draft.id.slice(0, 8)}</p>
              </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
              <div>
                <p style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">CUSTOMER DETAILS</p>
                <p style="font-weight: 600; margin: 0;">${draft.customer_name || '---'}</p>
                <p style="margin: 2px 0; font-size: 14px; color: #374151;">${draft.phone || '---'}</p>
                <p style="margin: 0; font-size: 14px; color: #374151;">${draft.address || '---'}</p>
              </div>
              <div style="text-align: right;">
                <p style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">QUOTATION DETAILS</p>
                <p style="font-size: 14px; margin: 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p style="font-size: 14px; margin: 2px 0;"><strong>Status:</strong> ${draft.status}</p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>System Capacity</strong></td><td>${draft.system_capacity || '---'}</td></tr>
                <tr><td><strong>Panel Brand</strong></td><td>${draft.panel_brand || '---'}</td></tr>
                <tr><td><strong>Inverter Type</strong></td><td>${draft.inverter_type || '---'}</td></tr>
                <tr><td><strong>Battery Requirement</strong></td><td>${draft.battery_requirement || '---'}</td></tr>
                <tr><td><strong>Electricity Bill</strong></td><td>${draft.electricity_bill || '---'}</td></tr>
              </tbody>
            </table>

            <div class="total-box">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <p style="font-size: 14px; font-weight: 600; color: #166534; margin: 0;">Estimated Price</p>
                  ${draft.notes ? `<p style="font-size: 12px; color: #6b7280; margin: 4px 0 0 0;"><strong>Notes:</strong> ${draft.notes}</p>` : ''}
                </div>
                <p class="total">${priceDisplay}</p>
              </div>
              ${priceNote}
            </div>

            <div class="footer">
              <span>Air Comfort - Powering Tomorrow</span>
              <span>Generated: ${new Date().toLocaleString()}</span>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone?.includes(searchTerm) ||
      item.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.system_capacity?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: items.length,
    approved: items.filter(i => i.status === 'approved').length,
    pending: items.filter(i => i.status === 'pending').length,
    rejected: items.filter(i => i.status === 'rejected').length,
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'from-green-50 to-emerald-50 border-green-200 text-green-700';
      case 'pending': return 'from-yellow-50 to-amber-50 border-yellow-200 text-yellow-700';
      case 'rejected': return 'from-red-50 to-rose-50 border-red-200 text-red-700';
      default: return 'from-gray-50 to-gray-100 border-gray-200 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 bg-clip-text text-transparent">
                  Quotations
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">Review, edit, approve, print, and export quotations</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={loadQuotations}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300"
            >
              <RefreshCw className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Refresh</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">{items.length} Quotations</span>
            </div>
            <Link 
              to="/quotation" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 hover:scale-105 transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              Create Quotation
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-500 font-medium">Total</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            <p className="text-xs text-green-600 font-medium">Approved</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200 p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-xs text-yellow-600 font-medium">Pending</p>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-200 p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-xs text-red-600 font-medium">Rejected</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search quotations by customer, phone, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-all duration-300 ${viewMode === 'list' ? 'bg-green-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-all duration-300 ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price Message */}
        {priceMessage && (
          <div className={`mb-4 p-3 rounded-xl text-sm font-medium ${
            priceMessage.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' :
            priceMessage.includes('❌') ? 'bg-red-50 text-red-700 border border-red-200' :
            'bg-yellow-50 text-yellow-700 border border-yellow-200'
          }`}>
            {priceMessage}
          </div>
        )}

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Quotations List */}
          <div className="space-y-3">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No quotations found</p>
                <p className="text-sm text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => setSelectedId(item.id)} 
                  className={`w-full rounded-2xl border p-4 text-left shadow-sm transition-all duration-300 hover:shadow-md ${
                    selectedId === item.id 
                      ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 ring-2 ring-green-200' 
                      : 'border-gray-200 bg-white hover:border-green-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{item.customer_name || 'Unnamed Customer'}</p>
                      <p className="text-sm text-gray-500">{item.phone || 'No phone'}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="capitalize">{item.status}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5 text-yellow-500" />
                      {item.system_capacity || 'N/A'}
                    </span>
                    <span className="w-px h-3 bg-gray-200"></span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-green-500" />
                      {item.estimated_price || 'N/A'}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Quotation Details */}
          {selected ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getStatusColor(selected.status)}`}>
                    {getStatusIcon(selected.status)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selected.customer_name || 'Quotation'}</h2>
                    <p className="text-sm text-gray-500">{selected.address}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={handlePrint} 
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 text-sm font-semibold text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <Printer className="h-4 w-4" /> Print
                  </button>
                  <button 
                    onClick={handlePrint} 
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <Download className="h-4 w-4" /> PDF
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-400" /> Customer Name
                  </label>
                  <input 
                    value={draft?.customer_name || ''} 
                    onChange={(e) => handleFieldChange('customer_name', e.target.value)} 
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50" 
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Phone className="h-4 w-4 text-gray-400" /> Phone
                  </label>
                  <input 
                    value={draft?.phone || ''} 
                    onChange={(e) => handleFieldChange('phone', e.target.value)} 
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" /> Address
                  </label>
                  <input 
                    value={draft?.address || ''} 
                    onChange={(e) => handleFieldChange('address', e.target.value)} 
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50" 
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-gray-400" /> Electricity Bill
                  </label>
                  <input 
                    value={draft?.electricity_bill || ''} 
                    onChange={(e) => handleFieldChange('electricity_bill', e.target.value)} 
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50" 
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Zap className="h-4 w-4 text-gray-400" /> System Capacity
                  </label>
                  <select
                    value={draft?.system_capacity || ''}
                    onChange={(e) => handleFieldChange('system_capacity', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  >
                    <option value="">Select capacity</option>
                    {capacityOptions.map((cap) => (
                      <option key={cap} value={cap}>{cap}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Package className="h-4 w-4 text-gray-400" /> Panel Brand
                  </label>
                  <select
                    value={draft?.panel_brand || ''}
                    onChange={(e) => handleFieldChange('panel_brand', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  >
                    <option value="">Select panel brand</option>
                    {panelBrandOptions.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Shield className="h-4 w-4 text-gray-400" /> Inverter Type
                  </label>
                  <select
                    value={draft?.inverter_type || ''}
                    onChange={(e) => handleFieldChange('inverter_type', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  >
                    <option value="">Select inverter type</option>
                    {inverterTypeOptions.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <Battery className="h-4 w-4 text-gray-400" /> Battery Requirement
                  </label>
                  <select
                    value={draft?.battery_requirement || ''}
                    onChange={(e) => handleFieldChange('battery_requirement', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  >
                    <option value="">Select battery</option>
                    {batteryOptions.map((bat) => (
                      <option key={bat} value={bat}>{bat}</option>
                    ))}
                  </select>
                </div>
                {/* Price Display - Auto-calculated */}
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-500" /> Estimated Price (Auto-calculated)
                  </label>
                  <div className="w-full rounded-xl border-2 border-green-200 bg-green-50 px-4 py-3 text-xl font-bold text-green-700">
                    {draft?.estimated_price || 'Select configuration to get price'}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Price is automatically calculated based on your selections</p>
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700 flex items-center gap-1">
                    <PenTool className="h-4 w-4 text-gray-400" /> Notes
                  </label>
                  <textarea 
                    value={draft?.notes || ''} 
                    onChange={(e) => handleFieldChange('notes', e.target.value)} 
                    rows={4} 
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none bg-gray-50/50 resize-none" 
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={handleSave} 
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Save className="h-4 w-4" /> Save Changes
                </button>
                <button 
                  onClick={() => handleDelete(selected.id)} 
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
                <span className="ml-auto text-xs text-gray-400">
                  Updated: {new Date(selected.updated_at).toLocaleString()}
                </span>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">Select a Quotation</h3>
              <p className="text-gray-400 mt-1">Choose a quotation from the list to view details</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3 text-green-500" />
              {stats.total} Quotations
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              {stats.approved} Approved
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-yellow-500" />
              {stats.pending} Pending
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <XCircle className="h-3 w-3 text-red-500" />
              {stats.rejected} Rejected
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span>v2.0.1</span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}