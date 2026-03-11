import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { UniqloProvider } from './store/UniqloContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/dashboard/Dashboard';
import ProductList from './components/products/ProductList';
import PlanogramEditor from './components/planogram/PlanogramEditor';
import FloorPlanEditor from './components/floorplan/FloorPlanEditor';
import AnalysisPage from './components/analysis/AnalysisPage';
import StorePage from './components/common/StorePage';
import SettingsPage from './components/common/SettingsPage';
import UniqloFloorPlanEditor from './components/uniqlo-floorplan/UniqloFloorPlanEditor';
import UniqloInventoryPlanner from './components/uniqlo-inventory/UniqloInventoryPlanner';

function App() {
  return (
    <AppProvider>
      <UniqloProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/planogram" element={<PlanogramEditor />} />
              <Route path="/floorplan" element={<FloorPlanEditor />} />
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/stores" element={<StorePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/uniqlo-floorplan" element={<UniqloFloorPlanEditor />} />
              <Route path="/uniqlo-inventory" element={<UniqloInventoryPlanner />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UniqloProvider>
    </AppProvider>
  );
}

export default App;
