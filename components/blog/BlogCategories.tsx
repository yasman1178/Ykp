import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

interface BlogCategoriesProps {
  categories: { name: string; arabicName: string; slug: string }[];
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({ categories }) => {
  const router = useRouter();
  const currentCategory = router.query.category as string;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl p-6 my-8 shadow-lg"
    >
      <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">
        Explore Categories | استكشف الفئات
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog?category=${category.slug}`}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${currentCategory === category.slug
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-amber-100 hover:text-amber-700'
              }`}
          >
            {router.locale === 'ar' ? category.arabicName : category.name}
          </Link>
        ))}
        <Link
          href="/blog"
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
            ${!currentCategory
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-700'
            }`}
        >
          {router.locale === 'ar' ? 'جميع المقالات' : 'All Articles'}
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCategories;
