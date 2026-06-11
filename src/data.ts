import { Product, Article, ServiceDetail, Branch, Project } from './types';

export const SERVICES: ServiceDetail[] = [
  {
    id: 'svc-1',
    num: '01',
    title: 'Penjualan Alat Survey',
    iconName: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    description: 'Kami menyediakan alat survey original berkualitas tinggi dari brand terkemuka dunia dengan garansi resmi dan paket aksesoris lengkap siap pakai.',
    bullets: [
      'Garansi resmi distributor selama 1 tahun',
      'Sudah termasuk sertifikat kalibrasi awal gratis',
      'Training gratis cara pengoperasian alat (Basic)',
      'Free souvenir eksklusif Geometri Indonesia',
      'Layanan purna jual prioritas di seluruh cabang'
    ]
  },
  {
    id: 'svc-2',
    num: '02',
    title: 'Sewa / Rental Alat Survey',
    iconName: 'RefreshCw',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
    description: 'Solusi hemat untuk mendukung kelancaran proyek Anda dengan armada sewa alat survey yang selalu dikalibrasi berkala dan siap pakai di lapangan.',
    bullets: [
      'Pilihan rental harian, mingguan, maupun bulanan',
      'Unit backup tersedia jika terjadi kendala operasional',
      'Harga paket sewa yang fleksibel untuk proyek jangka panjang',
      'Peralatan lengkap mencakup Tripod, Prisma, Pole, dan Charger',
      'Bisa menyewa beserta Tenaga Ahli (Surveyor)'
    ]
  },
  {
    id: 'svc-3',
    num: '03',
    title: 'Servis Resmi & Kalibrasi',
    iconName: 'Wrench',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800',
    description: 'Pastikan tingkat presisi alat survey Anda sesuai toleransi spesifikasi dengan melakukan perawatan berkala di laboratorium kalibrasi modern kami.',
    bullets: [
      'Dikalibrasi menggunakan Kolimator Multi-Target presisi tinggi',
      'Certicate of Calibration resmi berkualitas standar internasional',
      'Teknisi berpengalaman dan tersertifikasi resmi',
      'Pembersihan optik total dan penyelarasan sumbu mekanis',
      'Proses pengerjaan cepat dan bergaransi servis'
    ]
  },
  {
    id: 'svc-4',
    num: '04',
    title: 'Jasa Pemetaan & Survey GIS',
    iconName: 'Map',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800',
    description: 'Tim surveyor profesional kami siap membantu akuisisi data dan pengolahan informasi spasial secara akurat dengan teknologi pemetaan terkini.',
    bullets: [
      'Pengukuran Topografi (Situasi & Detail Bidang)',
      'Pemetaan Drone Foto Udara (orthofoto presisi tinggi)',
      'Laser Scanner LIDAR untuk kontur hutan & perkebunan',
      'Pengukuran Batimetri aliran sungai dan kedalaman danau',
      'Stake-out batas lahan dan monitoring deformasi struktur'
    ]
  }
];

