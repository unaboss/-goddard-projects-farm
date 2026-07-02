-- Goddard Projects Database Schema (MySQL)

CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('vegetable', 'livestock')),
  description TEXT,
  availability_status VARCHAR(50) DEFAULT 'fresh' CHECK (availability_status IN ('fresh', 'limited', 'out')),
  season_tags JSON,
  image VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inquiries (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NULL,
  product_id CHAR(36) NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'seen', 'responded', 'closed')),
  response TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS testimonials (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NULL,
  name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  approved BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS carousel_images (
  id CHAR(36) PRIMARY KEY,
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(255),
  order_index INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_activity_log (
  id CHAR(36) PRIMARY KEY,
  admin_id CHAR(36) NULL,
  action TEXT NOT NULL,
  details JSON,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  token VARCHAR(512) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_availability ON products(availability_status);
CREATE INDEX idx_inquiries_user ON inquiries(user_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_testimonials_approved ON testimonials(approved);

-- Seed data
INSERT IGNORE INTO products (id, name, category, description, availability_status, season_tags, image) VALUES
  (UUID(), 'Roma Tomatoes', 'vegetable', 'Classic Roma tomatoes grown in our shade-net greenhouse. Firm, flavourful, perfect for cooking or fresh.', 'fresh', JSON_ARRAY('Year-round'), '/images/tomatoes-vine.jpeg'),
  (UUID(), 'Cherry Tomatoes', 'vegetable', 'Sweet cherry tomatoes picked at peak ripeness. Always in demand.', 'fresh', JSON_ARRAY('Summer', 'Autumn'), '/images/hero-2.jpeg'),
  (UUID(), 'Baby Spinach', 'vegetable', 'Tender young spinach leaves harvested fresh weekly. High in iron.', 'fresh', JSON_ARRAY('Year-round'), '/images/vegetables-field.jpeg'),
  (UUID(), 'Kale', 'vegetable', 'Robust, nutritious kale grown in open fields. Great for juicing and salads.', 'fresh', JSON_ARRAY('Winter', 'Spring'), '/images/vegetables-field.jpeg'),
  (UUID(), 'Cabbage', 'vegetable', 'Large, firm cabbage heads — versatile for all types of cooking.', 'limited', JSON_ARRAY('Winter'), '/images/vegetables-worker.jpeg'),
  (UUID(), 'Beef Cattle', 'livestock', 'Hardy, free-range beef cattle raised on natural pasture. Available for bulk inquiry.', 'fresh', JSON_ARRAY('Year-round'), '/images/livestock-cattle.jpeg');
