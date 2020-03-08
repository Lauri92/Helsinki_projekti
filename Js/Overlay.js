'use strict';

//  Start of the script
const body = document.getElementsByTagName("body")[0];
const nappi7 = document.getElementById("nappi7");   // Show overlay button in main site
const exit = document.getElementById("putton"); // Exit button in overlay
const overlay = document.getElementById("id");
settags();
nappi7.addEventListener("click", on);   // Setting up the EventListeners for show/hide overlay.
exit.addEventListener("click", off);

function settags() {    // Used to fill the tag lists (ul). Tags are manually added in arrays, because the API has
    const akt = ["sauna", "heavy rock", "virtual reality", "painting (visual arts)", "Bars & Nightlife", "national parks",
        "schools (educational institutions)", "food", "lunch", "dinner", "activity", "ecological", "walking tour",
        "culture", "daytrip", "pub", "guidance", "music", "games", "fine arts", "hiking and backpacking", "outdoor recreation",
        "design", "trips", "cycling", "summer, architecture", "art", "sea", "nature", "public transport", "cruise", "winter", "education and training",
        "recreation areas", "bar", "tramways", "photography", "islands", "archipelagoes", "summer", "cottage life", "fishing", "sightseeing", "bus sightseeing",
        "bike tour", "boat sightseeing", "kayaking", "beer", "tea", "canoeing", "archipelago", "history", "suomenlinna", "sailing"].sort(function(a, b){    // Activities array
        if (a.toLowerCase() < b.toLowerCase()) return -1;   // Without this, tags that start with capital letter go to the top of the list.
        if (a.toLowerCase() > b.toLowerCase()) return 1;
        return 0;
    });
    const plc = ['ACCOMMODATION', 'RESTAURANTS & CAFES', 'SAUNA & WELLNESS', 'MEETING PLACES', 'VENUES', 'WORK & STUDY',
        'SERVICES', 'BARS & NIGHTLIFE', 'BANQUET VENUES', 'SIGHTS & ATTRACTIONS', 'NATURE & SPORTS', 'MUSEUMS & GALLERIES',
        'SHOPPING', 'Antiquariat', 'BookStore', 'ToyStore', 'Grocery', 'RecordStore', 'Rock', 'Karaoke', 'Billiards',
        'Hostel', 'Auditorium', 'FreeCatering', 'Luxury', 'StreetStyle', 'NordicSwan', 'EcoShop', 'Vegetarian', 'Apartment',
        'Free', 'Waterpark', 'Football', 'Athletics', 'Bowling', 'Camping', 'Karting', 'SportCenter', 'RecreationalArea',
        'RecreationalCentre', 'Bistro', 'SmartCasual', 'Cocktail', 'Organic', 'TraditionalFinnish', 'ModernNordic', 'Club',
        'EcoCompass', 'Banquet', 'BotanicalGarden', 'Running', 'Seaside', 'Mansion', 'GreenKey', 'Activity', 'AlvarAalto',
        'Breakfast', 'Brunch', 'Sauna', 'Hamburger', 'Italian', 'Indian', 'Jazz', 'Japanese', 'StreetFood', 'Chinese',
        'Florist', 'MiddleEast', 'SaunaMeeting', 'Fashion', 'Sea', 'Music', 'Mexican', 'Nepalese', 'Pizza', 'Beef', 'Food',
        'HardwareStore', 'MainAttraction', 'French', 'IslandRestaurant', 'Sushi', 'Thai', 'Coffee', 'Turkish', 'Russian',
        'Vietnamese', 'Wine', 'Barber', 'Park', 'Cosmetics', 'BeautySalon', 'Massage', 'KidsClothing', 'Wellness',
        'AdventurePark', 'EscapeRoom', 'PopUp', 'Art', 'SportOutdoor', 'Furniture', 'Basketball', 'Library', 'Bakery',
        'Frisbeegolf', 'Tennis', 'Fish', 'Viewpoint', 'Gallery', 'Brewery', 'LEEDEcoCertification', 'EUEcolabel',
        'Circus', 'StationaryShop', 'Restaurant', 'Design', 'Michelin', 'Georgian', 'Vegan', 'Filipino', 'Spanish',
        'Greek', 'Korean', 'Tea', 'Architecture', 'Family', 'Hotel', 'EcoFriendly', 'Beer', 'Distillery', 'IndieMusic',
        'Metal', 'Garden', 'Church', 'Science', 'Monument', 'Fair', 'MixedSauna', 'HealthService', 'Candy', 'BabySupplies',
        'Bags', 'Craft', 'Theatre', 'Hiking', 'Drapery', 'FleaMarket', 'Yoga', 'SwimmingHall', 'Climbing', 'SkiingCrosscountry',
        'Floorball', 'Gymnastics', 'Opera', 'DogPark', 'Playground', 'NationalPark', 'Sup', 'NeighbourhoodSport', 'Badminton',
        'Arboretum', 'Technical', 'Concert',  'Photography', 'ContemporaryArt', 'Academy', 'StartUp', 'WorkSpace', 'Laundry',
        'Sport', 'Harbour', 'Airport', 'Railwaystation', 'CultureCentre', 'Lunch', 'TravelAgency', 'TouristInformation',
        'Arena', 'FastFood', 'Electronics', 'Swimming', 'Beach', 'IceSwimming', 'Spa', 'IceSkating', 'SkiingDownhill',
        'Museum', 'Speciality', 'Finnish', 'International', 'FineDining', 'Island', 'Cafe', 'Pub', 'Nightclub', 'Bar',
        'LiveMusic', 'LGBT', 'Casino', 'BanquetIsland', 'BanquetSeaside', 'ShoppingCentre', 'DepartmentStore', 'MarketPlace',
        'MarketHall', 'FursLeather', 'Shoes', 'InteriorDesign', 'SecondHand', 'Antiques', 'Outlet', 'Souvenirs', 'Jewellery',
        'Nature', 'Dance', 'History', 'Asian', 'RestaurantSummer', 'CafeSummer', 'Bed&Breakfast', 'MovieTheatre', 'AmusementPark',
        'Animals', 'Sculpture', 'SkateBoard', 'GymFitness', 'Golf', 'MiniGolf', 'HorseRiding', 'Biking', 'EquipmentRental', 'Canoeing'].sort(function(a, b){    // Places array
        if (a.toLowerCase() < b.toLowerCase()) return -1;
        if (a.toLowerCase() > b.toLowerCase()) return 1;
        return 0;
    });
    const evt = ['Daycare and education', 'Culture and leisure', 'Social services and health care', 'Events', 'General',
        'Pupils', 'Children and families', 'Events and tips', 'Афиша', 'Entresse Library', 'Immigrants', 'Youth', 'Students',
        'Senior citizens', 'Helsinki', 'Espoo', 'Vantaa', 'Library Apple', 'Rikhardinkatu Library', 'Tapiola Library',
        'Literature', 'Courses', 'Opastuskalenteri', 'Concerts and clubs', 'Games', 'Children', 'Other events',
        'Training and courses', 'Language Cafés and discussion groups', 'Russian', 'other languages', 'Story hours',
        'Library Oodi', 'Infonäytöt (Helsinki)', 'Kirjallisuus ja sanataide', 'Lastentapahtumat', 'Elokuva ja media',
        'Kuvataide', 'Muotoilu', 'Elokuvat', 'Kuvataide', 'Musiikki', 'Tanssi', 'Teatteri', 'Musiikki',
        'Teatteri ja sirkus', 'Seniorit', 'Lapset ja nuoret', 'Kanneltalo', 'Malmitalo', 'Stoa', 'Vuotalo', 'Annantalo',
        'Caisa', 'Savoyteatteri', 'Näyttelyt', 'Sirkus', 'Muut tapahtumat', 'Suomi', 'Ruotsi', 'Englanti', 'Muu', 'Aikuiset',
        'Näkyy TVsovelluksessa', 'Vapaaajan kurssit', 'Caisan kurssit', 'Design ja käsityö',
        'Muut kulttuuritapahtumat (monitaide)', 'Normaali', 'Suomi (TV)', 'Stoan', 'Työpajat', 'Luennot ja keskustelut',
        'Nuorille Ohjelmasivun päänosto', 'perinnetapahtuma', 'tapahtuma', 'teatteri', 'art handicraft',
        'contemporary dance', 'ballet (art forms)', 'progressive rock music', 'multiculturalism', 'photographic art',
        'tattooing', 'participation', 'universities', 'folk rock', 'sauna bathing', 'concerts', 'orienteering',
        'fashion shows', 'carnivals (celebrations)', 'comics', 'young people', 'musicals', 'dinners', 'discos',
        'parades', 'entrepreneurship', 'media art', 'video art', 'All Saints Day', 'political decision making',
        'films', 'flamenco (dances)', 'soul music', 'flamenco (traditional music)', 'collections',
        'ice hockey dance (performing arts)', 'magicians', 'festivals', 'families with children',
        'nature', 'gardening sector (lines of business)', "Saint Lucy's Day", 'animated films',
        'orchestral music', 'opera (arts) town and city councils', 'conversation', 'skateboarding', 'ceramics',
        'hip hop', 'chamber music', 'story hours', 'installations (works of art)', 'urban policy', 'youth', 'film festivals',
        'show jumping', 'heavy metal', 'ice dancing', 'figure skating', 'lectures',
        "children's theatres (theatre for children)", 'working life', 'cinema (art forms)', 'pupils', 'students',
        'floorball', 'May Day', 'tourists and travellers', 'hacking', 'African identity', 'photography exhibitions',
        'sound records', 'Easter', 'clothing shops', 'history', 'winter swimming', 'residence', 'music', 'motorcycling',
        'wellbeing at work', 'antiques', 'art music', 'schlager music', 'singing games', 'rock music', 'beer',
        'live action roleplaying games', 'drums', 'cruises', 'Halloween', 'workshops', 'ball sports', 'sports contests',
        'drag shows', 'wellbeing', 'curling', 'Stoa (Helsinki)', 'sailing ships', 'animals', 'music clubs',
        'families with babies', 'events', 'growth companies', 'guidance', 'indie rock', 'beauty care sector',
        'Egyptology', 'contemporary circus', 'theatre events', 'electronic popular music', 'singersongwriters',
        'children (family members)', 'beverage industry', 'burlesque', 'markets (events)', 'pensioners',
        'senior citizens', 'media', 'adventure services', 'trips', 'walking tours', 'D films', 'Middle Ages',
        'pop up phenomena', 'theatre', 'dog shows', 'podcasting', 'open data', 'interior architecture',
        'graphics (visual arts)', 'marathon running', 'fine arts', 'toddlers', 'health', 'outdoor recreation',
        'live music', 'dancehall (dance)', 'startup companies', 'Christmas tradition', 'trail running',
        'performing arts', 'art', 'yarn bombs', 'collection (recreational activity)', 'punk rock', 'hard rock',
        'trash metal', 'electronic dance music', 'popular music', 'world music', "playing (children's games)",
        'money (means of payment)', 'cultural events', 'food', 'independence days', 'furniture',
        'clothing sector (lines of business)', 'culture', 'organ music', 'tourism', 'dance events', 'parents',
        'performance (art forms)', 'Christmas', 'coffee', 'roleplaying games', 'swimming', 'children (age groups)', 'families',
        'percussion instruments', 'blues (AfroAmerican music)', 'jazz', 'antioxidants', 'wines', "children's culture",
        'handcrafting', 'landscape architecture', 'trade events', 'handicrafts', 'museums', 'circus (performing arts)',
        'orchestras', 'exhibitions', 'beverages', 'family sports', 'Midsummer', 'food culture', 'languages', 'adults',
        'sculpture (visual arts)', 'environment', 'art galleries', 'games', 'migrants', 'sailing', 'saunas', 'football',
        'operas', 'music dramas', 'design (artistic creation)', 'immigrants', 'computers', 'forgeries', 'art exhibitions',
        'drawing (artistic creation)', 'horse sports', 'tradition', 'shows', 'democracy', 'Russian language', 'literary art',
        'architecture', 'playgrounds', 'literature', 'art museums', 'motoring', 'education and training', 'light music',
        'sustainable development', 'basketball', 'running', 'crosscountry running', 'physical training', 'winter sports',
        'comedy (style)', 'standup comedy courses (societal objects)', 'track events', 'flea markets', 'urban culture',
        'Ingrian identity', 'modern art', 'contemporary art', 'gymnastics', 'sports', 'mind and body'].sort(function(a, b){     // Events array
        if (a.toLowerCase() < b.toLowerCase()) return -1;
        if (a.toLowerCase() > b.toLowerCase()) return 1;
        return 0;
    });
    // Get all 3 tag lists (ul)
    const urls1 = document.getElementById("tags1");
    const urls2 = document.getElementById("tags2");
    const urls3 = document.getElementById("tags3");
    console.log("Akt: " + akt.length + " Plc: " + plc.length + " Evt: " + evt.length); //debugging
    for (let i = 0; i < akt.length; i++) {  //creates li element for each tag in the array
        const li = document.createElement("li");
        li.innerHTML = akt[i];
        urls1.appendChild(li);
    }
    for (let i = 0; i < plc.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = plc[i];
        urls2.appendChild(li);
    }
    for (let i = 0; i < evt.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = evt[i];
        urls3.appendChild(li);
    }
}

function on() {     // Shows the overlay and disables scrolling for the main site
    document.getElementById('overlay').style.display = "block";
    body.className = "overlay_hidden";
}

function off() {    // Hides the overlay and enables scrolling for the main site
    document.getElementById('overlay').style.display = "none";
    body.className = "overlay_show";
}
