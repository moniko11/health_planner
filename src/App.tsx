import React, { useState, useId, useRef } from 'react';
import {
  Droplets,
  Wind,
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Clock,
  Calendar,
  FileText,
  Send,
  Printer,
  ArrowRight,
  Filter,
  Calculator,
  Heart,
  Award,
  Download,
  User,
  MapPin,
  Mail,
  Check,
  RotateCcw,
  Zap,
  Info,
  ChevronDown,
  X,
  Phone
} from 'lucide-react';

// Product Catalog Data in Indonesian Rupiah (IDR)
interface CowayProduct {
  id: string;
  name: string;
  category: 'water' | 'air' | 'living';
  tagline: string;
  monthlyRental: number;
  promoMonthlyRental: number;
  outrightPrice: number;
  capacityOrCoverage: string;
  temperaturesOrStages: string;
  features: string[];
  dimensions: string;
  power: string;
  popular?: boolean;
  image: string;
}

const PRODUCTS: CowayProduct[] = [
  {
    id: 'neo-plus',
    name: 'Coway Neo Plus (CHP-264L)',
    category: 'water',
    tagline: 'Pemurni Air Keluarga Terlaris #1 Paling Favorit di Indonesia',
    monthlyRental: 320000,
    promoMonthlyRental: 250000,
    outrightPrice: 9900000,
    capacityOrCoverage: '5.8 Liter (Normal 2.5L, Dingin 2.3L, Panas 1.0L)',
    temperaturesOrStages: '3 Pilihan Suhu: Normal, Dingin, Panas dengan Child-Lock',
    features: [
      'Filtrasi canggih Reverse Osmosis (RO) Membrane 0.0001 mikron',
      'Tuas ekstraksi terus-menerus untuk pengisian botol praktis',
      'Mode hemat listrik Eco-Sensor saat malam hari',
      'Gratis servis berkala Cody & ganti filter setiap 4 bulan'
    ],
    dimensions: '260 x 505 x 500 mm',
    power: 'Dingin 0.7A / Panas 300W',
    popular: true,
    image: '/src/assets/images/coway_hero_purifier_1791998277313.jpg'
  },
  {
    id: 'ombak',
    name: 'Coway Ombak (CHP-7310R)',
    category: 'water',
    tagline: '50+ Kombinasi Pengaturan Suhu & Volume Khusus Keluarga Modern',
    monthlyRental: 490000,
    promoMonthlyRental: 390000,
    outrightPrice: 16500000,
    capacityOrCoverage: '13.5 Liter (Kapasitas Terbesar di Kelas Countertop)',
    temperaturesOrStages: '50+ Variasi Suhu: Susu Bayi (40-50°C), Teh (70°C), Kopi (85°C)',
    features: [
      'Sterilisasi sinar UV otomatis pada corong kran air',
      'Tombol satu sentuhan cepat untuk takaran botol susu bayi',
      'Kapasitas tangki air dingin & panas ekstra besar',
      'Heart Service Coway Cody dengan 100% uap panas steril'
    ],
    dimensions: '340 x 523 x 518 mm',
    power: 'Dingin 0.6A / Panas 672-800W',
    image: '/src/assets/images/coway_hero_purifier_1791998277313.jpg'
  },
  {
    id: 'villaem-2',
    name: 'Coway Villaem II (CHP-18AR)',
    category: 'water',
    tagline: 'Pemurni Air 4 Suhu Ergonomis Paling Praktis untuk Dapur Rumah',
    monthlyRental: 430000,
    promoMonthlyRental: 340000,
    outrightPrice: 14800000,
    capacityOrCoverage: '11.3 Liter (Normal 6.4L, Dingin 3.7L, Panas 1.2L)',
    temperaturesOrStages: '4 Pilihan Suhu: Normal, Dingin, Hangat, dan Panas',
    features: [
      'Knob pemutar seleksi suhu putar yang sangat ergonomis',
      'Indikator LED level ketinggian air & status suhu',
      'Corong air faucet dapat dilepas dan dicuci higienis',
      'Tersertifikasi Halal BPJPH/MUI & standar WQA Gold Seal'
    ],
    dimensions: '340 x 523 x 518 mm',
    power: 'Dingin 0.7A / Panas 270-320W',
    image: '/src/assets/images/coway_hero_purifier_1791998277313.jpg'
  },
  {
    id: 'storm-air',
    name: 'Coway Storm Air Purifier (AP-1516D)',
    category: 'air',
    tagline: 'Dual Fan Air Circulator Bersih Cepat dengan Jangkauan 6 Meter',
    monthlyRental: 330000,
    promoMonthlyRental: 270000,
    outrightPrice: 9800000,
    capacityOrCoverage: 'Cakupan Ruangan Luas hingga 50 m²',
    temperaturesOrStages: 'Filtrasi 4 Tahap: Pre-filter, Fine Dust, Deodorisasi Karbon, HEPA',
    features: [
      'Kipas sirkulator hembusan udara bersih jarak jauh hingga 6 meter',
      'Cincin indikator LED 4 warna kualitas udara real-time',
      'Menyaring 99.999% partikel debu halus PM2.5, PM0.01 & virus udara',
      'Mode Haze cepat untuk membersihkan asap dan polusi kota'
    ],
    dimensions: '410 x 240 x 765 mm',
    power: '65W Max Inverter Hemat Energi',
    popular: true,
    image: '/src/assets/images/coway_air_purifier_1791998277782.jpg'
  },
  {
    id: 'noble-air',
    name: 'Coway Noble Air Purifier (AP-2021A)',
    category: 'air',
    tagline: 'Desain Mewah Arsitektural 4D 360° dengan Sterilisasi UVC',
    monthlyRental: 540000,
    promoMonthlyRental: 450000,
    outrightPrice: 18500000,
    capacityOrCoverage: 'Cakupan Ruang Besar hingga 66 m²',
    temperaturesOrStages: 'Hisap 4D 360° dengan Sistem Double HEPA 6 Langkah',
    features: [
      'Layar lipat tersembunyi dengan panel sentuh elegan',
      'Sterilisasi lampu UVC LED di dalam ruang kipas penyaring',
      'Sensor presisi pendeteksi partikel PM1.0, PM2.5, PM10 dan bau gas',
      'Pemenang penghargaan desain kelas dunia Red Dot & iF Design'
    ],
    dimensions: '320 x 320 x 805 mm',
    power: '50W Whisper Quiet Tenang & Senyap',
    image: '/src/assets/images/coway_air_purifier_1791998277782.jpg'
  },
  {
    id: 'prime-mattress',
    name: 'Coway Prime Mattress & Bedframe',
    category: 'living',
    tagline: 'Sistem Tidur Mewah Hotel Bintang 5 dengan 7 Tahap Sanitasi Homecare',
    monthlyRental: 620000,
    promoMonthlyRental: 510000,
    outrightPrice: 23000000,
    capacityOrCoverage: 'Tersedia Ukuran Queen & King Size',
    temperaturesOrStages: '5-Zone Pocket Springs + Topper Natural Latex 100%',
    features: [
      'Penggantian topper kasur berkala untuk kebersihan maksimal',
      'Layanan pembersihan kasur 7 tahap oleh Coway Homecare Technician',
      'Kain anti-tungau, anti-statis, dan anti-bakterial bersertifikat',
      'Kontur ergonomis menopang tulang belakang secara sempurna'
    ],
    dimensions: 'Standar Queen / King',
    power: 'Bebas Radiasi Listrik / Zero EMF',
    image: '/src/assets/images/coway_cody_specialist_1791998277853.jpg'
  }
];

