sqlite3 SpendSense.db

-- 2. create tables
CREATE TABLE IF NOT EXISTS Transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  merchant TEXT NOT NULL,
  date TEXT NOT NULL,
  amount REAL NOT NULL,
  category TEXT NOT NULL,
  description TEXT
);

-- Category : [Food, transportation, Entertainment, shopping, others]


-- Transactions
-- Jan 2025
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'McDonalds', '2025-01-01', 36.5, 'Food', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'KFC', '2025-01-01', 50.0, 'Food', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Uber', '2025-01-01', 20.5, 'Transportation', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Netflix', '2025-01-02', 10.5, 'Entertainment', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Amazon', '2025-01-02', 50.5, 'Shopping', 'snacks' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Walmart', '2025-01-05', 30.5, 'Others', 'snacks' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Uber', '2025-01-05', 20.5, 'Transportation', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'McDonalds', '2025-01-07', 36.5, 'Food', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'KFC', '2025-01-07', 50.0, 'Food', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Amazon', '2025-01-07', 50.5, 'Shopping', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Walmart', '2025-01-08', 30.5, 'Others', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'McDonalds', '2025-01-08', 36.5, 'Food', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'KFC', '2025-01-08', 50.0, 'Food', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Uber', '2025-01-09', 20.5, 'Transportation', '' );
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Starbucks', '2025-01-10', 5.0, 'Food', 'coffee');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Best Buy', '2025-01-11', 150.0, 'Shopping', 'electronics');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Lyft', '2025-01-12', 15.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Target', '2025-01-13', 45.0, 'Others', 'groceries');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Chipotle', '2025-01-14', 12.0, 'Food', 'dinner');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'AMC', '2025-01-15', 20.0, 'Entertainment', 'movie');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Barnes & Noble', '2025-01-16', 25.0, 'Shopping', 'books');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Subway', '2025-01-17', 8.5, 'Food', 'lunch');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Uber Eats', '2025-01-18', 30.0, 'Food', 'dinner');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'GameStop', '2025-01-19', 60.0, 'Entertainment', 'video game');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'IKEA', '2025-01-20', 200.0, 'Shopping', 'furniture');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Panda Express', '2025-01-21', 15.0, 'Food', 'lunch');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'CVS', '2025-01-22', 40.0, 'Others', 'medications');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Uber', '2025-01-23', 22.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Hulu', '2025-01-24', 11.0, 'Entertainment', 'subscription');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Kohl', '2025-01-25', 75.0, 'Shopping', 'clothes');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Chipotle', '2025-01-26', 12.0, 'Food', 'lunch');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Amazon', '2025-01-27', 100.0, 'Shopping', 'electronics');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Uber', '2025-01-28', 18.5, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Chick-fil-A', '2025-01-29', 12.0, 'Food', 'lunch');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'AMC', '2025-01-30', 25.0, 'Entertainment', 'movie night');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Target', '2025-01-31', 50.0, 'Others', 'household items');

