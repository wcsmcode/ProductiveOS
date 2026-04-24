import {React, useState, useEffect, use} from 'react';
import Items from './Items.jsx';
import {AuthService, supabase} from '/src/lib/supabase.js';

const Desktop = ({ onOpenApp }) => {
  const [UserProfile, setUserProfile] = useState({ name: 'Solo Architect', avatar: 'S' });
  useEffect (() => {
    const initializeSystem = async () => {
        // 1. Lấy user hiện tại
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // 2. Lấy profile từ database
          const { data } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('id', user.id)
            .single();
  
          if (data?.display_name) {
            setUserProfile({
              name: data.display_name,
              avatar: data.display_name.charAt(0).toUpperCase()
            });
          }
  
          // 3. Giả lập thời gian boot cho "ngầu" (như cái wait(2) của mày)
          setTimeout(() => setLoading(false), 2500);
        } else {
          // Nếu không có session thì đá về login
          setcurrentState('./auth.html');
        }
      };
  
      initializeSystem();
  },[]);
  const apps = [
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'tracking', label: 'Tracking', icon: 'Activity' },
    { id: 'notes', label: 'Notes', icon: 'FileText' },
  ];

  return (
    <div className="flex-1 p-10 bg-[--accent-soft] flex flex-col items-start gap-2">
      <Items.Toast message="Welcome back, Architect!" />
      {apps.map(app => (
        <Items.AppIcon 
          key={app.id}
          iconName={app.icon} 
          label={app.label} 
          onClick={() => onOpenApp(app.id)}
        />
      ))}
    </div>
  );
};

export default Desktop;