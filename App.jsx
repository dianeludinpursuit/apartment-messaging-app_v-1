import React, { useState, useEffect } from 'react';
// src/App.js (or any other component)
import { supabase } from './supabaseClient';
// ... rest of your React code

// Main App Component
const App = () => {
  // State to manage the active screen
  const [activeScreen, setActiveScreen] = useState('home');
  // State for current time display
  const [currentTime, setCurrentTime] = useState('');
  // New state to manage the selected chat for the chat screen
  const [selectedChat, setSelectedChat] = useState(null);

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
    // If a chat is selected, render the ChatScreen instead of the MessagesScreen
    if (activeScreen === 'messages' && selectedChat) {
      return <ChatScreen chat={selectedChat} setSelectedChat={setSelectedChat} />;
    }

    switch (activeScreen) {
      case 'home':
        return <HomeScreen currentTime={currentTime} setActiveScreen={setActiveScreen} />;
      case 'messages':
        return <MessagesScreen setSelectedChat={setSelectedChat} />;
      case 'offer_ride':
        return <OfferRideScreen />;
      case 'find_ride':
        return <FindRideScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen currentTime={currentTime} setActiveScreen={setActiveScreen} />;
    }
  };

  return (
    // Phone frame container based on styles.css
    <div className="phone-frame">
      {/* Render the active screen */}
      {renderScreen()}

      {/* Bottom Navigation Bar */}
      <div className="bottom-nav flex flex-col md:flex-row p-2 bg-white border-t border-gray-200">
        <button
          onClick={() => setActiveScreen('home')}
          className={`flex-1 p-2 rounded-md transition-colors ${activeScreen === 'home' ? 'text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          style={activeScreen === 'home' ? { backgroundColor: '#34495E' } : {}}
        >
          Home
        </button>
        <button
          onClick={() => setActiveScreen('messages')}
          className={`flex-1 p-2 rounded-md transition-colors ${activeScreen === 'messages' ? 'text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          style={activeScreen === 'messages' ? { backgroundColor: '#34495E' } : {}}
        >
          Messages
        </button>
        <button
          onClick={() => setActiveScreen('offer_ride')}
          className={`flex-1 p-2 rounded-md transition-colors ${activeScreen === 'offer_ride' ? 'text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          style={activeScreen === 'offer_ride' ? { backgroundColor: '#34495E' } : {}}
        >
          Offer Ride
        </button>
        <button
          onClick={() => setActiveScreen('find_ride')}
          className={`flex-1 p-2 rounded-md transition-colors ${activeScreen === 'find_ride' ? 'text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          style={activeScreen === 'find_ride' ? { backgroundColor: '#34495E' } : {}}
        >
          Find Ride
        </button>
        <button
          onClick={() => setActiveScreen('profile')}
          className={`flex-1 p-2 rounded-md transition-colors ${activeScreen === 'profile' ? 'text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          style={activeScreen === 'profile' ? { backgroundColor: '#34495E' } : {}}
        >
          Profile
        </button>
      </div>
    </div>
  );
};

// NavItem Component for bottom navigation
// This component is no longer used, as the buttons are now created directly in the App component.
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
const HomeScreen = ({ currentTime, setActiveScreen }) => {
  return (
    <div className="screen-content home-content" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* New Header Section */}
      <header className="home-header" style={{ padding: '15px', paddingBottom: '10px', backgroundColor: '#F8F8F8', borderBottom: '1px solid #E0E3E7' }}>
        <h1 className="screen-title" style={{ margin: '0', fontSize: '1.5rem' }}>Welcome Home!</h1>
        <div className="current-time" style={{ color: '#6C757D' }}>{currentTime}</div>
      </header>

      {/* Scrollable Content Area */}
      <div className="main-content" style={{ flexGrow: 1, overflowY: 'auto', padding: '15px' }}>
        <div className="content-section">
          <h2 style={{ fontSize: '1.2rem' }}>Your Activity</h2>
          <div className="ride-item">
            <div className="ride-date">Today, 4:00 PM</div>
            {/* Removed the notes field from here */}
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
            {/* Updated notes section with flexbox for top alignment */}
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <label htmlFor="notes">Notes:</label>
              <textarea
                id="notes"
                className="form-input"
                rows="2"
                placeholder="Add notes for this ride..."
                style={{ border: '1px solid #002D62', borderRadius: '8px', flex: 1 }}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed Action Buttons */}
      <div className="actions-section" style={{ padding: '15px', backgroundColor: '#F8F8F8' }}>
        <button className="action-btn primary" onClick={() => setActiveScreen('find_ride')}>View All Rides</button>
        <button className="action-btn primary" style={{ marginTop: '10px' }} onClick={() => setActiveScreen('messages')}>Start New Chat</button>
      </div>
    </div>
  );
};

// Messages Screen Component
const MessagesScreen = ({ setSelectedChat }) => {
  // Placeholder chat rooms
  const chatRooms = [
    { id: '1', name: 'Train Station Ride', lastMessage: 'See you at 4!', time: '4:05 PM', unread: true, messages: [
      { id: 'm1', text: 'Hey John, I’m ready when you are.', sender: 'me' },
      { id: 'm2', text: 'Great, I’ll be downstairs in 5 minutes.', sender: 'other' },
      { id: 'm3', text: 'Sounds good!', sender: 'me' },
    ]},
    { id: '2', name: 'Grocery Shopping', lastMessage: 'I need milk and bread.', time: 'Yesterday', unread: false, messages: [
      { id: 'm4', text: "I'm heading to the store, need anything?", sender: 'me' },
      { id: 'm5', text: 'Yes, could you grab some milk and bread please?', sender: 'other' },
      { id: 'm6', text: 'Sure thing, on it!', sender: 'me' },
    ]},
    { id: '3', name: 'Building General', lastMessage: 'Remember the building meeting.', time: 'Mon', unread: true, messages: [
      { id: 'm7', text: 'Anyone going to the building meeting on Wednesday?', sender: 'other' },
      { id: 'm8', text: 'I am! See you there.', sender: 'me' },
    ]},
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
        <div 
          key={room.id} 
          className="ride-item" 
          style={{ marginBottom: '10px' }}
          onClick={() => setSelectedChat(room)} // Set the selected chat on click
        >
          <div className="conversation-header" style={{ marginLeft: '0', marginBottom: '5px' }}>
            <div className="contact-avatar" style={{ backgroundColor: '#00A3C4' }}></div>
            <div style={{ flexGrow: 1 }}>
              <div className="ride-date" style={{ fontSize: '1rem' }}>{room.name}</div>
              <div className="ride-route" style={{ fontSize: '0.9rem' }}>{room.lastMessage}</div>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#6C757D', textAlign: 'right' }}>{room.time}</div>
            {/* Updated the style for the New badge to have white text */}
            {room.unread && <span className="confirmed-badge" style={{ backgroundColor: '#bd2130', marginLeft: '5px', minWidth: 'unset', padding: '2px 8px', borderRadius: '9999px', color: 'white' }}>New</span>}
          </div>
        </div>
      ))}

      <button className="start-new-message-btn">Start New Message</button>
    </div>
  );
};

// New Chat Screen Component
const ChatScreen = ({ chat, setSelectedChat }) => {
  return (
    <div className="screen-content" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header className="chat-header" style={{ padding: '15px', backgroundColor: '#F8F8F8', borderBottom: '1px solid #E0E3E7', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => setSelectedChat(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', marginRight: '10px', cursor: 'pointer' }}>&larr;</button>
        <h1 className="screen-title" style={{ margin: '0', fontSize: '1.5rem', flexGrow: 1 }}>{chat.name}</h1>
      </header>

      {/* Main chat messages area */}
      <div className="chat-messages" style={{ flexGrow: 1, overflowY: 'auto', padding: '15px' }}>
        {chat.messages.map(message => (
          <div 
            key={message.id} 
            className={`message-bubble ${message.sender === 'me' ? 'cyan-light' : 'grey'}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Message input section */}
      <div className="chat-input" style={{ padding: '15px', borderTop: '1px solid #E0E3E7', display: 'flex', alignItems: 'center', backgroundColor: '#F8F8F8' }}>
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="form-input" 
          style={{ flexGrow: 1, marginRight: '10px' }}
        />
        <button className="submit-button" style={{ width: 'auto', padding: '10px 20px' }}>Send</button>
      </div>
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

        <label htmlFor="to" style={{ marginTop: '10px' }}>To:</label>
        <input type="text" id="to" className="form-input" placeholder="e.g., G Train Greenpoint, Trader Joe's" />

        <div className="date-group" style={{ marginTop: '10px' }}>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" className="form-input" />
        </div>
        
        <div className="time-group" style={{ marginTop: '10px' }}>
          <label htmlFor="time">Time:</label>
          <input type="time" id="time" className="form-input" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', marginTop: '10px' }}>
          <span>Flexible with time?</span>
          <div
            className={`toggle ${isFlexible ? 'active' : 'inactive'}`}
            onClick={() => setIsFlexible(!isFlexible)}
          ></div>
        </div>

        <label htmlFor="seats" style={{ marginTop: '10px' }}>Available Seats:</label>
        <input type="number" id="seats" className="form-input" defaultValue="1" min="1" />

        <label htmlFor="notes" style={{ marginTop: '10px' }}>Notes:</label>
        <textarea
          id="notes"
          className="form-input"
          rows="3"
          placeholder="Add notes for the ride offer message, if needed."
          style={{ border: '1px solid #002D62', borderRadius: '8px' }}
        ></textarea>

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
        {/* Replaced the placeholder div with an SVG icon for a person */}
        <div className="driver-avatar flex items-center justify-center" style={{ width: '80px', height: '80px', margin: '0 auto 15px auto', border: '3px solid #002D62', backgroundColor: '#e0e3e7', borderRadius: '50%' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
        </div>
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