-- Mar 2025
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Burger King', '2025-03-01', 30.0, 'Food', 'burger');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Lyft', '2025-03-01', 18.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Pizza Hut', '2025-03-02', 45.0, 'Food', 'pizza');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Spotify', '2025-03-02', 9.99, 'Entertainment', 'music subscription');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Best Buy', '2025-03-03', 120.0, 'Shopping', 'gadgets');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Trader Joe', '2025-03-03', 40.0, 'Others', 'groceries');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Uber Eats', '2025-03-04', 25.0, 'Food', 'dinner');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Domino', '2025-03-04', 28.0, 'Food', 'pizza');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Starbucks', '2025-03-05', 5.0, 'Food', 'coffee');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Netflix', '2025-03-05', 15.0, 'Entertainment', 'subscription');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'IKEA', '2025-03-06', 200.0, 'Shopping', 'furniture');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Whole Foods', '2025-03-06', 75.0, 'Others', 'groceries');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Lyft', '2025-03-07', 18.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Old Navy', '2025-03-07', 40.0, 'Shopping', 'clothes');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Red Robin', '2025-03-08', 30.0, 'Food', 'burgers');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Best Buy', '2025-03-08', 80.0, 'Shopping', 'headphones');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'KFC', '2025-03-09', 50.0, 'Food', 'dinner');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'GameStop', '2025-03-09', 60.0, 'Shopping', 'video game');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Domino', '2025-03-10', 35.0, 'Food', 'pizza');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Trader Joe', '2025-03-10', 40.0, 'Others', 'groceries');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Starbucks', '2025-03-11', 5.0, 'Food', 'coffee');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Spotify', '2025-03-11', 9.99, 'Entertainment', 'music subscription');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Uber', '2025-03-12', 22.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Whole Foods', '2025-03-12', 75.0, 'Others', 'groceries');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Burger King', '2025-03-13', 30.0, 'Food', 'burger');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Best Buy', '2025-03-13', 120.0, 'Shopping', 'gadgets');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Pizza Hut', '2025-03-14', 45.0, 'Food', 'pizza');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Netflix', '2025-03-14', 15.0, 'Entertainment', 'subscription');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Lyft', '2025-03-15', 18.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'IKEA', '2025-03-15', 200.0, 'Shopping', 'furniture');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Domino', '2025-03-16', 35.0, 'Food', 'pizza');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Trader Joe', '2025-03-16', 40.0, 'Others', 'groceries');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Starbucks', '2025-03-17', 5.0, 'Food', 'coffee');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Spotify', '2025-03-17', 9.99, 'Entertainment', 'music subscription');

-- Mar 2025
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Burger King', '2025-03-01', 30.0, 'Food', 'burger');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Lyft', '2025-03-01', 18.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Starbucks', '2025-03-01', 5.0, 'Food', 'coffee');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Pizza Hut', '2025-03-02', 45.0, 'Food', 'pizza');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Uber', '2025-03-02', 22.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Spotify', '2025-03-02', 9.99, 'Entertainment', 'music subscription');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Best Buy', '2025-03-03', 120.0, 'Shopping', 'gadgets');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Trader Joe', '2025-03-03', 40.0, 'Others', 'groceries');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Red Robin', '2025-03-03', 30.0, 'Food', 'burgers');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Uber Eats', '2025-03-04', 25.0, 'Food', 'dinner');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Domino', '2025-03-04', 28.0, 'Food', 'pizza');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Lyft', '2025-03-04', 18.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Starbucks', '2025-03-05', 5.0, 'Food', 'coffee');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Netflix', '2025-03-05', 15.0, 'Entertainment', 'subscription');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'IKEA', '2025-03-05', 200.0, 'Shopping', 'furniture');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Whole Foods', '2025-03-06', 75.0, 'Others', 'groceries');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Lyft', '2025-03-06', 18.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Domino', '2025-03-06', 35.0, 'Food', 'pizza');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Old Navy', '2025-03-07', 40.0, 'Shopping', 'clothes');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Trader Joe', '2025-03-07', 40.0, 'Others', 'groceries');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'KFC', '2025-03-07', 50.0, 'Food', 'dinner');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'GameStop', '2025-03-08', 60.0, 'Shopping', 'video game');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Red Robin', '2025-03-08', 30.0, 'Food', 'burgers');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Best Buy', '2025-03-08', 80.0, 'Shopping', 'headphones');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Domino', '2025-03-09', 35.0, 'Food', 'pizza');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Trader Joe', '2025-03-09', 40.0, 'Others', 'groceries');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Lyft', '2025-03-09', 18.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Starbucks', '2025-03-10', 5.0, 'Food', 'coffee');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Spotify', '2025-03-10', 9.99, 'Entertainment', 'music subscription');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Uber', '2025-03-10', 22.0, 'Transportation', 'ride');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Whole Foods', '2025-03-11', 75.0, 'Others', 'groceries');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Burger King', '2025-03-11', 30.0, 'Food', 'burger');
INSERT INTO Transactions (user_id, merchant, date, amount, category, description) VALUES (1, 'Best Buy', '2025-03-11', 120.0, 'Shopping', 'gadgets');

-- 5. confirm again
select * from Transactions limit 10;

-- 6. exit db
.quit