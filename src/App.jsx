import React, { use, Suspense, useState, Component } from 'react';
import * as OrgModule from '@dabeng/react-orgchart';
import ProfileCard from './components/ProfileCard';
import AddMemberForm from './components/AddMemberForm';
import './App.css';

const OrganizationChart = OrgModule.default?.default || OrgModule.default || OrgModule;

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) return (
      <div className="error-screen" style={{ padding: '2rem', border: '2px solid red' }}>
        <h2>Critical Component Error</h2>
        <p>{this.state.error?.message}</p>
        <button onClick={() => window.location.reload()}>Refresh Application</button>
      </div>
    );
    return this.props.children;
  }
}

const transformToTree = (list) => {
  if (!list || list.length === 0) return [];
  const map = {};
  const roots = [];
  
  list.forEach((item) => {
    map[item.id] = { 
      ...item, 
      // Library still requires a 'name' property to display
      name: item.name || 'Unnamed Member', 
      children: [] 
    };
  });

  list.forEach((node) => {
    if (node.parent_id && map[node.parent_id]) {
      map[node.parent_id].children.push(map[node.id]);
    } else {
      roots.push(map[node.id]);
    }
  });
  return roots;
};

const fetchFamilyData = async () => {
  const res = await fetch('http://localhost:5000/api/tree');
  if (!res.ok) throw new Error("Backend connection failed");
  return res.json();
};
const dataPromise = fetchFamilyData();

const FamilyTree = () => {
  const rawData = use(dataPromise);
  const treeData = transformToTree(rawData);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="app-container">
      <header className="teams-header">
        <h1>Family Tree Viewer</h1>
        <button className="primary-btn" onClick={() => setIsFormOpen(true)}>+ Add Member</button>
      </header>

      <main className="teams-centered-view">
        {treeData.length > 0 ? (
          <ErrorBoundary>
            <OrganizationChart 
              datasource={treeData[0]} 
              pan={true} 
              zoom={true}
              onClickNode={(node) => setSelectedPerson(node)}
            />
          </ErrorBoundary>
        ) : (
          <div className="empty-state">
            <p>No family data found. Use the button above to add members.</p>
          </div>
        )}
      </main>
      
      {selectedPerson && <ProfileCard selectedPerson={selectedPerson} onClose={() => setSelectedPerson(null)} />}
      {isFormOpen && <AddMemberForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default function App() {
  return (
    <Suspense fallback={<div>Loading Family Tree...</div>}>
      <FamilyTree />
    </Suspense>
  );
}
