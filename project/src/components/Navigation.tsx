import { 
  Home,
  LineChart,
  FileSearch,
  Eye,
  BarChart3,
  LogOut
} from 'lucide-react';

interface NavigationProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

export function Navigation({ onNavigate, activePage }: NavigationProps) {
  return (
    <nav className="bg-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Ranker</span>
          </div>
          
          <div className="flex space-x-8">
            <NavLink 
              icon={<Home size={18} />} 
              text="Article Suggestions" 
              active={activePage === 'suggestions'}
              onClick={() => onNavigate('suggestions')}
            />
            <NavLink 
              icon={<LineChart size={18} />} 
              text="Data Analysis" 
              active={activePage === 'analysis'}
              onClick={() => onNavigate('analysis')}
            />
            <NavLink 
              icon={<FileSearch size={18} />} 
              text="Metadata Extraction" 
              active={activePage === 'metadata'}
              onClick={() => onNavigate('metadata')}
            />
            <NavLink 
              icon={<Eye size={18} />} 
              text="Views Prediction" 
              active={activePage === 'views'}
              onClick={() => onNavigate('views')}
            />
            <NavLink 
              icon={<BarChart3 size={18} />} 
              text="SEO Rankings" 
              active={activePage === 'seo'}
              onClick={() => onNavigate('seo')}
            />
            <button className="flex items-center space-x-1 hover:text-purple-200">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

function NavLink({ icon, text, active, onClick }: NavLinkProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center space-x-1 hover:text-purple-200 ${
        active ? 'text-purple-200' : ''
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}