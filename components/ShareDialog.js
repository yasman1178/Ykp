import React from 'react';
import { Dialog } from '@headlessui/react';
import { IoLogoWhatsapp, IoMail } from 'react-icons/io5';
import Image from 'next/image';
import styles from '../components/ShareDialog.module.css'; // استيراد CSS Module

const ShareDialog = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  const handleWhatsAppShare = () => {
    const message = `Check out this product: ${image.path}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/201002406013?text=${encodedMessage}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = 'Product Inquiry';
    const body = `I am interested in this product: ${image.path}`;
    window.location.href = `mailto:ykp.supplies@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <Dialog.Overlay className={styles.dialogOverlay} />
        <div className={`${styles.dialogContent} relative transform overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all sm:w-full sm:max-w-md`}>
          <Dialog.Title
            as="h3"
            className="text-2xl font-semibold leading-8 text-gray-900 mb-4"
          >
            Share Product
          </Dialog.Title>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 overflow-hidden rounded-xl shadow-md">
              <Image src={image.path} width={250} height={200} alt={image.title} style={{ objectFit: 'cover' }} />
            </div>
            <p className="text-lg text-gray-600 mb-4">
              Share this product with your friends:
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center rounded-lg bg-green-500 px-6 py-3 text-white text-lg font-medium transition-colors hover:bg-green-600"
              >
                <IoLogoWhatsapp className="mr-2 h-6 w-6" />
                WhatsApp
              </button>
              <button
                onClick={handleEmailShare}
                className="flex items-center rounded-lg bg-blue-500 px-6 py-3 text-white text-lg font-medium transition-colors hover:bg-blue-600"
              >
                <IoMail className="mr-2 h-6 w-6" />
                Email
              </button>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ShareDialog;