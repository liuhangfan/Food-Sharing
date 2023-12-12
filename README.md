# Food-Sharing
"Food Sharing" is a web application designed to reduce food waste and foster community sharing. It connects individuals with surplus food to those in need, enabling users to post, discover, and request surplus food items.

# Technology Stack:
1. React.js: frontend language
2. Node.js: server-side language
3. Redux: state management library
4. Google-maps-api: provide geolocation feature
5. Material UI: UI components
6. Firebase:
     - Cloud storage: build  object storage in the cloud
     - Firestore: build NoSQL cloud database
      - Functions: execute backend serverless functions
      - Authentication: integrate with multiple auth provider
      - Hosting: Deploys and hosts the website

# Application Structure
1. src Directory:
     - components: Reusable React components including Navbar, Footer, FoodItem, and custom forms.
     - pages: Different application views like SignInPageFB, MyFoodPage, HomePage, and AllFoodsPage.
     - redux: Manages application state with actions, reducers, and a store.
2. functions Directory:
     - index.js: Main file for Firebase cloud functions.
     - package.json: Defines Firebase Function dependencies.
3. Firebase Integration:
     - auth.js: Handles user authentication processes.
     - firestore.js: Manages database operations.
     - storage.js: Facilitates file storage and retrieval.

# Features
1. User Authentication: Secure login and registration.
2. Food Item Management: Users can post, view, and request food items.
3. Real-Time Database: Instantly syncs data across users.
4. Geolocation: Google Maps integration for location-based services.
5. Responsive Design: Tailored for various devices using Tailwind CSS and Material UI.

# Future Enhancements
1. Enhanced user profile features.
2. Improved notification system.
3. Advanced filtering and search capabilities.
