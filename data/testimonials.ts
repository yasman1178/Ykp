export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number; // 1-5 stars
  review: string;
  imageUrl?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ahmed Zaki',
    location: 'Cairo, Egypt',
    rating: 5,
    review: "These travel pillows are a game-changer! The Pharaonic designs are stunning and the memory foam is incredibly comfortable. I never travel without mine now.",
    imageUrl: '/public/avatar.png', // Example image path
  },
  {
    id: 't2',
    name: 'Sarah Chen',
    location: 'New York, USA',
    rating: 5,
    review: "Absolutely love my Anubis pillow! It's not just comfortable, but also a beautiful piece of Egyptian art. The quality is exceptional and worth every penny.",
    imageUrl: '/public/avatar.png',
  },
  {
    id: 't3',
    name: 'Omar Abdullah',
    location: 'Dubai, UAE',
    rating: 4,
    review: "YKP Supplies delivers on its promise of Egyptian heritage and comfort. The pillows are well-made and the designs are unique. Highly recommend for long flights.",
    imageUrl: '/public/avatar.png',
  },
  {
    id: 't4',
    name: 'Maria Rodriguez',
    location: 'Madrid, Spain',
    rating: 5,
    review: "I bought a Royal Scarab pillow as a gift and my friend absolutely adores it! It's both practical and a wonderful conversation starter. Fast shipping too!",
    imageUrl: '/public/avatar.png',
  },
  {
    id: 't5',
    name: 'David Lee',
    location: 'London, UK',
    rating: 5,
    review: "The quality of these pillows is superior. The memory foam provides excellent support and the Egyptian motifs are a beautiful touch. A must-have for any traveler.",
    imageUrl: '/public/avatar.png',
  },
];