// Indonesian FAQ Data
interface FAQItem {
  id: string;
  category: 'installation' | 'maintenance' | 'warranty';
  categoryLabel: string;
  question: string;
  answer: string;
  highlight: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'install-timeline',
    category: 'installation',
    categoryLabel: 'Instalasi & Pengiriman',
    question: 'Berapa lama proses pemasangan unit Coway setelah pendaftaran disetujui?',
    answer:
      'Pemasangan dilakukan dalam 2 hingga 4 hari kerja di seluruh wilayah Indonesia (Jabodetabek, Bandung, Surabaya, Medan, Semarang, Bali, dan kota besar lainnya). Tim teknisi resmi PT Coway International Indonesia akan menghubungi Anda 24 jam sebelum kedatangan untuk konfirmasi jadwal jam instalasi yang nyaman bagi Anda.',
    highlight: '2-4 hari kerja siap pasang di seluruh kota Indonesia'
  },
  {
    id: 'install-plumbing',
    category: 'installation',
    categoryLabel: 'Instalasi & Pengiriman',
    question: 'Apakah pemasangan membutuhkan bor dinding atau renovasi pipa dapur?',
    answer:
      'Sama sekali tidak memerlukan pembongkaran pipa atau bobok dinding keramik. Teknisi resmi Coway menyambungkan katup food-grade adapter khusus ke kran air atau stop kran wastafel yang sudah ada. Selang pipa food-grade dipasang rapi dengan klem klip tanpa merusak kitchen set. Sangat aman dan ramah untuk rumah sewa maupun apartemen.',
    highlight: 'Bebas bobok tembok, 100% aman untuk rumah & apartemen'
  },
  {
    id: 'filter-cost',
    category: 'maintenance',
    categoryLabel: 'Servis Cody & Filter',
    question: 'Apakah penggantian filter dan kunjungan servis berkala benar-benar Rp 0 (gratis)?',
    answer:
      'Ya, 100% gratis tanpa biaya tersembunyi! Dalam paket Rental / Paket Servis Coway, seluruh penggantian filter resmi (Neo-Sense, RO Membrane, Plus Inno-Sense, dan Antibacterial) diberikan secara GRATIS sesuai jadwal penggantian berkala. Anda tidak akan dikenakan biaya transportasi Cody maupun biaya jasa teknisi.',
    highlight: 'Filter & jasa teknisi Rp 0 selama masa langganan aktif'
  },
  {
    id: 'cody-schedule',
    category: 'maintenance',
    categoryLabel: 'Servis Cody & Filter',
    question: 'Apa saja yang dikerjakan Coway Lady (Cody) saat kunjungan rutin setiap 4 bulan?',
    answer:
      'Cody terlatih kami melakukan 7 Tahap Heart Service terstandar: (1) Pengecekan kualitas dan TDS kemurnian air, (2) Sterilisasi uap suhu tinggi bebas bahan kimia pada tangki dan corong kran, (3) Penggantian cartridge filter sesuai siklus, (4) Pembersihan sirkulasi jalur air internal, (5) Sanitasi ultrasonik pada part yang dapat dilepas, (6) Pemeriksaan fungsi kelistrikan & kompresor, dan (7) Pemasangan segel jaminan higienis.',
    highlight: '7 Tahap Heart Service dengan sterilisasi uap higienis'
  },
  {
    id: 'warranty-coverage',
    category: 'warranty',
    categoryLabel: 'Garansi & Kepemilikan',
    question: 'Apa saja yang dijamin dalam Garansi Penuh Coway selama masa kontrak rental?',
    answer:
      'Garansi mencakup 100% seluruh komponen mekanis dan elektrikal—termasuk motor kompresor pendingin, tangki pemanas, pompa pendorong internal, layar kontrol sentuh digital, hingga sensor pelampung air. Jika terjadi kendala operasional, teknisi resmi Coway akan datang ke rumah Anda untuk perbaikan tanpa biaya suku cadang.',
    highlight: 'Garansi suku cadang 100% bebas biaya servis teknisi'
  },
  {
    id: 'relocation-policy',
    category: 'warranty',
    categoryLabel: 'Garansi & Kepemilikan',
    question: 'Bagaimana jika saya pindah rumah atau apartemen selama masa rental?',
    answer:
      'Coway menyediakan fasilitas GRATIS biaya relokasi / bongkar pasang 1 kali setiap tahun! Cukup hubungi Health Planner Moniko Martiano atau customer care resmi 5 hari sebelum pindahan, dan tim teknisi Coway akan membongkar unit di tempat lama lalu memasangnya kembali di rumah baru Anda di kota tujuan.',
    highlight: 'Gratis 1x layanan relokasi & pasang ulang per tahun'
  },
  {
    id: 'contract-completion',
    category: 'warranty',
    categoryLabel: 'Garansi & Kepemilikan',
    question: 'Siapakah pemilik unit setelah periode rental (misal 5 atau 7 tahun) selesai?',
    answer:
      'Setelah masa sewa selesai (misalnya 60 bulan pada paket 5 tahun atau 84 bulan pada paket 7 tahun), unit Coway 100% menjadi HAK MILIK PRIBADI Anda tanpa perlu membayar biaya tambahan apapun! Setelah itu, Anda bebas memilih untuk berlangganan paket perawatan tahunan (Heart Service Membership) dengan tarif sangat terjangkau.',
    highlight: 'Unit otomatis menjadi hak milik Anda 100% tanpa biaya pelunasan'
  }
];