export const BRANDS = [
  { 
    name: 'Topcon', 
    origin: 'Jepang', 
    logo: 'https://logo.clearbit.com/topconpositioning.com' 
  },
  { 
    name: 'Sokkia', 
    origin: 'Jepang', 
    logo: 'https://logo.clearbit.com/sokkia.com' 
  },
  { 
    name: 'Leica', 
    origin: 'Swiss', 
    logo: 'https://logo.clearbit.com/leica-geosystems.com' 
  },
  { 
    name: 'Trimble', 
    origin: 'Amerika Serikat', 
    logo: 'https://logo.clearbit.com/trimble.com' 
  },
  { 
    name: 'Nikon', 
    origin: 'Jepang', 
    logo: 'https://logo.clearbit.com/nikon.com' 
  },
  { 
    name: 'Spectra', 
    origin: 'Amerika Serikat', 
    logo: 'https://logo.clearbit.com/spectrageospatial.com' 
  },
  { 
    name: 'DJI Enterprise', 
    origin: 'Global', 
    logo: 'https://logo.clearbit.com/dji.com' 
  },
  { 
    name: 'Garmin', 
    origin: 'Global', 
    logo: 'https://logo.clearbit.com/garmin.com' 
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Topcon ES-105 Total Station',
    brand: 'Topcon',
    category: 'Total Station',
    emoji: '🔭',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
    description: 'Total station mutakhir dengan EDM yang sangat tangguh di kelasnya. Mampu mengukur tanpa prisma hingga jarak 500 meter dengan akurasi 5 detik. Sangat cocok untuk pengerjaan konstruksi presisi tinggi dan pemetaan topografi wilayah ekstrem.',
    specs: [
      'Akurasi Sudut: 5 Detik (5")',
      'Jangkauan Tanpa Prisma: Lampaui 500 meter',
      'Jangkauan Dengan Prisma Tunggal: Hingga 4.000 meter',
      'Penyimpanan Internal: 10.000 titik pengukuran',
      'Daya Tahan Baterai: Hingga 36 jam operasional penuh',
      'Perlindungan Debu & Air: Sertifikasi IP66'
    ],
    features: [
      'Teknologi TSshield untuk keamanan instrumen berbasis cloud',
      'Konektivitas nirkabel Bluetooth Class 1',
      'Sistem pembacaan sudut encoder absolut canggih',
      'Tombol pemicu EDM cepat di bagian samping instrumen'
    ],
    priceRange: 'Hubungi Sales (Harga Kompetitif)'
  },
  {
    id: 'prod-2',
    name: 'Sokkia CX-105 Reflectorless Total Station',
    brand: 'Sokkia',
    category: 'Total Station',
    emoji: '☄️',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800',
    description: 'Mewarisi kualitas optik legendaris Jepang, Sokkia CX-105 menawarkan sistem pengukuran sudut independent angle calibration system (IACS) yang menghasilkan stabilitas pengukuran tiada tanding.',
    specs: [
      'Akurasi Sudut: 5 Detik',
      'Jangkauan Reflectorless: 500 meter',
      'Sistem Kompensator: Dual-axis liquid tilt sensor',
      'Ketahanan Baterai: Hingga 36 jam',
      'Panduan Sinar: Koaksial Merah laser terintegrasi',
      'Port Data: USB Flash Drive slot'
    ],
    features: [
      'IP66 dustproof dan waterproof berperingkat tinggi',
      'Laser pointer merah super terang untuk pembidikan cepat',
      'Tombol pintasan cepat di panel depan dan samping'
    ],
    priceRange: 'Rp 65.000.000 - Rp 75.000.000 (Hubungi Sales)'
  },
  {
    id: 'prod-3',
    name: 'Trimble R10 Model 2 GNSS system',
    brand: 'Trimble',
    category: 'GPS / GNSS',
    emoji: '📡',
    image: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=800',
    description: 'Receiver GNSS tercanggih di industri survei. Dilengkapi dengan teknologi sensor kemiringan Trimble SurePoint dan mesin pemrosesan sinyal Trimble HD-GNSS yang revolusioner untuk performa andal di bawah tajuk pohon sekalipun.',
    specs: [
      'Jumlah Saluran Pelacakan: 440 Saluran',
      'Dukungan Konstelasi: GPS, GLONASS, Galileo, BeiDou, QZSS',
      'Akurasi RTK Horisontal: 8 mm + 1 ppm RMS',
      'Akurasi RTK Vertikal: 15 mm + 1 ppm RMS',
      'Teknologi Kemiringan: Compensation hingga 15 derajat',
      'Format Data: RTCM, CMR, Trimble proprietary'
    ],
    features: [
      'Dukungan koreksi satelit RTX global mandiri',
      'Sensor gelembung elektronik terintegrasi pada layar kontroler',
      'Housing tangguh tahan jatuh dari ketinggian 2 meter ke beton'
    ],
    priceRange: 'Hubungi Sales (Tersedia Rental)'
  },
  {
    id: 'prod-4',
    name: 'Sokkia B40A Automatic Level (Waterpass)',
    brand: 'Sokkia',
    category: 'Waterpass',
    emoji: '📐',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
    description: 'Automatic level / waterpass legendaris yang tangguh untuk penentuan beda tinggi pengerjaan sipil, jalan raya, saluran air, dan pondasi bangunan. Kompensator magnetik ultra-stabil memastikan hasil pembacaan benang statis tetap konsisten.',
    specs: [
      'Perbesaran Lensa Optik: 24x',
      'Akurasi Double Run (1km): 2.0 mm',
      'Jangkauan Kompensator: ±15 Menit Busur',
      'Jarak Fokus Minimum: 0.2 meter dari lensa objek',
      'Diameter Lensa Objektif: 32 mm',
      'Berat Bersih Unit: 1.5 kg'
    ],
    features: [
      'Sistem kompensator suspensi kawat dengan redaman magnetik',
      'Tahan guncangan getaran mesin berat di area proyek',
      'Sertifikasi IPX6 tahan siraman air kencang'
    ],
    priceRange: 'Rp 3.500.000 - Rp 4.500.000'
  },
  {
    id: 'prod-5',
    name: 'DJI Phantom 4 RTK Enterprise',
    brand: 'DJI',
    category: 'Drone',
    emoji: '🚁',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800',
    description: 'Solusi pemetaan udara photogrammetry modular tinggi yang diintegrasikan langsung dengan modul RTK presisi centimeter. Menyederhanakan alur kerja akuisisi data GCP tanpa mengurangi kualitas peta.',
    specs: [
      'Sensor Kamera: 1-inch CMOS; 20 Megapixel',
      'Akurasi Posisi RTK: 1 cm + 1 ppm (Horisontal)',
      'Sistem Navigasi: GPS L1 L2, GLONASS L1 L2, BeiDou B1 B2',
      'Waktu Penerbangan Maksimum: Sekitar 30 menit per baterai',
      'Kamera Shutter: Mekanis (mengeliminasi distorsi rolling shutter)',
      'Frekuensi Operasional: Dual-band 2.4 GHz dan 5.8 GHz'
    ],
    features: [
      'Aplikasi perencanaan misi penerbangan langsung di remote control',
      'Koreksi real-time via NTRIP/CORS atau D-RTK 2 Mobile Station',
      'OcuSync video transmission hingga jangkauan 7 km'
    ],
    priceRange: 'Hubungi Sales (Ready Stock Bandung)'
  },
  {
    id: 'prod-6',
    name: 'Leica TS16 Robotic Total Station',
    brand: 'Leica',
    category: 'Total Station',
    emoji: '🛸',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    description: 'Robotic total station premium dengan teknologi pemindaian otomatis dan pencarian prisma interaktif ATRplus. Mengubah survei dua personil menjadi operasi satu orang (one-man operation) secara lancar, melipatgandakan kecepatan kerja proyek.',
    specs: [
      'Pencarian Prisma ATRplus: Jangkauan hingga 1.500 meter',
      'Akurasi Pengukuran Jarak: 1 mm + 1.5 ppm ke Prisma',
      'Kecepatan Putaran Motor: 45 Derajat per detik',
      'Kamera Dokumentasi: Sudut lebar 5 MP terintegrasi',
      'OS Instrumen: Leica Captivate dengan antarmuka 3D penuh'
    ],
    features: [
      'Teknologi auto-learn yang beradaptasi dengan kondisi cuaca buruk',
      'Konektifitas nirkabel jarak jauh berkecepatan tinggi',
      'Sistem perlindungan pencurian PIN & alarm GPS'
    ],
    priceRange: 'Hubungi Sales (Unit Indent)'
  },
  {
    id: 'prod-7',
    name: 'Nikon DTM-322+ Total Station',
    brand: 'Nikon',
    category: 'Total Station',
    emoji: '📷',
    image: 'https://images.unsplash.com/photo-1516216628859-9bccecad13ca?w=800',
    description: 'Salah satu total station manual paling ekonomis, awet, dan produktif dalam sejarah alat survey. Menggunakan baterai AA yang mudah ditemukan di pelosok daerah, optik tajam legendaris khas Nikon, dan menu operasi yang sangat intuitif.',
    specs: [
      'Akurasi Sudut: 2 atau 5 Detik tersedia',
      'Lensa Pembesar: 33x legendaris Nikon',
      'EDM Jarak ke Prisma: Lebih dari 2.000 meter',
      'Jenis Daya: 4 unit baterai alkaline AA biasa',
      'Kapasitas Memori: Menyimpan 10.000 baris rekaman data'
    ],
    features: [
      'Mudah digunakan oleh pemula maupun profesional lama',
      'Sangat diandalkan di lingkungan bersuhu lembab tinggi',
      'Harga sangat terjangkau dengan nilai depresiasi rendah'
    ],
    priceRange: 'Rp 40.000.000 - Rp 48.000.000 (Stok Terbatas)'
  },
  {
    id: 'prod-8',
    name: 'Spectra Geospatial SP60 GNSS Receiver',
    brand: 'Spectra',
    category: 'GPS / GNSS',
    emoji: '🛰️',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    description: 'Receiver GNSS generasi baru dengan fleksibilitas konfigurasi pasca-beli terbaik. Mulai dari post-processing sederhana hingga RTK lengkap dengan UHF radio dan Bluetooth jarak jauh berpemilik (Long-Range Bluetooth).',
    specs: [
      'Mesin GNSS: 240 Saluran dengan teknologi Z-Blade khusus',
      'Konektivitas: Bluetooth Jarak Jauh Class 1 (hingga r=800 meter)',
      'Modul Korreksi: Kontroler android modular',
      'Antena GNSS: Integrasi anti-guncangan mekanis',
      'Baterai: Baterai lithium hotswappable ganda'
    ],
    features: [
      'Sangat ringan dan kompak, mengurangi kelelahan saat berjalan jauh',
      'Dukungan koreksi satelit CenterPoint RTX',
      'Desain modular untuk peningkatan kemampuan di masa mendatang'
    ],
    priceRange: 'Hubungi Sales (Konsultasi Demo Demo)'
  }
];

