import React, { useState } from 'react';
import { Mail, Phone, Globe, MapPin, Send, CheckCircle } from 'lucide-react';
import { SiteSettings } from '../types';

interface ContactProps {
  siteSettings: SiteSettings;
}

export default function Contact({ siteSettings }: ContactProps) {
  const { contact } = siteSettings;
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    topic: 'Pembelian Alat',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWAFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert('Mohon isi kolom Nama dan detail Pesan terlebih dahulu.');
      return;
    }

    const companyPart = formData.company ? ` dari instansi/perusahaan *${formData.company}*` : '';
    const formattedMsg = 
      `Halo Geometri Papua, saya *${formData.name}*${companyPart}. \n` +
      `Saya ingin mengirimkan pertanyaan mengenai layanan *${formData.topic}*.\n\n` +
      `*Detail Pertanyaan / Kebutuhan Alat:* \n` +
      `_"${formData.message}"_\n\n` +
      `Mohon direspon secepatnya di nomor kontak ini. Terima kasih.`;

    const encoded = encodeURIComponent(formattedMsg);
    window.open(`https://wa.me/${contact.whatsapp}?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="w-full relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 page-enter page-enter-active section-muted brand-pattern-subtle">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="border-b border-brand-gray-4 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-left">
          <div className="space-y-2">
            <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-black tracking-tight leading-none pt-4">
              {contact.pageTitle}
            </h1>
          </div>
          <p className="text-xs text-brand-gray-2 max-w-sm leading-relaxed">
            {contact.pageSubtitle}
          </p>
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16 text-left">
          
          {/* Left Block physical items */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display font-black text-xl text-brand-black uppercase tracking-wide">
              Kontak Utama Cabang Papua
            </h2>
            <p className="text-xs text-brand-gray-2 leading-relaxed">
              Anda dipersilakan berkunjung langsung guna melakukan uji coba unit (demo unit), menyerahkan registrasi instrumen untuk kalibrasi, maupun mencetak tagihan penawaran.
            </p>

            <div className="space-y-3.5 text-xs text-brand-gray-1">
              <a href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 card-elevated hover:bg-brand-red-pale/20 rounded-lg transition-colors cursor-pointer text-left">
                <div className="w-10 h-10 bg-brand-red text-white flex items-center justify-center rounded flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-brand-gray-2 block uppercase text-[10px] tracking-wide font-black">Alamat Cabang:</strong>
                  <span className="text-brand-black font-semibold">{contact.address}</span>
                </div>
              </a>

              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 p-4 card-elevated hover:bg-brand-red-pale/20 rounded-lg transition-colors cursor-pointer text-left">
                <div className="w-10 h-10 bg-brand-red text-white flex items-center justify-center rounded flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-brand-gray-2 block uppercase text-[10px] tracking-wide font-black">Layanan Hotline WA:</strong>
                  <span className="text-brand-black font-semibold">{contact.phone}</span>
                </div>
              </a>

              <a href={`mailto:${contact.email}`} className="flex items-center gap-4 p-4 card-elevated hover:bg-brand-red-pale/20 rounded-lg transition-colors cursor-pointer text-left">
                <div className="w-10 h-10 bg-brand-red text-white flex items-center justify-center rounded flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-brand-gray-2 block uppercase text-[10px] tracking-wide font-black">Surat Elektronik (Email):</strong>
                  <span className="text-brand-black font-semibold">{contact.email}</span>
                </div>
              </a>

              <a href={contact.website} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 card-elevated hover:bg-brand-red-pale/20 rounded-lg transition-colors cursor-pointer text-left">
                <div className="w-10 h-10 bg-brand-red text-white flex items-center justify-center rounded flex-shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-brand-gray-2 block uppercase text-[10px] tracking-wide font-black">Situs Web Utama:</strong>
                  <span className="text-brand-black font-semibold">{contact.website.replace(/^https?:\/\//, '')}</span>
                </div>
              </a>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-800 leading-relaxed flex gap-2.5 items-start">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>Tim kami berkantor secara fisik dari <strong>Senin sampai Sabtu (08:30 - 17:00 WIT)</strong>. Diluar jam kerja tersebut, sapaan chat WhatsApp Anda tetap ditangani oleh asisten siaga AI kustom kami.</span>
            </div>
          </div>

          {/* Right Block submission form */}
          <div className="lg:col-span-7 card-elevated rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute right-[-40px] top-[-40px] w-48 h-48 brand-pattern-dense rounded-full pointer-events-none opacity-20"></div>

            <div className="space-y-2 mb-6">
              <h3 className="font-display font-black text-lg text-brand-black uppercase">
                Kirim Formulir Inkuiri Lapangan
              </h3>
              <p className="text-[11px] text-brand-gray-2 leading-none font-semibold">Pre-filled template direct chat ke admin sales representatif Papua</p>
            </div>

            {submitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg mb-6 flex gap-2 items-center">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" />
                <span>Terima kasih! Formulir Anda telah disusun dan diarahkan langsung ke WhatsApp utama Geometri Papua.</span>
              </div>
            )}

            <form onSubmit={handleWAFormSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 font-bold text-brand-gray-2 uppercase text-[10px] tracking-wide">Nama Lengkap Pengirim*</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Contoh: Jaka Lesmana"
                    className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 rounded focus:border-brand-red focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 font-bold text-brand-gray-2 uppercase text-[10px] tracking-wide">Nama Perusahaan / Instansi (Opsional)</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Contoh: PT Adhi Karya Jayapura"
                    className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 rounded focus:border-brand-red focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-bold text-brand-gray-2 uppercase text-[10px] tracking-wide">Topik / Layanan Kebutuhan</label>
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3 rounded focus:border-brand-red focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-red"
                >
                  <option value="Pembelian Alat">Pembelian Alat Survey (Baru)</option>
                  <option value="Sewa / Rental">Sewa / Rental Alat Survey</option>
                  <option value="Servis & Kalibrasi Alat">Servis &amp; Kalibrasi Lab Papua</option>
                  <option value="Jasa Pemetaan">Jasa Mapping / Foto Udara Drone</option>
                  <option value="Konsultasi Umum">Konsultasi Umum #TemanSurveyor</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 font-bold text-brand-gray-2 uppercase text-[10px] tracking-wide">Isi Pertanyaan / Penawaran yang Diinginkan*</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ketikkan tipe alat survey, durasi rental, atau kendala alat yang ingin dikonsultasikan secara mendetail di sini..."
                  className="w-full bg-brand-gray-5 border border-brand-gray-4 p-3.5 rounded focus:border-brand-red focus:bg-white focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-red hover:bg-brand-red-hover text-white font-display font-black text-xs uppercase tracking-widest py-3.5 rounded-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                Hubungkan &amp; Kirim via WhatsApp
              </button>

            </form>

          </div>

        </div>

        {/* 3. NATIVE INTEGRATION GOOGLE MAPS EMBED IFRAME */}
        <section className="space-y-4 text-left">
          <h3 className="font-display font-black text-xl text-brand-black uppercase">
            Letak Koordinat Cabang Papua (Jayapura)
          </h3>
          <p className="text-xs text-brand-gray-2 leading-relaxed">
            Peta referensi letak jalan Kakatua Wai Mhorock Abepura. Sesuai navigasi GPS maupun Google Maps Mobile, Anda dapat mengetik kata kunci penunjuk arah pencarian <strong>"Geometri Papua"</strong>.
          </p>

          <div className="border border-brand-gray-3 rounded-2xl overflow-hidden shadow-md">
            <iframe
              src={contact.mapEmbedUrl}
              width="100%"
              height="390"
              style={{ border: 0, display: 'block' }}
              allowFullScreen={true}
              loading="lazy"
              title="Geometri Papua - Jl. Kakatua No.Blok 6 Wai Mhorock Abepura"
            ></iframe>
          </div>
        </section>

      </div>
    </div>
  );
}
