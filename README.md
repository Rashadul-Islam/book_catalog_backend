### Live Link: https://book-catalog-backend-peach.vercel.app/

### Application Routes:

#### User

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/11f2324c-ae80-444c-b4c5-12983da45946 (Single GET)
- api/v1/users/11f2324c-ae80-444c-b4c5-12983da45946 (PATCH)
- api/v1/users/11f2324c-ae80-444c-b4c5-12983da45946 (DELETE)
- api/v1/profile (GET)

### Category

- api/v1/categories/create-category (POST)
- api/v1/categories (GET)
- api/v1/categories/c531b32c-6cd9-438a-8d43-52334242927a (Single GET)
- api/v1/categories/c531b32c-6cd9-438a-8d43-52334242927a (PATCH)
- api/v1/categories/c531b32c-6cd9-438a-8d43-52334242927a (DELETE)

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET)
- api/v1/books? (accept following params)
- page: The page number for pagination (e.g., ?page=1).
- size: The number of book listings per page (e.g. ?size=10).
- sortBy: The field to sort the cow listings (e.g. ?sortBy=price).
- sortOrder : The order of sorting, either 'asc' or 'desc' (e.g. ?sortOrder=asc).
- minPrice: The minimum price for filtering (e.g. ?minPrice=1000).
- maxPrice: The maximum price for filtering (e.g. ?maxPrice=5000).
- category: Filter using category id (e.g : ?category=f1234573-sfkjsf-45332)
- search: The search query string for searching books (e.g., ?search="Programmig"). (Search Fields: title,author,genre)

- api/v1/books/c2cb4052-b875-4752-80da-a69df4cfbf95/category (GET)
- api/v1/books/5ac218d5-eb1a-4ef5-ab4e-887351c41255 (GET)
- api/v1/books/5ac218d5-eb1a-4ef5-ab4e-887351c41255 (PATCH)
- api/v1/books/5ac218d5-eb1a-4ef5-ab4e-887351c41255 (DELETE)

### Orders

- api/v1/orders/create-order (POST)
- api/v1/orders (GET) 
- api/v1/orders/12f5089a-df8c-45b0-945c-6f817665f999 (GET)