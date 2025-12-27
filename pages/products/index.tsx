import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FloatingHieroglyphs, CrystalReveal, PolygonHover } from '../../components/animations/EgyptianAnimations';
import SEO from '@/components/SEO';
import { getStaticPropsWithTranslations } from '@/lib/translations';
import { GetStaticProps } from 'next';

interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  description: string;
}

interface Collection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  productCount: number;
  priceRange: string;
  features: string[];
  badge: string;
  color: string;
  bgGradient: string;
  products: Product[];
}

interface ProductsPageProps {
  translations: any;
  locale: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ translations: t, locale }) => {
  const [selectedCollection, setSelectedCollection] = useState('premium');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Complete product catalog for each collection - Updated with WebP images and comprehensive SEO keywords
  const collectionProducts = {
    print: [
      { id: 'print-001', image: '/prodect/Print/1.jpg', name: 'Custom Print Egyptian Travel Pillow | مخدة سفر فرعونية مطبوعة', price: '$30', description: 'Handmade Egyptian travel neck pillow with custom pharaoh motif print. Best souvenir travel pillow from Egypt with memory foam comfort. Perfect Egyptian gifts handmade for tourists and travelers. مخدة سفر فرعونية بتصميم فريد للرقبة مناسبة للطائرات والقطارات.' },
      { id: 'print-002', image: '/prodect/Print/2.jpg', name: 'Printed Pharaonic Neck Pillow | مخدة رقبة سفر فرعونية مطبوعة', price: '$32', description: 'Egyptian style neck pillow with unique pharaonic print design. Comfortable neck pillow for travel on planes and trains. Ancient Egypt inspired travel accessories with ergonomic support. هدايا سياحية مصرية أصلية بتصميم تراث فرعوني.' },
      { id: 'print-003', image: '/prodect/Print/master.jpg', name: 'Master Print Travel Pillow | مخدة سفر ماستر برينت', price: '$35', description: 'Premium Egyptian pharaoh design travel pillow for tourists. Best neck pillow for airplane with U-shape ergonomic design. Buy travel pillow online - handmade Egyptian souvenirs wholesale available. أفضل مخدة سفر في مصر للطيران والسيارات.' },
      { id: 'print-004', image: '/prodect/Print/p1.jpg', name: 'P1 Egyptian Print Pillow | وسادة طيران مريحة مطبوعة', price: '$28', description: 'Travel sleep support pillow with Egyptian motifs. Comfortable car/plane travel pillow made in Egypt. Unique travel gifts with pharaonic heritage design. وسادة دعم الرقبة سفر بتصميم مصري قديم مريحة للطائرات.' },
      { id: 'print-005', image: '/prodect/Print/p3.jpg', name: 'P3 Heritage Print Pillow | وسادة سفر المصريين القدماء', price: '$31', description: 'Ancient Egypt inspired neck pillow with heritage print. Egyptian souvenirs handmade with traditional pharaonic patterns. Travel pillow made in Egypt with premium fabric/leather material. منتجات فرعونية يدوية - هدايا تراث فرعوني أصلية.' },
    ],
    premium: [
      { id: 'b123-001', image: '/prodect/b123/1.webp', name: 'Royal Anubis Travel Pillow | مخدة سفر أنوبيس الملكية', price: '$15', description: 'Luxurious Egyptian travel neck pillow featuring Anubis guardian deity with gold accents. Best neck pillow for airplane with memory foam comfort. Handmade Egyptian souvenirs - perfect gifts from Egypt for travelers. مخدة سفر فرعونية مريحة للطائرات والقطارات بتصميم أنوبيس.' },
      { id: 'b123-002', image: '/prodect/b123/2.webp', name: 'Golden Pharaoh Travel Pillow | مخدة رقبة سفر فرعونية ذهبية', price: '$25', description: 'Premium Egyptian pharaonic travel pillow with authentic gold threading. U-shape ergonomic travel pillow for long flights. Buy travel pillow online - Egyptian gifts handmade with pharaoh motif. وسادة طيران مريحة بتصميم فرعوني ذهبي فاخر.' },
      { id: 'b123-003', image: '/prodect/b123/3.webp', name: 'Hieroglyph Travel Pillow | مخدة سفر هيروغليفية للرقبة', price: '$20', description: 'Elegant Egyptian hieroglyphic travel pillow with ancient symbols. Comfortable neck pillow for airplane, car and train travel. Ancient Egypt inspired travel accessories. مخدات طيران سفر بنقوش هيروغليفية - هدايا سياحية فرعونية.' },
      { id: 'b123-004', image: '/prodect/b123/4.webp', name: 'Scarab Beetle Travel Pillow | مخدة الجعران المقدس للسفر', price: '$22', description: 'Sacred Egyptian scarab beetle travel pillow with memory foam travel pillow technology. Ergonomic travel pillow for long-distance flights. Travel sleep support pillow made in Egypt. وسادة دعم الرقبة سفر بتصميم الجعران الفرعوني المقدس.' },
      { id: 'b123-005', image: '/prodect/b123/5.webp', name: 'Elite Egyptian Travel Pillow | مخدات سفر مريحة فاخرة', price: '$18', description: 'Elite Egyptian style neck pillow with superior comfort. Best souvenir travel pillow from Egypt for business travelers. Unique travel gifts with pharaonic design. أفضل مخدة سفر في مصر بتصميم فرعوني راقي.' },
      { id: 'b123-006', image: '/prodect/b123/6.webp', name: 'Eye of Horus Travel Pillow | وسادة رقبة للسفر عين حورس', price: '$24', description: 'Majestic Eye of Horus Egyptian travel neck pillow with premium materials. Comfortable neck pillow for travel with protective pharaoh motif. Egyptian souvenirs wholesale available. وسادة طيران مريحة برمز عين حورس الحامي.' },
      { id: 'b123-007', image: '/prodect/b123/7.webp', name: 'Royal Sphinx Travel Pillow | وسادة سفر أبو الهول الملكية', price: '$25', description: 'Sphinx-inspired Egyptian travel pillow with luxury finishing. Premium neck support for international flights and long trips.' },
      { id: 'b123-008', image: '/prodect/b123/8.webp', name: 'Golden Lotus Travel Pillow | وسادة سفر اللوتس الذهبية', price: '$16', description: 'Sacred Egyptian lotus flower travel pillow with gold accents. Comfortable neck pillow for peaceful travel and rest.' },
      { id: 'b123-009', image: '/prodect/b123/9.webp', name: 'Ankh Symbol Travel Pillow | وسادة سفر رمز الحياة', price: '$19', description: 'Egyptian Ankh symbol of life travel pillow with premium comfort. Ergonomic neck support for healthy travel posture.' },
      { id: 'b123-010', image: '/prodect/b123/10.webp', name: 'Pyramid Travel Pillow | وسادة سفر الأهرامات', price: '$23', description: 'Great Pyramid of Giza inspired travel pillow with luxury materials. Premium Egyptian neck pillow for world travelers.' },
      { id: 'b123-011', image: '/prodect/b123/11.webp', name: 'Royal Cartouche Travel Pillow | وسادة سفر الخرطوش الملكي', price: '$17', description: 'Personalized Egyptian cartouche travel pillow with royal design. Custom neck support pillow for unique travel experience.' },
      { id: 'b123-012', image: '/prodect/b123/12.webp', name: 'Golden Falcon Travel Pillow | وسادة سفر الصقر الذهبي', price: '$21', description: 'Horus falcon Egyptian travel pillow with premium gold threading. Majestic neck support for luxury travel.' },
      { id: 'b123-013', image: '/prodect/b123/13.webp', name: 'Papyrus Scroll Travel Pillow | وسادة سفر البردي', price: '$14', description: 'Ancient Egyptian papyrus scroll travel pillow with modern comfort. Affordable premium neck support for all travelers.' },
      { id: 'b123-014', image: '/prodect/b123/14.webp', name: 'Queen Nefertiti Travel Pillow | وسادة سفر الملكة نفرتيتي', price: '$24', description: 'Queen Nefertiti inspired Egyptian travel pillow with luxury materials. Elegant neck support for sophisticated travelers.' },
      { id: 'b123-015', image: '/prodect/b123/15.webp', name: 'Cleopatra Travel Pillow | وسادة سفر كليوباترا', price: '$25', description: 'Cleopatra-inspired Egyptian travel pillow with premium finishing. Royal comfort neck pillow for queens and kings of travel.' },
      { id: 'b123-016', image: '/prodect/b123/16.webp', name: 'Tutankhamun Travel Pillow | وسادة سفر توت عنخ آمون', price: '$26', description: 'King Tut Egyptian travel pillow with golden mask design. Premium pharaonic neck support for luxury travelers.' },
      { id: 'b123-017', image: '/prodect/b123/17.webp', name: 'Ramses Travel Pillow | وسادة سفر رمسيس', price: '$24', description: 'Ramses the Great Egyptian travel pillow with royal heritage. Premium neck pillow for powerful and comfortable journeys.' },
      { id: 'b123-018', image: '/prodect/b123/18.webp', name: 'Isis Goddess Travel Pillow | وسادة سفر الإلهة إيزيس', price: '$23', description: 'Goddess Isis Egyptian travel pillow with magical protection. Premium neck support with ancient Egyptian blessings.' },
      { id: 'b123-019', image: '/prodect/b123/19.webp', name: 'Osiris Travel Pillow | وسادة سفر أوزيريس', price: '$22', description: 'Osiris god of afterlife Egyptian travel pillow. Premium neck support for eternal comfort on your journeys.' },
      { id: 'b123-020', image: '/prodect/b123/20.webp', name: 'Ra Sun God Travel Pillow | وسادة سفر إله الشمس رع', price: '$25', description: 'Ra sun god Egyptian travel pillow with golden rays. Premium neck support bringing light to your travels.' },
      { id: 'b123-021', image: '/prodect/b123/21.webp', name: 'Bastet Cat Goddess Travel Pillow | وسادة سفر باستت', price: '$21', description: 'Bastet cat goddess Egyptian travel pillow with protective grace. Premium neck support for safe and comfortable journeys.' },
      { id: 'b123-022', image: '/prodect/b123/22.webp', name: 'Thoth Wisdom Travel Pillow | وسادة سفر تحوت', price: '$23', description: 'Thoth god of wisdom Egyptian travel pillow. Premium neck support for intelligent and comfortable travel.' },
      { id: 'b123-023', image: '/prodect/b123/23.webp', name: 'Hathor Love Travel Pillow | وسادة سفر حتحور', price: '$24', description: 'Hathor goddess of love Egyptian travel pillow. Premium neck support for joyful and loving journeys.' },
    ],
    classic: [
      { id: 't-001', image: '/prodect/t/1.webp', name: 'Classic Eye of Horus Travel Pillow | مخدة عين حورس الكلاسيكية', price: '$35', description: 'Traditional Egyptian Eye of Horus travel neck pillow with classic comfort. Best neck pillow for airplane and car travel. Durable Egyptian handmade souvenirs for frequent travelers. مخدة سفر للرقبة بتصميم عين حورس - وسادة طيران مريحة للاستخدام اليومي.' },
      { id: 't-002', image: '/prodect/t/2.webp', name: 'Traditional Ankh Travel Pillow | مخدة رمز الحياة الفرعوني', price: '$40', description: 'Timeless Egyptian Ankh symbol travel pillow with durable construction. Ergonomic travel pillow for long road trips. Ancient Egypt inspired travel accessories. وسادة دعم الرقبة سفر برمز الحياة الفرعوني - منتجات فرعونية يدوية.' },
      { id: 't-003', image: '/prodect/t/3.webp', name: 'Pyramid Travel Neck Pillow | وسادة الأهرامات للسفر', price: '$45', description: 'Classic Egyptian pyramid travel pillow with modern comfort technology. Ergonomic neck support for airplane and car travel.' },
      { id: 't-004', image: '/prodect/t/4.webp', name: 'Classic Lotus Flower Travel Pillow | وسادة اللوتس الكلاسيكية', price: '$35', description: 'Sacred Egyptian lotus flower travel pillow in traditional styling. Comfortable neck support for peaceful journeys.' },
      { id: 't-005', image: '/prodect/t/5.webp', name: 'Heritage Scarab Travel Pillow | وسادة الجعران التراثية', price: '$40', description: 'Traditional Egyptian scarab beetle travel pillow with classic appeal. Reliable neck support for business and leisure travel.' },
      { id: 't-006', image: '/prodect/t/6.webp', name: 'Classic Sphinx Travel Pillow | وسادة أبو الهول الكلاسيكية', price: '$45', description: 'Timeless Egyptian Sphinx travel pillow with comfortable support. Premium neck pillow for long-distance travelers.' },
      { id: 't-007', image: '/prodect/t/7.webp', name: 'Traditional Falcon Travel Pillow | وسادة الصقر التقليدية', price: '$35', description: 'Horus falcon Egyptian travel pillow in classic styling. Comfortable neck support for daily commuters and travelers.' },
      { id: 't-008', image: '/prodect/t/8.webp', name: 'Classic Hieroglyph Travel Pillow | وسادة الهيروغليفية الكلاسيكية', price: '$40', description: 'Traditional Egyptian hieroglyphic travel pillow with modern comfort. Unique neck support with ancient symbols.' },
      { id: 't-009', image: '/prodect/t/9.webp', name: 'Timeless Papyrus Travel Pillow | وسادة البردي الخالدة', price: '$35', description: 'Ancient Egyptian papyrus travel pillow in classic format. Affordable neck support for budget-conscious travelers.' },
      { id: 't-010', image: '/prodect/t/10.webp', name: 'Classic Cartouche Travel Pillow | وسادة الخرطوش الكلاسيكية', price: '$40', description: 'Traditional Egyptian cartouche travel pillow with reliable comfort. Personalized neck support for memorable journeys.' },
      { id: 't-011', image: '/prodect/t/11.webp', name: 'Heritage Cobra Travel Pillow | وسادة الكوبرا التراثية', price: '$45', description: 'Sacred Egyptian cobra travel pillow with traditional craftsmanship. Protective neck support for safe travels.' },
      { id: 't-012', image: '/prodect/t/12.webp', name: 'Classic Pharaoh Travel Pillow | وسادة الفرعون الكلاسيكية', price: '$40', description: 'Traditional Egyptian pharaoh travel pillow with lasting comfort. Royal neck support for extended journeys.' },
      { id: 't-013', image: '/prodect/t/13.webp', name: 'Egyptian Obelisk Travel Pillow | وسادة المسلة المصرية', price: '$38', description: 'Classic Egyptian obelisk travel pillow with monument design. Sturdy neck support for upright travel comfort.' },
      { id: 't-014', image: '/prodect/t/14.webp', name: 'Temple Column Travel Pillow | وسادة عمود المعبد', price: '$42', description: 'Egyptian temple column travel pillow with architectural beauty. Strong neck support inspired by ancient structures.' },
      { id: 't-015', image: '/prodect/t/15.webp', name: 'Nile River Travel Pillow | وسادة نهر النيل', price: '$36', description: 'Egyptian Nile River travel pillow with flowing design. Smooth neck support for relaxing travel experiences.' },
      { id: 't-016', image: '/prodect/t/16.webp', name: 'Desert Dunes Travel Pillow | وسادة الكثبان الصحراوية', price: '$37', description: 'Egyptian desert dunes travel pillow with sandy comfort. Soft neck support for peaceful desert journeys.' },
      { id: 't-017', image: '/prodect/t/17.webp', name: 'Palm Tree Travel Pillow | وسادة النخيل المصرية', price: '$35', description: 'Egyptian palm tree travel pillow with oasis comfort. Natural neck support for tropical travel vibes.' },
      { id: 't-018', image: '/prodect/t/18.webp', name: 'Camel Caravan Travel Pillow | وسادة قافلة الجمال', price: '$39', description: 'Egyptian camel caravan travel pillow with desert journey theme. Comfortable neck support for adventure travelers.' },
      { id: 't-019', image: '/prodect/t/19.webp', name: 'Bedouin Pattern Travel Pillow | وسادة النقوش البدوية', price: '$41', description: 'Egyptian Bedouin pattern travel pillow with tribal designs. Traditional neck support with nomadic comfort.' },
      { id: 't-020', image: '/prodect/t/20.webp', name: 'Pharaonic Crown Travel Pillow | وسادة التاج الفرعوني', price: '$43', description: 'Egyptian pharaonic crown travel pillow with royal headpiece design. Majestic neck support for regal travelers.' },
      { id: 't-021', image: '/prodect/t/21.webp', name: 'Scepter & Flail Travel Pillow | وسادة الصولجان والمذبة', price: '$40', description: 'Egyptian royal scepter and flail travel pillow. Authoritative neck support with pharaonic power symbols.' },
    ],
    heritage: [
      { id: 'tb-001', image: '/prodect/tb/1.webp', name: 'Heritage Sphinx Travel Pillow | مخدة أبو الهول التراثية', price: '$55', description: 'Ancient Egyptian Sphinx travel neck pillow with cultural authenticity. Best souvenir travel pillow from Egypt with museum-quality design. Unique travel gifts for history lovers. مخدة سفر فرعونية بتصميم أبو الهول - هدايا سياحية مصرية أصلية فاخرة.' },
      { id: 'tb-002', image: '/prodect/tb/2.webp', name: 'Ancient Symbols Travel Pillow | مخدة الرموز الفرعونية القديمة', price: '$60', description: 'Collection of ancient Egyptian symbols travel pillow with memory foam comfort. Egyptian style neck pillow with sacred hieroglyphs. Travel pillow made in Egypt. وسادة سفر المصريين القدماء بالرموز المقدسة - هدايا تراث فرعوني أصيل.' },
      { id: 'tb-003', image: '/prodect/tb/3.webp', name: 'Cultural Legacy Travel Pillow | وسادة الإرث الثقافي', price: '$50', description: 'Preserving Egyptian heritage travel pillow with comfortable design. Authentic cultural neck support for history enthusiasts.' },
      { id: 'tb-004', image: '/prodect/tb/4.webp', name: 'Traditional Heritage Travel Pillow | وسادة التراث التقليدي', price: '$55', description: 'Time-honored Egyptian patterns travel pillow with contemporary comfort. Heritage neck support for cultural travelers.' },
      { id: 'tb-005', image: '/prodect/tb/5.webp', name: 'Authentic Egyptian Travel Pillow | وسادة مصرية أصيلة', price: '$65', description: 'Genuine Egyptian motifs travel pillow with superior comfort technology. Authentic heritage neck support for discerning travelers.' },
      { id: 'tb-006', image: '/prodect/tb/6.webp', name: 'Sacred Ibis Travel Pillow | وسادة طائر أبو منجل المقدس', price: '$55', description: 'Sacred Egyptian ibis bird travel pillow with heritage authenticity. Divine neck support for spiritual journeys.' },
      { id: 'tb-007', image: '/prodect/tb/7.webp', name: 'Ancient Goddess Travel Pillow | وسادة الآلهة القديمة', price: '$60', description: 'Egyptian goddess designs travel pillow with cultural significance. Divine feminine neck support for empowered travelers.' },
      { id: 'tb-008', image: '/prodect/tb/8.webp', name: 'Heritage Obelisk Travel Pillow | وسادة المسلة التراثية', price: '$50', description: 'Egyptian obelisk-inspired travel pillow with traditional craftsmanship. Monument neck support for architectural enthusiasts.' },
      { id: 'tb-009', image: '/prodect/tb/9.webp', name: 'Cultural Pharaoh Travel Pillow | وسادة الفرعون الثقافية', price: '$65', description: 'Pharaonic heritage travel pillow with authentic design elements. Royal Egyptian neck support for luxury heritage travel.' },
      { id: 'tb-010', image: '/prodect/tb/10.webp', name: 'Ancient Temple Travel Pillow | وسادة المعبد القديم', price: '$55', description: 'Egyptian temple architecture travel pillow with heritage appeal. Sacred space neck support for spiritual travelers.' },
      { id: 'tb-011', image: '/prodect/tb/11.webp', name: 'Sacred Canopic Travel Pillow | وسادة الأواني الكانوبية', price: '$60', description: 'Egyptian canopic jar designs travel pillow with cultural authenticity. Ancient burial neck support for history buffs.' },
      { id: 'tb-012', image: '/prodect/tb/12.webp', name: 'Heritage Mummy Travel Pillow | وسادة المومياء التراثية', price: '$50', description: 'Ancient Egyptian mummification art travel pillow with modern comfort. Archaeological neck support for adventure travelers.' },
      { id: 'tb-013', image: '/prodect/tb/13.webp', name: 'Cultural Sarcophagus Travel Pillow | وسادة التابوت الثقافي', price: '$65', description: 'Egyptian sarcophagus designs travel pillow with heritage significance. Royal burial neck support for premium comfort.' },
      { id: 'tb-014', image: '/prodect/tb/14.webp', name: 'Ancient Pharaonic Travel Pillow | وسادة فرعونية قديمة', price: '$60', description: 'Comprehensive pharaonic symbols travel pillow with cultural depth. Complete Egyptian heritage neck support.' },
      { id: 'tb-015', image: '/prodect/tb/15.webp', name: 'Heritage Dynasty Travel Pillow | وسادة السلالة التراثية', price: '$55', description: 'Egyptian dynasty patterns travel pillow with authentic heritage. Royal lineage neck support for noble travelers.' },
      { id: 'tb-016', image: '/prodect/tb/16.webp', name: 'Sacred Ritual Travel Pillow | وسادة الطقوس المقدسة', price: '$60', description: 'Ancient Egyptian ritual designs travel pillow with cultural authenticity. Ceremonial neck support for spiritual journeys.' },
      { id: 'tb-017', image: '/prodect/tb/17.webp', name: 'Cultural Mythology Travel Pillow | وسادة الأساطير الثقافية', price: '$65', description: 'Egyptian mythology travel pillow with heritage storytelling. Legendary neck support for myth enthusiasts.' },
      { id: 'tb-018', image: '/prodect/tb/18.webp', name: 'Ancient Wisdom Travel Pillow | وسادة الحكمة القديمة', price: '$55', description: 'Symbols of ancient Egyptian wisdom travel pillow with modern comfort. Philosophical neck support for thoughtful travelers.' },
      { id: 'tb-019', image: '/prodect/tb/19.webp', name: 'Heritage Ankh Travel Pillow | وسادة رمز الحياة التراثي', price: '$50', description: 'Sacred Egyptian Ankh symbol travel pillow with eternal life meaning. Immortal neck support for life-long travelers.' },
      { id: 'tb-020', image: '/prodect/tb/20.webp', name: 'Ancient Scarab Travel Pillow | وسادة الجعران القديم', price: '$60', description: 'Sacred Egyptian scarab beetle travel pillow with rebirth symbolism. Transformative neck support for new journeys.' },
      { id: 'tb-021', image: '/prodect/tb/21.webp', name: 'Cultural Lotus Travel Pillow | وسادة اللوتس الثقافية', price: '$55', description: 'Sacred Egyptian lotus flower travel pillow with purity symbolism. Enlightened neck support for peaceful travel.' },
      { id: 'tb-022', image: '/prodect/tb/22.webp', name: 'Heritage Eye of Horus Travel Pillow | وسادة عين حورس التراثية', price: '$65', description: 'Protective Egyptian Eye of Horus travel pillow with ancient power. Guardian neck support for safe travels.' },
      { id: 'tb-023', image: '/prodect/tb/23.webp', name: 'Ancient Cartouche Travel Pillow | وسادة الخرطوش القديم', price: '$50', description: 'Royal Egyptian name seal travel pillow with pharaonic heritage. Personalized neck support with royal identity.' },
      { id: 'tb-024', image: '/prodect/tb/24.webp', name: 'Cultural Falcon Travel Pillow | وسادة الصقر الثقافي', price: '$60', description: 'Sacred Egyptian falcon travel pillow with divine protection. Horus neck support for protected journeys.' },
      { id: 'tb-025', image: '/prodect/tb/25.webp', name: 'Heritage Cobra Travel Pillow | وسادة الكوبرا التراثية', price: '$55', description: 'Royal Egyptian cobra travel pillow with protective power. Uraeus neck support for royal comfort.' },
      { id: 'tb-026', image: '/prodect/tb/26.webp', name: 'Ancient Papyrus Travel Pillow | وسادة البردي القديم', price: '$65', description: 'Sacred Egyptian papyrus travel pillow with ancient wisdom. Scholarly neck support for educated travelers.' },
      { id: 'tb-027', image: '/prodect/tb/27.webp', name: 'Cultural Pyramid Travel Pillow | وسادة الهرم الثقافي', price: '$50', description: 'Great Egyptian pyramid travel pillow with eternal strength. Wonder of the world neck support.' },
      { id: 'tb-028', image: '/prodect/tb/28.webp', name: 'Heritage Nefertiti Travel Pillow | وسادة نفرتيتي التراثية', price: '$60', description: 'Queen Nefertiti Egyptian travel pillow with royal elegance. Beautiful queen neck support for graceful travel.' },
      { id: 'tb-029', image: '/prodect/tb/29.webp', name: 'Ancient Cleopatra Travel Pillow | وسادة كليوباترا القديمة', price: '$55', description: 'Queen Cleopatra Egyptian travel pillow with legendary beauty. Last pharaoh neck support for iconic travelers.' },
      { id: 'tb-030', image: '/prodect/tb/30.webp', name: 'Cultural Anubis Travel Pillow | وسادة أنوبيس الثقافي', price: '$65', description: 'God Anubis Egyptian travel pillow with afterlife protection. Guardian of the dead neck support for eternal comfort.' },
      { id: 'tb-031', image: '/prodect/tb/31.webp', name: 'Heritage Thoth Travel Pillow | وسادة تحوت التراثي', price: '$50', description: 'God Thoth Egyptian travel pillow with wisdom and knowledge. Scribe of gods neck support for wise travelers.' },
      { id: 'tb-032', image: '/prodect/tb/32.webp', name: 'Ancient Isis Travel Pillow | وسادة إيزيس القديمة', price: '$60', description: 'Goddess Isis Egyptian travel pillow with magical protection. Mother goddess neck support for nurturing journeys.' },
      { id: 'tb-033', image: '/prodect/tb/33.webp', name: 'Cultural Ra Travel Pillow | وسادة رع الثقافي', price: '$55', description: 'Sun god Ra Egyptian travel pillow with divine light. Solar deity neck support for bright travels.' },
      { id: 'tb-034', image: '/prodect/tb/34.webp', name: 'Heritage Bastet Travel Pillow | وسادة باستت التراثية', price: '$65', description: 'Cat goddess Bastet Egyptian travel pillow with protective grace. Feline deity neck support for graceful journeys.' },
      { id: 'tb-035', image: '/prodect/tb/35.webp', name: 'Ancient Hathor Travel Pillow | وسادة حتحور القديمة', price: '$50', description: 'Goddess Hathor Egyptian travel pillow with love and beauty. Joy goddess neck support for happy travels.' },
      { id: 'tb-036', image: '/prodect/tb/36.webp', name: 'Cultural Osiris Travel Pillow | وسادة أوزيريس الثقافي', price: '$60', description: 'God Osiris Egyptian travel pillow with eternal life power. Resurrection god neck support for renewed journeys.' },
    ]
  };

  const collections = [
    {
      id: 'print',
      title: t.collections.print.title,
      subtitle: t.collections.print.description,
      description: t.collections.print.description,
      heroImage: '/prodect/Print/master.jpg',
      productCount: 5,
      priceRange: '$28 - $35',
      features: t.collections.print.features,
      badge: 'Custom',
      color: 'from-red-600 to-pink-600',
      bgGradient: 'from-red-900 via-pink-900 to-rose-900',
      products: collectionProducts.print
    },
    {
      id: 'premium',
      title: t.collections.premium.title,
      subtitle: t.collections.premium.description,
      description: t.collections.premium.description,
      heroImage: '/prodect/b123/1.webp',
      productCount: 23,
      priceRange: '$14 - $26',
      features: t.collections.premium.features,
      badge: 'Premium',
      color: 'from-purple-600 to-blue-600',
      bgGradient: 'from-purple-900 via-blue-900 to-indigo-900',
      products: collectionProducts.premium
    },
    {
      id: 'classic',
      title: t.collections.classic.title,
      subtitle: t.collections.classic.description,
      description: t.collections.classic.description,
      heroImage: '/prodect/t/1.webp',
      productCount: 21,
      priceRange: '$35 - $45',
      features: t.collections.classic.features,
      badge: 'Popular',
      color: 'from-amber-600 to-orange-600',
      bgGradient: 'from-amber-900 via-orange-900 to-red-900',
      products: collectionProducts.classic
    },
    {
      id: 'heritage',
      title: t.collections.heritage.title,
      subtitle: t.collections.heritage.description,
      description: t.collections.heritage.description,
      heroImage: '/prodect/tb/2.webp',
      productCount: 36,
      priceRange: '$50 - $65',
      features: t.collections.heritage.features,
      badge: 'Heritage',
      color: 'from-green-600 to-teal-600',
      bgGradient: 'from-green-900 via-teal-900 to-cyan-900',
      products: collectionProducts.heritage
    },
  ];

  const currentCollection = collections.find(c => c.id === selectedCollection) || collections[0];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        translations={t}
        locale={locale}
        ogType="product"
      />

      {/* Dynamic Hero Section */}
      <AnimatePresence mode="wait">
        <motion.section
          key={selectedCollection}
          className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br ${currentCollection.bgGradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Floating Egyptian Hieroglyphs */}
          <div className="absolute inset-0 pointer-events-none">
            {['𓂀', '𓁹', '𓋹', '𓊪', '𓈖', '𓊽', '𓇳', '𓊨'].map((hieroglyph, i) => (
              <FloatingHieroglyphs
                key={i}
                className="absolute text-white/10 text-4xl font-bold"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              >
                {hieroglyph}
              </FloatingHieroglyphs>
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.div
                  className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${currentCollection.color} text-white font-semibold mb-6`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentCollection.badge}
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-6"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {currentCollection.title}
                </motion.h1>

                <motion.p
                  className="text-2xl text-white/80 mb-4"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {currentCollection.subtitle}
                </motion.p>

                <motion.p
                  className="text-lg text-white/70 mb-8 leading-relaxed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {currentCollection.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {currentCollection.features.map((feature: string, index: number) => (
                    <span
                      key={index}
                      className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/20"
                    >
                      {feature}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <Link href={`/products/${currentCollection.id}`}>
                    <motion.button
                      className={`bg-gradient-to-r ${currentCollection.color} text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      Explore Collection
                    </motion.button>
                  </Link>
                  <motion.button
                    className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {currentCollection.priceRange}
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={currentCollection.heroImage}
                    alt={currentCollection.title}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${currentCollection.color} opacity-20`}></div>
                </motion.div>

                {/* Floating Stats */}
                <motion.div
                  className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className={`text-3xl font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent`}>
                    {currentCollection.productCount}
                  </div>
                  <div className="text-gray-600 font-medium">Products</div>
                </motion.div>

                <motion.div
                  className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div className={`text-2xl font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent`}>
                    50+
                  </div>
                  <div className="text-gray-600 font-medium">Countries</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Collection Switcher */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Choose Your Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Switch between our premium collections to explore different styles and price ranges
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {collections.map((collection: Collection) => (
                <motion.button
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection.id)}
                  className={`relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 overflow-hidden ${selectedCollection === collection.id
                    ? `bg-gradient-to-r ${collection.color} text-white shadow-2xl`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent hover:border-gray-300'
                    }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {selectedCollection === collection.id && (
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">
                    {collection.title}
                  </span>
                  {selectedCollection === collection.id && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCollection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <motion.h2
                  className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent mb-4`}
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {currentCollection.title} Products
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Explore our featured designs from the {currentCollection.title.toLowerCase()}
                </motion.p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentCollection.products.map((product: Product, index: number) => (
                  <motion.div
                    key={`${selectedCollection}-${product.id}`}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ y: -15, scale: 1.03, rotateY: 3 }}
                    onHoverStart={() => setHoveredProduct(`${selectedCollection}-${product.id}`)}
                    onHoverEnd={() => setHoveredProduct(null)}
                    className="group cursor-pointer"
                  >
                    <Link href={`/products/${selectedCollection}/${product.id}`}>
                      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 h-full transform-gpu">
                        {/* Product Image */}
                        <div className="relative overflow-hidden aspect-square">
                          <CrystalReveal className="h-full">
                            <PolygonHover className="h-full">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.4 }}
                                className="h-full"
                              >
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={400}
                                  height={400}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            </PolygonHover>
                          </CrystalReveal>

                          {/* Hover Overlay with Egyptian Symbols */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-t ${currentCollection.color} opacity-0 group-hover:opacity-85 transition-opacity duration-300 flex items-center justify-center`}
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 0.85 }}
                          >
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                              whileHover={{ scale: 1, opacity: 1, rotateY: 0 }}
                              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="text-white text-center"
                            >
                              <motion.div
                                className="text-5xl mb-3"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                𓁹
                              </motion.div>
                              <div className="font-semibold text-lg mb-2">Product Details</div>
                              <div className="text-sm opacity-90">View Specifications</div>

                              {/* Floating mini hieroglyphs */}
                              <div className="absolute inset-0 pointer-events-none">
                                {['𓂀', '𓊽', '𓇳'].map((symbol, i) => (
                                  <motion.span
                                    key={i}
                                    className="absolute text-white/30 text-lg"
                                    style={{
                                      left: `${20 + i * 30}%`,
                                      top: `${10 + i * 20}%`
                                    }}
                                    animate={{
                                      y: [-5, 5, -5],
                                      opacity: [0.3, 0.6, 0.3],
                                      rotate: [-10, 10, -10]
                                    }}
                                    transition={{
                                      duration: 3,
                                      repeat: Infinity,
                                      delay: i * 0.5
                                    }}
                                  >
                                    {symbol}
                                  </motion.span>
                                ))}
                              </div>
                            </motion.div>
                          </motion.div>

                          {/* Price Badge */}
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                            <span className={`text-sm font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent`}>
                              {product.price}
                            </span>
                          </div>

                          {/* Collection Badge */}
                          <div className="absolute top-4 left-4">
                            <span className={`bg-gradient-to-r ${currentCollection.color} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                              {currentCollection.badge}
                            </span>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                          <motion.h3
                            className="font-bold text-gray-900 text-lg mb-2"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                            whileHover={{ scale: 1.02 }}
                          >
                            {product.name}
                          </motion.h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {product.description}
                          </p>

                          {/* Egyptian decorative line */}
                          <motion.div
                            className={`h-0.5 bg-gradient-to-r ${currentCollection.color} mb-4 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />

                          <div className="flex items-center justify-between">
                            <motion.span
                              className={`text-xl font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {product.price}
                            </motion.span>
                            <motion.button
                              className={`bg-gradient-to-r ${currentCollection.color} text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300 relative overflow-hidden`}
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <motion.span
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.5 }}
                              />
                              <span className="relative z-10">View Details</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Collection Summary */}
              <motion.div
                className="text-center mt-16 p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${currentCollection.color} bg-clip-text text-transparent mb-4`} style={{ fontFamily: 'Playfair Display, serif' }}>
                  Complete {currentCollection.title}
                </h3>
                <p className="text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Showing all {currentCollection.productCount} products in this collection. Each pillow is crafted with premium materials and authentic Egyptian designs, preserving ancient heritage through modern comfort.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {currentCollection.features.map((feature: string, index: number) => (
                    <span
                      key={index}
                      className={`bg-gradient-to-r ${currentCollection.color} text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* B2B CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Interested in Wholesale?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Join YKP&apos;s global network of distributors and retailers. Special pricing available for bulk orders and international partnerships.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { icon: '📦', title: 'Bulk Orders', desc: 'Special pricing for large quantities' },
                { icon: '🌍', title: 'Global Shipping', desc: 'Worldwide distribution network' },
                { icon: '🤝', title: 'Partnership', desc: 'Long-term business relationships' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-white/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <motion.button
                  className="bg-white text-gray-900 px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-white/25 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Request Wholesale Catalog
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Partnership Information
                </motion.button>
              </Link>
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>+20 100 240 6013</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✉️</span>
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>ykp.supplies@gmail.com</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  return getStaticPropsWithTranslations(context);
};

export default ProductsPage;