// Helper to format Indonesian Rupiah cleanly
const formatRupiah = (val: number): string => {
  return 'Rp ' + val.toLocaleString('id-ID');
};

export default function App() {
  const formId = useId();
  const registerSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const calculatorSectionRef = useRef<HTMLDivElement>(null);
  const faqSectionRef = useRef<HTMLDivElement>(null);

  // FAQ state
  const [activeFaqCategory, setActiveFaqCategory] = useState<'all' | 'installation' | 'maintenance' | 'warranty'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('install-timeline');

  // Filter state
  const [activeCategory, setActiveCategory] = useState<'all' | 'water' | 'air' | 'living'>('all');
  const [selectedProductId, setSelectedProductId] = useState<string>('neo-plus');

  // Hydration Calculator state
  const [bodyWeight, setBodyWeight] = useState<number>(65);
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'active'>('moderate');
  const [familyMembers, setFamilyMembers] = useState<number>(4);

  // Customer Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactCity, setContactCity] = useState('Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)');
  const [contactInquiryType, setContactInquiryType] = useState('Konsultasi Gratis & Cek Kualitas Air di Rumah');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Registration Generator state
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regIdLast4, setRegIdLast4] = useState('');
  const [regPlanType, setRegPlanType] = useState<'rental-5yr' | 'rental-7yr' | 'outright'>('rental-5yr');
  const [regInstallationAddress, setRegInstallationAddress] = useState('');
  const [regPreferredDate, setRegPreferredDate] = useState('Dalam 2-3 hari kerja');
  const [regPaymentMethod, setRegPaymentMethod] = useState<'Autodebet Bank' | 'Kartu Kredit / Debit' | 'Transfer Virtual Account'>('Kartu Kredit / Debit');
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [generatedRegId, setGeneratedRegId] = useState('');

  // Hydration Calculation Formula
  const waterPerKg = activityLevel === 'sedentary' ? 0.033 : activityLevel === 'moderate' ? 0.038 : 0.045;
  const personalWaterNeeds = (bodyWeight * waterPerKg).toFixed(1);
  const totalFamilyWaterNeeds = (parseFloat(personalWaterNeeds) * familyMembers).toFixed(1);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  // Handlers
  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    registerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSubmitted(true);
    }, 600);
  };

  const handleGenerateRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const code = `CWY-ID-${randomNum}`;
    setGeneratedRegId(code);
    setRegistrationModalOpen(true);
  };

  const calculateMonthlyPrice = (product: CowayProduct, plan: 'rental-5yr' | 'rental-7yr' | 'outright') => {
    if (plan === 'outright') return product.outrightPrice;
    if (plan === 'rental-7yr') return Math.round(product.promoMonthlyRental * 0.88);
    return product.promoMonthlyRental;
  };

  const currentPrice = calculateMonthlyPrice(selectedProduct, regPlanType);

  const whatsappMessage = encodeURIComponent(
    `Halo Coway Health Planner Moniko! Saya ingin memesan unit Coway melalui formulir registrasi online Coway Health App.\n\n` +
    `No. Registrasi: ${generatedRegId || 'CWY-ID-ONLINE'}\n` +
    `Produk: ${selectedProduct.name}\n` +
    `Paket: ${regPlanType === 'outright' ? 'Beli Putus (Outright Cash/Kartu)' : regPlanType === 'rental-7yr' ? 'Rental Hemat 7 Tahun' : 'Rental Standar 5 Tahun'}\n` +
    `Harga: ${regPlanType === 'outright' ? formatRupiah(currentPrice) : formatRupiah(currentPrice) + '/bulan'}\n` +
    `Nama Pemohon: ${regFullName || 'Pelanggan'}\n` +
    `No. WhatsApp: ${regPhone || 'N/A'}\n` +
    `Alamat Pasang: ${regInstallationAddress || 'Konfirmasi via chat'}\n` +
    `Metode Bayar: ${regPaymentMethod}\n\n` +
    `Mohon dibantu verifikasi promo Bebas Biaya Registrasi Rp 500.000 dan jadwal pasang teknisi. Terima kasih!`
  );

  return (
    <div className="min-h-screen bg-[#f0f7fd] text-slate-800 font-sans selection:bg-sky-200 selection:text-sky-900">
      {/* 
        TOP BAR CONTRACT:
        Zone 1: Single element wordmark & icon
        Zone 2: Single-line navigation links
        Zone 3: Primary action button
      */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand & Web Icon */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
              <Droplets className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 leading-none">
                Coway Health Indonesia
              </span>
              <span className="text-[11px] font-medium text-sky-700 tracking-wide mt-1">
                Portal Resmi Health Planner & Cody
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-sky-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Katalog Produk
            </button>
            <button
              onClick={() => calculatorSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-sky-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Kalkulator Hidrasi
            </button>
            <button
              onClick={() => faqSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-sky-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              FAQ & Garansi
            </button>
            <button
              onClick={() => registerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-sky-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Form Registrasi
            </button>
            <button
              onClick={() => contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-sky-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Hubungi Seller
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/6288290444120?text=Halo%20Coway%20Health%20Planner%20Moniko,%20saya%20tertarik%20dengan%20promo%20rental%20Coway%20Indonesia"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
              <span>WhatsApp Seller</span>
            </a>
            <button
              onClick={() => registerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg shadow-sm shadow-sky-600/25 transition-all whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daftar Sekarang</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-20 bg-gradient-to-b from-[#e1f0fc] via-[#ebf5fe] to-[#f0f7fd]">
        {/* Soft decorative background water ripples */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-100/50 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Title, Subtitle, Value Proposition, Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-sky-200/90 text-xs font-semibold text-sky-800 shadow-xs backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Health Planner Resmi PT Coway International Indonesia</span>
                <span className="text-slate-300">|</span>
                <span>Agent Code: DST260800074</span>
              </div>

              <h1 className="font-display font-extrabold text-slate-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.15] text-balance">
                Air Murni & Udara Bersih untuk Setiap Rumah Tangga di Indonesia.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl text-balance">
                Wujudkan gaya hidup sehat keluarga Anda dengan teknologi pemurnian air dan udara nomor 1 dari Korea. Nikmati promo spesial bebas biaya registrasi, servis rutin Cody setiap 4 bulan, dan paket rental terjangkau mulai dari <strong className="text-sky-700 font-semibold">Rp 250.000/bulan</strong>.
              </p>

              {/* Quick Seller Trust Metrics (Tabular numerals in IDR context) */}
              <div className="grid grid-cols-3 gap-3 pt-2 pb-2 max-w-xl">
                <div className="p-3.5 rounded-xl bg-white/70 border border-sky-100 shadow-xs">
                  <div className="text-xl sm:text-2xl font-bold font-display text-sky-800 tabular-nums">Rp 0</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Biaya Pasang & Registrasi</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-sky-100 shadow-xs">
                  <div className="text-xl sm:text-2xl font-bold font-display text-sky-800 tabular-nums">4 Bulan</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Gratis Servis & Filter Cody</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/70 border border-sky-100 shadow-xs">
                  <div className="text-xl sm:text-2xl font-bold font-display text-sky-800 tabular-nums">100%</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Halal BPJPH & Kemenkes</div>
                </div>
              </div>

              {/* Primary Dual Call To Action */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => registerSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-md shadow-sky-600/30 transition-all cursor-pointer whitespace-nowrap"
                >
                  <FileText className="w-4 h-4" />
                  <span>Buat Surat Registrasi Order</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <button
                  onClick={() => contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-sky-900 bg-white hover:bg-sky-50/80 rounded-xl border border-sky-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <PhoneCall className="w-4 h-4 text-sky-600" />
                  <span>Konsultasi dengan Seller</span>
                </button>
              </div>

              {/* Certified Trust Seals */}
              <div className="flex items-center gap-5 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sky-600" /> Sertifikasi Halal BPJPH
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sky-600" /> Standar Air Minum Kemenkes
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-sky-600" /> WQA Gold Seal & NSF
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Appliance with Quality Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-sky-200 bg-white">
                <img
                  src="/src/assets/images/coway_hero_purifier_1791998277313.jpg"
                  alt="Coway Smart Purifier Countertop Water Dispenser"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-sky-300">
                        Produk Terpopuler #1
                      </span>
                      <h3 className="text-lg font-bold font-display mt-0.5">
                        Coway Neo Plus CHP-264L
                      </h3>
                      <p className="text-xs text-slate-200 mt-0.5">
                        Sistem RO 3 Suhu: Normal, Dingin & Panas
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-sky-200 line-through">Rp 320.000/bln</div>
                      <div className="text-xl font-extrabold text-white font-display tabular-nums">
                        Rp 250.000<span className="text-xs font-normal">/bln</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-slate-200">
                    <span>Termasuk Gratis Servis Cody 5 Tahun</span>
                    <button
                      onClick={() => handleSelectProduct('neo-plus')}
                      className="text-sky-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                    >
                      Daftar Langsung &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Verified Seller Card */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-sky-100 flex items-center gap-3 max-w-xs">
                <img
                  src="/src/assets/images/coway_cody_specialist_1791998277853.jpg"
                  alt="Coway Health Planner Moniko"
                  className="w-12 h-12 rounded-lg object-cover border border-sky-200 shrink-0"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>Moniko Martiano</span>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" title="Aktif melayani pelanggan" />
                  </div>
                  <div className="text-[11px] text-slate-500">Senior Coway Health Planner</div>
                  <div className="text-[10px] text-sky-600 font-semibold mt-0.5">Melayani Seluruh Indonesia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE HYDRATION & AIR PURITY ESTIMATOR */}
      <section ref={calculatorSectionRef} className="py-16 bg-white border-y border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold text-sky-600 tracking-wider uppercase mb-1">
              Kalkulator Kebutuhan Air Bersih
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              Hitung Kebutuhan Air Minum Murni Keluarga Anda Setiap Hari
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Ketahui kapasitas tangki pemurni air Coway yang paling pas untuk memenuhi kebutuhan hidrasi harian anggota keluarga di rumah Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Form Controls */}
            <div className="lg:col-span-7 bg-[#f7fbfe] rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6">
              {/* Body Weight Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={`${formId}-weight`} className="text-sm font-semibold text-slate-800">
                    Berat Badan Rata-Rata Dewasa
                  </label>
                  <span className="text-sm font-bold text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-md tabular-nums">
                    {bodyWeight} kg
                  </span>
                </div>
                <input
                  id={`${formId}-weight`}
                  type="range"
                  min="40"
                  max="120"
                  step="1"
                  value={bodyWeight}
                  onChange={(e) => setBodyWeight(Number(e.target.value))}
                  className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>40 kg</span>
                  <span>80 kg</span>
                  <span>120 kg</span>
                </div>
              </div>

              {/* Activity Level Selector */}
              <div>
                <label className="text-sm font-semibold text-slate-800 block mb-2">
                  Tingkat Aktivitas Fisik Sehari-hari
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActivityLevel('sedentary')}
                    className={`p-3 text-left rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      activityLevel === 'sedentary'
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-white text-slate-700 border-sky-100 hover:border-sky-300'
                    }`}
                  >
                    <div className="font-bold text-sm">Ringan / Kerja Meja</div>
                    <div className={`text-[11px] mt-0.5 ${activityLevel === 'sedentary' ? 'text-sky-100' : 'text-slate-500'}`}>
                      Bekerja di dalam ruangan AC
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivityLevel('moderate')}
                    className={`p-3 text-left rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      activityLevel === 'moderate'
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-white text-slate-700 border-sky-100 hover:border-sky-300'
                    }`}
                  >
                    <div className="font-bold text-sm">Sedang</div>
                    <div className={`text-[11px] mt-0.5 ${activityLevel === 'moderate' ? 'text-sky-100' : 'text-slate-500'}`}>
                      Jalan kaki & aktivitas rumah
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivityLevel('active')}
                    className={`p-3 text-left rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      activityLevel === 'active'
                        ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                        : 'bg-white text-slate-700 border-sky-100 hover:border-sky-300'
                    }`}
                  >
                    <div className="font-bold text-sm">Tinggi / Olahraga</div>
                    <div className={`text-[11px] mt-0.5 ${activityLevel === 'active' ? 'text-sky-100' : 'text-slate-500'}`}>
                      Kerap olahraga & cuaca terik
                    </div>
                  </button>
                </div>
              </div>

              {/* Family Members Count */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor={`${formId}-members`} className="text-sm font-semibold text-slate-800">
                    Jumlah Anggota Keluarga di Rumah
                  </label>
                  <span className="text-sm font-bold text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-md tabular-nums">
                    {familyMembers} Orang
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5, 6, 8].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setFamilyMembers(count)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer tabular-nums ${
                        familyMembers === count
                          ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                          : 'bg-white text-slate-700 border-sky-100 hover:border-sky-300'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-time Calculation Result Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-sky-900 via-sky-800 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div>
                  <div className="text-xs font-semibold text-sky-300 uppercase tracking-wide">
                    Estimasi Total Kebutuhan Air Minum
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold font-display tabular-nums tracking-tight">
                      {totalFamilyWaterNeeds}
                    </span>
                    <span className="text-lg text-sky-200">Liter / hari</span>
                  </div>
                  <div className="text-xs text-sky-200 mt-1">
                    (~{personalWaterNeeds} Liter/hari untuk setiap orang dewasa)
                  </div>
                </div>

                <div className="pt-4 border-t border-sky-700/60 space-y-3">
                  <div className="text-xs font-semibold text-sky-300 uppercase">
                    Rekomendasi Pemurni Air Coway
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-xs border border-white/10">
                    <div className="font-bold text-base text-white">
                      {familyMembers <= 3
                        ? 'Coway Neo Plus (CHP-264L)'
                        : familyMembers <= 5
                        ? 'Coway Ombak (CHP-7310R)'
                        : 'Coway Villaem II (CHP-18AR)'}
                    </div>
                    <div className="text-xs text-sky-200 mt-1">
                      {familyMembers <= 3
                        ? 'Kapasitas 5.8 Liter sangat pas dan hemat ruang untuk keluarga kecil.'
                        : familyMembers <= 5
                        ? 'Kapasitas besar 13.5 Liter dengan 50+ variasi suhu untuk kebutuhan masak dan susu anak.'
                        : 'Kapasitas tangki 11.3 Liter dengan 4 suhu lengkap untuk keluarga besar.'}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      const recId = familyMembers <= 3 ? 'neo-plus' : 'ombak';
                      handleSelectProduct(recId);
                    }}
                    className="w-full py-3 px-4 bg-white hover:bg-sky-50 text-sky-900 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Pilih Model Rekomendasi Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCT CATALOG & COMPARISON */}
      <section ref={productsSectionRef} className="py-16 bg-[#f0f7fd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs font-bold text-sky-600 tracking-wider uppercase mb-1">
                Lini Produk Resmi Coway Indonesia
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                Water Purifier, Air Purifier & Kasur Kesehatan
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Pilih antara paket sewa bulanan hemat (rental) atau beli putus (outright). Semua paket rental sudah mencakup servis gratis.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-sky-100 shadow-xs shrink-0 self-start">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua Produk
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('water')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'water'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pemurni Air
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('air')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'air'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pemurni Udara
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('living')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === 'living'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Kasur & Living
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isSelected = product.id === selectedProductId;
              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-sky-500 shadow-md ring-2 ring-sky-500/20'
                      : 'border-sky-100 shadow-xs hover:border-sky-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Visual Showcase */}
                    <div className="relative h-56 bg-slate-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        {product.popular && (
                          <span className="bg-sky-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                            Paling Populer
                          </span>
                        )}
                        <span className="bg-white/90 backdrop-blur-xs text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-slate-200">
                          {product.category === 'water' ? 'Water' : product.category === 'air' ? 'Air' : 'Living'}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                        {product.capacityOrCoverage}
                      </div>
                    </div>

                    {/* Details Content */}
                    <div className="p-6">
                      <h3 className="font-display font-bold text-lg text-slate-900">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {product.tagline}
                      </p>

                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                        <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span className="truncate">{product.temperaturesOrStages}</span>
                        </div>
                        {product.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pricing Tag in IDR */}
                      <div className="mt-5 p-3.5 bg-sky-50/70 rounded-xl border border-sky-100 flex items-center justify-between">
                        <div>
                          <div className="text-[11px] text-slate-500">Paket Sewa Promo</div>
                          <div className="text-base sm:text-lg font-extrabold text-sky-800 font-display tabular-nums">
                            {formatRupiah(product.promoMonthlyRental)}
                            <span className="text-xs font-normal text-slate-500">/bln</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] text-slate-500">Beli Putus</div>
                          <div className="text-xs font-bold text-slate-700 tabular-nums">
                            {formatRupiah(product.outrightPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => handleSelectProduct(product.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                          : 'bg-white hover:bg-sky-50 text-sky-800 border border-sky-200'
                      }`}
                    >
                      <span>{isSelected ? 'Sedang Dipilih' : 'Pilih untuk Registrasi'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: CODY HEART SERVICE TRANSPARENCY (Proof & Trust) */}
      <section className="py-14 bg-white border-y border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Keunggulan Eksklusif Coway
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1">
              Apa Saja yang Didapatkan dalam Paket Sewa Coway?
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Setiap paket langganan sewa Coway sudah termasuk layanan berkala resmi Heart Service oleh Coway Lady (Cody). Tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#f8fbfe] border border-sky-100">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-display">Kunjungan Servis Tiap 4 Bulan</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Coway Lady (Cody) resmi akan berkunjung ke rumah Anda setiap 4 bulan untuk membersihkan dan mensterilkan mesin.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fbfe] border border-sky-100">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-display">100% Ganti Filter Gratis</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Seluruh filter sediment, karbon aktif, dan membran RO diganti baru secara teratur tanpa biaya tambahan (Rp 0).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fbfe] border border-sky-100">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-display">Garansi Penuh 5 Tahun</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Perlindungan menyeluruh untuk kompresor, pemanas, dan motherboard mesin dengan bebas biaya perbaikan teknisi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8fbfe] border border-sky-100">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 font-display">Gratis Pindah Alamat 1x/Tahun</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Pindah rumah atau apartemen? Teknisi resmi Coway akan membongkar dan memasang ulang unit Anda secara cuma-cuma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: FAQ ACCORDION (Indonesian Context) */}
      <section ref={faqSectionRef} className="py-16 bg-[#f7fbfe] border-b border-sky-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Pusat Informasi & Bantuan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-1 tracking-tight">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Informasi lengkap dan transparan seputar proses instalasi teknisi, jadwal perawatan filter Cody, serta syarat garansi resmi Coway Indonesia.
            </p>

            {/* Category Filter Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setActiveFaqCategory('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeFaqCategory === 'all'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-sky-100'
                }`}
              >
                Semua Pertanyaan ({FAQS.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFaqCategory('installation')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeFaqCategory === 'installation'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-sky-100'
                }`}
              >
                Instalasi & Pengiriman (2)
              </button>
              <button
                type="button"
                onClick={() => setActiveFaqCategory('maintenance')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeFaqCategory === 'maintenance'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-sky-100'
                }`}
              >
                Servis Cody & Filter (2)
              </button>
              <button
                type="button"
                onClick={() => setActiveFaqCategory('warranty')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeFaqCategory === 'warranty'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-sky-100'
                }`}
              >
                Garansi & Kepemilikan (3)
              </button>
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {FAQS.filter((f) => activeFaqCategory === 'all' || f.category === activeFaqCategory).map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-sky-300 shadow-sm ring-1 ring-sky-300/40'
                      : 'bg-white/80 hover:bg-white border-sky-100'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-sky-700">
                        <span>{faq.categoryLabel}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                        {faq.question}
                      </h3>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-sky-100 text-sky-700 rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 space-y-3">
                      <p>{faq.answer}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200/70 text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>Kelebihan: {faq.highlight}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help Card Below Accordion */}
          <div className="mt-8 p-5 rounded-2xl bg-white border border-sky-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Punya pertanyaan khusus yang belum terjawab?</div>
                <div className="text-[11px] text-slate-500">Health Planner Moniko Martiano siap membantu melalui WhatsApp setiap hari.</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <a
                href="https://wa.me/6288290444120?text=Halo%20Moniko!%20Saya%20ingin%20bertanya%20seputar%20pemasangan%20dan%20paket%20rental%20Coway%20Indonesia."
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Tanya via WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Tinggalkan Pesan</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: GENERATE REGISTRATION ORDER (Customer Registration Form in IDR) */}
      <section ref={registerSectionRef} className="py-16 bg-[#eaf4fd] border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold text-sky-600 tracking-wider uppercase mb-1">
              Pendaftaran Pelanggan Baru
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
              Buat Surat Registrasi Order Resmi Coway
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Pilih paket rental atau beli putus, isi data pengiriman, dan dapatkan Surat Konfirmasi Pemesanan resmi dengan jaminan promo bebas biaya registrasi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* The Generator Form */}
            <form onSubmit={handleGenerateRegistration} className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6">
              {/* Step 1: Confirm Selected Product */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
                  Langkah 1: Produk yang Dipilih
                </label>
                <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-12 h-12 rounded-lg object-cover border border-sky-200"
                    />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{selectedProduct.name}</div>
                      <div className="text-xs text-slate-500">{selectedProduct.capacityOrCoverage}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline cursor-pointer"
                  >
                    Ganti Model
                  </button>
                </div>
              </div>

              {/* Step 2: Choose Tenure / Plan */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-2">
                  Langkah 2: Pilihan Paket Langganan & Masa Rental
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setRegPlanType('rental-5yr')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      regPlanType === 'rental-5yr'
                        ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-600/20'
                        : 'border-slate-200 hover:border-sky-300 bg-white'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-500">Rental 5 Tahun</div>
                    <div className="text-base sm:text-lg font-bold text-slate-900 font-display tabular-nums mt-0.5">
                      {formatRupiah(selectedProduct.promoMonthlyRental)}<span className="text-xs font-normal">/bln</span>
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium mt-1">Gratis Servis Cody 5 Thn</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegPlanType('rental-7yr')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      regPlanType === 'rental-7yr'
                        ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-600/20'
                        : 'border-slate-200 hover:border-sky-300 bg-white'
                    }`}
                  >
                    <span className="absolute top-0 right-0 bg-sky-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl">
                      Paling Hemat
                    </span>
                    <div className="text-xs font-semibold text-slate-500">Mega Rental 7 Thn</div>
                    <div className="text-base sm:text-lg font-bold text-slate-900 font-display tabular-nums mt-0.5">
                      {formatRupiah(Math.round(selectedProduct.promoMonthlyRental * 0.88))}<span className="text-xs font-normal">/bln</span>
                    </div>
                    <div className="text-[11px] text-emerald-600 font-medium mt-1">Gratis Servis Cody 7 Thn</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegPlanType('outright')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      regPlanType === 'outright'
                        ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-600/20'
                        : 'border-slate-200 hover:border-sky-300 bg-white'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-500">Beli Putus (Cash/Kartu)</div>
                    <div className="text-base sm:text-lg font-bold text-slate-900 font-display tabular-nums mt-0.5">
                      {formatRupiah(selectedProduct.outrightPrice)}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Gratis Servis Cody 1 Thn</div>
                  </button>
                </div>
              </div>

              {/* Step 3: Customer Details */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                  Langkah 3: Data Pemohon untuk Penerbitan E-Surat Registrasi
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`${formId}-reg-name`} className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap (sesuai KTP) *
                    </label>
                    <input
                      id={`${formId}-reg-name`}
                      type="text"
                      required
                      placeholder="contoh: Budi Santoso / Siti Rahmawati"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-reg-phone`} className="block text-xs font-semibold text-slate-700 mb-1">
                      No. Handphone / WhatsApp Aktif *
                    </label>
                    <input
                      id={`${formId}-reg-phone`}
                      type="tel"
                      required
                      placeholder="contoh: 0812-3456-7890"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`${formId}-reg-ic`} className="block text-xs font-semibold text-slate-700 mb-1">
                      KTP / NIK 4 Digit Terakhir (Verifikasi)
                    </label>
                    <input
                      id={`${formId}-reg-ic`}
                      type="text"
                      maxLength={4}
                      placeholder="contoh: 4321"
                      value={regIdLast4}
                      onChange={(e) => setRegIdLast4(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-reg-payment`} className="block text-xs font-semibold text-slate-700 mb-1">
                      Pilihan Metode Pembayaran
                    </label>
                    <select
                      id={`${formId}-reg-payment`}
                      value={regPaymentMethod}
                      onChange={(e) => setRegPaymentMethod(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
                    >
                      <option value="Kartu Kredit / Debit">Kartu Kredit / Debit (Cicilan 0% Tanpa DP)</option>
                      <option value="Autodebet Bank">Autodebet Rekening BCA / Mandiri / BRI</option>
                      <option value="Transfer Virtual Account">Transfer Virtual Account / QRIS</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor={`${formId}-reg-address`} className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat Lengkap Pengiriman & Pemasangan Unit
                  </label>
                  <textarea
                    id={`${formId}-reg-address`}
                    rows={2}
                    placeholder="contoh: Jl. Melati No. 15, RT 02/RW 05, Kebayoran Baru, Jakarta Selatan"
                    value={regInstallationAddress}
                    onChange={(e) => setRegInstallationAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              {/* GENERATE BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-xl font-bold text-sm shadow-md shadow-sky-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Terbitkan Surat Registrasi Order Resmi</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <div className="text-center text-[11px] text-slate-400 mt-2">
                  🔒 Tanpa komitmen awal. Penerbitan surat reservasi mengunci harga promo dengan seller resmi.
                </div>
              </div>
            </form>

            {/* Live Order Quotation Card in Rupiah */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-sky-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-bold text-sky-700">Pratinjau E-Kutipan Resmi</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">PT Coway International Indonesia</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400">STATUS</span>
                  <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PROMO AKTIF
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Model Produk</span>
                  <span className="font-semibold text-slate-800">{selectedProduct.name}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Paket Langganan</span>
                  <span className="font-semibold text-slate-800">
                    {regPlanType === 'outright' ? 'Beli Putus (Outright)' : regPlanType === 'rental-7yr' ? 'Rental Hemat 7 Tahun' : 'Rental Standar 5 Tahun'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Biaya Bulanan</span>
                  <span className="font-bold text-sky-800 font-display tabular-nums text-sm">
                    {regPlanType === 'outright' ? formatRupiah(currentPrice) : `${formatRupiah(currentPrice)}/bln`}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Biaya Registrasi Standar</span>
                  <span className="line-through text-slate-400">Rp 500.000</span>
                </div>
                <div className="flex justify-between py-1 text-emerald-700 font-semibold">
                  <span>Diskon Promo Seller</span>
                  <span>-Rp 500.000 (GRATIS)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Pengiriman & Pemasangan</span>
                  <span className="font-semibold text-emerald-600">GRATIS Seluruh Indonesia</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Jadwal Servis Cody</span>
                  <span className="font-semibold text-slate-800">Rutin Setiap 4 Bulan</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 bg-[#f7fbfe] -mx-6 -mb-6 p-6 rounded-b-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-slate-700">Total Dibayar Hari Ini</span>
                  <span className="text-xl font-extrabold text-sky-900 font-display tabular-nums">
                    Rp 0
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                  Tagihan sewa bulan pertama baru ditagihkan setelah unit berhasil dipasang di rumah Anda dan disetujui dalam berita acara pemasangan.
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src="/src/assets/images/coway_cody_specialist_1791998277853.jpg"
                    alt="Seller Cody"
                    className="w-9 h-9 rounded-full object-cover border border-sky-300"
                  />
                  <div className="text-xs">
                    <div className="font-bold text-slate-800">Moniko Martiano</div>
                    <div className="text-[11px] text-slate-500">Senior Coway Health Planner | Agent Code: DST260800074</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: REACH OUT TO SELLER (Direct Customer Contact Form in Indonesian) */}
      <section ref={contactSectionRef} className="py-16 bg-white border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Seller Bio & Quick Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-bold text-sky-600 tracking-wider uppercase">
                Konsultasi Langsung dengan Seller
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                Bingung Memilih Model? Hubungi Moniko Martiano
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sebagai Coway Health Planner berlisensi, saya siap memberikan saran terbaik sesuai jumlah keluarga, kondisi air baku di rumah Anda, dan budget bulanan yang diinginkan.
              </p>

              {/* Direct Quick Contact Boxes */}
              <div className="space-y-3 pt-2">
                <a
                  href="https://wa.me/6288290444120?text=Halo%20Moniko!%20Saya%20tertarik%20konsultasi%20produk%20dan%20promo%20rental%20Coway%20Indonesia."
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/60 hover:bg-sky-100/80 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">WhatsApp Chat Resmi (088290444120)</div>
                      <div className="text-[11px] text-slate-500">Respon cepat rata-rata 15 menit</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="tel:+6288290444120"
                  className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/60 hover:bg-sky-100/80 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Hotline Telepon Konsultasi</div>
                      <div className="text-[11px] text-slate-500">0882-9044-4120 / +62 882-9044-4120 (08:00 - 21:00 WIB)</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-600 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 text-white flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Wilayah Jangkauan Layanan</div>
                    <div className="text-[11px] text-slate-500">Seluruh Indonesia (Jabodetabek, Jawa, Sumatera, Bali, Kalimantan, Sulawesi)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Reach Out Form */}
            <div className="lg:col-span-7 bg-[#f7fbfe] rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs">
              {contactSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    Pesan Anda Berhasil Terkirim!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Terima kasih, Bapak/Ibu <strong className="text-slate-900">{contactName}</strong>. Health Planner Moniko Martiano akan segera menghubungi Anda melalui nomor WhatsApp <strong className="text-slate-900">{contactPhone}</strong>.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <a
                      href={`https://wa.me/6288290444120?text=Halo%20Moniko,%20saya%20sudah%20mengirimkan%20pesan%20via%20Coway%20Health%20App%20(Nama:%20${encodeURIComponent(contactName)})`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat WhatsApp Sekarang</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setContactSubmitted(false)}
                      className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Kirim Pesan Lainnya
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold font-display text-slate-900">
                    Kirim Pesan atau Minta Demo Produk Gratis ke Rumah
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-contact-name`} className="block text-xs font-semibold text-slate-700 mb-1">
                        Nama Lengkap Anda *
                      </label>
                      <input
                        id={`${formId}-contact-name`}
                        type="text"
                        required
                        placeholder="contoh: Ibu Rina / Pak Hendra"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor={`${formId}-contact-phone`} className="block text-xs font-semibold text-slate-700 mb-1">
                        Nomor WhatsApp / HP *
                      </label>
                      <input
                        id={`${formId}-contact-phone`}
                        type="tel"
                        required
                        placeholder="contoh: 0812-9876-5432"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`${formId}-contact-email`} className="block text-xs font-semibold text-slate-700 mb-1">
                        Alamat Email (Opsional)
                      </label>
                      <input
                        id={`${formId}-contact-email`}
                        type="email"
                        placeholder="contoh: rina@gmail.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor={`${formId}-contact-city`} className="block text-xs font-semibold text-slate-700 mb-1">
                        Kota / Wilayah Domisili
                      </label>
                      <select
                        id={`${formId}-contact-city`}
                        value={contactCity}
                        onChange={(e) => setContactCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
                      >
                        <option value="Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)">Jabodetabek (Jakarta, Bogor, Depok, Tangerang, Bekasi)</option>
                        <option value="Bandung & Jawa Barat">Bandung & Jawa Barat</option>
                        <option value="Surabaya & Jawa Timur">Surabaya & Jawa Timur</option>
                        <option value="Semarang, Solo & Yogyakarta">Semarang, Solo & Yogyakarta</option>
                        <option value="Medan & Sumatera Utara">Medan & Sumatera Utara</option>
                        <option value="Bali, Denpasar & Badung">Bali, Denpasar & Badung</option>
                        <option value="Kota Lain di Indonesia">Kota Lain di Indonesia</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-contact-inquiry`} className="block text-xs font-semibold text-slate-700 mb-1">
                      Fokus Konsultasi yang Diinginkan
                    </label>
                    <select
                      id={`${formId}-contact-inquiry`}
                      value={contactInquiryType}
                      onChange={(e) => setContactInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
                    >
                      <option value="Konsultasi Gratis & Cek Kualitas Air di Rumah">Konsultasi Gratis & Cek Kualitas Air di Rumah</option>
                      <option value="Pendaftaran Promo Coway Neo Plus Rp 250rb/bln">Pendaftaran Promo Coway Neo Plus Rp 250rb/bln</option>
                      <option value="Coway Ombak 50 Suhu Khusus Susu Bayi">Coway Ombak 50 Suhu Khusus Susu Bayi</option>
                      <option value="Konsultasi Pemurni Udara untuk Alergi / Asma">Konsultasi Pemurni Udara untuk Alergi / Asma</option>
                      <option value="Paket Coway untuk Kantor & Perusahaan (B2B)">Paket Coway untuk Kantor & Perusahaan (B2B)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-contact-msg`} className="block text-xs font-semibold text-slate-700 mb-1">
                      Pesan Tambahan / Catatan Khusus
                    </label>
                    <textarea
                      id={`${formId}-contact-msg`}
                      rows={3}
                      placeholder="contoh: Kami keluarga dengan 4 orang dan 1 balita. Membutuhkan air hangat cepat untuk susu dan jadwal pasang di akhir pekan."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full py-3.5 px-6 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{contactSubmitting ? 'Mengirim Pesan...' : 'Kirim Pertanyaan ke Seller'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold font-display text-base">
                <div className="w-7 h-7 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                  <Droplets className="w-4 h-4" />
                </div>
                <span>Coway Health Indonesia</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Portal Resmi Independent Health Planner & Cody. Mitra resmi PT Coway International Indonesia untuk pemasaran, pemrosesan langganan rental, dan manajemen servis Cody di seluruh wilayah Indonesia.
              </p>
            </div>

            <div>
              <div className="font-bold text-white mb-3">Model Produk Pilihan</div>
              <ul className="space-y-2">
                <li><button onClick={() => handleSelectProduct('neo-plus')} className="hover:text-white transition-colors cursor-pointer">Coway Neo Plus</button></li>
                <li><button onClick={() => handleSelectProduct('ombak')} className="hover:text-white transition-colors cursor-pointer">Coway Ombak</button></li>
                <li><button onClick={() => handleSelectProduct('villaem-2')} className="hover:text-white transition-colors cursor-pointer">Coway Villaem II</button></li>
                <li><button onClick={() => handleSelectProduct('storm-air')} className="hover:text-white transition-colors cursor-pointer">Coway Storm Air Purifier</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white mb-3">Jaminan Pelanggan</div>
              <ul className="space-y-2">
                <li>Bebas Biaya Registrasi (Diskon Rp 500.000)</li>
                <li>Gratis Servis Berkala Cody Setiap 4 Bulan</li>
                <li>Gratis Pengiriman & Pemasangan Teknisi Resmi</li>
                <li>Sertifikasi Halal BPJPH/MUI & Kemenkes RI</li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white mb-3">Kontak Health Planner Resmi</div>
              <p className="leading-relaxed text-slate-300 font-medium">
                Moniko Martiano<br />
                Certified Health Planner & Cody Specialist<br />
                Agent Code: DST260800074<br />
                Hotline / WA: 0882-9044-4120
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © 2026 Coway Health Indonesia. Didesain untuk deployment Google Cloud Run.
            </div>
            <div className="flex items-center gap-4">
              <span>Kebijakan Privasi</span>
              <span>·</span>
              <span>Syarat & Ketentuan Rental</span>
              <span>·</span>
              <span>Sertifikasi Halal</span>
            </div>
          </div>
        </div>
      </footer>

      {/* REGISTRATION ORDER MODAL (Indonesian Context in IDR) */}
      {registrationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-sky-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-display text-slate-900 text-base sm:text-lg">
                    Surat Registrasi Order Resmi Coway
                  </h3>
                  <div className="text-xs text-sky-700 font-mono font-medium">
                    No. Referensi: {generatedRegId}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRegistrationModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Application Summary Box in Rupiah */}
            <div className="mt-5 space-y-4 text-xs">
              <div className="p-3.5 bg-sky-50/70 rounded-xl border border-sky-200">
                <div className="text-[11px] font-semibold text-sky-800 uppercase">Spesifikasi Pesanan Unit</div>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{selectedProduct.name}</div>
                <div className="text-slate-600 mt-0.5">
                  Paket: {regPlanType === 'outright' ? 'Beli Putus (Outright)' : regPlanType === 'rental-7yr' ? 'Mega Rental 7 Tahun' : 'Rental Standar 5 Tahun'}
                </div>
                <div className="text-sky-900 font-extrabold text-base mt-2 font-display tabular-nums">
                  {regPlanType === 'outright' ? formatRupiah(currentPrice) : `${formatRupiah(currentPrice)}/bulan`}
                </div>
              </div>

              <div className="space-y-2 border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nama Pemohon:</span>
                  <span className="font-bold text-slate-800">{regFullName || 'Pemohon'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nomor WhatsApp:</span>
                  <span className="font-bold text-slate-800">{regPhone || 'N/A'}</span>
                </div>
                {regIdLast4 && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Verifikasi NIK KTP:</span>
                    <span className="font-mono text-slate-800">XXXX-XXXX-XXXX-{regIdLast4}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Alamat Pemasangan:</span>
                  <span className="text-right font-medium text-slate-800 max-w-[220px] truncate">
                    {regInstallationAddress || 'Konfirmasi via telepon teknisi'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Metode Bayar:</span>
                  <span className="font-medium text-slate-800">{regPaymentMethod}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-slate-200">
                  <span>Promo Bebas Biaya Registrasi:</span>
                  <span>-Rp 500.000 (HEMAT 100%)</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-[11px] flex items-start gap-2 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Surat pesanan Anda siap dikirimkan ke Health Planner Moniko Martiano untuk pemrosesan jadwal pasang teknisi resmi Coway Indonesia.
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 space-y-2">
              <a
                href={`https://wa.me/6288290444120?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Kirim Surat Order ke WhatsApp Seller</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Cetak / Simpan PDF Lembar Order</span>
              </button>

              <button
                type="button"
                onClick={() => setRegistrationModalOpen(false)}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-700 font-medium cursor-pointer"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