export const PORTFOLIO: Project[] = [
  {
    id: 'proj-1',
    title: 'Survey Topografi Lahan Perumahan Baru',
    category: 'Pengukuran Topografis',
    location: 'Ciparay, Kabupaten Bandung',
    client: 'PT Bandung Graha Property',
    year: '2025',
    emoji: '🏘️',
    description: 'Pengukuran topografi mendetail seluas 12 hektar demi merencanakan siteplan perumahan hijau, menghitung volume cut and fill tanah, serta menentukan letak drainase utama yang bebas banjir.'
  },
  {
    id: 'proj-2',
    title: 'Foto Udara Orthofoton Presisi Kawasan Industri',
    category: 'Pemetaan Drone UAV',
    location: 'Rancaekek, Kabupaten Bandung',
    client: 'Kementerian Perindustrian RI',
    year: '2025',
    emoji: '🏭',
    description: 'Pembuatan peta foto udara resolusi tinggi (GSD 3cm) seluas 150 hektar menggunakan drone DJI Phantom 4 RTK yang diikat dengan Ground Control Points (GCP) yang diukur GPS Geodetis.'
  },
  {
    id: 'proj-3',
    title: 'Batimetri Aliran Sungai & Penampang Danau',
    category: 'Hidrografi & Batimetri',
    location: 'Waduk Saguling, Bandung Barat',
    client: 'PT Indonesia Power',
    year: '2024',
    emoji: '🚢',
    description: 'Pengukuran profil kedalaman dasar air dan danau guna menghitung laju sedimentasi tahunan waduk PLTA. Menggunakan echosounder frekuensi ganda terintegrasi koordinat GPS RTK.'
  },
  {
    id: 'proj-4',
    title: 'Monitoring Deformasi Terowongan Jalur Kereta Cepat',
    category: 'Konstruksi & Sipil Presisi',
    location: 'Walini - Batununggal, Bandung',
    client: 'PT KCIC / CREC Indonesia',
    year: '2024',
    emoji: '🚇',
    description: 'Pemantauan berkala bulanan pergeseran milimeter dinding struktural beton terowongan kereta cepat menggunakan Robotic Total Station presisi tinggi 1-detik Leica TS16.'
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'b-1',
    name: 'Bandung',
    region: 'Jawa Barat',
    isHQ: true,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    address: 'Jl. Libra III No.14B, Kec. Batununggal, Kota Bandung, Jawa Barat 40275',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-2',
    name: 'Jakarta',
    region: 'DKI Jakarta',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    address: 'Kawasan Bisnis Kelapa Gading Raya, Jakarta Utara',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-3',
    name: 'Surabaya',
    region: 'Jawa Timur',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    address: 'Ruko Rungkut Makmur Blok C, Rungkut, Surabaya',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-4',
    name: 'Medan',
    region: 'Sumatera Utara',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800',
    address: 'Jl. Ring Road Komplek OCBC Blok B, Medan',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-5',
    name: 'Makassar',
    region: 'Sulawesi Selatan',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800',
    address: 'Komp. Ruko Alauddin Plaza, Rappocini, Makassar',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-6',
    name: 'Semarang',
    region: 'Jawa Tengah',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800',
    address: 'Jl. Jenderal Sudirman No. 120, Kota Semarang',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-7',
    name: 'Palembang',
    region: 'Sumatera Selatan',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    address: 'Jl. Basuki Rahmat No. 45, Ilir Timur, Palembang',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-8',
    name: 'Balikpapan',
    region: 'Kalimantan Timur',
    image: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800',
    address: 'Sepinggan Pratama Ruko Raya No. 12, Balikpapan',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-9',
    name: 'Pekanbaru',
    region: 'Riau',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    address: 'Jl. Soekarno-Hatta Mutiara Bisnis Center, Pekanbaru',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-10',
    name: 'Manado',
    region: 'Sulawesi Utara',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=800',
    address: 'Kawasan Mega Mas Blok B3, Wenang, Manado',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-11',
    name: 'Denpasar',
    region: 'Bali',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
    address: 'Jl. Teuku Umar Barat No. 88, Denpasar, Bali',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-12',
    name: 'Yogyakarta',
    region: 'DIY',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800',
    address: 'Ruko Ringroad Utara, Depok, Sleman, Yogyakarta',
    phone: '+62 822-6286-5676'
  },
  {
    id: 'b-13',
    name: 'Banjarmasin',
    region: 'Kalimantan Selatan',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    address: 'Jl. Ahmad Yani KM 6 Kompleks Ruko Mitra, Banjarmasin',
    phone: '+62 822-6286-5676'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Inovasi Drone Mapping Terbaru untuk Proyek Konstruksi Skala Besar',
    category: 'Teknologi',
    date: '28 Mei 2026',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800',
    excerpt: 'Teknologi UAV semakin merevolusi cara kontraktor mengambil keputusan topografi secara instan. Pelajari bagaimana drone RTK mengubah standar ketelitian pemetaan udara sipil di Indonesia.',
    content: `Teknologi Unmanned Aerial Vehicle (UAV) atau drone telah bergeser dari sekadar alat hobi menjadi instrumen industri yang sangat krusial dalam pemetaan lahan berskala masif.

Hal utama yang menjembatani kemudahan ini adalah integrasi modul RTK (Real-Time Kinematic) langsung pada bodi drone, seperti DJI Phantom 4 RTK atau Matrice series. Dengan bantuan GPS geodetik pembanding di darat, koordinat titik pusat foto (expose center) dapat direkam secara presisi berstandar centimeter secara langsung tanpa perlu memasang puluhan Ground Control Points (GCP) fisik yang melelahkan.

### Keuntungan Utama Penggunaan UAV RTK:
1. **Efisiensi Waktu Terpangkas 70%**: Pengukuran lahan seluas 100 hektar yang membutuhkan waktu 3-4 hari dengan total station konvensional dapat diselesaikan dalam waktu kurang dari 30 menit penerbangan tunggal.
2. **Kerapatan Data Tak Terbatas**: Mengukur elevasi dengan grid terestial menghasilkan ribuan titik. Sedangkan drone mapping menghasilkan Digital Elevation Model (DEM) berisi jutaan titik voxel yang menggambarkan relief mikro tanah secara kontinu.
3. **Penyimpanan Digital Aman**: Foto udara dapat diproses berulang kali untuk keperluan perhitungan volume drainase, ortofoto kontur lahan, hingga pemantauan kemajuan pekerjaan di masa yang akan datang.

Proyek konstruksi skala besar seperti pembangunan jalan tol nasional, bandar udara, dan kawasan industri modern di Jawa Barat kini mewajibkan survei udara RTK sebagai basis site-plan dasar mereka.`,
    emoji: '🗺️',
    author: 'Tim Geometri Engineering'
  },
  {
    id: 'art-2',
    title: 'Panduan Merawat Total Station agar Akurasi Tetap Terjaga Sepanjang Tahun',
    category: 'Tips',
    date: '20 Mei 2026',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800',
    excerpt: 'Total station adalah investasi aset berharga yang bernilai puluhan juta. Ikuti panduan praktis pemeliharaan harian ini untuk meminimalkan kerusakan optik.',
    content: `Sebuah total station dirancang sebagai instrumen elektro-optik yang sangat sensitif. Sentuhan kasar, kelembaban berlebih, dan partikel debu halus merupakan musuh utama akurasi mekanis maupun laser instrumen Anda. 

Menerapkan disiplin perawatan yang baik tidak hanya menjamin keakuratan data di lapangan tetapi juga mempertahankan nilai jual kembali (resale value) instrumen survey Anda tetap tinggi di kemudian hari.

### Langkah Praktis Pemeliharaan Mandiri:
- **Jangan Pernah Mengelap Lensa Tanpa Blower**: Debu kuarsa kecil bersifat sangat keras. Jika Anda langsung mengusap lensa kering dengan tisu kasar, ia akan meninggalkan baret mikro permanen yang merusak daya pisah teleskop. Selalu tiup debu kasar terlebih dahulu menggunakan airblower karet, lalu usap perlahan melingkar dengan kertas lensa khusus.
- **Biarkan Mengering Secara Alami Setelah Kehujanan**: Jika Anda terpaksa mengukur di tengah rintik hujan ringan (gerimis), keringkan bodi instrumen dengan kain serat mikro lembut sesampainya di basecamp. **Jangan** langsung memasukkan instrumen yang lembap ke dalam hardcase plastik kedap udara. Hal ini memicu pertumbuhan jamur optik maut hanya dalam 48 jam. Letakkan instrumen di suhu ruang ber-AC yang kering semalaman baru dikemas kembali ke dalam hardcase.
- **Keluarkan Baterai Selama Penyimpanan Lama**: Cairan asam baterai yang bocor karena tersimpan terlalu lama sangat merusak kontak sirkuit tembaga internal unit total station Anda. Selalu pisahkan baterai jika instrumen tidak akan dioperasikan di atas 2 minggu.
- **Lakukan Uji Kolimasi Sederhana**: Lakukan pengujian target berkala dua wajah (F1 dan F2) secara teratur untuk memeriksa apakah ada penyimpangan sumbu optik utama Anda sebelum membawanya ke luar kota.`,
    emoji: '⚙️',
    author: 'Kepala Lab Servis Bandung'
  },
  {
    id: 'art-3',
    title: 'Kalibrasi Alat Survey: Kapan Harus Dilakukan dan Apa Dampaknya bagi Proyek?',
    category: 'Edukasi',
    date: '10 Mei 2026',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    excerpt: 'Data survei yang meleset 0.5 derajat saja di bagian pangkal bisa berakibat fatal pada rubuhnya pondasi di ujung struktur. Ketahui kapan Anda wajib mengkalibrasikan alat survei.',
    content: `Dalam industri pekerjaan tanah sipil dan konstruksi gedung, istilah "presisi" merupakan harga mati yang mutlak dipertahankan. Segala keputusan rekayasa desain selalu didasari pada potret angka yang disajikan oleh juru ukur (surveyor). Namun, seiring berjalannya waktu, getaran hebat di bagasi kendaraan, perubahan suhu cuaca ekstrem, serta benturan ringan selama pemakaian lapangan akan "menggeser" komponen pembacaan milimeter di dalam sensor total station, theodolite, maupun waterpass.

Inilah mengapa **kalibrasi secara periodik** sangat wajib hukumnya bagi setiap instrumen survei industri.

### Tanda-Tanda Alat Survey Anda Wajib Dikalibrasi Segera:
1. **Pernah Terbentur atau Terjatuh**: Meskipun bodi luar terlihat kokoh tanpa retakan, kemiringan kompensator cair internal atau gelembung nivo kotak biasanya sudah tergeser jauh melebihi limit toleransi.
2. **Perbedaan Data F1 dan F2 Sangat Jauh**: Pengukuran sudut horizontal dengan teropong dibalik (posisi biasa dan posisi luar biasa) tidak lagi menunjukkan koreksi selisih tepat 180 derajat.
3. **Selisih Beda Tinggi Melompat di Atas Limit**: Pengukuran waterpass loop bolak-balik menghasilkan galat penutup (closing error) yang melebihi standar toleransi kelas pengukuran ordo 3.
4. **Sudah Digunakan Melebihi 6 Bulan**: Sejak tanggal penerbitan kalibrasi terakhir, pelat mekanis dan cincin gesekan kompensator perlahan melar atau mengalami gesekan wajar yang memerlukan penyelarasan ulang di instrumen kolimator laboratorium bersertifikat.

Dengan mengkalibrasi instrumen Anda secara rutin di Geometri Bandung, Anda akan menerima **Certificate of Calibration** resmi yang diakui oleh Konsultan Pengawas dan Instansi Pemerintah BUMN sebagai pembuktian standar kepatuhan hukum keakurasian data Anda.`,
    emoji: '📏',
    author: 'Technical Assessor Geometri'
  }
];
