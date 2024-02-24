import bcrypt from 'bcryptjs';
const data = {

    users:[
        {
            name: 'Ramadhani Al-Qadri',
            email: 'ramadhanialqadri12@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        }, 
        {
            name: 'Dzulhi Raihan',
            email: 'dzulhiraihan@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        }
    ],


    products:[
        {
            name: 'Mie Goreng',
            slug: 'mie-goreng',
            category: 'Food',
            image: '/images/food1.jpg',
            price: 12000,
            brand: 'Fakultas Teknik',
            rating: 4.5,
            numReviews: 10,
            countInStock: 6,
            description: 'Mie Enak',
            isFeatured: true,
            banner: '/images/banner1.jpg',
        },
        {
            name: 'Nasi Goreng',
            slug: 'nasi-goreng',
            category: 'Food',
            image: '/images/food2.jpg',
            price: 15000,
            brand: 'Fakultas Teknik',
            rating: 3.2,
            numReviews: 10,
            countInStock: 20,
            description: 'Enak',
            isFeatured: true,
            banner: '/images/banner2.jpg',
        },
        {
            name: 'Salad',
            slug: 'salad',
            category: 'Food',
            image: '/images/food3.jpg',
            price: 8000,
            brand: 'Fakultas Teknik',
            rating: 4.5,
            numReviews: 3,
            countInStock: 20,
            description: 'Healthy Food',
        },
        {
            name: 'Coffea',
            slug: 'coffea',
            category: 'Drink',
            image: '/images/drink1.jpg',
            price: 3000,
            brand: 'Fakultas Teknik',
            rating: 3.5,
            numReviews: 7,
            countInStock: 20,
            description: 'drink coffea',
        },
        {
            name: 'Tea',
            slug: 'tea',
            category: 'Drinks',
            image: '/images/drink2.jpg',
            price: 4000,
            brand: 'Fakultas Teknik',
            rating: 2.4,
            numReviews: 14,
            countInStock: 20,
            description: 'Minum',
        },
    ],
}

export default data;