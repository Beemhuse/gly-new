import { Settings, ShoppingCart, Factory, HardHat, Wrench, Zap} from 'lucide-react';

export const services = [
  {
    id: 'engineering',
    icon: Settings,
    title: 'Engineering & Design',
    description: 'Our engineering team delivers innovative solutions across all disciplines.',
    items: ['Process Technology', 'HSE Design', 'Mechanical Engineering', 'Piping Design', 'Control Systems', 'Electrical Engineering', 'Pipeline Engineering', 'Civil/Structural', '3D/4D Modeling', 'Process Simulation'],
    image: '/images/services/fabrication.jpg'
  },
  {
    id: 'procurement',
    icon: ShoppingCart,
    title: 'Procurement',
    description: 'Strategic supply chain management with global reach.',
    items: ['Strategic Sourcing', 'Vendor Management', 'Material Tracking', 'Contract Management', 'Logistics Coordination', 'Quality Assurance'],
    image: '/images/service-procurement.jpg'
  },
  {
    id: 'fabrication',
    icon: Factory,
    title: 'Fabrication',
    description: 'Shop-built modules optimized for transport and installation.',
    items: ['Process Modules', 'Pipe Rack Modules', 'Equipment Skids', 'Structural Steel', 'Pressure Vessels', 'Piping Spools'],
    image: '/images/services/fabrication.jpg'
  },
  {
    id: 'construction',
    icon: HardHat,
    title: 'Construction',
    description: 'Safe, predictable execution at scale across the USA.',
    items: ['Site Preparation', 'Foundation Work', 'Structural Erection', 'Equipment Installation', 'Piping Installation', 'E&I Work'],
    image: '/images/services/construction.png'
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Maintenance',
    description: 'Comprehensive maintenance and reliability solutions.',
    items: ['Turnaround Planning', 'Reliability Programs', 'Asset Management', 'Sustaining Capital', 'Performance Reporting', 'Continuous Improvement'],
    image: '/images/service-maintenance.jpg'
  },
  {
    id: 'energy',
    icon: Zap,
    title: 'Energy Solutions',
    description: 'EPC for traditional and cleaner energy markets.',
    items: ['Oil & Gas', 'Petrochemicals', 'Power Generation', 'Renewable Energy', 'Carbon Capture', 'Energy Efficiency'],
    image: '/images/service-energy.jpg'
  }
];