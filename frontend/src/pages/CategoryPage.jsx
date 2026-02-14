import React from 'react'
import CategoryItem from '../components/CategoryItem';



const categories = [
  { href: "/stationary", name: "Stationary", imageUrl: "/stationary.png" },
  { href: "/study-material", name: "Study Material", imageUrl: "/study_material.png" },
  { href: "/event-tickets", name: "Event Tickets", imageUrl: "/event_tickets.png" },
  { href: "/lab-equipment", name: "Lab Equipment", imageUrl: "/lab_equipment.png" },
  { href: "/fitness-and-sports", name: "Fitness and Sports", imageUrl: "/fitness_and_sports.png" },
];

const CategoryPage = () => {
  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
        Your College Marketplace
        </h1>
        <p className='text-center text-xl text-gray-300 mb-12'>
        Powered by Students        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {categories.map(category => (
            <CategoryItem
              category={category}
              key={category.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage;