# AllMyPet

AllMyPet is a pet adoption and care platform that allows users to list their pets for temporary or permanent adoption. It also provides pet health-related information, vaccine tracking, veterinarian recommendations, and a unique climate-based pet matching feature.

## Features
- **Pet Adoption & Temporary Care**: List pets for temporary or permanent adoption.
- **Pet Health & Well-being**: Access pet care tips, track vaccinations, and find veterinarians.
- **Climate-Based Pet Matching**: Suggests pets best suited for the user's local weather.
- **Community & Support**: Engage with pet lovers and get 24/7 customer support.

## Tech Stack
### **Frontend**
- React.js
- Tailwind CSS
- Axios for API requests

### **Backend**
- Spring Boot
- Spring Data JPA
- PostgreSQL
- JWT Authentication

### **Other Tools**
- Docker (for containerization)
- Swagger (for API documentation)
- Redis (for caching)


### Prerequisites
- Node.js & npm
- Java 17+
- PostgreSQL
- Docker (optional)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Ali-Joumaa/AllMyPet.git
   cd allmypets/backend
   ```
2. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/allmypets
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
3. Build and run the backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```




