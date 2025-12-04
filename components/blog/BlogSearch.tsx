import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface BlogSearchProps {
  onSearch: (query: string) => void;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ onSearch }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState((router.query.search as string) || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-6 my-8 shadow-lg border border-gray-100"
    >
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder={router.locale === 'ar' ? 'البحث في المدونة...' : 'Search blog...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 text-gray-800"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          {router.locale === 'ar' ? 'بحث' : 'Search'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BlogSearch;
