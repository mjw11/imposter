export enum GamePhase {
  SETUP = 'SETUP',
  REVEAL = 'REVEAL',
  ACTION = 'ACTION',
  EDITOR = 'EDITOR'
}

export interface Player {
  id: string;
  name: string;
  isImposter: boolean;
  hasViewed: boolean;
  isFirstPlayer: boolean;
}

export interface Category {
  id: string;
  name: string;
  words: string[];
  enabled: boolean; // Used for selection in setup
}

export interface GameState {
  players: Player[];
  currentCategory: Category | null;
  currentWord: string | null;
  phase: GamePhase;
}

// Hardcoded server-side categories
export const SERVER_CATEGORIES: Category[] = [
  {
    id: 'cat_1',
    name: 'Famous People',
    words: ['Tom Cruise', 'Hugh Jackman', 'Steve McQueen', 'Taylor Swift', 'Elon Musk', 'Albert Einstein'],
    enabled: true
  },
  {
    id: 'cat_2',
    name: 'Everyday Objects',
    words: ['Fork', 'Pillow', 'Bathtub', 'Spoon', 'Knife', 'Plate', 'Bowl', 'Cup', 'Mug', 'Chair', 'Table', 'Sofa', 'Lamp', 'Rug', 'Blanket', 'Sheet', 'Mattress', 'Clock', 'Mirror', 'Picture', 'Book', 'Pen', 'Pencil', 'Paper', 'Eraser', 'Phone', 'Remote', 'Key', 'Wallet', 'Purse', 'Door', 'Window', 'Curtain', 'Towel', 'Soap', 'Shampoo', 'Toothbrush', 'Toothpaste', 'Comb', 'Brush', 'Clothes', 'Shoes', 'Sock', 'Hat', 'Glove', 'Coat', 'Jacket', 'Dress', 'Shirt', 'Pants', 'Skirt', 'Belt', 'Watch', 'Ring', 'Necklace', 'Bracelet', 'Earring', 'Coin', 'Money', 'Credit card', 'Backpack', 'Box', 'Basket', 'Can', 'Bottle', 'Jar', 'Lid', 'Cabinet', 'Drawer', 'Hanger', 'Trash can', 'Dustpan', 'Broom', 'Mop', 'Vacuum', 'Sponge', 'Dish soap', 'Faucet', 'Sink', 'Toilet', 'Shower', 'Radio', 'Television', 'Speaker', 'Headphone', 'Camera', 'Computer', 'Mouse', 'Keyboard', 'Screen', 'Printer', 'Stapler', 'Tape', 'Scissors', 'Glue', 'Ruler', 'Hammer', 'Nail', 'Screw', 'Screwdriver', 'Pliers', 'Ladder', 'Light bulb', 'Battery', 'Wire', 'Plug', 'Outlet', 'Switch', 'Candle', 'Match', 'Lighter', 'Ashtray', 'Newspaper', 'Magazine', 'Mail', 'Stamp', 'Envelope', 'Calendar', 'Chalk', 'Crayon', 'Marker', 'Album', 'Toy', 'Ball', 'Doll', 'Game', 'Puzzle', 'Bicycle', 'Helmet', 'Tire', 'Rope', 'String', 'Net', 'Hose', 'Bucket', 'Shovel', 'Rake', 'Trowel', 'Flower', 'Plant', 'Vase', 'Pot', 'Kettle', 'Toaster', 'Microwave', 'Oven', 'Stove', 'Refrigerator', 'Freezer', 'Blender', 'Mixer', 'Coffee maker', 'Teapot', 'Salt shaker', 'Pepper shaker', 'Spice', 'Oil', 'Vinegar', 'Sugar', 'Flour', 'Egg', 'Milk', 'Bread', 'Butter', 'Cheese', 'Fruit', 'Vegetable', 'Meat', 'Fish', 'Cereal', 'Rice', 'Pasta', 'Wine glass', 'Beer bottle', 'Ice cube', 'Coaster', 'Placemat', 'Napkin', 'Handkerchief', 'Umbrella', 'Raincoat', 'Boot', 'Slipper', 'Sandal', 'Tie', 'Scarf', 'Vest', 'Button', 'Zipper', 'Snap', 'Pin', 'Needle', 'Thread', 'Sewing machine', 'Iron', 'Ironing board', 'Detergent', 'Bleach', 'Air freshener', 'Magnet', 'Globe', 'Map', 'Calculator', 'Clipboard', 'Bulletin board', 'Whiteboard', 'Flashlight', 'Whistle', 'Bell', 'Horn', 'Crutch', 'Cane', 'Wheelchair', 'Stethoscope', 'Thermometer', 'Band-Aid', 'Cotton ball', 'First aid kit', 'Razor', 'Shaving cream', 'Aftershave', 'Perfume', 'Lotion', 'Makeup', 'Lipstick', 'Mascara', 'Nail polish', 'Hair dryer', 'Curling iron', 'Barrette', 'Headband', 'Sunglass', 'Eyeglass', 'Goggles', 'Earplug', 'Pillowcase', 'Duvet', 'Comforter', 'Footstool', 'Ottoman', 'End table', 'Bookshelf', 'Doorknob', 'Hinge', 'Knob', 'Handle', 'Vent', 'Grill', 'Patio', 'Fence', 'Gate', 'Hedge', 'Sprinkler', 'Birdhouse', 'Bird feeder', 'Mailbox', 'Welcome mat', 'Hook', 'Shelf', 'Frame', 'Picture frame', 'Postcard', 'Bookmark', 'Note', 'Sticky note', 'File folder', 'Trash bag', 'Recycling bin', 'Funnel', 'Ladle', 'Spatula', 'Whisk', 'Colander', 'Cutting board', 'Measuring cup', 'Measuring spoon', 'Timer', 'Oven mitt', 'Apron', 'Trivet', 'Corkscrew', 'Bottle opener', 'Can opener', 'Ziploc bag', 'Foil', 'Plastic wrap', 'Wax paper', 'Baking sheet', 'Muffin tin', 'Rolling pin', 'Cookie cutter', 'Grater', 'Peeler', 'Blender', 'Food processor', 'Trash compactor', 'Step stool', 'Extension cord', 'Power strip', 'Surge protector', 'Adapter', 'Circuit breaker', 'Fuse', 'Thermostat', 'Smoke detector', 'Carbon monoxide detector', 'Fire extinguisher', 'Water bottle', 'Pet bowl', 'Leash', 'Collar', 'Poop bag', 'Dog toy', 'Aquarium', 'Fish tank', 'Candle holder', 'Incense', 'Diffuser', 'Rock', 'Stone', 'Shell', 'Pebble', 'Sand', 'Dirt'],
    enabled: true
  },
  {
    id: 'cat_3',
    name: 'Animals',
    words: ['Dog', 'Cat', 'Horse', 'Cow', 'Pig', 'Sheep', 'Goat', 'Chicken', 'Duck', 'Goose', 'Turkey', 'Donkey', 'Rabbit', 'Hamster', 'Guinea pig', 'Mouse', 'Rat', 'Gerbil', 'Bird', 'Fish', 'Goldfish', 'Parrot', 'Canary', 'Budgie', 'Snake', 'Lizard', 'Frog', 'Turtle', 'Lion', 'Tiger', 'Bear', 'Elephant', 'Monkey', 'Gorilla', 'Chimpanzee', 'Zebra', 'Giraffe', 'Hippopotamus', 'Rhinoceros', 'Crocodile', 'Alligator', 'Wolf', 'Fox', 'Deer', 'Moose', 'Elk', 'Squirrel', 'Chipmunk', 'Skunk', 'Raccoon', 'Badger', 'Otter', 'Seal', 'Walrus', 'Whale', 'Dolphin', 'Shark', 'Octopus', 'Squid', 'Crab', 'Lobster', 'Shrimp', 'Snail', 'Slug', 'Worm', 'Earthworm', 'Butterfly', 'Moth', 'Bee', 'Wasp', 'Ant', 'Fly', 'Mosquito', 'Spider', 'Scorpion', 'Dragonfly', 'Ladybug', 'Grasshopper', 'Cricket', 'Beetle', 'Camel', 'Llama', 'Alpaca', 'Panda', 'Koala', 'Kangaroo', 'Wombat', 'Platypus', 'Echidna', 'Penguin', 'Owl', 'Eagle', 'Hawk', 'Falcon', 'Vulture', 'Swan', 'Flamingo', 'Pelican', 'Stork', 'Heron', 'Sparrow', 'Pigeon', 'Robin', 'Crow', 'Jay', 'Woodpecker', 'Kingfisher', 'Toucan', 'Hyena', 'Cheetah', 'Leopard', 'Jaguar', 'Bobcat', 'Cougar', 'Coyote', 'Bison', 'Buffalo', 'Yak', 'Ox', 'Gazelle', 'Antelope', 'Warthog', 'Hedgehog'],
    enabled: true
  },
  {
    id: 'cat_4',
    name: 'Historical Figures',
    words: ['Jesus Christ', 'Muhammad', 'Buddha', 'Confucius', 'Plato', 'Aristotle', 'Socrates', 'Julius Caesar', 'Cleopatra', 'Alexander the Great', 'George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'Benjamin Franklin', 'Theodore Roosevelt', 'Franklin D. Roosevelt', 'Winston Churchill', 'Adolf Hitler', 'Joseph Stalin', 'Napoleon Bonaparte', 'Queen Elizabeth I', 'Queen Victoria', 'King Henry VIII', 'Joan of Arc', 'Nelson Mandela', 'Mahatma Gandhi', 'Martin Luther King Jr.', 'Rosa Parks', 'Mother Teresa', 'Marie Curie', 'Albert Einstein', 'Isaac Newton', 'Galileo Galilei', 'Charles Darwin', 'Nikola Tesla', 'Thomas Edison', 'Stephen Hawking', 'Leonardo da Vinci', 'Michelangelo', 'Pablo Picasso', 'Vincent van Gogh', 'Claude Monet', 'Salvador Dalí', 'William Shakespeare', 'Mark Twain', 'Charles Dickens', 'Jane Austen', 'F. Scott Fitzgerald', 'Ernest Hemingway', 'J.R.R. Tolkien', 'J.K. Rowling', 'Wolfgang Amadeus Mozart', 'Ludwig van Beethoven', 'Johann Sebastian Bach', 'Elvis Presley', 'Marilyn Monroe', 'Charlie Chaplin', 'Walt Disney', 'Alfred Hitchcock', 'Marlon Brando', 'Audrey Hepburn', 'John Lennon', 'Muhammad Ali', 'Babe Ruth', 'Jackie Robinson', 'Jesse Owens', 'Neil Armstrong', 'Buzz Aldrin', 'Amelia Earhart', 'Christopher Columbus', 'Marco Polo', 'Vasco da Gama','Genghis Khan','Karl Marx', 'Sigmund Freud', 'Helen Keller', 'Princess Diana', 'Queen Elizabeth II', 'Mao Zedong'],
    enabled: true
  },
  {
    id: 'cat_5',
    name: 'Brands',
    words: ['Apple', 'Google', 'Amazon', 'Walmart', 'Microsoft', 'Target', 'Netflix', 'Nike', 'Starbucks', 'Coca-Cola', 'Pepsi', 'McDonald’s', 'YouTube', 'Facebook', 'Instagram', 'Disney', 'Tesla', 'Toyota', 'Ford', 'Honda', 'Visa', 'Mastercard', 'Costco', 'Best Buy', 'Home Depot', 'Lowe’s', 'Chevy', 'Dodge', 'AT&T', 'Verizon', 'Chipotle', 'Taco Bell', 'Domino’s', 'Chic-fil-A', 'Dunkin’', 'Oreo', 'Hershey’s', 'Lay’s', 'Tide', 'Colgate', 'CVS', 'Walgreens', 'FedEx', 'UPS', 'Spotify', 'Lululemon', 'Under Armour', 'Lego', 'PlayStation', 'T-Mobile', 'Kroger', 'Safeway', 'Subway', 'Pizza Hut', 'Burger King', 'General Motors', 'Jeep', 'BMW', 'Mercedes-Benz', 'Samsung', 'Sony', 'IBM', 'HP', 'Gatorade', 'Pringles', 'Kellogg’s', 'JPMorgan Chase', 'Bank of America', 'Wells Fargo', 'American Express', 'The North Face', 'Adidas', 'Puma', 'Old Navy', 'Gap', 'Sephora', 'Ulta Beauty', 'Band-Aid', 'Ziploc', 'Duracell', 'Netflix', 'HBO', 'Hulu'],
    enabled: true
  },
  {
    id: 'cat_6',
    name: 'Movies',
    words: ['Jaws', 'Star Wars: Episode IV - A New Hope', 'Grease', 'Alien', 'Apocalypse Now', 'The Exorcist', 'The Godfather Part II', 'Chinatown', "One Flew Over the Cuckoo's Nest", 'Rocky', 'Taxi Driver', 'Annie Hall', 'Halloween', 'Superman', 'Raiders of the Lost Ark', 'E.T. the Extra-Terrestrial', 'Blade Runner', 'Tootsie', 'Star Wars: Episode V - The Empire Strikes Back', 'The Shining', 'Raging Bull', 'On Golden Pond', 'Poltergeist', 'Return of the Jedi', 'Ghostbusters', 'The Terminator', 'Beverly Hills Cop', 'Back to the Future', 'The Breakfast Club', 'The Color Purple', "Ferris Bueller's Day Off", 'Top Gun', 'Aliens', 'Platoon', 'Dirty Dancing', 'Lethal Weapon', 'Die Hard', 'Rain Man', 'Who Framed Roger Rabbit', 'Batman', 'Indiana Jones and the Last Crusade', 'Dead Poets Society', 'Home Alone', 'Goodfellas', 'Pretty Woman', 'Terminator 2: Judgment Day', 'The Silence of the Lambs', 'JFK', 'Aladdin', 'Reservoir Dogs', 'Jurassic Park', "Schindler's List", 'Forrest Gump', 'Pulp Fiction', 'The Lion King', 'The Shawshank Redemption', 'Apollo 13', 'Toy Story', 'Braveheart', 'Independence Day', 'Fargo', 'Titanic', 'Men in Black', 'Saving Private Ryan', 'Armageddon', 'The Big Lebowski', 'The Matrix', 'Fight Club', 'The Sixth Sense', 'American Beauty', 'Gladiator', 'Crouching Tiger, Hidden Dragon', 'Cast Away', "Harry Potter and the Sorcerer's Stone", 'The Lord of the Rings: The Fellowship of the Ring', 'Shrek', 'A Beautiful Mind', 'Spider-Man', 'The Lord of the Rings: The Two Towers', 'Catch Me If You Can', 'Pirates of the Caribbean: The Curse of the Black Pearl', 'The Lord of the Rings: The Return of the King', 'Finding Nemo', 'Eternal Sunshine of the Spotless Mind', 'The Incredibles', 'Million Dollar Baby', 'Star Wars: Episode III - Revenge of the Sith', 'Batman Begins', 'Brokeback Mountain', 'Casino Royale', 'The Departed', 'Little Miss Sunshine', 'Transformers', 'No Country for Old Men', 'Juno', 'The Dark Knight', 'Iron Man', 'Slumdog Millionaire', 'Avatar', 'The Hangover', 'Up', 'Inception', 'Toy Story 3', "The King's Speech", 'The Avengers', 'Skyfall', 'Django Unchained', 'Gravity', 'Frozen', '12 Years a Slave', 'Guardians of the Galaxy', 'American Sniper', 'Birdman', 'Star Wars: The Force Awakens', 'Mad Max: Fury Road', 'The Martian', 'Black Panther', 'Avengers: Infinity War', 'A Star Is Born', 'Avengers: Endgame', 'Joker', 'Parasite', 'Dune', 'No Time to Die', 'CODA', 'Top Gun: Maverick', 'Avatar: The Way of Water', 'Everything Everywhere All at Once', 'Barbie', 'Oppenheimer', 'Killers of the Flower Moon', 'Wonka', 'Dune: Part Two', 'Inside Out 2', 'Deadpool & Wolverine', 'Wicked Part One', 'Dances with Wolves', 'The Hunt for Red October', 'Total Recall', 'Die Hard 2', 'Dick Tracy', 'Edward Scissorhands', 'Teenage Mutant Ninja Turtles', 'Kindergarten Cop', 'Misery', 'Point Break', 'Robin Hood: Prince of Thieves', 'Thelma & Louise', 'Beauty and the Beast', 'Unforgiven', "Wayne's World", 'Basic Instinct', 'A Few Good Men', 'Sister Act', 'The Bodyguard', 'Home Alone 2: Lost in New York', 'Mrs. Doubtfire', 'The Fugitive', 'Groundhog Day', 'Sleepless in Seattle', 'Speed', 'True Lies', 'The Mask', 'Dumb and Dumber', 'Interview with the Vampire', 'Ace Ventura: Pet Detective', 'Leaving Las Vegas', 'Casino', 'Se7en', 'The Usual Suspects', 'GoldenEye', 'Twister', 'Mission: Impossible', 'The Rock', 'Jerry Maguire', 'Scream', 'Con Air', 'Face/Off', 'Good Will Hunting', 'L.A. Confidential', 'The Lost World: Jurassic Park', 'The Fifth Element', 'Gattaca', 'Mulan', "There's Something About Mary", 'The Truman Show', 'Rush Hour', 'Deep Impact', 'Godzilla', 'The Wedding Singer', 'Liar Liar', 'Enemy of the State', 'Office Space', 'American Pie', 'The Mummy', 'Star Wars: Episode I – The Phantom Menace', 'Tarzan', 'Toy Story 2', 'Notting Hill', 'Being John Malkovich', 'Almost Famous', 'X-Men', 'O Brother, Where Art Thou?', 'Requiem for a Dream', 'Traffic', 'Erin Brockovich', 'Remember the Titans', 'Training Day', 'Donnie Darko', 'Monsters, Inc.', 'Moulin Rouge!', 'Zoolander', 'The Royal Tenenbaums', 'Signs', 'Gangs of New York', 'Road to Perdition', 'Sweet Home Alabama', 'The Bourne Identity', 'Kill Bill: Volume 1', 'Lost in Translation', 'Bruce Almighty', 'School of Rock', 'Old School', 'Bad Boys II', 'The Last Samurai', 'Collateral', 'Mean Girls', 'Ray', 'The Village', 'Dodgeball: A True Underdog Story', 'Wedding Crashers', 'War of the Worlds', 'King Kong', 'Hitch', 'Walk the Line', 'V for Vendetta', 'The Prestige', 'Borat', 'Dreamgirls', 'The Pursuit of Happyness', '300', 'Spider-Man 3', 'Superbad', 'Ratatouille', 'Shutter Island', 'Zodiac', 'Pineapple Express', 'Tropic Thunder', 'WALL-E', 'Inglourious Basterds', 'District 9', 'The Blind Side', 'The Social Network', 'Black Swan', 'Bridesmaids', 'Rise of the Planet of the Apes', 'Drive', 'Silver Linings Playbook', 'The Wolf of Wall Street', 'La La Land', 'Get Out', 'A Quiet Place', 'Once Upon a Time in Hollywood', 'Knives Out'],
    enabled: true
  },
  {
    id: 'cat_7',
    name: 'Places',
    words: ['New York City', 'Paris', 'London', 'Rome', 'Eiffel Tower', 'Statue of Liberty', 'Big Ben', 'Colosseum', 'Pyramids of Giza', 'Great Wall of China', 'Sydney Opera House', 'Golden Gate Bridge', 'Times Square', 'Hollywood Sign', 'The White House', 'Mount Rushmore', 'Grand Canyon', 'Niagara Falls', 'Las Vegas Strip', 'Venice', 'Florence', 'The Vatican', 'Louvre Museum', 'Notre Dame Cathedral', 'Arc de Triomphe', 'Champs-Élysées', 'Buckingham Palace', 'Tower of London', 'Stonehenge', 'Acropolis of Athens', 'Parthenon', 'Red Square', 'Berlin Wall', 'Brandenburg Gate', 'Hagia Sophia', 'Machu Picchu', 'Christ the Redeemer', 'Rio de Janeiro', 'Taj Mahal', 'Kyoto', 'Mount Fuji', 'Tokyo', 'Burj Khalifa', 'Dubai', 'The Alamo', 'Independence Hall', 'Liberty Bell', 'Wall Street', 'Central Park', 'Empire State Building', 'Brooklyn Bridge', 'Seattle Space Needle', 'Alcatraz Island', 'San Francisco', 'Chicago', 'Willis Tower', 'Cloud Gate', 'New Orleans', 'Boston', 'Philadelphia', 'Washington D.C.', 'Cologne Cathedral', 'Neuschwanstein Castle', 'Mont Saint-Michel', 'Dubrovnik City Walls', 'Prague Castle', 'Charles Bridge', 'Budapest', 'Vienna', 'Amsterdam', 'Anne Frank House', 'Barcelona', 'Alhambra', 'Madrid', 'Lisbon', 'Ponte Vecchio', 'Leaning Tower of Pisa', 'Suez Canal', 'Panama Canal', 'Auschwitz', 'Westminster Abbey', 'Piccadilly Circus', 'Pompeii', 'Matterhorn', 'Swiss Alps', 'Forbidden City', 'Angkor Wat', 'Petra', 'Jerusalem', 'Wailing Wall', 'Yosemite National Park', 'Yellowstone National Park', 'Grand Teton National Park', 'Death Valley', 'Great Barrier Reef', 'Table Mountain', 'Eiffel Tower', 'Mount Everest', 'Bermuda Triangle', 'Loch Ness'],
    enabled: true
  },
  {
    id: 'cat_8',
    name: 'Sports',
    words: ['Baseball', 'Soccer', 'Football', 'Basketball', 'Tennis', 'Golf', 'Hockey', 'Volleyball', 'Swimming', 'Track and Field', 'Boxing', 'Wrestling', 'Rugby', 'Cricket', 'Formula 1', 'NASCAR', 'Skiing', 'Snowboarding', 'Surfing', 'Skateboarding', 'Cycling', 'Gymnastics', 'Diving', 'Badminton', 'Table Tennis', 'Martial Arts', 'Bowling', 'Equestrian', 'Sailing', 'Lacrosse', 'Curling', 'Handball', 'Field Hockey', 'Water Polo', 'Polo', 'Archery', 'Fencing', 'Triathlon', 'Decathlon', 'Ultimate Frisbee', 'Bobsledding', 'Luge', 'Skeleton', 'Synchronized Swimming', 'Rowing', 'Kayaking', 'Judo', 'Karate',],
    enabled: true
  }
];