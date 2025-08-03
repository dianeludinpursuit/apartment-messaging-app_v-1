import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
  // State to manage the active screen
  const [activeScreen, setActiveScreen] = useState('home');
  // State for current time display
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update current time every second
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to render the active screen component
  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen currentTime={currentTime} />;
      case 'messages':
        return <MessagesScreen />;
      case 'offer_ride':
        return <OfferRideScreen />;
      case 'find_ride':
        return <FindRideScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen currentTime={currentTime} />;
    }
  };

  return (
    // Phone frame container based on styles.css
    <div className="phone-frame">
      {/* Render the active screen */}
      {renderScreen()}

      {/* Bottom Navigation Bar */}
      <div className="bottom-nav">
        <NavItem icon="🏠" label="Home" screen="home" activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        <NavItem icon="💬" label="Messages" screen="messages" activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        <NavItem icon="🚗" label="Offer Ride" screen="offer_ride" activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        <NavItem icon="🔍" label="Find Ride" screen="find_ride" activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        <NavItem icon="👤" label="Profile" screen="profile" activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      </div>
    </div>
  );
};

// NavItem Component for bottom navigation
const NavItem = ({ icon, label, screen, activeScreen, setActiveScreen }) => {
  const isActive = activeScreen === screen;
  return (
    <div
      className={`nav-item ${isActive ? 'active' : ''}`}
      onClick={() => setActiveScreen(screen)}
    >
      {/* Placeholder for icon, you can replace with actual SVG or image later */}
      <span className="nav-icon" style={{ backgroundColor: isActive ? '#002D62' : '#6C757D', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>{icon}</span>
      {label}
    </div>
  );
};

// Home Screen Component
const HomeScreen = ({ currentTime }) => {
  return (
    <div className="screen-content home-content">
      <h1 className="screen-title">Welcome Home!</h1>
      <div className="current-time">Current Time: {currentTime}</div>

      <div className="content-section">
        <h2>Your Activity</h2>
        <div className="ride-item">
          <div className="ride-date">Today, 4:00 PM</div>
          <div className="ride-route">Train Station to Apartment</div>
          <div className="ride-status-row">
            <span className="ride-status confirmed">Confirmed</span>
            <span>with John Doe</span>
          </div>
        </div>
        <div className="ride-item">
          <div className="ride-date">Tomorrow, 9:00 AM</div>
          <div className="ride-route">Apartment to Grocery Store</div>
          <div className="ride-status-row">
            <span className="ride-status">Pending</span>
            <span>(Carpool)</span>
          </div>
        </div>
      </div>

      <div className="actions-section">
        <button className="action-btn primary">View All Rides</button>
        <button className="action-btn primary" style={{ marginTop: '10px' }}>Start New Chat</button>
      </div>
    </div>
  );
};

// Messages Screen Component
const MessagesScreen = () => {
  // Placeholder chat rooms
  const chatRooms = [
    { id: '1', name: 'Train Station Ride', lastMessage: 'See you at 4!', time: '4:05 PM', unread: true },
    { id: '2', name: 'Grocery Shopping', lastMessage: 'I need milk and bread.', time: 'Yesterday', unread: false },
    { id: '3', name: 'Building General', lastMessage: 'Remember the building meeting.', time: 'Mon', unread: true },
  ];

  return (
    <div className="screen-content messages-content">
      <h1 className="screen-title">Messages</h1>

      <div className="search-bar-container" style={{ marginBottom: '15px' }}>
        <div className="search-bar">
          <input type="text" placeholder="Search messages..." className="form-input search-input" />
          <button className="filter-button">Filter</button>
        </div>
      </div>

      {chatRooms.map(room => (
        <div key={room.id} className="ride-item" style={{ marginBottom: '10px' }}> {/* Reusing ride-item for chat room styling */}
          <div className="conversation-header" style={{ marginLeft: '0', marginBottom: '5px' }}>
            <div className="contact-avatar" style={{ backgroundColor: '#00A3C4' }}></div>
            <div style={{ flexGrow: 1 }}>
              <div className="ride-date" style={{ fontSize: '1rem' }}>{room.name}</div>
              <div className="ride-route" style={{ fontSize: '0.9rem' }}>{room.lastMessage}</div>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6C757D', textAlign: 'right' }}>{room.time}</div>
            {room.unread && <span className="confirmed-badge" style={{ backgroundColor: '#DC3545', marginLeft: '5px', minWidth: 'unset', padding: '2px 6px' }}>New</span>}
          </div>
        </div>
      ))}

      <button className="start-new-message-btn">Start New Message</button>
    </div>
  );
};

// Offer Ride Screen Component
const OfferRideScreen = () => {
  const [isFlexible, setIsFlexible] = useState(false);

  return (
    <div className="screen-content content-section">
      <h1 className="screen-title">Offer a Ride</h1>
      <div className="form-section">
        <label htmlFor="from">From:</label>
        <input type="text" id="from" className="form-input" placeholder="e.g., Apartment Building" />

        <label htmlFor="to">To:</label>
        <input type="text" id="to" className="form-input" placeholder="e.g., Train Station, Grocery Store" />

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" className="form-input" />

        <label htmlFor="time">Time:</label>
        <input type="time" id="time" className="form-input" />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', marginTop: '10px' }}>
          <span>Flexible with time?</span>
          <div
            className={`toggle ${isFlexible ? 'active' : 'inactive'}`}
            onClick={() => setIsFlexible(!isFlexible)}
          ></div>
        </div>

        <label htmlFor="seats">Available Seats:</label>
        <input type="number" id="seats" className="form-input" defaultValue="1" min="1" />

        <label htmlFor="notes">Notes (optional):</label>
        <textarea id="notes" className="form-input" rows="3" placeholder="Any specific details?"></textarea>

        <button className="submit-button" style={{ marginTop: '20px' }}>Submit Offer</button>
      </div>
    </div>
  );
};

// Find Ride Screen Component
const FindRideScreen = () => {
  // Placeholder ride listings
  const rideListings = [
    { id: '1', driver: 'Jane Smith', from: 'Apartment', to: 'Train Station', date: 'Today', time: '5:15 PM', status: 'Available' },
    { id: '2', driver: 'Mike Johnson', from: 'Apartment', to: 'Grocery Store', date: 'Tomorrow', time: '10:00 AM', status: 'Full' },
    { id: '3', driver: 'Sarah Lee', from: 'Train Station', to: 'Apartment', date: 'Today', time: '6:30 PM', status: 'Available' },
    { id: '4', driver: 'David Chen', from: 'Apartment', to: 'Bus Stop', date: 'Tomorrow', time: '8:00 AM', status: 'Expired' },
  ];

  return (
    <div className="screen-content content-section">
      <h1 className="screen-title">Find a Ride</h1>

      <div className="search-bar-container" style={{ marginBottom: '15px' }}>
        <div className="search-bar">
          <input type="text" placeholder="Search origin/destination..." className="form-input search-input" />
          <button className="filter-button">Filter</button>
        </div>
      </div>

      <div className="ride-list-container">
        {rideListings.map(ride => (
          <div key={ride.id} className="ride-listing">
            <div className="driver-info">
              <div className="driver-avatar" style={{ backgroundColor: '#ADB5BD' }}></div>
              <span style={{ fontWeight: '600', color: '#002D62' }}>{ride.driver}</span>
            </div>
            <div style={{ marginTop: '8px' }}>
              <div className="ride-route">{ride.from} to {ride.to}</div>
              <div className="ride-date">{ride.date}, {ride.time}</div>
            </div>
            <div className="ride-status-row" style={{ marginTop: '8px' }}>
              {ride.status === 'Available' && <span className="ride-status confirmed">Available</span>}
              {ride.status === 'Full' && <span className="ride-full-badge">Full</span>}
              {ride.status === 'Expired' && <span className="expired-badge">Expired</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Profile Screen Component
const ProfileScreen = () => {
  return (
    <div className="screen-content content-section">
      <h1 className="screen-title">My Profile</h1>
      <div className="details-container" style={{ textAlign: 'center' }}>
        <div className="driver-avatar" style={{ width: '80px', height: '80px', margin: '0 auto 15px auto', border: '3px solid #00A3C4' }}></div>
        <h2 style={{ fontSize: '1.4rem', color: '#002D62', marginBottom: '5px' }}>John Doe</h2>
        <p style={{ color: '#6C757D', marginBottom: '15px' }}>Apartment 4B</p>

        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Phone:</strong> (555) 123-4567</p>
          <p><strong>Bio:</strong> Friendly neighbor looking to help out with rides and errands!</p>
        </div>

        <button className="action-btn primary">Edit Profile</button>
        <button className="action-btn secondary" style={{ marginTop: '10px' }}>Logout</button>
      </div>
    </div>
  );
};

export default App;