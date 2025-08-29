-- Drop tables if they exist
DROP TABLE IF EXISTS forum_likes;
DROP TABLE IF EXISTS forum_messages;
DROP TABLE IF EXISTS user_messages;
DROP TABLE IF EXISTS forums;
DROP TABLE IF EXISTS repair_solutions;
DROP TABLE IF EXISTS users;

-- Create the users table
CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  username text UNIQUE NOT NULL, -- username has to be unique
  password text NOT NULL,
  created_at date NOT NULL
);

-- Create the forums table
CREATE TABLE forums (
  id serial PRIMARY KEY,
  subject text NOT NULL,
  body text NOT NULL,
  created_at date NOT NULL,
  created_by integer REFERENCES users(id) ON DELETE SET NULL --References the user it was created by and if the user deletes their account the message stays but the sent by switches to null
);

-- Create the forum messages/comments/replies table
CREATE TABLE forum_messages (
  id serial PRIMARY KEY,
  forum_id integer NOT NULL REFERENCES forums(id) ON DELETE CASCADE, -- associates the forum message with the corresponding forum
  parent_id integer REFERENCES forum_messages(id) ON DELETE CASCADE, -- associates the forum reply with the forum message
  author_id integer REFERENCES users(id) ON DELETE SET NULL, -- associates the forum message with a user
  body text NOT NULL,
  created_at date NOT NULL
);

-- Create the forum likes table
CREATE TABLE forum_likes (
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- associates the forum like with a user
  forum_id integer NOT NULL REFERENCES forums(id) ON DELETE CASCADE, -- associates the forum like with a forum
  liked_at date NOT NULL,
  UNIQUE (user_id, forum_id) -- ensures uniqueness (cannot like twice)
);

-- Create the user messages table
CREATE TABLE user_messages (
  id serial PRIMARY KEY,
  sender_id integer REFERENCES users(id) ON DELETE SET NULL,
  recipient_id integer REFERENCES users(id) ON DELETE SET NULL,
  subject text,
  body text NOT NULL,
  sent_at date NOT NULL,
);

-- Create repair solutions table
CREATE TABLE repair_solutions (
  id serial PRIMARY KEY,
  category text NOT NULL,
  part text NOT NULL,
  repair_solution text NOT NULL,
  estimated_cost integer NOT NULL,
);